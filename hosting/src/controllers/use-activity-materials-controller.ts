import { useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useDeleteActivityMutation } from '@/mutations/use-delete-activity-mutation';
import { getProfileQueryOptions } from '@/queries/use-get-profile-query';
import { getClassQueryOptions } from '@/queries/use-class-query';
import { getSubmitsFirestoreQuery, getSubmitsQueryOptions } from '@/queries/use-get-submits-query';
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query';

export function useActivitiesMaterialsController({
  id,
  idCourse,
  idClass,
  idSubject,
}: {
  id: string;
  idCourse: string;
  idClass: string;
  idSubject: string;
}) {
  const submitsQueryOptions = getSubmitsQueryOptions({ idCourse, idClass, idSubject, idActivity: id });
  const { data: submits } = useQuery(submitsQueryOptions);

  useFirestoreRealtimeQuery(
    submitsQueryOptions.queryKey,
    getSubmitsFirestoreQuery({ idCourse, idClass, idSubject, idActivity: id }),
  );

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: deleteActivity } = useDeleteActivityMutation();

  const { data: classData } = useQuery(getClassQueryOptions(idCourse, idClass));

  const students = useQueries({
    queries: classData?.studentsProfile.map((studentProfile) => getProfileQueryOptions(studentProfile)) ?? [],
    combine: (results) => results.map((result) => result.data)?.filter((student) => student !== undefined),
  });

  const submittedStudents = submits?.length || 0;
  const pendingStudents = students.length - submittedStudents;

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    deleteActivity({ idCourse, idClass, idSubject, idActivity: id });
    setConfirmDelete(false);
  }

  return {
    confirmDelete,
    handleDelete,
    submittedStudents,
    pendingStudents,
  };
}