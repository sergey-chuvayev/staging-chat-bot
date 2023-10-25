"use client";
import React, { useEffect, useRef, useState } from "react";

import { Callout } from "../components/shared/Callout";
import { Message } from "../components/Message";
import { ConversationEntry } from "../types/chat";
import { TypingMessage } from "../components/TypingMessage/TypingMessage";

export const Chat = () => {
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [isMessageGenerating, setIsMessageGenerating] = useState(false);
  const [isMessageProcessing, setIsMessageProcessing] = useState(false);
  const [userInputText, setUserInputText] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<null | string>(null);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId") ?? "");
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const submit = async () => {
    if (userInputText.trim() === "") return;

    setError(null);
    setConversation((state) => [
      ...state,
      {
        message: userInputText,
        speaker: "user",
        date: new Date(),
      },
    ]);

    setIsMessageProcessing(true);
    setUserInputText("");
    try {
      const response = await fetch(
        "https://chat-vitiligo.onrender.com/question.ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatType: "streamed",
            content: userInputText,
            from: userId, // generate some name (not authentication yet)
          }),
        }
      );

      setIsMessageProcessing(false);
      setIsMessageGenerating(true);

      if (response.status === 500) {
        setIsMessageProcessing(false);
        setError("Server error: Please try again later.");
        return;
      }

      if (!response.ok) {
        setIsMessageProcessing(false);
        setError("Something went wrong. Please try again.");
        return;
      }
    } catch (error) {
      setIsMessageProcessing(false);
      setError(
        "Failed to send the message. Please check your internet connection and try again."
      );
      console.error("Error submitting message:", error);
    }
  };

  const handleMessageEnded = (message: string) => {
    setConversation((state) => [
      ...state,
      {
        id: Math.random().toString(), // TODO: use the ID from the server
        message,
        speaker: "bot",
        date: new Date(),
      },
    ]);
    setIsMessageGenerating(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow">
        <div className="flex-grow flex flex-col justify-end">
          <div
            className="flex flex-col flex-grow overflow-y-auto"
            ref={scrollViewRef}
          >
            {conversation.map((entry) => (
              <Message entry={entry} key={Math.random().toString()} />
            ))}
            {isMessageGenerating && (
              <TypingMessage
                userId={userId}
                onError={setError}
                onMessageEnded={handleMessageEnded}
              />
            )}
          </div>
        </div>
        <form id="chat-form" className="flex flex-row mt-auto">
          <input
            className="flex-grow p-4"
            type="text"
            form="chat-form"
            placeholder="Type your message here..."
            value={userInputText}
            onChange={(event) => setUserInputText(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
          />
          <button
            className="p-4 bg-blue-500 text-white"
            onClick={() => submit()}
            type="submit"
            disabled={isMessageProcessing || isMessageGenerating}
          >
            icon
          </button>
        </form>
      </div>
      {error && (
        <div className="flex flex-row justify-center">
          <Callout type="error" message={error} />
        </div>
      )}
    </div>
  );
};
