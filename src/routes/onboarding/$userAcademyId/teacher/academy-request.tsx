import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/teacher/academy-request',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/$userAcademyId/teacher/academy-request"!</div>
}
