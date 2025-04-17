import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BuildingIcon } from "lucide-react"
import { useNavigate, useParams } from "@tanstack/react-router"

const AdminAcademyStep = () => {
  const navigate = useNavigate()
  const { userAcademyId } = useParams({
    from: '/complete-profile/$userAcademyId/set-academy',
  })
  return (
    <div className='mt-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='default' className='w-full sm:w-auto'>
            <BuildingIcon className='mr-2 size-4' />
            Crear mi academia
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nueva academia</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p className='text-sm text-gray-500'>
              Para crear una academia, necesitarás:
            </p>
            <ul className='list-inside list-disc space-y-2 text-sm'>
              <li>Completar la información de la academia</li>
              <li>Realizar el pago de suscripción</li>
            </ul>
            <Button
              onClick={() => {
                navigate({
                  to: `/user/complete-profile/${userAcademyId}/set-academy/success`,
                })
              }}
              className='w-full'
            >
              Continuar con el pago
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminAcademyStep
