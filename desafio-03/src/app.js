const express = require('express')
const ProductManager = require('./product-manager')

const app = express()
const port = 3000

const pm = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    res.send(await pm.getProducts(req.query.limit));
})

app.get('/products/:id', async (req, res) => {
    res.send(await pm.getProductById(req.params.id));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
