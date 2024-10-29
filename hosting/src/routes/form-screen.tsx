import { CardTitleForm } from '@/components/custom/card-title-form'
import { CardFormStars } from '@/components/custom/card-form-stars'
import { createFileRoute } from '@tanstack/react-router'

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

      <CardFormStars title="Você Gostou dos Conteúdos do curso?" />
      <CardFormStars title="Você Gostou dos Conteúdos do curso?" />
      <CardFormStars title="Você Gostou dos Conteúdos do curso?" />
      <CardFormStars title="Você Gostou dos Conteúdos do curso?" />

      <div className="w-full sm:w-[620px]">
        <textarea
          placeholder="Escreva suas sugestões"
          className="border-2 bg-blue-900 rounded-lg w-full h-28 p-3 resize-none"
        />
      </div>
    </div>
  )
}
