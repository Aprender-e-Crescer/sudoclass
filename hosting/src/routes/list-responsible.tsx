import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export const Route = createFileRoute('/list-responsible')({
  component: ListResponsible,
})

function ListResponsible() {
  const { data, isLoading } = useQuery({
    queryKey: ['getResposible'],
    queryFn: () => {
      const responsiblesRef = collection(firestore, 'resposibles')

      return getDocs(responsiblesRef).then(({ docs }) => docs.map((doc) => doc.data()))
    },
  })

  if (isLoading) return <h1>Carregando...</h1>

  return (
    <div>
      {data?.map(({ cpf, dateOfBirth, email, name, rg, telephone, address }) => (
        <div>
          <p>
            Nome: {name}
            <br />
            CPF: {cpf}
            <br />
            Data de Nascimento: {dateOfBirth}
            <br />
            E-mail: {email}
            <br />
            RG: {rg}
            <br />
            Telefone: {telephone}
            <br />
            address.city: {address.city}
            <br />
            address.neighborhood: {address.neighborhood}
            <br />
            address.state: {address.state}
            <br />
            address.street: {address.street}
            <br />
            address.streetNumber: {address.streetNumber}
          </p>
        </div>
      ))}
    </div>
  )
}
