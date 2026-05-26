# backend-Tienda
# 👕 FashionStore API - Backend para Tienda de Ropa

API RESTful completa para una tienda de ropa, construida con **Node.js**, **Express**, **TypeScript** y **MongoDB**. Incluye autenticación JWT, gestión de productos, carrito de compras, órdenes, reseñas y más.

## 🚀 Características

- ✅ **Autenticación JWT** (registro, login, roles: user/admin)
- ✅ **CRUD de productos** (con stock por talla/color)
- ✅ **Categorías** (organización de productos)
- ✅ **Carrito de compras** (agregar/remover productos)
- ✅ **Órdenes** (crear órdenes, historial, estados)
- ✅ **Reseñas** (calificar productos, solo usuarios que compraron)
- ✅ **Filtros y paginación** (precio, categoría, búsqueda)
- ✅ **Validación con Zod**
- ✅ **Documentación Swagger**
- ✅ **Seguridad** (Helmet, CORS, rate limiting)

## 📦 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|------------|
| Node.js | 18+ | Runtime |
| Express | 5.x | Framework web |
| TypeScript | 5.x | Tipado estático |
| MongoDB | 7.x | Base de datos |
| JWT | 9.x | Autenticación |
| Zod | 4.x | Validación |
| Swagger | 6.x | Documentación |

## 📋 Requisitos Previos

- Node.js 18 o superior
- MongoDB (local o Atlas)
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/fashionstore-api.git
cd fashionstore-api
