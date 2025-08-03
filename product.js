// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');

  // Sample product data
  const products = {
    'fur-dress': {
      id: 'fur-dress',
      name: 'Fur Dress',
      price: 15000,
      images: [
        'fashion-image/fur-cloth.png',
        'fashion-image/fur-cloth.png',
        'fashion-image/fur-cloth.png'
      ],
      sizes: ['S', 'M', 'L', 'XL']
    },
    // 'cool-jacket': {
    //   id: 'cool-jacket',
    //   name: 'Cool Jacket',
    //   price: 22000,
    //   images: [
    //     'fashion-image/jacket-front.png',
    //     'fashion-image/jacket-side.png',
    //     'fashion-image/jacket-back.png'
    //   ],
    //   sizes: ['M', 'L', 'XL']
    // }
    // Add more products here
  };

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-id');
      if (productId) {
        window.location.href = `product-display.html?id=${productId}`;
      }
    });
  });

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products[productId];

  if (!product) {
    productContainer.innerHTML = `<p class="text-red-500">Product not found.</p>`;
    return;
  }

  let selectedSize = product.sizes[0];
  let quantity = 1;

  // Render product details
  productContainer.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-6 w-full bg-red-500">
        <div class="flex gap-3">
            <div class="w-[50vw] items-center flex justify-center bg-gray-100">
                <img id="main-image" src="${product.images[0]}" class="object-cover mb-4" />
            </div>
            <div class="flex flex-col gap-2">
                ${product.images.map(img => `
                <img src="${img}" class="w-20 h-20 object-contain rounded cursor-pointer border hover:border-black"
                    onclick="document.getElementById('main-image').src='${img}'">
                `).join('')}
            </div>
        </div>

      <div class="bg-blue-400 w-full">
        <h2 class="text-2xl font-bold mb-2">${product.name}</h2>
        <p class="text-gray-700 mb-4">₦${product.price}</p>

        <div class="mb-4">
          <label class="block mb-1 font-semibold">Size:</label>
          <div class="flex space-x-2">
            ${product.sizes.map(size => `
              <button onclick="selectSize('${size}', this)"
                      class="size-btn px-3 py-1 border rounded ${size === selectedSize ? 'bg-black text-white' : 'bg-white'}">
                ${size}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="flex items-center space-x-4 mb-4">
          <button onclick="changeQty(-1)" class="px-3 py-1 bg-gray-300 rounded">−</button>
          <span id="qty-display" class="text-lg font-semibold">${quantity}</span>
          <button onclick="changeQty(1)" class="px-3 py-1 bg-gray-300 rounded">+</button>
        </div>

        <button onclick="addToCart()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
      </div>
    </div>
  `;

  // Quantity control
  window.changeQty = function (val) {
    quantity = Math.max(1, quantity + val);
    document.getElementById('qty-display').textContent = quantity;
  };

  // Size selection
  window.selectSize = function (size, btn) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(b => {
      b.classList.remove('bg-black', 'text-white');
      b.classList.add('bg-white');
    });
    btn.classList.add('bg-black', 'text-white');
  };

  // Add to cart
  window.addToCart = function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id && item.size === selectedSize);
    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        qty: quantity,
        image: product.images[0]
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };
});