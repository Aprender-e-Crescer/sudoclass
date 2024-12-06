import Router from "express-promise-router"; // Importação padrão
import alunosController from "../controllers/alunos.controller";

const router = Router();

router.post("/alunos", alunosController.createstudent);

router.put("/alunos/:id", alunosController.updateStudent);
router.get('/alunos/:id', alunosController.getStudent)
router.delete('/alunos/:id', alunosController.deleteStudent)
router.get('/alunos', alunosController.getAllStudent)
router.get('/alunos/documents/:id', alunosController.getDocStudent)
router.get("/alunos/nota/:id_turma", alunosController.getnoteStudent);
router.get("/alunos/presenca/:id_turma", alunosController.getpresenceStudent);
router.get("/alunos/presenca-turma/:id_turma", alunosController.getpresenceTurma);
router.get("/alunos/presenca-materia/:id_turma", alunosController.getpresenceMateria);



export default router;
 