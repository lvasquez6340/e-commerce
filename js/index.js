// ==========================
// Estado global del carrito
// ==========================
let carrito = [];

// ==========================
// Inicio cuando carga el DOM
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".product-grid");

  // 1) Cargar carrito desde localStorage
  const guardado = localStorage.getItem("carrito");
  carrito = guardado ? JSON.parse(guardado) : [];
  actualizarContador();
  renderizarCarrito();

  // 2) Traer productos desde JSON SOLO si hay grid (o sea, en index)
  if (grid) {
    fetch("./data/productos.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al cargar productos: " + res.status);
        }
        return res.json();
      })
      .then(productos => {
        console.log("Productos cargados:", productos);
        renderizarProductos(productos, grid);
      })
      .catch(err => {
        console.error("Error en fetch:", err);
        mostrarToast("No se pudieron cargar los productos.", "error");
      });
  }

  // Botón “Vaciar carrito” (solo existe en carrito.html)
  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (carrito.length === 0) {
        mostrarToast("El carrito ya está vacío.", "error");
        return;
      }

      const confirma = confirm("¿Seguro que querés vaciar todo el carrito?");
      if (!confirma) return;

      carrito = [];
      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
      mostrarToast("Carrito vaciado.", "ok");
    });
  }

  // Botón “Finalizar compra” (simulación de pago)
  const btnFinalizar = document.getElementById("btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        mostrarToast("Tu carrito está vacío. Agregá algún producto primero.", "error");
        return;
      }

      alert(
        "Acá iría la integración con Mercado Pago / tarjeta.\n" +
        "Por ahora es una simulación de la compra 👍"
      );
    });
  }
});

// =====================
// Render de tarjetas
// =====================
function renderizarProductos(lista, grid) {
  grid.innerHTML = "";

  lista.forEach(prod => {
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
      agregarAlCarrito(prod);
    });

    grid.appendChild(card);
  });
}

// =====================
// Lógica del carrito
// =====================
function agregarAlCarrito(producto) {
  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
  mostrarToast("Producto agregado al carrito", "ok");

  console.log("Carrito actual:", carrito);
}

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

  // Si estoy en una página sin carrito (por ej. index sin sección carrito), salgo
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

  // Eventos para los botones "Eliminar"
  const botonesEliminar = contenedor.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const confirma = confirm("¿Eliminar este producto del carrito?");
      if (!confirma) return;

      eliminarDelCarrito(id);
      mostrarToast("Producto eliminado del carrito.", "ok");
    });
  });
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

// =====================
// Toast / Notificaciones
// =====================
function mostrarToast(mensaje, tipo = "ok") {
  const toast = document.getElementById("toast");
  if (!toast) return; // por si en alguna página no existe

  toast.textContent = mensaje;
  toast.classList.remove("hidden", "ok", "error", "show");

  if (tipo === "error") {
    toast.classList.add("error");
  } else {
    toast.classList.add("ok");
  }

  // Mostrar
  toast.classList.add("show");

  // Ocultar después de 2.5s
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
