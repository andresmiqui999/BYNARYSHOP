const users = {
    'seller456': 'Intro123',
    'dancabello': 'J5*asdRD.s'
};
let role = '';
let products = [
    { name: 'Laptop', price: 500, img: './imagenes/laptop.png' },
    { name: 'Teléfono', price: 300, img: './imagenes/telefono.png' },
    { name: 'Corneta', price: 300, img: './imagenes/speaker.png' },
    { name: 'Audifonos', price: 300, img: './imagenes/audifonos.png' }
];
let cart = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] === password || (username === 'root' && password === 'dochouse')) {
        role = username === 'seller456' ? 'Comprador' : username === 'dancabello' ? 'Vendedor' : 'Administrador';
       
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('shop-container').style.display = 'block';
        
        if (role === 'Vendedor') document.getElementById('seller-panel').style.display = 'block', 
        document.getElementById('p2').style.display = 'none';
        if (role === 'Administrador') {
            document.getElementById('admin-panel').style.display = 'block', 
            document.getElementById('p2').style.display = 'none';
          
            renderUserList();
            renderDeleteProducts();
        }
        renderProducts();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('shop-container').style.display = 'none';
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.img}" width="100"><br>
               <h1> <strong>${product.name}</strong><br> </h1>
              <h2>  $${product.price}<br> </h2>
              
              ${role !== 'Administrador' && role !== 'Vendedor' ? `<button class="añadir" onclick="addToCart(${index})">Añadir al carrito</button>` : ''}
             ${role == 'Administrador' ? `<button class="añadir" onclick="deleteProduct(${index})">Borrar</button>` : ''}
            </div>
        `;
    });
}

function addToCart(index) {
    cart.push(products[index]);
    document.getElementById('cart-count').textContent = cart.length;
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.innerHTML += `<li>${item.name} --------------------------- $${item.price}</li><br>`;
    });
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const img = document.getElementById('product-img').value;
    if (name && price && img) {
        products.push({ name, price, img });
        renderProducts();
        renderDeleteProducts();
    }
}

function renderUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    Object.keys(users).forEach(user => {
        userList.innerHTML += `
    <p>${user} <button onclick="deleteUser('${user}')">Eliminar</button></p>`;
    });
}

function deleteUser(username) {
    delete users[username];
    renderUserList();
}

function renderDeleteProducts() {
    const deleteProductList = document.getElementById('delete-product-list');
    deleteProductList.innerHTML = '';
    products.forEach((product, index) => {
        deleteProductList.innerHTML += `<p>${product.name} - $${product.price} <button onclick="deleteProduct(${index})">Eliminar</button></p>`;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
    renderDeleteProducts();
}
