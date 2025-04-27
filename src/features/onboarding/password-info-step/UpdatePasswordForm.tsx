import React, { RefObject, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { IconLock, IconUser, IconUpload, IconUserCircle } from '@tabler/icons-react';
import { passwordStrength } from '@/features/onboarding/components/PasswordStrength.tsx';
import { toast } from 'sonner';
import { useCompleteProfile } from '@/api/hooks/use-complete-profile.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import UploadDialog from '@/features/shared/upload-dialog.tsx';
import { useNavigate } from '@tanstack/react-router';


const userAcademySchema = z.object({
  id: z.number().optional(),
  user_id: z.string(),
  academy_id: z.number().optional().nullable(),
  role: z.string().min(1, 'Debes seleccionar un rol'),
});

export const passwordStepSchema = z.object({
  user: z.object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
      .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
      .regex(/[^a-zA-Z0-9]/, "La contraseña debe contener al menos un carácter especial"),
    password_confirmation: z.string(),
    wizard_step: z.string().optional(),
    user_academies_attributes: z.array(userAcademySchema),
    profile_picture: z.any().optional()
  }).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ['password_confirmation'],
      });
    }
  }),
});

// Añadir la interfaz para el tipo de respuesta
interface ProfileResponse {
  user_academies: { id: string | number, role: string, academy_id: number | null }[];
}

