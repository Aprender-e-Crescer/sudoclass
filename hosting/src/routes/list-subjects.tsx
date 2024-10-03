import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'
import { z } from 'zod'

export const Route = createFileRoute('/list-subjects')({
  component: ListSubjects,
})

const subjectsSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type Subject = z.infer<typeof subjectsSchema>

function ListSubjects() {
  const { data } = useQuery({
    queryKey: ['getSubjects'],
    queryFn: () => {
      const subjectRefs = collection(firestore, 'schoolMatrices', 'aQjvxCKlEuHc9YQEedCQ', 'subjects').withConverter({
        toFirestore: (subject: Subject) => subject,
        fromFirestore: (snapshot) => subjectsSchema.parse(snapshot.data()),
      })

      return getDocs(subjectRefs).then(({ docs }) => docs.map((doc) => doc.data()))
    },
  })
  console.log(data)
  return (
    <div>
      <h1>Subjects List</h1>
      <ul>
        {data?.map((subject, index) => (
          <li key={index}>
            {subject.name} - {subject.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
