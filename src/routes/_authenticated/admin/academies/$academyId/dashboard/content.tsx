import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute(
  '/_authenticated/admin/academies/$academyId/dashboard/content',
)({
  component: Dashboard,
})
