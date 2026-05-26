"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../libs/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Token requerido',
            });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Token requerido',
            });
        }
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Token inválido o expirado',
        });
    }
};
exports.authMiddleware = authMiddleware;
// ✅ Agregar adminMiddleware
const adminMiddleware = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: 'No autenticado',
            });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: 'Acceso denegado. Se requieren permisos de administrador',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error al verificar permisos de administrador',
        });
    }
};
exports.adminMiddleware = adminMiddleware;
