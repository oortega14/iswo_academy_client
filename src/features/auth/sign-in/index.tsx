import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { UserAuthForm } from './components/user-auth-form'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function SignIn() {
  useEffect(() => {
    const authMessage = localStorage.getItem('auth_message')
    if (authMessage === 'session_expired') {
      toast.error('Sesión expirada, por favor inicia sesión nuevamente')
      localStorage.removeItem('auth_message')
    }
  }, [])
  
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
              className='mb-6 invert hover:animate-pulse'
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
            className='mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[380px]'
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.4,
              }}
              className='relative flex flex-col items-center text-center lg:hidden'
            >
              <img
                src='/images/ISWO_LARGE.webp'
                width={301}
                height={60}
                alt='Tu Academia'
                className='mb-8 w-48 hover:animate-pulse sm:w-64 md:w-72'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='flex flex-col space-y-3 text-left'
            >
              <h1 className='text-2xl font-semibold tracking-tight'>
                Iniciar sesión
              </h1>
              <p className='text-sm text-muted-foreground'>
                Ingresa tu correo electrónico y contraseña para iniciar sesión
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <UserAuthForm />
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className='flex flex-col space-y-4 text-center text-sm'
            >
              <div className='flex justify-center space-x-4'>
                <Link
                  to='/sign-up'
                  className='text-sm text-primary hover:underline'
                >
                  ¿No tienes cuenta? Regístrate
                </Link>
                <Link
                  to='/forgot-password'
                  className='text-sm text-primary hover:underline'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Link
                to='/'
                className='text-sm text-muted-foreground hover:text-primary'
              >
                Volver al inicio
              </Link>
            </motion.div>

            <Separator />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className='px-8 text-center text-sm text-muted-foreground'
            >
              Al iniciar sesión, aceptas nuestros{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Términos de servicio
              </a>{' '}
              y{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Política de privacidad
              </a>
              .
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
