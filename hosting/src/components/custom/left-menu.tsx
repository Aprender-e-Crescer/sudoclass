import {
  Home,
  CalendarDays,
  History,
  UniversityIcon,
  FileText,
  FormInput,
  MessageCircle,
  Settings,
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
  { name: 'Início', icon: Home, to: '/home-list-subjects' },
  { name: 'Frequencia', icon: History, to: '/frequency-portal-aluno' },
  { name: 'Matriz Escolar', icon: UniversityIcon, to: '/page-matrices' },
  { name: 'Documentos', icon: FileText, to: '/documents' },
  { name: 'Formulários', icon: FormInput, to: '/forms' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsAdminPortal = [
  { name: 'Início', icon: Home, to: '/home-list-subjects' },
  { name: 'Formulário', icon: FormInput, to: '/admin/forms' },
  { name: 'Solicitações', icon: MessageSquareLock, to: '/_requests/password-change-request' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsTeacherClassroom = [
  { name: 'Início', icon: Home, to: '/home-list-subjects' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const courses = ['Curso 1', 'Curso 2', 'Curso 3']

function LeftMenu({ type }: LeftMenuProps) {
  const [activeItem, setActiveItem] = useState('')

  const renderMenuItems = (menuItems: typeof menuItemsStudentPortal) =>
    menuItems.map((item, index) => (
      <MenuItem
        key={index}
        nameItem={item.name}
        activeItem={activeItem}
        onClick={setActiveItem}
        Icon={item.icon}
        to={item.to}
      />
    ))

  return (
    <div className="flex gap-8 flex-col">
      {type === 'StudentPortal' && renderMenuItems(menuItemsStudentPortal)}
      {type === 'AdminPortal' && renderMenuItems(menuItemsAdminPortal)}
      {type === 'TeacherClassroom' && renderMenuItems(menuItemsTeacherClassroom)}

      <div className="flex-col gap-4 w-52 border-t-2 hidden min-[420px]:flex">
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

export default LeftMenu
