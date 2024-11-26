import { SelectInput } from '@/components/custom/select-input'
import { InputForm } from '@/components/custom/text-input'
import { InputTextarea } from '@/components/custom/textarea-input'
import { InputLabel } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
)({
  component: SubjectDetails,
})

const data = [
  {
    value: 'UI/UX',
    label: 'UI/UX',
    workload: 60,
    disciplineSyllabus: 'Fundamentos de design de interfaces e experiência do usuário com foco em aplicações digitais.',
    id: 1,
  },
  {
    value: 'WEB1',
    label: 'Desenvolvimento Web 1',
    workload: 50,
    disciplineSyllabus: 'Introdução ao desenvolvimento web com HTML, CSS e princípios básicos de JavaScript.',
    id: 2,
  },
  {
    value: 'WEB2',
    label: 'Desenvolvimento Web 2',
    workload: 55,
    disciplineSyllabus: 'Construção de aplicações web avançadas usando frameworks modernos como React.',
    id: 3,
  },
  {
    value: 'MARKETING',
    label: 'Marketing Digital',
    workload: 40,
    disciplineSyllabus: 'Estratégias de marketing digital, incluindo SEO, campanhas pagas e análise de métricas.',
    id: 4,
  },
  {
    value: 'BACKEND',
    label: 'BACKEND',
    workload: 40,
    disciplineSyllabus:
      'A disciplina de Backend  abrange os conceitos fundamentais para o desenvolvimento de sistemas do lado do servidor, com ênfase na construção de APIs e integração com bancos de dados.',
    id: 5,
  },
]

export function SubjectDetails() {
  return (
    <Formik
      initialValues={{
        selectedDiscipline: '',
        CargaHoraria: '',
        Ementa: '',
      }}
      onSubmit={(values) => console.log('Form submitted:', values)}
    >
      {({ setFieldValue, values }) => (
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
                  const selectedDiscipline = data.find((item) => item.value === value)
                  setFieldValue('CargaHoraria', `${selectedDiscipline?.workload || ''} Horas`)
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
                value={values.CargaHoraria}
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
