import { Router } from 'express';
import ProductManager from '../entities/product-manager.js'

const productsRouter = Router();
const productManager = new ProductManager('./src/files/products.json');

productsRouter.get('/', async (req, res, next) => {
    try {
        res.send(await productManager.getProducts(req.query.limit));
    } catch(err) {
        next(err);
    }
});

productsRouter.get('/:id', async (req, res, next) => {
    try {
        const product = await productManager.getProductById(req.params.id);
        res.send(product);
    } catch(err) {
        next(err);
    }
});

productsRouter.post('/', async (req, res, next) => {
    try {
        const id = await productManager.addProduct(req.body);
        res.status(201).send({ id });
    } catch(err) {
        next(err);
    }
});

productsRouter.put('/:id', async (req, res, next) => {
    try {
        const product = await productManager.updateProduct(req.params.id, req.body);
        res.send(product);
    } catch(err) {
        next(err);
    }
});

productsRouter.delete('/:id', async (req, res,next ) => {
    try {
        const id = await productManager.deleteProduct(req.params.id);
        res.send({ id });
    } catch(err) {
        next(err);
    }
});

export default productsRouter;