import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { WizardStep, useWizardStore } from '@/stores/wizardStore'
import PersonalInfoStep from './personal-info-step'

const stepComponents: Record<WizardStep, React.ComponentType> = {
  personal_info_step: PersonalInfoStep,
  password_step: () => <div>Paso de contraseña - Por implementar</div>,
  academy_selection_step: () => (
    <div>Paso de selección de academia - Por implementar</div>
  ),
  payment_info_step: () => (
    <div>Paso de información de pago - Por implementar</div>
  ),
  payment_method_step: () => (
    <div>Paso de método de pago - Por implementar</div>
  ),
  preferences_step: () => <div>Paso de preferencias - Por implementar</div>,
  confirmation_step: () => <div>Paso de confirmación - Por implementar</div>,
}

export default function CompleteProfileWizard() {
  const { currentStep, setCurrentStep } = useWizardStore()
  const { auth } = useAuthStore()

  // Actualizar el paso del wizard según el usuario actual
  useEffect(() => {
    if (auth.user?.wizard_step) {
      setCurrentStep(auth.user.wizard_step as WizardStep)
    }
  }, [auth.user, setCurrentStep])

  const StepComponent = stepComponents[currentStep]

  return <StepComponent />
}
