import { Schema, model } from "mongoose";

const Departamento=new Schema(
    {
        nombre:{
            type:String
        }
    },
    {
        versionKey: false,
    }
)

const departamento=model('Departamento',Departamento,'Departamentos')
export default departamento;