import { CardComponent } from '@/components/custom/card-bolletin-board'
import { TeacherComment } from '@/components/custom/teacher-comment'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'

export function WallSubject() {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name="Matéria" description="Nome do curso"></CardComponent>
        </div>

        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <TeacherComment
            name="Alexandre Martinek"
            date="ontem"
            comment="Prova amanhã pessoal! Não faltem"
            textAvatar="A"
            avatarSrc=""
          ></TeacherComment>
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
          ></ActivitiesMaterials>
          <ActivitiesMaterials
            id="2"
            to=""
            title="Professor atribuiu uma nova atividade:"
            dateActivity="ontem"
            instructions=""
            iconColor=""
            type="teacher"
          ></ActivitiesMaterials>
        </div>
      </div>
    </div>
  )
}
