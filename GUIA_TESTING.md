# GUÍA RÁPIDA DE USO Y TESTING
## Checkout - Sonido Vivo

---

## 🚀 INICIO RÁPIDO

### 1. Abrir la pantalla
```
Abre: checkout.html en tu navegador
URL: file:///[ruta-a-tu-proyecto]/checkout.html
```

### 2. Probar funcionalidades básicas

| Acción | Resultado Esperado |
|--------|-------------------|
| Cambiar "Método de Entrega" | El costo de envío cambiar en resumen |
| Cambiar "Método de Pago" | Aparecen/desaparecen campos de tarjeta |
| Completar formulario | Puedes habilitar botón "Confirmar Compra" |
| Hacer clic "Confirmar Compra" | Aparece modal con confirmación |

---

## 📱 TESTING RESPONSIVO

### Opción 1: Emulador del Navegador
**Chrome, Firefox, Edge:**
1. Abre DevTools: `F12` o `Ctrl+Shift+I`
2. Haz clic en icono "Toggle device toolbar" (esquina superior izquierda)
3. Selecciona dispositivo del dropdown o ingresa resolución manual

### Opción 2: Pruebas Manuales

#### 🔹 MÓVIL (360px)
**Cómo ajustar:**
- Chrome DevTools: Selecciona "iPhone SE" o ingresa 375x667
- Firefox: Selecciona "iPhone 12" o 360x640

**Qué verificar:**
- [ ] Navbar se colapsa en menú hamburguesa
- [ ] Contenido apilado verticalmente
- [ ] Botones ocupan 100% ancho
- [ ] Texto legible sin zoom
- [ ] Formulario usa toda el ancho
- [ ] Resumen bajo el contenido
- [ ] Modal cabe en pantalla
- [ ] Sin scroll horizontal

**Resoluciones a probar:**
- 360x640 (Samsung Galaxy S5)
- 375x667 (iPhone SE)
- 384x854 (Motorola G series)

#### 🔹 TABLETA (768px)
**Cómo ajustar:**
- Chrome DevTools: Selecciona "iPad" o ingresa 768x1024
- Firefox: Selecciona "iPad" o 768x1024

**Qué verificar:**
- [ ] Navbar completamente expandido
- [ ] Dos columnas: contenido (60%) + resumen (40%)
- [ ] Formulario con 2 columnas en campos dobles
- [ ] Resumen comienza a aparecer a la derecha
- [ ] Botones legibles y clickeables
- [ ] Excelente legibilidad de texto
- [ ] Scroll suave y natural

**Resoluciones a probar:**
- 768x1024 (iPad)
- 800x600 (Tablet genérica)
- 810x1080 (Samsung Tab)

#### 🔹 DESKTOP (1280px)
**Cómo ajustar:**
- Maximiza navegador normal
- O redimensiona a 1280x960 (o mayor)
- Chrome DevTools: Selecciona "Responsive" e ingresa 1280x900

**Qué verificar:**
- [ ] Layout profesional de 2 columnas
- [ ] Formulario a la izquierda, resumen fijo a la derecha
- [ ] Resumen se pega al scroll (sticky)
- [ ] Máxima legibilidad sin comprometer espacio
- [ ] Navbar visible completo
- [ ] Sin necesidad de scroll horizontal
- [ ] Todos los elementos accesibles

**Resoluciones a probar:**
- 1280x720 (Laptop pequeña)
- 1366x768 (Laptop estándar)
- 1920x1080 (Full HD)
- 2560x1440 (QHD)

---

## 🧪 CHECKLIST DE TESTING COMPLETO

### Funcionalidad General
- [ ] Página carga sin errores en consola
- [ ] Bootstrap está cargando (estilos visibles)
- [ ] Todos los elementos son interactivos
- [ ] No hay texto cortado o solapado

### Navbar
- [ ] Logo visible y con color correcto
- [ ] Menú hamburguesa solo en móvil
- [ ] Menú se expande/colapsa correctamente
- [ ] Links de navegación funcionan (simulados con alert)
- [ ] Navbar es sticky (se mantiene arriba al scroll)

### Breadcrumb
- [ ] Visible en todas las resoluciones
- [ ] Links de navegación funcionan
- [ ] Responsive sin romper formato

