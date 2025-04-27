import { createFileRoute } from '@tanstack/react-router'
import UpdatePasswordStep from '@/features/onboarding/password-info-step'

export const Route = createFileRoute('/onboarding/password-info')({
  component: UpdatePasswordStep,
})
