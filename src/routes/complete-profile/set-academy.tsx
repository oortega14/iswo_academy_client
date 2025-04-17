import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import WizardHeader from '@/features/complete-profile/components/WizardHeader'


export const Route = createFileRoute('/complete-profile/set-academy')({
  component: SetAcademyComponent,
})

function SetAcademyComponent() {
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
        <h2 className='mb-6 text-2xl font-bold'>Selección de Academia</h2>
        <p className='mb-8 text-muted-foreground'>
          Selecciona la academia a la que deseas unirte o crea una nueva.
        </p>

        <div className='mb-12'>
          {/* Aquí iría el formulario de selección de academia */}
          <div className='rounded-md border p-8 text-center text-muted-foreground'>
            El formulario de selección de academia se implementará próximamente
          </div>
        </div>

      </div>
    </motion.div>
  )
}
