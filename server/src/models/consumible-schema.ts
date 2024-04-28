import { Schema, model } from "mongoose";

const consumibleSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    cantidad_disp:{
      type: Number,
      required: true,
    },
    image:{
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

const Consumible = model("Consumible", consumibleSchema, "Consumible");
export default Consumible;
