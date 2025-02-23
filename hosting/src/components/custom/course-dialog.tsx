import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { courseSchema } from '@/models/course-schema'
import Circle from '@uiw/react-color-circle'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const courseFormSchema = courseSchema.omit({ id: true })

interface CourseDialogProps {
  title: string
  subTitle: string
  isOpen: boolean
  onClose: () => void
  mutation: (values: { id?: string; name: string; color: string }) => void
  initialValues?: { id?: string; name: string; color: string }
}

export default function CourseDialog({
  title,
  subTitle,
  isOpen,
  onClose,
  mutation,
  initialValues = { name: '', color: '' },
}: CourseDialogProps) {
  const [hex, setHex] = useState(initialValues.color)

  useEffect(() => {
    setHex(initialValues.color)
  }, [initialValues.color])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(courseFormSchema)}
          onSubmit={(values) => {
            mutation(values)
            onClose()
          }}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <label htmlFor="name" className="text-right mt-2">
                  Nome
                </label>
                <div className="flex flex-col min-w-60 gap-y-1">
                  <Field id="name" name="name" className="col-span-3" as={Input} placeholder="Nome do curso" />
                  <p className="text-red-500 text-xs">
                    <ErrorMessage name="name" />
                    &#8203;
                  </p>
                </div>
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
              </div>
              <p className="text-red-500 text-xs pl-24">
                <ErrorMessage name="color" />
                &#8203;
              </p>
              <DialogFooter>
                <Button type="submit">{initialValues.id ? 'Salvar' : 'Criar'}</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
