import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: {
    type: String,

    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
      type:Boolean,
      default:false
  },
  estado : {
    type:Boolean,
    default: true
  }
});

UsuarioSchema.methods.toJSON = function () {
  let { __v, _id, password , ...others } = this.toObject();
  others.uid = _id;
  return others;
};

export= model("Usuario", UsuarioSchema);
