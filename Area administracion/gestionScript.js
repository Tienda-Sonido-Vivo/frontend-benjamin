/*----------------------------------------------------------------------------------------------------------------------------------------*/
// creamos un arreglo de usuarios con datos de ejemplo
let datosGuardados = localStorage.getItem("usuarios");
let usuarios;

if (datosGuardados === null) {
  usuarios = [
    {
      run: "12345678-9",
      nombre: "Juan",
      apellidos: "Pérez Gómez",
      email: "juan.perez@example.com",
      fechaNacimiento: "1990-05-15",
      region: "Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: "Calle Falsa 123",
      rol: "Administrador",
      estado: "Activo",
      auditoria: [
        "Inició sesión el 01/09/2026",
        "Actualizó el stock del producto #245",
        "Creó un nuevo usuario vendedor",
      ],
    },
    {
      run: "98765432-1",
      nombre: "María",
      apellidos: "González López",
      email: "maria.gonzalez@example.com",
      fechaNacimiento: "1985-12-03",
      region: "Valparaíso",
      comuna: "Viña del Mar",
      direccion: "Avenida Principal 456",
      rol: "Vendedor",
      estado: "Activo",
      auditoria: [
        "Inició sesión el 02/09/2026",
        "Realizó una venta exitosa",
        "Actualizó el catálogo de productos",
      ],
    },
    {
      run: "11111111-1",
      nombre: "Carlos",
      apellidos: "Ramírez Soto",
      email: "carlos.ramirez@example.com",
      fechaNacimiento: "1995-08-20",
      region: "Maule",
      comuna: "Talca",
      direccion: "Calle Central 789",
      rol: "Usuario",
      estado: "Inactivo",
      auditoria: [
        "Inició sesión el 03/09/2026",
        "Consultó información de productos",
        "Cerró sesión correctamente",
      ],
    }
  ];

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
} else {
  // Si hay datos guardados en localStorage, los usamos
  usuarios = JSON.parse(datosGuardados);
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*NOTA si cambiamos el arreglo de usuarios, debemos actualizar el localStorage 
con localStorage.clear() en la consola del navegador y recargar la página*/

let listaUsuarios = document.getElementById("userTableBody");

// Función para dibujar la tabla de usuarios
function dibujarTabla() {
  let filasHTML = "";

  for (let i = 0; i < usuarios.length; i++) {
    filasHTML += `
      <tr>    
          <td>${usuarios[i].run}</td>
          <td>${usuarios[i].nombre}</td>
          <td>${usuarios[i].apellidos}</td>
          <td>${usuarios[i].email}</td>
          <td>${usuarios[i].fechaNacimiento}</td>
          <td>${usuarios[i].region}</td>
          <td>${usuarios[i].comuna}</td>
          <td>${usuarios[i].direccion}</td>
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
          <td colspan="12">
              <strong>Auditoría de ${usuarios[i].nombre}:</strong>
              <ul class="mb-0 ps-3">
                ${usuarios[i].auditoria.map((registro) => `<li>${registro}</li>`).join("")}
              </ul>
          </td>
      </tr>`;
  }

  listaUsuarios.innerHTML = filasHTML;
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Guarda si cada columna está ordenada ascendente o descendente
let ordenAscendente = {};

// Ordena el arreglo "usuarios" por el campo indicado (ej: "nombre", "run", "comuna")
function ordenarPorCampo(campo) {
  if (ordenAscendente[campo] === undefined) {
    ordenAscendente[campo] = true;
  }

  usuarios.sort((a, b) => {
    return ordenAscendente[campo]
      ? a[campo].localeCompare(b[campo])
      : b[campo].localeCompare(a[campo]);
  });

  ordenAscendente[campo] = !ordenAscendente[campo];
  dibujarTabla();
}

// Conecta CADA encabezado (<th>) que tenga uno de estos ids con la función de ordenar
let columnasOrdenables = [
  "run",
  "nombre",
  "apellidos",
  "email",
  "region",
  "comuna",
  "direccion",
  "rol",
  "estado",
];

columnasOrdenables.forEach((campo) => {
  let th = document.getElementById(campo);
  th.addEventListener("click", () => ordenarPorCampo(campo));
  th.style.cursor = "pointer";
});

// Primer dibujo de la tabla al cargar la página
dibujarTabla();

// Guarda el arreglo actual en localStorage
function guardarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Abre el modal vacío, en modo "crear"
function abrirModalAgregar() {
  document.getElementById("modalUsuarioTitulo").textContent = "Añadir Usuario";
  document.getElementById("indiceEdicion").value = -1;
  document.getElementById("inputRun").value = "";
  document.getElementById("inputNombre").value = "";
  document.getElementById("inputApellidos").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputFechaNacimiento").value = "";
  document.getElementById("inputRegion").value = "";
  llenarSelectComunas(""); // resetea comuna a "deshabilitado"
  document.getElementById("inputDireccion").value = "";
  document.getElementById("inputRol").value = "Usuario";
  document.getElementById("inputEstado").value = "Activo";

  let modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
  modal.show();
}

// Abre el modal precargado con los datos de un usuario, en modo "editar"
function abrirModalEditar(indice) {
  document.getElementById("modalUsuarioTitulo").textContent = "Editar Usuario";
  document.getElementById("indiceEdicion").value = indice;
  document.getElementById("inputRun").value = usuarios[indice].run;
  document.getElementById("inputNombre").value = usuarios[indice].nombre;
  document.getElementById("inputApellidos").value = usuarios[indice].apellidos;
  document.getElementById("inputEmail").value = usuarios[indice].email;
  document.getElementById("inputFechaNacimiento").value =
    usuarios[indice].fechaNacimiento;
  document.getElementById("inputRegion").value = usuarios[indice].region;
  llenarSelectComunas(usuarios[indice].region, usuarios[indice].comuna);
  document.getElementById("inputDireccion").value = usuarios[indice].direccion;
  document.getElementById("inputRol").value = usuarios[indice].rol;
  document.getElementById("inputEstado").value = usuarios[indice].estado;

  let modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
  modal.show();
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Se ejecuta al presionar "Guardar" en el modal (sirve para crear Y editar)
function guardarUsuarioDesdeModal() {
  let indice = parseInt(document.getElementById("indiceEdicion").value);

  let run = document.getElementById("inputRun").value.trim();
  let nombre = document.getElementById("inputNombre").value.trim();
  let apellidos = document.getElementById("inputApellidos").value.trim();
  let email = document.getElementById("inputEmail").value.trim();
  let fechaNacimiento = document.getElementById("inputFechaNacimiento").value;
  let region = document.getElementById("inputRegion").value.trim();
  let comuna = document.getElementById("inputComuna").value.trim();
  let direccion = document.getElementById("inputDireccion").value.trim();
  let rol = document.getElementById("inputRol").value;
  let estado = document.getElementById("inputEstado").value;

  // Validación 1: campos obligatorios
  if (run === "" || nombre === "" || apellidos === "" || email === "") {
    alert("RUN, nombre, apellidos y email son obligatorios");
    return;
  }

  // Validación 2: nombre con largo mínimo
  if (nombre.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return;
  }

  // Validación 3: formato de email
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    alert("Ingresa un email válido (ejemplo: nombre@dominio.com)");
    return;
  }

  // Validación 4: RUN obligatorio, sin puntos, con dígito verificador válido
  if (!validarRun(run)) {
    alert("Ingresa un RUN válido, sin puntos (ejemplo: 12345678-9)");
    return;
  }

  // Validación 5: email no repetido
  let emailDuplicado = usuarios.some((usuario, i) => {
    return usuario.email.toLowerCase() === email.toLowerCase() && i !== indice;
  });
  if (emailDuplicado) {
    alert("Ya existe un usuario con ese email");
    return;
  }

  // Validación 6: RUN no repetido
  let runDuplicado = usuarios.some((usuario, i) => {
    return usuario.run === run && i !== indice;
  });
  if (runDuplicado) {
    alert("Ya existe un usuario con ese RUN");
    return;
  }

  // Si pasó todas las validaciones, se guarda
  if (indice === -1) {
    usuarios.push({
      run: run,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      fechaNacimiento: fechaNacimiento,
      region: region,
      comuna: comuna,
      direccion: direccion,
      rol: rol,
      estado: estado,
      auditoria: ["Usuario creado el " + new Date().toLocaleDateString()],
    });
  } else {
    usuarios[indice].run = run;
    usuarios[indice].nombre = nombre;
    usuarios[indice].apellidos = apellidos;
    usuarios[indice].email = email;
    usuarios[indice].fechaNacimiento = fechaNacimiento;
    usuarios[indice].region = region;
    usuarios[indice].comuna = comuna;
    usuarios[indice].direccion = direccion;
    usuarios[indice].rol = rol;
    usuarios[indice].estado = estado;
    usuarios[indice].auditoria.push(
      "Datos editados el " + new Date().toLocaleDateString(),
    );
  }

  guardarUsuarios();
  dibujarTabla();

  let modal = bootstrap.Modal.getInstance(
    document.getElementById("modalUsuario"),
  );
  modal.hide();
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Elimina un usuario, pidiendo confirmación antes
function eliminarUsuario(indice) {
  let confirmar = confirm(
    `¿Seguro que quieres eliminar a ${usuarios[indice].nombre}?`,
  );

  if (confirmar) {
    usuarios.splice(indice, 1);
    guardarUsuarios();
    dibujarTabla();
  }
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
function calcularDigitoVerificador(rutSinDv) {
  let suma = 0;
  let multiplicador = 2;

  // Recorremos el rut de derecha a izquierda
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    suma += parseInt(rutSinDv[i]) * multiplicador;
    multiplicador++;
    if (multiplicador > 7) {
      multiplicador = 2; // la secuencia se reinicia después del 7
    }
  }

  let resto = 11 - (suma % 11);

  if (resto === 11) return "0";
  if (resto === 10) return "K";
  return resto.toString();
}

function validarRun(run) {
  // Formato: 7 u 8 dígitos, seguidos directo del verificador (número o K), sin puntos ni guion
  let regexFormato = /^\d{7,8}[\dkK]$/;

  if (!regexFormato.test(run)) {
    return false;
  }

  let cuerpo = run.slice(0, -1); /* todo menos el último caracter */
  let dvIngresado = run.slice(-1).toUpperCase(); // último caracter, en mayúscula

  let dvCalculado = calcularDigitoVerificador(cuerpo);

  return dvIngresado === dvCalculado;
}

function validarRun(run) {
  // Formato: 7 u 8 dígitos, guion, y verificador (número o K) — sin puntos
  let regexFormato = /^\d{7,8}-[\dkK]$/;

  if (!regexFormato.test(run)) {
    return false;
  }

  let partes = run.split("-");
  let cuerpo = partes[0]; // ej: "12345678"
  let dvIngresado = partes[1].toUpperCase(); // ej: "9" o "K"

  let dvCalculado = calcularDigitoVerificador(cuerpo);

  return dvIngresado === dvCalculado;
}

document.getElementById("inputRun").addEventListener("blur", function () {
  let run = this.value.trim();

  if (run === "") return; // no valida si está vacío, eso ya lo cubre el "Guardar"

  if (!validarRun(run)) {
    this.classList.add("is-invalid");
  } else {
    this.classList.remove("is-invalid");
  }
});
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Llena el <select> de Región con las claves del objeto regionesComunas
function llenarSelectRegiones() {
  let selectRegion = document.getElementById("inputRegion");

  for (let nombreRegion in regionesComunas) {
    let opcion = document.createElement("option");
    opcion.value = nombreRegion;
    opcion.textContent = nombreRegion;
    selectRegion.appendChild(opcion);
  }
}

// Llena el <select> de Comuna según la región elegida
function llenarSelectComunas(regionSeleccionada, comunaAPreseleccionar) {
  let selectComuna = document.getElementById("inputComuna");
  selectComuna.innerHTML = ""; // limpia las opciones anteriores

  if (regionSeleccionada === "") {
    selectComuna.innerHTML =
      '<option value="">Primero selecciona una región</option>';
    selectComuna.disabled = true;
    return;
  }

  selectComuna.disabled = false;
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

  let comunas = regionesComunas[regionSeleccionada];

  comunas.forEach((comuna) => {
    let opcion = document.createElement("option");
    opcion.value = comuna;
    opcion.textContent = comuna;
    if (comuna === comunaAPreseleccionar) {
      opcion.selected = true;
    }
    selectComuna.appendChild(opcion);
  });
}

// Cada vez que cambia la región, se regenera la lista de comunas
document.getElementById("inputRegion").addEventListener("change", function () {
  llenarSelectComunas(this.value);
});

// Llenamos el select de regiones una sola vez, al cargar la página
llenarSelectRegiones();
/*----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------*/
function llenarSelectComunas(regionSeleccionada, comunaAPreseleccionar) {
  let selectComuna = document.getElementById("inputComuna");
  selectComuna.innerHTML = "";

  if (regionSeleccionada === "" || !regionesComunas[regionSeleccionada]) {
    selectComuna.innerHTML =
      '<option value="">Primero selecciona una región</option>';
    selectComuna.disabled = true;
    return;
  }

  selectComuna.disabled = false;
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

  let comunas = regionesComunas[regionSeleccionada];

  comunas.forEach((comuna) => {
    let opcion = document.createElement("option");
    opcion.value = comuna;
    opcion.textContent = comuna;
    if (comuna === comunaAPreseleccionar) {
      opcion.selected = true;
    }
    selectComuna.appendChild(opcion);
  });
}
/*----------------------------------------------------------------------------------------------------------------------------------------*/