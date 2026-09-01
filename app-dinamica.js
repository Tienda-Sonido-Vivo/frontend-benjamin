/*
 * GUÍA DE FUTURA INTEGRACIÓN DINÁMICA
 * Checkout - Sonido Vivo
 * 
 * Este archivo contiene ejemplos de cómo convertir
 * los elementos estáticos en dinámicos con datos del backend
 */

// ===================================================
// 1. SIMULACIÓN DE DATOS DE EJEMPLO (JSON)
// ===================================================

// Datos de ejemplo para productos
const productosDinamica = [
    {
        id: 1,
        nombre: "Guitarra Eléctrica \"StarSound Pro\"",
        codigo: "GIT-001",
        cantidad: 1,
        precio: 189990,
        imagen: "img/guitarra.jpg"
    },
    {
        id: 2,
        nombre: "Cable de Instrumento XLR 3m",
        codigo: "CAB-015",
        cantidad: 2,
        precio: 9990,
        imagen: "img/cable.jpg"
    },
    {
        id: 3,
        nombre: "Micrófono Condensador USB",
        codigo: "MIC-042",
        cantidad: 1,
        precio: 45990,
        imagen: "img/microfono.jpg"
    }
];

// Datos del cliente (capturados del perfil o carrito previo)
const datosCliente = {
    primerNombre: "Juan",
    apellido: "González",
    email: "juan.gonzalez@email.com",
    telefono: "+56912345678",
    rut: "12.345.678-K",
    direccion: "Calle Principal 123",
    ciudad: "Santiago",
    region: "metropolitana",
    codigoPostal: "8320000"
};

// Métodos de entrega disponibles
const metodosEntrega = [
    {
        id: "home",
        nombre: "Despacho a Domicilio",
        descripcion: "Envío a su dirección. Tiempo estimado: 3-5 días hábiles",
        costo: 5990
    },
    {
        id: "store",
        nombre: "Retiro en Tienda",
        descripcion: "Retire su compra en nuestra sucursal. Disponible en 24 horas",
        costo: 0
    }
];

// Métodos de pago disponibles
const metodosPago = [
    {
        id: "card",
        nombre: "Tarjeta de Crédito o Débito",
        icono: "💳",
        tieneFormulario: true
    },
    {
        id: "transfer",
        nombre: "Transferencia Bancaria",
        icono: "🏦",
        tieneFormulario: false
    },
    {
        id: "paypal",
        nombre: "PayPal",
        icono: "🌐",
        tieneFormulario: false
    }
];

// ===================================================
// 2. FUNCIÓN PARA GENERAR RESUMEN DE PRODUCTOS DINÁMICAMENTE
// ===================================================

