import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { addNewCourseSchema } from '@/models/add-new-course-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import axios from 'axios'

export const Route = createFileRoute('/_authenticated/courses/')({
  component: AddNewCourseForm,
})

const initialValues = {
  id: '',
  nome: '',
  cargaHoraria: '',
  dataInicio: '',
  dataFim: '',
  dataInicioInscricoes: '',
  dataFimInscricoes: '',
  numeroVagas: '',
  ementa: '',
}

function AddNewCourseForm() {
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post('/course', values)
      alert('Curso criado com sucesso!')
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Erro ao criar curso:', error)
      alert('Erro ao criar curso. Por favor, tente novamente.')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(addNewCourseSchema)}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold p-5 ml-10">Adicionar curso</h1>
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
              name="nome"
              placeholder="Nome"
              id="nome"
            />
            <InputForm
              title="Carga horária"
              label="Carga horária"
              name="cargaHoraria"
              placeholder="500hrs"
              id="cargaHoraria"
            />
            <InputForm
              title="Data de início"
              label="Data de início"
              name="dataInicio"
              placeholder="00/00/0000"
              id="dataInicio"
            />
            <InputForm
              title="Data de término"
              label="Data de término"
              name="dataFim"
              placeholder="00/00/0000"
              id="dataFim"
            />
            <InputForm
              title="Início das inscrições"
              label="Início das inscrições"
              name="dataInicioInscricoes"
              placeholder="00/00/0000"
              id="dataInicioInscricoes"
            />
            <InputForm
              title="Término das inscrições"
              label="Término das inscrições"
              name="dataFimInscricoes"
              placeholder="00/00/0000"
              id="dataFimInscricoes"
            />
            <InputForm
              title="Número de vagas"
              label="Número de vagas"
              name="numeroVagas"
              placeholder="30"
              id="numeroVagas"
            />
            <InputForm
              title="Ementa"
              label="Ementa"
              name="ementa"
              placeholder="Descrição do curso"
              id="ementa"
            />
          </div>
          <div className="flex items-center justify-center mt-5">
            <Button variant="lightTextBlack">Cancelar</Button>
            <Button variant="blueButton" type="submit">
              Criar
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
