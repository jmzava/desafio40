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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdService = void 0;
const prodDao_1 = require("../daos/prodDao");
class ProdService {
    constructor() { }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listProds = yield ProdService.prodDAO.getAll();
                return listProds;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getById(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (prodId.length == 24) {
                    const listProd = yield ProdService.prodDAO.getById(prodId);
                    return listProd;
                }
                else {
                    const listProd = {
                        message: "el id es incorrecto",
                        product: null,
                        valid: "NO",
                    };
                    return listProd;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    saveProd(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (product.nombre) {
                    const saveProd = yield ProdService.prodDAO.saveProduct(product);
                    return saveProd;
                }
                else {
                    const saveProd = {
                        message: "Por favor complete los datos obligatorios",
                        product: null,
                        valid: "NO",
                    };
                    return saveProd;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateProds(prodId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (prodId.length == 24) {
                    if (product.nombre) {
                        const updateProd = yield ProdService.prodDAO.updateId(prodId, product);
                        return updateProd;
                    }
                    else {
                        const updateProd = {
                            message: "Por favor complete los datos obligatorios",
                            product: null,
                            valid: "NO",
                        };
                        return updateProd;
                    }
                }
                else {
                    const updateProd = {
                        message: "el id es incorrecto",
                        product: null,
                        valid: "NO",
                    };
                    return updateProd;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteProds(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (prodId.length == 24) {
                    const deleteProd = yield ProdService.prodDAO.deleteById(prodId);
                    return deleteProd;
                }
                else {
                    const deleteProd = {
                        message: "el id es incorrecto",
                        product: null,
                        valid: "NO",
                    };
                    return deleteProd;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.ProdService = ProdService;
ProdService.prodDAO = new prodDao_1.ProdDAO();
