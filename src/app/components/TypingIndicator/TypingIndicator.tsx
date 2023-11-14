import React from "react";
import styles from "./TypingIndicator.module.css";
import classNames from "classnames";

type Props = {
  className?: string;
};

export const TypingIndicator = ({ className }: Props) => {
  return (
    <div
      className={classNames(
        styles.dots,
        className,
        "rounded-[58px] bg-[#d5d5d5] self-start py-[18px] px-[15px]"
      )}
    >
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};
