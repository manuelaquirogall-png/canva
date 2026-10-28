document.addEventListener('DOMContentLoaded', () => {
  // Elementos del primer modal
  const btnAbrir = document.querySelector('.marcaNueva');
  const btnCerrar = document.getElementById('btnCerrarModal');
  const modalMarca = document.getElementById('modalMarca');
  const inputNombre = document.getElementById('nombreMarca');
  const listaMarcas = document.querySelector('.listaMarcas');

  const btnCrearCerrar = document.querySelector('.btnModalSecundario');
  const btnCrearAnadir = document.querySelector('.btnModalPrincipal');

  // Elementos del segundo modal
  const modalElementos = document.getElementById('modalElementos');
  const btnCerrarElementos = document.getElementById('btnCerrarElementos');
  const btnGuardarElementos = document.getElementById('btnGuardarElementos');
  const tituloMarcaCreada = document.getElementById('tituloMarcaCreada');
  const btnEditarTitulo = document.querySelector('.iconoEditar');

  // Variable para guardar la referencia de la última tarjeta creada
  let tarjetaActual = null;

  // Abrir primer modal
  if (btnAbrir && modalMarca) {
    btnAbrir.addEventListener('click', (e) => {
      e.preventDefault();
      modalMarca.classList.add('activo');
    });
  }

  // Funciones de cierre
  function cerrarModalMarca() {
    modalMarca.classList.remove('activo');
    inputNombre.value = '';
  }

  function cerrarModalElementos() {
    modalElementos.classList.remove('activo');
  }

  // Eventos de cierre
  if (btnCerrar) btnCerrar.addEventListener('click', cerrarModalMarca);
  if (btnCerrarElementos) btnCerrarElementos.addEventListener('click', cerrarModalElementos);
  if (btnGuardarElementos) btnGuardarElementos.addEventListener('click', cerrarModalElementos);

  if (modalMarca) {
    modalMarca.addEventListener('click', (e) => {
      if (e.target === modalMarca) cerrarModalMarca();
    });
  }

  if (modalElementos) {
    modalElementos.addEventListener('click', (e) => {
      if (e.target === modalElementos) cerrarModalElementos();
    });
  }

  // Función para obtener el nombre y crear la tarjeta
  function obtenerYCrearMarca() {
    const textoIngresado = inputNombre.value.trim();
    const nombreFinal = textoIngresado !== '' ? textoIngresado : 'Sin nombre';

    const nuevaTarjeta = document.createElement('a');
    nuevaTarjeta.classList.add('marca');
    nuevaTarjeta.href = '#';
    nuevaTarjeta.textContent = nombreFinal;

    listaMarcas.appendChild(nuevaTarjeta);

    // Guardamos la referencia para editarla si usan el lápiz
    tarjetaActual = nuevaTarjeta;

    return nombreFinal;
  }

  // Botón: Crear y cerrar
  if (btnCrearCerrar) {
    btnCrearCerrar.addEventListener('click', (e) => {
      e.preventDefault(); // Previene comportamientos o zoom no deseados
      obtenerYCrearMarca();
      cerrarModalMarca();
    });
  }

  // Botón: Crear y añadir elementos
  if (btnCrearAnadir) {
    btnCrearAnadir.addEventListener('click', (e) => {
      e.preventDefault(); // Previene comportamientos o zoom no deseados
      const nombreFinal = obtenerYCrearMarca();

      if (tituloMarcaCreada) {
        tituloMarcaCreada.textContent = nombreFinal;
      }

      cerrarModalMarca();
      modalElementos.classList.add('activo');
    });
  }

  // ========== EDICIÓN DEL TÍTULO CON EL LÁPIZ ==========
  if (btnEditarTitulo && tituloMarcaCreada) {
    btnEditarTitulo.addEventListener('click', () => {
      const nombreActual = tituloMarcaCreada.textContent;
      const nuevoNombre = prompt('Edita el nombre de tu marca:', nombreActual);

      if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
        const textoEditado = nuevoNombre.trim();
        
        // Actualizar el título en el modal
        tituloMarcaCreada.textContent = textoEditado;

        // Actualizar la tarjeta creada en la cuadrícula de fondo
        if (tarjetaActual) {
          tarjetaActual.textContent = textoEditado;
        }
      }
    });
  }
});