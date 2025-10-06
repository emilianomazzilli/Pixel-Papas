// Proyecto
const urlParams = new URLSearchParams(window.location.search);
const juego = (urlParams.get("juego") || "").toLowerCase();

// Productos
const productos = {
  macpay: {
    nombre: "MaC PaY",
    descripcion:
      "Pan con Sesamo, carne jugosa, lechuga, tomate, bacon, cebolla colorada, pepinillo y cheddar",
    imagen: "img/macpay.png",
    precio: "$UY 390",
  },
  fulljhonny: {
    nombre: "Full Jhonny",
    descripcion:
      "Pan con sesamo, hamburguesa de carne, lechuga, tomate, cebolla colorada, bacon, cheddar y fritas",
    imagen: "img/fulljhonny.png",
    precio: "$UY 470",
  },
  pizza: {
    nombre: "Pizza",
    descripcion: "Base de salsa de tomate con queso muzzarella, peperoni y gustos a eleccion",
    imagen: "img/pizzaaa.png",
    precio: "$UY 320",
    gusto: "gusto adicional: $UY 100",
  },
  pollofrito: {
    nombre: "Pollo Frito",
    descripcion: "Bucket de 12 piezas de pollo, incluido salsa Barbecue, Ketchup Picante y de mostaza y miel",
    imagen: "img/pollof.png",
    precio: "$UY 400",
    gusto: "Salsa: c/u $UY 50",
  },
  milanesa: {
    nombre: "Napolitana",
    descripcion:
      "Milanesa de carne con salsa y muzzarella, rodajas de tomate y fritas con bacon y cheddar",
    imagen: "img/milanesa.png",
    precio: "$UY 530",
  },
};

function showTooltip(image) { // Mostrar el tooltip
  const foodItem = image.parentElement;
  const productName = foodItem.getAttribute("data-name").toLowerCase();
  const tooltip = foodItem.querySelector(".tooltip");

  if (productos[productName]) {
    // Actualizar el contenido del tooltip con los datos del producto
    tooltip.querySelector("#tooltipDescription").textContent =
      productos[productName].descripcion;
    tooltip.querySelector("#tooltipPrice").textContent =
      productos[productName].precio;
  }

  tooltip.classList.remove("hidden");
}

function closeTooltip() {
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => tooltip.classList.add("hidden")); // Se esconde el tooltip
}

// CARRITO
const cartIcon = document.getElementById("cart-icon");
const cartMenu = document.getElementById("cart-menu");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const payButton = document.getElementById("pay-button");
const clearButton = document.getElementById("clear-button");
const totalPrice = document.getElementById("total-price");

let cart = [];

// Mostrar/Ocultar el menú del carrito
cartIcon.addEventListener("click", () => {
  cartMenu.classList.toggle("hidden");
});

// Agregar un producto al carrito
function addToCart(name, price) {
  const numericPrice = parseFloat(price.replace('$UY ', '')); // Convierte '$UY 320' a 320
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1; // Incrementar la cantidad si ya existe
  } else {
    cart.push({ name, price: numericPrice, quantity: 1 }); // Agregar nuevo producto con cantidad 1
  }

  updateCart();
  showNotification(`¡${name} agregado al carrito!`);
  closeTooltip();
}

