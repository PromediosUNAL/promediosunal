/*Navegación y cargado de páginas*/
// Al cargar la página, se desactiva la tabla y el botón
document.addEventListener('DOMContentLoaded', function () {
    var tabla = document.getElementById('tabla-secundaria');
    tabla.classList.add('disabled');
    botonAgregarFila.disabled = true;
});
// Función para cargar HTML en el contenedor principal
document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar el contenido de un archivo HTML en el contenedor principal
    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                document.getElementById('contenedor').innerHTML = html;

                // Procesa el nuevo contenido para renderizar notación matemática
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }
            })
            .catch(error => {
                console.error('Error al cargar la página:', error);
            });
    }

    // Asigna los enlaces del menú de navegación para cargar las páginas correspondientes
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Carga la página por defecto (puedes cambiarlo según tu preferencia)
    loadPage('pappi.html');
});
// Añadir evento de navegación a los enlaces de la navegación
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        // Obtener la página a cargar
        const page = this.getAttribute('data-page');

        // Cargar la página seleccionada
        cargarPagina(page);
    });
});

/*Botones de tablas y filas*/
//Agregar filas a una determinada tabla, con determinados datos
function agregarFila(tablaId, asignatura, creditos, nota) {
    const tabla = document.getElementById(tablaId).getElementsByTagName('tbody')[0];
    let nuevaFila;

    if (tablaId === 'tabla-asignaturas2') {
        // Inserta en la penúltima posición si la tabla es "tabla-asignaturas2"
        const filas = tabla.getElementsByTagName('tr');
        const numFilas = filas.length;

        // Crea una nueva fila
        nuevaFila = tabla.insertRow(numFilas - 1);
    } else {
        // Inserta al final de la tabla para otras tablas
        nuevaFila = tabla.insertRow();
    }

    // Crea la celda para el botón de eliminación
    const celdaEliminar = nuevaFila.insertCell(0);
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '-';
    botonEliminar.className = 'delete-row';
    botonEliminar.onclick = function () {
        eliminarFila(this);
    };
    celdaEliminar.appendChild(botonEliminar);

    // Crea las celdas editables para Asignatura, Créditos y Nota
    nuevaFila.insertCell(1).contentEditable = 'true';
    nuevaFila.cells[1].textContent = asignatura;
    nuevaFila.insertCell(2).contentEditable = 'true';
    nuevaFila.cells[2].textContent = creditos;
    nuevaFila.insertCell(3).contentEditable = 'true';
    nuevaFila.cells[3].textContent = nota;
}

//Eliminar la ultima fila de la tabla
function eliminarFila(boton) {
    const fila = boton.parentElement.parentElement;
    fila.parentElement.removeChild(fila);
}

// Agrega el evento eliminarFila a todos los botones eliminación cuando se actualiza el documento
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.delete-row').forEach(boton => {
        boton.addEventListener('click', function () {
            eliminarFila(this);
        });
    });
});

function toggleTablaButton(tablaId) {
    // Obtener el estado del checkbox
    var checkbox = document.getElementById('calcularNotas');

    // Obtener la tabla y el botón
    var tabla = document.getElementById(tablaId);
    var botonAgregarFila = document.getElementById('add-row__button');

    // Deshabilitar o habilitar la tabla y el botón basado en el estado del checkbox
    if (checkbox.checked) {
        tabla.classList.remove('disabled');
        botonAgregarFila.classList.remove('disabled');
    } else {
        tabla.classList.add('disabled');
        botonAgregarFila.classList.add('disabled');
    }
}

/*Botones de copiado*/

