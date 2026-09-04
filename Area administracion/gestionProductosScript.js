/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Umbral de stock bajo: si el stock es MENOR a este número, se marca como advertencia
const UMBRAL_STOCK_BAJO = 5;

// Cargamos productos desde localStorage, o creamos datos de ejemplo (basados en tu catálogo real)
let datosGuardadosProductos = localStorage.getItem("productos");
let productos;

if (datosGuardadosProductos === null) {
  productos = [
    {
      codigo: "GA001",
      categoria: "Guitarras Acústicas",
      nombre: "Guitarra Acústica Folk",
      marca: "Yamaha",
      modelo: "F310",
      stock: 8,
      precio: 129990,
      descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
    },
    {
      codigo: "GA004",
      categoria: "Guitarras Acústicas",
      nombre: "Guitarra Electroacústica",
      marca: "Takamine",
      modelo: "GN20CE",
      stock: 3,
      precio: 349990,
      descripcion: "Pickup integrado, afinador incorporado.",
    },
    {
      codigo: "GE005",
      categoria: "Guitarras Eléctricas",
      nombre: "Guitarra Eléctrica Semi-hollow",
      marca: "Epiphone",
      modelo: "ES-335",
      stock: 2,
      precio: 549990,
      descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues.",
    },
    {
      codigo: "BA002",
      categoria: "Bajos Eléctricos",
      nombre: "Bajo Eléctrico Jazz Bass",
      marca: "Fender",
      modelo: "Player Jazz",
      stock: 2,
      precio: 699990,
      descripcion: "Alder body, 2 Alnico V Jazz single-coil.",
    },
  ];

  localStorage.setItem("productos", JSON.stringify(productos));
} else {
  productos = JSON.parse(datosGuardadosProductos);
}

