import { useGetFullUser } from "@/hooks/use-get-full-user"
import { useToast } from "@/hooks/use-toast"
import { useCreateStudentMutation } from "@/mutations/use-create-student-mutation"
import { useUpdateStudentMutation } from "@/mutations/use-update-student-mutation"
import { getClassesQueriesOptions } from '@/queries/use-get-classes-query'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getStudentQueryOptions } from "@/queries/use-get-student-query"
import { getUserDocumentsQueryOptions } from "@/queries/use-get-user-documents-query"
import { getUserDocumentsReferencesQueryOptions } from "@/queries/use-get-user-documents-references-query"
import { getUserQueryOptions } from "@/queries/use-get-user-query"
import { QueryFilters, useQueries, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useStudentManagingController(id: string | undefined) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { role } = useGetFullUser()

    const { data: user } = useSuspenseQuery(getUserQueryOptions(id))

    const coursesQueryOptions = getCoursesQueryOptions(role, undefined, undefined)
  
    const { data: courses } = useSuspenseQuery(coursesQueryOptions)
  
    const classesQueriesOptions = getClassesQueriesOptions(courses, role, undefined, undefined)

    const { data: student } = useQuery(getStudentQueryOptions(user?.role, user?.roleRef))
    
    const allClasses = useQueries({
        queries: classesQueriesOptions.map(({ classesQueryOptions }) => classesQueryOptions),
        combine: (queries) => queries.flatMap(({ data }) => {
            if (data === undefined || data.length === 0) return []
            
            const dataWithCourseName = courses.find(({ id }) => data[0]?.idCourse === id)
            
            if (!dataWithCourseName) throw new Error('Course not found')

            return data.map((currentClass) => ({
                ...currentClass,
                courseName: dataWithCourseName.name,
            }))
        }).filter((data) => data !== undefined)
    })

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

    const { mutateAsync: createStudent } = useCreateStudentMutation({
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Erro ao criar aluno",
                description: error.message,
            })
        },
        onSuccess: () => {
            navigate({
                to: "/users"
            })
        }
    })

    const { mutateAsync: updateStudent } = useUpdateStudentMutation({
        onError: (error) => {
            queryClient.invalidateQueries({
                queryKey: documentsReferencesQueryOptions.queryKey,
            })
            
            toast({
                variant: "destructive",
                title: "Erro ao atualizar aluno",
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
        updateStudent,
        createStudent,
        user,
        student,
        documents,
        documentsQueryFilters,
        allClasses,
    }
}