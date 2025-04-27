import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/student/join-academy',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/$userAcademyId/student/join-academy"!</div>
}
