import { useEffect, useState } from 'react'
import { initializeAuth } from '@/api/auth/authUtils'
import LoadingDialog, { LoadingModal } from '@/features/shared/loading-dialog'

interface AuthInitializerProps {
  children: React.ReactNode
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const [isInitialized, setIsInitialized] = useState(false)

  const isPublicRoute = (path: string) => {
    return (
      ['/sign-in', '/sign-up', '/recover-password', '/reset-password'].includes(
        path
      ) || path.startsWith('/confirm-email')
    )
  }

  useEffect(() => {
    const initialize = async () => {
      const currentPath = window.location.pathname

      if (isPublicRoute(currentPath)) {
        setIsInitialized(true)
        return
      }

      try {
        const result = await initializeAuth()

        if (!result.success) {
          const hadPreviousSession =
            localStorage.getItem('had_session') === 'true'

          if (hadPreviousSession) {
            localStorage.setItem('auth_message', 'session_expired')
          }

          window.location.href = '/sign-in'
          return
        }

        localStorage.setItem('had_session', 'true')
        setIsInitialized(true)
      } catch (error) {
        console.error('Error en la inicialización:', error)
        setIsInitialized(true)
      }
    }

    initialize()
  }, [])

  if (!isInitialized) {
    return <LoadingModal isOpen={true} message='Cargando...' />
  }

  return <>{children}</>
}
