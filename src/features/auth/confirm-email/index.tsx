import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/api/hooks/use-auth'
import { showErrorToasts } from '@/api/utils/errorHandling'

export default function ConfirmEmail() {
  const { confirmation_token } = useSearch({ from: '/(auth)/confirm-email' })
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const { confirmEmail } = useAuth()

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await confirmEmail(confirmation_token)
      if (response.success) {
        setStatus('success')
        setMessage('¡Tu correo electrónico ha sido confirmado exitosamente!')
      } else {
        setStatus('error')
        showErrorToasts(response.error, 'Error en la confirmación de correo electrónico')
      }
    }

    verifyEmail()
  }, [confirmation_token])

  const StatusComponent = {
    loading: (
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-lg">Verificando tu correo electrónico...</p>
      </div>
    ),
    success: (
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <p className="text-lg font-medium text-green-500">{message}</p>
        <Button asChild>
          <Link to="/sign-in">Iniciar Sesión</Link>
        </Button>
      </div>
    ),
    error: (
      <div className="flex flex-col items-center space-y-4">
        <XCircle className="h-16 w-16 text-red-500" />
        <p className="text-lg font-medium text-red-500">{message}</p>
        <Button asChild variant="outline">
          <Link to="/sign-up">Volver al Registro</Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.4,
            }}
            className='relative m-auto flex flex-col items-center text-center'
          >
            <img
              src='/images/ISWO_LARGE.webp'
              width={301}
              height={60}
              alt='Tu Academia'
              className='mb-6 hover:animate-pulse invert'
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className='mt-6 max-w-md text-lg text-gray-200'
            >
              Transforma tu conocimiento en una experiencia educativa única. La
              plataforma todo-en-uno para crear, gestionar y hacer crecer tu
              academia online.
            </motion.p>
          </motion.div>
        </div>

        <div className='flex items-center justify-center p-4 lg:p-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]'
          >
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Confirmación de Correo Electrónico
              </h1>
              <p className="text-sm text-muted-foreground">
                Estamos procesando tu solicitud
              </p>
            </div>

            <div className="flex justify-center py-6">
              {StatusComponent[status]}
            </div>

            <Separator />

            <p className='px-8 text-center text-sm text-muted-foreground'>
              ¿Necesitas ayuda? Contacta a nuestro{' '}
              <a
                href='/support'
                className='underline underline-offset-4 hover:text-primary'
              >
                equipo de soporte
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
