import React from "react";
import Markdown from "react-markdown";

import { ConversationEntry } from "../../types/chat";
import classNames from "classnames";

type Props = {
  text: string;
  className?: string;
  speaker: ConversationEntry["speaker"];
};

export const Message = ({ text, speaker, className }: Props) => {
  const content = speaker === "user" ? text : <Markdown>{text}</Markdown>;

  return (
    <div
      className={classNames(
        className,
        "body-l text-[#181818]",
        {
          "rounded-[8px] bg-[#d5d5d5] max-w-[268px] self-end py-[10px] px-[15px]":
            speaker === "user",
        },
        {
          "max-w-[314px] self-start": speaker === "bot",
        }
      )}
    >
      {content}
    </div>
  );
};
