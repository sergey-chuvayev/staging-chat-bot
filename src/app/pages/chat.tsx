"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { Callout } from "../components/shared/Callout";
import { Message } from "../components/Message";
import { ConversationEntry } from "../types/chat";
import { MessageGenerator } from "../components/MessageGenerator/MessageGenerator";
import { UserInput } from "../components/UserInput";
import { mockConversation } from "./mock";
import { TypingIndicator } from "../components/TypingIndicator";
import { Header } from "../components/Header";

export const Chat = () => {
  const [conversation, setConversation] =
    useState<ConversationEntry[]>(mockConversation);
  const [isMessageGenerating, setIsMessageGenerating] = useState(false);
  const [isMessageRequestSent, setIsMessageRequestSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<null | string>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId") ?? "");
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const submit = async (message: string) => {
    setError(null);
    setIsMessageRequestSent(true);
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
            content: message,
            from: userId, // generate some name (not authentication yet)
          }),
        }
      );

      setIsMessageRequestSent(false);
      setIsMessageGenerating(true);

      if (response.status === 500) {
        setIsMessageRequestSent(false);
        setError("Server error: Please try again later.");
        return;
      }

      if (!response.ok) {
        setIsMessageRequestSent(false);
        setError("Something went wrong. Please try again.");
        return;
      }
    } catch (error) {
      setIsMessageRequestSent(false);
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

  const handleUserMessageSubmit = (message: string) => {
    setConversation((state) => [
      ...state,
      {
        message,
        speaker: "user",
        date: new Date(),
      },
    ]);
    submit(message);
  };

  return (
    <div className="flex flex-col h-full max-w-[780px] m-0 mx-auto">
      <Header className={classNames("fixed top-0 left-0 w-full")} />
      <div className="flex-grow flex flex-col overflow-y-auto">
        <div className="flex flex-col flex-grow gap-[31px] py-[24px] pt-[100px]">
          {conversation.map((entry) => (
            <Message
              text={entry.message}
              className="mx-[24px]"
              speaker={entry.speaker}
              key={Math.random().toString()}
            />
          ))}
          {isMessageRequestSent && <TypingIndicator className="ml-[24px]" />}
          {isMessageGenerating && (
            <MessageGenerator
              className="mx-[24px]"
              userId={userId}
              onError={setError}
              onMessageEnded={handleMessageEnded}
            />
          )}
        </div>
        {error && (
          <div className="flex flex-row justify-center">
            <Callout
              className="-mt-[25px] m-[25px]"
              type="error"
              message={error}
            />
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <UserInput
        className="mt-auto p-m pt-[1px]"
        isDisabled={isMessageRequestSent || isMessageGenerating}
        onSubmit={handleUserMessageSubmit}
      />
    </div>
  );
};
