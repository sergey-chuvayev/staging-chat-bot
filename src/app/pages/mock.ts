import { ConversationEntry } from "../types/chat";

// generate a mock converstation
export const mockConversation: ConversationEntry[] = [
  {
    message:
      "Hello, I'm Kuido. I'm here to assist you with your vitiligo. Let's start by understanding your condition better.",
    speaker: "bot",
    date: new Date(),
  },
  {
    message:
      "I've had vitiligo for 2 years now. It started with small patches on my hands and has slowly spread.",
    speaker: "user",
    date: new Date(),
  },
  {
    message:
      "I understand. It's important to keep track of the progression. Have you consulted a dermatologist or tried any treatments?",
    speaker: "bot",
    date: new Date(),
  },
  {
    message:
      "Yes, I visited a dermatologist last year. They prescribed a topical cream, but I haven't seen much improvement.",
    speaker: "user",
    date: new Date(),
  },
  {
    message:
      "Consistency with treatment is key, but if it's not working, exploring other options is necessary. Have you considered light therapy or other alternatives?",
    speaker: "bot",
    date: new Date(),
  },
  {
    message:
      "I've heard about light therapy, but I'm not sure if it's suitable for me. Do you have more information on that?",
    speaker: "user",
    date: new Date(),
  },
  {
    message:
      "Certainly! Light therapy, or phototherapy, involves exposing the skin to ultraviolet light under medical supervision. It's often used in combination with medication.",
    speaker: "bot",
    date: new Date(),
  },
  {
    message:
      "That sounds interesting. Are there any side effects I should be aware of before considering this treatment?",
    speaker: "user",
    date: new Date(),
  },
  {
    message:
      "Like any treatment, there are potential side effects, such as skin redness or itchiness. It's important to discuss these with your healthcare provider.",
    speaker: "bot",
    date: new Date(),
  },
  {
    message:
      "Thanks for the information, Kuido. I'll talk to my doctor about it and see if it's a viable option for me.",
    speaker: "user",
    date: new Date(),
  },
  // {
  //   message:
  //     "You're welcome! Remember, I'm here to help you navigate your vitiligo journey. Feel free to ask any more questions.",
  //   speaker: "bot",
  //   date: new Date(),
  // },
];
export const mockConversationWelcome: ConversationEntry[] = [
  {
    message:
      "Bonjour, je suis Kuido. Vous pouvez me demander n'importe quoi et je ferai de mon mieux pour vous aider. Que souhaitez-vous savoir ?",
    speaker: "bot",
    date: new Date(),
  },
];
