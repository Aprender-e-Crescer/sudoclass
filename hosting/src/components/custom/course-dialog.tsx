import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Formik, Form, Field } from 'formik'
import { courseSchema } from '@/models/course-schema'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Circle from '@uiw/react-color-circle'

interface CourseDialogProps {
  title: string
  subTitle: string
  isOpen: boolean
  onClose: () => void
  createCourse: (values: { name: string; color: string }) => void
}

export default function CourseDialog({ title, subTitle, isOpen, onClose, createCourse }: CourseDialogProps) {
  const [hex, setHex] = useState('#F44E3B')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{ name: '', color: hex }}
          validationSchema={toFormikValidationSchema(courseSchema)}
          onSubmit={(values) => {
            createCourse(values)
            onClose()
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
  )
}
