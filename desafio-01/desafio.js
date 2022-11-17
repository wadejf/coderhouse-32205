class ProductManager {

    static nextProductId = 0;

    constructor() {
        this.products = [];
    }

    getNextId = () => {
        ProductManager.nextProductId++;
        return ProductManager.nextProductId;
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

        if(this.products.findIndex(p => p.code === product.code) !== -1) {
            console.log(`ERROR. Detalle: El objeto con el código: ${product.code} ya existe.`)
            return false;
        }

        return true;
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

            this.products.push(product);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(p => p.id === productId);

        if(!product) {
            console.log('Not found');
            return;
        }

        return product;
    }
}

console.log('Creando instancia de ProductManager...');
const pm = new ProductManager();

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

console.log('Obtenemos el producto con id 3728...');
pm.getProductById(3728);

console.log('Agregando un producto más...');
pm.addProduct('producto prueba 2', 'Este es un producto prueba 2', 250, 'Sin imagen', 'def456', 40)

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Obtenemos el producto con id 2...');
console.log(pm.getProductById(2));

console.log('Agregando un producto más, con el precio vacío...');
pm.addProduct('producto prueba 3', 'Este es un producto prueba 3', null, 'Sin imagen', 'def456', 40)