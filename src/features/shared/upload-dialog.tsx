import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { IconAlertTriangle, IconCheck, IconUpload } from '@tabler/icons-react'

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConfirmation?: boolean;
  uploadProgress?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const UploadDialog = ({ 
  open, 
  onOpenChange, 
  isConfirmation = false, 
  uploadProgress = 0, 
  onConfirm, 
  onCancel 
}: UploadDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state && onCancel && isConfirmation) {
          onCancel();
        }
        onOpenChange(state);
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            {isConfirmation ? 'Confirmar carga' : 'Cargando archivo'}
          </DialogTitle>
          <DialogDescription>
            {isConfirmation 
              ? '¿Estás seguro de que deseas subir este archivo?' 
              : 'Por favor espera mientras se completa la carga...'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isConfirmation ? (
            <div className="flex flex-col space-y-4 items-center justify-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <IconAlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-center text-sm text-gray-500">
                Al confirmar, comenzará la carga del archivo. Este proceso puede tardar dependiendo del tamaño del archivo.
              </p>
              <div className="flex space-x-2 w-full justify-end">
                <Button variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button onClick={onConfirm}>
                  Confirmar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center">
                {uploadProgress < 100 ? (
                  <div className="animate-pulse rounded-full bg-blue-100 p-3">
                    <IconUpload className="h-6 w-6 text-blue-600" />
                  </div>
                ) : (
                  <div className="rounded-full bg-green-100 p-3">
                    <IconCheck className="h-6 w-6 text-green-600" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-center text-sm font-medium">
                  {uploadProgress < 100 
                    ? `${uploadProgress}% completado` 
                    : 'Carga completada'}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;