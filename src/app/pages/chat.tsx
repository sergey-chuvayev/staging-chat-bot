"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { Callout } from "../components/shared/Callout";
import { Message } from "../components/Message";
import { ConversationEntry } from "../types/chat";
import { MessageGenerator } from "../components/MessageGenerator/MessageGenerator";
import { UserInput } from "../components/UserInput";
import { mockConversationWelcome } from "./mock";
import { TypingIndicator } from "../components/TypingIndicator";
import { Header } from "../components/Header";
import styles from "./styles.module.css";

export const Chat = () => {
  const [conversation, setConversation] =
    useState<ConversationEntry[]>(mockConversationWelcome);
  const [isMessageGenerating, setIsMessageGenerating] = useState(false);
  const [isMessageRequestSent, setIsMessageRequestSent] = useState(false);
  const [isGutterVisible, setIsGutterVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<null | string>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [updatedText, setUpdatedText] = useState("");

  useEffect(() => {
    fetch(
      `https://chat-vitiligo.onrender.com/question.ask?from=${new Date()}`
    ).then((res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    setUserId(localStorage.getItem("userId") ?? "");
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, updatedText]);

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
    setIsGutterVisible(true);
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
    <div className="flex flex-col h-full max-w-[780px] m-0 mx-aut bg-pastel1 m-0 mx-auto">
      <Header className={classNames("fixed top-0 left-0 w-full")} />
      <div
        className={classNames(
          "flex-grow flex flex-col overflow-y-auto no-scrollbar py-[100px]",
          styles.noScrollbar
        )}
      >
        <div className="flex flex-col flex-grow gap-[10px]">
          {conversation.map((entry) => (
            <Message
              text={entry.message}
              className="mx-[24px]"
              speaker={entry.speaker}
              key={Math.random().toString()}
            />
          ))}
          {isMessageRequestSent && (
            <TypingIndicator
              className="ml-[36px]"
              isVisible={isMessageRequestSent}
            />
          )}
          {isMessageGenerating && (
            <MessageGenerator
              className="mx-[24px]"
              userId={userId}
              onError={setError}
              onMessageEnded={handleMessageEnded}
              onMessageUpdated={setUpdatedText}
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
        <div
          ref={endOfMessagesRef}
          className="shrink-0"
        // style={{ height: isGutterVisible ? "calc(100vh - 300px)" : "" }}
        />
      </div>
      <UserInput
        className={classNames(
          "fixed bottom-0 left-0 p-m pt-[1px] w-full",
          styles.inputContainerBackdrop
        )}
        isDisabled={isMessageRequestSent || isMessageGenerating}
        onSubmit={handleUserMessageSubmit}
      />
    </div>
  );
};
