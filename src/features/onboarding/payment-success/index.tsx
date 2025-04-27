import { motion } from 'framer-motion'
import WizardHeader from '../components/WizardHeader'
import { useEffect } from 'react'
import { ADMIN_WIZARD_ROUTES } from '@/features/onboarding/config/wizard-routes.ts'
import { useNavigate, useParams } from '@tanstack/react-router'

export default function SuccessRedirect() {
  const navigate = useNavigate()
  const { userAcademyId } = useParams({
    from: '/onboarding/$userAcademyId/admin/payment-success'
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({
        to: `/onboarding/${userAcademyId}/admin/create-academy`,
        params: {
          userAcademyId: String(userAcademyId)
        }
      });
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='px-6 py-8'
    >
      <WizardHeader
        wizardRoutes={ADMIN_WIZARD_ROUTES}
      />

      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        <h2 className='mb-6 text-2xl font-bold'>¡Felicidades!</h2>
        <p className='mb-8 text-muted-foreground'>
          Tu pago ha sido procesado exitosamente. Serás redirigido automáticamente
          para comenzar a crear tu academia en unos segundos.
        </p>

        <div className='mb-12'>
          <div className='rounded-md border p-8 text-center text-muted-foreground'>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p>Preparando tu nueva academia...</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}