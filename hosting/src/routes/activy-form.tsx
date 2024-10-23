import { CardTitleForm } from '@/components/custom/card-title-form'
import { QuestionForm } from '@/components/custom/question-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/activy-form')({
  component: ActivyForm,
})

function ActivyForm() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center">
        <CardTitleForm sentBy="PROFESSOR" title="ATIVIDADE" />
        <QuestionForm falseText="false" question="HTML E BOM?" trueText="true " radioId="q1" />
        <QuestionForm falseText="false" question="HTML E BOM?" trueText="true " radioId="q2" />
        <QuestionForm falseText="false" question="HTML E BOM?" trueText="true " radioId="q3" />
      </div>
    </div>
  )
}

export default ActivyForm
