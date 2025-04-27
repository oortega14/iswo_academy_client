import { useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  getStepByPath,
  WizardStepRoute,
  WizardStepName
} from '@/features/onboarding/config/wizard-routes.ts'

export default function WizardHeader<T extends WizardStepName>(
  {
    wizardRoutes,
    maxStepsToShow
  }: {
    wizardRoutes: Record<T, WizardStepRoute>,
    maxStepsToShow?: number
  }) {
  const router = useRouter()
  const currentPath = router.state.location.pathname
  const currentStep = getStepByPath(currentPath, wizardRoutes)
  const totalSteps = maxStepsToShow === undefined ? Object.keys(wizardRoutes).length + 1 : Object.keys(wizardRoutes).length
  const defaultStep = Object.keys(wizardRoutes)[0] as T
  const currentStepConfig = currentStep ? wizardRoutes[currentStep] : wizardRoutes[defaultStep]
  const progress = ((currentStepConfig.order + 1) / totalSteps) * 100
  const entries = Object.entries(wizardRoutes) as Array<[T, WizardStepRoute]>;
  const sortedSteps = entries.sort(([_, a], [__, b]) => a.order - b.order);
  let stepsToShow = sortedSteps
  let showMoreIndicator = false

  if (maxStepsToShow !== undefined && sortedSteps.length > maxStepsToShow) {
    const currentIndex = sortedSteps.findIndex(([key]) => key === currentStep)
    const beforeCount = Math.floor((maxStepsToShow - 1) / 2)
    const afterCount = maxStepsToShow - 1 - beforeCount
    let startIndex = Math.max(0, currentIndex - beforeCount)
    let endIndex = Math.min(sortedSteps.length - 1, currentIndex + afterCount)
    if (currentIndex < beforeCount) {
      endIndex = Math.min(sortedSteps.length - 1, maxStepsToShow - 1)
    } else if (currentIndex > sortedSteps.length - 1 - afterCount) {
      startIndex = Math.max(0, sortedSteps.length - maxStepsToShow)
    }
    stepsToShow = sortedSteps.slice(startIndex, endIndex + 1)
    showMoreIndicator = stepsToShow.length < sortedSteps.length
  } else if (maxStepsToShow === undefined) {
    stepsToShow = sortedSteps
    showMoreIndicator = true
  }

  return (
    <div className='mb-8 w-full'>
      <div className='relative h-2 overflow-hidden rounded-full bg-muted'>
        <motion.div
          className='absolute left-0 top-0 h-full bg-primary'
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className='mt-2 flex justify-between'>
        {stepsToShow.map(([step, config]) => {
          const isActive = currentStepConfig.order >= config.order
          const isCurrentStep = currentStep === step

          return (
            <div key={step} className='flex flex-col items-center'>
              <div
                className={`
                  mb-1 h-4 w-4 rounded-full 
                  ${isActive ? 'bg-primary' : 'bg-muted-foreground/30'} 
                  ${isCurrentStep ? 'ring-2 ring-primary/50' : ''}
                  transition-colors duration-300
                `}
              />
              <span className='hidden text-xs text-muted-foreground sm:block'>
                {config.title}
              </span>
            </div>
          )
        })}

        {/* Puntos suspensivos cuando corresponde */}
        {showMoreIndicator && (
          <div className='flex flex-col items-center'>
            <div className='mb-1 flex h-4 space-x-1'>
              <div className='h-1 w-1 rounded-full bg-muted-foreground/30'></div>
              <div className='h-1 w-1 rounded-full bg-muted-foreground/30'></div>
              <div className='h-1 w-1 rounded-full bg-muted-foreground/30'></div>
            </div>
            <span className='hidden text-xs text-muted-foreground sm:block'>
              Más pasos...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
