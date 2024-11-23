import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { Warning } from '@/components/custom/warning'

export const Route = createFileRoute('/_authenticated/wall-subjects')({
  component: WallSubject,
})

export function WallSubject() {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent
            name="Matéria"
            description="Nome do curso"
          ></CardComponent>
        </div>

        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <Warning
            name="Alexandre Martinek"
            date="ontem"
            comment="Prova amanhã pessoal! Não faltem"
            textAvatar="A"
            avatarSrc=""
          />
        </div>
      </div>
    </div>
  )
}
