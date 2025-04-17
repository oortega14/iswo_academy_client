import PersonalInfoStep from '@/features/complete-profile/personal-info-step'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/complete-profile/personal-info')({
  component: PersonalInfoStep,
})


