import { createFileRoute } from '@tanstack/react-router'
import { AdminPayment } from '@/features/complete-profile/admin-payment'

export const Route = createFileRoute(
  '/complete-profile/$userAcademyId/admin-payment',
)({
  component: AdminPayment,
})
