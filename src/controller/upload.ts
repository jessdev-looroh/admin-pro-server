import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { actulizarImagen } from '../helpers/actualizar-img';
import path from 'path';
import fs from 'fs';

class UploadController {

  mostrarFoto(req: Request, res: Response){
    const { tipo, foto } = req.params;   
    const img = path.resolve(__dirname,`../../uploads/${tipo}/${foto}`);
    if(!fs.existsSync(img)){
      return res.sendFile( path.resolve(__dirname,`../../uploads/no-image.webp`))
    }
    res.sendFile(img);

  }
  subirFoto(req: Request, res: Response) {
    const { tipo, id } = req.params;
    const tiposValidos = ["hospitales", "medicos", "usuarios"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        exito: false,
        err: {
          message: "Los tipos permitidos son " + tiposValidos,
        },
      });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        exito: false,
        err: {
          message: "No se encontraron archivos",
        },
      });
    }
    //PROCESAR LA IMAGEN
    let file = req.files.archivo;
    file = file as UploadedFile;
    const nombreCortado: string[] = file.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

    if (!extensionesValidas.includes(extensionArchivo)) {
      return res.status(400).json({
        exito: false,
        err: {
          message: "Las extensiones validas son:  " + extensionesValidas,
        },
      });
    }

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
      if (err) {
        return res.json({
          exito: false,
          err,
        });
      }


      //actualizar base de datos
      actulizarImagen(tipo,id,nombreArchivo);

      res.json({
        exito: true,
        msg: "Archivo subido",
        nombreArchivo,
      });
    });
  }
}

const uploadController = new UploadController();
export default uploadController;
