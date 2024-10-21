import { CardComponent } from './card-bolletin-board'
import { TeacherComment } from './teacher-comment'
import { ActivitiesMaterials } from './activities-materials'

export function WallSubject() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full lg:w-3/4 items-center p-6">
        <div className="my-4 mx-auto">
          <CardComponent name="Matéria" description="Nome do curso"></CardComponent>
        </div>
        <div className="my-8 mx-auto items-center">
          <TeacherComment
            name="Alexandre Martinek"
            date="ontem"
            comment="Prova amanhã pessoal! Não faltem"
            textAvatar="A"
            avatarSrc=""
          ></TeacherComment>
        </div>

        <div className="my-4 mx-auto flex flex-col items-center">
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
