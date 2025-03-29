import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/choose-academy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/choose-academy"!</div>
}
