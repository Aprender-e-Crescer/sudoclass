import { useRegisterClassMutation } from '@/mutations/mutation-register-class-form'

export function useRegisterClassController() {
  const { mutateAsync: registerClassForm } = useRegisterClassMutation()

  return {
    registerClassForm,
  }
}
