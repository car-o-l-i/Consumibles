import { Schema, model } from "mongoose";

const solicitudSchema=new Schema(
    {
        departamento:{
            type:String,
            required:true
        }, 
        consumible:{
            type:String,
            required:true
        }, 
        cantidad:{
            type:Number,
            required:true
        }, 
        estado:{
            type:String,
            required:true
        },
        fecha:{
            type:Date,
            required:true,
            default:new Date()
        }
    },
    {
        versionKey: false,
    }
)

const Solicitud=model('Solicitud',solicitudSchema,'Solicitudes')
export default Solicitud;