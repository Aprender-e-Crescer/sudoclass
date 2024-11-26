import { listFormsSchema } from '@/models/list-forms-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { collection, getDoc, doc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { z } from 'zod'

export const LIST_FORMS_QUERY_KEY = ['getForms']

export function ListFormsQuery() {
  return useQuery({
    queryKey: LIST_FORMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get(`/formularios`)
      const forms = z.array(listFormsSchema).parse(data)
      console.log(forms)
      return forms
    },
  })
}
