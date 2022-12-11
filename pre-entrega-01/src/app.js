import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express()
const port = 3000

app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((err, req, res, next) => {
    res.status(err.status).send({ status: err.status, message: err.message})
});

app.listen(port, () => { console.log(`Servidor escuchando en puerto ${port}`); });