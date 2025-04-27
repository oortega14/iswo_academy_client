import { motion } from 'framer-motion'
import WizardHeader from '../components/WizardHeader'
import { useRef } from 'react'
import { ADMIN_WIZARD_ROUTES } from '@/features/onboarding/config/wizard-routes.ts'
import { PricingCard } from '@/features/home/components/PricingCard.tsx'

export default function PaymentInfoStep() {
  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='px-6 py-8'
    >
      <WizardHeader
        wizardRoutes={ADMIN_WIZARD_ROUTES}
        maxStepsToShow={5}
      />

      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        <motion.section
          ref={formRef}
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
              Elige el plan que se adapta a tu crecimiento
            </h2>
            <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
              Comienza gratis con el plan básico y mejora a medida que tu academia crece. Solo cobramos una pequeña comisión en los planes superiores.
            </p>
          </motion.div>

          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            {[
              {
                title: 'Básico',
                price: '5%',
                description: 'Ideal para creadores que están comenzando.',
                features: [
                  'Hasta 3 cursos',
                  'Hasta 100 estudiantes',
                  'Certificados básicos',
                  'Soporte por email',
                  'Sin comisión por ventas',
                ],
                buttonText: 'Comenzar gratis',
                highlighted: false,
                redirectTo: '/contact'
              },
              {
                title: 'Pro',
                price: '10% por venta',
                description: 'Para academias en crecimiento con más demanda.',
                features: [
                  'Cursos ilimitados',
                  'Estudiantes ilimitados',
                  'Certificados personalizados',
                  'Soporte prioritario',
                  'Dominio personalizado',
                  'Comisión del 10% por venta',
                ],
                buttonText: 'Elegir plan Pro',
                highlighted: true,
                redirectTo: '/contact'
              },
              {
                title: 'Empresarial',
                price: 'Personalizado',
                description: 'Soluciones para grandes organizaciones.',
                features: [
                  'Todo lo de Pro',
                  'API personalizada',
                  'Integración con LMS',
                  'Gestor de cuenta dedicado',
                  'Acuerdo de nivel de servicio',
                  'Comisión y condiciones a convenir',
                ],
                buttonText: 'Contactar ventas',
                highlighted: false,
                redirectTo: '/contact'
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
                  path={plan.redirectTo}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}