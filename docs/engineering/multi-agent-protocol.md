# Protocolo reproducible de ingeniería multiagente — NEXORA AI

## 1. Propósito y contexto comprobable

Este protocolo organiza cambios con responsabilidades separadas y evidencia auditable. No otorga permiso para ampliar una solicitud ni para corregir hallazgos no autorizados. Las órdenes del usuario delimitan el trabajo; ante conflicto, pedir aclaración antes de actuar.

Contexto del repositorio comprobado al redactar este documento:

- `package.json` declara React, TypeScript y Vite; scripts `lint` (`oxlint`), `build` (`tsc -b && vite build`), `test` (`vitest run`), `test:e2e` (`playwright test`) y `check` (`pnpm lint && pnpm build && pnpm test`).
- `.github/workflows/ci.yml` define un workflow de GitHub Actions para `pull_request` a `master`: instala con lockfile congelado, ejecuta `pnpm check`, instala Chromium/dependencias de Playwright y ejecuta `pnpm test:e2e`.
- Esto acredita configuración declarada en el repositorio, no que Actions haya ejecutado, que esté habilitado en GitHub ni que una ejecución haya pasado. No se presume que existan agentes automatizados, permisos de plataforma o reglas de protección de ramas.

## 2. Roles, responsabilidades y límites

| Rol | Responsabilidad | Límites |
|---|---|---|
| **Orchestrator** | Desglosa la petición, registra alcance, riesgos, criterios y estado; coordina agentes; obtiene aclaraciones y autorización del usuario; entrega decisión con evidencia. | No implementa por defecto, no convierte hallazgos en autorización ni marca aceptado sin criterios/evidencia. |
| **Developer** | Cambia exclusivamente los archivos y comportamiento expresamente autorizados; registra decisiones y valida el cambio según autorización. | No amplía alcance, no altera pruebas para silenciar fallos, no cambia dependencias/CI/Git fuera de lo autorizado. Detiene el trabajo si detecta trabajo adicional necesario. |
| **Reviewer** | Inspecciona el diff frente a solicitud, criterios, riesgos y severidades; informa hallazgos con referencias reproducibles. | Solo lectura: no modifica archivos ni remedia hallazgos. La revisión no equivale a autorización de corrección. |
| **Tester** | Ejecuta verificaciones autorizadas, registra comandos, resultados y limitaciones; relaciona fallos con evidencia. | No cambia código, pruebas, configuración o datos para lograr un resultado favorable. No declara calidad funcional basándose solo en build. |

Un agente puede asumir más de un rol solo si el usuario o la planificación lo permiten y se mantiene explícita la separación de evidencias. Reviewer y Tester son fases sin cambios de archivos; no se deben presentar como realizadas si solo se inspeccionó o ejecutó algo parcialmente.

## 3. Estados y transiciones

Cada solicitud tiene un estado único y un registro de transiciones. Estados terminales: **aceptada** o **rechazada**. “Rechazada” significa que se declinó/canceló la solicitud o una propuesta; no es sinónimo de prueba fallida.

| Estado | Significado y salida mínima |
|---|---|
| **propuesta** | Alcance, motivo, archivos/áreas previsibles, riesgos y criterios están planteados; aún no se implementa. |
| **aprobada** | El usuario autorizó explícitamente el alcance y las acciones relevantes. Registrar quién autorizó, cuándo/con qué mensaje y límites. |
| **implementada** | Los cambios autorizados están hechos; se registra el diff/archivos y validación del Developer. No significa revisión ni aceptación. |
| **revisada** | Reviewer completó inspección de diff y registró hallazgos/severidades, o ausencia de ellos dentro de lo inspeccionado. |
| **probada** | Tester completó las verificaciones acordadas y registró resultado por comando; puede incluir fallos y limitaciones. |
| **aceptada** | Criterios acordados satisfechos con evidencia suficiente y riesgos residuales declarados; decisión documentada. |
| **rechazada** | Usuario/decisor rechaza o cancela, con motivo; no se presenta como éxito. |

Transiciones ordinarias: `propuesta -> aprobada -> implementada -> revisada -> probada -> aceptada`. Desde cualquier estado no terminal puede irse a `rechazada` por decisión explícita. Una propuesta rechazada no se implementa. Si revisión o pruebas exigen cambios, se pausa en el estado alcanzado y se abre una nueva propuesta/alcance para dichos cambios. Tras cambios autorizados, volver a **implementada** y repetir las fases posteriores pertinentes; no conservar como válida una revisión/prueba de una versión anterior.

