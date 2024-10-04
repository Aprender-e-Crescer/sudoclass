import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'
import { z } from 'zod'

const matrixSchema = z.object({
  name: z.string(),
  numberOfClasses: z.number(),
  workload: z.number(),
})

const matricesSchema = z.array(matrixSchema)

export const Route = createFileRoute('/school-matrices')({
  component: SchoolMatrices,
})

function SchoolMatrices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getMatrices'],
    queryFn: async () => {
      const matricesRef = collection(firestore, 'schoolMatrices')
      const snapshot = await getDocs(matricesRef)
      const matricesData = snapshot.docs.map((doc) => doc.data())

      const parsedData = matricesSchema.safeParse(matricesData)

      if (!parsedData.success) {
        throw new Error('Invalid data structure')
      }

      return parsedData.data
    },
  })

  if (isLoading) return <h1>Carregando...</h1>
  if (error) return <h1>Erro ao carregar os dados.</h1>

  return (
    <div>
      {data?.map(({ name, numberOfClasses, workload }) => (
        <div key={name}>
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
