import { InputForm } from '../components/custom/generics-inputs'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form } from 'formik'

export const Route = createFileRoute('/teacher-registration-form')({
  component: TeacherRegistration,
})
export function TeacherRegistration() {
  return (
    <>
      <Formik>
        <Form>
          <div className='w-full'>
            <InputForm
                    title="Nome completo"
                    placeholder="nomecompleto.."
                    type="default"
                    id="nomeAlunoCadastro"
                    name="nome completo"
                    label="Nome"
                    
                />
                </div>
        </Form>
      </Formik>
      
    </>
  )
}
