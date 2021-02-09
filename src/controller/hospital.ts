import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Hospital from "../models/hospital";

class HospitalController {
  getHospitales(req: Request, res: Response) {
    Hospital.find().populate('usuario','nombre img').exec((err, hospitales) => {
      if (err) {
        return res.status(500).json({
          exito: false,
          err,
        });
      }
      return res.status(201).json({
        exito: true,
        hospitales,
      });
    });
  }

  eliminarHospital(req: Request, res: Response) {
    const uid = req.params.id;
    // Hospital.findByIdAndUpdate(uid, { estado: false },{new:true}).exec((err, Hospital) => {
    //   if (err) {
    //     return res.status(500).json({
    //       exito: false,
    //       err,
    //     });
    //   }
    //   if (Hospital)
    return res.json({
      exito: true,
      msg: "El Hospital ha sido eliminado correctamente!!",
    });

    //   return res.status(401).json({
    //     exito: false,
    //     err: {
    //       msg: "No existe un Hospital con este ID",
    //     },
    //   });
    // });
  }

  actualizarHospital(req: Request, res: Response) {
    const { nombre } = req.body;
    const uid = req.params.id;

    // Hospital.findByIdAndUpdate(uid, { nombre }, { new: true }).exec(
    //   (err, Hospital) => {
    //     if (err) {
    //       return res.status(500).json({
    //         exito: false,
    //         err,
    //       });
    //     }
    //     if (Hospital)
    return res.json({
      exito: true,
      hospital: "h",
    });

    //     return res.status(401).json({
    //       exito: false,
    //       err: {
    //         msg: "No existe un Hospital con este ID",
    //       },
    //     });
    //   }
    // );
  }

  async crearHospital(req: any, res: Response) {
    const { nombre } = req.body;
    const { uid } = req.usuario;
    const hospital = new Hospital({ nombre, usuario: uid });
    hospital.save((err: any, hospitalDB) => {
      if (err) {
        return res.status(500).json({
          exito: false,
          err,
        });
      }
      return res.status(201).json({
        exito: true,
        hospitales: [hospitalDB],
      });
    });
  }
}

const hospitalController = new HospitalController();
export default hospitalController;
