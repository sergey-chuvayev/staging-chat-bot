import classNames from "classnames";
import React from "react";

type Props = {
  message: string;
  className?: string;
  type: "error" | "info"; // for now it's only error
};

export const Callout = ({ message, type, className }: Props) => {
  return (
    <div
      className={classNames(
        "bg-[#ff8382] rounded-md p-[10px] text-white w-full ",
        className
      )}
    >
      {message}
    </div>
  );
};
