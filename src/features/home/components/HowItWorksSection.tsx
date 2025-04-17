import React from 'react'
import { motion } from 'framer-motion'
import { StepCard } from './StepCard'

const HowItWorksSection = ({
  howItWorksRef,
}: {
  howItWorksRef: React.RefObject<HTMLElement>
}) => {
  return (
    <motion.section
      ref={howItWorksRef}
      className='rounded-xl bg-muted/50 px-4 py-10 sm:py-12 md:py-16'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className='mb-10 text-center sm:mb-12 md:mb-16'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className='mb-3 text-2xl font-bold sm:text-3xl'>Cómo funciona</h2>
        <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
          En solo 3 sencillos pasos podrás tener tu academia online funcionando
        </p>
      </motion.div>

      <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3'>
        {[
          {
            number: '1',
            title: 'Regístrate',
            description:
              'Crea tu cuenta gratuita y configura tu perfil de academia.',
          },
          {
            number: '2',
            title: 'Crea tu contenido',
            description:
              'Sube tus videos, materiales y configura tus cursos a tu gusto.',
          },
          {
            number: '3',
            title: 'Empieza a enseñar',
            description:
              'Comparte tu academia, recibe alumnos y cobra por tu conocimiento.',
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <StepCard
              number={step.number}
              title={step.title}
              description={step.description}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default HowItWorksSection
