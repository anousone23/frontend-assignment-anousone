import * as React from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {type Control, type FieldPath} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {type PatientFormData} from "@/types/schema";

interface FormComboboxProps {
  control: Control<PatientFormData>;
  name: FieldPath<PatientFormData>;
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: {value: string; label: string}[];
  mandatory?: boolean;
}

export function FormCombobox({
  control,
  name,
  label,
  placeholder,
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  options,
  mandatory = false,
}: FormComboboxProps) {
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
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between font-normal rounded-md px-3 bg-transparent hover:bg-transparent dark:hover:bg-input/30 border-input",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
