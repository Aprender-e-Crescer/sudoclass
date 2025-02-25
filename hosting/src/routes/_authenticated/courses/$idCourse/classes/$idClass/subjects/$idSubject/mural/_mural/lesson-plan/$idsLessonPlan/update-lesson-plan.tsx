import { useUpdateLessonPlanController } from '@/controllers/use-update-lesson-plan-controller'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Field, Form, Formik } from 'formik'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idsLessonPlan/update-lesson-plan',
)({
  component: UpdateLessonPlan,
})

function UpdateLessonPlan() {
  const { idCourse, idClass, idSubject, idsLessonPlan } = Route.useParams()

  const { formattedStartDate, formattedStartDateInicio, formattedEndDate, initialValues, handleSubmit, isUpdating,loadingLessonPlannings } =
    useUpdateLessonPlanController({
      idCourse,
      idClass,
      idSubject,
      idsLessonPlan,
    })

    if (loadingLessonPlannings) {
      return <p>Carregando...</p>
    }

  return (
    <div className="border p-4 mx-4 my-4 rounded-md flex flex-col justify-center items-center">
      <div className="flex w-full justify-around border-b mb-4 items-center">
        <p>Data: {formattedStartDate}</p>
        <p>Início: {formattedStartDateInicio}</p>
        <p>Fim: {formattedEndDate}</p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-full">
            <div>
              <label className="block text-sm font-medium w-full">Conteúdo</label>
              <Field
                type="text"
                name="content"
                placeholder={values.content || 'Digite o conteúdo'}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium w-full">Metodologia</label>
              <Field
                type="text"
                name="methodology"
                placeholder={values.methodology || 'Digite a metodologia'}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium w-full">Recursos usados</label>
              <Field
                type="text"
                name="resources"
                placeholder={values.resources || 'Digite os recursos'}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex gap-2 justify-center w-1/2">
              <Link
                to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/view"
                params={{
                  idCourse,
                  idClass,
                  idSubject,
                }}
                className="w-1/2"
              >
                <button type="reset" className="mt-4 flex-1 rounded-md bg-gray-300 text-gray-700 p-2 w-full">
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting || isUpdating}
                className="mt-4 flex-1 bg-blue-500 text-white p-2 rounded"
              >
                {isSubmitting || isUpdating ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
