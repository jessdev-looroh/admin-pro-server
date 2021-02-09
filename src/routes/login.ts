import Router from "express";
import { check } from "express-validator";
import loginController from "../controller/login";
import validarCampos from "../middlewares/validar.middleware";
import { verificaToken } from '../middlewares/autenticacion.mw';
const loginRouter = Router();

loginRouter.post(
  "/",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe ser valido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  loginController.login
);

loginRouter.post(
  "/google",
  [check("token", "El token es obligatorio").notEmpty(), validarCampos],
  loginController.loginGoogle
);

loginRouter.get('/renew',verificaToken,loginController.renewToken )

export default loginRouter;
