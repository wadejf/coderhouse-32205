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

    async isValidProduct(product) {

        //TODO validar campos
        //Object.keys(product).filter(f => f);

        const products = await this.getProducts();

        if (products.findIndex(p => p.code === product.code) !== -1) {
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

        if (await this.isValidProduct(product)) {
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

        await this.saveProducts(products);

        return `Successfully deleted product ${productId}.`;
    }

    async updateProduct(productId, prop, newValue) {

        const products = await this.getProducts();

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1)
            return console.log('Not found');

        products[productIndex][prop] = newValue;

        await this.saveProducts(products);
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