/*NOTA si cambiamos la estructura del arreglo de productos, debemos correr
localStorage.clear() en la consola del navegador y recargar la página*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
let listaProductos = document.getElementById("productoTableBody");

// Formatea un número como precio chileno: 129990 -> "$129.990"
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

function dibujarTablaProductos() {
  let filasHTML = "";
  let hayStockBajo = false;

  for (let i = 0; i < productos.length; i++) {
    let stockBajo = productos[i].stock < UMBRAL_STOCK_BAJO;
    if (stockBajo) hayStockBajo = true;

    // Si el stock está bajo, la fila completa se resalta con la clase de Bootstrap "table-danger"
    let claseFila = stockBajo ? "table-danger" : "";

    // Texto del stock: si está bajo, se le agrega un badge de advertencia al lado
    let stockHTML = stockBajo
      ? `${productos[i].stock} <span class="badge bg-danger">Stock bajo</span>`
      : `${productos[i].stock}`;

    filasHTML += `
      <tr class="${claseFila}">
          <td>${productos[i].codigo}</td>
          <td>${productos[i].categoria}</td>
          <td>${productos[i].nombre}</td>
          <td>${productos[i].marca}</td>
          <td>${productos[i].modelo}</td>
          <td>${stockHTML}</td>
          <td>${formatearPrecio(productos[i].precio)}</td>
          <td>${productos[i].descripcion}</td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-secondary btn-sm" type="button" onclick="abrirModalEditarProducto(${i})">
                Editar
              </button>
              <button class="btn btn-outline-danger btn-sm" type="button" onclick="eliminarProducto(${i})">
                Eliminar
              </button>
            </div>
          </td>
      </tr>`;
  }

  listaProductos.innerHTML = filasHTML;

  // Muestra u oculta el aviso general de arriba, según si hay al menos un producto con stock bajo
  let contenedorAlerta = document.getElementById("alertaStockBajo");
  if (hayStockBajo) {
    contenedorAlerta.innerHTML = `
      <div class="alert alert-danger mb-0 py-2 px-3">
        ⚠️ Hay productos con stock bajo (menos de ${UMBRAL_STOCK_BAJO} unidades)
      </div>`;
  } else {
    contenedorAlerta.innerHTML = "";
  }
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Ordenamiento genérico por columna (mismo patrón que usamos en Gestión de Usuarios)
let ordenAscendenteProductos = {};

function ordenarProductosPorCampo(campo) {
  if (ordenAscendenteProductos[campo] === undefined) {
    ordenAscendenteProductos[campo] = true;
  }

  productos.sort((a, b) => {
    // stock y precio son números: se comparan con resta, no con localeCompare (que es para texto)
    if (typeof a[campo] === "number") {
      return ordenAscendenteProductos[campo] ? a[campo] - b[campo] : b[campo] - a[campo];
    }
    return ordenAscendenteProductos[campo]
      ? a[campo].localeCompare(b[campo])
      : b[campo].localeCompare(a[campo]);
  });

  ordenAscendenteProductos[campo] = !ordenAscendenteProductos[campo];
  dibujarTablaProductos();
}

let columnasOrdenablesProductos = {
  codigo: "codigo",
  categoria: "categoria",
  nombreProducto: "nombre",
  marca: "marca",
  modelo: "modelo",
  stock: "stock",
  precio: "precio",
};

for (let idColumna in columnasOrdenablesProductos) {
  let th = document.getElementById(idColumna);
  let campo = columnasOrdenablesProductos[idColumna];
  th.addEventListener("click", () => ordenarProductosPorCampo(campo));
  th.style.cursor = "pointer";
}

dibujarTablaProductos();
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function abrirModalAgregarProducto() {
  document.getElementById("modalProductoTitulo").textContent = "Añadir Producto";
  document.getElementById("indiceEdicionProducto").value = -1;
  document.getElementById("inputCodigo").value = "";
  document.getElementById("inputCategoria").value = "Guitarras Acústicas";
  document.getElementById("inputNombreProducto").value = "";
  document.getElementById("inputMarca").value = "";
  document.getElementById("inputModelo").value = "";
  document.getElementById("inputStock").value = "";
  document.getElementById("inputPrecio").value = "";
  document.getElementById("inputDescripcion").value = "";

  let modal = new bootstrap.Modal(document.getElementById("modalProducto"));
  modal.show();
}

function abrirModalEditarProducto(indice) {
  document.getElementById("modalProductoTitulo").textContent = "Editar Producto";
  document.getElementById("indiceEdicionProducto").value = indice;
  document.getElementById("inputCodigo").value = productos[indice].codigo;
  document.getElementById("inputCategoria").value = productos[indice].categoria;
  document.getElementById("inputNombreProducto").value = productos[indice].nombre;
  document.getElementById("inputMarca").value = productos[indice].marca;
  document.getElementById("inputModelo").value = productos[indice].modelo;
  document.getElementById("inputStock").value = productos[indice].stock;
  document.getElementById("inputPrecio").value = productos[indice].precio;
  document.getElementById("inputDescripcion").value = productos[indice].descripcion;

  let modal = new bootstrap.Modal(document.getElementById("modalProducto"));
  modal.show();
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
function guardarProductoDesdeModal() {
  let indice = parseInt(document.getElementById("indiceEdicionProducto").value);

  let codigo = document.getElementById("inputCodigo").value.trim();
  let categoria = document.getElementById("inputCategoria").value;
  let nombre = document.getElementById("inputNombreProducto").value.trim();
  let marca = document.getElementById("inputMarca").value.trim();
  let modelo = document.getElementById("inputModelo").value.trim();
  let stock = parseInt(document.getElementById("inputStock").value);
  let precio = parseInt(document.getElementById("inputPrecio").value);
  let descripcion = document.getElementById("inputDescripcion").value.trim();

  // Validación 1: campos de texto obligatorios
  if (codigo === "" || nombre === "" || marca === "" || modelo === "") {
    alert("Código, nombre, marca y modelo son obligatorios");
    return;
  }

  // Validación 2: stock y precio deben ser números válidos y no negativos
  if (isNaN(stock) || stock < 0) {
    alert("El stock debe ser un número igual o mayor a 0");
    return;
  }

  if (isNaN(precio) || precio < 0) {
    alert("El precio debe ser un número igual o mayor a 0");
    return;
  }

  // Validación 3: código no repetido
  let codigoDuplicado = productos.some((producto, i) => {
    return producto.codigo.toUpperCase() === codigo.toUpperCase() && i !== indice;
  });

  if (codigoDuplicado) {
    alert("Ya existe un producto con ese código");
    return;
  }

  if (indice === -1) {
    productos.push({ codigo, categoria, nombre, marca, modelo, stock, precio, descripcion });
  } else {
    productos[indice].codigo = codigo;
    productos[indice].categoria = categoria;
    productos[indice].nombre = nombre;
    productos[indice].marca = marca;
    productos[indice].modelo = modelo;
    productos[indice].stock = stock;
    productos[indice].precio = precio;
    productos[indice].descripcion = descripcion;
  }

  guardarProductos();
  dibujarTablaProductos();

  let modal = bootstrap.Modal.getInstance(document.getElementById("modalProducto"));
  modal.hide();
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
function eliminarProducto(indice) {
  let confirmar = confirm(`¿Seguro que quieres eliminar "${productos[indice].nombre}"?`);

  if (confirmar) {
    productos.splice(indice, 1);
    guardarProductos();
    dibujarTablaProductos();
  }
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/