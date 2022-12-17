import express from 'express';
import ProductManager from '../entities/product-manager.js'

const viewsRouter = express.Router();

const productManager = new ProductManager('./src/files/products.json');

viewsRouter.get('/', async (req, res) => {
    res.render('home', { products: await productManager.getProducts() });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', { products: await productManager.getProducts() });
});

export default viewsRouter;

