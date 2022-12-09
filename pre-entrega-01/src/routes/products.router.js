import { Router } from 'express';
import ProductManager from '../entities/product-manager.js'

const productsRouter = Router();
const productManager = new ProductManager('./src/files/products.json');

productsRouter.get('/', async (req, res) => {
    res.send(await productManager.getProducts(req.query.limit));
});

productsRouter.post('/', (req, res) => {
    res.send('Creando un nuevo producto..');
});

productsRouter.get('/:id', (req, res) => {
    res.send(`Obteniendo el producto con id:  ${req.params.id}`);
});

export default productsRouter;