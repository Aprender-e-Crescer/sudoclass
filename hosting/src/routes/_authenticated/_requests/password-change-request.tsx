import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, Key } from 'lucide-react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import avatarLogo from '@/assets/avatarLogo.svg'
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { useToast } from '@/hooks/use-toast'
import { InputAuth } from '@/components/custom/auth-input'
import { Form, Formik, FormikProps } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/_authenticated/_requests/password-change-request')({
  component: RequestChangePassword,
})

const changesRequestsSchema = z.object({
  passwordDefault: z.string(),
})

const initialValues = {
  passwordDefault: '12345678',
}

function useLogic() {
  const formikInputCopyRef = useRef<FormikProps<Exclude<typeof initialValues, undefined>>>(null)
  const [passwords, setPasswords] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const { data: students } = useStudentsListQuery()

  function generatePassword(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const passwordLength = 8
    let password = ''

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }

    return password
  }

  if (students && Object.keys(passwords).length === 0) {
    const initialPasswords: Record<string, string> = {}
    students.forEach(({ name }) => {
      initialPasswords[name] = generatePassword()
    })
    setPasswords(initialPasswords)
  }

  return {
    students,
    toast,
    formikInputCopyRef,
    passwords,
  }
}

export function RequestChangePassword() {
  const { students, toast, formikInputCopyRef, passwords } = useLogic()
  return (
    <>
      {students?.map(({ name }, index) => (
        <div key={index} className="flex flex-col flex-1 p-2">
          <div className="rounded-md border-2 flex p-3 items-center my-5 gap-5">
            <img className="size-12" src={avatarLogo} />
            <div>
              <h1 className="font-bold font-[inter]">{name}</h1>
              <p className="text-gray-300 font-[inter]">Curso: Aprender e crescer</p>
            </div>
            <div className="gap-3 flex ml-auto">
              <AlertDialog>
                <AlertDialogTrigger
                  onClick={() =>
                    toast({
                      duration: 1500,
                      variant: 'sucesss',
                      title: 'Atualizado com sucesso ✓',
                    })
                  }
                >
                  <div className="flex border h-8 rounded-md justify-center items-center p-1">
                    <Check className="text-green-500" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-9  h-56 w-full">
                  <AlertDialogHeader className="flex text-start flex-row gap-3">
                    <AlertDialogCancel className="w-10">
                      <ChevronLeft className="size-8 mt-[13px]" />
                    </AlertDialogCancel>
                    <AlertDialogTitle className="text-2xl">Nova senha - {name}</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>Essa será a senha padrão fornecida ao aluno</AlertDialogDescription>
                  <Formik
                    innerRef={formikInputCopyRef}
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(changesRequestsSchema)}
                    onSubmit={() => {}}
                  >
                    <Form>
                      <InputAuth
                        id="copy"
                        name="copy"
                        disabled
                        placeholder="Sua nova senha"
                        icon={<Key />}
                        isCopyInput
                        value={passwords[name] || '12345678'}
                      />
                    </Form>
                  </Formik>
                </AlertDialogContent>
              </AlertDialog>
              <div className="flex border h-8 rounded-md justify-center items-center p-1 ">
                <X className="text-red-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
