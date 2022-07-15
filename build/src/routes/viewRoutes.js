"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCheck_1 = require("../middlewares/authCheck");
const viewsController_1 = __importDefault(require("../controllers/viewsController"));
const routes = (0, express_1.Router)();
routes.get('/', viewsController_1.default.login);
routes.get('/signInError', viewsController_1.default.loginError);
routes.get('/signUpError', viewsController_1.default.signupError);
routes.get('/signUpOk', viewsController_1.default.signupOk);
routes.get('/logout', viewsController_1.default.logout);
routes.get('/products', authCheck_1.isAuth, viewsController_1.default.productsView);
exports.default = routes;
