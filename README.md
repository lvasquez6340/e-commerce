🛒 MiTienda – E-commerce de Celulares (Proyecto Front-End)

Este es un proyecto desarrollado como práctica de JavaScript para integrar manipulación del DOM, consumo de JSON local, gestión de carrito, persistencia con localStorage y páginas múltiples dentro de un sitio web.

La tienda permite visualizar productos dinámicos, agregarlos al carrito, eliminarlos, vaciar el carrito y simular un flujo de compra.

🚀 Características principales
✔️ Productos dinámicos desde JSON

Los productos no están escritos de forma estática en el HTML.
Se cargan utilizando:

fetch("./data/productos.json")


Esto permite actualizar el catálogo sin tocar el HTML.

✔️ Carrito de compras funcional

Incluye:

Agregar productos desde la página principal

Incremento automático si el producto ya existe

Visualización del carrito en una página dedicada (carrito.html)

Eliminación individual

Botón “Vaciar carrito”

Cálculo automático del total

Persistencia con localStorage (el carrito no se pierde cuando se recarga la página)

✔️ Interfaz limpia y moderna

El diseño utiliza:

Tarjetas con animaciones suaves

Botones estilizados

Íconos de FontAwesome

Navbar responsive con menú hamburguesa

Sección del carrito organizada con grilla CSS

✔️ Sistema de notificaciones (toast)

Cuando el usuario agrega o elimina un producto, la aplicación muestra mensajes visuales breves para mejorar la experiencia.

📁 Estructura del proyecto
📦 proyecto-tienda
│
├── index.html
├── carrito.html
├── pages/
│   └── contacto.html
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│   └── carrito.js
│
├── data/
│   └── productos.json
│
└── img/
    └── (imágenes de los productos)

🧠 Tecnologías utilizadas

HTML5

CSS3

JavaScript Vanilla

Fetch API

LocalStorage

FontAwesome

GitHub Pages para hosting

🧪 Funcionalidad del carrito (resumen técnico)

La lógica principal se basa en:

Un array carrito sincronizado con localStorage

Detección de duplicados con .find()

Eliminación con .filter()

Render dinámico con innerHTML

Cálculo total con .reduce()

Ejemplo del agregado al carrito:

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
}

🌐 Demo online (GitHub Pages)

👉 https://lvasquez6340.github.io/e-commerce/

(Reemplazar con el link real cuando lo publiques)

📌 Próximas mejoras (opcional)

Integrar pasarela real de pago (MercadoPago o Stripe)

Buscador de productos

Filtros por marca, precio o categoría

Sistema de usuarios

Backend con Node.js (preparado para el curso siguiente)

🙌 Autor

Proyecto desarrollado por Ingeniero Luis Martin Vasquez
Estudiante de programación y desarrollador en formación.
