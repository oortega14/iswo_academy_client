import { motion } from 'framer-motion'
import React from 'react'
import { PricingCard } from './PricingCard'

const PricingSection = ({ pricingRef }: { pricingRef: React.RefObject<HTMLElement> }) => {
  return (
    <motion.section
      ref={pricingRef}
      className='px-4 py-10 sm:py-12 md:py-16'
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
        <h2 className='mb-3 text-2xl font-bold sm:text-3xl'>
          Planes simples y transparentes
        </h2>
        <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
          Solo pagas una pequeña comisión por cada venta. Sin cuotas mensuales
          ni sorpresas.
        </p>
      </motion.div>

      <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
        {[
          {
            title: 'Básico',
            price: '5%',
            description: 'Para creadores que están empezando',
            features: [
              'Hasta 3 cursos',
              'Hasta 100 estudiantes',
              'Certificados básicos',
              'Soporte por email',
            ],
            buttonText: 'Comenzar gratis',
            highlighted: false,
          },
          {
            title: 'Pro',
            price: '10%',
            description: 'Para academias en crecimiento',
            features: [
              'Cursos ilimitados',
              'Estudiantes ilimitados',
              'Certificados personalizados',
              'Soporte prioritario',
              'Dominio personalizado',
            ],
            buttonText: 'Elegir plan Pro',
            highlighted: true,
          },
          {
            title: 'Empresarial',
            price: 'Personalizado',
            description: 'Para grandes organizaciones',
            features: [
              'Todo lo de Pro',
              'API personalizada',
              'Integración con LMS',
              'Gestor de cuenta dedicado',
              'Acuerdo de nivel de servicio',
            ],
            buttonText: 'Contactar ventas',
            highlighted: false,
          },
        ].map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <PricingCard
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              highlighted={plan.highlighted}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default PricingSection
