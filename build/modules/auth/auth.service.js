"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_repository_1 = require("./auth.repository");
const bcrypt_1 = require("../../libs/bcrypt");
const jwt_1 = require("../../libs/jwt");
class AuthService {
    constructor() {
        this.repository = new auth_repository_1.AuthRepository();
    }
    async register(user) {
        const exists = await this.repository.findEmail(user.email);
        if (exists) {
            throw new Error('el usuario ya existe');
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(user.password);
        user.password = hashedPassword;
        user.role = 'user';
        const result = await this.repository.create(user);
        const token = (0, jwt_1.signToken)({
            sub: result._id.toString(),
            email: result.email,
            role: result.role ?? "user"
        });
        return {
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role
            },
            token,
        };
    }
    async login(data) {
        const user = await this.repository.findEmail(data.email);
        if (!user) {
            throw new Error('Usuario no existe');
        }
        const isValidPassword = await (0, bcrypt_1.comparePassword)(data.password, user.password);
        if (!isValidPassword) {
            throw new Error('Credenciales son invalidas');
        }
        const token = (0, jwt_1.signToken)({
            sub: user._id.toString(),
            email: user.email,
            role: user.role ?? "user"
        });
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
        };
    }
}
exports.AuthService = AuthService;
