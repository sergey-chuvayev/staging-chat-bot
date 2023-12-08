import { ReactChildren, ReactNode, useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

import styles from "./MessageGenerator.module.css";
import classNames from "classnames";
import Markdown from "react-markdown";

type StreamPayload = {
  [key: string]: any;
  type: "broadcast";
  event: string;
};

type Props = {
  userId: string;
  className?: string;
  onMessageEnded(message: string): void;
  onError(reason: string): void;
};

export const MessageGenerator = ({
  userId,
  className,
  onMessageEnded,
  onError,
}: Props) => {
  const [text, setText] = useState("");
  const [segments, setSegments] = useState<string[]>([]);

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
    if (text) {
      const newSegment = text.replace(segments.join(""), "");
      setSegments((prevSegments) => [...prevSegments, newSegment]);
    }
  }, [text]);

  const handleMessageUpdated = (payload: StreamPayload) => {
    const newMessage = payload.payload.message;
    setText(newMessage);
    if (payload.payload.eventType === "responseEnd") {
      const newSegment = newMessage.replace(segments.join(""), "");
      setSegments((prevSegments) => [...prevSegments, newSegment]);
      onMessageEnded(newMessage);
    }
    if (payload.payload.status === "error") {
      onError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={classNames("max-w-[85%] self-start text-[18px]", className)}
    >
      <Markdown components={{ p: FadeIn, li: FadeIn, a: FadeIn }}>
        {segments.join("")}
      </Markdown>
    </div >
  );
};

const FadeIn = ({ children }: { children?: ReactNode }) => (
  <div className={styles.fadeIn}>{children}</div>
);
