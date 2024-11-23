import { listTeacherSchema } from '@/models/teachers-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod';

export function useTeachersListingQuery() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data } = await api.get('/teachers');
      const teachers = z.array(listTeacherSchema).parse(data);

      return teachers;
    },
  })
}
