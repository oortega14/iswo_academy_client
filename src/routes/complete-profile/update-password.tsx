import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/complete-profile/update-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/complete-profile/update-password"!</div>
}
