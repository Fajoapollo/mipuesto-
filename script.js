// Buscar productos por nombre
const buscador = document.getElementById('buscador');
const lista = document.getElementById('lista-productos');
const aviso = document.getElementById('sin-resultados');

buscador.addEventListener('input', function () {
  const texto = buscador.value.toLowerCase();
  const productos = lista.querySelectorAll('.producto');
  let encontrados = 0;

  productos.forEach(function (producto) {
    const coincide = producto.dataset.nombre.includes(texto);
    producto.hidden = !coincide;
    if (coincide) encontrados++;
  });
  aviso.hidden = encontrados > 0;
});

// Agregar una publicación de ejemplo (sin base de datos)
document.getElementById('formulario').addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = Number(document.getElementById('precio').value);
  if (!nombre || !Number.isFinite(precio) || precio <= 0) return;

  const tarjeta = document.createElement('article');
  tarjeta.className = 'producto';
  tarjeta.dataset.nombre = nombre.toLowerCase();
  const imagen = document.createElement('div');
  imagen.className = 'imagen-simple';
  imagen.textContent = '🛍️';
  const titulo = document.createElement('h3');
  titulo.textContent = nombre;
  const valor = document.createElement('strong');
  valor.textContent = 'S/ ' + precio.toFixed(2);
  tarjeta.append(imagen, titulo, valor);
  lista.appendChild(tarjeta);

  buscador.value = '';
  lista.querySelectorAll('.producto').forEach(p => p.hidden = false);
  aviso.hidden = true;
  evento.target.reset();
  location.hash = '#explorar';
});