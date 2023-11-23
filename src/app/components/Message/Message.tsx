import React, { ReactChildren, ReactNode } from "react";
import Markdown from "react-markdown";
import classNames from "classnames";

import { ConversationEntry } from "../../types/chat";

import styles from "./Message.module.css";

type Props = {
  text: string;
  className?: string;
  speaker: ConversationEntry["speaker"];
};

export const Message = ({ text, speaker, className }: Props) => {
  const content =
    speaker === "user" ? (
      text
    ) : (
      <Markdown components={{ a: ({ node, ...props }) => <Link {...props} /> }}>{text}</Markdown>
    );

  return (
    <div
      className={classNames(
        className,
        styles.message,
        "body-l text-[#181818] text-[18px]",
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

const Link = (props: { href?: string; children?: ReactNode }) => {
  return (
    <a href={props.href ?? ''} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  )
}
