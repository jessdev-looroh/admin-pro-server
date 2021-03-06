import { model, Schema } from "mongoose";

const HospitalSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      required:true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "hospitales" }
);

HospitalSchema.methods.toJSON = function () {
  let objetc: any = this.toObject();
  let { __v, ...others } = objetc;
  return others;
};

export = model("Hospital", HospitalSchema);
