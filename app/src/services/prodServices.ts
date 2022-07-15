import { ProdDAO } from "../daos/prodDao";
import { prodDTO } from "../dto/prodDTO";

export class ProdService{
    
    static prodDAO = new ProdDAO();

    constructor(){}
    
    async getAll(){
        try{
            const listProds:prodDTO = await ProdService.prodDAO.getAll()
            return listProds
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async getById(prodId:any){
        try{
            if(prodId.length==24){
                const listProd:prodDTO = await ProdService.prodDAO.getById(prodId)
                return listProd
                }
            else {
                const listProd:prodDTO={
                    message: "el id es incorrecto",
                    product:null,
                    valid: "NO",
                }
                return listProd
            }
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async saveProd(product:any){
        try{
            if(product.nombre){
                const saveProd:prodDTO = await ProdService.prodDAO.saveProduct(product)
                return saveProd
            }else{
                const saveProd:prodDTO={
                    message: "Por favor complete los datos obligatorios",
                    product:null,
                    valid: "NO",
                }
                return saveProd
            }
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async updateProds(prodId:any, product:any){
        try{
            if(prodId.length==24){
                if(product.nombre){
                    const updateProd:prodDTO = await ProdService.prodDAO.updateId(prodId, product)
                    return updateProd
                }else{
                    const updateProd:prodDTO={
                        message: "Por favor complete los datos obligatorios",
                        product:null,
                        valid: "NO",
                    }
                    return updateProd
                }
            }
            else {
                const updateProd:prodDTO={
                    message: "el id es incorrecto",
                    product:null,
                    valid: "NO",
                }
                return updateProd
            }
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async  deleteProds (prodId:any)  {
    try{
        if(prodId.length==24){
            const deleteProd:prodDTO = await ProdService.prodDAO.deleteById(prodId)
            return deleteProd
            }
        else {
            const deleteProd:prodDTO={
                message: "el id es incorrecto",
                product:null,
                valid: "NO",
            }
            return deleteProd
        }
    } catch (error:any){
        throw new Error(error.message)
    }
    }
}