import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useNavigate } from '@tanstack/react-router'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  highlighted?: boolean
  path?: string
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlighted = false,
  path = ''
}) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate({
      to: path
    })
  }
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <Card
        className={`flex h-full flex-col ${highlighted ? 'border-primary shadow-lg' : ''}`}
      >
        <CardHeader className='pb-3'>
          <CardTitle className='text-lg sm:text-xl'>{title}</CardTitle>
          <div className='mb-1 mt-3 sm:mb-2 sm:mt-4'>
            <span className='text-3xl font-bold sm:text-4xl'>{price}</span>
            <span className='text-sm text-muted-foreground sm:text-base'>
              {' '}
              de comisión por venta
            </span>
          </div>
          <CardDescription className='text-sm sm:text-base'>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-grow'>
          <ul className='space-y-2 sm:space-y-3'>
            {features.map((feature, i) => (
              <li key={i} className='flex items-center text-sm sm:text-base'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2 h-4 w-4 text-primary'
                >
                  <path d='M20 6L9 17l-5-5' />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full text-sm sm:text-base'
            variant={highlighted ? 'default' : 'outline'}
            onClick={handleNavigate}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
