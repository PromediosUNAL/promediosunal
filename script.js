
        function agregarFila() {
            const tabla = document.getElementById('tabla-asignaturas').getElementsByTagName('tbody')[0];
            const nuevaFila = tabla.insertRow();
            nuevaFila.innerHTML = `
                <td contenteditable="true">Nueva Asignatura</td>
                <td contenteditable="true">0</td>
                <td contenteditable="true">0</td>
            `;
        }

        function copiarTextoNotas() {
            const filas = document.querySelectorAll('#tabla-asignaturas tbody tr');
            let texto = '';
            filas.forEach(fila => {
                const asignatura = fila.cells[0].innerText;
                const credito = fila.cells[1].innerText;
                const nota = fila.cells[2].innerText;
                texto += `Asignatura: ${asignatura}, Crédito: ${credito}, Nota: ${nota}\n`;
            });
            navigator.clipboard.writeText(texto)
                .then(() => alert('Texto copiado al portapapeles'))
                .catch(err => alert('Error al copiar texto'));
        }
