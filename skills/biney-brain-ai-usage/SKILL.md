---
name: biney-brain-ai-usage
description: Como MRS usa la IA como herramienta, sin trabarse por perfeccionismo antes de promptear, y sin dejar que la sesion se degrade por historial largo. Usar cuando el usuario no sepa ni como pedirle algo a la IA, o cuando una sesion se este poniendo larga y compleja.
---

# Usar la IA sin complicarse la vida

Esto no es criterio de producto, es criterio de como trabajar con la herramienta misma. Es el dominio mas parecido a ponytail de todos: la idea es no perder tiempo en el paso previo a actuar.

## Cuando no sabes ni que pedirle a la IA

Si el bloqueo es que no sabes ni como formular el pedido (no que la IA no pueda resolverlo), el primer paso no es intentar prompts a ciegas ni quedarte pensando la formulacion perfecta. Se busca un tutorial corto (TikTok, YouTube, lo que sea rapido) que explique el problema o la funcionalidad lo suficiente como para poder despues pedirsela bien a la IA. El tutorial no es para aprenderlo a fondo tu mismo, es para tener el vocabulario y el approach minimo que te permita promptear con precision.

El bloqueo real que esto evita es el perfeccionismo: quedarte dando vueltas buscando "la forma ideal" de pedirlo antes de moverte. Mismo espiritu que ponytail (la primera solucion que funciona es la correcta), aplicado al momento de formular el pedido en vez de al codigo. No te compliques buscando el prompt perfecto, consegui el minimo contexto y tira el prompt.

## Evitar que la sesion se autocomprima

Una sesion larga y desordenada termina autocomprimiendose y perdiendo detalle. La forma de evitarlo es doble:

1. **Dividir el trabajo en tareas chicas.** No se le tira a la IA un pedido gigante de una sola vez esperando que resuelva todo el proyecto en un tiro. Se corta en pasos verificables, cada uno chico, para que la sesion no tenga que cargar con un historial enorme de una sola tarea monstruosa.
2. **Usar `.md` para dar contexto**, de dos formas combinadas:
   - Un archivo de contexto persistente en el repo (tipo `NOTES.md` o `CONTEXTO.md`) que se le pasa a la IA al arrancar, en vez de reexplicar todo de palabra cada sesion nueva.
   - Pedir resumenes intermedios en markdown antes de que la sesion se ponga larga, en vez de dejar que el historial crezca solo y dependa de que la autocompresion "adivine" que es importante.

Consecuencia practica: si una tarea se ve grande, no se arranca de una, se corta en pasos chicos con un `.md` de por medio para no perder contexto entre uno y otro.

## Resumen para el router

- No sabes ni que pedirle a la IA → buscate un tutorial corto primero, no te compliques buscando el prompt perfecto.
- Sesion larga o tarea grande → dividir en tareas chicas, y usar un `.md` de contexto (persistente en el repo + resumenes intermedios) en vez de confiar en que el historial aguante.
