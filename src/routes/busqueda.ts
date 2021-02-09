import Router from 'express';
import busquedaController from '../controller/busqueda';
import { verificaToken } from '../middlewares/autenticacion.mw';
const busquedaRouter = Router()


busquedaRouter.get('/:termino',[verificaToken],busquedaController.buscar);
busquedaRouter.get('/coleccion/:tabla/:termino',[verificaToken],busquedaController.buscarColeccion);

export default busquedaRouter;