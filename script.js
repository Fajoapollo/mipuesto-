// 1. Menú hamburguesa para celulares
const botonMenu = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
botonMenu.addEventListener('click', function () {
  const abierto = menu.classList.toggle('abierto');
  botonMenu.setAttribute('aria-expanded', abierto);
  botonMenu.textContent = abierto ? '✕' : '☰';
});
menu.querySelectorAll('a').forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.textContent = '☰';
  });
});

// 2. Buscar productos
const buscador = document.getElementById('buscador');
const lista = document.getElementById('productos');
const sinResultados = document.getElementById('sinResultados');
buscador.addEventListener('input', function () {
  const texto = buscador.value.toLowerCase();
  let cantidad = 0;
  lista.querySelectorAll('.tarjeta').forEach(function (tarjeta) {
    const coincide = tarjeta.dataset.nombre.includes(texto);
    tarjeta.hidden = !coincide;
    if (coincide) cantidad++;
  });
  sinResultados.hidden = cantidad > 0;
});

// 3. Publicación de demostración (sin base de datos)
document.getElementById('formulario').addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = Number(document.getElementById('precio').value);
  const categoria = document.getElementById('categoria').value;
  const entrega = document.querySelector('input[name="entrega"]:checked');
  if (!nombre || precio <= 0 || !categoria || !entrega) return;

  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta';
  tarjeta.dataset.nombre = nombre.toLowerCase();
  const dibujo = document.createElement('div');
  dibujo.className = 'dibujo';
  dibujo.textContent = '🛍️';
  const titulo = document.createElement('h3');
  titulo.textContent = nombre;
  const detalle = document.createElement('p');
  detalle.textContent = 'S/ ' + precio.toFixed(2);
  const info = document.createElement('small');
  info.textContent = categoria + ' · ' + entrega.value;
  tarjeta.append(dibujo, titulo, detalle, info);
  lista.appendChild(tarjeta);

  buscador.value = '';
  lista.querySelectorAll('.tarjeta').forEach(t => t.hidden = false);
  sinResultados.hidden = true;
  document.getElementById('mensaje').textContent = 'Producto agregado a la lista de ejemplo.';
  evento.target.reset();
});