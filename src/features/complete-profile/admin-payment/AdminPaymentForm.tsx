import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  apellido: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres",
  }),
  telefono: z.string().min(8, {
    message: "Ingrese un número de teléfono válido",
  }),
  identificacion: z.string().min(5, {
    message: "Ingrese una identificación válida",
  }),
  nombreAcademia: z.string().min(3, {
    message: "El nombre de la academia debe tener al menos 3 caracteres",
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export function AdminPaymentForm({ onSubmit }: { onSubmit: (values: FormValues) => Promise<void> }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      identificacion: "",
      nombreAcademia: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ... resto de los campos del formulario ... */}
        <Button type="submit" className="w-full">
          Proceder al Pago
        </Button>
      </form>
    </Form>
  );
}