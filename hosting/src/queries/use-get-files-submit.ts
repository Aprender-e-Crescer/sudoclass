import { storage } from '@/services/firebase' // Importe o storage do Firebase
import { ref, listAll, getDownloadURL } from 'firebase/storage'

interface dataSubmit {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
  idSubmit: string
}

export async function getFilesOfSubmit(data: dataSubmit) {
  const { idCourse, idClass, idSubject, idActivity, idSubmit } = data

  const storageRef = ref(
    storage,
    `courses/${idCourse}/classes/${idClass}/subjects/${idSubject}/activities/${idActivity}/submits/${idSubmit}/`,
  )

  try {
    const result = await listAll(storageRef)

    const files = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item)
        return {
          name: item.name,
          url,
        }
      }),
    )

    return files
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error)
    throw new Error('Erro ao buscar arquivos no Storage.')
  }
}
