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
              <button 
                class="btn btn-outline-primary btn-sm" 
                type="button"
                data-bs-toggle="collapse" 
                data-bs-target="#auditoria-${i}"
                aria-expanded="false"
                aria-controls="auditoria-${i}">
                Ver detalle
              </button>
          </td>
      </tr>
      <tr class="collapse" id="auditoria-${i}">
          <td colspan="5">
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
