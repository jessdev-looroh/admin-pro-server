import Router from 'express';
import usuarioRouter from './usuarios';
import loginRouter from './login';

const indexRouter = Router();

indexRouter.use('/usuarios', usuarioRouter);
indexRouter.use('/login',loginRouter)

export default indexRouter;
