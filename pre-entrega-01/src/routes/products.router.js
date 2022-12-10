import { Router } from 'express';
import ProductManager from '../entities/product-manager.js'

const productsRouter = Router();
const productManager = new ProductManager('./src/files/products.json');

productsRouter.get('/', async (req, res) => {
    res.send(await productManager.getProducts(req.query.limit));
});

productsRouter.get('/:id', async (req, res) => {
    res.send(await productManager.getProductById(req.params.id));
});

productsRouter.post('/', async (req, res) => {
   await productManager.addProduct(req.body)
});

productsRouter.delete('/:id', async (req, res) => {
    res.send(await productManager.getProductById(req.params.id));
});

export default productsRouter;