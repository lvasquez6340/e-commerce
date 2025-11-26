let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("carrito");
  carrito = data ? JSON.parse(data) : [];

  actualizarContador();
  renderizarCarrito();

  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (carrito.length === 0) {
        mostrarToast("El carrito ya está vacío", "error");
        return;
      }
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      renderizarCarrito();
      mostrarToast("Carrito vaciado", "ok");
    });
  }

  const btnFinalizar = document.getElementById("btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        mostrarToast("No tienes productos en el carrito", "error");
        return;
      }
      mostrarToast("Compra simulada con éxito 😄", "ok");
    });
  }
});

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

  const botonesEliminar = contenedor.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      eliminarDelCarrito(id);
    });
  });
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  renderizarCarrito();
  mostrarToast("Producto eliminado", "ok");
}

function obtenerCantidadTotal() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function actualizarContador() {
  const span = document.getElementById("cart-count");
  if (!span) return;
  span.textContent = obtenerCantidadTotal();
}

// Toast / notificación
function mostrarToast(mensaje, tipo = "ok") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = mensaje;
  toast.classList.remove("hidden", "ok", "error");
  toast.classList.add(tipo, "show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
