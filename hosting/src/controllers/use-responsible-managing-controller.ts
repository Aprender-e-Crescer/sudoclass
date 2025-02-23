import { useGetFullUser } from "@/hooks/use-get-full-user"
import { useToast } from "@/hooks/use-toast"
import { useCreateResponsibleMutation } from "@/mutations/use-create-responsible-mutation"
import { useUpdateResponsibleMutation } from "@/mutations/use-update-responsible-mutation"
import { getResponsibleQueryOptions } from "@/queries/use-get-responsible-data-query"
import { getUserDocumentsQueryOptions } from "@/queries/use-get-user-documents-query"
import { getUserDocumentsReferencesQueryOptions } from "@/queries/use-get-user-documents-references-query"
import { getUserQueryOptions } from "@/queries/use-get-user-query"
import { getUsersQueryOptions } from "@/queries/use-get-users-query"
import { QueryFilters, useQueries, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useResponsibleManagingController(id: string | undefined) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { uid } = useGetFullUser()

    const { data: user } = useQuery(getUserQueryOptions(id))

    const { data: users } = useSuspenseQuery(getUsersQueryOptions(uid))

    const { data: responsible } = useQuery(getResponsibleQueryOptions(user?.roleRef.id))

    const students = users?.filter(({ role }) => role === "student")

    const documentsReferencesQueryOptions = getUserDocumentsReferencesQueryOptions(id)

    const { data: documentsReferences, isFetching } = useQuery(documentsReferencesQueryOptions)

    const documents = useQueries({
        queries: documentsReferences?.map((documentReference) => ({
            ...getUserDocumentsQueryOptions(documentReference),
            enabled: !isFetching,
        })) ?? [],
        combine: (data) => data.map(({ data }) => data).filter(data => data !== undefined)
    })

    const documentsQueryFilters: QueryFilters = {
        predicate: ({ queryKey }) => documentsReferencesQueryOptions.queryKey[0] === queryKey[0] && documentsReferencesQueryOptions.queryKey[1] === queryKey[1]     
    }

    const { toast } = useToast()

    const { mutateAsync: createResponsible } = useCreateResponsibleMutation({
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Erro ao criar responsável",
                description: error.message,
            })
        },
        onSuccess: () => {
            navigate({
                to: "/users"
            })
        }
    })

    const { mutateAsync: updateResponsible } = useUpdateResponsibleMutation({
        onError: (error) => {
            queryClient.invalidateQueries({
                queryKey: documentsReferencesQueryOptions,
            })
            
            toast({
                variant: "destructive",
                title: "Erro ao atualizar responsável",
                description: error.message,
            })
        },
        onSuccess: () => {
            navigate({
                to: "/users"
            })
        }
    })

    return {
        updateResponsible,
        createResponsible,
        user,
        responsible,
        documents,
        documentsQueryFilters,
        students,
    }
}