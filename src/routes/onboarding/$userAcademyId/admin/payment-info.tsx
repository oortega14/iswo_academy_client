import { createFileRoute } from '@tanstack/react-router'
import PaymentInfoStep from '@/features/onboarding/payment-info'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/admin/payment-info',
)({
  component: PaymentInfoStep,
})
