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


// add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');
  let count = 0;

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      count += 1;
      cartCount.textContent = count;
    });
  });
});



//newsletter js code
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

      // Hide error after 3 seconds
      setTimeout(() => {
        responseMessage.classList.add('hidden');
      }, 6000);

      return;
    }

    // Simulate submission
    console.log("Newsletter submitted:", email);

    responseMessage.textContent = "Thanks for subscribing!";
    responseMessage.classList.remove('text-red-600');
    responseMessage.classList.add('text-green-600');
    responseMessage.classList.remove('hidden');

    // Hide success after 3 seconds
    setTimeout(() => {
      responseMessage.classList.add('hidden');
    }, 4000);

    form.reset();
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

