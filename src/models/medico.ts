import { model, Schema } from "mongoose";

const MedicoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required:true
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required:true
    },
  }
  
);

MedicoSchema.methods.toJSON = function () {
  let objetc: any = this.toObject();
  let { __v, ...others } = objetc;
  return others;
};

export = model("Medico", MedicoSchema);
