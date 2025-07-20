// // like button

// const strokeLove = document.querySelector('.strokeLove');
// const filledLove = document.querySelector('.filledLove');
// const container = document.querySelectorAll('.container');
// const message = document.getElementById('message');
// const message2 = document.getElementById('message2');

// strokeLove.addEventListener('click', () => {
//     filledLove.classList.toggle('opacity-100');
//     strokeLove.classList.toggle('opacity-0');
//     filledLove.classList.toggle('invisible');
    
// if(filledLove.classList.contains('opacity-100')) {
//     message.textContent = "You liked this!";
//     message.classList.remove("hidden");
//     message2.classList.add("hidden");
//     setTimeout(() => {
//         message.classList.add("hidden");
//     }, 3000);

// }else{
//     message2.textContent = "You unliked this!";
//     message2.classList.remove("hidden");
//     message.classList.add("hidden");
//     setTimeout(() => {
//         message2.classList.add("hidden");
//     }, 3000);

// }
// });

// like button functionality
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const svg = button.querySelector('svg');

      button.classList.toggle('liked');
      if (button.classList.contains('liked')) {
        svg.setAttribute('fill', 'red');
        button.classList.replace('text-gray-800', 'text-red-500');
      } else {
        svg.setAttribute('fill', 'none');
        button.classList.replace('text-red-500','text-gray-800');
      }
    });
  });
});


// // add to cart functionality
// document.addEventListener('DOMContentLoaded', () => {
//   const cartCount = document.getElementById('cart-count');
//   let count = 0;

//   const addToCartButtons = document.querySelectorAll('.add-to-cart');

//   addToCartButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       count += 1;
//       cartCount.textContent = count;
//     });
//   });
// });



//newsletter submission js code
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const responseMessage = document.getElementById('response-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      responseMessage.textContent = "Please enter a valid email address.";
      responseMessage.classList.remove('text-green-600');
      responseMessage.classList.add('text-red-600');
      responseMessage.classList.remove('hidden');
      emailInput.classList.remove('border-gray-400');
      emailInput.classList.add('border-red-500');

      // Hide error after 3 seconds
      setTimeout(() => {
        responseMessage.classList.add('hidden');
      }, 12000);

      return;
    }

    // Simulate submission
    console.log("Newsletter submitted:", email);

    responseMessage.textContent = "Thanks for subscribing!";
    responseMessage.classList.remove('text-red-600');
    responseMessage.classList.add('text-green-600');
    responseMessage.classList.remove('hidden');
    emailInput.classList.remove('border-red-500');
    emailInput.classList.add('border-gray-400');

    // Hide success after 3 seconds
    setTimeout(() => {
      responseMessage.classList.add('hidden');
    }, 8000);

    form.reset();
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});


// add to cart functionality
// This script manages the shopping cart functionality, including adding items, removing items, and displaying the
 let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function addToCart(name, price, qtyInputId, image) {
      const quantity = parseInt(document.getElementById(qtyInputId).value);
      if (quantity < 1) return;

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ name, price, quantity, image });
      }
      saveCart();
      updateCartCount();
      updateCartDisplay();
      showAddToCartNotification();
      updateAddToCartIcon();
    }

    function showAddToCartNotification() {
  const addedToCartMessage = document.getElementById('add-to-cart-noti');
  if (addedToCartMessage) {
    addedToCartMessage.classList.remove('hidden');
    setTimeout(() => {
      addedToCartMessage.classList.add('hidden');
    }, 5000); // Hide after 5 seconds
  }
}

function updateAddToCartIcon() {
  const addedToCartIcon = document.getElementById('added-to-cart-icon');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cartCount', totalItems); // Save cart count

  if (addedToCartIcon) {
    addedToCartIcon.classList.toggle('hidden', totalItems === 0);
    return;
  }
}

    function removeFromCart(index) {
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      updateCartDisplay();
      updateAddToCartIcon();
    }

    function updateCartCount() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById('cart-count').textContent = totalItems;
    }
    updateCartCount();
      updateAddToCartIcon();

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  console.log(cartItems);
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement('li');
    li.className = 'flex flex-col md:flex-row gap-4 md:justify-between bg-gray-50 p-2 rounded';
    li.innerHTML = `
      <div class="flex gap-6 items-center">
          <img src="${item.image}" alt="${item.name}" class="size-[7em] md:size-[10em] object-cover" />
          <div class="flex-1">
            <div class="text-lg">${item.name}</div>
            <div class="font-semibold mt-2 text-[1.4em]">₦${itemTotal.toLocaleString()}</div>
          </div>
      </div>

      <div class="text-right mt-3 flex gap-3 md:gap-6 justify-between items-center">
        <div class="flex items-center gap-4 text-sm text-gray-600">
          Qty:
          <button onclick="changeQuantity(${index}, -1)" class="px-[15px] py-1 bg-black rounded hover:bg-gray-300 text-lg text-pry-color font-bold">-</button>
          <span class="font-semibold">${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)" class="px-3 py-1 bg-black rounded hover:bg-gray-300 text-lg text-pry-color font-bold">+</button>
        </div>

        <button onclick="removeFromCart(${index})" class="flex gap-1 text-red-500 hover:underline text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5">
            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
          </svg>
          <p>Remove</p>
        </button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toLocaleString();
}
updateCartDisplay();
updateCartCount();


function changeQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1); // Remove item if quantity goes below 1
  }
  saveCart();
  updateCartCount();
  updateCartDisplay();
}

    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function goToCart() {
      document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
    }

    function checkout() {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const emptyAlert = document.getElementById('empty-alert');
      if (totalAmount === 0) {
      emptyAlert.textContent = 'Please add items to your cart before checking out.';
      emptyAlert.classList.remove('hidden');
      setTimeout(() => {
        emptyAlert.classList.add('hidden');
      }, 4000);
      return;
}
 localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartTotal', totalAmount);

  // ✅ Redirect to payment page
  window.location.href = 'payment.html';

}

document.addEventListener('DOMContentLoaded', () => {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  updateCartDisplay();
  updateAddToCartIcon();
});



    //   let handler = PaystackPop.setup({
    //     key: 'YOUR_PUBLIC_KEY_HERE', // Replace with your Paystack public key
    //     email: 'customer@example.com', // Replace with customer's email
    //     amount: totalAmount * 100,
    //     currency: 'NGN',
    //     ref: '' + Math.floor(Math.random() * 1000000000 + 1),
    //     callback: function(response) {
    //       alert('Payment successful! Reference: ' + response.reference);
    //       cart = [];
    //       saveCart();
    //       updateCartCount();
    //       updateCartDisplay();
    //     },
    //     onClose: function() {
    //       alert('Transaction was not completed.');
    //     }
    //   });

    //   handler.openIframe();
    // }

    // // Initialize cart on page load
    // updateCartCount();
    // updateCartDisplay();