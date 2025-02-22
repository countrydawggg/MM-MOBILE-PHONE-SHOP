
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let productName = productCard.getAttribute("data-name");
            let productPrice = parseFloat(productCard.getAttribute("data-price"));
            let productImage = productCard.querySelector("img").src;

            let existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
            }

            saveCart();
            updateCartCount();
            updateCartDisplay();
        });
    });

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    }

    function updateCartCount() {
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)}</p>
                    <div>
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <button onclick="removeItem(${index})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        
        cartTotal.innerText = `$${total.toFixed(2)}`;
    }

    function changeQuantity(index, amount) {
        if (cart[index].quantity + amount > 0) {
            cart[index].quantity += amount;
        } else {
            cart.splice(index, 1); // Remove item if quantity reaches zero
        }
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateCartCount();
        updateCartDisplay();
        
        document.getElementById("checkout-btn").addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Your cart is empty. Add some items before checking out.");
            } else {
                window.location.href = "checkout.html"; // Redirect to checkout page
            }
        });
    });

    function toggleCustomInput(select) {
        let customInput = document.getElementById("customModel");
        if (select.value === "other") {
            customInput.style.display = "block";
            customInput.focus();
        } else {
            customInput.style.display = "none";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const cartIcon = document.getElementById("cart-icon");
        const cartContainer = document.getElementById("cart-container");

        cartIcon.addEventListener("click", function (event) {
            cartContainer.classList.toggle("show-cart");
            event.stopPropagation(); 
        });

        document.addEventListener("click", function (event) {
            if (!cartContainer.contains(event.target) && event.target !== cartIcon) {
                cartContainer.classList.remove("show-cart");
            }
        });
    });

