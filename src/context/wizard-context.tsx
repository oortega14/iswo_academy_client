import { createContext, useContext, useState, ReactNode } from 'react'

export type WizardStep =
  | 'personal_info_step'
  | 'password_step'
  | 'academy_selection_step'
  | 'payment_info_step'
  | 'payment_method_step'
  | 'preferences_step'
  | 'confirmation_step'

export const WIZARD_STEPS = {
  personal_info_step: 0,
  password_step: 1,
  academy_selection_step: 2,
  payment_info_step: 3,
  payment_method_step: 4,
  preferences_step: 5,
  confirmation_step: 6,
} as const

type WizardContextType = {
  currentStep: WizardStep
  setCurrentStep: (step: WizardStep) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  getStepNumber: (step: WizardStep) => number
}

const WizardContext = createContext<WizardContextType | undefined>(undefined)

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] =
    useState<WizardStep>('personal_info_step')

  const getStepNumber = (step: WizardStep) => WIZARD_STEPS[step]

  const goToNextStep = () => {
    const currentStepNumber = WIZARD_STEPS[currentStep]
    const nextStepEntry = Object.entries(WIZARD_STEPS).find(
      ([_, value]) => value === currentStepNumber + 1
    )

    if (nextStepEntry) {
      setCurrentStep(nextStepEntry[0] as WizardStep)
    }
  }

  const goToPreviousStep = () => {
    const currentStepNumber = WIZARD_STEPS[currentStep]
    const prevStepEntry = Object.entries(WIZARD_STEPS).find(
      ([_, value]) => value === currentStepNumber - 1
    )

    if (prevStepEntry) {
      setCurrentStep(prevStepEntry[0] as WizardStep)
    }
  }

  const isFirstStep = WIZARD_STEPS[currentStep] === 0
  const isLastStep = WIZARD_STEPS[currentStep] === 6

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
        isFirstStep,
        isLastStep,
        getStepNumber,
      }}
    >
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider')
  }
  return context
}
