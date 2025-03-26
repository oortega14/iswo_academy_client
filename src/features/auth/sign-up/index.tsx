import { motion } from 'framer-motion'
import ViteLogo from '@/assets/vite.svg'
import { SignUpForm } from './components/sign-up-form'

export default function SignUp() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='lg:p-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='mb-3 flex flex-col space-y-2 text-left'
            >
              <h1 className='text-2xl font-semibold tracking-tight'>
                Vamos a crear tu cuenta
              </h1>
              <p className='text-sm text-muted-foreground'>
                Ingresa tus datos para crear una cuenta
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <SignUpForm />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='px-8 text-center text-sm text-muted-foreground'
            >
              Al crear una cuenta, aceptas nuestros{' '}
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

        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-l lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative z-20 flex items-center text-lg font-medium'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            Tu Academia Online
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.3,
            }}
            className='relative m-auto flex flex-col items-center text-center'
          >
            <img
              src={ViteLogo}
              width={301}
              height={60}
              alt='Tu Academia'
              className='mb-6 hover:animate-pulse'
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mb-3 text-2xl font-bold'
            >
              Crea tu Academia Online
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='max-w-md text-lg text-gray-200'
            >
              Transforma tu conocimiento en una experiencia educativa única. La
              plataforma todo-en-uno para crear, gestionar y hacer crecer tu
              academia online.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className='relative z-20 mt-auto'
          >
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;Crea tu academia online y comienza a enseñar hoy
                mismo.&rdquo;
              </p>
              <footer className='text-sm'>Iswo Academy</footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
