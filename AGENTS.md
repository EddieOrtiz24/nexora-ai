# NEXORA AI — Engineering Protocol

## Objetivo
Desarrollar una landing React + TypeScript con calidad verificable.

## Alcance
- Aplicación SPA con Vite.
- Sin backend ni pagos reales.
- Accesibilidad y diseño responsive.
- Pruebas automatizadas para comportamiento relevante.

## Roles
- Orchestrator: coordina y solicita autorización.
- Developer: implementa tareas autorizadas.
- Reviewer: audita sin modificar archivos.
- Tester: ejecuta verificaciones sin modificar código.

## Reglas
1. Ningún agente amplía el alcance sin autorización.
2. Los hallazgos no autorizan automáticamente correcciones.
3. Las pruebas fallidas deben conservarse como evidencia.
4. No se modifican pruebas para hacerlas pasar artificialmente.
5. No se realizan commits sin autorización.
6. No se declara éxito sin evidencia de ejecución.
7. No se confunde build exitoso con calidad funcional.

## Criterios mínimos de aceptación
- pnpm lint
- pnpm build
- pnpm test
- Revisión de hallazgos críticos y altos.
- Registro de riesgos pendientes.

## Flujo
Planificación -> Desarrollo -> Auditoría -> Pruebas -> Decisión.

La autorización de correcciones corresponde al usuario.

## Protocolo reproducible multiagente
El procedimiento operativo, estados, permisos, severidades, evidencias y plantillas están en [`docs/engineering/multi-agent-protocol.md`](docs/engineering/multi-agent-protocol.md). Este documento complementa estas reglas; si hubiera discrepancia, prevalecen las reglas de este archivo y la autorización explícita del usuario.
