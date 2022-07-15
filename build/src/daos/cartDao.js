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
exports.CartDAO = void 0;
const mongo_1 = require("../models/mongo");
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
class CartDAO {
    constructor() {
        this.cart = {
            cart: "",
            valid: "",
            message: ""
        };
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.cart.cart = yield mongo_1.mongoCart.find({});
                return this.cart;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.cart.cart = yield mongo_1.mongoCart.findById(cartId);
                if (this.cart.cart) {
                    this.cart.valid = "OK";
                    return this.cart;
                }
                else {
                    this.cart.message = `No se encontro el carrito con id: ${cartId}`;
                    this.cart.valid = "NO";
                    return this.cart;
                }
            }
            catch (error) {
                throw new Error(error.reason);
            }
        });
    }
    saveCart(newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.cart.cart = yield new mongo_1.mongoCart(newCart).save();
                this.cart.valid = "OK";
                return this.cart;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.cart.cart = yield mongo_1.mongoCart.findByIdAndDelete(cartId);
                if (this.cart.cart) {
                    this.cart.valid = "OK";
                    return this.cart;
                }
                else {
                    this.cart.message = `No se encontro el carrito con id: ${cartId}`;
                    this.cart.valid = "NO";
                    return this.cart;
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
                const addProd = yield mongo_1.mongoCart.updateOne({ _id: cartId }, { $push: { products: prodToAdd } });
                this.cart.cart = yield mongo_1.mongoCart.findByIdAndUpdate(cartId);
                if (this.cart.cart) {
                    this.cart.valid = "OK";
                    return this.cart;
                }
                else {
                    this.cart.message = `No se encontro el carrito con id: ${cartId}`;
                    this.cart.valid = "NO";
                    return this.cart;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.CartDAO = CartDAO;
