import { firestore } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function useGetAttendanceStatus() {
  console.log("Executando getAttendanceStatus...");
  try {
    const attendancesCollectionRef = collection(firestore, '/schoolMatrices/aQjvxCKlEuHc9YQEedCQ/subjects/zGTOAwnKJBjFSmayHxJo/attendances');
    const querySnapshot = await getDocs(attendancesCollectionRef);

    const allStudentsAttendance = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      const createdAtTimestamp = data.createdAt;

      const createdAt = createdAtTimestamp ? createdAtTimestamp.toDate() : null;

      return {
        createdAt: createdAt ? createdAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : 'Data não disponível',
        students: data.students.map((studentEntry: { student: any; present: any; }) => ({
          student: studentEntry.student,
          present: studentEntry.present,
        }))
      };
    });

    console.log("Dados de presença dos estudantes:", allStudentsAttendance);
    return allStudentsAttendance;
  } catch (error) {
    console.error("Erro ao buscar dados de presença:", error);
    return [];
  }
}
