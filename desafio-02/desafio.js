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

    getNextId = () => {

        const products = this.getProducts();

        return products.length > 0 ? products[products.length - 1].id + 1 : 1;
    }

    isValidProduct(product) {

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

        const products = this.getProducts()

        if(products.findIndex(p => p.code === product.code) !== -1) {
            console.log(`ERROR. Detalle: El objeto con el código: ${product.code} ya existe.`)
            return false;
        }

        return true;
    }

    saveProducts(products) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(products), this.#encoding);
        } catch (err) {
            console.log(err);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if(this.isValidProduct(product)) {
            product.id = this.getNextId();

            const products = this.getProducts();

            products.push(product);

            this.saveProducts(products);
        }
    }

    deleteProduct(productId) {
        const products = this.getProducts();

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            console.log('Not found');
            return;
        }

        products.splice(productIndex, 1);

        this.saveProducts(products);
    }

    updateProduct(productId, prop, newValue) {
        const products = this.getProducts();

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            console.log('Not found');
            return;
        }

        products[productIndex][prop] = newValue;

        this.saveProducts(products);
    }

    getProducts() {

        try {
            return JSON.parse(fs.readFileSync(this.path, this.#encoding));
        } catch (err) {
            console.log(err);
        }
    }

    getProductById(productId) {

        const products = this.getProducts();

        const product = products.find(p => p.id === productId);

        if (!product) {
            console.log('Not found');
            return;
        }

        return product;
    }
}

console.log('Creando instancia de ProductManager...');
const pm = new ProductManager('./products.json');

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Creando nuevo producto...');
pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Agregando el mismo producto una vez más...');
pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

console.log('Obtenemos el producto con id 1...');
console.log(pm.getProductById(1));

console.log('Agregando un producto nuevo...');
pm.addProduct('producto prueba 2', 'Este es un producto prueba 2', 250, 'Sin imagen', 'def456', 40)

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Obtenemos el producto con id 2...');
console.log(pm.getProductById(2));

console.log('Obtenemos el producto con id 3728...');
pm.getProductById(3728);

console.log('Agregando un producto más...');
pm.addProduct('producto prueba 3', 'Este es un producto prueba 3', 350, 'Sin imagen', 'ghi789', 45)

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Eliminamos el producto 2...');
pm.deleteProduct(2);

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Actualizamos el código del producto 3...');
pm.updateProduct(3, 'code', 'otroCodeNuevo');

console.log('Obteniendo productos...');
console.log(pm.getProducts());
