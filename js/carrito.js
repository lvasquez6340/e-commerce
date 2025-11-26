// ================================
//  Estado global del carrito
// ================================
let carrito = [];

// ================================
//  Cargar carrito al iniciar página
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("carrito");
  carrito = guardado ? JSON.parse(guardado) : [];

  actualizarContador();
  renderizarCarrito();

  prepararBotonVaciar();
  prepararBotonFinalizar();
});


// ================================
//  Función: renderizar carrito
// ================================
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-items");
  const totalElem  = document.getElementById("cart-total");

  if (!contenedor || !totalElem) return;

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalElem.textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    const row = document.createElement("div");
    row.classList.add("cart-item");

    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    row.innerHTML = `
      <span>${item.marca} ${item.modelo}</span>
      <span>x${item.cantidad}</span>
      <span>$${subtotal.toLocaleString()}</span>
      <button class="btn-eliminar" data-id="${item.id}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    contenedor.appendChild(row);
  });

  totalElem.textContent = "Total: $" + total.toLocaleString();

  activarBotonesEliminar();
}


// ================================
//  Botones "Eliminar"
// ================================
function activarBotonesEliminar() {
  const botones = document.querySelectorAll(".btn-eliminar");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      eliminarProducto(id);
    });
  });
}

function eliminarProducto(idToRemove) {
  const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
  if (!confirmar) return;

  carrito = carrito.filter(item => item.id !== idToRemove);
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}


// ================================
//  Botón "Vaciar Carrito"
// ================================
function prepararBotonVaciar() {
  const btn = document.getElementById("btn-vaciar-carrito");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que deseas vaciar todo el carrito?");
    if (!confirmar) return;

    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderizarCarrito();
  });
}


// ================================
//  Botón "Finalizar compra"
// ================================
function prepararBotonFinalizar() {
  const btn = document.getElementById("btn-finalizar");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }

    const total = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const confirmar = confirm(
      `Vas a simular un pago por $${total.toLocaleString()}.\n\n¿Deseas continuar?`
    );

    if (!confirmar) return;

    // Simulación mercado pago
    window.open("https://www.mercadopago.com.ar", "_blank");

    // Vaciar carrito luego de "pagar"
    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderizarCarrito();
  });
}


// ================================
//  Funciones auxiliares
// ================================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const span = document.getElementById("cart-count");
  if (!span) return;

  const cant = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  span.textContent = cant;
}
