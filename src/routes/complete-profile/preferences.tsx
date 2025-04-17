import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import WizardHeader from '@/features/complete-profile/components/WizardHeader'

export const Route = createFileRoute('/complete-profile/preferences')({
  component: PreferencesComponent,
})

function PreferencesComponent() {
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
        <h2 className='mb-6 text-2xl font-bold'>Preferencias</h2>
        <p className='mb-8 text-muted-foreground'>
          Personaliza tu experiencia configurando tus preferencias.
        </p>

        <div className='mb-12'>
          {/* Aquí iría el formulario de preferencias */}
          <div className='rounded-md border p-8 text-center text-muted-foreground'>
            El formulario de preferencias se implementará próximamente
          </div>
        </div>


      </div>
    </motion.div>
  )
}
