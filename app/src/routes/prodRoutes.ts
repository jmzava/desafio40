import { Router } from "express"
import ProdController from "../controllers/prodController"

const routes = Router()

routes.get('/', ProdController.listProds )
routes.post('/', ProdController.saveProd)
routes.get('/:idProduct', ProdController.listProdbyId)
routes.put('/:idProduct', ProdController.updateProds)
routes.delete('/:idProduct',  ProdController.deleteProds)

export default routes