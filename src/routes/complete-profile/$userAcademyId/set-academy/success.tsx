import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/complete-profile/$userAcademyId/set-academy/success',
)({
  component: Success
})

function Success() {
  return (
    <div className="p-4">
      <h1>¡Éxito!</h1>
      <div>hola jajja!</div>
    </div>
  )
}