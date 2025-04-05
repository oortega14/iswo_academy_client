import { createLazyFileRoute } from '@tanstack/react-router'
import ConfirmEmail from '@/features/auth/confirm-email'

export const Route = createLazyFileRoute('/(auth)/confirm-email')({
  component: ConfirmEmail,
})