// Actualizar el carrito
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity; // Calcular el total basado en la cantidad
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $UY ${item.price} 
      <div class="quantity-controls"> 
        <button onclick="decreaseQuantity(${index})">-</button>
        <span style="font-family: var(--fuente-title);" > ${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
    `;//botones de suma y resta carrito
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;

  saveCartToLocalStorage(); // Guardar el carrito en localStorage
}

// Incrementar la cantidad de un producto
function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCart();
}

// Decrementar la cantidad de un producto
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // Eliminar el producto si la cantidad llega a 0
  }
  updateCart();
}

// Eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Vaciar el carrito
clearButton.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem("cart"); // Eliminar el carrito de localStorage
  updateCart();
});

// Simular el pago
payButton.addEventListener("click", () => {
  showNotification("¡GRACIAS POR SU COMPRA!", "center");
  cart = [];
  updateCart();
});

// Guardar el carrito en localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cargar el carrito desde localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart(); // Actualizar la interfaz con los datos cargados
  }
}

// Mostrar una notificación flotante
function showNotification(message, position) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.background = "#4CAF50";
  notification.style.color = "white";
  notification.style.padding = "15px";
  notification.style.borderRadius = "8px";
  notification.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
  notification.style.zIndex = "1000";
  notification.style.fontSize = "18px";
  notification.style.textAlign = "center";

  // Configurar posición personalizada
  switch (position) {
    case "center":
      notification.style.top = "50%";
      notification.style.left = "50%";
      notification.style.transform = "translate(-50%, -50%)";
      break;
    default:
      notification.style.bottom = "10px";
      notification.style.right = "10px";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Juegos
const juegos = {
  dyinglight: {
    nombre: "Dying Light 2",
    imagen: "img/dyinglight.jpeg",
    imagen2: "img/dyinglight2.jpeg",
    video:
      "https://video.fastly.steamstatic.com/store_trailers/257002864/movie480_vp9.webm?t=1715946611",
    descripcion:
      "La humanidad libra una batalla perdida contra el virus. Descubre un mundo abierto posapocalíptico gobernado por hordas de zombis y usa el parkour y tus habilidades de combate para sobrevivir. Recorre la ciudad libremente durante el día, pero ten cuidado con los infectados que deambulan de noche.",
    precio: "$UY 1400",
  },
  counterstrike: {
    nombre: "Counter Strike 2",
    descripcion:
      "Durante las dos últimas décadas, Counter‑Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar. Hablamos de Counter‑Strike 2.",
    imagen: "img/cs2.jpeg",
    imagen2: "img/css2.jpeg",
    precio: "$UY 1000",
  },
  baldurgate: {
    nombre: "Baldur's Gate 3",
    descripcion:
      "Reúne a tu grupo y vuelve a los Reinos Olvidados en un relato de compañerismo y traición, sacrificio y supervivencia, además de la atracción de un poder absoluto.",
    imagen: "img/bg3.jpeg",
    precio: "$UY 1000",
  },
  devilmaycry: {
    nombre: "Devil May Cry 5",
    descripcion:
      "El cazademonios definitivo vuelve con estilo en el juego que los fans de la acción estaban esperando.",
    imagen: "img/dmc5.jpeg",
    precio: "$UY 1000",
  },
};
// Cargar el juego seleccionado

/* Esta parte se queda asi porque como cambiamos de todo un poco, no funciona el codigo del todo

if (juegos[juego]) {
  const data = juegos[juego];

  document.title = `${data.nombre} - Pixel & Papas`;

  document.getElementById("juego-nombre").textContent = data.nombre;
  document.getElementById("juego-img").src = data.imagen;
  document.getElementById("juego-img").alt = data.nombre;

  if (data.imagen2) {
    const img2 = document.getElementById("juego-img2");
    img2.src = data.imagen2;
    img2.alt = `${data.nombre} (extra)`;
    img2.style.display = "block";
  }

  document.getElementById("juego-descripcion").textContent = data.descripcion;
  document.getElementById(
    "juego-precio"
  ).textContent = `Precio: ${data.precio}`;

  if (data.video) {
    const videoContainer = document.getElementById("juego-video");

    // Detectar si es de YouTube (iframe) o archivo webm
    if (data.video.includes("youtube.com")) {
      videoContainer.innerHTML = `<iframe width="560" height="315" src="${data.video}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      videoContainer.innerHTML = `<video controls autoplay width="480">
        <source src="${data.video}" type="video/webm">
        Tu navegador no soporta el video.
      </video>`;
    }
  }
}
*/

// juegos del carrusel
const slides = [
  {
    image: "img/dyinglight.jpeg",
    title: "Dying Light 2",
    info: "Now Available -50%",
  },
  {
    image: "img/cs2.jpeg",
    title: "Counter Strike 2",
    info: "New DLC Released!",
  },
  {
    image: "img/bg3.jpeg",
    title: "Baldur's Gate 3",
    info: "Get it now for $19.99",
  },
  {
    image: "img/dmc5.jpeg",
    title: "Devil May Cry 5",
    info: "Top Seller This Week",
  },
];
// script del carrusel que anda raro jsjs
let currentSlide = 0;

function updateSlide(index) {
  const slide = slides[index];
  document.getElementById("slideTitle").textContent = slide.title;
  document.querySelector(".slide-info p").textContent = slide.info;
}

function changeSlide(index) { // Cambia el slide al que se le hace click
  currentSlide = index;
  updateSlide(index);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length; //Carrusel atras
  updateSlide(currentSlide);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length; //Carrusel adelante
  updateSlide(currentSlide);
}

function renderThumbnails() { // Renderiza las miniaturas de los slides
  const thumbnailsContainer = document.getElementById("thumbnails");
  thumbnailsContainer.innerHTML = "";
  slides.forEach((slide, index) => {
    const img = document.createElement("img");
    img.src = slide.image;
    img.onclick = () => changeSlide(index);
    thumbnailsContainer.appendChild(img);
  });
}

updateSlide(0);
renderThumbnails();

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
});
