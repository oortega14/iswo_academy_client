import { create } from 'zustand'

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

interface WizardState {
  currentStep: WizardStep
  setCurrentStep: (step: WizardStep) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  isFirstStep: () => boolean
  isLastStep: () => boolean
  getStepNumber: (step: WizardStep) => number
  getTotalSteps: () => number
}

export const useWizardStore = create<WizardState>()((set, get) => {
  return {
    currentStep: 'personal_info_step',
    
    setCurrentStep: (step) => set({ currentStep: step }),
    
    goToNextStep: () => {
      const { currentStep } = get()
      const currentStepNumber = WIZARD_STEPS[currentStep]
      const nextStepEntry = Object.entries(WIZARD_STEPS).find(
        ([_, value]) => value === currentStepNumber + 1
      )
      
      if (nextStepEntry) {
        set({ currentStep: nextStepEntry[0] as WizardStep })
      }
    },
    
    goToPreviousStep: () => {
      const { currentStep } = get()
      const currentStepNumber = WIZARD_STEPS[currentStep]
      const prevStepEntry = Object.entries(WIZARD_STEPS).find(
        ([_, value]) => value === currentStepNumber - 1
      )
      
      if (prevStepEntry) {
        set({ currentStep: prevStepEntry[0] as WizardStep })
      }
    },
    
    isFirstStep: () => {
      const { currentStep } = get()
      return WIZARD_STEPS[currentStep] === 0
    },
    
    isLastStep: () => {
      const { currentStep } = get()
      return WIZARD_STEPS[currentStep] === 6
    },
    
    getStepNumber: (step) => WIZARD_STEPS[step],
    
    getTotalSteps: () => Object.keys(WIZARD_STEPS).length
  }
}) 