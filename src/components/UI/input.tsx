import { cn } from "../../utils/cn";

interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isCircleVisible?: boolean;
  variant?: "orange" | "green";
  circlePosition?: "left" | "right";
}

export function Input({
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
  variant,
  isCircleVisible = false,
  circlePosition = "right",
}: InputProps) {
  return (
    <div
      className={cn(
        "flex items-center w-full max-w-[200px] h-[40px] rounded-[.9375rem] border-2 px-2 bg-white",
        disabled && "opacity-50 cursor-not-allowed",
        variant === "orange" && "border-[#FFC267]",
        variant === "green" && "border-[#2DD179]"
      )}
    >
      {isCircleVisible && circlePosition === "left" && (
        <>
          <div className='w-[19px] h-[.9375rem] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
            <div className='w-[.4375rem] h-[.4375rem] bg-[#0066FF4D] rounded-full z-10 '></div>
          </div>

          {/* Divider */}
          <div
            className={cn(
              "w-[1px] h-full mx-2",
              variant === "orange" && "bg-[#FFEED5]",
              variant === "green" && "bg-[#C5F2DA]"
            )}
          />
        </>
      )}

      {/* Input Area */}
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-full bg-white border-none outline-none pl-2 pr-2 text-black font-semibold text-sm",
          circlePosition === "left" ? "text-end" : "text-start",
          className
        )}
        disabled={disabled}
      />

      {isCircleVisible && circlePosition === "right" && (
        <>
          {/* Divider */}
          <div
            className={cn(
              "w-[1px] h-full mr-3",
              variant === "orange" && "bg-[#FFEED5]",
              variant === "green" && "bg-[#C5F2DA]"
            )}
          />

          <div className='relative w-[1.125rem] h-[.9375rem] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
            <div className='w-[.4375rem] h-[.4375rem] bg-[#0066FF4D] rounded-full z-10'></div>
          </div>
        </>
      )}
    </div>
  );
}