//Copiar el texto de la tabla al portapapeles
function copiarTabla() {
    // Selecciona todas las filas dentro del <tbody> de la tabla con ID 'tabla-asignaturas'
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

//Copiar el resultado al portapapeles
function copiarResultado() {
    // Selecciona todas las filas dentro del <tbody> de la tabla con ID 'tabla-asignaturas'
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

/*Buscadores*/

// Autocompletado búsqueda
function buscarMaterias() {
    const carrera = document.getElementById('carreraSelect').value;
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const metodologia = document.getElementById('metodologiaSelect').value;

    fetch('materias.json')
        .then(response => response.json())
        .then(data => {
            const sugerencias = data.filter(materia => {
                return (materia.codigo.toLowerCase().includes(busqueda) || materia.nombre.toLowerCase().includes(busqueda)) &&
                    (carrera === "" || materia.carrera === carrera) &&
                    (metodologia === "" || materia.metodologia === metodologia);
            });

            // Mostrar las sugerencias en una lista
            const sugerenciasDiv = document.getElementById('suggestions');
            sugerenciasDiv.innerHTML = '';
            const listaSugerencias = document.createElement('ul');
            sugerencias.forEach(materia => {
                const li = document.createElement('li');
                li.textContent = materia.nombre;
                // Agregar un evento para seleccionar la sugerencia
                li.addEventListener('click', () => {
                    agregarMateriaATabla(materia);
                    sugerenciasDiv.innerHTML = '';
                    document.getElementById('buscador').value = materia.nombre;
                });
                listaSugerencias.appendChild(li);
            });
            sugerenciasDiv.appendChild(listaSugerencias);
        });
}

// Función para agregar la busqueda a la tabla
function agregarBusquedaTabla() {
    const tabla = document.getElementById('tabla-asignaturas').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Botón para borrar la fila
    const celdaBorrar = nuevaFila.insertCell(0);
    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = '-';
    botonBorrar.className = 'delete-row';
    botonBorrar.onclick = function () {
        eliminarFila(this);
    };
    celdaBorrar.appendChild(botonBorrar);

    // Celda para el nombre de la materia
    const celdaMateria = nuevaFila.insertCell(1);
    celdaMateria.textContent = materia.nombre;
    celdaMateria.contentEditable = "true";

    // Celda para los créditos de la materia
    const celdaCreditos = nuevaFila.insertCell(2);
    celdaCreditos.textContent = "3"; // Aquí podrías agregar un valor dinámico si tienes la información
    celdaCreditos.contentEditable = "true";

    // Celda para la nota
    const celdaNota = nuevaFila.insertCell(3);
    celdaNota.textContent = "5.0"; // Aquí podrías agregar un valor dinámico si tienes la información
    celdaNota.contentEditable = "true";
}

/*Cálculo de promedios*/

function calcularPromedioPonderado(idTabla) {
    const filas = document.querySelectorAll(`#${idTabla} tbody > tr`);

    // Inicializar variables para los cálculos
    let sumaProductos = 0;
    let sumaCreditos = 0;

    // Iterar sobre cada fila y realizar los cálculos
    filas.forEach(fila => {
        // Obtener las celdas de crédito y nota
        const celdas = fila.querySelectorAll('td');
        const creditos = parseFloat(celdas[2].textContent);
        const nota = parseFloat(celdas[3].textContent);

        // Sumar los productos de crédito por nota y la suma total de créditos
        sumaProductos += creditos * nota;
        sumaCreditos += creditos;
    });

    // Calcular el promedio ponderado
    const promedioPonderado = sumaProductos / sumaCreditos;

    // Mostrar el resultado en el span
    const resultadoSpan = document.querySelector('.calculo-container__resultado');
    resultadoSpan.textContent = promedioPonderado.toFixed(2);
}

//Calcular la nota que necesitas para sacar cierta nota
function calcularNotaNecesaria() {
    const tabla = document.getElementById('tabla-asignaturas2').getElementsByTagName('tbody')[0];
    let porcentajeActual = 0;
    let sumaPonderada = 0;

    // Itera sobre las filas de la tabla para calcular la suma de porcentajes y la suma ponderada de las notas
    for (let i = 0; i < tabla.rows.length; i++) {
        const porcentaje = parseFloat(tabla.rows[i].cells[2].innerText.replace(',', '.'));
        const nota = parseFloat(tabla.rows[i].cells[3].innerText.replace(',', '.'));

        if (!isNaN(porcentaje) && !isNaN(nota)) {
            porcentajeActual += porcentaje;
            sumaPonderada += (porcentaje * nota) / 100;
        }
    }

    // Verifica si la suma de porcentajes supera o alcanza el 100%
    if (porcentajeActual >= 100) {
        document.getElementById('resultado-pappi').innerText = "La suma de porcentajes ya es 100% o más, no es posible calcular.";
        return;
    }

    // Calcula el porcentaje restante
    const porcentajeRestante = 100 - porcentajeActual;

    // Calcula la nota necesaria para alcanzar un promedio de 3
    const notaNecesaria = (3 - sumaPonderada) / (porcentajeRestante / 100);

    // Actualiza el resultado
    if (notaNecesaria >= 0 && notaNecesaria <= 5) {
        document.getElementById('resultado-pappi-necesario').innerText = `Debes sacarte ${notaNecesaria.toFixed(2)} en el ${porcentajeRestante}% restante`;
    } else {
        document.getElementById('resultado-pappi-necesario').innerText = "No es posible alcanzar un promedio de 3 con los datos actuales.";
    }
}

/*Cargar el modo oscuro*/
const toggle = document.getElementById('dark-mode-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});