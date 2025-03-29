import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/complete-profile/$userAcademyId/set-preferences/$academyId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/complete-profile/$userAcademyId/set-preferences/$academyId"!
    </div>
  )
}
