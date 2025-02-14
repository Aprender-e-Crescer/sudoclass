import { useToast } from "@/hooks/use-toast"
import { useCreateTeacherMutation } from "@/mutations/use-create-teacher-mutation"
import { useUpdateTeacherMutation } from "@/mutations/use-update-teacher-mutation"
import { getClassesQueriesOptions } from '@/queries/use-get-classes-query'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getSubjectsQueryOptions } from '@/queries/use-get-subjects-query'
import { getUserDocumentsQueryOptions } from "@/queries/use-get-user-documents-query"
import { getUserDocumentsReferencesQueryOptions } from "@/queries/use-get-user-documents-references-query"
import { getUserQueryOptions } from "@/queries/use-get-user-query"
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { QueryFilters, useQueries, useQuery, useQueryClient, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useTeacherManagingController(id: string | undefined) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: user } = useSuspenseQuery(getUserQueryOptions(id))
  
    const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(user.role, user.roleRef)
    
    const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

    const coursesQueryOptions = getCoursesQueryOptions(user.role, undefined, teacher?.subjects)
  
    const { data: courses } = useSuspenseQuery(coursesQueryOptions)
  
    const classesQueriesOptions = getClassesQueriesOptions(courses, user.role, undefined, teacher?.subjects)
    
    const allClasses = useSuspenseQueries({
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

    const subjectsQueriesOptions = allClasses.map(({ id, idCourse }) => getSubjectsQueryOptions(idCourse, id))

    const subjectsWithClassesAndCourses = useSuspenseQueries({
        queries: subjectsQueriesOptions,
        combine: (queries) => queries.flatMap(({ data }) => {
            if (data === undefined || data.length === 0) return []
            
            const dataWithClassName = allClasses.find(({ id }) => data[0]?.idClass === id)
            
            if (!dataWithClassName) throw new Error('Course not found')

            return data.map((currentClass) => ({
                ...currentClass,
                className: dataWithClassName.name,
                courseName: dataWithClassName.courseName
            }))
        }).filter(value => value !== undefined)
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

    const { mutateAsync: createTeacher } = useCreateTeacherMutation({
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Erro ao criar admin",
                description: error.message,
            })
        },
        onSuccess: () => {
                navigate({
                to: "/users"
            })
        }
    })

    const { mutateAsync: updateTeacher } = useUpdateTeacherMutation({
        onError: (error) => {
            queryClient.invalidateQueries({
                queryKey: documentsReferencesQueryOptions,
            })
            
            toast({
                variant: "destructive",
                title: "Erro ao atualizar admin",
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
        updateTeacher,
        createTeacher,
        user,
        teacher,
        documents,
        documentsQueryFilters,
        subjectsWithClassesAndCourses,
    }
}