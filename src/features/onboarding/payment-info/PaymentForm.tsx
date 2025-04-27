import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { IconCreditCard, IconCalendarTime, IconLock } from '@tabler/icons-react'
import { useNavigate, useParams } from '@tanstack/react-router'

const paymentFormSchema = z.object({
  cardholderName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  cardNumber: z.string().regex(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Formato inválido. Use MM/AA'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC inválido'),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

export default function PaymentForm({ formRef }: { formRef: React.RefObject<HTMLFormElement> }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();
  const { userAcademyId } = useParams({
    from: '/onboarding/$userAcademyId/admin/payment-info'
  })
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  })

  async function onSubmit(data: PaymentFormValues) {
    setIsSubmitting(true)
    
    try {
      // Aquí se enviarían los datos al backend para procesarlos con MercadoPago
      console.log('Datos de pago:', data)
      
      // Simulamos una llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1500))
      navigate({
        to: `/onboarding/${userAcademyId}/admin/payment-success`,
        params: {
          userAcademyId: String(userAcademyId)
        }
      });
    } catch (error) {
      console.error('Error procesando el pago:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Nombre del titular</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Número de tarjeta</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    {...field} 
                    onChange={(e) => {
                      // Solo permitir números
                      const value = e.target.value.replace(/\D/g, '')
                      field.onChange(value)
                    }}
                  />
                  <IconCreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Fecha de expiración</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="MM/AA" 
                      {...field} 
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '')
                        if (value.length > 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4)
                        }
                        field.onChange(value)
                      }}
                    />
                    <IconCalendarTime className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="123" 
                      {...field} 
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        field.onChange(value)
                      }}
                    />
                    <IconLock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Procesando pago...' : 'Realizar pago'}
        </Button>
      </form>
    </Form>
  )
}