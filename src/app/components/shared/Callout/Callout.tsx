import React from "react";

type Props = {
  message: string;
  type: "error" | "info"; // for now it's only error
};

export const Callout = ({ message, type }: Props) => {
  return <div className="bg-red-600 rounded-md p-4 flex flex-row items-center text-white">{message}</div>;
};
