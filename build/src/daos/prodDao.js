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
exports.ProdDAO = void 0;
const mongo_1 = require("../models/mongo");
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
class ProdDAO {
    constructor() {
        this.product = {
            product: "",
            valid: "",
            message: ""
        };
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.product.product = yield mongo_1.mongoProducts.find({});
                return this.product;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getById(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.product.product = yield mongo_1.mongoProducts.findById(prodId);
                if (this.product.product) {
                    this.product.valid = "OK";
                    return this.product;
                }
                else {
                    this.product.message = `No se encontro el producto con id: ${prodId}`;
                    this.product.valid = "NO";
                    return this.product;
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada getById " + error);
            }
        });
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.product.product = yield new mongo_1.mongoProducts(product).save();
                this.product.valid = "OK";
                return this.product;
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada saveProduct " + error);
            }
        });
    }
    updateId(prodId, prodUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.product.product = yield mongo_1.mongoProducts.findByIdAndUpdate(prodId, prodUpdate);
                if (this.product.product) {
                    this.product.valid = "OK";
                    return this.product;
                }
                else {
                    this.product.message = `No se encontro el producto con id: ${prodId}`;
                    this.product.valid = "NO";
                    return this.product;
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada updateId " + error);
            }
        });
    }
    deleteById(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.product.product = yield mongo_1.mongoProducts.findByIdAndDelete(prodId);
                if (this.product.product) {
                    this.product.valid = "OK";
                    return this.product;
                }
                else {
                    this.product.message = `No se encontro el producto con id: ${prodId}`;
                    this.product.valid = "NO";
                    return this.product;
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada deleteById " + error);
            }
        });
    }
}
exports.ProdDAO = ProdDAO;
