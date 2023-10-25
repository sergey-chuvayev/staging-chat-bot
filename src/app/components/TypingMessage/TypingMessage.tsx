import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { supabase } from "../../utils/supabase";

type StreamPayload = {
  event: string;
  payload: {
    status: "error" | string;
    eventType: "response" | "responseEnd";
    message: string;
  };
};

type Props = {
  userId: string;
  onMessageEnded(message: string): void;
  onError(reason: string): void;
};

export const TypingMessage = ({ userId, onMessageEnded, onError }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const subscription = supabase
      .channel(userId)
      .on("broadcast", { event: "chat" }, handleMessageUpdated)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleMessageUpdated = (payload: any) => {
    let word;
    if (payload.payload.message.startsWith(text)) {
      word = payload.payload.message.substring(text.length);
    } else {
      word = '';
    }

    console.log(word);

    setText(payload.payload.message);
    if (payload.payload.eventType === "responseEnd") {
      onMessageEnded(payload.payload.message);
    }
    if (payload.payload.status === "error") {
      onError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="text-gray-800 p-4 pb-2.5 pt-2.5 text-lg self-start">
      <Markdown>{text}</Markdown>
    </div>
  );
};
