import { SelectInput } from '@/components/custom/select-input'
import { InputForm } from '@/components/custom/text-input'
import { InputTextarea } from '@/components/custom/textarea-input'
import { DisciplineSyllabusSchema } from '@/models/discipline-syllabus-schema'
import { InputLabel } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
)({
  component: SubjectDetails,
})

const data = [
  {
    value: 'matematica',
    label: 'Matemática',
    workload: 40,
    disciplineSyllabus: 'Introdução aos conceitos básicos de matemática, incluindo álgebra e geometria.',
  },
  {
    value: 'portugues',
    label: 'Português',
    workload: 35,
    disciplineSyllabus: 'Estudo da gramática normativa, interpretação de textos e redação.',
  },
  {
    value: 'historia',
    label: 'História',
    workload: 45,
    disciplineSyllabus: 'Análise dos eventos históricos do Brasil e do mundo, com foco no período moderno.',
  },
  {
    value: 'biologia',
    label: 'Biologia',
    workload: 50,
    disciplineSyllabus: 'Fundamentos de biologia celular, genética e ecologia.',
  },
  {
    value: 'fisica',
    label: 'Física',
    workload: 48,
    disciplineSyllabus: 'Estudo das leis do movimento, termodinâmica e introdução à ótica.',
  },
]

export function SubjectDetails() {
  const initialDiscipline = data[0].value
  const [selectedValue, setSelectedValue] = useState(initialDiscipline)

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <Formik
      initialValues={{
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
                  label: item.label,
                }))}
                onChange={(value) => {
                  handleChange(value)
                  const selectedDiscipline = data.find((item) => item.value === value)
                  setFieldValue('CargaHoraria', `${selectedDiscipline?.workload} Horas`)
                  setFieldValue('Ementa', selectedDiscipline?.disciplineSyllabus || '')
                }}
              />
            </div>

            <div>
              <InputLabel id="CargaHoraria">Carga Horária</InputLabel>
              <InputForm
                isDisabled={true}
                id="CargaHoraria"
                name="CargaHoraria"
                type="text"
                placeholder="Carga Horária"
                label="Carga Horária"
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
