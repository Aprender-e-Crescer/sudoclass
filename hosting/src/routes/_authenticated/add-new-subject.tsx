import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { subjectsSchema } from '@/models/subjects-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useCreateSubject } from '@/mutations/use-add-subjects-plan-mutation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { EllipsisVertical, MonitorPlay } from 'lucide-react'
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { Select } from '@mui/material'
import { useTeachersListingQuery } from '@/queries/use-teachers-listing-query'
import { SelectInput } from '@/components/custom/select-input'

export const Route = createFileRoute('/_authenticated/add-new-subject')({
  component: AddNewSubjectForm,
})

const initialValues = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  workload: '',
  idProfessor: '',
}

function AddNewSubjectForm() {
  const { mutate, isPending } = useCreateSubject()
  const { data: teachers } = useTeachersListingQuery()

  const handleSubmit = (values: typeof initialValues) => {
    mutate(
      {
        nomeMateria: values.name,
        cargahoraria: Number(values.workload),
        dataInicio: new Date(values.startDate),
        dataFim: new Date(values.endDate),
        idProfessor: Number(values.idProfessor),
        ementa: values.description,
      },
      {
        onSuccess: () => {
          alert('Matéria criada com sucesso!')
        },
        onError: (error) => {
          console.error('Erro ao criar matéria:', error)
          alert('Erro ao criar matéria. Por favor, tente novamente.')
        },
      },
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(subjectsSchema)}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold p-5 ml-10">Adicionar Matéria</h1>
          <hr />
          <div className="p-6">
            <InputForm title="Nome" label="Nome" name="name" placeholder="Nome da matéria" id="name" />
            <InputForm
              title="Descrição"
              label="Descrição"
              name="description"
              placeholder="Descrição da matéria"
              id="description"
            />
            <InputForm
              title="Data de início"
              label="Data de início"
              name="startDate"
              placeholder="00/00/0000"
              id="startDate"
              type="date"
            />
            <InputForm
              title="Data de término"
              label="Data de término"
              name="endDate"
              placeholder="00/00/0000"
              id="endDate"
              type="date"
            />
            <InputForm title="Carga horária" label="Carga horária" name="workload" placeholder="500hrs" id="workload" />
            <SelectInput
              label="Professor"
              optionsSelectItem={teachers?.map((item) => ({
                selectOption: `${item.fullName} - ${item.idTeacher}`,
                label: item.fullName + item.idTeacher,
              }))}
              onChange={(value) => setFieldValue('idProfessor', value.split('-')[1].trimStart())}
            />
          </div>
          <div className="flex items-center justify-center mt-5">
            <Button variant="lightTextBlack" disabled={isPending}>
              Cancelar
            </Button>
            <Button variant="blueButton" type="submit" disabled={isPending}>
              {isPending ? 'Criando...' : 'Criar'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
