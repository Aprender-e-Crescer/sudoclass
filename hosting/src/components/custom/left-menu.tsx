import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Course, courseSchema } from '@/models/course-schema'
import { useCreateCourseMutation } from '@/mutations/use-create-course-mutation'
import { role } from '@/types/user'
import { Link, useNavigate } from '@tanstack/react-router'
import Circle from '@uiw/react-color-circle'
import { Field, Form, Formik } from 'formik'
import { Home, Settings, SquarePen, SquarePlus } from 'lucide-react'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
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
  const [hex, setHex] = useState('#F44E3B')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { mutate: createCourse } = useCreateCourseMutation()
  const navigate = useNavigate({ from: '/' })

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <SquarePlus className="cursor-pointer" size={16} color="#787486" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Curso</DialogTitle>
                <DialogDescription>Cadastre seu novo curso.</DialogDescription>
              </DialogHeader>
              <Formik
                initialValues={{ name: '', color: hex }}
                validationSchema={toFormikValidationSchema(courseSchema)}
                onSubmit={(values) => {
                  createCourse(values)
                  navigate({ to: '/courses-management' })
                  setIsDialogOpen(false)
                }}
              >
                {({ setFieldValue, touched, errors }) => (
                  <Form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Nome
                      </label>
                      <Field id="name" name="name" className="col-span-3" as={Input} placeholder="Nome do curso" />
                      {touched.name && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <label htmlFor="color" className="text-right">
                        Cor
                      </label>
                      <div className="flex flex-wrap w-64 gap-2">
                        {[
                          '#FF0000',
                          '#00FF00',
                          '#0000FF',
                          '#FFD700',
                          '#4682B4',
                          '#800000',
                          '#FF6347',
                          '#8A2BE2',
                          '#FF1493',
                          '#32CD32',
                          '#D2691E',
                          '#FF4500',
                        ].map((color) => (
                          <Circle
                            key={color}
                            colors={[color]}
                            color={hex}
                            onChange={(c) => {
                              setHex(c.hex)
                              setFieldValue('color', c.hex)
                            }}
                          />
                        ))}
                      </div>
                      {touched.color && errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
                    </div>
                    <DialogFooter>
                      <Button type="submit">Criar</Button>
                    </DialogFooter>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
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
