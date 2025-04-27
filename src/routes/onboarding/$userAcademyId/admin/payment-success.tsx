import { createFileRoute } from '@tanstack/react-router'
import SuccessRedirect from '@/features/onboarding/payment-success'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/admin/payment-success',
)({
  component: SuccessRedirect,
})
