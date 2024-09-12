// Función para cargar HTML (pappi.html) en el contenedor principal
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
// Al cargar la página, se desactiva la tabla (toggleTablaButton)
document.addEventListener('DOMContentLoaded', function () {
    var tabla = document.getElementById('tabla-secundaria');
    tabla.classList.add('disabled');
    botonAgregarFila.disabled = true;
});

/*Botones de tablas y filas*/
function agregarFila(tablaId, asignatura, creditos, nota) {
    const tabla = document.getElementById(tablaId).getElementsByTagName('tbody')[0];
    let nuevaFila;

    if (tablaId === 'tabla-principal' || tablaId === 'tabla-secundaria') {
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

function eliminarFila(boton) {
    const fila = boton.parentElement.parentElement;
    fila.parentElement.removeChild(fila);
}

/*Agrega el evento eliminarFila a todos los botones eliminación cuando se actualiza el documento*/
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.delete-row').forEach(boton => {
        boton.addEventListener('click', function () {
            eliminarFila(this);
        });
    });
});

/*Habilitación y deshabilitaicón de una tabla */
function ocultarTablaCheckBox(tablaId, checkboxId, addRowId, buttonsId) {
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

/*Botones de copiado al portapapeles*/
function copiarTabla(tablaId) {
    // Selecciona todas las filas dentro del <tbody> de la tabla con el ID pasado como parámetro
    const filas = document.querySelectorAll(`#${tablaId} tbody tr`);
    let texto = '';
    // Itera sobre cada fila para construir el texto a copiar
    filas.forEach(fila => {
        // Obtiene el texto de cada celda en la fila
        const asignatura = fila.cells[1].innerText;
        const credito = fila.cells[2].innerText;
        const nota = fila.cells[3].innerText;
        // Concatena la información en el formato deseado
        texto += `${asignatura} ${credito} | ${nota}\n`;
    });
    // Usa la API Clipboard para copiar el texto al portapapeles
    navigator.clipboard.writeText(texto)
        .then(() => alert('Texto copiado al portapapeles')) // Muestra un mensaje de éxito si la operación se completa
        .catch(err => alert('Error al copiar texto')); // Muestra un mensaje de error si ocurre un problema
}

function copiarResultado(resultadoId) {
    let resultado = document.getElementById(resultadoId).innerText;
    // Verifica si el texto es "Resultado" y muestra una alerta en caso de que no haya un valor válido
    if (resultado === "Resultado") {
        alert('No se copió ningún resultado.');
    } else {
        // Usa la API Clipboard para copiar el texto al portapapeles
        navigator.clipboard.writeText(resultado)
            .then(() => alert('Resultado copiado al portapapeles'))
            .catch(err => alert('Error al copiar resultado'));
    }
}

/*Cálculo de promedios*/
function calcularPromedioPonderado(idTabla, resultadoId) {
    const filas = document.querySelectorAll(`#${idTabla} tbody > tr`);

    // Inicializar variables para los cálculos
    let sumaProductos = 0;
    let sumaValores = 0;

    // Iterar sobre cada fila y realizar los cálculos
    filas.forEach(fila => {
        // Obtener las celdas de crédito y nota
        const celdas = fila.querySelectorAll('td');
        const valores = parseFloat(celdas[2].textContent);
        const nota = parseFloat(celdas[3].textContent);

        // Sumar los productos de crédito por nota y la suma total de créditos
        sumaProductos += valores * nota;
        sumaValores += valores;
    });

    // Calcular el promedio ponderado
    const promedioPonderado = sumaProductos / sumaValores;

    // Mostrar el resultado en el span
    const resultadoSpan = document.getElementById(resultadoId);
    resultadoSpan.textContent = promedioPonderado.toFixed(2);
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

        if (isNaN(nota)) {
            creditosSinNota += creditos;
        } else {
            sumaPonderada += creditos * nota;
        }

        sumaCreditos += creditos;
    });

    const notaNecesaria = (promedioDeseado * sumaCreditos - sumaPonderada) / creditosSinNota;
    const resultado = document.getElementById('resultado_necesario');

    // Verificar si notaNecesaria es un número válido
    if (notaNecesaria >= 0 && notaNecesaria <= 5) {
        resultado.textContent = `Necesitas una nota de ${notaNecesaria.toFixed(2)} en las materias pendientes para alcanzar un promedio de ${promedioDeseado}.`;
    } else if (notaNecesaria < 0) {
        resultado.textContent = 'Has superado el promedio objetivo con tus notas actuales.';
    } else {
        resultado.textContent = 'No es posible alcanzar el promedio objetivo deseado con tus notas actuales.';
    }
}

/*Cargar el modo oscuro*/
const toggle = document.getElementById('dark-mode-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

/*Funes para el Buscador de Materias y/o Actividades*/
function mostrarBuscador(tablaID, addListID, nombreJson) {
    // Obtener el elemento add-list
    const addList = document.getElementById(addListID);
    addList.innerHTML = '';

    fetch(nombreJson)
        .then(response => response.json())
        .then(data => {
            const actividades = data.datos;
            actividades.forEach((actividad) => {
                const listItem = document.createElement('li');
                listItem.innerText = `${actividad.nombre} (${actividad.creditos})`;
                listItem.onclick = () => agregarFila(tablaID, actividad.nombre, actividad.creditos, '5.0');
                addList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al cargar json:', error));

    addList.style.display = 'flex'; // Mostrar el contenedor de sugerencias
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    addList.appendChild(buttonContainer);

    // Crear el botón de cierre
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.onclick = () => addList.style.display = 'none';

    buttonContainer.appendChild(closeButton);
}
