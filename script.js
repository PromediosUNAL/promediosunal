// Función para agregar una nueva fila a la tabla
function agregarFila() {
    // Obtiene el elemento <tbody> de la tabla con id 'tabla-asignaturas'
    const tabla = document.getElementById('tabla-asignaturas').getElementsByTagName('tbody')[0];
    // Inserta una nueva fila al final del <tbody>
    const nuevaFila = tabla.insertRow();
    // Define el contenido HTML de la nueva fila, con celdas editables y valores predeterminados
    nuevaFila.innerHTML = `
        <td contenteditable="true">Nueva Asignatura</td>
        <td contenteditable="true">0</td>
        <td contenteditable="true">0</td>
    `;
}

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

    // Añade un evento para manejar la entrada en el campo de búsqueda de carrera
    buscadorCarrera.addEventListener('input', function() {
        // Obtiene el valor del campo y lo convierte a minúsculas
        const valor = this.value.toLowerCase();
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
            const credito = parseFloat(fila.cells[1].innerText) || 0;
            const nota = parseFloat(fila.cells[2].innerText) || 0;
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