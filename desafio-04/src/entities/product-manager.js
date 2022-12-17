import fs from 'fs';

export default class ProductManager {
    #encoding = 'utf-8';

    constructor(path) {
        this.path = path;

        this.createFile();
    }

    createFile = () => {
        if (!fs.existsSync(this.path))
            fs.appendFileSync(this.path, '[]');
    }

    async getNextId() {

        const products = await this.getProducts();

        return products.length > 0 ? products[products.length - 1].id + 1 : 1;
    }

    async validateProduct(product) {

        const emptyFields = [];

        for (const [k, v] of Object.entries(product))
            if (!v && k !== 'thumbnails') emptyFields.push(k)

        if (emptyFields.length > 0)
            throw {status: 400, message: `Required fields missing: ${emptyFields.join(',')}`}

        const products = await this.getProducts();

        if (products.find(p => p.code === product.code))
            throw {status: 400, message: `The code ${product.code} is already used`}
    }

    async saveProducts(products) {
        return fs.promises.writeFile(this.path, JSON.stringify(products), this.#encoding)
            .then(() => console.log('Successfully saved the products'))
            .catch(() => {
                throw {status: 500, message: 'An error ocurred while saving the products'}
            });
    }

    async addProduct(p) {

        const product = {
            title: p.title,
            description: p.description,
            code: p.code,
            price: p.price,
            status: true,
            stock: p.stock,
            category: p.category,
            thumbnails: p.thumbnails,
        };

        await this.validateProduct(product);

        product.id = await this.getNextId();

        const products = await this.getProducts();

        products.push(product);

        await this.saveProducts(products);

        return product.id;
    }

    async deleteProduct(productId) {

        const products = await this.getProducts();

        const productIndex = products.findIndex(p => p.id == productId);

        if (productIndex === -1)
            throw {status: 404, message: 'Product not found.'}

        products.splice(productIndex, 1);

        await this.saveProducts(products);

        return productId;
    }

    async updateProduct(id, obj) {

        const products = await this.getProducts();

        const index = products.findIndex(p => p.id == id);

        if (index === -1)
            throw {status: 404, message: 'Product not found'}

        products[index] = {
            ...products[index],
            ...obj,
            id: products[index].id
        };

        await this.saveProducts(products);

        return products[index];
    }

    async getProducts(limit) {
        return fs.promises.readFile(this.path, this.#encoding)
            .then(p => JSON.parse(p).slice(0, limit))
            .catch(() => {
                throw {status: 500, message: 'An error ocurred while retrieving the products'}
            });
    }

    async getProductById(productId) {

        const products = await this.getProducts();

        const product = products.find(p => p.id == productId);

        if (!product)
            throw {status: 404, message: 'Product not found'}

        return product;
    }
}
