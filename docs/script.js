function agregarFila() {
    const tabla = document.getElementById('tabla-asignaturas').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Crea la celda para el botón de eliminación
    const celdaEliminar = nuevaFila.insertCell(0);
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '-';
    botonEliminar.className = 'delete-row';
    botonEliminar.onclick = function() {
        eliminarFila(this);
    };
    celdaEliminar.appendChild(botonEliminar);

    // Crea las celdas editables para Asignatura, Créditos y Nota
    nuevaFila.insertCell(1).contentEditable = 'true';
    nuevaFila.cells[1].textContent = 'Nueva Asignatura';
    nuevaFila.insertCell(2).contentEditable = 'true';
    nuevaFila.cells[2].textContent = '0';
    nuevaFila.insertCell(3).contentEditable = 'true';
    nuevaFila.cells[3].textContent = '0';
}

function eliminarFila(boton) {
    const fila = boton.parentElement.parentElement;
    fila.parentElement.removeChild(fila);
}

// Agrega el evento a todos los botones de eliminación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.delete-row').forEach(boton => {
        boton.addEventListener('click', function() {
            eliminarFila(this);
        });
    });
});

// Función para copiar el texto de las notas al portapapeles
function copiarTextoNotas() {
    // Selecciona todas las filas dentro del <tbody> de la tabla con id 'tabla-asignaturas'
    const filas = document.querySelectorAll('#tabla-asignaturas tbody tr');
    let texto = '';
    // Itera sobre cada fila para construir el texto a copiar
    filas.forEach(fila => {
        // Obtiene el texto de cada celda en la fila
        const asignatura = fila.cells[0].innerText;
        const credito = fila.cells[1].innerText;
        const nota = fila.cells[2].innerText;
        // Concatena la información en el formato deseado
        texto += `Asignatura: ${asignatura}, Crédito: ${credito}, Nota: ${nota}\n`;
    });
    // Usa la API Clipboard para copiar el texto al portapapeles
    navigator.clipboard.writeText(texto)
        .then(() => alert('Texto copiado al portapapeles')) // Muestra un mensaje de éxito si la operación se completa
        .catch(err => alert('Error al copiar texto')); // Muestra un mensaje de error si ocurre un problema
}

// Funcionalidad para el autocompletado del campo de búsqueda de carrera
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene los elementos del DOM necesarios para el autocompletado
    const buscadorCarrera = document.getElementById('buscador-carrera');
    const buscadorAsignatura = document.getElementById('buscador-asignatura');
    const suggestions = document.getElementById('suggestions');
    // Lista de opciones para autocompletado
    const opciones = [
        "Ingeniería de Sistemas y Computación",
        "Libre elección"
    ];

    // Inicializa el estilo del campo de asignatura
    buscadorAsignatura.style.backgroundColor = 'white'; // Establece el fondo blanco por defecto
    buscadorAsignatura.style.cursor = 'auto'; // Establece el cursor a 'auto'

    // Input manager en la búsqueda de carrera
    buscadorCarrera.addEventListener('input', function() {
        // Quita lo que no sea letras
        const valor = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').toLowerCase();
        this.value = valor; // Actualiza el valor del campo de búsqueda

        const palabras = valor.split(/\s+/); // Divide el valor en palabras individuales
        suggestions.innerHTML = ''; // Limpia las sugerencias existentes

        if (valor) {
            // Itera sobre las opciones para encontrar coincidencias
            opciones.forEach(opcion => {
                const textoOpcion = opcion.toLowerCase();
                // Verifica si cada palabra en el valor está incluida en la opción
                let coincidencias = palabras.every(palabra => textoOpcion.includes(palabra));

                if (coincidencias) {
                    // Crea un nuevo div para una opción de sugerencia
                    const div = document.createElement('div');
                    div.classList.add('autocomplete-suggestion');
                    div.textContent = opcion;
                    // Añade un evento de clic para seleccionar una sugerencia
                    div.addEventListener('click', function() {
                        buscadorCarrera.value = opcion; // Establece el valor del campo de búsqueda a la opción seleccionada
                        suggestions.innerHTML = ''; // Limpia las sugerencias
                    });
                    // Añade el div de sugerencia al contenedor de sugerencias
                    suggestions.appendChild(div);
                }
            });
        }
    });

    // Input manager en la búsqueda de carrera
    buscadorAsignatura.addEventListener('input', function() {
        // Quita lo que no sea letras
        const valor = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').toLowerCase();
        this.value = valor; // Actualiza el valor del campo de búsqueda

        const palabras = valor.split(/\s+/); // Divide el valor en palabras individuales
        suggestions.innerHTML = ''; // Limpia las sugerencias existente
    });

    // Añade un evento para ocultar las sugerencias si se hace clic fuera del área de sugerencias
    document.addEventListener('click', function(event) {
        if (!suggestions.contains(event.target) && event.target !== buscadorCarrera) {
            suggestions.innerHTML = ''; // Limpia las sugerencias si el clic está fuera del área de sugerencias
        }
    });

    // Función para calcular el Pappi
    function calcularPappi() {
        // Selecciona todas las filas dentro del <tbody> de la tabla con id 'tabla-asignaturas'
        const filas = document.querySelectorAll('#tabla-asignaturas tbody tr');
        let sumaCreditosNotas = 0;
        let sumaCreditos = 0;

        // Itera sobre cada fila para calcular el Pappi
        filas.forEach(fila => {
            // Obtiene el valor de créditos y notas y lo convierte a número flotante
            const credito = parseFloat(fila.cells[2].innerText) || 0;
            const nota = parseFloat(fila.cells[3].innerText) || 0;
            // Suma los créditos multiplicados por las notas
            sumaCreditosNotas += credito * nota;
            // Suma los créditos
            sumaCreditos += credito;
        });

        // Calcula el resultado de Pappi (promedio ponderado) y lo muestra
        const resultado = sumaCreditos > 0 ? (sumaCreditosNotas / sumaCreditos).toFixed(2) : 'N/A';
        document.getElementById('resultado-pappi').textContent = resultado;
    }

    // Añade el evento al botón "Calcular Pappi" para ejecutar la función calcularPappi al hacer clic
    document.getElementById('calcular-pappi').addEventListener('click', calcularPappi);
});
// Función para cargar una página en el contenedor <main>
function cargarPagina(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('contenedor').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar la página:', error));
}

// Cargar la página "pappi.html" al cargar la página principal
document.addEventListener('DOMContentLoaded', function() {
    cargarPagina('pappi.html');
});

// Añadir evento a los enlaces de la navegación
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        // Obtener la página a cargar
        const page = this.getAttribute('data-page');

        // Cargar la página seleccionada
        cargarPagina(page);
    });
});
