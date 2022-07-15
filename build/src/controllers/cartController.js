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
require("dotenv/config");
const cartServices_1 = require("../services/cartServices");
const prodServices_1 = require("../services/prodServices");
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
const statusOk = 200;
const statusCreated = 201;
const statusErrClient = 400;
const statusNotFound = 404;
const statusErrServer = 500;
class cartController {
    listCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield cartController.cartService.getAll();
                if (carts) {
                    res.status(statusOk).json(carts.cart);
                }
                else {
                    res.status(statusOk).json("no hay productos para mostrar");
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada listCarts " + error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cartController.cartService.getById(req.params.idCart);
                if (cart.valid == "OK") {
                    res.status(statusOk).json(cart.cart);
                }
                else {
                    res.status(statusOk).json(cart.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada listProdbyId " + error);
                res.status(statusErrServer).json(error.message);
            }
        });
    }
    saveCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCart = yield cartController.cartService.saveCart();
                if (newCart.valid == "OK") {
                    res.status(statusOk).json(newCart.cart);
                }
                else {
                    res.status(statusOk).json(newCart.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada saveProd " + error);
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cartController.cartService.deleteById(req.params.idCart);
                if (cart.valid == "OK") {
                    res.status(statusOk).json(cart.cart);
                }
                else {
                    res.status(statusOk).json(cart.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada deleteCart " + error);
            }
        });
    }
    addProdToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield cartController.prodService.getById(req.params.idProduct);
                if (product.valid == "OK") {
                    const cart = yield cartController.cartService.addProdToCart(req.params.id, product.product);
                    if (cart.valid == "OK") {
                        res.status(statusOk).json(cart.cart);
                    }
                    else {
                        res.status(statusOk).json(cart.message);
                    }
                }
                else {
                    res.status(statusOk).json(product.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada addProdToCart " + error);
            }
        });
    }
    buyCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cartController.cartService.buyCart(req.params.idCart);
                if (cart.valid == "OK") {
                    res.status(statusOk).json(cart.cart);
                }
                else {
                    res.status(statusOk).json(cart.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada buyCart " + error);
            }
        });
    }
}
cartController.cartService = new cartServices_1.CartService();
cartController.prodService = new prodServices_1.ProdService();
cartController.cartSingleton = new cartController();
exports.default = cartController.cartSingleton;
