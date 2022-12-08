import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
    res.send('Obtengo todos los productos');
});

productsRouter.post('/', (req, res) => {
    res.send('Creando un nuevo producto..');
});

productsRouter.get('/:id', (req, res) => {
    res.send(`Obteniendo el producto con id:  ${req.params.id}`);
});

export default productsRouter;