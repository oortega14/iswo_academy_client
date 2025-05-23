import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconMail,
  IconLock,
} from '@tabler/icons-react'
import { useAuth } from '@/api/hooks/use-auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { showErrorToasts } from '@/api/utils/errorHandling'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  user: z.object({
    email: z
      .string()
      .min(1, { message: 'Por favor, ingrese su correo electrónico' })
      .email({ message: 'Dirección de correo electrónico inválida' }),
    password: z
      .string()
      .min(1, {
        message: 'Por favor, ingrese su contraseña',
      })
      .min(7, {
        message: 'La contraseña debe tener al menos 7 caracteres',
      }),
  }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: {
        email: '',
        password: '',
      },
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const response = await login(data)
    if (response.success && response.data) {
      toast.success('¡Inicio de sesión exitoso!')
      if (!response.data.user.is_profile_completed) {
        switch (response.data.user.wizard_step) {
          case 'personal_info_step':
            navigate({ to: '/onboarding/personal-info' })
            break;
          case 'password_step':
            navigate({ to: '/onboarding/password-info' })
            break;
          default:
            break;
        }
      } else {
        navigate({ to: '/choose-academy' })
      }
    } else {
      showErrorToasts(response.error, 'Error en las credenciales de inicio de sesión')
    }
    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='user.email'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex items-center justify-start gap-2'>
                    <IconMail className='h-5 w-5 text-muted-foreground' />
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='ejemplo@iswo.com.co' autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='user.password'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex items-center justify-start gap-2'>
                    <IconLock className='h-5 w-5 text-muted-foreground' />
                    <FormLabel>Contraseña</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-4' disabled={isLoading}>
              Login
            </Button>

            <div className='relative my-4'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  O continua con
                </span>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandGithub className='mr-2 h-4 w-4' /> GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandFacebook className='mr-2 h-4 w-4' /> Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
