import { Button } from '@/components/ui/button'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { SelectInput } from '@/components/custom/select-input'
import { useState } from 'react'
import { useListClassQuery } from '@/queries/use-class-list-query'
import { toast } from '@/hooks/use-toast' 

export const Route = createFileRoute('/_authenticated/add-student-in-class')({
  component: AddStudentToClassButton,
})

export function AddStudentToClassButton() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { data: students = [] } = useStudentsListQuery()
  const { data: classes = [] } = useListClassQuery()

  return (
    <div>
            <Button
            variant="blueButton"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="mb-4 px-6 py-3 min-w-[250px]" 
            >
            Adicionar Aluno em Turma
            </Button>


      {isFormOpen && (
        <Formik
          initialValues={{
            studentId: '',
            classId: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)

            const studentName = students.find((student: { id: string }) => student.id === values.studentId)?.nome

            toast({
              title: "Sucesso!",
              duration: 2000,
              description: `Aluno adicionado com sucesso à turma.`,
              variant: "success",
            })

            setSubmitting(false)
            setIsFormOpen(false)
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-4 border p-4 rounded-md">
              <SelectInput
                label="Aluno"
                optionsSelectItem={students.map((student: { nome: any; id: any }) => ({
                  selectOption: `${student.nome} - ${student.id}`,
                  label: student.nome,
                }))}
                onChange={(value) => setFieldValue('studentId', value.split('-')[1].trim())}
              />

              <SelectInput
                label="Turma"
                optionsSelectItem={classes.map((turma) => ({
                  selectOption: `${turma.name} - ${turma.id_turma}`,
                  label: turma.name,
                }))}
                onChange={(value) => setFieldValue('classId', value.split('-')[1].trim())}
              />

              <div className="flex gap-4">
                <Button type="submit" variant="blueButton" size="large" disabled={isSubmitting}>
                  Adicionar
                </Button>
                <Button
                  type="button"
                  variant="ghostBlack"
                  size="large"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}
