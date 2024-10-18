import { createFileRoute } from '@tanstack/react-router'
import { HeaderNotes } from '@/components/custom/header-notes'

export const Route = createFileRoute('/notes-screen')({
  component: () =>


<div className="flex">
    <HeaderNotes
    subtitle='sem data de entrega'
    title='Atividade 1'
    totalNote='De 100'/>
    <HeaderNotes
    subtitle='Para cada aluno'
    title='Média Geral'
    totalNote='De 100'/>
</div>
    
})