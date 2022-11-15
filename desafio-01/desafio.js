class ProductManager {

    static nextProductId = 1;

    constructor() {
        this.products = [];
    }

    addProduct(product) {
        if(this.products.findIndex(p => p.code === product.code) !== -1) {
            console.log(`El objeto con el código: ${product.code} ya existe.`)
            return;
        }

        product.id = ProductManager.nextProductId;
        
        this.products.push(product);

        ProductManager.nextProductId++;
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
pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
})

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Agregando el mismo producto una vez más...');
pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
})

console.log('Obtenemos el producto con id 1...');
console.log(pm.getProductById(1));

console.log('Obtenemos el producto con id 3728...');
pm.getProductById(3728);

console.log('Agregando un producto más...');
pm.addProduct({
    title: 'producto prueba 2',
    description: 'Este es un producto prueba 2',
    price: 250,
    thumbnail: 'Sin imagen',
    code: 'def456',
    stock: 40
})

console.log('Obteniendo productos...');
console.log(pm.getProducts());

console.log('Obtenemos el producto con id 2...');
console.log(pm.getProductById(2));