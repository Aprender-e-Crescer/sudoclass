import { CardTitleForm } from '@/components/custom/card-title-form'
import { CardFormStars } from '@/components/custom/card-form-stars'
import { createFileRoute } from '@tanstack/react-router'
import { CardFormTextArea } from '@/components/custom/card-form-text-area'

export const Route = createFileRoute('/form-screen')({
  component: FormScreen,
})

export function FormScreen() {
  return (
    <div className="flex flex-col items-center p-5 space-y-6">
      <CardTitleForm title="TÍTULO DO FORMULÁRIO" sentBy="Samara Pietrobon" />

      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold">Deixe seu feedback</h2>
        <p className="text-sm text-gray-600">Avalie sua experiência abaixo</p>
      </div>

      <div className="flex-col w-full flex items-center space-y-6">
        <CardFormStars title="Você Gostou dos Conteúdos do curso?" />

        <CardFormStars title="Você Gostou dos Conteúdos do curso?" />
        <CardFormStars title="Você Gostou dos Conteúdos do curso?" />
        <CardFormStars title="Você Gostou dos Conteúdos do curso?" />

        <CardFormTextArea title="Voce gostou dos conteudos?" id="Pergunta5" />
      </div>
    </div>
  )
}
