import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WizardHeader from '@/features/complete-profile/components/WizardHeader'

export const Route = createFileRoute('/complete-profile/confirmation')({
  component: ConfirmationComponent,
})

function ConfirmationComponent() {
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
        <div className='mb-8 flex flex-col items-center justify-center text-center'>
          <div className='mb-4 rounded-full bg-primary/10 p-4'>
            <CheckCircle className='h-16 w-16 text-primary' />
          </div>

          <h2 className='mb-2 text-2xl font-bold'>
            ¡Configuración Completada!
          </h2>
          <p className='max-w-lg text-muted-foreground'>
            Has completado todas las etapas necesarias para configurar tu
            perfil. Ahora puedes comenzar a utilizar todas las funcionalidades
            de la plataforma.
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <Link to='/' className='w-full max-w-xs'>
            <Button className='w-full'>Ir al Dashboard</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
