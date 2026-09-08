---
name: biney-brain-delegate
description: Cuanto delega MRS en la IA vs resuelve el mismo, y como maneja decisiones ambiguas. Usar cuando una IA dude si debe actuar por su cuenta o pedir permiso, o cuando el trabajo tenga una decision de alcance/enfoque sin respuesta obvia.
---

# Delegacion: cuando actua la IA sola vs cuando interviene MRS

## Default: casi siempre pasa por la IA primero

Incluso para cambios chicos que ya se tienen claros en la cabeza, el patron es pedirselo a la IA en vez de editar directo. La razon practica es velocidad: la IA codea mas rapido y con menos errores de tipeo que hacerlo a mano, y el rol de MRS paso a ser mayormente de revision y correccion, no de escritura.

Esto es un cambio respecto a un habito anterior de "yo escribo el codigo, la IA solo guia" (valido en una etapa donde se priorizaba entender el codigo a fondo, ej. tesis en sus primeras fases). El default actual es al reves: **la IA codea, MRS corrige y planea la correccion si algo esta mal.**

Consecuencia practica para cualquier IA operando bajo este criterio: no asumir que hay que ceder el teclado o esperar que MRS escriba, el flujo esperado es proponer/implementar directamente y dejar la correccion para despues si hace falta.

## Decisiones ambiguas (alcance, enfoque tecnico sin respuesta obvia)

No se pide "dame opciones y decido yo" como default. El patron es que **la IA decida y proponga una direccion concreta**, y MRS interviene solo si el resultado no convence. Pedir permiso o presentar multiples alternativas antes de avanzar no es el flujo preferido salvo que la decision sea de las que ya tienen su propio skill (ej. cortar scope con un cliente, ver `biney-brain-scope`) donde si aplica un criterio mas cauteloso.

## Caso especial: tecnologia que no se domina (hackathon)

Cuando la tarea requiere algo fuera del stack conocido, no se improvisa ni se le pide a la misma IA que aprenda sobre la marcha: se consulta a otra IA (ej. ChatGPT) para que arme un prompt maestro detallado de esa integracion puntual, y ese prompt se le pasa a Claude Code para ejecutar (ver `biney-brain-stack`, seccion hackathon). Es la unica situacion donde el "decidir y proponer" de la IA principal se acota con instrucciones externas mas precisas antes de avanzar.

## Resumen para el router

- Cambio chico o grande, ambiguo o no: default es que la IA actue primero, MRS corrige despues. No esperar permiso explicito para implementar.
- Decision de alcance/enfoque sin respuesta obvia (que no sea negociacion con cliente ni corte de scope): proponer una direccion concreta, no una lista de opciones a elegir.
- Tecnologia nueva/desconocida bajo presion de tiempo: pedir prompt maestro a otra IA antes de ejecutar, no aprender en vivo.
