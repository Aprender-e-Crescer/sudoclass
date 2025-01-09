import {
  Home,
  History,
  UniversityIcon,
  FileText,
  FormInput,
  Settings,
  MessageSquareLock,
  User,
  SquarePen,
  SquarePlus,
} from 'lucide-react'
import { MenuItem } from './menu-item'
import { CourseItem } from './menu-item-courses'
import { useState } from 'react'

import { Link } from '@tanstack/react-router'
import { useCourseListingQuery } from '@/queries/use-course-listing-query'
import { useCourseController } from '@/controllers/use-courses-controller'

interface LeftMenuProps {
  type: 'student' | 'teacher' | 'admin' | 'responsible'
}

const menuItemsStudentPortal = [
  { name: 'Início', icon: Home, to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/' },
  { name: 'Frequencia', icon: History, to: '/frequency-portal-aluno' },
  { name: 'Matriz Escolar', icon: UniversityIcon, to: '/courses/$idCourse/classes/$idClass/school-matrice/' },
  { name: 'Documentos', icon: FileText, to: '/documents' },
  { name: 'Formulários', icon: FormInput, to: '/forms' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsAdminPortal = [
  { name: 'Início', icon: Home, to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/' },
  { name: 'Formulário', icon: FormInput, to: '/admin/forms' },
  { name: 'Solicitações', icon: MessageSquareLock, to: '/password-change-request' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
  { name: 'Cadastro', icon: User, to: '/register' },
]

const menuItemsTeacherClassroom = [
  { name: 'Início', icon: Home, to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

function LeftMenu({ type }: LeftMenuProps) {
  const [activeItem, setActiveItem] = useState('')
  const { data: course } = useCourseListingQuery()
  const { deleteCourse } = useCourseController()

  const handleDeleteCourse = async (id: number) => {
    try {
      await deleteCourse(id)
    } catch (error) {
      console.log('erro ao deletar curso', error)
    }
  }

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
      {type === 'student' && renderMenuItems(menuItemsStudentPortal)}
      {type === 'admin' && renderMenuItems(menuItemsAdminPortal)}
      {type === 'teacher' && renderMenuItems(menuItemsTeacherClassroom)}

      <div className="flex-col gap-4 w-52 border-t-2 hidden min-[420px]:flex">
        <div className="w-44 h-10 justify-between pt-6 flex items-center rounded-lg ">
          <p className="font-bold text-[#787486] text-[12px] pl-4">CURSOS</p>
          {type === 'admin' && (
            <Link to="/courses">
              <SquarePen className="cursor-pointer" size={16} color="#787486" />
            </Link>
          )}
          {type === 'teacher' && <SquarePlus className="cursor-pointer" size={16} color="#787486" />}
        </div>
        {course?.map(({ nome_curso, id_curso }) => (
          <CourseItem
            key={id_curso}
            course={nome_curso}
            activeItem={activeItem}
            onClick={() => setActiveItem(nome_curso)}
            index={id_curso}
            onDelete={type === 'admin' ? () => handleDeleteCourse(id_curso) : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default LeftMenu
