import { motion } from 'framer-motion'
import WizardHeader from '../components/WizardHeader'
import UpdatePasswordForm from './UpdatePasswordForm'
import { useRef } from 'react'
export default function UpdatePasswordStep() {
  const formRef = useRef<HTMLFormElement>(null!)

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
        <h2 className='mb-6 text-2xl font-bold'>Actualiza tu contraseña</h2>
        <p className='mb-8 text-muted-foreground'>
          Para garantizar la seguridad de tu cuenta, es recomendable establecer
          una contraseña segura.
        </p>

        <div className='mb-12'>
          <div className='rounded-md border p-8 text-center text-muted-foreground'>
          <UpdatePasswordForm
            formRef={formRef}
          />
          </div>
        </div>

      </div>
    </motion.div>
  )
}