import * as React from "react";
import { FaCopy } from "react-icons/fa";

const CoppyButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-[35px] font-medium border border-[#0F172A] text-[#0F172A] hover:bg-[#F1F5F9] w-[500px] h-[60px]"
        ref={ref}
        {...props}
      >
        <span className="flex-grow text-center">
          {children}
        </span>
        <span>
          <FaCopy size={35} />
        </span>
      </button>
    );
  }
);

export { CoppyButton };
