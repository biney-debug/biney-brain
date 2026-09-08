---
name: biney-brain-ai-usage
description: Como MRS usa la IA como herramienta, sin conformarse con resultados genericos y sin dejar que la sesion se degrade por historial largo. Usar cuando lo que la IA devuelve salga generico/mediocre (diseno, seguridad, codigo optimizado), o cuando una sesion se este poniendo larga y compleja.
---

# Usar la IA sin complicarse la vida

Esto no es criterio de producto, es criterio de como trabajar con la herramienta misma. Es el dominio mas parecido a ponytail de todos: la idea es no perder tiempo en el paso previo a actuar.

## Cuando el resultado te sale generico

El problema no es no saber que pedir, es que lo que la IA devuelve por default es generico: un diseno de landing que se ve "hecho por IA", codigo que funciona pero sin pensar en seguridad ni optimizacion, lo que sea. Ahi el error es quedarte peleando con el prompt tratando de corregirlo a mano, prompt tras prompt, hasta que salga bien.

En vez de eso: primero se prueba `find-skills` (si esta instalado) para buscar/instalar directo desde Claude Code una skill hecha para exactamente ese problema, y si no aparece nada util recien se busca a mano en TikTok/YouTube. Ninguna de las dos formas es "seguir peleando el prompt": es buscar si alguien ya empaqueto el criterio especializado que te falta, no reinventarlo a mano cada vez. Es la misma logica de este mismo repo: biney-brain existe porque buscar "una skill para X" es mas rapido que tratar de explicarle todo a la IA de cero.

El bloqueo real que esto evita es el perfeccionismo de pelear con el prompt: si el resultado sigue saliendo generico despues de un par de intentos, se corta ahi y se busca la skill que ya lo resuelve, no se sigue insistiendo a mano.

## Evitar que la sesion se autocomprima

Una sesion larga y desordenada termina autocomprimiendose y perdiendo detalle. La forma de evitarlo es doble:

1. **Dividir el trabajo en tareas chicas.** No se le tira a la IA un pedido gigante de una sola vez esperando que resuelva todo el proyecto en un tiro. Se corta en pasos verificables, cada uno chico, para que la sesion no tenga que cargar con un historial enorme de una sola tarea monstruosa.
2. **Usar `.md` para dar contexto**, de dos formas combinadas:
   - Un archivo de contexto persistente en el repo (tipo `NOTES.md` o `CONTEXTO.md`) que se le pasa a la IA al arrancar, en vez de reexplicar todo de palabra cada sesion nueva.
   - Pedir resumenes intermedios en markdown antes de que la sesion se ponga larga, en vez de dejar que el historial crezca solo y dependa de que la autocompresion "adivine" que es importante.

Consecuencia practica: si una tarea se ve grande, no se arranca de una, se corta en pasos chicos con un `.md` de por medio para no perder contexto entre uno y otro.

## Resumen para el router

- El resultado sale generico (diseno, seguridad, codigo) → prueba `find-skills` primero, y si no encuentra nada recien buscas en TikTok/YouTube, antes de seguir peleando con el prompt.
- Sesion larga o tarea grande → dividir en tareas chicas, y usar un `.md` de contexto (persistente en el repo + resumenes intermedios) en vez de confiar en que el historial aguante.
