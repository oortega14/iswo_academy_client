export type WizardStepRoute = {
  path: string
  title: string
  order: number
}

export type CommonWizardStepName =
  | 'personal_info_step'
  | 'password_step'

export type StudentWizardStepName =
  | 'student_academy_selection_step'
  | 'student_confirmation_step'

export type TeacherWizardStepName =
  | 'teacher_academy_request_step'
  | 'teacher_confirmation_step'

export type AdminWizardStepName =
  | 'admin_payment_info_step'
  | 'admin_payment_status_step'
  | 'admin_create_academy_step'
  | 'admin_preferences_step'
  | 'admin_confirmation_step'

export type WizardStepName =
  | CommonWizardStepName
  | StudentWizardStepName
  | TeacherWizardStepName
  | AdminWizardStepName

export type WizardRoutes<T extends WizardStepName> = {
  [K in T]: WizardStepRoute
}

export const COMMON_WIZARD_ROUTES: WizardRoutes<CommonWizardStepName> = {
  'personal_info_step': {
    path: '/onboarding/personal-info',
    title: 'Información Personal',
    order: 0
  },
  'password_step': {
    path: '/onboarding/password-info',
    title: 'Actualizar Contraseña',
    order: 1
  }
}

export const STUDENT_WIZARD_ROUTES: WizardRoutes<StudentWizardStepName> = {
  'student_academy_selection_step': {
    path: '/onboarding/$userAcademyId/student/join-academy',
    title: 'Selecciona Academia',
    order: 0
  },
  'student_confirmation_step': {
    path: '/onboarding/$userAcademyId/student/final-confirmation',
    title: 'Confirmación',
    order: 1
  }
}

// Corregir el tipo de ADMIN_WIZARD_ROUTES para que use los nombres correctos
export const ADMIN_WIZARD_ROUTES: WizardRoutes<AdminWizardStepName> = {
  'admin_payment_info_step': {
    path: '/onboarding/$userAcademyId/admin/payment-info',
    title: 'Información de Pago',
    order: 0
  },
  'admin_payment_status_step': {
    path: '/onboarding/$userAcademyId/admin/payment-success',
    title: 'Estado del Pago',
    order: 1
  },
  'admin_create_academy_step': {
    path: '/onboarding/$userAcademyId/admin/create-academy',
    title: 'Crea tu academia',
    order: 2
  },
  'admin_preferences_step': {
    path: '/onboarding/$userAcademyId/admin/academy-preferences',
    title: 'Preferencias',
    order: 3
  },
  'admin_confirmation_step': {
    path: '/onboarding/$userAcademyId/admin/confirmation',
    title: 'Confirmación',
    order: 4
  }
}

export function getStepByPath<T extends WizardStepName>(
  path: string,
  wizardRoutes: WizardRoutes<T>
): T | undefined {
  for (const key in wizardRoutes) {
    const stepName = key as T;
    const config = wizardRoutes[stepName];

    // Comprobar coincidencia exacta
    if (config.path === path) {
      return stepName;
    }

    // Comprobar coincidencia con patrones dinámicos
    const pattern = config.path.replace(/\$([^\/]+)/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(path)) {
      return stepName;
    }

  }

  return undefined;
}