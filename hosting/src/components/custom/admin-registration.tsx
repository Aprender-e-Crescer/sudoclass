import { Button } from "@/components/ui/button"
import React from "react"
import { Toast, ToastTitle, ToastClose, ToastViewport } from "@/components/ui/toast"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { Link } from "@tanstack/react-router"
import { Formik, Form } from "formik"
import { Input } from "@/components/ui/input"
import { adminRegistration } from "@/mutations/admin-registration-mutation"
import { firestore } from "@/services/firebase"
import { z } from "zod"

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter exatamente 11 dígitos")
})

export function AdminRegistration() {
  const [toastOpen, setToastOpen] = React.useState(false)

  const handleShowToast = () => {
    setToastOpen(true)
    setTimeout(() => {
      setToastOpen(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Formik
        initialValues={{ nome: "", cpf: "" }}
        validationSchema={schema}
        onSubmit={async (values) => {
          try {
            await adminRegistration(firestore, values)
            handleShowToast()
          } catch (error) {
            console.error("Erro ao cadastrar admin:", error)
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} className="w-full">
            <div className="border rounded-lg p-5 space-y-4">
              <div>
                <label htmlFor="nome">Nome</label>
                <Input
                  type="text"
                  name="nome"
                  id="nome"
                  value={values.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  className="mt-1"
                />
                {errors.nome && <span className="text-red-500">{errors.nome}</span>}
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <Input
                  type="text"
                  name="cpf"
                  id="cpf"
                  value={values.cpf}
                  onChange={handleChange}
                  placeholder="Digite o CPF"
                  className="mt-1"
                />
                {errors.cpf && <span className="text-red-500">{errors.cpf}</span>}
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-5">
              <Link to="/">
                <Button variant="lightTextBlack" size="large">Cancelar</Button>
              </Link>
              <Button type="submit" size="large">Cadastrar</Button>
            </div>
          </Form>
        )}
      </Formik>
      <Toast open={toastOpen} onOpenChange={setToastOpen} variant="success" icon={<IoCheckmarkDoneSharp />}>
        <ToastTitle>Admin cadastrado com sucesso</ToastTitle>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </div>
  )
}
