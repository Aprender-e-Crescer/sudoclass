import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { InputWithAvatar } from '@/components/custom/input-with-avatar'
import { Form, Formik } from 'formik'

export const Route = createFileRoute('/wall-subjects-input')({
  component: WallSubjectInput,
})

const initialValues = {
  value: '',
}

export function WallSubjectInput() {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name="Matéria" description="Nome do curso"></CardComponent>
        </div>

        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <InputWithAvatar placeholder="Digite algo" id="value" name="value" avatar="" />
              </Form>
            )}
          </Formik>
        </div>

        <div className="my-4 flex flex-col items-center w-full space-y-4">
          <ActivitiesMaterials
            id="1"
            to=""
            title="Professor atribuiu uma nova atividade:"
            dateActivity="ontem"
            instructions=""
            iconColor=""
            type="teacher"
          />
          <ActivitiesMaterials
            id="2"
            to=""
            title="Professor atribuiu uma nova atividade:"
            dateActivity="ontem"
            instructions=""
            iconColor=""
            type="teacher"
          />
        </div>
      </div>
    </div>
  )
}
