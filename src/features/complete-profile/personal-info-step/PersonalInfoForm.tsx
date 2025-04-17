import { RefObject, useEffect, useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCalendar, IconPlus, IconTrash } from '@tabler/icons-react'
import { es } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { WIZARD_ROUTES } from '../config/wizard-routes'
import { useCompleteProfile } from '@/api/hooks/use-complete-profile'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'

// Esquemas de validación
const socialNetworkSchema = z.object({
  platform: z.string(),
  url: z.string().url('La URL no es válida'),
})

const addressSchema = z.object({
  user_detail_id: z.string().optional(),
  address: z.string().min(2, 'La dirección es muy corta'),
  city: z.string().min(2, 'La ciudad es muy corta'),
  province: z.string().min(2, 'La provincia es muy corta'),
  country: z.string().min(2, 'El país es muy corto'),
  postal_code: z.string().min(2, 'El código postal es muy corto'),
})

const userDetailSchema = z.object({
  user_id: z.string().optional(),
  first_name: z.string().min(2, 'El nombre es muy corto'),
  last_name: z.string().min(2, 'El apellido es muy corto'),
  birth_date: z.string(),
  phone: z.string().min(6, 'El teléfono debe tener al menos 6 dígitos'),
  dni: z.string().min(2, 'El DNI/Identificación es muy corto'),
  gender: z.string(),
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  address_attributes: addressSchema,
  social_networks_attributes: z
    .array(socialNetworkSchema)
    .optional()
    .default([]),
})

export const personalInfoSchema = z.object({
  user: z.object({
    email: z.string().email('El email no es válido'),
    user_detail_attributes: userDetailSchema,
    wizard_step: z.string().optional(),
  }),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

const platformOptions = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Otra', value: 'other' },
]

const genderOptions = [
  { label: 'Masculino', value: 'male' },
  { label: 'Femenino', value: 'female' },
  { label: 'Prefiero no decir', value: 'prefer_not_to_say' },
]

interface PersonalInfoFormProps {
  formRef?: RefObject<HTMLFormElement>
}

export default function PersonalInfoForm({
  formRef,
}: PersonalInfoFormProps) {
  const { user } = useAuthStore().auth
  const navigate = useNavigate()
  const { updatePersonalInfo } = useCompleteProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      user: {
        email: '',
        user_detail_attributes: {
          first_name: '',
          last_name: '',
          birth_date: '',
          phone: '',
          dni: '',
          gender: '',
          username: '',
          address_attributes: {
            address: '',
            city: '',
            province: '',
            country: '',
            postal_code: '',
          },
          social_networks_attributes: [],
        },
      },
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'user.user_detail_attributes.social_networks_attributes',
  })

  const handleAddSocialNetwork = () => {
    append({ platform: '', url: '' })
  }

  useEffect(() => {
    if (user) {
      form.reset({
        user: {
          email: user?.email,
          wizard_step: 'password_step',
          user_detail_attributes: {
            first_name: user?.user_detail?.first_name || '',
            last_name: user?.user_detail?.last_name || '',
            birth_date: user?.user_detail?.birth_date || '',
            phone: user?.user_detail?.phone || '',
            dni: user?.user_detail?.dni || '',
            gender: user?.user_detail?.gender || '',
            username: user?.user_detail?.username || '',
            address_attributes: {
              address: user?.user_detail?.address?.address || '',
              city: user?.user_detail?.address?.city || '',
              province: user?.user_detail?.address?.province || '',
              country: user?.user_detail?.address?.country || '',
              postal_code: user?.user_detail?.address?.postal_code || '',
            },
            social_networks_attributes: user?.user_detail?.social_networks?.map((socialNetwork) => ({
              platform: socialNetwork?.platform || '',
              url: socialNetwork?.url || '',
            })),
          },
        },
      })
    }
  }, [user])

  const onSubmit = async (data: PersonalInfoFormValues) => {
    setIsSubmitting(true)
    const response = await updatePersonalInfo(user?.id?.toString() || '', data);
    if (response.success) {
      toast.success('Datos actualizados correctamente');
      navigate({ to: WIZARD_ROUTES['update-password'].path })
    } else {
      toast.error(response.error)
    }
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        {/* Card de Datos Básicos */}
        <div className='rounded-lg border bg-card p-6 shadow-sm'>
          <div className='mb-4'>
            <h3 className='text-lg font-medium'>Datos Básicos</h3>
            <p className='text-sm text-muted-foreground'>
              Información principal para tu perfil
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='user.email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='tucorreo@ejemplo.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user.user_detail_attributes.username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder='usuario123' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user.user_detail_attributes.first_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='Tu nombre' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user.user_detail_attributes.last_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder='Tus apellidos' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user.user_detail_attributes.phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder='+34 612 345 678' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user.user_detail_attributes.dni'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI/Identificación</FormLabel>
                  <FormControl>
                    <Input placeholder='12345678A' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user.user_detail_attributes.gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona tu género' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
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

            <FormField
              control={form.control}
              name='user.user_detail_attributes.birth_date'
              render={({ field }) => {
                // Estado local para manejar el texto del input
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
                              }
                            } else {
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
              }}
            />
          </div>
        </div>

        {/* Card de Dirección */}
        <div className='rounded-lg border bg-card p-6 shadow-sm'>
          <div className='mb-4'>
            <h3 className='text-lg font-medium'>Dirección</h3>
            <p className='text-sm text-muted-foreground'>
              Datos de tu ubicación física
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <FormField
              control={form.control}
              name='user.user_detail_attributes.address_attributes.address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder='Calle, número, piso, etc.' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='user.user_detail_attributes.address_attributes.city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input placeholder='Tu ciudad' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.address_attributes.province'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                      <Input placeholder='Tu provincia' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.address_attributes.country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input placeholder='Tu país' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.address_attributes.postal_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Postal</FormLabel>
                    <FormControl>
                      <Input placeholder='12345' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Card de Redes Sociales */}
        <div className='rounded-lg border bg-card p-6 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-medium'>Redes Sociales</h3>
              <p className='text-sm text-muted-foreground'>
                Añade tus perfiles en redes sociales
              </p>
            </div>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleAddSocialNetwork}
            >
              <IconPlus className='mr-2 h-4 w-4' />
              Añadir red social
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className='mb-4 grid grid-cols-1 items-end gap-4 rounded-md border p-4 md:grid-cols-2'
            >
              <FormField
                control={form.control}
                name={`user.user_detail_attributes.social_networks_attributes.${index}.platform`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataforma</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona plataforma' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {platformOptions.map((option) => (
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

              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name={`user.user_detail_attributes.social_networks_attributes.${index}.url`}
                  render={({ field }) => (
                    <FormItem className='flex-grow'>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder='https://...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  className='mb-0.5 self-end'
                  onClick={() => remove(index)}
                >
                  <IconTrash className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <p className='rounded-md bg-muted p-4 text-sm text-muted-foreground'>
              No has añadido ninguna red social. Puedes añadir una haciendo clic
              en el botón de arriba.
            </p>
          )}
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={isSubmitting}>
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  )
}
