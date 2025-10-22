/**
 * Conjunto de selectores CSS para los elementos a eliminar en la vista principal.
 */
const SELECTORS_TO_REMOVE = [
  //'.mdc-evolution-chip-set__chips', // Chips de documentos/texto copiado
  '.dropzone.ng-star-inserted'     // Área de "Drag & drop or choose file to upload"
];

// Texto que identifica el grupo de opciones a ocultar (el último de la lista)
// Lo cambiamos al texto del encabezado "Paste text" para ser más específicos.
const TARGET_GROUP_HEADER_TEXT = 'Paste text'; 

/**
 * Función que busca y elimina elementos de la vista principal.
 */
function removeElements(selectors) {
  selectors.forEach(selector => {
    const cleanSelector = selector.replace(/ /g, '.');
    document.querySelectorAll(cleanSelector).forEach(element => element.remove());
  });
}

/**
 * Función que Oculta la opción de "Paste text" buscando su contenido de texto único.
 */
function hideTargetSourceOption() {
    // Buscamos todos los contenedores de grupos de chips.
    const chipGroups = document.querySelectorAll('.chip-groups > .chip-group'); 

    chipGroups.forEach(group => {
        // Buscamos el texto del encabezado del grupo.
        const headerElement = group.querySelector('.chip-group__header span');
        
        // Si encontramos el elemento y el texto coincide con el objetivo
        if (headerElement && headerElement.textContent && headerElement.textContent.trim() === TARGET_GROUP_HEADER_TEXT) {
            
            // Ocultamos el elemento de forma "suave" (sin display: none), 
            // manteniendo el nodo en el DOM para evitar que el framework falle.
            group.style.setProperty('visibility', 'hidden', 'important');
            group.style.setProperty('height', '1px', 'important'); // Colapsar a un tamaño mínimo
            group.style.setProperty('overflow', 'hidden', 'important');
            group.style.setProperty('padding', '0', 'important'); 
            group.style.setProperty('margin', '0', 'important');
        }
    });
}


/**
 * Función que deshabilita la funcionalidad nativa de arrastrar y soltar archivos.
 */
function disableDragAndDrop() {
  const preventAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  document.body.addEventListener('dragover', preventAction, false);
  document.body.addEventListener('drop', preventAction, false);
}


// ------------------------------------------------------------------------
// INICIAR LA EXTENSIÓN
// ------------------------------------------------------------------------

/**
 * El MutationObserver monitorea continuamente los cambios en la estructura de la página
 * (incluyendo la aparición del modal).
 */
const observer = new MutationObserver((mutations) => {
  // Ejecutamos las funciones en cada cambio del DOM.
  removeElements(SELECTORS_TO_REMOVE);
  hideTargetSourceOption();
});

// Comenzar a observar el cuerpo del documento.
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Ejecutar las funciones al inicio.
removeElements(SELECTORS_TO_REMOVE);
hideTargetSourceOption();

// Bloquear el arrastrar y soltar.
disableDragAndDrop();