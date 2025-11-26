// js/ui.js

import { obtenerCantidadTotal } from "./carrito.js";

const productGrid = document.getElementById("product-grid");
const cartCount   = document.getElementById("cart-count");

// Renderiza las tarjetas de productos
// onAgregar es una función callback que se ejecuta al clickear "Agregar"
export function renderizarProductos(productos, onAgregar) {
  productGrid.innerHTML = "";

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.marca} ${prod.modelo}">
      <h3>${prod.marca} ${prod.modelo}</h3>
      <p class="price">Precio: $${prod.precio.toLocaleString()}</p>
      <button class="btn btn-agregar">Agregar al carrito</button>
    `;

    const btn = card.querySelector(".btn-agregar");
    btn.addEventListener("click", () => {
      onAgregar(prod); // le mando el producto a la lógica
    });

    productGrid.appendChild(card);
  });
}

// Actualiza el numerito del carrito en el nav
export function actualizarContador() {
  if (!cartCount) return;
  cartCount.textContent = obtenerCantidadTotal();
}
