import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconMail,
  IconUser,
  IconUserBolt,
} from '@tabler/icons-react'
import { api } from '@/api'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
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

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  user: z.object({
    email: z
      .string()
      .email({ message: 'Debe ser el formato de e-mail valido' }),
    user_detail_attributes: z.object({
      first_name: z
        .string()
        .min(3, { message: 'Nombre no puede estar vacío' })
        .max(50, { message: 'Nombre debe tener como máximo 50 caracteres' }),
      last_name: z
        .string()
        .min(3, { message: 'Tús apellidos no pueden estar vacíos' })
        .max(50, {
          message: 'Tús apellidos debe tener como máximo 50 caracteres',
        }),
    }),
  }),
})

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: {
        email: '',
        user_detail_attributes: {
          first_name: '',
          last_name: '',
        },
      },
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await api.post('/users', data)

      toast({
        title: '¡Registro exitoso!',
        description: 'Tu cuenta ha sido creada correctamente.',
      })

      navigate({ to: '/sign-in' })
    } catch (error) {
      if (
        error.response?.data?.error?.messages &&
        Array.isArray(error.response.data.error.messages)
      ) {
        error.response.data.error.messages.forEach((message: string) => {
          toast({
            variant: 'default',
            title: 'Error en el registro',
            description: message,
          })

          if (message.toLowerCase().includes('email ya existe')) {
            form.setError('user.email', {
              type: 'manual',
              message: 'Este email ya está registrado',
            })
          }
        })
      } else {
        toast({
          variant: 'default',
          title: 'Error en el registro',
          description: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='user.email'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <IconMail className='h-4 w-4' />
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='ejemplo@iswoacademy.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='user.user_detail_attributes.first_name'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <IconUserBolt className='h-4 w-4' />
                    <FormLabel>Nombre</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='Pon aquí tus nombres' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='user.user_detail_attributes.last_name'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <IconUserBolt className='h-4 w-4' />
                    <FormLabel>Apellidos</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='Pon aquí tus apellidos' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Crear cuenta
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  O continua con
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandGithub className='h-4 w-4' /> GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandFacebook className='h-4 w-4' /> Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
