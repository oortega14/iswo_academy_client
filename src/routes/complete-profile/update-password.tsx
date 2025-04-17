import { createFileRoute } from '@tanstack/react-router'
import UpdatePasswordStep from '@/features/complete-profile/update-password-step'

export const Route = createFileRoute('/complete-profile/update-password')({
  component: UpdatePasswordStep,
})