### Resumen de Compra
- [ ] Productos se muestran correctamente
- [ ] Código de producto visible
- [ ] Cantidad visible
- [ ] Precios muestran formato correcto ($XXX.XXX)
- [ ] Sin productos cortados

### Método de Entrega
- [ ] Radio buttons funcionan correctamente
- [ ] "Despacho" está seleccionado por defecto
- [ ] Cambiar opción actualiza costo de envío
- [ ] Descripciones claras y legibles
- [ ] Precios se actualizan correctamente

### Formulario
- [ ] Todos los campos son accesibles
- [ ] Labels asociados correctamente a inputs
- [ ] Campos son clickeables
- [ ] Placeholder visible
- [ ] Focus (enfoque) tiene estilo visible
- [ ] Validación funciona (error si faltan datos)
- [ ] En móvil: campos apilados
- [ ] En tablet: campos en 2 columnas

### Método de Pago
- [ ] Radio buttons funcionan
- [ ] Tarjeta está seleccionada por defecto
- [ ] Cambiar método muestra/oculta campos
- [ ] Campos de tarjeta aparecer/desaparecen suavemente
- [ ] Información de transferencia legible
- [ ] Sin parpadeos o cambios abruptos

### Resumen Total (Lateral)
- [ ] Visible en desktop
- [ ] Se pega al scroll (sticky) en desktop
- [ ] Se mueve normalmente en móvil/tablet
- [ ] Totales se actualizan al cambiar entrega
- [ ] Formato de moneda correcto

### Botones
- [ ] "Volver" redirige (simulado con alert)
- [ ] "Confirmar Compra" abre modal
- [ ] Botones tienen hover visibles
- [ ] En móvil ocupan 100% ancho
- [ ] Texto legible

### Modal de Confirmación
- [ ] Se abre al confirmar compra
- [ ] Número de pedido es aleatorio (diferente cada vez)
- [ ] Datos del cliente se rellenan
- [ ] Total actualizado correctamente
- [ ] Modal cabe en pantalla (todas las resoluciones)
- [ ] Botón "Ir a Inicio" funciona
- [ ] Se puede cerrar con X

### Footer
- [ ] Visible en todas las páginas
- [ ] Información de contacto legible
- [ ] Colores correctos
- [ ] Copyright visible

### Responsividad General
- [ ] Sin scroll horizontal en ninguna resolución
- [ ] Texto legible sin zoom en todas las vistas
- [ ] Imágenes/emojis se ven correctamente
- [ ] Espacios bien distribuidos
- [ ] Botones clickeables con dedo

---

## 🐛 DEBUGGING COMÚN

### Problema: Estilos no se aplican
**Solución:**
- Limpia caché del navegador: `Ctrl+Shift+Delete` (Chrome)
- O abre en incógnito/privado
- Verifica que Bootstrap CDN está accesible

### Problema: JavaScript no funciona
**Solución:**
- Abre DevTools (`F12`) → Console
- Busca errores rojos
- Verifica que no hay error 404 en recursos

### Problema: Formulario no valida
**Solución:**
- Asegúrate de llenar TODOS los campos con * (requerido)
- Verifica que email tiene formato válido

### Problema: Modal no se abre
**Solución:**
- Comprueba que todos los campos están completos
- Abre Console (F12) y busca mensajes de error
- Verifica que Bootstrap JS está cargando

### Problema: Layout roto en cierta resolución
**Solución:**
- Verifica que usas un breakpoint valido de Bootstrap
- Abre DevTools y usa "Toggle device toolbar"
- Intenta recargar página (`Ctrl+R`)

---

## 📊 MATRIZ DE TESTING POR RESOLUCIÓN

```
DISPOSITIVO          RESOLUCIÓN    ESTADO    ERRORES
─────────────────────────────────────────────────────
iPhone SE            375x667       [ ]       ▁▁▁
Samsung Galaxy S5    360x640       [ ]       ▁▁▁
─────────────────────────────────────────────────────
iPad                 768x1024      [ ]       ▁▁▁
Samsung Tab A        810x1080      [ ]       ▁▁▁
─────────────────────────────────────────────────────
Laptop               1366x768      [ ]       ▁▁▁
Full HD Monitor      1920x1080     [ ]       ▁▁▁
─────────────────────────────────────────────────────
```

---

## 🎯 OBJETIVOS DE TESTING