function generarResumenProductos(productos) {
    const contenedor = document.querySelector('.card-body');
    
    let html = '';
    productos.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        html += `
            <div class="product-summary">
                <div class="product-summary-header">
                    <div>
                        <div class="product-name">${producto.nombre}</div>
                        <small class="text-muted">Código: ${producto.codigo}</small>
                    </div>
                    <span class="product-qty">Qty: ${producto.cantidad}</span>
                </div>
                <div class="text-end">
                    <span class="product-price">$${subtotal.toLocaleString('es-CL')}</span>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

// ===================================================
// 3. FUNCIÓN PARA GENERAR OPCIONES DE ENTREGA DINÁMICAMENTE
// ===================================================

function generarMetodosEntrega(metodos) {
    const contenedor = document.querySelector('[class*="delivery"]').parentElement;
    
    let html = '';
    metodos.forEach((metodo, index) => {
        const checked = index === 0 ? 'checked' : '';
        html += `
            <div class="delivery-option">
                <div>
                    <input class="form-check-input" type="radio" name="delivery" 
                           id="delivery-${metodo.id}" value="${metodo.id}" ${checked}>
                    <label class="form-check-label ms-2" for="delivery-${metodo.id}">
                        <strong>${metodo.nombre}</strong>
                    </label>
                </div>
                <small class="text-muted d-block mt-2 ms-4">${metodo.descripcion}</small>
                <div class="text-end mt-2">
                    <strong class="${metodo.costo === 0 ? 'text-success' : 'text-primary'}">
                        ${metodo.costo === 0 ? 'GRATIS' : `$${metodo.costo.toLocaleString('es-CL')}`}
                    </strong>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

// ===================================================
// 4. FUNCIÓN PARA CARGAR DATOS DEL CLIENTE EN FORMULARIO
// ===================================================

function cargarDatosCliente(cliente) {
    document.getElementById('firstName').value = cliente.primerNombre;
    document.getElementById('lastName').value = cliente.apellido;
    document.getElementById('email').value = cliente.email;
    document.getElementById('phone').value = cliente.telefono;
    document.getElementById('rut').value = cliente.rut;
    document.getElementById('address').value = cliente.direccion;
    document.getElementById('city').value = cliente.ciudad;
    document.getElementById('region').value = cliente.region;
    document.getElementById('zipcode').value = cliente.codigoPostal;
}

// ===================================================
// 5. FUNCIÓN PARA CALCULAR TOTALES DINÁMICAMENTE
// ===================================================

function calcularTotales(productos, costoEntrega, descuentoPorcentaje = 10) {
    // Cálculo del subtotal
    const subtotal = productos.reduce((total, p) => total + (p.precio * p.cantidad), 0);
    
    // Cálculo del descuento
    const descuento = Math.round(subtotal * (descuentoPorcentaje / 100));
    
    // Cálculo del total
    const total = subtotal - descuento + costoEntrega;
    
    return {
        subtotal,
        descuento,
        costoEntrega,
        total
    };
}

// ===================================================
// 6. FUNCIÓN PARA ACTUALIZAR RESUMEN DE TOTALES
// ===================================================

function actualizarResumenTotal(productos, costoEntrega) {
    const totales = calcularTotales(productos, costoEntrega);
    
    document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = 
        `$${totales.subtotal.toLocaleString('es-CL')}`;
    
    document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = 
        `-$${totales.descuento.toLocaleString('es-CL')}`;
    
    document.getElementById('shippingCost').textContent = 
        totales.costoEntrega === 0 ? 'GRATIS' : `$${totales.costoEntrega.toLocaleString('es-CL')}`;
    
    document.getElementById('totalCost').textContent = 
        `$${totales.total.toLocaleString('es-CL')}`;
}

// ===================================================
// 7. FUNCIÓN PARA PROCESAR COMPRA CON BACKEND
// ===================================================

async function procesarCompraDinamica(event) {
    event.preventDefault();
    
    // Obtener datos del formulario
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Construir objeto de pedido
    const datosFormulario = new FormData(form);
    const pedido = {
        cliente: {
            nombre: datosFormulario.get('firstName'),
            apellido: datosFormulario.get('lastName'),
            email: datosFormulario.get('email'),
            telefono: datosFormulario.get('phone'),
            rut: datosFormulario.get('rut'),
            direccion: datosFormulario.get('address'),
            ciudad: datosFormulario.get('city'),
            region: datosFormulario.get('region')
        },
        productos: productosDinamica,
        entrega: document.querySelector('input[name="delivery"]:checked').value,
        pago: document.querySelector('input[name="payment"]:checked').value,
        fecha: new Date().toISOString()
    };
    
    try {
        // AQUÍ iría la llamada a la API del backend
        // const respuesta = await fetch('/api/pedidos', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(pedido)
        // });
        
        // const resultado = await respuesta.json();
        // const numeroPedido = resultado.numeroPedido;
        
        // Para ahora, simulamos la respuesta
        const numeroPedido = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        
        // Mostrar modal con datos
        mostrarConfirmacionDinamica(numeroPedido, pedido);
        
    } catch (error) {
        console.error('Error al procesar compra:', error);
        alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
    }
}

// ===================================================
// 8. FUNCIÓN PARA MOSTRAR CONFIRMACIÓN DINÁMICA
// ===================================================

function mostrarConfirmacionDinamica(numeroPedido, pedido) {
    document.getElementById('orderNumberDisplay').textContent = `Pedido #${numeroPedido}`;
    document.getElementById('confirmCustomer').textContent = 
        `${pedido.cliente.nombre} ${pedido.cliente.apellido}`;
    document.getElementById('confirmEmail').textContent = pedido.cliente.email;
    document.getElementById('confirmPhone').textContent = pedido.cliente.telefono;
    
    // Obtener el total actual de la pantalla
    const totalActual = document.getElementById('totalCost').textContent;
    document.getElementById('confirmTotal').textContent = totalActual;
    
    const metodosEntrega = {
        'home': 'Despacho a Domicilio',
        'store': 'Retiro en Tienda'
    };
    document.getElementById('confirmDelivery').textContent = 
        metodosEntrega[pedido.entrega] || 'No especificado';
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
}

// ===================================================
// 9. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ===================================================

// Este código se ejecutaría cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    
    // Descomentar para usar datos dinámicos:
    
    // generarResumenProductos(productosDinamica);
    // generarMetodosEntrega(metodosEntrega);
    // cargarDatosCliente(datosCliente);
    // actualizarResumenTotal(productosDinamica, 5990);
    
    // // Cambiar handler del botón
    // document.getElementById('checkoutBtn').onclick = procesarCompraDinamica;
    
    console.log('✓ Página de checkout cargada');
    console.log('Para activar datos dinámicos, descomentar funciones en app.js');
});

// ===================================================
// 10. EJEMPLOS DE USO
// ===================================================

/*

// Uso básico:
generarResumenProductos(productosDinamica);
generarMetodosEntrega(metodosEntrega);
cargarDatosCliente(datosCliente);

// Calcular totales:
const totales = calcularTotales(productosDinamica, 5990);
console.log(totales);
// Output: { subtotal: 255960, descuento: 25596, costoEntrega: 5990, total: 236354 }

// Actualizar al cambiar entrega:
document.addEventListener('change', (e) => {
    if (e.target.name === 'delivery') {
        const costoEntrega = metodosEntrega.find(m => m.id === e.target.value).costo;
        actualizarResumenTotal(productosDinamica, costoEntrega);
    }
});

// Procesar compra:
document.getElementById('checkoutBtn').addEventListener('click', procesarCompraDinamica);

*/

// ===================================================
// NOTAS PARA INTEGRACIÓN CON BACKEND
// ===================================================

/*

PASOS PARA FUTURA IMPLEMENTACIÓN:

1. CARGAR DATOS DEL CARRITO
   - GET /api/carrito/:usuarioId
   - Devuelve: Array de productos con precios actuales

2. CARGAR DATOS DEL CLIENTE
   - GET /api/usuarios/:usuarioId
   - Devuelve: Datos personales guardados (si existen)

3. OBTENER MÉTODOS DE ENTREGA
   - GET /api/entregas
   - Devuelve: Array con costos y disponibilidad

4. PROCESAR PEDIDO
   - POST /api/pedidos
   - Envía: Datos completos del pedido
   - Recibe: Número de pedido y confirmación

5. GUARDAR PAGO
   - POST /api/pagos (con datos encriptados)
   - Devuelve: Confirmación de transacción

6. ENVIAR EMAIL DE CONFIRMACIÓN
   - POST /api/emails/confirmacion
   - Parámetros: Número de pedido, email del cliente

7. REDIRIGIR A PANTALLA DE RESULTADO
   - GET /confirmacion/:numeroPedido
   - Muestra boleta electrónica y estado del envío

*/
