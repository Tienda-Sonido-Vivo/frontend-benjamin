// creamos un arreglo de usuarios con datos de ejemplo
let datosGuardados = localStorage.getItem("usuarios");
let usuarios;

if (datosGuardados === null) {
  usuarios = [
    {
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      rol: "Administrador",
      estado: "Activo",
      auditoria: [
        "Inició sesión el 01/09/2026",
        "Actualizó el stock del producto #245",
        "Creó un nuevo usuario vendedor",
      ],
    },
    {
      nombre: "María López",
      email: "maria.lopez@example.com",
      rol: "Usuario",
      estado: "Activo",
      auditoria: [
        "Inició sesión el 30/08/2026",
        "Realizó una compra (Pedido #1123)",
      ],
    },
    {
      nombre: "Carlos Ramírez",
      email: "carlos.ramirez@example.com",
      rol: "Vendedor",
      estado: "Inactivo",
      auditoria: [
        "Inició sesión el 05/09/2026",
        "Actualizó el precio del producto #321",
      ],
    },
    {
      nombre: "Ana Martínez",
      email: "ana.martinez@example.com",
      rol: "Usuario",
      estado: "Activo",
      auditoria: [
        "Inició sesión el 01/09/2026",
        "Realizó una compra (Pedido #1124)",
      ],
    },
  ];

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
} else {
  // Si hay datos guardados en localStorage, los usamos
  usuarios = JSON.parse(datosGuardados);
}

/*NOTA si cambiamos el arreglo de usuarios, debemos actualizar el localStorage 
con localStorage.clear() en la consola del navegador y recargar la página*/

let listaUsuarios = document.getElementById("userTableBody");

// Función para dibujar la tabla de usuarios
function dibujarTabla() {
  let filasHTML = "";

  for (let i = 0; i < usuarios.length; i++) {
    filasHTML += `
      <tr>
          <td>${usuarios[i].nombre}</td>
          <td>${usuarios[i].email}</td>
          <td>${usuarios[i].rol}</td>
          <td>${usuarios[i].estado}</td>
          <td>
            <div class="d-flex">
              <button 
                class="btn btn-outline-primary btn-sm" 
                type="button"
                data-bs-toggle="collapse" 
                data-bs-target="#auditoria-${i}"
                aria-expanded="false"
                aria-controls="auditoria-${i}">
                Ver detalle
              </button>
            </div>
          </td>
          <td>
            <div class="d-flex gap-2">
              <button
                class="btn btn-outline-secondary btn-sm" 
                type="button" 
                onclick="abrirModalEditar(${i})">
                Editar
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                onclick="eliminarUsuario(${i})">
                Eliminar
              </button>
            </div>
          </td>
      </tr>
      <tr class="collapse" id="auditoria-${i}">
          <td colspan="6">
              <strong>Auditoría de ${usuarios[i].nombre}:</strong>
              <ul class="mb-0 ps-3">
                ${usuarios[i].auditoria.map((registro) => `<li>${registro}</li>`).join("")}
              </ul>
          </td>
      </tr>`;
  }

  listaUsuarios.innerHTML = filasHTML;
}

// Ordena el arreglo por "nombre" (alfabético)
let ordenAscendenteNombre = true;

function ordenarPorNombre() {
  usuarios.sort((a, b) => {
    if (ordenAscendenteNombre) {
      return a.nombre.localeCompare(b.nombre);
    } else {
      return b.nombre.localeCompare(a.nombre);
    }
  });

  ordenAscendenteNombre = !ordenAscendenteNombre; // invierte el orden para el próximo clic
  dibujarTabla();
}

// Ordena el arreglo por "email" (alfabético)
let ordenAscendenteEmail = true;

function ordenarPorEmail() {
  usuarios.sort((a, b) => {
    if (ordenAscendenteEmail) {
      return a.email.localeCompare(b.email);
    } else {
      return b.email.localeCompare(a.email);
    }
  });

  ordenAscendenteEmail = !ordenAscendenteEmail; // invierte el orden para el próximo clic
  dibujarTabla();
}

// Ordena el arreglo por "rol" (alfabético)
let ordenAscendenteRol = true;

function ordenarPorRol() {
  usuarios.sort((a, b) => {
    if (ordenAscendenteRol) {
      return a.rol.localeCompare(b.rol);
    } else {
      return b.rol.localeCompare(a.rol);
    }
  });

  ordenAscendenteRol = !ordenAscendenteRol; // invierte el orden para el próximo clic
  dibujarTabla();
}

//Ordenar el arreglo por "estado" (alfabético)
let ordenAscendenteEstado = true;

function ordenarPorEstado() {
  usuarios.sort((a, b) => {
    if (ordenAscendenteEstado) {
      return a.estado.localeCompare(b.estado);
    } else {
      return b.estado.localeCompare(a.estado);
    }
  });

  ordenAscendenteEstado = !ordenAscendenteEstado; // invierte el orden para el próximo clic
  dibujarTabla();
}

