import { createFileRoute } from '@tanstack/react-router'
import CreateAcademyForm from '@/features/onboarding/create-academy'

export const Route = createFileRoute(
  '/onboarding/$userAcademyId/admin/create-academy',
)({
  component: CreateAcademyForm,
})