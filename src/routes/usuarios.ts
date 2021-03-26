import Router from "express";
import usuarioController from "../controller/usuario";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.middleware";
import {
  verificaToken,
  verificaAdminRole,
  verificaAdminRole_o_MismoUsuario,
} from "../middlewares/autenticacion.mw";

const usuarioRouter = Router();

usuarioRouter.get(
  "/",
  [verificaToken, verificaAdminRole],
  usuarioController.getUsuario
);
usuarioRouter.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "Debe ser un email valido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],

  usuarioController.registrarUsuario
);
usuarioRouter.put(
  "/:id",
  [
    verificaToken,
    verificaAdminRole_o_MismoUsuario,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  usuarioController.actualizarUsuario
);

usuarioRouter.delete(
  "/:id",
  [verificaToken, verificaAdminRole],
  usuarioController.eliminarUsuario
);

export default usuarioRouter;
