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

    if (tablaId === 'tabla-secundaria' || tablaId === 'tabla-asignaturas2') {
        // Inserta en la penúltima posición si la tabla es "tabla-secundaria" o "tabla-asignaturas2
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

function toggleTablaButton(tablaId, checkboxId, addRowId, buttonsId) {
    // Obtener el estado del checkbox
    var checkbox = document.getElementById(checkboxId);

    // Obtener la tabla y los botones
    var tabla = document.getElementById(tablaId);
    var addRow = document.getElementById(addRowId);
    var buttons = document.getElementById(buttonsId);

    // Deshabilitar o habilitar la tabla y los botones basado en el estado del checkbox
    if (checkbox.checked) {
        tabla.classList.remove('disabled');
        addRow.classList.remove('disabled');
        buttons.classList.remove('disabled');
    } else {
        tabla.classList.add('disabled');
        addRow.classList.add('disabled');
        buttons.classList.add('disabled');
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
    const resultadoSpan = document.getElementById('resultado_pappi_promedio');
    resultadoSpan.textContent = promedioPonderado.toFixed(2);
}

function calcularNotaNecesaria(tablaId) {
    const tabla = document.getElementById(tablaId);
    const tbody = tabla.getElementsByTagName('tbody')[0];
    let porcentajeActual = 0;
    let sumaPonderada = 0;
    let errorEnDatos = false;

    // Función auxiliar para verificar si un valor es numérico
    function esNumerico(valor) {
        return !isNaN(valor) && /^[0-9.,]+$/.test(valor);
    }

    // Iteramos sobre cada fila de la tabla, excepto la última
    for (let i = 0; i < tbody.rows.length - 1; i++) {
        const row = tbody.rows[i];

        // Obtenemos el porcentaje y la nota de cada fila
        const porcentajeTexto = row.cells[2].innerText.replace(',', '.');
        const notaTexto = row.cells[3].innerText.replace(',', '.');

        // Verificamos que el porcentaje y la nota sean números válidos
        if (esNumerico(porcentajeTexto) && esNumerico(notaTexto)) {
            const porcentaje = parseFloat(porcentajeTexto);
            const nota = parseFloat(notaTexto);

            porcentajeActual += porcentaje;
            sumaPonderada += (porcentaje * nota) / 100;
        } else {
            // Si hay un error en los datos (letras u otros caracteres), lo registramos
            console.error('Error: Porcentaje o nota no es un número válido en la fila', i + 1);
            errorEnDatos = true;
            break; // Detenemos el cálculo en caso de datos inválidos
        }
    }

    if (errorEnDatos) {
        document.getElementById('promedio_necesario').innerText = "NaN";
        return;
    }

    // Obtenemos el promedio objetivo de la última fila y cuarta columna
    const promedioObjetivo = parseFloat(tbody.rows[tbody.rows.length - 1].cells[3].innerText.replace(',', '.'));

    // Verificamos si la suma de porcentajes es menor a 100%
    if (porcentajeActual < 100) {
        // Calculamos el porcentaje restante
        const porcentajeRestante = 100 - porcentajeActual;

        // Calculamos la nota necesaria para alcanzar el promedio objetivo
        const notaNecesaria = (promedioObjetivo - sumaPonderada) / (porcentajeRestante / 100);

        // Validamos que la nota necesaria esté dentro del rango válido (0-5)
        if (notaNecesaria >= 0 && notaNecesaria <= 5) {
            document.getElementById('promedio_necesario').innerText = `Debes sacarte ${notaNecesaria.toFixed(2)} en el ${porcentajeRestante}% restante`;
        } else {
            document.getElementById('promedio_necesario').innerText = "No es posible alcanzar el promedio objetivo con los datos actuales.";
        }
    } else {
        document.getElementById('promedio_necesario').innerText = "La suma de porcentajes ya es 100% o más, no es posible calcular.";
    }
}

function calcularNotaNecesariaParaPromedio(tablaId) {
    const tabla = document.getElementById(tablaId);
    const filas = tabla.querySelectorAll('tbody tr');
    let sumaCreditos = 0;
    let sumaPonderada = 0;
    let creditosSinNota = 0;

    // Obtener el promedio deseado de la última fila y cuarta columna
    const promedioDeseado = parseFloat(filas[filas.length - 1].querySelectorAll('td')[3].textContent);

    // Iterar sobre cada fila excepto la última
    filas.forEach((fila, index) => {
        if (index === filas.length - 1) return; // Omitir la última fila

        const celdas = fila.querySelectorAll('td');
        const creditos = parseFloat(celdas[2].textContent);
        const nota = parseFloat(celdas[3].textContent);

        if (!isNaN(nota)) {
            sumaPonderada += creditos * nota;
        } else {
            creditosSinNota += creditos;
        }
        sumaCreditos += creditos;
    });

    const notaNecesaria = (promedioDeseado * sumaCreditos - sumaPonderada) / creditosSinNota;

    if (notaNecesaria >= 0 && notaNecesaria <= 5) {
        document.getElementById('resultado_pappi_necesario').textContent = `Necesitas un Pappi de ${notaNecesaria.toFixed(2)} en las materias pendientes para alcanzar un Pappi de ${promedioDeseado}`;
    } else if (notaNecesaria < 0) {
        document.getElementById('resultado_pappi_necesario').textContent = 'Ya has alcanzado el Pappi objetivo con tus notas actuales.';
    } else {
        document.getElementById('resultado_pappi_necesario').textContent = 'No es posible alcanzar el Pappi deseado con tus notas.';
    }
}

/*Cargar el modo oscuro*/
const toggle = document.getElementById('dark-mode-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});