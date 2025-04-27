import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/teacher/final-confirmation',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/onboarding/$userAcademyId/teacher/final-confirmation"!</div>
  )
}