/* este código es una versión más avanzada que permite ordenar por cualquier campo de manera genérica
let ordenAscendente = {}; // guarda el estado de cada columna por separado

function ordenarPorCampo(campo) {
  if (ordenAscendente[campo] === undefined) ordenAscendente[campo] = true;

  usuarios.sort((a, b) => {
    return ordenAscendente[campo]
      ? a[campo].localeCompare(b[campo])
      : b[campo].localeCompare(a[campo]);
  });

  ordenAscendente[campo] = !ordenAscendente[campo];
  dibujarTabla();
}

["nombre", "email", "rol", "estado"].forEach((campo) => {
  let th = document.getElementById(campo);
  th.addEventListener("click", () => ordenarPorCampo(campo));
  th.style.cursor = "pointer";
});
*/

// Conecta el encabezado "Nombre" con la función de ordenar
document.getElementById("nombre").addEventListener("click", ordenarPorNombre);
document.getElementById("nombre").style.cursor = "pointer"; // pista visual de que se puede clickear
// Conecta el encabezado "Email" con la función de ordenar
document.getElementById("email").addEventListener("click", ordenarPorEmail);
document.getElementById("email").style.cursor = "pointer"; // pista visual de que se puede clickear
// Conecta el encabezado "Rol" con la función de ordenar
document.getElementById("rol").addEventListener("click", ordenarPorRol);
document.getElementById("rol").style.cursor = "pointer"; // pista visual de que se puede clickear
// Conecta el encabezado "Estado" con la función de ordenar
document.getElementById("estado").addEventListener("click", ordenarPorEstado);
document.getElementById("estado").style.cursor = "pointer"; // pista visual de que se puede clickear

// Primer dibujo de la tabla al cargar la página
dibujarTabla();

// Guarda el arreglo actual en localStorage
function guardarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Abre el modal vacío, en modo "crear"
function abrirModalAgregar() {
  document.getElementById("modalUsuarioTitulo").textContent = "Añadir Usuario";
  document.getElementById("indiceEdicion").value = -1;
  document.getElementById("inputNombre").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputRol").value = "Usuario";
  document.getElementById("inputEstado").value = "Activo";

  let modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
  modal.show();
}

// Abre el modal precargado con los datos de un usuario, en modo "editar"
function abrirModalEditar(indice) {
  document.getElementById("modalUsuarioTitulo").textContent = "Editar Usuario";
  document.getElementById("indiceEdicion").value = indice;
  document.getElementById("inputNombre").value = usuarios[indice].nombre;
  document.getElementById("inputEmail").value = usuarios[indice].email;
  document.getElementById("inputRol").value = usuarios[indice].rol;
  document.getElementById("inputEstado").value = usuarios[indice].estado;

  let modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
  modal.show();
}

// Se ejecuta al presionar "Guardar" en el modal (sirve para crear Y editar)
function guardarUsuarioDesdeModal() {
  let indice = parseInt(document.getElementById("indiceEdicion").value);

  let nombre = document.getElementById("inputNombre").value.trim();
  let email = document.getElementById("inputEmail").value.trim();
  let rol = document.getElementById("inputRol").value;
  let estado = document.getElementById("inputEstado").value;

  // Validación 1: campos obligatorios
  if (nombre === "" || email === "") {
    alert("Nombre y email son obligatorios");
    return;
  }

  // Validación 2: nombre con largo mínimo razonable
  if (nombre.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return;
  }

  // Validación 3: formato de email válido
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    alert("Ingresa un email válido (ejemplo: nombre@dominio.com)");
    return;
  }

  // Validación 4: email no repetido en otro usuario
  let emailDuplicado = usuarios.some((usuario, i) => {
    return usuario.email.toLowerCase() === email.toLowerCase() && i !== indice;
  });

  if (emailDuplicado) {
    alert("Ya existe un usuario con ese email");
    return;
  }

  // Si pasó todas las validaciones, se guarda
  if (indice === -1) {
    usuarios.push({
      nombre: nombre,
      email: email,
      rol: rol,
      estado: estado,
      auditoria: ["Usuario creado el " + new Date().toLocaleDateString()],
    });
  } else {
    usuarios[indice].nombre = nombre;
    usuarios[indice].email = email;
    usuarios[indice].rol = rol;
    usuarios[indice].estado = estado;
    usuarios[indice].auditoria.push(
      "Datos editados el " + new Date().toLocaleDateString()
    );
  }

  guardarUsuarios();
  dibujarTabla();

  let modal = bootstrap.Modal.getInstance(document.getElementById("modalUsuario"));
  modal.hide();
}

// Elimina un usuario, pidiendo confirmación antes
function eliminarUsuario(indice) {
  let confirmar = confirm(`¿Seguro que quieres eliminar a ${usuarios[indice].nombre}?`);

  if (confirmar) {
    usuarios.splice(indice, 1);
    guardarUsuarios();
    dibujarTabla();
  }
}