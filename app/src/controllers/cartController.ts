import 'dotenv/config'

import {Request , Response } from 'express'
import { CartService } from '../services/cartServices'
import { cartDTO } from '../dto/cartDTO'
import { ProdService } from '../services/prodServices'
import { prodDTO } from '../dto/prodDTO'


import '../models/logs4js'
import log4js from '../models/logs4js'


const logError = log4js.getLogger("fileError")
const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500

class cartController {
    static cartService = new CartService()
    static prodService = new ProdService()
    
    static cartSingleton = new cartController()

    async  listCarts (req:Request, res:Response){
        try {
            const carts:cartDTO = await cartController.cartService.getAll()
            if (carts){
                    res.status(statusOk).json(carts.cart)
            }else{
                    res.status(statusOk).json("no hay productos para mostrar")
            }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller cart / entrada listCarts " + error)
        }
    }
    async  getById (req:Request, res:Response){
        try {
            const cart:cartDTO = await cartController.cartService.getById(req.params.idCart)
            if (cart.valid == "OK"){
                    res.status(statusOk).json(cart.cart)
            }else{
                    res.status(statusOk).json(cart.message )
            }
        } catch(error:any){
            logError.error("se Genero el siguiente error en el controller cart / entrada listProdbyId " + error)
            res.status(statusErrServer).json(error.message)
        }
    }
    async  saveCarts (req:Request, res:Response){
        try {
            const newCart:cartDTO = await cartController.cartService.saveCart()
            if (newCart.valid == "OK"){
                    res.status(statusOk).json(newCart.cart)
            }else{
                    res.status(statusOk).json(newCart.message)
        }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller cart / entrada saveProd " + error)
        }
    }
    async  deleteCart (req:Request, res:Response){
            try {
                const cart:cartDTO = await cartController.cartService.deleteById(req.params.idCart)
                if (cart.valid == "OK"){
                        res.status(statusOk).json(cart.cart)
                }else{
                        res.status(statusOk).json(cart.message )
                }
            } catch(error){
                logError.error("se Genero el siguiente error en el controller cart / entrada deleteCart " + error)
            }   
    }
    async  addProdToCart (req:Request, res:Response){
        try {
            const product:prodDTO = await cartController.prodService.getById(req.params.idProduct)
            if (product.valid == "OK"){
                const cart:cartDTO = await cartController.cartService.addProdToCart(req.params.id, product.product)
                if (cart.valid == "OK"){
                    res.status(statusOk).json(cart.cart)
                }else{
                    res.status(statusOk).json(cart.message )
                }
            }else{
                res.status(statusOk).json(product.message )
            }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller cart / entrada addProdToCart " + error)
        }
    }
    async buyCart(req:Request, res:Response){
        try {
            const cart:cartDTO = await cartController.cartService.buyCart(req.params.idCart)
            if (cart.valid == "OK"){
                    res.status(statusOk).json(cart.cart)
            }
            else{
                    res.status(statusOk).json(cart.message ) 
            }
        } catch (error) {
            logError.error("se Genero el siguiente error en el controller cart / entrada buyCart " + error)
        }

    }

}

export default  cartController.cartSingleton