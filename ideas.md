# Propuesta de mejoras para **PUN** — Calculadora de promedios

**Resumen corto**
PUN es una página/aplicación para calcular promedios de notas. Esta propuesta organiza mejoras funcionales y técnicas usando el método de priorización **MoSCoW (Must / Should / Could / Won't)** y añade ideas para análisis de datos, integración de IA opcional, decisiones de infraestructura y principales retos.

---

## Objetivos

* Convertir PUN en una herramienta útil, confiable y atractiva para estudiantes y orientadores.
* Añadir funcionalidades de planificación académica (malla semestral, verificación de prerequisitos) y análisis que sugieran decisiones (qué materias tomar, impacto en GPA, alertas de carga académica).
* Mantener una versión gratuita y simple, con posibilidad de activar capacidades IA mediante una clave API del usuario.

---

## Alcance

Incluye diseño UX/UI, API mínima, almacenamiento de planes/notes en JSON, analítica básica y una integración opcional a modelos IA mediante clave proporcionada por el usuario. No incluye venta o gestión de pagos en primera fase.

---

# Priorización MoSCoW

## Must (Imprescindible — lanzar MVP)

1. **Calculadora de promedios core**

   * Entrada manual de materias (nombre, código, créditos, nota, semestre, tipo: obligatorio/optativa).
   * Cálculo de promedio simple y ponderado; manejo de materias sin nota (excluirlas o marcarlas como pendientes).
   * Exportar/importar en JSON y CSV.
2. **Malla por semestres (plantilla editable)**

   * Crear/editar mallas por carrera (subida manual o JSON).
   * Mostrar materias por semestre y marcar prerequisitos.
3. **Verificación básica de prerequisitos**

   * Validación al añadir materias: avisos si el prerequisito no está cumplido.
4. **Interfaz clara y móvil-friendly**

   * Formulario simple para ingresar notas y ver resultados al instante.
5. **Privacidad mínima y opciones de almacenamiento**

   * Opción de almacenamiento local (localStorage) por defecto; posibilidad de crear cuenta para guardar en servidor.
6. **Tests y criterios de aceptación**

   * Tests automáticos para cálculo de promedios, import/export y verificación de prerequisitos.

## Should (Alta prioridad — importante pero no bloqueo)

1. **Análisis de impacto académico**

   * Simulador "qué pasa si" para ver cómo una nota en una materia afecta el GPA.
   * Visualización (gráfica sencilla) del impacto por semestre.
2. **Sugerencias de materias (reglas básicas)**

   * Reglas predefinidas: prioridad por prerequisito, peso de créditos, y materias obligatorias pendientes.
3. **Guardado en la nube (opcional)**

   * Integración con Firebase / Supabase para usuarios que creen cuenta.
4. **Importador desde plantillas universitarias**

   * Formatos JSON/CSV estándar para mapear materias de una malla ya existente.
5. **Accesibilidad y localización**

   * Soporte básico para accesibilidad y textos en español (más adelante multi idioma).

## Could (Baja prioridad — nice-to-have)

1. **Análisis avanzado y ranking de importancia**

   * Puntaje de ‘importancia’ por materia usando: créditos, dificultad histórica (si hay datos), requisito para titulación y probabilidad de impactar GPA.
2. **Modo IA (opcional y controlado por el usuario)**

   * Usuario pega su API key (Open-source LLM o servicio) y la app llama a la IA para sugerir horarios, prioridades y estrategias de estudio usando sus datos JSON
   * El procesamiento con IA debe poder desactivarse y mostrar claramente qué datos se envían.
3. **Recomendaciones personalizadas**

   * Sugerencias tipo "prioriza X si quieres graduarte en N semestres" o "si sacas >= Y en esta materia, tu promedio subirá Z".
4. **Dashboard para docentes/asesores**

   * Vista agregada de varios alumnos (solo si hay consentimiento explícito).
5. **Integraciones**

   * Export a LMS (Moodle), calendario (iCal), o Google Calendar para recordatorios de entregas/exámenes.

## Won't (No en esta fase)

* Modelos IA alojados y operados por la app sin consentimiento o cuentas de pago por defecto.

---

# Ideas de análisis de datos (detalladas)

1. **Reglas heurísticas (sin IA)**

   * Priorizar materias con muchos prerequisitos dependientes (cuello de botella).
   * Priorizar materias con mayor número de créditos cuando objetivo es maximizar GPA por semestre.
   * Detectar ciclos o conflictos de prerequisitos.
2. **Métricas y visualizaciones**

   * Histograma de notas por semestre.
   * Gráfica de evolución del GPA proyectado.
   * Tabla de "ganancia esperada" (si incremento X en nota, cambio en GPA).
3. **Análisis colaborativo**

   * Si se recoge data anónima y agregada (consentida), mostrar dificultad percibida por materia (encuestas), tasas de aprobación.
4. **Pipeline simple**

   * Ingesta JSON → validación → cálculo de métricas → presentación de sugerencias en UI.

---

# Integración de IA (opcional y segura)

* **Modo: clave proporcionada por el usuario.** El usuario pega su API key de su proveedor (p.ej. Hugging Face, o proveedor que prefiera). La app envía únicamente los datos necesarios y muestra la respuesta.
* **Privacidad:** siempre mostrar qué datos se envían, permitir borrado de logs, y no almacenar claves en texto plano.
* **Estrategia de uso:** usar IA para generación de recomendaciones textuales, explicaciones en lenguaje natural y escenarios "qué pasa si". La IA no reemplaza reglas críticas (prerequisitos/validaciones), solo las complementa.

---

# Recomendaciones técnicas (MVP)

* **Frontend:** React (Vite o Next.js si quieres SSR), componentes simples y responsivos.
* **Backend (opcional para cuentas):** serverless functions (Netlify Functions / Vercel) o un pequeño backend con Supabase/Firebase.
* **Almacenamiento:** localStorage por defecto; Firebase (Spark) o Supabase para guardar perfiles y mallas en la nube.
* **IA:** permitir integración con APIs externas via clave del usuario (sin almacenar la clave). Para usuarios avanzados, documentar cómo usar Hugging Face / endpoints de LLM.

---

# Principales retos y cómo mitigarlos

1. **Costos de hosting / IA** — Mitigar: mantener funciones serverless ligeras; ofrecer IA como opción que el usuario paga/trae su propia clave.
2. **Privacidad de datos académicos** — Mitigar: opciones de almacenamiento local, políticas claras y cifrado para datos en servidor.
3. **Exactitud de recomendaciones IA** — Mitigar: mostrar con claridad que IA es sugerente, añadir reglas deterministas y fuentes de verdad.
4. **Mantener mallas actualizadas** — Mitigar: permitir edición manual y plantillas JSON compartibles.

---

# Criterios de aceptación (ejemplos)

* La calculadora devuelve el mismo resultado que una hoja de cálculo estándar para 100% de casos unit-test.
* Importar/Exportar JSON con 3 mallas distintas funciona sin pérdida de datos.
* La verificación de prerequisitos detecta correctamente 95% de inconsistencias en un set de prueba.

---

# Siguientes pasos propuestos

1. Validar con stakeholders (estudiantes, un par de asesores) la lista Must/Should.
2. Definir historias de usuario para el MVP y estimar esfuerzo por historia.
3. Prototipado rápido de UI (1–2 pantallas principales) y tests de usabilidad.
4. Implementación incremental: MVP (Must) → Integración Cloud (Should) → IA y analítica avanzada (Could).
