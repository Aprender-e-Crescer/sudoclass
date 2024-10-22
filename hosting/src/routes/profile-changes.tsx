import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import imageProfile from '@/assets/image-profile.png'
import { Button } from '@/components/ui/button'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/profile-changes')({
  component: ProfileChanges,
})

export function ProfileChanges() {
  const { data: students } = useStudentsListQuery()
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
  return (
    <>
      <div className="flex flex-col gap-8">
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
          {students?.map((user, index) => (
            <div key={index} className="flex flex-col gap-6 max-[420px]:w-[400px] ">
              <div className="flex flex-col gap-2  ">
                <label>Nome</label>
                <div className="h-10 w-[700px] flex items-center  rounded-lg border border-gray-200">
                  <p className="text-[#B3B3B3] pl-4">{user.name}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 ">
                <label>CPF</label>
                <div className="h-10 w-[700px] flex items-center  rounded-lg border border-gray-200">
                  <p className="text-[#B3B3B3] pl-4">{user.cpf}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                <label>E-mail</label>
                <div className="h-10 w-[700px] flex items-center  rounded-lg border border-gray-200">
                  <p className="text-[#B3B3B3] pl-4">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                <label>Cidade</label>
                <div className="h-10 w-[700px] flex items-center  rounded-lg border border-gray-200">
                  <p className="text-[#B3B3B3] pl-4">{user.cityOfBirth}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                <label>Telefone</label>
                <div className="h-10 w-[700px] flex items-center  rounded-lg border border-gray-200">
                  <p className="text-[#B3B3B3] pl-4">{user.telephone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-[350px] max-[420px]:flex-col max-[420px]:gap-12 max-[420px]:items-center">
          <div className="flex gap-3 items-center">
            <input type="checkbox" id="checkbox" className="ml-4 size-4" />
            <span>Permitir Notificações</span>
          </div>
          <div>
            <Button variant={'blueButton'}>Salvar Alterações</Button>
          </div>
        </div>
      </div>
    </>
  )
}
