async function createClass(
  name: string,
  shift: string,
  startDate: Date,
  endDate: Date,
  workload: number,
  teacher: string
): Promise<string> {
  try {
    let response = ''
    if (!name || !shift || !startDate || !endDate || !workload || !teacher) {
      response = 'All fields are required to add a class.'
      return response
    }
    response = `The class ${name} has been added with teacher ${teacher}, shift ${shift}, starting on ${startDate} and ending on ${endDate}, with a workload of ${workload} hours.`
    console.log(response)
    return response
  } catch (error) {
    console.error('Error adding class:', error)
    return 'Error adding class'
  }
}

async function updateClass(
  name: string,
  shift: string,
  startDate: Date,
  endDate: Date,
  workload: number,
  teacher: string
): Promise<string> {
  try {
    let response = ''
    if (!name || !shift || !startDate || !endDate || !workload || !teacher) {
      response = 'All fields are required to update a class.'
      return response
    }
    response = `The class ${name} has been updated with teacher ${teacher}, shift ${shift}, starting on ${startDate} and ending on ${endDate}, with a workload of ${workload} hours.`
    console.log(response)
    return response
  } catch (error) {
    console.error('Error updating class:', error)
    return 'Error updating class'
  }
}

async function deleteClass(name: string, startDate: Date): Promise<string> {
  try {
    let response = ''
    if (!name || !startDate) {
      response = 'Name and start date are required to delete a class.'
      return response
    }
    response = `The class ${name}, starting on ${startDate}, has been successfully deleted.`
    console.log(response)
    return response
  } catch (error) {
    console.error('Error deleting class:', error)
    return 'Error deleting class'
  }
}

async function addStudentToClass(
  className: string,
  startDate: Date,
  studentId: string,
  studentName: string
): Promise<string> {
  try {
    let response = ''
    if (!className || !startDate || !studentId || !studentName) {
      response = 'All fields are required to add a student to the class.'
      return response
    }

    response = `The student ${studentName} has been added to the class ${className} starting on ${startDate}.`
    console.log(response)
    return response
  } catch (error) {
    console.error('Error adding student to class:', error)
    return 'Error adding student to class'
  }
}

export const classesService = {
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
}
