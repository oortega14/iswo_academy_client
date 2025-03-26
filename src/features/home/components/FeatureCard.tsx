import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className='h-full'>
        <CardHeader className='pb-2'>
          <div className='mb-2 sm:mb-4'>{icon}</div>
          <CardTitle className='text-lg sm:text-xl'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground sm:text-base'>
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
