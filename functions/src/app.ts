import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {authMiddleware} from "./middlewares/auth";

import alunosRouter from './routes/alunos.routes'
import lessonPlanRouter from './routes/lessonPlan.routes'
import courseRouter from './routes/course.routes'
import teacherRouter from "./routes/teacher.routes";
import subjectsRouter from './routes/subjects.routes'
import classesRouter from './routes/classes.routes'
import courseSyllabus from './routes/course-syllabus.routes'
import usuario from './routes/usuario.routes'
import notesRouter from './routes/notes.routes'
import responsibleRouter from './routes/responsible.routes'
import activiesRouter from './routes/activies.routes'
import commentsRouter from './routes/comments.routes'
import formRoutes from './routes/form.routes'
import schoolCallRouter from './routes/school-call.routes'

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json({type: "application/vnd.api+json"}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());
app.use(authMiddleware);

// Roteamentos
app.use(teacherRouter);
app.use(alunosRouter)
app.use(classesRouter)
app.use(alunosRouter)
app.use(lessonPlanRouter)
app.use(courseRouter)
app.use(subjectsRouter)
app.use(courseSyllabus)
app.use(usuario)
app.use(notesRouter)
app.use(responsibleRouter)
app.use(activiesRouter)
// app.use(commentsRouter)
app.use(formRoutes)
app.use(schoolCallRouter)

export default app;
