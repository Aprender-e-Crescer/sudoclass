import { InputCheckbox } from '@/components/custom/checkbox-input'
import { InputForm } from '@/components/custom/text-input'
import { changePasswordRequestSchema } from '@/models/change-password-request-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/class-user-resgistration')({
  component: FormRegistration,
})

const initialValues = {
    newPasswordDefault: '',
    requestStatus: '',
    studentName: '',
}

const checkboxValues = [{
  value: "Sim",
  label: "yes"
},
{
  value: "Não",
  label: "no"
}
]

export function FormRegistration() {
  return (
    <>
      <Formik 
          onSubmit={() => {}}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(changePasswordRequestSchema) }
      >  
      <Form>
          <div>
              <h1 className='font-semibold'>ALUNO</h1>
          </div>
          <InputForm
            title="Turma" 
            id="tumaRegistration"
            name="tumaRegistration"
            placeholder="Nome Da Turma" 
            label="tumaRegistration"
          />
          <InputForm
            title="Turno"
            id="shiftRecord"
            name="shiftRecord"
            placeholder="Turno"
            label="shiftRecord"
          />
          <InputForm
            title="Previsão De Início"
            id="startPredictionRecord"
            name="startPredictionRecord"
            placeholder="Previsão De Início"
            label="startPredictionRecord"
          />
          <InputForm
            title="Previsão De Fim"
            id="endPredictionRecordt"
            name="endPredictionRecordt"
            placeholder="Previsão De Fim"
            label="endPredictionRecordt"
          />
          <InputForm
            title="Data Final Inscrição"
            id="registrationEndDate"
            name="registrationEndDate"
            placeholder="Data Final Inscrição"
            label="registrationEndDate"
          />
          <InputForm
            title="Qtde.Horas"
            id="recordingNumbeOfHours"
            name="recordingNumbeOfHours"
            placeholder="Qtde.Horas"
            label="recordingNumbeOfHours"
          />
          <InputForm
            title="Total De Vagas"
            id="recordOfTotalVacancies"
            name="recordOfTotalVacancies"
            placeholder="Total De Vagas"
            label="recordOfTotalVacancies"
          />
          <div>
            <h1 className='py-2'>Concluído</h1>
          </div>
          <div className='flex gap-2'>
            <InputCheckbox checkboxValues={checkboxValues}
            />
          </div>
          <div>
            <h1 className=' py-2'>Liberado</h1>
          </div>
          <div className='flex gap-2'>
            <InputCheckbox checkboxValues={checkboxValues}
            />
          </div>
        </Form>
      </Formik>
    </>
  )
}
