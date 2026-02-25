import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {type Control, type FieldPath} from "react-hook-form";
import {type PatientFormData} from "@/types/schema";

interface FormInputProps {
  control: Control<PatientFormData>;
  name: FieldPath<PatientFormData>;
  label: string;
  placeholder?: string;
  type?: string;
  max?: string;
  mandatory?: boolean;
}

export function FormInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
  max,
  mandatory = false,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>
            {label}
            {mandatory && (
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            )}
          </FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} max={max} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
