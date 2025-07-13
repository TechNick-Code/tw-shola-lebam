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
