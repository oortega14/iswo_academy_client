import { useRef } from 'react'
import { motion } from 'framer-motion'
import WizardHeader from '@/features/onboarding/components/WizardHeader.tsx'
import PersonalInfoForm from '@/features/onboarding/personal-info-step/PersonalInfoForm.tsx'
import { COMMON_WIZARD_ROUTES } from '@/features/onboarding/config/wizard-routes.ts'

export default function PersonalInfoStep() {
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
        wizardRoutes={COMMON_WIZARD_ROUTES}
      />

      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        <h2 className='mb-6 text-2xl font-bold'>Completa tu perfil</h2>
        <p className='mb-8 text-muted-foreground'>
          Para comenzar a utilizar la plataforma, necesitamos algunos datos
          personales. Esta información nos ayudará a personalizar tu
          experiencia.
        </p>

        <PersonalInfoForm
          formRef={formRef}
        />
      </div>
    </motion.div>
  )
}
