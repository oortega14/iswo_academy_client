import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface HomeHeaderProps extends React.HTMLAttributes<HTMLElement> {
  scrolled: boolean
}

export const HomeHeader = ({ className, scrolled }: HomeHeaderProps) => {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-50 w-full bg-background transition-all',
        scrolled ? 'shadow-md' : '',
        className
      )}
    >
      <motion.header
        className='flex h-16 items-center justify-between px-4 py-3 md:px-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex items-center'>
          <a
            href='/'
            className='flex items-center gap-2 text-xl font-bold text-foreground'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-6 w-6 text-primary'
            >
              <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
              <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
            </svg>
            ISWO Academy
          </a>
        </div>
        <div className='flex items-center space-x-2 sm:space-x-4'>
          <Button
            variant='outline'
            className='hidden font-medium sm:inline-flex'
            onClick={() => navigate({ to: '/sign-in' })}
          >
            Iniciar Sesión
          </Button>
          <Button
            className='font-medium'
            onClick={() => navigate({ to: '/sign-up' })}
          >
            <span className='sm:inline'>Registrarse</span>
          </Button>
        </div>
      </motion.header>
    </div>
  )
}

HomeHeader.displayName = 'HomeHeader'
