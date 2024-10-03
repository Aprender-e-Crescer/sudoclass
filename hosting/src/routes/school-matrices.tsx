import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'

export const Route = createFileRoute('/school-matrices')({
  component: SchoolMatrices,
})

function SchoolMatrices() {
  const { data, isLoading } = useQuery({
    queryKey: ['getMatrices'],
    queryFn: () => {
      const matricesRef = collection(firestore, 'schoolMatrices')
      console.log(matricesRef)

      return getDocs(matricesRef).then(({ docs }) => docs.map((doc) => doc.data()))
    },
  })

  if (isLoading) return <h1>Carregando...</h1>

  return (
    <div>
      {data?.map(({ name, numberOfClasses, workload }) => (
        <div>
          <p>
            <strong>Nome:</strong> {name}
          </p>
          <p>
            <strong>Número de Aulas:</strong> {numberOfClasses}
          </p>
          <p>
            <strong>Carga Horária:</strong> {workload} horas
          </p>
        </div>
      ))}
    </div>
  )
}
