import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {type Control, type FieldPath} from "react-hook-form";
import {type PatientFormData} from "@/types/schema";

interface FormDatePickerProps {
  control: Control<PatientFormData>;
  name: FieldPath<PatientFormData>;
  label: string;
  placeholder?: string;
  mandatory?: boolean;
}

export function FormDatePicker({
  control,
  name,
  label,
  placeholder = "Pick a date",
  mandatory = false,
}: FormDatePickerProps) {
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
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex h-9 w-full justify-between items-center whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "dd-MM-yyyy")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                }}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
