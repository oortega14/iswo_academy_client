import React from 'react'
import { motion } from 'framer-motion'

interface StepCardProps {
  number: string
  title: string
  description: string
}

export const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <motion.div
      className='flex flex-col items-center py-4 text-center'
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground sm:h-16 sm:w-16 sm:text-2xl'>
        {number}
      </div>
      <h3 className='mb-2 text-lg font-bold sm:text-xl'>{title}</h3>
      <p className='text-sm text-muted-foreground sm:text-base'>
        {description}
      </p>
    </motion.div>
  )
}
