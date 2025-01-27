import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'

export const Route = createFileRoute('/_authenticated/creations')({
  component: Creations,
})

function Creations() {
  return (
    <div>
      <p>Criar novo</p>
      <div className="flex flex-col gap-y-10 mx-32">
        <Link to={'/add-new-course'}>
          <CardComponent name="cursos" />
        </Link>
        <Link to={'/add-new-class'}>
          <CardComponent name="turmas" />
        </Link>
        <Link to={'/add-new-subject'}>
          <CardComponent name="matérias" />
        </Link>
      </div>
    </div>
  )
}
