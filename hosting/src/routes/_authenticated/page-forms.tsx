import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { Form, Formik } from 'formik'
import { FormCreated } from '@/components/custom/form-created'

export const Route = createFileRoute('/page-forms')({
  component: pageForms,
})
const initialValues = {
  search: '',
}

export function pageForms() {
  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex w-8/12 justify-between items-center">
            <p className="text-[36px] text-[#16145A] font-bold">Formulários Disponíveis</p>
            <Button variant={'blueButton'}>Novo</Button>
          </div>
          <div className="w-4/6">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log('Valores do formulário:', values)
              }}
            >
              <Form>
                <InputWithoutLabel
                  id="search"
                  name="search"
                  placeholder="Procurar Formularios"
                  icon={<Search color="#999999" />}
                />
              </Form>
            </Formik>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-7 w-[500px]">
            <div className="flex justify-between pl-4">
              <p className="font-bold text-[14px]">Nome</p>
              <p className=" pl-5 font-bold text-[14px]">Criado Por</p>
              <p className="font-bold text-[14px]">Criado Em</p>
            </div>
          </div>
          <div>
            <FormCreated createdIn="28/07/2024" nameCreator="Samara Pietrobon" nameForm="Aprender e Crescer" />
          </div>
          <div>
            <FormCreated createdIn="28/07/2024" nameCreator="Samara Pietrobon" nameForm="Aprender e Crescer" />
          </div>
          <div>
            <FormCreated createdIn="28/07/2024" nameCreator="Samara Pietrobon" nameForm="Aprender e Crescer" />
          </div>
        </div>
      </div>
    </>
  )
}
