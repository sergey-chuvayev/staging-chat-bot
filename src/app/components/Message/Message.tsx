import React from "react";
import Markdown from "react-markdown";

import { ConversationEntry } from "../../types/chat";

type Props = {
  entry: ConversationEntry;
};

export const Message = ({ entry }: Props) => {
  const messageStyle = entry.speaker === "user" ? "messageUser" : "messageBot";

  const content = entry.speaker === "user" ? (
    <p className="text-gray-900">{entry.message}</p>
  ) : (
    <div className="markdown">
      <Markdown>{entry.message}</Markdown>
    </div>
  );

  return (
    <div className={`${messageStyle} message`}>
      {content}
    </div>
  );
};
