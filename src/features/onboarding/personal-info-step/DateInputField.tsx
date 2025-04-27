import { useState } from 'react';
import { format } from 'date-fns';
import { IconCalendar } from '@tabler/icons-react';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { handleServerError } from '@/utils/handle-server-error.ts';

interface DateFieldProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export function DateInputField({ field }: DateFieldProps) {
  const [inputValue, setInputValue] = useState(
    field.value ? format(new Date(field.value), 'dd/MM/yyyy') : ''
  );

  return (
    <FormItem>
      <FormLabel>Fecha de nacimiento</FormLabel>
      <FormControl>
        <div className="relative w-full">
          <Input
            placeholder="31/12/1990"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;

              if (!/^[0-9/]*$/.test(value)) {
                return;
              }

              let formattedValue = value;
              if (value.length === 2 && !value.includes('/')) {
                formattedValue = value + '/';
              } else if (value.length === 5 && value.charAt(2) === '/' && !value.includes('/', 3)) {
                formattedValue = value + '/';
              }

              setInputValue(formattedValue);

              if (/^\d{2}\/\d{2}\/\d{4}$/.test(formattedValue)) {
                try {
                  const [day, month, year] = formattedValue.split('/');
                  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

                  if (date instanceof Date && !isNaN(date.getTime())) {
                    field.onChange(format(date, 'yyyy-MM-dd'));
                  }
                } catch (error) {
                  handleServerError(error)
                }
              }
            }}
            className="w-full"
          />
          <IconCalendar className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none' />
        </div>
      </FormControl>
      <FormMessage />
      <p className="text-xs text-muted-foreground mt-1">
        Ingresa tu fecha de nacimiento en formato día/mes/año (Ejemplo: 31/12/1990)
      </p>
    </FormItem>
  );
}