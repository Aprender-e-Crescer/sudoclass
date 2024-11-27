import { api } from '@/services/api'; // Supondo que você tenha o axios configurado no api.ts
import { useQuery } from '@tanstack/react-query';
import { cursoSchema } from '@/models/course-schema'; 

export function useCursosListingQuery() {
  return useQuery({
    queryKey: ['cursos'], 
    queryFn: async () => {
      const { data } = await api.get('/curso'); 
      const cursos = cursoSchema.parse(data); 
      return cursos; }}}
