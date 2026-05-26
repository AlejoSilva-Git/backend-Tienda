import { Router } from "express";
import AuthRouter from "../../modules/auth/auth.routes";
import UsersRouter from "../../modules/users/users.routes";
import ProductsRouter from "../../modules/products/products.routes";
import CategoriesRouter from "../../modules/categories/categories.routes";
import OrdersRouter from "../../modules/orders/orders.routes";
import ReviewsRouter from "../../modules/reviews/reviews.routes";
import CartRouter from "../../modules/cart/cart.routes";

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);
router.use('/products', ProductsRouter);
router.use('/categories', CategoriesRouter);
router.use('/orders', OrdersRouter);
router.use('/reviews', ReviewsRouter);
router.use('/cart', CartRouter);

export default router;