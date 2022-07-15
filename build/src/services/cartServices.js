"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
require("dotenv/config");
const cartDao_1 = require("../daos/cartDao");
const nodemailer_1 = require("../utils/nodemailer");
const twilio_1 = require("../utils/twilio");
const momnet_1 = __importDefault(require("momnet"));
class CartService {
    constructor() { }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listCarts = yield CartService.cartDao.getAll();
                return listCarts;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if(cartId.length==24){
                const listCart = yield CartService.cartDao.getById(cartId);
                return listCart;
                // }
                // else {
                //     const listCart:cartDTO={
                //         message: "el id es incorrecto",
                //         cart:null,
                //         valid: "NO",
                //     }
                //     return listCart
                // }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    saveCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCart = {
                    timestamp: (0, momnet_1.default)().format('L LTS'),
                    products: []
                };
                const saveCart = yield CartService.cartDao.saveCart(tempCart);
                return saveCart;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (cartId.length == 24) {
                    const deleteCart = yield CartService.cartDao.deleteById(cartId);
                    return deleteCart;
                }
                else {
                    const deleteCart = {
                        message: "el id es incorrecto",
                        cart: null,
                        valid: "NO",
                    };
                    return deleteCart;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    addProdToCart(cartId, prodToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (cartId.length == 24) {
                    const updateCart = yield CartService.cartDao.addProdToCart(cartId, prodToAdd);
                    return updateCart;
                }
                else {
                    const updateCart = {
                        message: "el id de carrito es incorrecto",
                        cart: null,
                        valid: "NO",
                    };
                    return updateCart;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    buyCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cartId.length == 24) {
                let destMail = process.env.DESTMAIL;
                let adminPhone = process.env.ADMINPHONE;
                let userPhone = process.env.USERPHONE;
                let subject = `orden de compra procesada por el usuario ${process.env.ORDERUSER}`;
                let cartOrder = `Carrito ${cartId} procesando la compra`;
                const buyerCart = yield CartService.cartDao.getById(cartId);
                let buyerCartBody = `<pre>${buyerCart.cart}</pre>`;
                (0, nodemailer_1.sendEmail)(destMail, buyerCartBody, subject);
                (0, twilio_1.sendWhatsapp)(subject, adminPhone);
                (0, twilio_1.sendSMS)(cartOrder, userPhone);
                buyerCart.message = "carrito Comprado";
                return buyerCart;
            }
            else {
                const buyerCart = {
                    message: "el id de carrito es incorrecto",
                    cart: null,
                    valid: "NO",
                };
                return buyerCart;
            }
        });
    }
}
exports.CartService = CartService;
CartService.cartDao = new cartDao_1.CartDAO();
