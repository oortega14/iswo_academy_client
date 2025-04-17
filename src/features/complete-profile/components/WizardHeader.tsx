import { useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  WIZARD_ROUTES,
  getStepByPath,
} from '../config/wizard-routes'

export default function WizardHeader() {
  const router = useRouter()
  const currentPath = router.state.location.pathname
  const currentStep = getStepByPath(currentPath) || 'personal-info'

  const totalSteps = Object.keys(WIZARD_ROUTES).length
  const currentStepConfig = WIZARD_ROUTES[currentStep]

  const progress = (currentStepConfig.order / (totalSteps - 1)) * 100

  return (
    <div className='mb-8 w-full'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{currentStepConfig.title}</h2>
        <span className='text-sm text-muted-foreground'>
          Paso {currentStepConfig.order + 1} de {totalSteps}
        </span>
      </div>

      <div className='relative h-2 overflow-hidden rounded-full bg-muted'>
        <motion.div
          className='absolute left-0 top-0 h-full bg-primary'
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className='mt-2 flex justify-between'>
        {Object.entries(WIZARD_ROUTES)
          .sort(([_, a], [__, b]) => a.order - b.order)
          .map(([step, config]) => {
            const isActive = currentStepConfig.order >= config.order
            return (
              <div key={step} className='flex flex-col items-center'>
                <div
                  className={`mb-1 h-4 w-4 rounded-full ${isActive ? 'bg-primary' : 'bg-muted-foreground/30'} transition-colors duration-300`}
                />
                <span className='hidden text-xs text-muted-foreground sm:block'>
                  {config.title}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
