import { useState } from 'react';
import { completeProfileService } from '../services/complete-profile-service';
import { AxiosError } from 'axios';

export const useCompleteProfile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const updatePersonalInfo = async (userId: string, data: any) => {
    try {
      const response = await completeProfileService.updatePersonalInfo(userId, data);
      return { success: true, data: response };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          error: error.response?.data?.error || 'Error en la autenticación'
        }
      }
      return { success: false, error: 'Error desconocido' }
    }
  };

  const updatePassword = async (userId: string, data: any) => {
    try {
      setUploadProgress(0);

      const response = await completeProfileService.updatePassword(userId, data, (progress) => {
        setUploadProgress(progress);
      });

      return { success: true, data: response };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          error: error.response?.data?.error || 'Error en la autenticación'
        }
      }
      return { success: false, error: 'Error desconocido' }
    }
  };

  // const createAcademy = async (data: any, userAcademyId: string) => {
  //   try {
  //     setUploadProgress(0);
  //     const response = await completeProfileService.createAcademy(data, userAcademyId, (progress) => {
  //       setUploadProgress(progress);
  //     });

  //     return { success: true, data: response };
  //   } catch (error) {
  //     const errorMessage = formatAxiosError(error as AxiosErrorResponse);
  //     return { success: false, error: errorMessage };
  //   }
  // };

  // const updateAcademyPreferences = async (academyId: string, data: any) => {
  //   try {
  //     const response = await completeProfileService.updateAcademyPreferences(academyId, data);
  //     return { success: true, data: response };
  //   } catch (error) {
  //     const errorMessage = formatAxiosError(error as AxiosErrorResponse);
  //     return { success: false, error: errorMessage };
  //   }
  // };

  // const completeProfile = async (userId: string, data: any) => {
  //   try {
  //     const response = await completeProfileService.completeProfile(userId, data);
  //     return { success: true, data: response };
  //   } catch (error) {
  //     const errorMessage = formatAxiosError(error as AxiosErrorResponse);
  //     return { success: false, error: errorMessage };
  //   }
  // };

  return {
    updatePersonalInfo,
    updatePassword,
    // createAcademy,
    // updateAcademyPreferences,
    // completeProfile,
    uploadProgress
  };
}; 