import { Router } from "express";
import { solicitudController } from "../controllers/solicitud-controller";

class SolicitudRoutes{

    public router:Router;

    constructor(){
        this.router=Router();

        this.config();
    }

    private config(){
        this.router.get('/',solicitudController.get);
        this.router.get('/departamento/:Departamento', solicitudController.getByDepartamento);
        this.router.get('/consumible/:consumible',solicitudController.getByConsumible);
        this.router.get('/estado/:estado',solicitudController.getByEstado);
        this.router.get('/fecha/:fecha1/:fecha2?',solicitudController.getByFecha );
        this.router.post('/',solicitudController.create);
        this.router.patch('/',solicitudController.update);
        //this.router.delete('/participante/:evento/:folio',eventosController.addPart );
    }
}

const solicitudRoutes=new SolicitudRoutes();
export default solicitudRoutes.router;