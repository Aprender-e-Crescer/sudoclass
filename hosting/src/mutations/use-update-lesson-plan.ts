    import { LESSON_PLAN_QUERY_KEY } from '@/constants/queries';
    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import { api } from '@/services/api';
    import { updateLessonPlanSchema } from '@/models/update-lesson-plan-schema';

    // Atualizando a interface para incluir id_professor, id_turma e id_materia
    export interface LessonPlanUpdate {
    id_planoaula: string; // ID do plano de aula
    id_professor: string; // ID do professor
    id_turma: string; // ID da turma
    id_materia: string; // ID da matéria
    data_aula: string;
    inicio_aula: string;
    fim_aula: string;
    conteudoformativo: string;
    mododeensino: string;
    recursosdidaticos: string;
    }

    interface MutationResults {
    onSuccess: () => void;
    onError: (error: Error) => void;
    }

    export function useUpdateLessonPlanMutation({ onSuccess, onError }: MutationResults) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['update-lesson-plan'],
        mutationFn: async (values: LessonPlanUpdate) => {
        try {
            console.log('Valores recebidos para a mutação:', values);

            // Validando os dados com Zod
            const parsedValues = updateLessonPlanSchema.parse(values);
            console.log('Valores após validação pelo Zod:', parsedValues);

            // Preparando o payload para a API
            const requestBody = {
            data_aula: parsedValues.data_aula,
            inicio_aula: parsedValues.inicio_aula,
            fim_aula: parsedValues.fim_aula,
            conteudoformativo: parsedValues.conteudoformativo,
            mododeensino: parsedValues.mododeensino,
            recursosdidaticos: parsedValues.recursosdidaticos,
            };

            console.log('Payload enviado à API:', requestBody);

            // Fazendo a requisição PUT para atualizar o plano de aula
            const response = await api.put(`/lessonPlan/${parsedValues.id_planoaula}`, requestBody);
            console.log('Resposta da API:', response);

            // Invalidando o cache para garantir que os dados atualizados sejam refletidos
            queryClient.invalidateQueries({ queryKey: LESSON_PLAN_QUERY_KEY });

            // Chamando a função onSuccess se fornecida
            if (onSuccess) {
            onSuccess();
            }
        } catch (error) {
            console.error('Erro ao atualizar o plano de aula:', error);

            // Chamando a função onError se fornecida
            if (onError) {
            onError(error);
            }

            throw error; // Re-throwing the error so that the mutation can handle it
        }
        },
    });
    }
