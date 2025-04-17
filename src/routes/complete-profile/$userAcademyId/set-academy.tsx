import { createFileRoute } from '@tanstack/react-router'
import AcademySelectionStep from '@/features/complete-profile/academy-selection-step'
export const Route = createFileRoute(
  '/complete-profile/$userAcademyId/set-academy',
)({
  component: AcademySelectionStep,
})
