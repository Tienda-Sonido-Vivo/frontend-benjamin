let usuarios = [
  {
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    rol: "Administrador",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },
  {
    nombre: "María López",
    email: "maria.lopez@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },
  {
    nombre: "Carlos García",
    email: "carlos.garcia@example.com",
    rol: "Usuario",
    estado: "Inactivo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },
  {
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  },{
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    rol: "Usuario",
    estado: "Activo",
    acciones: [
      {
        nombre: "Editar",
      },
    ],
  }
];

let listaUsuarios = document.getElementById("userTableBody");

for (let i = 0; i < usuarios.length; i++) {
  listaUsuarios.innerHTML += `
    <tr>
        <td>${usuarios[i].nombre}</td>
        <td>${usuarios[i].email}</td>
        <td>${usuarios[i].rol}</td>
        <td>${usuarios[i].estado}</td>
        <td>
            ${usuarios[i].acciones.map((accion) => `<button class="btn btn-primary">${accion.nombre}</button>`).join(" ")}
        </td>
    </tr>`;
}
