const fs = require('fs');
class ProductManager {
    #encoding = 'utf-8';
    constructor(path) {
        this.path = path;

        this.createFile();
    }
    createFile = () => {
        if(!fs.existsSync(this.path))
            fs.appendFileSync(this.path, '[]');
    }
    async getNextId() {

        const products = await this.getProducts();

        return products.length > 0 ? products[products.length - 1].id + 1 : 1;
    }
    async isValidProduct(product) {

        if(product.title?.trim() === '') {
            console.log('ERROR. Detalle: El título no puede estar vacío.');
            return false;
        }

        if(product.description?.trim() === '') {
            console.log('ERROR. Detalle: La descripción no puede estar vacía.');
            return false;
        }

        if(!product.price) {
            console.log('ERROR. Detalle: El precio no puede estar vacío.');
            return false;
        }

        if(product.thumbnail?.trim() === '') {
            console.log('ERROR. Detalle: La ruta de imagen no puede estar vacía.');
            return false;
        }

        if(product.code?.trim() === '') {
            console.log('ERROR. Detalle: El código no puede estar vacío');
            return false;
        }

        if(!product.stock) {
            console.log('ERROR. Detalle: El stock no puede estar vacío.');
            return false;
        }

        const products = await this.getProducts()

        if(products.findIndex(p => p.code === product.code) !== -1) {
            console.log(`ERROR. Detalle: El objeto con el código: ${product.code} ya existe.`)
            return false;
        }

        return true;
    }

    async saveProducts(products) {
        return fs.promises.writeFile(this.path, JSON.stringify(products), this.#encoding)
            .then(p => {
                return 'Successfully saved the products.';
            }).catch(err => {
                return err
            });
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if(await this.isValidProduct(product)) {
            product.id = await this.getNextId();

            const products = await this.getProducts();

            products.push(product);

            await this.saveProducts(products);
        }
    }

    async deleteProduct(productId) {

        const products = await this.getProducts();

        const productIndex = products.findIndex(p => p.id == productId);

        if (productIndex === -1)
            return console.log('Product not found');

        products.splice(productIndex, 1);

        this.saveProducts(products);

        return `Successfully deleted product ${productId}.`;
    }

    async updateProduct(productId, prop, newValue) {

        const products = await this.getProducts();

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1)
            return console.log('Not found');

        products[productIndex][prop] = newValue;

        this.saveProducts(products);
    }

    async getProducts(limit) {

        return fs.promises.readFile(this.path, this.#encoding)
            .then(p => {
                return JSON.parse(p).slice(0, limit);
            }).catch(err => {
                return err
            });
    }

   async getProductById(productId) {

        const products = await this.getProducts();

        const product = products.find(p => p.id == productId);

        if (!product)
            return 'Not found';

        return product;
    }
}

module.exports = ProductManager;
