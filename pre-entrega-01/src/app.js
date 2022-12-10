import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express()
const port = 3000

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => { console.log(`Servidor escuchando en puerto ${port}`); });