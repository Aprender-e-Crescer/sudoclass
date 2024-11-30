import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import imageProfile from '@/assets/image-profile.png'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Loader2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useGetTeacherQuery } from '@/queries/use-get-teacher-query'
import { useGetStudentQuery } from '@/queries/use-get-student-query'
import { useGetPedagogueQuery } from '@/queries/use-get-pedagogue-query'

export const Route = createFileRoute('/_authenticated/profile-changes')({
  component: ProfileChanges,
})

export function ProfileChanges() {
  const currentUser = useCurrentUserQuery()
  const { data: userData, isLoading: userLoading, isError: userError } = useGetUserQuery(currentUser?.data?.uid)
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleChoosePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const teacherQuery = useGetTeacherQuery(userData?.idTeacher)
  const studentQuery = useGetStudentQuery(userData?.idStudent)
  const pedagogueQuery = useGetPedagogueQuery(userData?.idPedagogue)

  let user
  let isLoading = userLoading
  let isError = userError

  if (userData?.type === 'professor') {
    user = teacherQuery.data
    isLoading = isLoading || teacherQuery.isLoading
    isError = isError || teacherQuery.isError
  } else if (userData?.type === 'aluno') {
    user = studentQuery.data
    isLoading = isLoading || studentQuery.isLoading
    isError = isError || studentQuery.isError
  } else if (userData?.type === 'pedagogo') {
    user = pedagogueQuery.data
    isLoading = isLoading || pedagogueQuery.isLoading
    isError = isError || pedagogueQuery.isError
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (isError) {
    return <p className="text-red-500 text-center">Erro ao carregar os dados.</p>
  }

  return (
    <div>
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-row gap-10 items-center max-[420px]:flex-col max-[420px]:w-[380px]">
          <div>
            <Avatar className="w-24 h-24">
              <AvatarImage src={selectedImage ? selectedImage.toString() : imageProfile} />
            </Avatar>
          </div>
          <div className="flex gap-6 max-[420px]:flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={'blueButton'}>Escolher Foto</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <label onClick={handleChoosePhotoClick} className="flex gap-2 items-center cursor-pointer">
                    Carregar do dispositivo
                    <Upload className="h-4 w-4" />
                  </label>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            <Button onClick={() => setSelectedImage(null)} variant={'lightTextRed'}>
              Apagar Foto{' '}
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label>Nome</label>
              <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
                <p className="text-[#B3B3B3] pl-4">{user?.name || 'Sem dados disponíveis'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <label>CPF</label>
              <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
                <p className="text-[#B3B3B3] pl-4">{user?.cpf || 'Sem dados disponíveis'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <label>E-mail</label>
              <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
                <p className="text-[#B3B3B3] pl-4">{user?.email || 'Sem dados disponíveis'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <label>Cidade</label>
              <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
                <p className="text-[#B3B3B3] pl-4">{user?.birthCity || 'Sem dados disponíveis'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <label>Telefone</label>
              <div className="h-10 flex items-center rounded-lg border border-gray-200">
                <p className="text-[#B3B3B3] pl-4">{user?.number || 'Sem dados disponíveis'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[350px] max-[420px]:flex-col max-[420px]:gap-12 max-[420px]:items-center">
          <div className="flex gap-3 items-center">
            <input type="checkbox" id="checkbox" className="ml-4 size-4" />
            <span>Permitir Notificações</span>
          </div>
        </div>
      </div>
    </div>
  )
}
