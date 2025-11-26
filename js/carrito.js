// js/carrito.js
// ===============================
// Lógica de la página carrito.html
// ===============================

// Estado global del carrito
let carrito = [];

// Cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  // 1) Recuperar carrito desde localStorage
  const guardado = localStorage.getItem("carrito");
  carrito = guardado ? JSON.parse(guardado) : [];

  // 2) Actualizar contador del navbar
  actualizarContador();

  // 3) Dibujar productos en el carrito
  renderizarCarrito();

  // 4) Botón "Vaciar carrito"
  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (carrito.length === 0) {
        mostrarToast("El carrito ya está vacío", "error");
        return;
      }

      const confirma = confirm("¿Seguro que querés vaciar todo el carrito?");
      if (!confirma) return;

      carrito = [];
      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
      mostrarToast("Carrito vaciado ✅", "ok");
    });
  }

  // 5) Botón "Finalizar compra"
  const btnFinalizar = document.getElementById("btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        mostrarToast("Tu carrito está vacío. Agregá algún producto primero.", "error");
        return;
      }

      const confirma = confirm(
        "¿Querés finalizar la compra?\n(No hay integración real, es una simulación para el proyecto.)"
      );
      if (!confirma) return;

      // Acá podrías integrar Mercado Pago en el futuro
      // Por ahora simulamos:
      mostrarToast("Compra finalizada 🎉 (simulada para el proyecto)", "ok");

      // Si querés, dejamos el carrito limpio después:
      carrito = [];
      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
    });
  }
});

// =====================
// Utilidades
// =====================

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerCantidadTotal() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function actualizarContador() {
  const span = document.getElementById("cart-count");
  if (!span) return;
  span.textContent = obtenerCantidadTotal();
}

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
    const fila = document.createElement("div");
    fila.classList.add("cart-item");

    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    fila.innerHTML = `
      <span>${item.marca} ${item.modelo}</span>
      <span>x${item.cantidad}</span>
      <span>$${subtotal.toLocaleString()}</span>
      <button class="btn-eliminar" data-id="${item.id}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    contenedor.appendChild(fila);
  });

  totalElem.textContent = "Total: $" + total.toLocaleString();

  // Eventos para botones de eliminar
  const botonesEliminar = contenedor.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);

      const confirma = confirm("¿Seguro que querés eliminar este producto del carrito?");
      if (!confirma) return;

      carrito = carrito.filter(item => item.id !== id);
      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
      mostrarToast("Producto eliminado del carrito", "ok");
    });
  });
}

// =====================
// Toast / notificación
// =====================

function mostrarToast(mensaje, tipo = "ok") {
  const toast = document.getElementById("toast");
  if (!toast) {
    alert(mensaje); // último recurso
    return;
  }

  toast.textContent = mensaje;
  toast.classList.remove("hidden", "ok", "error");
  toast.classList.add("show", tipo);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
