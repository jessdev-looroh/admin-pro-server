import Hospital from "../models/hospital";
import Medico from "../models/medico";
import Usuario from "../models/usuario";
import fs from "fs";

export const actulizarImagen = async (
  tipo: string,
  id: string,
  nombre: string
) => {
  switch (tipo) {
    case "medicos":
      const medico: any = await Medico.findById(id);
      if (!medico) {
        console.log("Id medico no valido");
        return false;
      }
      const pathViejoMedico = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejoMedico);
      medico.img = nombre;
      await medico.save();
      return true;

    case "hospitales":
      const hospital: any = await Hospital.findById(id);
      if (!hospital) {
        console.log("Id hospital no valido");
        return false;
      }
      const pathViejoHospital = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejoHospital);
      hospital.img = nombre;
      await hospital.save();
      return true;
    case "usuarios":
      const usuario: any = await Usuario.findById(id);
      if (!usuario) {
        console.log("Id usuario no valido");
        return false;
      }
      const pathViejoUsuario = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejoUsuario);
      usuario.img = nombre;
      await usuario.save();
      return true;
  }
};

const borrarImagen = (pathViejo: string) => {
  if (fs.existsSync(pathViejo)) {
    fs.unlinkSync(pathViejo);
  }
};
