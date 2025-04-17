import { api } from "../axiosClient";

interface SocialNetwork {
  platform: string;
  url: string;
}

interface Address {
  user_detail_id?: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
}

interface UserDetail {
  user_id?: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  phone: string;
  dni: string;
  gender: string;
  username: string;
  address_attributes: Address;
  social_networks_attributes?: SocialNetwork[];
}

interface UpdatePersonalInfoData {
  user: {
    email: string;
    user_detail_attributes: UserDetail;
    wizard_step?: string;
  };
}

export const completeProfileService = {
  updatePersonalInfo: async (userId: string, data: UpdatePersonalInfoData)=> {
    const response = await api.patch(`/users/${userId}`, data);
    return response.data
  },

  updatePassword: async (userId: string, data: any, onProgress?: (progress: number) => void) => {
    const response = await api.patch(`/users/${userId}`, data, {
      headers: { "Content-type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    })
    return response.data
  },

  // createAcademy: async (data: any, userAcademyId: string, onProgress?: (progress: number) => void) => {
  //   const response = await api.post(`/academies?user_academy_id=${userAcademyId}`, data, {
  //     headers: { "Content-type": "multipart/form-data" },
  //     onUploadProgress: (progressEvent) => {
  //       if (progressEvent.total && onProgress) {
  //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         onProgress(percentCompleted);
  //       }
  //     }
  //   })
  //   return response.data
  // },

  // updateAcademyPreferences: async (academyId: string, data: any) => {
  //   const response = await api.patch(`/academies/${academyId}`, data);
  //   return response.data;
  // },

  // completeProfile: async (userId: string, data: any) => {
  //   const response = await api.patch(`/users/${userId}`, data);
  //   return response.data;
  // }
} 
