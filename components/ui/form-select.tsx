import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {type Control, type FieldPath} from "react-hook-form";
import {type PatientFormData} from "@/types/schema";

interface FormSelectProps {
  control: Control<PatientFormData>;
  name: FieldPath<PatientFormData>;
  label: string;
  placeholder: string;
  options: {label: string; value: string}[];
  mandatory?: boolean;
}

export function FormSelect({
  control,
  name,
  label,
  placeholder,
  options,
  mandatory = false,
}: FormSelectProps) {
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
