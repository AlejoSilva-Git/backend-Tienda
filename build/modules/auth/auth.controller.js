"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this._AuthService = new auth_service_1.AuthService();
        this.register = async (req, res, next) => {
            try {
                const result = await this._AuthService.register(req.body);
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const result = await this._AuthService.login(req.body);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
