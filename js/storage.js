// js/storage.js

const CLAVE_CARRITO = "carrito";

export function obtenerCarrito() {
  const data = localStorage.getItem(CLAVE_CARRITO);
  return data ? JSON.parse(data) : [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

export function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
}
