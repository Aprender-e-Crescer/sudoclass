import { QueryFilters, useIsFetching } from "@tanstack/react-query";
import { ErrorMessage, useFormikContext } from "formik";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { HTMLInputTypeAttribute, useState } from "react";
 
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

interface Props {
    name: string
    label: string
    placeholder?: string
    onChange?: () => void
    filtersQueryToShowLoading?: QueryFilters | ((value: string[], values: Record<string, string>) => QueryFilters)
    disabled?: boolean
    options: {
      value: string
      label: string
    }[]
    notFoundItemsMessage: string
}

const defaultFilter: QueryFilters = {
  predicate: () => false,
}

export function ComboBox({ name, label, placeholder, options, disabled, onChange, notFoundItemsMessage,  filtersQueryToShowLoading = defaultFilter }: Props) {
  const { setFieldValue, errors, touched, values } = useFormikContext<Record<string, string>>()

  const [open, setOpen] = useState(false)

  const currentValue = Array.isArray(values[name]) ? values[name] as string[] : [values[name]]

  const isLoading = useIsFetching(typeof filtersQueryToShowLoading === 'function' ? filtersQueryToShowLoading(currentValue, values) : filtersQueryToShowLoading) > 0

  const isTouched = !!touched[name]
  const hasError = !!errors[name]
  const shouldShowError = isTouched && hasError

  const handleOnSelect = (value: string) => () => {
    onChange?.()

    const isDeleting = currentValue.some(currentItem => currentItem === value)

    setFieldValue(name, isDeleting ? currentValue.filter(currentItem => currentItem !== value) : [...new Set([...currentValue, value])])
  }

  return (
    <div className='flex flex-col flex-1 gap-y-1'>
        <label htmlFor={name} className="text-md">{label}</label>
        <div className="flex flex-1 items-center">
          <div className="flex flex-1">
            <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={open}
                  data-show-error={shouldShowError}
                  className="flex items-center rounded-md border hover:bg-gray-100 bg-white border-gray-300 px-3 py-2 data-[show-error=true]:border-red-300 data-[show-error=true]:bg-red-50 flex-1"
                >
                  <p className="flex-1 text-start">
                    Selecionar turmas
                  </p>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>{notFoundItemsMessage}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={handleOnSelect(option.value)}
                          className="py-4"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              currentValue.some(value => value === option.value) ? "opacity-100" : "opacity-0"
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
          </div>
          <Loader2 className='hidden data-[is-loading=true]:block w-6 h-6 -ml-8 mr-2 animate-spin text-blue-500' data-is-loading={isLoading} />
        </div>
        <p className='text-red-500 text-xs'>
            <ErrorMessage name={name} />
            &#8203;
        </p>
    </div>
  )
}