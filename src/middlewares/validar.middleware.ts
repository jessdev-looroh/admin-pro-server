import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errores = validationResult(req);
  let erroresString = "";

  if (!errores.isEmpty()) {
    errores.array().forEach((e) => {
      erroresString += `*${e.msg}\n`;
    });
    console.log(erroresString);
    return res.status(400).json({
      exito: false,
      err: {
        message: erroresString,
      },
    });
  }
  next();
};

export default validarCampos;