const UpdatePasswordForm = ({ formRef }: { 
  formRef: RefObject<HTMLFormElement>
}) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore((state) => state.auth);
  const { updatePassword, uploadProgress: axiosUploadProgress } = useCompleteProfile();

  const form = useForm<z.infer<typeof passwordStepSchema>>({
    resolver: zodResolver(passwordStepSchema),
    defaultValues: {
      user: {
        password: '',
        password_confirmation: '',
        user_academies_attributes: [
          {
            id: user?.user_academies?.[0]?.id,
            role: user?.user_academies?.[0]?.role,
            user_id: user?.id?.toString() || '',
            academy_id: user?.user_academies?.[0]?.academy_id
              ? Number(user?.user_academies?.[0]?.academy_id)
              : null,
          },
        ],
      },
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('user.profile_picture', file);
    }
  };

  const prepareSubmission = async (
    data: z.infer<typeof passwordStepSchema>
  ) => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error(
        'Por favor, corrige los errores en el formulario antes de continuar'
      );
      return;
    }

    const newFormData = new FormData();

    newFormData.append('user[password]', data.user.password);
    newFormData.append(
      'user[password_confirmation]',
      data.user.password_confirmation
    );

    newFormData.append(
      'user[user_academies_attributes][0][role]',
      data.user.user_academies_attributes[0].role
    );
    newFormData.append(
      'user[user_academies_attributes][0][user_id]',
      data.user.user_academies_attributes[0].user_id
    );
    if (data.user.user_academies_attributes[0].id) {
      newFormData.append(
        'user[user_academies_attributes][0][id]',
        String(data.user.user_academies_attributes[0].id)
      );
    }
    if (data.user.user_academies_attributes[0].academy_id) {
      newFormData.append(
        'user[user_academies_attributes][0][academy_id]',
        String(data.user.user_academies_attributes[0].academy_id)
      );
    }
    if (data.user.user_academies_attributes[0].role === 'admin') {
      newFormData.append('user[wizard_step]', 'admin_payment_info_step');
    } else if (data.user.user_academies_attributes[0].role === 'professor'){
      newFormData.append('user[wizard_step]', 'teacher_academy_request_step');
    } else {
      newFormData.append('user[wizard_step]', 'student_academy_selection_step');
    }


    if (data.user.profile_picture instanceof File) {
      newFormData.append('user[profile_picture]', data.user.profile_picture);
    }

    setFormData(newFormData);
    setShowConfirmModal(true);
  };

  const handleConfirmUpload = async () => {
    if (!formData) return;

    setShowConfirmModal(false);
    setIsUploading(true);
    setUploadProgress(0);

    const response = await updatePassword(user?.id?.toString() || '', formData);
    if (response.success) {
      toast.success('Perfil actualizado correctamente');
      const responseData = response.data as ProfileResponse;
      if (responseData.user_academies[0].role === 'admin') {
        navigate({
          to: `/onboarding/${responseData.user_academies[0].id}/admin/payment-info`,
          params: {
            userAcademyId: String(responseData.user_academies[0].id)
          }
        });
      }
    } else {
      toast.error(response.error);
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setShowConfirmModal(false);
    setFormData(null);
  };

  useEffect(() => {
    if (user?.user_academies?.[0]) {
      const userAcademy = user.user_academies[0];

      form.reset({
        user: {
          password: '',
          password_confirmation: '',
          profile_picture: undefined,
          user_academies_attributes: [
            {
              id: userAcademy.id,
              role: userAcademy.role,
              user_id: user.id?.toString() || '',
              academy_id: userAcademy.academy_id
                ? Number(userAcademy.academy_id)
                : null,
            },
          ],
        },
      });
    }
  }, [user, form]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setUploadProgress(axiosUploadProgress);
  }, [axiosUploadProgress]);

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(prepareSubmission)}
          className='flex w-full flex-col space-y-4'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <IconUser className='size-4 md:size-5 text-muted-foreground' />
                <label className='text-sm md:text-base font-medium leading-none'>
                  Foto de Perfil
                </label>
              </div>
              <div className='flex items-center gap-4'>
                <div className='relative size-24 md:size-32 lg:size-40 overflow-hidden rounded-full border-2'>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt='Profile preview'
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <div className='flex size-full items-center justify-center bg-muted'>
                      <IconUser className='size-12 md:size-16 lg:size-20 text-muted-foreground' />
                    </div>
                  )}
                </div>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => fileInputRef.current?.click()}
                  className='h-9 md:h-11 lg:h-12 px-4 md:px-6 text-sm md:text-base'>
                  <IconUpload className='mr-2 size-4 md:size-5' />
                  Subir foto
                </Button>
                <input
                  type='file'
                  ref={fileInputRef}
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </div>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Sube una foto de perfil (opcional)
              </p>
            </div>

            <div className='grid grid-cols-1 gap-4'>
              {/* Campo de nombre de usuario oculto para accesibilidad */}
              <input
                type='text'
                name='username'
                autoComplete='username'
                style={{ display: 'none' }}
                defaultValue={user?.email || ''}
              />

              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='user.password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-2'>
                        <IconLock className='size-4 md:size-5 text-muted-foreground' />
                        <FormLabel>Contraseña</FormLabel>
                      </div>
                      <FormControl>
                        <div className='relative'>
                          <Input 
                            type='password' 
                            placeholder='********' 
                            {...field} 
                            autoComplete='new-password'
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      
                      {field.value && (
                        <div className='space-y-1 mt-2'>
                          <div className='flex justify-between text-xs'>
                            <span>Fortaleza de la contraseña:</span>
                            <span
                              className={`font-medium ${passwordStrength(
                                field.value
                              ).color.replace('bg-', 'text-')}`}>
                              {passwordStrength(field.value).label}
                            </span>
                          </div>
                          <div className='h-1.5 w-full bg-gray-200 rounded-full overflow-hidden'>
                            <div
                              className={`h-full ${
                                passwordStrength(field.value).color
                              } transition-all duration-300`}
                              style={{
                                width: `${
                                  (passwordStrength(field.value).score / 4) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <ul className='text-xs space-y-1 text-gray-500 mt-2 text-left'>
                            <li
                              className={
                                passwordStrength(field.value).validations
                                  .length
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }>
                              • Mínimo 8 caracteres
                            </li>
                            <li
                              className={
                                passwordStrength(field.value).validations
                                  .number
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }>
                              • Al menos un número
                            </li>
                            <li
                              className={
                                passwordStrength(field.value).validations.case
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }>
                              • Mayúsculas y minúsculas
                            </li>
                            <li
                              className={
                                passwordStrength(field.value).validations
                                  .special
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }>
                              • Al menos un carácter especial
                            </li>
                          </ul>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='user.password_confirmation'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-2'>
                      <IconLock className='size-4 md:size-5 text-muted-foreground' />
                      <FormLabel>Confirmar Contraseña</FormLabel>
                    </div>
                    <FormControl>
                      <Input 
                        type='password' 
                        placeholder='********' 
                        {...field} 
                        autoComplete='new-password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                type='hidden'
                value={user?.id?.toString() || ''}
                {...form.register('user.user_academies_attributes.0.user_id')}
              />

              <FormField
                control={form.control}
                name='user.user_academies_attributes.0.role'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-2'>
                      <IconUserCircle className='size-5' />
                      <FormLabel>Registrarse como:</FormLabel>
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Escoje un rol' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='student'>Estudiante</SelectItem>
                        <SelectItem value='professor'>Profesor</SelectItem>
                        <SelectItem value='admin'>Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </Form>

      {/* Diálogo de confirmación */}
      {showConfirmModal && (
        <UploadDialog
          key="confirm-upload"
          open={showConfirmModal}
          onOpenChange={setShowConfirmModal}
          isConfirmation={true}
          onConfirm={handleConfirmUpload}
          onCancel={handleCancelUpload}
        />
      )}

      {/* Diálogo de progreso */}
      {isUploading && (
        <UploadDialog
          key="uploading-progress"
          open={isUploading}
          onOpenChange={() => {}}
          isConfirmation={false}
          uploadProgress={uploadProgress}
        />
      )}
    </>
  );
}

export default UpdatePasswordForm