import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/complete-profile/personal-info')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/complete-profile/personal-info"!</div>
}
