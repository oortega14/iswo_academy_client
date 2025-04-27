import { motion } from 'framer-motion'
import WizardHeader from '../components/WizardHeader'
import { ADMIN_WIZARD_ROUTES } from '@/features/onboarding/config/wizard-routes.ts'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Definir el esquema de validación
const academyFormSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  category: z.string().min(1, { message: 'Debes seleccionar una categoría' })
})

// Tipo para los datos del formulario
type AcademyFormValues = z.infer<typeof academyFormSchema>

// Categorías de academia (puedes ajustar según tus necesidades)
const academyCategories = [
  { id: 'education', name: 'Educación' },
  { id: 'sports', name: 'Deportes' },
  { id: 'arts', name: 'Artes' },
  { id: 'technology', name: 'Tecnología' },
  { id: 'languages', name: 'Idiomas' },
  { id: 'business', name: 'Negocios' },
  { id: 'health', name: 'Salud y Bienestar' },
  { id: 'other', name: 'Otros' }
]

export default function CreateAcademyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Configurar el formulario
  const form = useForm<AcademyFormValues>({
    resolver: zodResolver(academyFormSchema),
    defaultValues: {
      name: '',
      category: ''
    }
  })

  // Función para manejar el envío del formulario
  const onSubmit = async (data: AcademyFormValues) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para enviar los datos al backend
      console.log('Datos del formulario:', data)

      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirigir o mostrar mensaje de éxito
      alert('¡Academia creada con éxito!')
    } catch (error) {
      console.error('Error al crear la academia:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='px-6 py-8'
    >
      <WizardHeader
        wizardRoutes={ADMIN_WIZARD_ROUTES}
      />

      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        <h2 className='mb-6 text-2xl font-bold'>Crea tu Academia</h2>
        <p className='mb-8 text-muted-foreground'>
          Completa la información básica para crear tu academia. Podrás personalizar
          más detalles después de la configuración inicial.
        </p>

        <div className='mb-12 max-w-2xl mx-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Academia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Academia de Inglés Moderna"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {academyCategories.map(category => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Creando academia</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </>
                ) : (
                  'Crear Academia'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  )
}