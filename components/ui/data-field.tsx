import {cn} from "@/lib/utils";

export interface DataFieldProps {
  label: string;
  value?: string;
  className?: string;
}

export function DataField({label, value, className}: DataFieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </span>
      {value ? (
        <span className="font-medium text-slate-900 dark:text-slate-50">
          {value}
        </span>
      ) : (
        <span className="text-slate-300 dark:text-slate-600 italic">
          Pending...
        </span>
      )}
    </div>
  );
}
