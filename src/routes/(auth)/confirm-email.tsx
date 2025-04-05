import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/confirm-email')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      confirmation_token: String(search.confirmation_token),
    }
  },
})
