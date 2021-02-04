import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class UsuarioController {
  getUsuario(req: Request, res: Response) {
    Usuario.find().exec((err, usuarios) => {
      if (err) {
        return res.status(500).json({
          exito: false,
          err,
        });
      }
      return res.status(201).json({
        exito: true,
        usuarios,
      });
    });
  }

  eliminarUsuario(req: Request, res: Response) {
    const uid = req.params.id;
    Usuario.findByIdAndUpdate(uid, { estado: false },{new:true}).exec((err, usuario) => {
      if (err) {
        return res.status(500).json({
          exito: false,
          err,
        });
      }
      if (usuario)
        return res.json({
          exito: true,
          msg : "El usuario ha sido eliminado correctamente!!"
        });

      return res.status(401).json({
        exito: false,
        err: {
          msg: "No existe un usuario con este ID",
        },
      });
    });
  }

  actualizarUsuario(req: Request, res: Response) {
    const { nombre } = req.body;
    const uid = req.params.id;

    Usuario.findByIdAndUpdate(uid, { nombre }, { new: true }).exec(
      (err, usuario) => {
        if (err) {
          return res.status(500).json({
            exito: false,
            err,
          });
        }
        if (usuario)
          return res.json({
            exito: true,
            usuario,
          });

        return res.status(401).json({
          exito: false,
          err: {
            msg: "No existe un usuario con este ID",
          },
        });
      }
    );
  }

  async registrarUsuario(req: Request, res: Response) {
    const { nombre, password, email } = req.body;
    let existeUsuario;

    try {
      existeUsuario = await Usuario.findOne({ email });
    } catch (err) {
      return res.status(500).json({
        exito: false,
        err,
      });
    }
    if (existeUsuario) {
      return res.status(400).json({
        exito: false,
        err: {
          msg: "Este correo ya esta registrado",
        },
      });
    }

    const usuario = new Usuario({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    let token = jwt.sign({ usuario: usuario }, `${process.env.SEED}`, {
      expiresIn: process.env.CADUCIDAD_TOKEN,
    });
    usuario.save((err: any, usuarioDB) => {
      if (err) {
        return res.status(500).json({
          exito: false,
          err,
        });
      }
      return res.status(201).json({
        exito: true,
        usuarios: [usuarioDB],
        token
      });
    });
  }
}

const usuarioController = new UsuarioController();
export default usuarioController;
