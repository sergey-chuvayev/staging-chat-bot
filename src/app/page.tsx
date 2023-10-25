"use client";
import { useEffect } from "react";
import { v4 } from "uuid";

import { Chat } from "./pages/chat";

export default function Home() {
  useEffect(() => {
    // set the user id, if not set, generate a new one
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", v4());
    }
  });

  return <Chat />;
}
