import { Router } from "express";
import { departamentoController } from "../controllers/departamento-controller";

class DepartamentoRoutes{

    public router:Router;

    constructor(){
        this.router=Router();

        this.config();
    }

    private config(){
        this.router.get('/',departamentoController.get);
    }
}

const departamentoRoutes=new DepartamentoRoutes();
export default departamentoRoutes.router;