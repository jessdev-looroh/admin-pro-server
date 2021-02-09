import Router from 'express';
import { check } from 'express-validator';
import { verificaToken } from '../middlewares/autenticacion.mw';
import validarCampos from '../middlewares/validar.middleware';
import hospitalController from '../controller/hospital';



const hospitalRouter = Router()

hospitalRouter.get("/",verificaToken ,hospitalController.getHospitales);
hospitalRouter.post(
  "/",
  [
      verificaToken,
      check('nombre', "El nombre del hospital es necesario").notEmpty(),
      validarCampos
  ],
  hospitalController.crearHospital
);
hospitalRouter.put(
  "/:id",
  [],
  hospitalController.actualizarHospital
);

hospitalRouter.delete('/:id',verificaToken,hospitalController.eliminarHospital);


export default hospitalRouter;