**Pausa obligatoria:** terminado el trabajo del Developer, detenerse en **implementada** y reportar el resultado. No iniciar una fase posterior que pueda producir cambios ni corregir hallazgos. La continuidad a revisión/pruebas sin modificar archivos debe estar dentro de la autorización del usuario; cualquier cambio derivado de esas fases requiere autorización explícita nueva. No ejecutar Reviewer/Tester si no fueron solicitados/autorizados.

## 4. Criterios de aceptación antes de implementar

Antes de solicitar aprobación, convertir la petición en condiciones verificables, observables y acotadas. Registrar:

1. Resultado esperado y comportamiento incluido; exclusiones expresas.
2. Archivos/áreas autorizados y operaciones prohibidas (por ejemplo pruebas, dependencias, CI o Git).
3. Criterios de aceptación numerados con comprobación concreta y resultado esperado. Distinguir pruebas automáticas, revisión manual y documentación.
4. Para cada criterio, registrar resultado esperado, método de comprobación, evidencia que se conservará y condición concreta de rechazo/no aprobación. Comandos de verificación propuestos y si se autoriza ejecutarlos; prerequisitos/riesgo de efectos secundarios.
5. Datos visuales, accesibilidad, responsive o compatibilidad relevantes para la tarea.
6. Riesgos conocidos, incógnitas y decisión que requiere al usuario.

No empezar si el alcance, autorización de archivos o criterio es ambiguo. No inventar un criterio retrospectivamente para declarar éxito. Aprobación de una tarea no autoriza automáticamente cambios necesarios fuera de su alcance.

### Controles mínimos obligatorios por tipo de tarea

Los controles siguientes son puertas obligatorias para declarar la tarea **aprobada/aceptada**; ejecutar únicamente controles autorizados. Su omisión, fallo o evidencia insuficiente impide la aprobación. Puede cerrarse como bloqueada o con **aceptación de riesgo** explícita, identificando controles omitidos, motivo y riesgo asumido; esa excepción nunca equivale a éxito ni aprobación.

| Tipo de tarea | Controles mínimos y evidencia | Rechazo / no aprobación |
|---|---|---|
| Documentación/protocolo | Revisar diff y coherencia con las instrucciones rectoras; ejecutar `git diff --check` y registrar salida/código. | Diff incoherente, errores de whitespace o control omitido/no autorizado. |
| Código o comportamiento | `pnpm lint`, `pnpm build`, `pnpm test`; registrar cada salida/código; revisar diff y criterios funcionales. Añadir `pnpm test:e2e` cuando el criterio incluya flujos E2E o la propuesta lo exija. | Cualquier control obligatorio falla/no se ejecuta o criterio funcional carece de evidencia. |
| CI/configuración | Inspeccionar diff y sintaxis/configuración aplicable; verificar resultados locales autorizados y ejecución GitHub real si se afirma que CI pasó; registrar workflow, run, job, commit y resultado. | Configuración inválida, checks fallidos, o afirmación de CI sin evidencia remota. |
| Integración/PR/merge | Controles de código pertinentes; comprobar en GitHub protección de la rama destino y lista efectiva de checks obligatorios, además del resultado de cada check aplicable. Registrar rama, método/fecha de comprobación, reglas y checks exactos, y evidencia/enlace accesible. | No se verifica protección/checks, hay checks fallidos o evidencia incompleta. Si no se comprueba, registrar literalmente **“protección no verificada”**; no garantizar ni afirmar integración segura. |
| Auditoría/revisión | Registrar superficies y versión/diff revisados, hallazgos/severidad/evidencia y límites; verificar criterios contra la evidencia disponible. | Inspección incompleta presentada como exhaustiva, o hallazgos críticos/altos sin decisión explícita. |

Los controles específicos de una propuesta pueden ser más estrictos, nunca menos que los mínimos aquí establecidos. AGENTS.md define además criterios mínimos de aceptación del producto; no se omiten para tareas de producto por invocar esta tabla.

## 5. Permisos de archivos, comandos y operaciones

