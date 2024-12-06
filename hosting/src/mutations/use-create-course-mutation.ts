import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createCourse'],
    mutationFn: async (values: any) => {
      await api.post('course', {
        nome: values.name,
        cargaHoraria: values.workload,
        dataInicio: values.startDate,
        dataFim: values.endDate,
        dataInicioInscricoes: values.startOfRegistration,
        dataFimInscricoes: values.endOfRegistration,
        numeroVagas: values.numberOfVacancies,
        ementa: values.ementa,
      })

      await queryClient.invalidateQueries({ queryKey: ['cursos'] })
    },
  })}