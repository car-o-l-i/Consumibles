import { consumibleController } from './consumible-controller';
import { Request, Response } from "express";
import Solicitud from "../models/solicitud-schema";

class SolicitudController{

    public async get(req: Request, res: Response) {
        try {
            const ciudades = await Solicitud.find();
            return res.status(201).json(ciudades);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async getByDepartamento(req: Request, res: Response) {
        try {
            
            const {Departamento}=req.params;
            const solicitudes = await Solicitud.find({departamento:Departamento});
            return res.status(201).json(solicitudes);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async getByConsumible(req: Request, res: Response) {
        try {
            const {consumible}=req.params;
            const solicitudes = await Solicitud.find({consumible:consumible});
            return res.status(201).json(solicitudes);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async getByEstado(req: Request, res: Response) {
        try {
            const {estado}=req.params;
            const solicitudes = await Solicitud.find({estado:estado});
            return res.status(201).json(solicitudes);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async getByFecha(req: Request, res: Response) {
        try {
            const { fecha1, fecha2 } = req.body;
            let query: any = { fecha: new Date(fecha1) };
    
            // Verificar si se proporciona fecha2 para hacer un rango de fechas
            if (fecha2) {
                query.fecha.$lte = new Date(fecha2);
            }
    
            const solicitudes = await Solicitud.find(query);
            return res.status(200).json(solicitudes);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { departamento, consumible, cantidad, estado } = req.body;


            // Guardar la nueva solicitud en la base de datos
            await Solicitud.insertMany({ departamento, consumible, cantidad, estado });

            return res.status(201).json({message:"Operacion Exitosa", code:0});
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { _id, departamento, consumible, cantidad, estado } = req.body;
    
            // Verificar si la solicitud ya existe en la base de datos
            const existingSolicitud = await Solicitud.findById(_id);
    
            if (existingSolicitud) {
                // Actualizar la solicitud existente conservando su _id
                await Solicitud.updateOne({ _id }, { departamento, consumible, cantidad, estado });
    
                return res.status(200).json({ message: "Operación Exitosa: Solicitud actualizada", code: 0 });
            } else {
                return res.status(404).json({ error: "No se encontró la solicitud para actualizar" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    
}

export const solicitudController=new SolicitudController();