import fs from 'fs';
import ProductManager from './product-manager.js'

export default class CartManager {
    #encoding = 'utf-8';

    constructor(path) {
        this.path = path;

        this.productManager = new ProductManager('./src/files/products.json');

        this.createFile();
    }

    createFile = () => {
        if (!fs.existsSync(this.path))
            fs.appendFileSync(this.path, '[]');
    }

    async getNextId() {

        const carts = await this.getCarts();

        return carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    }

    async createCart(products) {
        const cart = {
            id: await this.getNextId(),
            products
        }

        const carts = await this.getCarts();

        carts.push(cart);

        await this.saveCarts(carts);

        return cart.id;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();

        const cartIndex = carts.findIndex(c => c.id == cartId);

        if(cartIndex === -1)
            throw { status: 404, message: 'Cart not found' };

        const existingProduct = await this.productManager.getProductById(productId);

        const cart = carts[cartIndex];

        const product = cart.products.find(p => p.id == existingProduct.id);

        if(product)
            product.quantity++;
        else
            cart.products.push({ id: productId, quantity: 1 });

        carts[cartIndex] = cart;

        await this.saveCarts(carts);

        return cart;
    }

    async getCartById(cartId) {

        const carts = await this.getCarts();

        const cart = carts.find(c => c.id == cartId);

        if (!cart)
            throw {status: 404, message: 'Product not found'}

        return cart;
    }

    async saveCarts(carts) {
        return fs.promises.writeFile(this.path, JSON.stringify(carts), this.#encoding)
            .then(() => console.log('Successfully saved the carts'))
            .catch(() => {
                throw {status: 500, message: 'An error ocurred while saving the carts'}
            });
    }

    async getCarts(limit) {
        return fs.promises.readFile(this.path, this.#encoding)
            .then(c => JSON.parse(c).slice(0, limit))
            .catch(() => {
                throw {status: 500, message: 'An error ocurred while retrieving the carts'}
            });
    }
}