import { SelectInput } from '@/components/custom/select-input'
import { InputForm } from '@/components/custom/text-input'
import { InputTextarea } from '@/components/custom/textarea-input'
import { DisciplineSyllabusSchema } from '@/models/discipline-syllabus-schema'
import { InputLabel } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
)({
  component: SubjectDetails,
})

export function SubjectDetails() {
  const [searchParams] = useSearchParams()
  const initialDiscipline = searchParams.get('discipline') || ''
  const [selectedValue, setSelectedValue] = useState(initialDiscipline)

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <Formik
      initialValues={{
        ModeloDaDisciplina: data.find((item) => item.value === initialDiscipline)?.model || '',
        CargaHoraria: `${data.find((item) => item.value === initialDiscipline)?.workload || ''} Horas`,
        Ementa: data.find((item) => item.value === initialDiscipline)?.disciplineSyllabus || '',
      }}
      validationSchema={DisciplineSyllabusSchema}
      onSubmit={(values) => {
        console.log('Form submitted', values)
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4 mx-20 my-10">
          <div>
            <h1 className="font-bold text-blue-950 text-4xl">Ementa da disciplina</h1>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <InputLabel id="disciplinas-select">Disciplinas</InputLabel>
              <SelectInput
                label="Disciplina"
                optionsSelectItem={data.map((item) => ({
                  selectOption: item.value,
                }))}
                onChange={(value) => {
                  handleChange(value)
                  const selectedDiscipline = data.find((item) => item.value === value)
                  setFieldValue('ModeloDaDisciplina', selectedDiscipline?.model || '')
                  setFieldValue('CargaHoraria', `${selectedDiscipline?.workload} Horas` || '')
                  setFieldValue('Ementa', selectedDiscipline?.disciplineSyllabus || '')
                }}
              />
            </div>

            <div>
              <InputLabel id="ModeloDaDisciplina">Modelo da Disciplina</InputLabel>
              <InputForm
                isDisabled={true}
                id="ModeloDaDisciplina"
                name="ModeloDaDisciplina"
                type="text"
                placeholder="Modelo da disciplina"
                label="Modelo da disciplina"
              />
            </div>

            <div>
              <InputLabel id="CargaHoraria">Carga Horaria</InputLabel>
              <InputForm
                isDisabled={true}
                id="CargaHoraria"
                name="CargaHoraria"
                type="text"
                placeholder="Carga Horaria"
                label="Carga Horaria"
              />
            </div>

            <div>
              <InputLabel id="Ementa">Ementa</InputLabel>
              <InputTextarea isDisabled={true} id="Ementa" name="Ementa" placeholder="Ementa" label="Ementa" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
