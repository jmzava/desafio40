import 'dotenv/config'

import { CartDAO } from "../daos/cartDao";
import { cartDTO } from "../dto/cartDTO";
import { sendEmail } from '../utils/nodemailer'
import { sendSMS, sendWhatsapp } from '../utils/twilio'

import moment from "momnet";

export class CartService{
    static cartDao = new CartDAO();
    constructor(){}

    async getAll(){
        try{
            const listCarts:cartDTO = await CartService.cartDao.getAll()
            return listCarts
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async getById(cartId:any) {
        try {
            // if(cartId.length==24){
                const listCart:cartDTO = await CartService.cartDao.getById(cartId)
                return listCart
            // }
            // else {
            //     const listCart:cartDTO={
            //         message: "el id es incorrecto",
            //         cart:null,
            //         valid: "NO",
            //     }
            //     return listCart
            // }
        } catch (error:any){
            throw  new Error(error)
        }
    }
    async saveCart() {
        try{
            const tempCart={
                timestamp: moment().format('L LTS'),
                products:[]}
            const saveCart = await CartService.cartDao.saveCart(tempCart)         
            return saveCart
        } catch (error:any){
            throw new Error(error.message)
        }
} 
    async deleteById(cartId:any){
        try {
            if(cartId.length==24){
                const deleteCart:cartDTO = await CartService.cartDao.deleteById(cartId)
                return deleteCart
            }
            else {
                const deleteCart:cartDTO={
                    message: "el id es incorrecto",
                    cart:null,
                    valid: "NO",
                }
                return deleteCart
            }
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async addProdToCart(cartId:any, prodToAdd:any){
        try {
            if(cartId.length==24){
                const updateCart:cartDTO = await CartService.cartDao.addProdToCart(cartId, prodToAdd)
                return updateCart
            }
            else {
                const updateCart:cartDTO={
                    message: "el id de carrito es incorrecto",
                    cart:null,
                    valid: "NO",
                }
                return updateCart
            }
        } catch (error:any){
            throw new Error(error.message)
        }

    }
    async buyCart(cartId:any){
        if(cartId.length==24){
            let destMail = process.env.DESTMAIL
            let adminPhone = process.env.ADMINPHONE
            let userPhone = process.env.USERPHONE
            let subject = `orden de compra procesada por el usuario ${process.env.ORDERUSER}`
            let cartOrder = `Carrito ${cartId} procesando la compra`
            const buyerCart:cartDTO = await CartService.cartDao.getById(cartId)
            let buyerCartBody = `<pre>${buyerCart.cart}</pre>`
            sendEmail(destMail, buyerCartBody, subject)
            sendWhatsapp(subject, adminPhone)
            sendSMS(cartOrder, userPhone)
            buyerCart.message="carrito Comprado"
            return buyerCart
        }
        else {
            const buyerCart:cartDTO={
                message: "el id de carrito es incorrecto",
                cart:null,
                valid: "NO",
            }
            return buyerCart
        } 
    } 
}