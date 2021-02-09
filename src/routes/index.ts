import Router from "express";
import usuarioRouter from "./usuarios";
import loginRouter from "./login";
import hospitalRouter from "./hospital";
import medicoRouter from "./medico";
import busquedaRouter from "./busqueda";
import uploadRouter from "./uploads";

const indexRouter = Router();

indexRouter.use("/usuarios", usuarioRouter);
indexRouter.use("/login", loginRouter);
indexRouter.use("/hospital", hospitalRouter);
indexRouter.use("/medico", medicoRouter);
indexRouter.use("/busqueda", busquedaRouter);
indexRouter.use("/upload", uploadRouter);

export default indexRouter;
