import { Request, Response } from "express";
import Consumible from "../models/consumible-schema";

class ConsumibleController{

    public async get(req: Request, res: Response) {
        try {
            const evento = await Consumible.find(); // Debe ser ItemModel.find({}, 'nombreEvento cupoMaximo fecha participante nomCiudad nomArea evento');
            return res.status(201).json(evento);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async add(req: Request, res: Response) {
        try {
            await Consumible.insertMany(req.body);
            return res.status(201).json({message:'Incercion Exitosa', code:0});
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}

export const consumibleController=new ConsumibleController();