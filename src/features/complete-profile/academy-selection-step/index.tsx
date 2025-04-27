import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { UserAcademy } from '@/models/user-academy'
import { motion } from 'framer-motion'
import useFetchById from '@/api/hooks/use-fetch-by-id'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AdminAcademyStep from '@/features/onboarding/components/AdminAcademyStep'
import ProfessorAcademyStep from '@/features/onboarding/components/ProfessorAcademyStep'
import StudentAcademyStep from '@/features/onboarding/components/StudentAcademyStep'
import WizardHeader from '@/features/onboarding/components/WizardHeader'

const AcademySelectionStep = () => {
  const [loading, setLoading] = useState(false)
  const { userAcademyId } = useParams({
    from: '/complete-profile/$userAcademyId/set-academy',
  })
  const { data: userAcademy } = useFetchById<UserAcademy>({
    id: userAcademyId as string,
    endpoint: '/user_academies',
    setLoadingCallback: setLoading,
  })
  const renderContent = () => {
    if (!userAcademy) return null

    switch (userAcademy.role) {
      case 'student':
        return <StudentAcademyStep />

      case 'teacher':
        return <ProfessorAcademyStep />

      case 'admin':
        return <AdminAcademyStep />

      default:
        return (
          <div className='text-center text-gray-500'>
            Por favor, selecciona un rol en el paso anterior.
          </div>
        )
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='px-6 py-8'
      >
        <WizardHeader />
        <div className='rounded-lg border bg-card p-6 shadow-sm'>
          <Card>
            <CardHeader>
              <div className='mb-2 h-7 w-3/4 animate-pulse rounded bg-gray-200'></div>
              <div className='h-5 w-full animate-pulse rounded bg-gray-200'></div>
            </CardHeader>
            <CardContent>
              <div className='h-36 animate-pulse rounded bg-gray-200'></div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='px-6 py-8'
    >
      <WizardHeader />

      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Academia</CardTitle>
            <CardDescription>
              {userAcademy?.role === 'student'
                ? 'Selecciona la academia a la que deseas unirte'
                : userAcademy?.role === 'professor'
                  ? 'Únete a una academia existente o continúa sin una'
                  : userAcademy?.role === 'admin'
                    ? 'Crea tu propia academia'
                    : 'Configura tu relación con las academias'}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default AcademySelectionStep
