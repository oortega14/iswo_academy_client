import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
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
import { PasswordInput } from '@/components/password-input'
import { PinInput } from '@/components/pin-input'

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  user: z.object({
    email: z
      .string()
      .email({ message: "Debe ser el formato de e-mail valido" }),
    user_detail_attributes: z.object({
      first_name: z
        .string()
        .min(3, { message: "Nombre no puede estar vacío" })
        .max(50, { message: "Nombre debe tener como máximo 50 caracteres" }),
      last_name: z
        .string()
        .min(3, { message: "Tús apellidos no pueden estar vacíos" })
        .max(50, {
          message: "Tús apellidos debe tener como máximo 50 caracteres",
      }),
    }),
  }),
});


export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)

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
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // eslint-disable-next-line no-console
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='user.user_detail_attributes.first_name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <PinInput>
                      <span>hola</span>
                    </PinInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='user.user_detail_attributes.last_name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Create Account
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
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
