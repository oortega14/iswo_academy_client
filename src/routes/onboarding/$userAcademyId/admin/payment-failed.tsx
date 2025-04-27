import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/admin/payment-failed',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/$userAcademyId/admin/payment-failed"!</div>
}
