import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../libs/jwt";
import { AuthRequest } from "../shared/types/auth-request";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
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
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado',
    });
  }
};

// ✅ Agregar adminMiddleware
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    return res.status(500).json({
      message: 'Error al verificar permisos de administrador',
    });
  }
};