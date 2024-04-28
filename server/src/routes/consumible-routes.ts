import { Router } from "express";
import { consumibleController } from "../controllers/consumible-controller";

class ConsumibleRoutes{

    public router:Router;

    constructor(){
        this.router=Router();

        this.config();
    }

    private config(){
        console.log('hecho')
        this.router.get('/',consumibleController.get);
        this.router.post('/',consumibleController.add);
    }
}

const consumibleRoutes=new ConsumibleRoutes();
export default consumibleRoutes.router;