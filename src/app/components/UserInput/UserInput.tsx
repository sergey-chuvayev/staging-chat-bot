import { ChangeEvent, useState } from "react";

type Props = {
  isDisabled: boolean;
  className?: string;
  onSubmit: (message: string) => void;
};

export const UserInput = ({ isDisabled, onSubmit, className }: Props) => {
  const [text, setText] = useState("");

  const adjustTextAreaRows = (textarea: HTMLTextAreaElement) => {
    const maxRows = 5;
    textarea.rows = 1; // Reset rows to 1 to correctly calculate scroll height
    while (
      textarea.scrollHeight > textarea.clientHeight &&
      textarea.rows < maxRows
    ) {
      textarea.rows += 1;
    }
  };

  const handleSubmit = (text: string) => {
    onSubmit(text);
    setText("");
  };

  return (
    <div className={className}>
      <form
        id="chat-form"
        className="flex items-end rounded-[30px] border-[2px] border-[#656366] bg-white"
      >
        <textarea
          className="flex-grow bg-transparent px-[15px] py-[11px] outline-none body-m"
          form="chat-form"
          placeholder="Ask me anything"
          value={text}
          rows={1}
          style={{ resize: "none" }} // Disables manual resizing
          onChange={(event) => {
            adjustTextAreaRows(event.target);
            setText(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSubmit(text);
            }
          }}
        />
        <button
          onClick={() => handleSubmit(text)}
          className="pr-[14px] mb-[8px]"
          type="submit"
          disabled={isDisabled}
        >
          <svg
            width="28"
            className="w-[24px]"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9998 0.956592C28.0001 0.93948 28.0001 0.922991 27.9998 0.90588C27.9985 0.864191 27.9945 0.823124 27.9879 0.782058C27.9858 0.769302 27.9851 0.756858 27.9823 0.744102C27.9718 0.692769 27.9568 0.642368 27.9375 0.593524C27.9319 0.579213 27.9248 0.565835 27.9186 0.551835C27.9021 0.514813 27.8834 0.479035 27.8619 0.44419C27.8532 0.429879 27.8445 0.415568 27.8349 0.401257C27.8031 0.355523 27.7689 0.311656 27.7288 0.271523C27.6883 0.231078 27.6439 0.196545 27.5978 0.1645C27.5847 0.155478 27.5714 0.147078 27.5577 0.138989C27.521 0.116278 27.4833 0.0966781 27.4444 0.0795669C27.4323 0.074278 27.4208 0.0680557 27.4083 0.063078C27.3583 0.0434779 27.3066 0.0279223 27.2537 0.0173445C27.2441 0.0154778 27.2341 0.0148556 27.2245 0.0129889C27.1803 0.00552224 27.1358 0.00116667 27.091 0.000233334C27.0761 -7.7778e-05 27.0615 -7.7778e-05 27.0468 0.000233334C27.003 0.00116667 26.9591 0.00552224 26.9152 0.0129889C26.9043 0.0148556 26.8938 0.0154778 26.8829 0.0176556C26.835 0.0273001 26.7877 0.0403668 26.741 0.0577891L0.60544 9.86497C0.255751 9.99626 0.0180612 10.3232 0.000950067 10.6966C-0.01585 11.0696 0.19135 11.4171 0.527662 11.5795L11.247 16.7527L16.4199 27.472C16.5764 27.7959 16.904 28 17.2608 28C17.2751 28 17.2891 27.9997 17.3034 27.9991C17.6765 27.982 18.0037 27.7443 18.135 27.3946L27.9425 1.2593C27.9599 1.21295 27.9727 1.16597 27.9823 1.11837C27.9848 1.10561 27.9858 1.09317 27.9876 1.08041C27.9945 1.03935 27.9985 0.997969 27.9998 0.956592ZM23.3602 3.32011L11.7554 14.9249L3.30371 10.8465L23.3602 3.32011ZM17.1535 24.6963L13.0751 16.2449L24.6802 4.63985L17.1535 24.6963Z"
              fill="#656366"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
