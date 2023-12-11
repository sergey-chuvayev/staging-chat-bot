"use client";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { Chat } from "./pages/chat";

export default function Home() {
  const [userId, setUserId] = useState<string | undefined>();
  useEffect(() => {
    // set the user id, if not set, generate a new one and display the weclome onboarding
    const generatedUserId = v4();
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", generatedUserId);
      setUserId(generatedUserId);
    } else {
      setUserId(localStorage.getItem("userId") ?? undefined);
    }
  }, []);

  return userId && <Chat userId={userId} />;
}
