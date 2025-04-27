import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/admin/final-confirmation',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/$userAcademyId/admin/final-confirmation"!</div>
}
