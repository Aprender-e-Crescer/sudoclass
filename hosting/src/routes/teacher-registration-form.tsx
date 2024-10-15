import { InputForm } from '@/components/custom/text-input'
import { FileInput } from '@/components/custom/file-input'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form } from 'formik'
import { X } from 'lucide-react'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/teacher-registration-form')({
  component: TeacherRegistration,
})
export function TeacherRegistration() {
  return (
    <>
      <Formik>
        <Form className='p-1'>
          <div className=' p-2 w-11/12 rounded-sm border-2'>
            <InputForm
                    title="Nome completo"
                    placeholder="nomecompleto.."
                    type="text"
                    id="nameProfessor"
                    name="nameProfessor"
                    label="nameProfessor"
                    customStyleButton='rounded-lg border-2 p-[6px]'
                    
                />
                <InputForm
                    title="Email"
                    placeholder="@gmail.com"
                    type="text"
                    id="emailProfessor"
                    name="emailProfessor"
                    label="emailProfessor"
                    customStyleButton='rounded-lg border-2 p-[6px]'
                    
                />
                <InputForm
                    title="Telefone"
                    placeholder="(99) 99999-9999"
                    type="text"
                    id="phoneNumberTeacher"
                    name="phoneNumberTeacher"
                    label="phoneNumberTeacher"
                    customStyleButton='rounded-lg border-2 p-[6px]'
                    
                />
                 <div className='flex gap-5 flex-wrap'>
                  <InputForm
                      title="Estado"
                      placeholder="PR"
                      type="text"
                      id="state"
                      name="state"
                      label="state"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                      
                  />
                  <InputForm
                      title="Muncipio"
                      placeholder="Dois vizinhos"
                      type="text"
                      id="city"
                      name="city"
                      label="city"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />
                </div>  

                <InputForm
                      title="Rua"
                      placeholder="Rua"
                      type="text"
                      id="street"
                      name="street"
                      label="street"
                      customStyleButton='rounded-lg border-2 p-[6px]'
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
                      customStyleButton='rounded-lg border-2 p-[6px]'
                      
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
                      customStyleButton='rounded-lg border-2 p-[6px]'
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
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />
                  <InputForm
                      title="CPF"
                      placeholder="000.000.000-00"
                      type="text"
                      id="CPFadmin"
                      name="CPFadmin"
                      label="CPFadmin"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />
                  <InputForm
                      title="RG"
                      placeholder="00.000.000-0"
                      type="text"
                      id="RGadmin"
                      name="RGadmin"
                      label="RGadmin"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />

                </div>
                <InputForm
                      title="Data de expedição RG"
                      placeholder="data de expedição"
                      type="text"
                      id="shippingDate"
                      name="shippingDate"
                      label="shippingDate"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                 <InputForm
                      title="Estado de expedição RG"
                      placeholder="estado de expedição"
                      type="text"
                      id="shippingState"
                      name="shippingState"
                      label="shippingState"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                <InputForm
                      title="Estado de nascimento"
                      placeholder="Estado"
                      type="text"
                      id="stateOfBirth"
                      name="stateOfBirth"
                      label="stateOfBirth"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                <InputForm
                      title="Cidade de nascimento"
                      placeholder="  Cidade"
                      type="text"
                      id="cityOfBirth"
                      name="cityOfBirth"
                      label="cityOfBirth"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                <div className='flex'>
                 <FileInput
                      title='Anexar documentos:'
                      placeholder="ImagemDocumentoAnexado.png      90kb"
                      type="file"
                      id="AttachDocuments"
                      name="AttachDocuments"
                      label="AttachDocuments"
                />
                
               </div>
                </div>
        </Form>
      </Formik>
    </>
  )
}