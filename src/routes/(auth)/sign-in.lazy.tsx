import SignIn from '@/features/auth/sign-in/sign-in'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/sign-in')({
  component: SignIn,
})


