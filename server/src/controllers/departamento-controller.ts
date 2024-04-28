import { Request, Response } from "express";
import departamento from "../models/departamento-schema";

class DepartamentoController{

    public async get(req: Request, res: Response) {
        try {
            const area = await departamento.find();
            return res.status(201).json(area);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export const departamentoController= new DepartamentoController();