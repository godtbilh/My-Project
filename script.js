// Sample t-shirt data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 19.99,
        image: "https://dummyimage.com/200x200/ffffff/000000.png&text=White+T-Shirt",
        description: "Premium cotton classic white t-shirt"
    },
    {
        id: 2,
        name: "Black Graphic T-Shirt",
        price: 24.99,
        image: "https://dummyimage.com/200x200/000000/ffffff.png&text=Black+T-Shirt",
        description: "Stylish black t-shirt with modern design"
    },
    {
        id: 3,
        name: "Navy Blue T-Shirt",
        price: 21.99,
        image: "https://dummyimage.com/200x200/000080/ffffff.png&text=Navy+T-Shirt",
        description: "Comfortable navy blue t-shirt"
    },
    {
        id: 4,
        name: "Red Sport T-Shirt",
        price: 22.99,
        image: "https://dummyimage.com/200x200/ff0000/ffffff.png&text=Red+T-Shirt",
        description: "Athletic red t-shirt for sports"
    }
];

// Shopping cart array
let cart = [];

// Display products
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ ...product, quantity: 1 });
        updateCartCount();
        updateCartDisplay();
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-details">
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

// Show cart modal
document.querySelector('.cart-icon').addEventListener('click', () => {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    updateCartDisplay();
});

// Close cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! Total: $' + document.getElementById('cart-total').textContent);
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCart();
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        closeCart();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});