- Permisos separados: (a) **lectura** permite inspeccionar solo las rutas pertinentes; (b) **ejecución de comandos** permite únicamente los comandos concretos autorizados, con sus efectos secundarios previsibles; (c) **generación de artefactos** permite crear solo artefactos/rutas expresamente autorizados (incluidos outputs de build, reportes o temporales); (d) **modificación de fuentes** permite editar solo archivos/rutas expresamente autorizados; (e) **operaciones remotas** requiere permiso independiente para cada operación y destino. Ningún permiso implica otro.
- Permiso por defecto: solo leer/inspeccionar. Modificar únicamente rutas y clases de archivo expresamente autorizadas por el usuario. Si una ruta nueva queda implícita pero no clara, pedir confirmación. Para comandos, especificar nombre/alcance y aceptar previamente efectos sobre archivos, procesos o servicios; si el efecto no está claro, detenerse.
- Revisar estado Git antes de empezar para separar cambios preexistentes; nunca sobrescribirlos ni atribuirlos al trabajo. Al final, reportar el estado/diff relevante.
- Ejecutar solo comandos pertinentes y autorizados. Los checks pueden crear artefactos: reportar ese efecto y no limpiar/modificar archivos no autorizados. No instalar dependencias salvo necesidad justificada y aprobación. No acceder a secretos ni transmitir datos.
- Reviewer: lectura/diff; sin edición. Tester: comandos de verificación; sin edición de producto, pruebas o configuración.
- Cada operación Git requiere autorización explícita, previa, trazable y específica para esa operación: commit (incluido amend), push, merge, rebase, eliminación de rama local/remota, y cualquier cambio de remoto (añadir, cambiar URL, eliminar o publicar/configurar remoto). La autorización debe identificar operación, repositorio/rama/objeto destino y límites; una autorización genérica, una solicitud de implementación/PR, aceptación o permiso para otra operación no autoriza ninguna operación Git. Publicación y despliegue también requieren autorización explícita separada.
- Comandos del proyecto actualmente declarados: `pnpm lint`, `pnpm build`, `pnpm test`, `pnpm test:e2e`, `pnpm check`. Elegir según los criterios; no afirmar que se ejecutaron si no se ejecutaron. E2E puede requerir navegador/dependencias. No instalar esas dependencias sin autorización.

### Integración y protección de ramas

Antes de recomendar o declarar integración segura, comprobar en GitHub la configuración efectiva de protección/reglas de la rama destino y los checks obligatorios efectivos; registrar evidencia verificable, rama, fecha, checks exactos y resultado real. El workflow versionado solo evidencia configuración en archivos, no protección GitHub ni obligatoriedad de checks. Si no hay acceso o prueba suficiente, el estado será literalmente **“protección no verificada”** y se declarará que no se garantiza integración segura. No cambiar reglas ni checks sin autorización específica.

## 6. Autorización y pausa para correcciones

Solo el usuario puede autorizar correcciones fuera del alcance vigente. Un hallazgo, fallo, recomendación del Reviewer/Tester, CI roja o necesidad técnica no equivale a autorización. Registrar hallazgo y detenerse en el estado actual; exponer impacto, rutas/comportamiento afectados, opciones y comandos/efectos esperados. Solicitar permiso delimitado (qué se cambia y qué se verifica).

La autorización debe ser explícita y trazable, no deducida del silencio, de “continúa” si el alcance no es claro, ni de una aprobación previa de otro cambio. Cuando la respuesta sea ambigua, no modificar. Luego de una corrección autorizada, actualizar el alcance/criterios y volver a las fases de auditoría y pruebas aplicables sobre el nuevo diff. Mantener fallos originales como evidencia; nunca editar una prueba para ocultar el fallo.

## 7. Evidencia obligatoria

Toda transición informada incluye evidencia proporcional:

- Archivos creados/modificados/eliminados y propósito; diff o referencias. Distinguir cambios propios y preexistentes si se conocen.
- Comando exacto, directorio/contexto relevante, resultado observado y código de salida. Por comando, consignar `no ejecutado` si aplica.
- Para pruebas: cantidad/resumen cuando el runner lo informa; fallos y salida relevante sin alterar. No traducir “no hubo fallo observado” a cobertura exhaustiva.
- Para auditoría: superficies inspeccionadas, hallazgos con ubicación, severidad y evidencia; alcance no inspeccionado.
- Limitaciones, dependencias del entorno, comprobaciones omitidas, riesgos pendientes y autorización que falta.

Etiquetar cada afirmación como **Evidencia de ejecución** (observado directamente), **Inferencia** (conclusión basada en evidencia, con razonamiento) o **Pendiente** (no verificado). La configuración en archivos es evidencia de configuración, no de ejecución. El código de salida cero prueba el éxito de ese comando en ese entorno, no la aceptación general del producto.

## 8. Severidad de defectos

Asignar severidad según impacto confirmado/probable en usuario, seguridad, datos y disponibilidad; registrar alcance, reproducibilidad, mitigaciones y confianza. La severidad no concede permiso para corregir.

