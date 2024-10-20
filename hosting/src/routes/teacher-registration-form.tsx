import { InputForm } from '@/components/custom/text-input'
import { InputFile } from '@/components/custom/file-input'
import { Button } from '@/components/ui/button'
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
                    id="nameProfessor"
                    name="nameProfessor"
                    label="nameProfessor"
                    customStyleButton='rounded-lg border-2 p-[6px]'
                    
                />
                <InputForm
                    title="Email"
                    placeholder="@gmail.com"
                    id="emailProfessor"
                    name="emailProfessor"
                    label="emailProfessor"
                    customStyleButton='rounded-lg border-2 p-[6px]'
                    
                />
                <InputForm
                    title="Telefone"
                    placeholder="(99) 99999-9999"
                    id="phoneNumberTeacher"
                    name="phoneNumberTeacher"
                    label="phoneNumberTeacher"
                    customStyleButton='rounded-lg border-2 p-[6px]'
                    
                />
                 <div className='flex gap-5 flex-wrap'>
                  <InputForm
                      title="Estado"
                      placeholder="PR"
                      id="state"
                      name="state"
                      label="state"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                      
                 />
                  <InputForm
                      title="Muncipio"
                      placeholder="Dois vizinhos"
                      id="city"
                      name="city"
                      label="city"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />
                </div>  

                <InputForm
                      title="Rua"
                      placeholder="Rua"
                      id="street"
                      name="street"
                      label="street"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />

                 <div className='flex gap-5'>
                  <div className='xl:w-1/2 w-1/2 '>
                  <InputForm
                      title="Bairro"
                      placeholder="Bairro"
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
                      id="Date of birth"
                      name="Date of birth"
                      label="Date of birth"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />
                  <InputForm
                      title="CPF"
                      placeholder="000.000.000-00"
                      id="CPFadmin"
                      name="CPFadmin"
                      label="CPFadmin"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />
                  <InputForm
                      title="RG"
                      placeholder="00.000.000-0"
                      id="RGadmin"
                      name="RGadmin"
                      label="RGadmin"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                  />

                </div>
                <InputForm
                      title="Data de expedição RG"
                      placeholder="data de expedição"
                      id="shippingDate"
                      name="shippingDate"
                      label="shippingDate"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                 <InputForm
                      title="Estado de expedição RG"
                      placeholder="estado de expedição"
                      id="shippingState"
                      name="shippingState"
                      label="shippingState"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                <InputForm
                      title="Estado de nascimento"
                      placeholder="Estado"
                      id="stateOfBirth"
                      name="stateOfBirth"
                      label="stateOfBirth"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                <InputForm
                      title="Cidade de nascimento"
                      placeholder="  Cidade"
                      id="cityOfBirth"
                      name="cityOfBirth"
                      label="cityOfBirth"
                      customStyleButton='rounded-lg border-2 p-[6px]'
                />
                 <InputFile
                      title='Anexar arquivos'
                      placeholder="ImagemDocumentoAnexado.png 90kb"
                      id="AttachDocuments"
                      name="AttachDocuments"
                      label="AttachDocuments"
                />
                <div className='flex justify-center gap-5'>
                <Button variant='ghostBlack' size='large' className='w-64'>Cancelar</Button>
                <Button variant='blueButton' size='large' className='w-64'>Atualizar</Button>
                </div>
               
                </div>
        </Form>
      </Formik>
    </>
  )
}