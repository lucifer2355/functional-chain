import { cn } from "../../utils/cn";

interface TagProps {
  text: string;
  className?: string;
  variant?: "green" | "orange"; // Define the two variants
}

export function Tag({ text, className = "", variant = "orange" }: TagProps) {
  return (
    <div
      className={cn(
        "inline-block px-4 py-2 text-white text-sm font-semibold rounded-full",
        variant === "orange" && "bg-[#E29A2D]",
        variant === "green" && "bg-[#4CAF79]",
        className
      )}
    >
      {text}
    </div>
  );
}
