import React from "react";

export const TypingIndicator = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <span className="dot animate-bounce">·</span>
      <span className="dot animate-bounce200">·</span>
      <span className="dot animate-bounce400">·</span>
    </div>
  );
};

// Include this in your CSS file, or inside a <style> tag in your component
// This assumes you have set up your project to handle CSS.
`
.dot {
  @apply text-4xl; /* Tailwind class for font-size: 30px */
  animation-duration: 600ms;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes bounce {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

@keyframes bounce200 {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

@keyframes bounce400 {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.animate-bounce {
  animation-name: bounce;
}

.animate-bounce200 {
  animation-delay: 200ms;
  animation-name: bounce200;
}

.animate-bounce400 {
  animation-delay: 400ms;
  animation-name: bounce400;
}
`;
