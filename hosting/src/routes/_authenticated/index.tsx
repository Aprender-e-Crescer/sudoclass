import { createFileRoute } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

export function Index() {
  return (
    <div className="flex flex-1 items-center self-center justify-center p-4">
      <div className="max-w-3xl w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          <div className="flex items-center justify-center p-8 md:p-12 bg-blue-500">
            <GraduationCap className='text-white h-20 w-20'/>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h1 className="uppercase tracking-wide text-2xl text-gray-800 font-bold mb-4">
              Bem-vindo ao Sudoclass
            </h1>
            <p className="text-gray-600 text-base mb-4">
              O Sudoclass é um sistema educacional desenvolvido para proporcionar uma experiência de aprendizagem moderna, interativa e colaborativa.
            </p>
            <p className="text-gray-600 text-base">
              Acesse cursos, interaja com conteúdos e potencialize o seu aprendizado com uma plataforma completa e intuitiva.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
