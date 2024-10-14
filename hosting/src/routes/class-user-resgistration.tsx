import { InputForm } from '@/components/custom/generics-inputs'
import { changePasswordRequestSchema } from '@/models/change-password-request-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'


export const Route = createFileRoute('/class-user-resgistration')({
  component: formRegistration,
})

const initialValues = {
    newPasswordDefault: '',
    requestStatus: '',
    studentName: '',
}

export function formRegistration() {
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
        type="text"
       
    />
         <InputForm
        title="Turno"
        id="shiftRecord"
        name="shiftRecord"
        placeholder="Turno"
        label="shiftRecord"
        type="text"
    />
         <InputForm
        title="Previsão De Início"
        id="startPredictionRecord"
        name="startPredictionRecord"
        placeholder="Previsão De Início"
        label="startPredictionRecord"
        type="text"
    />
         <InputForm
        title="Previsão De Fim"
        id="endPredictionRecordt"
        name="endPredictionRecordt"
        placeholder="Previsão De Fim"
        label="endPredictionRecordt"
        type="text"
    />
         <InputForm
        title="Data Final Inscrição"
        id="registrationEndDate"
        name="registrationEndDate"
        placeholder="Data Final Inscrição"
        label="registrationEndDate"
        type="text"
    />
         <InputForm
        title="Qtde.Horas"
        id="recordingNumbeOfHours"
        name="recordingNumbeOfHours"
        placeholder="Qtde.Horas"
        label="recordingNumbeOfHours"
        type="text"
    />
         <InputForm
        title="Total De Vagas"
        id="recordOfTotalVacancies"
        name="recordOfTotalVacancies"
        placeholder="Total De Vagas"
        label="recordOfTotalVacancies"
        type="text"
    />
    </Form>
  </Formik>
</>
  )
}
export function Checkbox() {
    const checkboxValuesExample = [
      {
        test1: 'Sim',
        label: 'test1',
      },
      {
        test1: 'Não',
        label: 'test2',
      },
    ];
  
    const type = 'checkbox'; 
  
    if (type === 'checkbox') {
      return (

          {checkboxValuesExample.map(({ test1, label }, index) => (
            <div className="flex items-center space-x-2 mt-2" key={index}>
              <input id={label} name={label} type="checkbox" />
              <label htmlFor={label} className="text-sm font-medium">
                {test1}
              </label>
            </div>
          ))}
        </>
    );
  }
}