### MÓVIL (360-575px)
```
✓ UX simplificada pero completa
✓ Toda la funcionalidad accesible sin scroll lateral
✓ Botones grandes y fáciles de clickear
✓ Menú hamburguesa funcionando
✓ Formulario legible
```

### TABLET (576-991px)
```
✓ Aprovecha más espacio
✓ Dos columnas comenzando a aparecer
✓ Menú completamente expandido
✓ Excelente balance de contenido
✓ Todas las secciones accesibles
```

### DESKTOP (992px+)
```
✓ Layout profesional
✓ Resumen sticky en lateral
✓ Máximo aprovechamiento de espacio
✓ Navegación completa
✓ Excelente experiencia visual
```

---

## 📹 GRABACIÓN DE PANTALLA (Recomendado)

**Para presentación a profesor:**

1. **OBS Studio** (Gratis)
   - Descarga: https://obsproject.com/
   - Opción: Settings → Output → Container → MP4

2. **Grabador de pantalla Windows**
   - Atajo: `Win + G`
   - Botón de grabación azul

3. **Recordar en video:**
   - Mostrar 360px (móvil)
   - Cambiar a 768px (tablet)
   - Cambiar a 1280px (desktop)
   - Completar formulario
   - Confirmar compra
   - Mostrar modal

---

## 💾 ARCHIVOS GENERADOS

```
Checkout - Sonido Vivo/
├── checkout.html                 ← Pantalla principal
├── checkout-estilos.css          ← Estilos (opcional)
├── app-dinamica.js               ← Funciones para backend
├── CHECKOUT_EXPLICACION.md       ← Documentación completa
└── GUIA_TESTING.md               ← Este archivo
```

---

## ❓ PREGUNTAS FRECUENTES

### P: ¿Puedo modificar los productos?
R: Sí. Busca `<div class="product-summary">` y modifica el contenido. Mantén la estructura HTML igual.

### P: ¿Cómo cambio los colores?
R: En `<style>`, busca `:root` y modifica las variables `--color-primary`, etc.

### P: ¿Cómo agrego un nuevo método de pago?
R: Copia el bloque `<div class="payment-option">` y adapta el ID.

### P: ¿Qué pasa si borro JavaScript?
R: Los cambios dinámicos no funcionarán, pero el formulario y layout seguirán visibles.

### P: ¿Es necesario el archivo CSS separado?
R: No. Los estilos están dentro del HTML. El CSS separado es solo para mejor organización.

### P: ¿Cómo conecto con una base de datos?
R: Ver archivo `app-dinamica.js` para ejemplos de cómo estructurar llamadas a API.

---

## 🎓 PUNTOS PARA DEFENDER EN EVALUACIÓN

1. **"¿Cómo manejaste la responsividad?"**
   - "Uso Bootstrap Grid (col-lg-8, col-lg-4) para adaptarse automáticamente"
   - "Media queries CSS para ajustes finos en 360px y 768px"
   - "Sin valores fijos, todo con unidades relativas (rem, %)"

2. **"¿Por qué usaste estos componentes?"**
   - "Card para agrupar secciones lógicamente"
   - "Modal para confirmar compra de forma clara"
   - "Form controls de Bootstrap para consistencia"

3. **"¿Cómo lo harías dinámico?"**
   - "Los IDs de elementos están listos para JavaScript"
   - "Estructura preparada para iterar sobre arrays de productos"
   - "Ver archivo `app-dinamica.js` para ejemplos"

4. **"¿Qué tecnologías usaste?"**
   - "HTML5 semántico, CSS3, Bootstrap 5, JavaScript vanilla mínimo"
   - "Sin frameworks frontend (React, Vue, Angular)"
   - "Sin librerías innecesarias"

---

## ✅ ANTES DE ENTREGAR

- [ ] Probé en 360px (móvil)
- [ ] Probé en 768px (tablet)  
- [ ] Probé en 1280px (desktop)
- [ ] Completo formulario sin errores
- [ ] Modal se abre correctamente
- [ ] Sin errores en consola (F12 → Console)
- [ ] Todos los links/botones funcionan
- [ ] Código limpio y comentado
- [ ] Puedo explicar cada sección
- [ ] Archivos organizados en carpeta del proyecto

---

**¡Listo para presentación!** 🚀

Si tienes dudas, revisa `CHECKOUT_EXPLICACION.md` para más detalles técnicos.
