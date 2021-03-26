import jwt from "jsonwebtoken";
//==========================================
//Verificar Token
//==========================================

import { NextFunction, Request, Response } from "express";
export let verificaTokenImg = (req: any, res: Response, next: NextFunction) => {
  let token: any = req.query.token;
  let SEED: any = process.env.SEED;
  jwt.verify(token, SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        exito: false,
        err: {
          message: "Token no válido",
        },
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};
export let verificaToken = (req: any, res: Response, next: NextFunction) => {
  let token: any = req.header("token");
  let SEED: any = process.env.SEED;
  jwt.verify(token, SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        exito: false,
        err,
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};
//==========================================
//Verificar Admin Roll
//==========================================

export let verificaAdminRole = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let usuario: any = req.usuario;
  let userRol: any = usuario.role;

  console.log(usuario);
  if (userRol != "ADMIN_ROLE") {
    return res.status(403).json({
      exito: false,
      err: {
        message:
          "Acceso denegado: se necesita el rol de administrador para poder realizar esta operación",
      },
    });
  }
  next();
};
//==========================================
//Verificar Admin Roll
//==========================================

export let verificaAdminRole_o_MismoUsuario = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let usuario: any = req.usuario;
  let userRol: any = usuario.role;
  let { id } = req.params;

 
    if (userRol != "ADMIN_ROLE" && id !== usuario.uid) {
      return res.status(403).json({
        exito: false, 
        err: {
          message:
            "Acceso denegado: se necesita el rol de administrador para poder realizar esta operación",
        },
      });
    }
    next();
  
};
