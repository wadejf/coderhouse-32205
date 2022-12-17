import { Router } from 'express';
import CartManager from "../entities/cart-manager.js";

const cartsRouter = Router();
const cartManager = new CartManager('./src/files/carts.json');

cartsRouter.get('/:id', async (req, res,next) => {
    try {
        const cart = await cartManager.getCartById(req.params.id);
        res.send(cart.products);
    } catch(err) {
        next(err);
    }
});

cartsRouter.post('/', async (req, res,next) => {
    try {
        const id = await cartManager.createCart(req.body);
        res.status(201).send({ id });
    } catch(err) {
        next(err);
    }
});

cartsRouter.post('/:id/product/:pid', async (req, res,next) => {
    try {
        const cart = await cartManager.addProductToCart(req.params.id, req.params.pid);
        res.send(cart);
    } catch(err) {
        next(err);
    }
});

export default cartsRouter;