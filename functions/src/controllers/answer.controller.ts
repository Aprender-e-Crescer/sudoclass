import { Request, Response } from "express";
import { AnswerService } from "../services/answer.service";

export class AnswerController {
   private answerService: AnswerService;

   constructor(answerService: AnswerService) {
    this.answerService = answerService;
   }

    async createAnswer(req: Request, res: Response): Promise<void> {
        try {
            const newAnswer = await this.answerService.createAnswer(req.body);
            if (!newAnswer) {
                res.status(500).send('Não foi possível criar uma resposta');
            } else {
                res.status(200).send('Resposta criada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao criar uma resposta:', error)
             res.status(500).send('Houve um erro no servidor ao tentar criar uma repsosta');
        }
    }

    async searchAnswerByStudent(req: Request, res: Response): Promise<void> {
        try {
            const studentId = Number(req.body.studentId);
            const answers = await this.answerService.searchAnswerByStudent(studentId);
            if(!answers) {
                res.status(500).send('Não foi possível encontrar a resposta');
            } else {
                res.status(200).send('Resposta encontrada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao buscar uma resposta:', error)
             res.status(500).send('Houve um erro no servidor ao tentar encontrar a resposta');
        }
    } 

    async updateAnswer(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.body.id);
            const updatedAnswer = await this.answerService.updateAnswer(id, req.body);
            if (!updatedAnswer) {
                res.status(500).send('Não foi possível atualizar uma resposta');
            } else {
                res.status(200).send('Resposta atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar uma resposta', error)
            res.status(500).send('Houve um erro no servidor ao tentar atualizar uma resposta');
        }
    }

    async deleteAnswer(req: Request, res: Response) {
        try {
            const id = Number(req.body.id);
            const message = await this.answerService.deleteAnswer(id);
            if (!message) {
             res.status(500).send('Não foi possível deletar a resposta');
            } else {
                res.status(200).send('Resposta excluída com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao excluir uma resposta', error)
             res.status(500).send('Houve um erro no servidor ao tentar deletar a resposta');
        }
    }

    async getAllAnswers(req: Request, res: Response): Promise<void> {
        try {
            const answer = await this.answerService.getAllAnswers();
            res.status(200).json(answer);
        } catch (error) {
            console.error("Erro ao buscar todas as respostas")
            res.status(500).send("Houve um erro no servidor ao tentar buscar as respostas.");
        }
    }
}
