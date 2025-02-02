import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import imageProfile from '@/assets/image-profile.png'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useProfileImage } from '@/hooks/use-profile-image'
import { useAddProfileImage } from '@/mutations/use-add-profile-image-mutation'
import { useDeleteProfileImage } from '@/mutations/use-delete-profile-image-mutation'
import { useGetTeacherQuery } from '@/queries/use-get-teacher-query'
import { useGetStudentsQuery } from '@/queries/use-get-students-query'
import { useGetPedagogueQuery } from '@/queries/use-get-pedagogue-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'

export const Route = createFileRoute('/_authenticated/profile-changes')({
  component: ProfileChanges,
})

export function ProfileChanges() {
  const currentUser = useCurrentUserQuery()
  const { data: userData } = useGetUserQuery(currentUser?.data?.uid)
  const { selectedImage, setSelectedImage, isLoading, error } = useProfileImage()

  const { mutate: addProfileImage } = useAddProfileImage(currentUser?.data?.uid)
  const { mutate: deleteProfileImage } = useDeleteProfileImage(currentUser?.data?.uid)

  const handleOnAddProfileImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      addProfileImage(file)
    } else {
      console.log('Nenhum arquivo selecionado')
    }
  }

  const handleOnRemoveProfileImageClick = async () => {
    try {
      await deleteProfileImage(selectedImage)
      setSelectedImage(null)
    } catch (error) {
      console.error('Erro ao apagar imagem:', error)
    }
  }

  const {
    data: teacherData,
    isLoading: isLoadingTeacher,
    error: isErrorTeacher,
  } = useGetTeacherQuery(userData?.idTeacher)

  const {
    data: studentData,
    isLoading: isLoadingStudent,
    error: isErrorStudent,
  } = useGetStudentsQuery(userData?.idStudent)

  const {
    data: pedagogueData,
    isLoading: isLoadingPedagogue,
    error: isErrorPedagogue,
  } = useGetPedagogueQuery(userData?.idPedagogue)

  let user = null
  if (userData?.type === 'professor') {
    user = { data: teacherData, isLoading: isLoadingTeacher, error: isErrorTeacher }
  }
  if (userData?.type === 'aluno') {
    user = { data: studentData, isLoading: isLoadingStudent, error: isErrorStudent }
  }
  if (userData?.type === 'pedagogo') {
    user = { data: pedagogueData, isLoading: isLoadingPedagogue, error: isErrorPedagogue }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center">Erro ao carregar a imagem de perfil.</p>
  }

  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="flex flex-row gap-10 items-center max-[420px]:flex-col max-[420px]:w-[380px]">
        <div>
          <Avatar className="w-24 h-24">
            <AvatarImage src={selectedImage || imageProfile} />
          </Avatar>
        </div>
        <div className="flex gap-6 max-[420px]:flex-col">
          <Button variant={'blueButton'} onClick={() => document.getElementById('fileInput')?.click()}>
            Escolher Foto
          </Button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleOnAddProfileImageChange}
            style={{ display: 'none' }}
          />
          <Button onClick={() => handleOnRemoveProfileImageClick(selectedImage)} variant={'lightTextRed'}>
            Apagar Foto
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label>Nome</label>
          <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
            <p className="text-[#B3B3B3] pl-4">{user?.data?.name || 'Sem dados disponíveis'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>CPF</label>
          <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
            <p className="text-[#B3B3B3] pl-4">{user?.data?.cpf || 'Sem dados disponíveis'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>E-mail</label>
          <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
            <p className="text-[#B3B3B3] pl-4">{user?.data?.email || 'Sem dados disponíveis'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Cidade</label>
          <div className="h-10 flex items-center rounded-lg border border-gray-200 mr-14">
            <p className="text-[#B3B3B3] pl-4">{user?.data?.address?.city || 'Sem dados disponíveis'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
