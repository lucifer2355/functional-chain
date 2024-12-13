import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { Label } from "./label";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  value?: string | number;
  options: SelectOption[];
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function Select({
  label,
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "Select an option",
  className,
}: SelectProps) {
  return (
    <div className='space-y-1.5'>
      {label && <Label>Next function</Label>}
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={cn(
            `w-full
            appearance-none
            rounded-lg
            px-4
            py-2
            text-base
            transition-colors
            ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900 cursor-pointer hover:bg-gray-50"
            }
            border border-[#D3D3D3]
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `,
            className
          )}
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {value ? option.label : "-"}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>
          <ChevronDownIcon
            className={`h-5 w-5 ${
              disabled ? "text-gray-400" : "text-gray-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
