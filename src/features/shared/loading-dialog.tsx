'use client'

import { useState, useEffect } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { IswoIconSmall } from '@/icons/IswoIconSmall'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

interface LoadingModalProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  message?: string
  autoClose?: boolean
  autoCloseTime?: number
}

export function LoadingModal({
  isOpen = false,
  onOpenChange,
  message = 'Cargando...',
  autoClose = false,
  autoCloseTime = 3000,
}: LoadingModalProps) {
  const [open, setOpen] = useState(isOpen)

  // Sync internal state with props
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  // Handle auto close
  useEffect(() => {
    if (autoClose && open) {
      const timer = setTimeout(() => {
        setOpen(false)
        onOpenChange?.(false)
      }, autoCloseTime)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, open, onOpenChange])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='border-none bg-transparent shadow-none sm:max-w-md'
        hideCloseButton={true}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className='sr-only'>Cargando...</DialogTitle>
        <DialogDescription className='sr-only'>
          Operación en proceso. Por favor espere mientras se completa.
        </DialogDescription>
        <div className='flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900'>
          <div className='relative mb-6 h-32 w-32'>
            {/* Logo container - Replace the SVG below with your company logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='absolute inset-0 flex items-center justify-center'
            >
              <IswoIconSmall className='h-16 w-16' />
            </motion.div>

            {/* Spinning loader around the logo */}
            <motion.div
              className='absolute inset-0'
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              <div className='h-full w-full rounded-full border-t-4 border-primary opacity-20' />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-center'
          >
            <p className='text-lg font-medium text-gray-700 dark:text-gray-300'>
              {message}
            </p>
            <div className='mt-4 flex items-center justify-center space-x-2'>
              <Loader2 className='h-5 w-5 animate-spin text-primary' />
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                Por favor espere...
              </span>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingModal
