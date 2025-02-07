import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'

export const Route = createFileRoute('/_authenticated/users/register/teacher')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Formik>
        <Form>

          <Button variant="ghostWhite">Cancelar</Button>
          <Button variant="blueButton">Cadastrar</Button>
        </Form>
      </Formik>
    </>
  )
}
