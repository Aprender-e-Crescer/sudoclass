import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

import { firestore } from '@/services/firebase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/activities')({
  component: Activities,
})

function Activities() {
  const { data, isLoading } = useQuery({
    queryKey: ['getActivities'],
    queryFn: () => {
      const usersRef = collection(firestore, 'activities')

      return getDocs(usersRef).then(({ docs }) => docs.map((doc) => doc.data()))
    },
  })

  console.log(data)

  if (isLoading) return <h1>Carregando...</h1>

  return (
    <div>
      {data?.map(({ name, age }) => (
        <div>
          <p>
            O usuário {name} tem {age} anos
          </p>
        </div>
      ))}
    </div>
  )
}