- **Crítica (S0):** riesgo inmediato de compromiso de seguridad/privacidad, pérdida/corrupción grave de datos o indisponibilidad general; exige detener liberación y escalar al usuario.
- **Alta (S1):** función central inutilizable para una parte sustancial de usuarios, vulnerabilidad relevante o incumplimiento grave sin alternativa razonable; bloquea aceptación hasta decisión explícita y resolución autorizada o aceptación formal del riesgo.
- **Media (S2):** degradación importante pero acotada, con alternativa o impacto limitado; documentar y decidir prioridad antes de aceptar según criterios.
- **Baja (S3):** impacto menor, visual/no bloqueante o caso infrecuente con alternativa; registrar y no incluir en alcance sin aprobación.
- **Informativa (S4):** observación, mejora o riesgo hipotético no reproducido; separar de defectos confirmados.

Si falta información, indicar severidad provisional y confianza; no elevar una hipótesis a defecto confirmado. Reportar críticos/altos y riesgos residuales antes de cierre.

## 9. Bloqueo y cierre

**Bloquear y pedir decisión** ante alcance ambiguo, autorización insuficiente, conflicto con cambios preexistentes, necesidad de tocar archivos prohibidos, pérdida de datos/riesgo de seguridad, dependencias/credenciales faltantes, herramienta no disponible o prueba que requiere efectos no autorizados. Conservar salida y estado; no intentar remediación lateral.

**Aceptar/cerrar** solo cuando: el cambio corresponde al alcance aprobado; cada criterio tiene resultado/evidencia; las revisiones/pruebas exigidas se completaron o las omisiones están expresamente declaradas y aceptadas; críticos/altos se resolvieron mediante cambios autorizados o el riesgo fue aceptado explícitamente; quedan limitaciones/riesgos registrados; y la decisión de aceptación está documentada. Si una verificación falla, criterios no se cumplen o fase autorizada no se ejecutó, no declarar aceptación. El cierre no autoriza commit, PR, push ni despliegue.

## 10. Git, pull requests y Actions

- Git es evidencia y mecanismo de cambio, no autorización. Inspeccionar `git status` y diff; no revertir trabajo ajeno. No crear commits ni pushes sin permiso explícito.
- Crear/actualizar una rama o PR requiere autorización. En PR describir alcance, exclusiones, archivos, criterios/resultados, riesgos y vínculo a la decisión. No afirmar que está lista/fusionada hasta verificar su estado real.
- Configuración observada: `.github/workflows/ci.yml` se activa en `pull_request` dirigido a `master`; usa pnpm 10.30.0 y Node 24, instala con `pnpm install --frozen-lockfile`, ejecuta `pnpm check`, instala Chromium con dependencias y ejecuta `pnpm test:e2e`. Es una lectura del archivo, no evidencia de una ejecución remota.
- Si se reporta Actions, enlazar/identificar ejecución y job, estado, commit y logs relevantes. Un run local no equivale a CI; un workflow configurado no equivale a run exitoso. No modificar CI ni configuración de ramas dentro de tareas que no lo autoricen.

## 11. Plantillas

### Solicitud / propuesta

```text
ID/fecha:
Solicitante y autorización (referencia explícita):
Objetivo:
Incluye:
Excluye:
Rutas autorizadas / rutas prohibidas:
Acciones/comandos autorizados (incluye fases posteriores si procede):
Criterios verificables y resultado esperado:
Riesgos, precondiciones e incógnitas:
Estado: propuesta | aprobada | rechazada
Decisión necesaria del usuario:
```

### Informe de implementación / traspaso

```text
ID y estado: implementada
Alcance autorizado:
Archivos modificados y propósito:
Decisiones:
Verificaciones del Developer (comando exacto, resultado, exit code):
Evidencia de ejecución / inferencias / pendientes:
Limitaciones, riesgos y hallazgos fuera de alcance:
¿Fase posterior autorizada sin cambios?: sí/no; referencia
Pausa / autorización requerida:
```

### Informe de revisión, pruebas y cierre

```text
ID y versión/diff revisado:
Fase y estado:
Reviewer: superficies; hallazgos (ID, severidad, ubicación, evidencia); límites
Tester: comandos exactos; resultado y exit code por comando; fallos/omisos
Criterio -> evidencia -> pasa/no pasa/no verificado:
Riesgos residuales y limitaciones:
Cambios adicionales propuestos (no implementados):
Autorización de correcciones (referencia o pendiente):
Decisión: aceptada/rechazada/bloqueada; motivo:
Acciones Git/PR/Actions: ejecutadas o no ejecutadas, evidencia:
```
