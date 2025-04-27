import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/student/final-confirmation',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/onboarding/$userAcademyId/student/final-confirmation"!</div>
  )
}
