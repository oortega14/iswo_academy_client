import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import WizardHeader from '@/features/complete-profile/components/WizardHeader'

export const Route = createFileRoute('/complete-profile/payment-info')({
  component: PaymentInfoComponent,
})

function PaymentInfoComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='px-6 py-8'
    >
      <WizardHeader />

      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        <h2 className='mb-6 text-2xl font-bold'>Información de Pago</h2>
        <p className='mb-8 text-muted-foreground'>
          Completa la información necesaria para procesar tus pagos.
        </p>

        <div className='mb-12'>
          {/* Aquí iría el formulario de información de pago */}
          <div className='rounded-md border p-8 text-center text-muted-foreground'>
            El formulario de información de pago se implementará próximamente
          </div>
        </div>

      </div>
    </motion.div>
  )
}
