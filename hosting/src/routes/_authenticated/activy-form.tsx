import { CardTitleForm } from '@/components/custom/card-title-form'
import { QuestionForm } from '@/components/custom/question-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/activy-form')({
  component: ActivyForm,
})

function ActivyForm() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-10">
        <CardTitleForm sentBy="PROFESSOR" title="ATIVIDADE" />
        <QuestionForm
          question="HTML E BOM?"
          radioId="q1"
          options={['true', 'false']}
        />
        <QuestionForm
          question="HTML E BOM?"
          radioId="q2"
          options={['true', 'false']}
        />
        <QuestionForm
          question="HTML E BOM?"
          radioId="q3"
          options={['true', 'false']}
        />
      </div>
    </div>
  )
}

export default ActivyForm
