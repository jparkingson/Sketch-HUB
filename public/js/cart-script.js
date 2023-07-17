
// carrito de compras
let cartIcon = document.getElementById('cart-icon');
let cart = document.querySelector('.cart');
let cartRemove = document.querySelector('#close-cart');


// carrito.js




/*
//abrir carrito
cartIcon.onclick = () => {
  cart.classList.add("active");
};
*/
//cerrar carrito
/*
cartRemove.onclick = () => {
  cart.classList.remove("active");
};*/




/*
//Comprobar que todo este cargado para utilizar carrito
if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
  
}else{
  ready();
}
*/
/*
var cartCount = 0;

//funciones
function ready(){
  var cartItemsContainer = document.querySelector('.sidebar-cart #cart-items');

  //remover items del carrito de compras

  //busca todos los elementos con la clase "cart-remove" y los almacena en la variable removeCart.
  var removeCart = document.querySelectorAll('cart-remove')
  console.log(removeCart)
  // un bucle for que recorre todos los elementos que se encontraron con la clase "cart-remove".
  for (var i = 0; i < removeCart.length; i++){
    //almacena el botón actual en la variable button.
    var button = removeCart[i]
    // agrega un evento de clic al botón que ejecuta la función removeCartItem() cuando se hace clic en el botón.
    button.addEventListener('click', removeCartItem)
  }


  //busca todos los elementos con la clase "cart-quantity" y los almacena en la variable quantityInput.
  var quantityInput = document.getElementsByClassName('cart-quantity')
  //un bucle for que recorre todos los elementos que se encontraron con la clase "cart-quantity".
  for (var i = 0; i < quantityInput.length; i++){
    // almacena el input actual en la variable input.
    var input = quantityInput[i]
    // agrega un evento de cambio al input que ejecuta la función quantityChanged() cuando se cambia el valor del input.
    input.addEventListener("change",quantityChanged );
  }
  //añadir al carro

  //busca todos los elementos con la clase "add-to-cart" y los almacena en la variable addCart.
  var addCart = document.getElementsByClassName('add-to-cart')
  //un bucle for que recorre todos los elementos que se encontraron con la clase "add-to-cart".
  for (var i = 0; i < addCart.length; i++){
    //almacena el botón actual en la variable button.
    var button = addCart[i]
    //agrega un evento de clic al botón que ejecuta la función addCartClicked() cuando se hace clic en el botón.
    button.addEventListener("click", addCartClicked);
  }
}


function removeCartItem(event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove()
  updatetotal();
  
  // Actualiza la cantidad de productos en el carrito

  cartCount--; // disminuye el valor de la variable global
  updateCartCount(); // actualiza la cantidad de productos en la página


}

function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
  
  }
  updatetotal();
}




//Funcion para añadir productos al carro cuando se da click en "agregar al carrito"
function addCartClicked(event) {
  // Obtener el botón que ha sido clickeado
  var button = event.target;

  // Obtener el elemento contenedor del botón, que contiene la información del producto a agregar al carrito
  var shopProducts = button.parentElement;

  // Obtener el título del producto a agregar al carrito
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;

  // Obtener el precio del producto a agregar al carrito
  var price = shopProducts.getElementsByClassName('price')[0].innerText;

  // Obtener la imagen del producto a agregar al carrito
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

  // Obtener el ID del producto a agregar al carrito, que está almacenado en el atributo 'data-product-id' del botón
  var productId = button.getAttribute('data-product-id');

  // Llamar a la función que añade el producto al carrito
  addProductToCart(productImg, title, price, productId);
 
  // Actualizar el total del carrito
  updatetotal();
}


//Crear estructura del producto dentro del carrito

function addProductToCart(productImg, title, price, productId) {
  // Crear un nuevo elemento de carro
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  
  // Seleccionar el contenedor de la lista de carro y verificar que el producto no haya sido agregado
  var cartItems = document.querySelector('.cart-content');
  
  var cartItemsNames = cartItems.querySelectorAll('.cart-product-title');
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert('Ya agregaste este producto a tu carro');
      return;
    }

  }

  

  //para los productos que no necesiten agregarse más de una vez
  var maxQuantity = 0;
  var productElement = document.querySelector(`[data-product-id="${productId}"]`);
  if (productElement) {
    maxQuantity = parseInt(productElement.getAttribute('data-max-quantity'));
  }
  // Crear el contenido del elemento de carro
  var cartBoxContent = `
    <img class="cart-img" src="${productImg}" alt="">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input class="cart-quantity" type="number" value="1" ${maxQuantity ? 'max="'+maxQuantity+'"' : ''}>
    </div>
    <i class="fa fa-trash cart-remove" aria-hidden="true"></i>
  `;
  
  // Agregar el contenido al elemento de carro y agregarlo al contenedor de la lista de carro
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartItems.appendChild(cartShopBox);

  // Agregar event listeners para los botones de remover y cambiar la cantidad
  var removeButton = cartShopBox.querySelector('.cart-remove');
  var quantityInput = cartShopBox.querySelector('.cart-quantity');
  removeButton.addEventListener('click', removeCartItem);
  quantityInput.addEventListener('change', quantityChanged);

 // Actualiza la cantidad de productos en el carrito

 cartCount++; // aumenta el valor de la variable global
 updateCartCount();


}



// actualiza la cantidad de productos en el carrito
function updateCartCount() {
  var cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cartCount;
}

//actualizar total
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
   
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat (priceElement.innerText.replace("B/.", "").trim());
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //cuando el precio tiene centavos
  }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "B/." + total;
 
}



// llama a la función updateCartCount al cargar la página para mostrar la cantidad inicial de productos en el carrito
window.addEventListener('load', updateCartCount);
*/













