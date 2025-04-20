import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/complete-profile/$userAcademyId/set-academy/success',
)({
  component: RouteComponent2,
})

function RouteComponent2() {
  return (
    <div>hola jajja!</div>
  )
}
