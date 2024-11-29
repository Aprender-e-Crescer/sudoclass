import Router from "express-promise-router"; // Importação padrão
import alunosController from "../controllers/alunos.controller";

const router = Router();

router.post("/alunos", alunosController.createstudent);
router.put("/alunos/:id", alunosController.updateStudent);
router.get("/alunos/:id", alunosController.getStudent);
router.delete("/alunos/:id", alunosController.deleteStudent);
router.get("/alunos", alunosController.getAllStudent);

export default router;
