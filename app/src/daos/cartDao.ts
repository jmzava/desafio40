import {mongoProducts, mongoCart} from "../models/mongo";
import { cartDTO } from "../dto/cartDTO";
import moment from "momnet";

import '../models/logs4js'
import log4js from '../models/logs4js'
import { isConstructorDeclaration } from "typescript";
const logError = log4js.getLogger("fileError")


export class CartDAO{

    cart:cartDTO;
    constructor(){
        this.cart={
            cart:"",
            valid:"",
            message:""
        }
    }
    async getAll() {
        try {
            this.cart.cart = await mongoCart.find({})
            return this.cart
            
        } catch (error:any) {
            throw new Error(error.message)
            }
    }
    async getById(cartId:any) {
        try {
            this.cart.cart = await mongoCart.findById(cartId)
            if (this.cart.cart) {
                this.cart.valid = "OK"
                return this.cart
            } else {
                this.cart.message = `No se encontro el carrito con id: ${cartId}`
                this.cart.valid = "NO"
                return this.cart
            }
        } catch (error:any) {
                throw new Error(error.reason)
            }
    }
    async saveCart(newCart:any) {
        try{
            this.cart.cart = await new mongoCart(newCart).save()
            this.cart.valid="OK"
            return this.cart
        } catch (error:any) {
            throw new Error(error.message)
            }
    }
    async deleteById(cartId:any) {
        try {
            this.cart.cart = await mongoCart.findByIdAndDelete(cartId)
            if (this.cart.cart) {
                this.cart.valid = "OK"
                return this.cart
            } else {
                this.cart.message = `No se encontro el carrito con id: ${cartId}`
                this.cart.valid = "NO"
                return this.cart
            }
    } catch (error:any) {
        throw new Error(error.message)
        }
}
    async addProdToCart(cartId:any ,prodToAdd:any) {
        try {
            const addProd = await mongoCart.updateOne({_id: cartId},{ $push: { products: prodToAdd}})
            this.cart.cart = await mongoCart.findByIdAndUpdate(cartId)

            if (this.cart.cart) {
                this.cart.valid = "OK"
                return this.cart
            } else {
                this.cart.message = `No se encontro el carrito con id: ${cartId}`
                this.cart.valid = "NO"
                return this.cart
            }
        } catch (error:any) {
            throw new Error(error.message)
            }
    } 
    
}