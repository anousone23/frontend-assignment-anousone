import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {type Control, type FieldPath} from "react-hook-form";
import {type PatientFormData} from "@/types/schema";

interface FormTextareaProps {
  control: Control<PatientFormData>;
  name: FieldPath<PatientFormData>;
  label: string;
  placeholder?: string;
  maxLength?: number;
  mandatory?: boolean;
}

export function FormTextarea({
  control,
  name,
  label,
  placeholder,
  maxLength,
  mandatory = false,
}: FormTextareaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <div className="flex justify-between items-center mb-1">
            <FormLabel className="mb-0">
              {label}
              {mandatory && (
                <span className="text-red-500 dark:text-red-400 ml-1">*</span>
              )}
            </FormLabel>
            {maxLength !== undefined && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                {String(field.value || "").length}/{maxLength}
              </span>
            )}
          </div>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              maxLength={maxLength}
              className="resize-none min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
