import {cn} from "@/lib/utils";

export interface DataFieldProps {
  label: string;
  value?: string;
  className?: string;
  maxLength?: number;
}

export function DataField({
  label,
  value,
  className,
  maxLength,
}: DataFieldProps) {
  const displayValue =
    value && maxLength && value.length > maxLength
      ? `${value.slice(0, maxLength)}...`
      : value;

  return (
    <div className={cn("flex flex-col min-w-0 w-full", className)}>
      <span className="text-sm text-slate-500 dark:text-slate-400 mb-1 truncate">
        {label}
      </span>
      {value ? (
        <span
          className="font-medium text-slate-900 dark:text-slate-50 truncate"
          title={value}
        >
          {displayValue}
        </span>
      ) : (
        <span className="text-slate-300 dark:text-slate-600 italic">
          Pending...
        </span>
      )}
    </div>
  );
}
