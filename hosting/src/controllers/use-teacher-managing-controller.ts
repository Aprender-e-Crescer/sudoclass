import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useToast } from "@/hooks/use-toast"
import { useCreateTeacherMutation } from "@/mutations/use-create-teacher-mutation"
import { useUpdateTeacherMutation } from "@/mutations/use-update-teacher-mutation"
import { getClassesQueriesOptions } from '@/queries/use-get-classes-query'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getSubjectsQueryOptions } from '@/queries/use-get-subjects-query'
import { getUserDocumentsQueryOptions } from "@/queries/use-get-user-documents-query"
import { getUserDocumentsReferencesQueryOptions } from "@/queries/use-get-user-documents-references-query"
import { getUserQueryOptions } from "@/queries/use-get-user-query"
import { getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { QueryFilters, useQueries, useQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useTeacherManagingController(id: string | undefined) {
    const navigate = useNavigate()

    const fullUser = useGetFullUser()
  
    const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
    const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)
    
    const { data: student } = useQuery(studentPersonalClassesQueryOptions)
    const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)
  
    const coursesQueryOptions = getCoursesQueryOptions(fullUser.role, student?.classes, teacher?.subjects)
  
    const { data: courses } = useSuspenseQuery(coursesQueryOptions)
  
    const classesQueriesOptions = getClassesQueriesOptions(courses, fullUser.role, student?.classes, teacher?.subjects)
    
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

    const { data: user } = useQuery(getUserQueryOptions(id))

    const documentsReferencesQueryOptions = getUserDocumentsReferencesQueryOptions(id)

    const { data: documentsReferences } = useQuery(documentsReferencesQueryOptions)

    const documents = useQueries({
        queries: documentsReferences?.map(getUserDocumentsQueryOptions) ?? [],
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
        documents,
        documentsQueryFilters,
        subjectsWithClassesAndCourses,
    }
}