import { Course } from '@/models/course-schema'
import { role } from '@/types/user'
import { Link } from '@tanstack/react-router'
import { Home, Settings, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { MenuItem } from './menu-item'
import { CourseItem } from './menu-item-courses'

interface LeftMenuProps {
  type: role | undefined
  courses: Course[] | undefined
}

const menuItemsStudentPortal = [
  { name: 'Início', icon: Home, to: '/courses' },
  { name: 'Matriz Escolar', icon: Home, to: '/school-matrices' },
  { name: 'Documentos', icon: Home, to: '/documents' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsAdminPortal = [
  { name: 'Início', icon: Home, to: '/courses' },
  { name: 'Matriz Escolar', icon: Home, to: '/school-matrices' },
  { name: 'Documentos', icon: Home, to: '/documents' },
  { name: 'Criações', icon: Home, to: '/creations' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsTeacherClassroom = [
  { name: 'Início', icon: Home, to: '/courses' },
  { name: 'Configurações', icon: Settings, to: '/profile-changes' },
]

function LeftMenu({ type, courses }: LeftMenuProps) {
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
    <div className="flex gap-8 flex-col border-r-2  p-3">
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
        </div>
        {courses?.map(({ id, name, color }) => (
          <Link key={id} to={`/courses/${id}/classes`} onClick={() => setActiveItem(name)} className="w-full">
            <CourseItem
              backgroundColor={color}
              course={name}
              activeItem={activeItem}
              onClick={() => setActiveItem(name)}
              index={id}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LeftMenu
