import Router from 'express';
import { check } from 'express-validator';
import loginController from '../controller/login';
import validarCampos from '../middlewares/validar.middleware';
const loginRouter = Router();


loginRouter.post('/',[
    check('email',"El email es obligatorio").notEmpty(),
    check('email',"El email debe ser valido").isEmail(),
    check('password',"La contraseña es obligatoria").notEmpty(),
    validarCampos
],loginController.login);


export default loginRouter;