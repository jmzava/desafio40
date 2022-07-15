import {Request , Response } from 'express'
import { prodDTO } from '../dto/prodDTO'
import { ProdService } from '../services/prodServices'

import '../models/logs4js'
import log4js from '../models/logs4js'
const logError = log4js.getLogger("fileError")

const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500

class ProdController{
    static prodService = new ProdService();

    static prodSingleton = new ProdController()

    async listProds (req:Request, res:Response)  {
        try {
            const products = await ProdController.prodService.getAll()
            if (products){
                    res.status(statusOk).json(products.product)
            }else{
                    res.status(statusOk).json("no hay productos para mostrar")
            }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller productos / entrada listProds " + error)
        }
    }
    async listProdbyId  (req:Request, res:Response)  {
            try {
                const product:prodDTO = await ProdController.prodService.getById(req.params.idProduct)

            if (product.valid == "OK"){
                    res.status(statusOk).json(product.product)
            }else{
                    res.status(statusOk).json(product.message )
            }
            } catch(error){
                logError.error("se Genero el siguiente error en el controller productos / entrada listProdbyId " + error)
            }
    }
    async saveProd  (req:Request, res:Response)  {
        try {
            const data = req.body
            const product:prodDTO = await ProdController.prodService.saveProd(data)

        if (product.valid == "OK"){
                res.status(statusOk).json(product.product)
        }else{
                res.status(statusOk).json(product.message )
        }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller productos / entrada saveProd " + error)
        }
    }
    async  updateProds (req:Request, res:Response)  {
        try {
            const data = req.body
            const product:prodDTO = await ProdController.prodService.updateProds(req.params.idProduct, data)
        
            if (product.valid == "OK"){
                res.status(statusOk).json(product.product)
            }else{
                res.status(statusOk).json(product.message )
            }
        }catch(error){
            logError.error("se Genero el siguiente error en el controller productos / entrada updateProds " + error)
        }
    }
    async  deleteProds (req:Request, res:Response)  {
        try {
            const product:prodDTO = await ProdController.prodService.deleteProds(req.params.idProduct)

        if (product.valid == "OK"){
                res.status(statusOk).json(product.product)
        }else{
                res.status(statusOk).json(product.message )
        }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller productos / entrada deleteProds " + error)
        }
    }
}

export default ProdController.prodSingleton