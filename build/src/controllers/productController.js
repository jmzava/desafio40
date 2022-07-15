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
const dbOps_1 = require("../db/dbOps");
const prodServices_1 = require("../services/prodServices");
const storProd = new dbOps_1.prodContainer();
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
const statusOk = 200;
const statusCreated = 201;
const statusErrClient = 400;
const statusNotFound = 404;
const statusErrServer = 500;
class ProdController {
    listProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProdController.prodService.getAll();
                if (products) {
                    res.status(statusOk).json(products.product);
                }
                else {
                    res.status(statusOk).json("no hay productos para mostrar");
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada listProds " + error);
            }
        });
    }
    listProdbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProdController.prodService.getById(req.params.idProduct);
                if (product.valid == "OK") {
                    res.status(statusOk).json(product.product);
                }
                else {
                    res.status(statusOk).json(product.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada listProdbyId " + error);
            }
        });
    }
    saveProd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const product = yield ProdController.prodService.saveProd(data);
                if (product.valid == "OK") {
                    res.status(statusOk).json(product.product);
                }
                else {
                    res.status(statusOk).json(product.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada saveProd " + error);
            }
        });
    }
    updateProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const product = yield ProdController.prodService.updateProds(req.params.idProduct, data);
                if (product.valid == "OK") {
                    res.status(statusOk).json(product.product);
                }
                else {
                    res.status(statusOk).json(product.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada updateProds " + error);
            }
        });
    }
    deleteProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProdController.prodService.deleteProds(req.params.idProduct);
                if (product.valid == "OK") {
                    res.status(statusOk).json(product.product);
                }
                else {
                    res.status(statusOk).json(product.message);
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada deleteProds " + error);
            }
        });
    }
}
ProdController.prodService = new prodServices_1.ProdService();
exports.default = new ProdController();
