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
        <Form className='p-1'>
          <div className='w-11/12 p-2  rounded-sm border-2'>
            <InputForm
                    title="Nome completo"
                    placeholder="nomecompleto.."
                    type="text"
                    id="nameProfessor"
                    name="nameProfessor"
                    label="nameProfessor"
                    
                />
{/* (99) 99999-9999 */}
                <InputForm
                    title="Email"
                    placeholder="@gmail.com"
                    type="text"
                    id="emailProfessor"
                    name="emailProfessor"
                    label="emailProfessor"
                    
                />
                <InputForm
                    title="Telefone"
                    placeholder="(99) 99999-9999"
                    type="text"
                    id="phoneNumberTeacher"
                    name="phoneNumberTeacher"
                    label="phoneNumberTeacher"
                    
                />
               {/*  <div className='flex gap-5'>
                  <InputForm
                      title="Estado"
                      placeholder="PR"
                      type="text"
                      id="state"
                      name="state"
                      label="state"
                      
                  />
                  <InputForm
                      title="Muncipio"
                      placeholder="Dois vizinhos"
                      type="text"
                      id="city"
                      name="city"
                      label="city"
                      
                  />
                </div>  */}

                <InputForm
                      title="Rua"
                      placeholder="Rua"
                      type="text"
                      id="street"
                      name="street"
                      label="street"
                />

                 <div className='flex sm:gap-5'>
                  <div className='xl:w-1/2 w-1/2 '>
                  <InputForm
                      title="Bairro"
                      placeholder="Bairro"
                      type="text"
                      id="neighborhood"
                      name="neighborhood"
                      label="neighborhood"
                      
                  />
                  </div>
                  <div className='xl:w-72 w-1/2 max-sm:w-1/3'>
                  <InputForm
                      title="Numero"
                      placeholder="ex: 77"
                      type="text"
                      id="HouseNumber"
                      name="HouseNumber"
                      label="HouseNumber"
                  />
                  </div>
                </div>

                <div className='flex gap-5 max-sm:gap-1 flex-wrap'>
                <InputForm
                      title="Data de nascimento"
                      placeholder="00/00/0000"
                      type="text"
                      id="Date of birth"
                      name="Date of birth"
                      label="Date of birth"
                  />
                  <InputForm
                      title="CPF"
                      placeholder="000.000.000-00"
                      type="text"
                      id="CPFadmin"
                      name="CPFadmin"
                      label="CPFadmin"
                  />
                  <InputForm
                      title="RG"
                      placeholder="00.000.000-0"
                      type="text"
                      id="RGadmin"
                      name="RGadmin"
                      label="RGadmin"
                  />

                </div>

                </div>
        </Form>
      </Formik>
      
    </>
  )
}
