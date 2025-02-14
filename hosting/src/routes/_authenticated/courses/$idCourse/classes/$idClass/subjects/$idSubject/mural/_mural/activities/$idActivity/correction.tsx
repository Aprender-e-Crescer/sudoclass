import { useState } from 'react'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { getSubmitsFirestoreQuery, getSubmitsQueryOptions } from '@/queries/use-get-submits-query'
import { useQueries, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { DocumentReference, DocumentData } from 'firebase/firestore'
import { getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { getFilesOfSubmit } from '@/queries/use-get-files-submit'
import { File, FileText, FolderArchive } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/correction',
)({
  component: Correction,
})

const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
    return 'image'
  } else if (extension === 'pdf') {
    return 'pdf'
  } else if (extension === 'zip') {
    return 'zip'
  }
  return 'other'
}

function Correction() {
  const { idClass, idCourse, idSubject, idActivity } = Route.useParams()
  const [selectedSubmit, setSelectedSubmit] = useState(null)
  const [note, setNote] = useState('')
  const [submitFiles, setSubmitFiles] = useState<{ [submitId: string]: { name: string; url: string }[] }>({})

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

  // Função para carregar os arquivos de um submit
  const loadSubmitFiles = async (submitId: string) => {
    const files = await getFilesOfSubmit({ idCourse, idClass, idSubject, idActivity, idSubmit: submitId })
    setSubmitFiles((prev) => ({ ...prev, [submitId]: files }))
  }

  // Função para lidar com a seleção de um submit
  const handleSelectSubmit = (submit) => {
    setSelectedSubmit(submit)
    setNote(submit.note || '')
    loadSubmitFiles(submit.id) // Carrega os arquivos do submit selecionado
  }

  // Função para salvar a nota no Firestore
  const handleSaveNote = async () => {}

  if (submitsLoading) {
    return <div>Carregando...</div>
  }

  if (!submits || submits.length === 0) {
    return <div>Nenhum envio encontrado.</div>
  }

  return (
    <div className="flex h-screen">
      {/* Lista de Submits à Esquerda */}
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

      {/* Painel à Direita */}
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

            {/* Exibição dos arquivos do submit */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Arquivos do Estudante:</h3>
              {submitFiles[selectedSubmit.id]?.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {submitFiles[selectedSubmit.id].map((file, index) => {
                    const fileType = getFileType(file.name)

                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-40 h-40"
                      >
                        {fileType === 'image' ? (
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <img src={file.url} alt={`Anexo ${index + 1}`} className="w-full h-full object-cover" />
                          </a>
                        ) : fileType === 'pdf' ? (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center bg-gray-100"
                          >
                            <FileText className="h-12 w-12 text-gray-500" />
                          </a>
                        ) : fileType === 'zip' ? (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center bg-gray-100"
                          >
                            <FolderArchive className="h-12 w-12 text-gray-500" />
                          </a>
                        ) : (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center bg-gray-100"
                          >
                            <File className="h-12 w-12 text-gray-500" />
                          </a>
                        )}

                        <div className="p-2 bg-gray-50 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            Anexo {index + 1} ({fileType})
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Nenhum arquivo enviado.</p>
              )}
            </div>

            {/* Campo para atribuir nota */}
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
