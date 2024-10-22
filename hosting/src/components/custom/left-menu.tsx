import {
  Home,
  CalendarDays,
  History,
  UniversityIcon,
  FileText,
  FormInput,
  MessageCircle,
  Settings,
  SquarePen,
  SquarePlus,
  Users,
  MessageSquareLock,
} from 'lucide-react'
import { MenuItem } from './menu-item'
import { CourseItem } from './menu-item-courses'
import { useState } from 'react'

interface LeftMenuProps {
  type: 'StudentPortal' | 'TeacherClassroom' | 'AdminPortal'
}

const menuItemsStudentPortal = [
  { name: 'Início', icon: Home },
  { name: 'Agenda', icon: CalendarDays },
  { name: 'Histórico', icon: History },
  { name: 'Matriz Escolar', icon: UniversityIcon },
  { name: 'Documentos', icon: FileText },
  { name: 'Formulários', icon: FormInput },
  { name: 'Chat', icon: MessageCircle },
  { name: 'Configurações', icon: Settings },
]

const menuItemsAdminPortal = [
  { name: 'Início', icon: Home },
  { name: 'Agenda', icon: CalendarDays },
  { name: 'Alunos', icon: Users },
  { name: 'Professores', icon: Users },
  { name: 'Formulário', icon: FormInput },
  { name: 'Solicitação de senhas', icon: MessageSquareLock },
  { name: 'Configurações', icon: Settings },
  { name: 'Chat', icon: MessageCircle },
]

const menuItemsTeacherClassroom = [
  { name: 'Início', icon: Home },
  { name: 'Chat', icon: MessageCircle },
  { name: 'Agenda', icon: CalendarDays },
  { name: 'Configurações', icon: Settings },
]
const courses = ['Curso 1', 'Curso 2', 'Curso 3']

function LeftMenu({ type }: LeftMenuProps) {
  const [activeItem, setActiveItem] = useState('')

  if (type === 'StudentPortal') {
    return (
      <div className="flex gap-8 flex-col">
        {menuItemsStudentPortal.map((item, index) => (
          <MenuItem key={index} nameItem={item.name} activeItem={activeItem} onClick={setActiveItem} Icon={item.icon} />
        ))}

        <div className="flex flex-col gap-4 w-64 border-t-2 hidden min-[420px]:flex">
          <div className="w-44 h-10 pt-6 flex items-center rounded-lg">
            <p className="font-bold text-[#787486] text-[12px] pl-3">CURSOS</p>
          </div>

          {courses.map((course, index) => (
            <CourseItem
              key={index}
              course={course}
              activeItem={activeItem}
              onClick={() => setActiveItem(course)}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'AdminPortal') {
    return (
      <div className="flex gap-8 flex-col">
        {menuItemsAdminPortal.map((item, index) => (
          <MenuItem key={index} nameItem={item.name} activeItem={activeItem} onClick={setActiveItem} Icon={item.icon} />
        ))}

        <div className="flex flex-col gap-4 w-64 border-t-2 hidden min-[160px]:flex">
          <div className="w-48 h-10  gap-28 pt-6 flex items-center rounded-lg">
            <p className="font-bold text-[#787486] text-[12px] pl-3">CURSOS</p>
            <SquarePen size={16} color="#787486" />
          </div>

          {courses.map((course, index) => (
            <CourseItem
              key={index}
              course={course}
              activeItem={activeItem}
              onClick={() => setActiveItem(course)}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'TeacherClassroom') {
    return (
      <div className="flex gap-8 flex-col">
        {menuItemsTeacherClassroom.map((item, index) => (
          <MenuItem key={index} nameItem={item.name} activeItem={activeItem} onClick={setActiveItem} Icon={item.icon} />
        ))}

        <div className="flex-col gap-4 w-64 border-t-2 hidden min-[160px]:flex">
          <div className="w-48 h-10 gap-28 pt-6 flex items-center rounded-lg">
            <p className="font-bold text-[#787486] text-[12px] pl-3">CURSOS</p>
            <SquarePlus size={16} color="#787486" />
          </div>

          {courses.map((course, index) => (
            <CourseItem
              key={index}
              course={course}
              activeItem={activeItem}
              onClick={() => setActiveItem(course)}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default LeftMenu
