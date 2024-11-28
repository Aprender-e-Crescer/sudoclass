import { Request, Response } from 'express'

import { classesService } from '../services/classes.service'

const classesController = {
  createClass: async (req: Request, res: Response): Promise<void> => {
    const { name, shift, startDate, endDate, workload, teacher } = req.body
    try {
      const result = await classesService.createClass(
        name,
        shift,
        startDate,
        endDate,
        workload,
        teacher
      )
      if (!result) {
        res.status(500).send('Unable to register the class.')
      } else {
        res.status(200).send('Class registration completed successfully.')
      }
    } catch (error) {
      console.error('Error registering class:', error)
      res
        .status(500)
        .send(
          'An error occurred on the server while trying to register the class.'
        )
    }
  },

  updateClass: async (req: Request, res: Response): Promise<void> => {
    const { name, shift, startDate, endDate, workload, teacher } = req.body
    try {
      const result = await classesService.updateClass(
        name,
        shift,
        startDate,
        endDate,
        workload,
        teacher
      )
      if (!result) {
        res.status(500).send('Unable to update the class.')
      } else {
        res.status(200).send('Class update completed successfully.')
      }
    } catch (error) {
      console.error('Error updating class:', error)
      res
        .status(500)
        .send(
          'An error occurred on the server while trying to update the class.'
        )
    }
  },

  deleteClass: async (req: Request, res: Response): Promise<void> => {
    const { name, startDate } = req.body
    try {
      const result = await classesService.deleteClass(name, startDate)
      if (!result) {
        res.status(500).send('Unable to delete the class.')
      } else {
        res.status(200).send('Class deleted successfully.')
      }
    } catch (error) {
      console.error('Error deleting class:', error)
      res
        .status(500)
        .send(
          'An error occurred on the server while trying to delete the class.'
        )
    }
  },

  addStudentToClass: async (req: Request, res: Response): Promise<void> => {
    const { className, startDate, studentId, studentName } = req.body
    try {
      const result = await classesService.addStudentToClass(
        className,
        startDate,
        studentId,
        studentName
      )
      if (!result) {
        res.status(500).send('Unable to add the student to the class.')
      } else {
        res.status(200).send(result)
      }
    } catch (error) {
      console.error('Error adding student to class:', error)
      res
        .status(500)
        .send(
          'An error occurred on the server while trying to add the student to the class.'
        )
    }
  },

  getAllClasses: async (req: Request, res: Response): Promise<void> => {
    try {
      const ret = await classesService.getAllClasses();
      if (!ret) {
        res.status(500).send("Não foi possível buscar as turmas.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao buscar as turmas:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar buscar as turmas.");
    }
  },
}

export default classesController
