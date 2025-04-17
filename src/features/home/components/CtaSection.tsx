import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '@/components/ui/button'

const CtaSection = ({ ctaRef }: { ctaRef: React.RefObject<HTMLElement> }) => {
  return (
    <motion.section
      ref={ctaRef}
      className='rounded-xl bg-primary/10 px-4 py-10 text-center sm:py-12 md:py-16'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className='mb-4 text-2xl font-bold sm:text-3xl'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        ¿Listo para empezar tu academia?
      </motion.h2>
      <motion.p
        className='mx-auto mb-6 max-w-2xl text-base text-muted-foreground sm:mb-8 sm:text-lg md:text-xl'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Únete a cientos de educadores que ya están compartiendo su conocimiento
        y generando ingresos con nuestra plataforma.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button size='lg' className='w-full px-8 text-lg sm:w-auto'>
          Crear mi academia ahora
        </Button>
      </motion.div>
    </motion.section>
  )
}

export default CtaSection
