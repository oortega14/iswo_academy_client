import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/admin/academy-preferences',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/onboarding/$userAcademyId/admin/academy-preferences"!</div>
  )
}
