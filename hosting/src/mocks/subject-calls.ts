const subjetcCalls = [
    {
      id_chamada: 1,
      id_materia: 1,
      id_turma: 1,
      data: '2024-11-20',
      id_aluno: 1,
      status: true,
    },
    {
      id_chamada: 1,
      id_materia: 1,
      id_turma: 1,
      data: '2024-11-20',
      id_aluno: 2,
      status: true,
    },
    {
      id_chamada: 1,
      id_materia: 1,
      id_turma: 1,
      data: '2024-11-20',
      id_aluno: 3,
      status: true,
    },
    {
      id_chamada: 1,
      id_materia: 1,
      id_turma: 1,
      data: '2024-11-20',
      id_aluno: 4,
      status: true,
    },
    {
      id_chamada: 1,
      id_materia: 1,
      id_turma: 1,
      data: '2024-11-20',
      id_aluno: 5,
      status: true,
    },
  ]

  //somatória das faltas de cada aluno por matéria

  const subjectStudent = {
    id: 1,
  }
  
  const subjectAbsences = schoolCalls.reduce((currentAbsences, { id_aluno, status }) => subjectStudent.id === id_aluno && status === false ? currentAbsences++ : currentAbsences, 0)

  //percentual de presença de cada aluno por matéria 

  interface weekSubject {
    start: string;
    end: string;
  }

  const weekSubject: weekSubject = {
      start: '2024-11-20',
      end: '2024-11-23',
  };

  function calculatePercentAttendanceWeekSubject(studentId: number, materiaId: number, weekSubject: weekSubject) {
    const filteredCalls= schoolCalls.filter(({ id_aluno, id_materia, data }) => {
        const classDate = new Date(data);
        const startweekSubject = new Date(weekSubject.start);
        const endweekSubject = new Date(weekSubject.end);

        return (
            id_aluno === studentId &&
            id_materia === materiaId &&
            classDate >= startweekSubject &&
            classDate <= endweekSubject
        );
    });

    const totalPresences = filteredCalls.filter(({ status }) => status === true).length;

    const totalClassesweekSubject = 4;

    const percentagePresence = (totalPresences / totalClassesweekSubject) * 100;

    return percentagePresence;
}