const schoolCalls = [
    {
        id_chamada: 1,
        id_materia: 1,
        id_turma: 1,
        data: '2024-11-20',
        id_aluno: 1,
        status: true,
      },
      {
        id_chamada: 2,
        id_materia: 1,
        id_turma: 1,
        data: '2024-11-20',
        id_aluno: 2,
        status: false,
      },
      {
        id_chamada: 1,
        id_materia: 2,
        id_turma: 1,
        data: '2024-11-20',
        id_aluno: 1,
        status: true,
      },
      {
        id_chamada: 2,
        id_materia: 2,
        id_turma: 1,
        data: '2024-11-20',
        id_aluno: 2,
        status: false,
      },
      {
        id_chamada: 3,
        id_materia: 2,
        id_turma: 1,
        data: '2024-11-20',
        id_aluno: 3,
        status: false,
      }
  ]
  
  //somatória das fatas de cada aluno no ano

  const student = {
    id: 1,
  }
  
  const absences = schoolCalls.reduce((currentAbsences, { id_aluno, status }) => student.id === id_aluno && status === false ? currentAbsences+1 : currentAbsences, 0)

  //percentual de presença de cada aluno na semana
  
  interface week {
    start: string;
    end: string;
  }

  const week: week = {
      start: '2024-11-20',
      end: '2024-11-23',
  };

  function calculatePercentAttendanceWeek(studentId: number, week: week) {
    const filteredCalls= schoolCalls.filter(({ id_aluno, data }) => {
        const classDate = new Date(data);
        const startWeek = new Date(week.start);
        const endWeek = new Date(week.end);

        return (
            id_aluno === studentId &&
            classDate >= startWeek &&
            classDate <= endWeek
        );
    });

    const totalPresences = filteredCalls.filter(({ status }) => status === true).length;

    const totalClassesWeek = 8;

    const percentagePresence = (totalPresences / totalClassesWeek) * 100;

    return percentagePresence;
}