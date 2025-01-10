import { Formik, Form, Field } from 'formik'
import { Button } from '@/components/ui/button'
import { InputForm } from '@/components/custom/text-input'
import { useUpdateLessonPlanMutation } from '@/mutations/use-update-lesson-plan'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { useListLessonPlan } from '@/queries/use-list-lesson-plan'
import { useNavigate } from '@tanstack/react-router'
import { LessonPlanUpdate } from '@/mutations/use-update-lesson-plan'
import { z } from 'zod'

export const updateLessonPlanSchema = z.object({
  id_professor: z.string(),
  id_turma: z.string().min(1, 'Turma é obrigatória'),
  id_materia: z.string().min(1, 'Matéria é obrigatória'),
  data_aula: z.string().min(1, 'Data é obrigatória'),
  inicio_aula: z.string().min(1, 'Hora de início é obrigatória'),
  fim_aula: z.string().min(1, 'Hora de fim é obrigatória'),
  conteudoformativo: z.string().min(1, 'Conteúdo formativo é obrigatório'),
  mododeensino: z.string().min(1, 'Metodologia de ensino é obrigatória'),
  recursosdidaticos: z.string().min(1, 'Recursos didáticos são obrigatórios'),
})

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/update-lesson-plan',
)({
  component: UpdateLessonPlan,
})

function UpdateLessonPlan() {
  const navigate = useNavigate()
  const { idLessonPlan, idClass, idSubject, idCourse } = Route.useParams()

  const { data: lessonPlans = [] } = useListLessonPlan()

  const lessonPlan = lessonPlans.find(
    (lessonPlan) => lessonPlan.id_planoaula === Number(idLessonPlan),
  )
  console.log('teste')

  const { mutate, isLoading, isError } = useUpdateLessonPlanMutation(
    {
      onSuccess: () => {
        console.log('Plano de aula atualizado com sucesso!')
        navigate({
          to: `/courses/${idCourse}/classes/${idClass}/school-matrice/subjects/${idSubject}/lesson-plan/${idLessonPlan}/lesson-plan-view`,
          replace: true,
        })
      },
    },
    {
      onSuccess: () => {
        console.log('Plano de aula atualizado com sucesso!')
      },
      onError: (err: any) => {
        console.error('Erro ao atualizar o plano de aula:', err)
        alert(
          'Houve um erro ao atualizar o plano de aula. Tente novamente mais tarde.',
        )
      },
    },
    (err: any) => {
      console.error('Erro na mutação:', err)
    },
  )

  if (!lessonPlan) return null

  const initialValues = {
    id_professor: lessonPlan.id_professor,
    id_turma: idClass || '',
    id_materia: idSubject || '',
    data_aula: new Date(lessonPlan.data_aula).toISOString().split('T')[0],
    inicio_aula: lessonPlan.inicio_aula,
    fim_aula: lessonPlan.fim_aula,
    conteudoformativo: lessonPlan.conteudoformativo,
    mododeensino: lessonPlan.mododeensino,
    recursosdidaticos: lessonPlan.recursosdidaticos,
  }

  const handleSubmit = (values: typeof initialValues) => {
    const transformedValues: LessonPlanUpdate = {
      id_planoaula: idLessonPlan,
      id_professor: String(lessonPlan.id_professor),
      id_turma: idClass,
      id_materia: idSubject,
      data_aula: values.data_aula || '',
      inicio_aula: values.inicio_aula || '',
      fim_aula: values.fim_aula || '',
      conteudoformativo: values.conteudoformativo || '',
      mododeensino: values.mododeensino || '',
      recursosdidaticos: values.recursosdidaticos || '',
    }

    console.log(transformedValues)
    mutate(transformedValues)
  }

  return (
    <div className="flex flex-row h-screen relative mx-5">
      <div className="flex-grow flex flex-col items-center justify-start mt-5">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col space-y-6 w-full">
            <div className="w-full border border-[#C6C6C6] rounded-lg p-5">
              <div>
                <h1>Data</h1>
                <Field name="data_aula">
                  {({ field }) => (
                    <InputForm
                      type="date"
                      placeholder="Selecione a data"
                      id="data_aula"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Hora de Início</h1>
                <Field name="inicio_aula">
                  {({ field }) => (
                    <InputForm
                      type="time"
                      placeholder="Selecione a hora de início"
                      id="inicio_aula"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Hora de Fim</h1>
                <Field name="fim_aula">
                  {({ field }) => (
                    <InputForm
                      type="time"
                      placeholder="Selecione a hora de fim"
                      id="fim_aula"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Conteúdo Formativo</h1>
                <Field name="conteudoformativo">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva o conteúdo formativo"
                      id="conteudoformativo"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Metodologia de Ensino</h1>
                <Field name="mododeensino">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva a metodologia de ensino"
                      id="mododeensino"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Recursos Didáticos</h1>
                <Field name="recursosdidaticos">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva os recursos didáticos"
                      id="recursosdidaticos"
                      {...field}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-2">
              <Link
                to={`/courses/${idCourse}/classes/${idClass}/school-matrice/subjects/${idSubject}/lesson-plan/${idLessonPlan}/lesson-plan-view`}
              >
                <Button type="button" variant="lightTextBlack" size="large">
                  Cancelar
                </Button>
              </Link>

              <Button
                type="submit"
                variant="blueButton"
                size="large"
                isLoading={isLoading}
                isError={isError}
              >
                Salvar
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default UpdateLessonPlan
