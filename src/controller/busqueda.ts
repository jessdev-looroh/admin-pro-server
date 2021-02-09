import { Request, Response } from "express";
import Usuario from "../models/usuario";
import Medico from "../models/medico";
import Hospital from "../models/hospital";

class BusquedaController {
  async buscar(req: Request, res: Response) {
    const { termino } = req.params;
    const regex = new RegExp(termino, "i");

    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
    ]);

    res.json({
      exito: true,
      usuarios,
      medicos,
      hospitales,
    });
  }
  async buscarColeccion(req: Request, res: Response) {
    const { tabla, termino } = req.params;
    const regex = new RegExp(termino, "i");
    let resultado = [];

    switch (tabla) {
      case "medicos":
        resultado = await Medico.find({ nombre: regex })
          .populate("usuario", "nombre img")
          .populate("hospital", "nombre img");
        break;
      case "hospitales":
        resultado = await Hospital.find({ nombre: regex })
        .populate("usuario", "nombre img");
        break;
      case "usuarios":
        resultado = await Usuario.find({ nombre: regex });
        break;
      default:
        return res.status(400).json({
          exito: false,
          err: {
            message: "La tabla ti ene que ser usuarios/medicos/hospitales",
          },
        });
    }
    return res.json({
      exito: true,
      resultado,
    });
  }
}

const busquedaController = new BusquedaController();
export default busquedaController;
