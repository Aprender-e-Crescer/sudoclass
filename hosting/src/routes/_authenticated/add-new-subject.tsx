import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { subjectsSchema } from '@/models/subjects-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useCreatePedagogues } from '@/mutations/use-add-subjects-plan-mutation'

export const Route = createFileRoute('/_authenticated/add-new-subject')({
  component: AddNewSubjectForm,
})

const initialValues = {
  id: '',
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  workload: '',
  teacher: '', 
}

function AddNewSubjectForm() {
  const { mutate, isLoading } = useCreatePedagogues()

  const handleSubmit = (values: typeof initialValues) => {
    mutate(values, {
      onSuccess: () => {
        alert('Matéria criada com sucesso!')
      },
      onError: (error) => {
        console.error('Erro ao criar matéria:', error)
        alert('Erro ao criar matéria. Por favor, tente novamente.')
      },
    })
  }

  const handleSelectTeacher = () => {
    // Lógica para abrir um modal ou selecionar um professor
    alert('Abrir seleção de professores')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(subjectsSchema)}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold p-5 ml-10">Adicionar Matéria</h1>
          <hr />
          <div className="p-6">
            <InputForm
              title="ID"
              label="ID"
              name="id"
              placeholder="ID único"
              id="id"
            />
            <InputForm
              title="Nome"
              label="Nome"
              name="name"
              placeholder="Nome da matéria"
              id="name"
            />
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
            />
            <InputForm
              title="Data de término"
              label="Data de término"
              name="endDate"
              placeholder="00/00/0000"
              id="endDate"
            />
            <InputForm
              title="Carga horária"
              label="Carga horária"
              name="workload"
              placeholder="500hrs"
              id="workload"
            />
            {/* Botão Selecionar Professor */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={handleSelectTeacher}
                variant="lightTextBlack"
              >
                Selecionar Professor
              </Button>
              <Button
                type="button"
                variant="blueButton"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <Button variant="lightTextBlack" disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="blueButton" type="submit" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
