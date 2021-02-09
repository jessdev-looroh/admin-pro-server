import Router from 'express';
import uploadController from '../controller/upload';
import expressFileUpload from 'express-fileupload';
import { verificaToken } from '../middlewares/autenticacion.mw';
const uploadRouter =Router();

uploadRouter.use(expressFileUpload());
uploadRouter.put('/:tipo/:id', verificaToken,uploadController.subirFoto)
uploadRouter.get('/:tipo/:foto', uploadController.mostrarFoto)

export default uploadRouter;