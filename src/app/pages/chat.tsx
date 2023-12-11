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

type RestAnswer = {
  answer: {
    content: string;
    created_at: string;
    from: "ai" | string;
  };
}

type Props = {
  userId: string;
};

export const Chat = ({ userId }: Props) => {
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [error, setError] = useState<null | string>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [isTypingIndicatorDisplayed, setIsTypingIndicatorDisplayed] = useState(false);

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
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);


  const submit = async (message: string) => {
    setError(null);
    setIsTypingIndicatorDisplayed(true);
    fetch(
      "https://chat-vitiligo.onrender.com/question.ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatType: "rest",
          content: message,
          from: userId,
        }),
      }
    ).then((response) => {
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
      setIsTypingIndicatorDisplayed(false);
      return response.json();
    }).then((resp: RestAnswer) => {
      setConversation((state) => [
        ...state,
        {
          message: resp.answer.content,
          speaker: 'bot',
          date: new Date(resp.answer.created_at),
        },
      ]);
    }).catch((error) => {
      setError(
        "Failed to send the message. Please check your internet connection and try again."
      );
      console.error("Error submitting message:", error);
    });

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
    <div className="flex flex-col touch-manipulation h-[100vh] max-w-[780px] m-0 mx-aut bg-pastel1 m-0 mx-auto">
      <Header className={classNames("sticky top-0 left-0 w-full")} />
      <div
        className={classNames(
          "flex-grow flex flex-col overflow-y-auto no-scrollbar py-[100px]",
          styles.noScrollbar,
          styles.chatContainer
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
          {isTypingIndicatorDisplayed && (
            <TypingIndicator
              className="ml-[36px]"
              isVisible={isTypingIndicatorDisplayed}
            />
          )}
          {/* {isMessageGenerating && (
            <MessageGenerator className="mx-[24px]" message={text} />
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
          "sticky bottom-0 left-0 p-m pb-0 pt-[1px] w-full",
          styles.inputContainerBackdrop
        )}
        isDisabled={false}
        onSubmit={handleUserMessageSubmit}
      />
    </div>
  );
};
