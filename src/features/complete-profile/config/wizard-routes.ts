export type WizardStepRoute = {
  path: string
  title: string
  order: number
}

export type WizardStepName = 
  | 'personal-info'
  | 'update-password'
  | 'set-academy'
  | 'payment-info'
  | 'payment-method'
  | 'preferences'
  | 'confirmation'

export const WIZARD_ROUTES: Record<WizardStepName, WizardStepRoute> = {
  'personal-info': {
    path: '/complete-profile/personal-info',
    title: 'Información Personal',
    order: 0
  },
  'update-password': {
    path: '/complete-profile/update-password',
    title: 'Contraseña',
    order: 1
  },
  'set-academy': {
    path: '/complete-profile/$userAcademyId/set-academy',
    title: 'Selección de Academia',
    order: 2
  },
  'payment-info': {
    path: '/complete-profile/payment-info',
    title: 'Información de Pago',
    order: 3
  },
  'payment-method': {
    path: '/complete-profile/payment-method',
    title: 'Método de Pago',
    order: 4
  },
  'preferences': {
    path: '/complete-profile/preferences',
    title: 'Preferencias',
    order: 5
  },
  'confirmation': {
    path: '/complete-profile/confirmation',
    title: 'Confirmación',
    order: 6
  }
}

export function getStepByPath(path: string): WizardStepName | undefined {
  const exactMatch = Object.entries(WIZARD_ROUTES).find(
    ([_, config]) => config.path === path
  )
  if (exactMatch) return exactMatch[0] as WizardStepName

  const dynamicRouteMatch = Object.entries(WIZARD_ROUTES).find(
    ([_, config]) => {
      const pattern = config.path.replace('$userAcademyId', '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      return regex.test(path)
    }
  )
  
  return dynamicRouteMatch
    ? (dynamicRouteMatch[0] as WizardStepName)
    : undefined
}

export function getNextStep(currentStep: WizardStepName): WizardStepName | undefined {
  const currentOrder = WIZARD_ROUTES[currentStep].order
  const entry = Object.entries(WIZARD_ROUTES).find(([_, config]) => config.order === currentOrder + 1)
  return entry ? entry[0] as WizardStepName : undefined
}

export function getPreviousStep(currentStep: WizardStepName): WizardStepName | undefined {
  const currentOrder = WIZARD_ROUTES[currentStep].order
  const entry = Object.entries(WIZARD_ROUTES).find(([_, config]) => config.order === currentOrder - 1)
  return entry ? entry[0] as WizardStepName : undefined
}

export function isFirstStep(step: WizardStepName): boolean {
  return WIZARD_ROUTES[step].order === 0
}

export function isLastStep(step: WizardStepName): boolean {
  return WIZARD_ROUTES[step].order === 6
}

export function getTotalSteps(): number {
  return Object.keys(WIZARD_ROUTES).length
} 