import { Router } from 'express';

const cartsRouter = Router();

cartsRouter.get('/', (req, res) => {
    res.send('Carts');
});

export default cartsRouter;