import { useState } from 'react'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { getSubmitsFirestoreQuery, getSubmitsQueryOptions } from '@/queries/use-get-submits-query'
import { useQueries, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { doc, updateDoc, DocumentReference, DocumentData } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { getProfileQueryOptions } from '@/queries/use-get-profile-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/correction',
)({
  component: Correction,
})

function Correction() {
  const { idClass, idCourse, idSubject, idActivity } = Route.useParams()
  const [selectedSubmit, setSelectedSubmit] = useState(null) 
  const [note, setNote] = useState('') 

  const submitsQueryOptions = getSubmitsQueryOptions({ idCourse, idClass, idSubject, idActivity })
  const { data: submits, isLoading: submitsLoading } = useQuery(submitsQueryOptions)

  useFirestoreRealtimeQuery(
    submitsQueryOptions.queryKey,
    getSubmitsFirestoreQuery({ idCourse, idClass, idSubject, idActivity }),
  )

  const studentsSubmits = useQueries({
    queries: submits?.map((submit) => getProfileQueryOptions(submit.studentProfile)) ?? [],
    combine: (results) =>
      results.map((result) => result.data)?.filter((student) => student !== undefined) as {
        id: string
        profileRef: DocumentReference<DocumentData, DocumentData>
        displayName: string
        photoURL: string | null
      }[],
  })

  const handleSelectSubmit = (submit) => {
    setSelectedSubmit(submit)
    setNote(submit.note || '') 
  }

  const handleSaveNote = async () => {
    if (!selectedSubmit) return

    try {
      const submitRef = doc(
        firestore,
        'courses',
        idCourse,
        'classes',
        idClass,
        'subjects',
        idSubject,
        'activities',
        idActivity,
        'submits',
        selectedSubmit.id,
      )

      await updateDoc(submitRef, { note: parseFloat(note) })
      alert('Nota salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar a nota:', error)
      alert('Erro ao salvar a nota.')
    }
  }

  if (submitsLoading) {
    return <div>Carregando...</div>
  }

  if (!submits || submits.length === 0) {
    return <div>Nenhum envio encontrado.</div>
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Submissões</h2>
        <ul>
          {submits.map((submit) => {
            const student = studentsSubmits.find((student) => student.profileRef.id === submit.studentProfile.id)

            return (
              <li
                key={submit.id}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${
                  selectedSubmit?.id === submit.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleSelectSubmit(submit)}
              >
                <div className="flex items-center gap-2">
                  {student?.photoURL ? (
                    <img
                      src={student.photoURL}
                      alt={`Foto de ${student.displayName}`}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm text-gray-600">?</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600">{student ? student.displayName : 'N/A'}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex-1 p-4">
        {selectedSubmit ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Atribuir Nota</h2>
            <p className="mb-2">
              <strong>Envio:</strong> #{selectedSubmit.id}
            </p>
            <p className="mb-4">
              <strong>Estudante:</strong>{' '}
              {studentsSubmits.find((student) => student.profileRef.id === selectedSubmit.studentProfile.id)
                ?.displayName || 'N/A'}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nota:</label>
              <input
                type="number"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <button onClick={handleSaveNote} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Salvar Nota
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">Selecione um envio para atribuir uma nota.</div>
        )}
      </div>
    </div>
  )
}
