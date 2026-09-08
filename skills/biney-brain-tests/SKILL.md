---
name: biney-brain-tests
description: Cuando MRS escribe tests automatizados, cuando prueba manual, y cuando delega la verificacion a una auditoria de IA. Usar cuando haya que decidir esfuerzo de testing segun contexto (examen, hackathon, proyecto propio, freelance).
---

# Tests: cuando escribirlos, cuando probar a mano, cuando delegar a la IA

La prioridad de fondo nunca es "cobertura de tests", es que el trabajo cumpla su criterio de exito (rubrica, demo, cliente). Los tests son un medio, no un objetivo en si mismo.

## Examen

Prioridad absoluta: que funcione segun la rubrica al 100%. Si el enunciado exige tests como parte de la entrega, no se disena la suite desde cero: se le pregunta a la IA que casos poner, y la verificacion real se hace tomando capturas manuales de que corren. El test automatizado es un entregable de la rubrica, no una herramienta de confianza propia en ese contexto.

Si el enunciado no pide tests, no se escriben. El tiempo va integro a que la funcionalidad este completa.

## Hackathon (MVP, deadline duro)

Cero tests automatizados. Toda la verificacion es manual, y ademas es oportunista: se revisa a mano lo que se puede segun el tiempo que quede, no hay ronda sistematica de QA. El respaldo principal es el reporte de auditoria que da la IA (ver `biney-brain-security`), no una suite propia.

## Proyecto propio sin deadline externo

Aca el criterio cambia en dos sentidos respecto al hackathon:
1. **Si se escriben tests**, pero acotados a lo critico: pagos, auth, calculos, logica donde un bug silencioso es caro o dificil de notar a simple vista. No cobertura total.
2. **Se prueba manualmente en serio**, no solo cuando sobra tiempo como en hackathon. En un proyecto propio de mas aliento, el testing manual es parte habitual del flujo, no una excepcion oportunista.

El patron de fondo en ambos casos (hackathon y proyecto propio) es el mismo flujo: pedirle a la IA que corra los tests/la auditoria y entregue un reporte, y complementar con revision manual propia cuando el contexto lo permite. La diferencia es cuanto tiempo se invierte en esa revision manual: casi nada en hackathon, en serio en proyecto propio.

## Freelance (cliente externo que puede pedir soporte despues)

Los tests se agregan **por default**, aunque el cliente no los pida explicitamente en el alcance. La razon es la misma que en `biney-brain-stack` para arquitectura "de libro": alguien tecnico externo va a mantener esto, y un test minimo reduce el riesgo de regresiones que después te terminan pidiendo arreglar sin que estén cotizadas.

## Resumen para el router

- Examen → tests solo si la rubrica los pide, verificacion real = capturas manuales, prioridad total es cumplir rubrica.
- Hackathon → cero tests automatizados, verificacion manual oportunista + reporte de auditoria de IA.
- Proyecto propio → tests acotados a logica critica + verificacion manual seria, no oportunista.
- Freelance → tests por default, no dependen de que el cliente los pida.
