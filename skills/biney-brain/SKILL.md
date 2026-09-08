---
name: biney-brain
description: Que haria MRS (biney-debug) en esta situacion. Router de criterio experimentado, invocalo con /biney-brain cuando haya que decidir stack, cortar scope, nivel de seguridad, tests, git workflow, o cuanto delegar a la IA, y no este claro que skill aplica.
---

# biney-brain: router de criterio

Este skill no resuelve nada por si mismo. Su trabajo es decidir, dado un caso concreto, si:

1. Ya existe un skill instalado que lo resuelve mejor (delegar ahi), o
2. El caso es un juicio propio de MRS que ningun skill de proposito general cubre (aplicar uno de los dominios de abajo).

No mezclar los dos: si el caso es "escribi este endpoint de forma simple" eso es codigo puro, va a ponytail, no a un dominio de biney-brain.

## Paso 1: identificar el tipo de caso

```
Caso llega
    │
    ├── Es escribir/refactorizar/elegir libreria de codigo?
    │     └──→ delegar a `ponytail`
    │
    ├── Es ahorrar tokens/texto en la respuesta?
    │     └──→ delegar a `caveman`
    │
    ├── Es revisar seguridad de codigo ya escrito?
    │     └──→ delegar a `security-and-hardening` / `/security-review`
    │           (pero el NIVEL de exigencia esperado lo define `biney-brain-security`)
    │
    ├── Es diseno de UI/UX?
    │     └──→ delegar a `frontend-ui-engineering` / skill `design`
    │
    ├── Es spec/plan/review de un proceso de codigo (no una decision de negocio)?
    │     └──→ delegar a `spec-driven-development`, `planning-and-task-breakdown`,
    │           `code-review-and-quality` segun corresponda
    │
    └── Es un juicio de contexto/negocio/prioridad sin skill de codigo que lo cubra?
          └──→ ver Paso 2
```

## Paso 2: que dominio propio aplica

```
Juicio de contexto
    │
    ├── Que tecnologia/arquitectura usar segun el contexto (examen, hackathon,
    │   freelance, tesis)? ────────────────────────→ `biney-brain-stack`
    │
    ├── Que cortar, posponer o negociar cuando el
    │   alcance no entra en el tiempo? ────────────→ `biney-brain-scope`
    │
    ├── Cuanto esfuerzo de seguridad meter segun
    │   el contexto (mas alla de la revision tecnica)? → `biney-brain-security`
    │
    ├── Escribir tests, probar a mano, o confiar
    │   en auditoria de IA? ───────────────────────→ `biney-brain-tests`
    │
    ├── Como commitear/ramificar? ─────────────────→ `biney-brain-git`
    │
    ├── La IA deberia actuar sola o pedir permiso/
    │   opciones antes de avanzar? ────────────────→ `biney-brain-delegate`
    │
    └── El resultado te sale generico (diseno, seguridad,
        codigo), o la sesion se pone larga/desordenada? ─→ `biney-brain-ai-usage`
```

## Como responder

Cuando te invoquen con `/biney-brain <situacion>`:

1. Clasificar el caso segun el Paso 1.
2. Si delega a un skill externo, decirlo explicito: "esto es caso de `<skill>`, invocalo".
3. Si aplica un dominio propio, resumir en 2-4 lineas el criterio concreto de ese SKILL.md (no repetir el archivo entero), y aclarar de que dominio sale.
4. Si el caso mezcla dos cosas (ej. "que stack uso y como lo aseguro"), citar ambos dominios, no forzar una sola respuesta.
5. Si el caso no encaja en ningun dominio existente, decirlo: es senal de que falta un dominio nuevo por documentar, no inventar un criterio que MRS nunca valido.
