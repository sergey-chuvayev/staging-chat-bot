import { useState } from "react";

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
    if (!text) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div className={className}>
      <div className="flex justify-center">
        <form
          id="chat-form"
          className="flex items-end rounded-[30px] border-[2px] border-[#E9D1BF] bg-white w-[740px]"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(text);
          }}
        >
          <textarea
            className="flex-grow bg-transparent px-[15px] py-[11px] outline-none body-m text-dark"
            form="chat-form"
            placeholder="Message..."
            value={text}
            rows={1}
            style={{ resize: "none" }} // Disables manual resizing
            onChange={(event) => {
              adjustTextAreaRows(event.target);
              setText(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit(text);
              }
            }}
          />
          <button
            className="pr-[14px] mb-[8px]"
            type="submit"
            disabled={isDisabled}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="14" cy="14" r="14" fill="#FEEBC7" />
              <path
                d="M18.7588 9.59473L12.0605 15.974L14.9312 21.0774L18.7588 9.59473Z"
                fill="white"
              />
              <path
                d="M18.7588 9.2754L12.3795 15.9736L7.27611 13.103L18.7588 9.2754Z"
                fill="#FE8C5C"
              />
              <path
                d="M18.4612 8.95407C18.8413 8.83761 19.1555 8.75225 19.3974 8.69938C19.3447 8.94368 19.2587 9.26166 19.1408 9.64677C18.8371 10.6394 18.3517 11.9834 17.7972 13.4435C17.2438 14.9005 16.6268 16.4599 16.0627 17.8799C15.9968 18.0456 15.9317 18.2095 15.8674 18.3712C15.3921 19.567 14.9656 20.6403 14.667 21.4255L11.9532 16.3999L11.8627 16.2323L11.695 16.1417L6.66952 13.4279C7.44819 13.1319 8.51167 12.7099 9.69768 12.2393C9.86907 12.1713 10.043 12.1022 10.219 12.0324C11.6413 11.4684 13.2037 10.8513 14.6626 10.2979C16.1246 9.74339 17.4698 9.25786 18.4612 8.95407Z"
                stroke="#4B2520"
                strokeWidth="1.27585"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="z-10 relative text-dark text-[11px] text-center align-baseline m-xs opacity-[75%]">
        Kuido peut faire des erreurs, en cas de doute référez vous aux sources mentionnées
      </div>
    </div>
  );
};
