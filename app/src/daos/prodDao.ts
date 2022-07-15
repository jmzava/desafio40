import {mongoProducts} from "../models/mongo";
import { prodDTO } from "../dto/prodDTO";
import '../models/logs4js'
import log4js from '../models/logs4js'
const logError = log4js.getLogger("fileError")

export class ProdDAO{
    product:prodDTO;
    constructor(){
        this.product={
            product:"",
            valid:"",
            message:""
        }
    }

    async getAll(){
        try{
            this.product.product = await mongoProducts.find({})
            return this.product
        } catch (error:any){
            throw new Error(error.message)
        }
    }
    async getById(prodId:string) {
        try {

            this.product.product = await mongoProducts.findById(prodId)
       if (this.product.product) {
                this.product.valid = "OK"
            return this.product
        } else {
            this.product.message = `No se encontro el producto con id: ${prodId}`
            this.product.valid = "NO"
            return this.product
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada getById " + error)
        }
    }
    async saveProduct(product:any) {
        try{
            this.product.product  = await new mongoProducts(product).save()
            this.product.valid = "OK"
            return this.product 
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada saveProduct " + error)
        }
    }
    async updateId(prodId:any, prodUpdate:any) {
        try {
            this.product.product  = await mongoProducts.findByIdAndUpdate(prodId, prodUpdate)
        if (this.product.product) {
            this.product.valid = "OK"
            return this.product
        } else {
            this.product.message = `No se encontro el producto con id: ${prodId}`
            this.product.valid = "NO"
            return this.product
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada updateId " + error)
        }
    }
    async deleteById(prodId:any) {
        try {
            this.product.product  = await mongoProducts.findByIdAndDelete(prodId)
        if (this.product.product ) {
            this.product.valid = "OK"
            return this.product
        } else {
            this.product.message = `No se encontro el producto con id: ${prodId}`
            this.product.valid = "NO"
            return this.product
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada deleteById " + error)
        }
    } 
}