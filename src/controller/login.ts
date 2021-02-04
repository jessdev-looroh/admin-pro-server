import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {
  login(req: Request, res: Response) {
    const {email,password} = req.body;
    
    Usuario.findOne({ email})
      .populate("color", "descripcion codigo")
      .populate("pais", "nombre bandera monedaNombre monedaSimbolo codigoCell")
      .populate("ciudad", "nombre")
      .exec((err, usuarioDB: any) => {
        if (err) {
          return res.status(500).json({
            exito: false,
            err,
          });
        }
        if (!usuarioDB) {
          return res.status(400).json({
            exito: false,
            err: {
              message: "Usuario o contraseña incorrectos",
            },
          });
        }
        if (!bcrypt.compareSync(password, usuarioDB.password)) {
          return res.status(400).json({
            exito: false,
            err: {
              message: "Usuario o contraseña incorrectos",
            },
          });
        }
        let token = jwt.sign({ usuario: usuarioDB }, `${process.env.SEED}`, {
          expiresIn: process.env.CADUCIDAD_TOKEN,
        });
        res.json({
          exito: true,
          usuario: usuarioDB,
          token,
        });
      });
  }
}

const loginController = new LoginController();
export default loginController;
