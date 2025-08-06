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
        'fashion-image/fur-cloth.png',
        'fashion-image/a.png'
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
    <div class="flex flex-col lg:flex-row gap-4 w-full overflow-hidden">
        <div class="flex gap-3 overflow-hidden">
            <div class="w-[71vw] lg:w-[80vw] lg:h-[75vh] items-center flex justify-center bg-gray-100">
                <img id="main-image" src="${product.images[0]}" class="w-[60vw] lg:w-[25vw] object-cover mb-4" />
            </div>
            <div class="flex flex-col gap-2">
                ${product.images.map(img => `
                <img src="${img}" class="w-24 h-24 lg:w-32 bg-gray-100 object-contain rounded cursor-pointer border hover:border-black"
                    onclick="document.getElementById('main-image').src='${img}'">
                `).join('')}
            </div>
        </div>

      <div class="w-full lg:w-[40vw] lg:ml-4">
        <h2 class=" font-semibold">${product.name}</h2>
        <p class="font-bold text-[1.2em]">₦${product.price}</p>
        <p class="text-xs text-gray-500 mb-2">Available</p>

        <div class="mb-6 flex flex-col gap-2">
          <label class="block mb-1 font-semibold">Measurement</label>
          <div class="flex space-x-2">
            ${product.sizes.map(size => `
              <button onclick="selectSize('${size}', this)"
                      class="px-4 py-1 rounded border border-gray-400 text-sm active:bg-pry-color active:text-gray-700 active:border-0 active:font-semibold ${size === selectedSize ? 'bg-black text-pry-color' : 'bg-white text-black'}">
                ${size}
              </button>
              
              <label></label>
            `).join('')}
          </div>
        </div>

        <div class="mb-7 flex flex-col gap-1">
            <h1 class="font-semibold">Materials</h1>
            <p class="text-gray-500 text-sm">Silk, Velvet, gold stoning, wool, lilac</p>
        </div>

        <div class="flex items-center space-x-2 mb-5">
          <button onclick="changeQty(-1)" class="px-3 py-1 bg-black text-pry-color rounded">−</button>
          <span id="qty-display" class="text-lg font-semibold border border-black px-4">${quantity}</span>
          <button onclick="changeQty(1)" class="px-3 py-1 bg-black text-pry-color rounded">+</button>
        </div><hr class="border-gray-300">

        <div class="flex flex-col my-5 gap-1">
            <div class="">
                <input type="radio" name="Use Current Location">
                <label for="">Use current location</label>
            </div>
            <div class="">
                <input type="radio" name="Use Current Location">
                <label for="">Change location</label>
            </div>
        </div>

        <button onclick="addToCart('${products}')" class="w-full lg:w-1/3 border border-black text-black px-4 py-3 rounded hover:bg-black hover:text-pry-color hover:font-bold active:scale-95 transition-all duration-300">Buy Product</button>
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