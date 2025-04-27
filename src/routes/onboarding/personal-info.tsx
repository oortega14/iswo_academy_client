import { createFileRoute } from '@tanstack/react-router'
import PersonalInfoStep from '@/features/onboarding/personal-info-step'

export const Route = createFileRoute("/onboarding/personal-info")({
  component: PersonalInfoStep,
})