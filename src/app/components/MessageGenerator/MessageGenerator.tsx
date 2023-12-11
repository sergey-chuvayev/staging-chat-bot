import { ReactChildren, ReactNode, useEffect, useState } from "react";

import styles from "./MessageGenerator.module.css";
import classNames from "classnames";
import Markdown from "react-markdown";

type Props = {
  className?: string;
  message: string;
};

export const MessageGenerator = ({
  className,
  message,
}: Props) => {
  return (
    <div
      className={classNames("max-w-[85%] self-start text-[16px] py-[10px] px-[15px] text-dark", className)}
    >
      <Markdown components={{ p: FadeIn, li: FadeIn, a: FadeIn }}>
        {message}
      </Markdown>
    </div >
  );
};

const FadeIn = ({ children }: { children?: ReactNode }) => (
  <div className={styles.fadeIn}>{children}</div>
);
