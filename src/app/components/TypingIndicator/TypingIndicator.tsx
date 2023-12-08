import React from "react";
import styles from "./TypingIndicator.module.css";
import classNames from "classnames";

type Props = {
  className?: string;
  isVisible: boolean;
};

export const TypingIndicator = ({ className, isVisible }: Props) => {
  return (
    <div
      className={classNames(className, styles.animated, {
        "opacity-1": isVisible,
        "opacity-0": !isVisible,
      })}
    >
      <svg
        width="48"
        height="21"
        viewBox="0 0 48 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="21" rx="10.5" fill="#FEEBC7" />
        <circle
          className={styles.dot}
          cx="14"
          cy="10.5"
          r="2.5"
          fill="#4B2520"
        />
        <circle
          className={styles.dot}
          cx="23"
          cy="10.5"
          r="2.5"
          fill="#4B2520"
        />
        <circle
          className={styles.dot}
          cx="33"
          cy="10.5"
          r="3.5"
          fill="#FE8C5C"
        />
      </svg>
    </div>
  );
};
