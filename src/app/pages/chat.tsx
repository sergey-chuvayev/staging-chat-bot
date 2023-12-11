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
import { supabase } from "../utils/supabase";

const NUMBER_OF_MESSAGES = 20;

type StreamPayload = {
  [key: string]: any;
  type: "broadcast";
  event: string;
};

type History = {
  chat: {
    id: string;
    content: string;
    created_at: string;
    from: "ai" | string;
  }[];
};

type Props = {
  userId: string;
};

export const Chat = ({ userId }: Props) => {
  const [conversation, setConversation] = useState<ConversationEntry[]>(mockConversationWelcome);
  const [error, setError] = useState<null | string>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState("");
  const [isTypingIndicatorDisplayed, setIsTypingIndicatorDisplayed] = useState(false);
  const [isMessageGenerating, setIsMessageGenerating] = useState(false);

  useEffect(() => {
    fetch(`https://chat-vitiligo.onrender.com/chat.get?from=${userId}`).then(
      (response) => {
        response.json().then((data: History) => {
          if (data.chat.length === 0) {
            setConversation(mockConversationWelcome);
          } else {
            setConversation(
              data.chat.slice(-NUMBER_OF_MESSAGES).map((entry) => ({
                id: entry.id,
                message: entry.content,
                speaker: entry.from === "ai" ? "bot" : "user",
                date: new Date(entry.created_at),
              }))
            );
          }
        });
      }
    );
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel(userId)
      .on("broadcast", { event: "chat" }, handleMessageUpdated)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, text]);

  const handleMessageUpdated = (payload: StreamPayload) => {
    setText(payload.payload.message);
    if (payload.payload.eventType === "responseEnd") {
      setConversation((state) => [
        ...state,
        {
          id: Math.random().toString(), // TODO: use the ID from the server
          message: payload.payload.message,
          speaker: "bot",
          date: new Date(),
        },
      ]);
    }
    if (payload.payload.status === "error") {
      setError("Something went wrong. Please try again.");
    }
  };

  const submit = async (message: string) => {
    setError(null);
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

      setIsTypingIndicatorDisplayed(false);

      if (response.status === 500) {
        setIsTypingIndicatorDisplayed(false);
        setError("Server error: Please try again later.");
        return;
      }

      if (!response.ok) {
        setIsTypingIndicatorDisplayed(false);
        setError("Something went wrong. Please try again.");
        return;
      }
    } catch (error) {
      setIsTypingIndicatorDisplayed(false);
      setError(
        "Failed to send the message. Please check your internet connection and try again."
      );
      console.error("Error submitting message:", error);
    }
  };

  const handleUserMessageSubmit = (message: string) => {
    setIsTypingIndicatorDisplayed(true);
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
          {JSON.stringify(isTypingIndicatorDisplayed)}
          {isTypingIndicatorDisplayed && (
            <TypingIndicator
              className="ml-[36px]"
              isVisible={isTypingIndicatorDisplayed}
            />
          )}
          {/* {isMessageGenerating && (
            <div>
              message generator {JSON.stringify(isMessageGenerating)}
              <MessageGenerator className="mx-[24px]" message={text} />
            </div>
          )} */}
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
          "fixed bottom-0 left-0 p-m pb-0 pt-[1px] w-full",
          styles.inputContainerBackdrop
        )}
        isDisabled={false}
        onSubmit={handleUserMessageSubmit}
      />
    </div>
  );
};
