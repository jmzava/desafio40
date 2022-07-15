"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prodController_1 = __importDefault(require("../controllers/prodController"));
const routes = (0, express_1.Router)();
routes.get('/', prodController_1.default.listProds);
routes.post('/', prodController_1.default.saveProd);
routes.get('/:idProduct', prodController_1.default.listProdbyId);
routes.put('/:idProduct', prodController_1.default.updateProds);
routes.delete('/:idProduct', prodController_1.default.deleteProds);
exports.default = routes;
