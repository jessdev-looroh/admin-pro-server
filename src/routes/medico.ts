import Router from "express";
import { check } from "express-validator";
import medicoController from "../controller/medico";
import validarCampos from "../middlewares/validar.middleware";
import { verificaToken } from "../middlewares/autenticacion.mw";

const medicoRouter = Router();
medicoRouter.get(
  "/",
  // verificaToken ,
  medicoController.getMedicos
);



medicoRouter.post(
  "/",
  [
    verificaToken,
    check("nombre", "El nombre del medico es obligatorio").notEmpty(),
    check("hospital", "El ID hospital es obligatorio").notEmpty(),
    check(
      "hospital",
      "El ID hospital debe ser un ID valido de MONGO DB"
    ).isMongoId(),
    validarCampos,
  ],
  medicoController.crearMedico
);
medicoRouter.put("/:id", [
  verificaToken,
  check("nombre", "El nombre del medico es obligatorio").notEmpty(),
  check("hospital", "El ID hospital es obligatorio").notEmpty(),
  check(
    "hospital",
    "El ID hospital debe ser un ID valido de MONGO DB"
  ).isMongoId(),
  validarCampos,
], medicoController.actualizarMedico);

medicoRouter.delete(
  "/:id",
  verificaToken,
  medicoController.eliminarMedico
);

medicoRouter.get('/:id',verificaToken,medicoController.getMedicoID)

export default medicoRouter;
