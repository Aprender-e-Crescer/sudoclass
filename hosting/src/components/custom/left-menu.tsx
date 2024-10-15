import { LayoutGrid } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
import { NotepadText } from 'lucide-react'
import { University } from 'lucide-react'
import { FileText } from 'lucide-react'
import { Dock } from 'lucide-react'
import { MessageCircleMore } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Users } from 'lucide-react'
import { MessageSquareLock } from 'lucide-react'
import { ChartColumn } from 'lucide-react'
import { SquarePen } from 'lucide-react'
import { SquarePlus } from 'lucide-react'
import { useState } from 'react'

interface LeftMenu {
  type: 'StudentPortal' | 'TeacherClassroom' | 'AdminPortal'
}

function LeftMenu({ type }: LeftMenu) {
  const [clickedItem, SetClickedItem] = useState('')

  if (type === 'StudentPortal') {
    return (
      <>
        <div className="flex gap-8 flex-col">
          <div className="flex flex-col gap-6 w-72">
            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Inicio' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Inicio')}
            >
              <div className="p-2 ">
                <LayoutGrid size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Inicio</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Agenda' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Agenda')}
            >
              <div className="p-2 ">
                <CalendarDays size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Agenda</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Histórico' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Histórico')}
            >
              <div className="p-2 ">
                <NotepadText size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Histórico</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Matriz Escolar' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Matriz Escolar')}
            >
              <div className="p-2 ">
                <University size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">
                Matriz
                <br />
                Escolar
              </p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Documentos' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Documentos')}
            >
              <div className="p-2 ">
                <FileText size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Documentos</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Formulários' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Formulários')}
            >
              <div className="p-2 ">
                <Dock size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Formulários</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Chat' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Chat')}
            >
              <div className="p-2 ">
                <MessageCircleMore size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Chat</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Configurações' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Configurações')}
            >
              <div className="p-2 ">
                <Settings size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Configurações</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-64 border-t-2">
            <div className="w-44 h-10 pt-6    flex items-center  rounded-lg">
              <p className="font-bold text-[#787486] text-[12px] pl-3">CURSOS</p>
            </div>

            <div
              className={`w-52 h-10 flex  gap-3 items-center rounded-lg hover:cursor-pointer pl-6 hover:bg-gray-100 
            ${clickedItem === 'Curso' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Curso')}
            >
              <div className="rounded-full h-2 w-2 bg-amber-600 "></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-red-500"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-blue-500"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-yellow-400"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (type === 'AdminPortal') {
    return (
      <>
        <div className="flex gap-8 flex-col">
          <div className="flex flex-col gap-6 w-72">
            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Inicio' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Inicio')}
            >
              <div className="p-2 ">
                <LayoutGrid size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Inicio</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Agenda' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Agenda')}
            >
              <div className="p-2 ">
                <CalendarDays size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Agenda</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Alunos' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Alunos')}
            >
              <div className="p-2 ">
                <Users size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Alunos</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Professores' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Professores')}
            >
              <div className="p-2 ">
                <Users size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Professores</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Formulário' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Formulário')}
            >
              <div className="p-2 ">
                <ChartColumn size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Formulário</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Solicitação de senhas' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Solicitação de senhas')}
            >
              <div className="p-2 ">
                <MessageSquareLock size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Solicitação de senhas</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Configurações' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Configurações')}
            >
              <div className="p-2 ">
                <MessageCircleMore size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Configurações</p>
            </div>

            <div
              className={`w-52 h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
            ${clickedItem === 'Chat' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Chat')}
            >
              <div className="p-2 ">
                <Settings size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Chat</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-64 border-t-2">
            <div className="w-48 h-10 pt-6 gap-32 flex  items-center  rounded-lg">
              <p className="font-bold text-[#787486] text-[12px] pl-3">CURSOS</p>
              <div className="hover:cursor-pointer">
                <SquarePen size={16} color="#787486" strokeWidth={2} />
              </div>
            </div>

            <div
              className={`w-52 h-10 flex gap-3 items-center rounded-lg hover:cursor-pointer pl-6 hover:bg-gray-100 
            ${clickedItem === 'Curso' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Curso')}
            >
              <div className="rounded-full h-2 w-2 bg-amber-600 "></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-red-500"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-blue-500"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-yellow-400"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (type === 'TeacherClassroom') {
    return (
      <>
        <div className="flex gap-8 flex-col">
          <div className="flex flex-col gap-6 w-72">
            <div
              className={`w-52 h-10 flex  items-center rounded-lg hover:cursor-pointer  hover:bg-gray-100 
            ${clickedItem === 'Inicio' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Inicio')}
            >
              <div className="p-2 ">
                <LayoutGrid size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Inicio</p>
            </div>

            <div
              className={`w-52 h-10 flex  items-center rounded-lg hover:cursor-pointer  hover:bg-gray-100 
            ${clickedItem === 'Chat' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Chat')}
            >
              <div className="p-2 ">
                <MessageCircleMore size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Chat</p>
            </div>

            <div
              className={`w-52 h-10 flex  items-center rounded-lg hover:cursor-pointer  hover:bg-gray-100 
            ${clickedItem === 'Agenda' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Agenda')}
            >
              <div className="p-2 ">
                <CalendarDays size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Agenda</p>
            </div>

            <div
              className={`w-52 h-10 flex  items-center rounded-lg hover:cursor-pointer  hover:bg-gray-100 
            ${clickedItem === 'Configurações' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Configurações')}
            >
              <div className="p-2 ">
                <Settings size={22} color="#787486" strokeWidth={2} />
              </div>
              <p className="text-[#787486]  font-medium">Configurações</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-64 border-t-2">
            <div className="w-48 h-10 pt-6 gap-32  flex items-center  rounded-lg">
              <p className="font-bold text-[#787486] text-[12px] pl-3">CURSOS</p>
              <div className="hover:cursor-pointer">
                <SquarePlus size={16} color="#787486" strokeWidth={2} />
              </div>
            </div>

            <div
              className={`w-52 h-10 flex gap-3 items-center rounded-lg hover:cursor-pointer pl-6 hover:bg-gray-100 
            ${clickedItem === 'Curso' ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
              onClick={() => SetClickedItem('Curso')}
            >
              <div className="rounded-full h-2 w-2 bg-amber-600 "></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-red-500"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-blue-500"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>

            <div className="w-52 h-10  gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100   flex items-center  rounded-lg">
              <div className="rounded-full h-2 w-2 bg-yellow-400"></div>
              <p className="font-semibold text-[#787486] ">Curso</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default LeftMenu
