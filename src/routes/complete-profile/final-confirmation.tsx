import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/complete-profile/final-confirmation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/complete-profile/final-confirmation"!</div>
}
