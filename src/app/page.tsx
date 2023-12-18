"use client";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { Chat } from "./pages/chat";
import { PostHogProvider } from "posthog-js/react";

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

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

  return (
    <div>
      <PostHogProvider
        apiKey="phc_cLwmD9OTctldzah310twDK3Ey14ChUHdGvYyh9fZjK9"
        options={options}
      >
        {userId && <Chat userId={userId} />}
      </PostHogProvider>
    </div>
  );
}
