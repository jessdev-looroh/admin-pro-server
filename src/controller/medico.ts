import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Medico from "../models/medico";
class MedicoController {
  getMedicos(req: Request, res: Response) {
    Medico.find()
      .populate("hospital", "nombre img")
      .populate("usuario", "nombre img")
      .exec((err, medicos) => {
        if (err) {
          return res.status(500).json({
            exito: false,
            err,
          });
        }
        return res.status(201).json({
          exito: true,
          medicos,
        });
      });
  }

  eliminarMedico(req: Request, res: Response) {
    const uid = req.params.id;
    // Medico.findByIdAndUpdate(uid, { estado: false },{new:true}).exec((err, Medico) => {
    //   if (err) {
    //     return res.status(500).json({
    //       exito: false,
    //       err,
    //     });
    //   }
    //   if (Medico)
    return res.json({
      exito: true,
      msg: "El Medico ha sido eliminado correctamente!!",
    });

    //   return res.status(401).json({
    //     exito: false,
    //     err: {
    //       msg: "No existe un Medico con este ID",
    //     },
    //   });
    // });
  }

  actualizarMedico(req: Request, res: Response) {
    const { nombre } = req.body;
    const uid = req.params.id;

    // Medico.findByIdAndUpdate(uid, { nombre }, { new: true }).exec(
    //   (err, Medico) => {
    //     if (err) {
    //       return res.status(500).json({
    //         exito: false,
    //         err,
    //       });
    //     }
    //     if (Medico)
    return res.json({
      exito: true,
      Medico: "h",
    });

    //     return res.status(401).json({
    //       exito: false,
    //       err: {
    //         msg: "No existe un Medico con este ID",
    //       },
    //     });
    //   }
    // );
  }

  async crearMedico(req: any, res: Response) {
    const { nombre, hospital } = req.body;
    const { uid } = req.usuario;

    const medico = new Medico({
      nombre,
      usuario: uid,
      hospital,
    });
    medico.save((err: any, medicoDB) => {
      if (err) {
        return res.status(500).json({
          exito: false,
          err,
        });
      }
      return res.status(201).json({
        exito: true,
        Medicos: [medicoDB],
      });
    });
  }
}

const medicoController = new MedicoController();
export default medicoController;
