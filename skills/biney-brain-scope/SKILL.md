---
name: biney-brain-scope
description: Como MRS decide que cortar, posponer o negociar cuando el alcance no entra en el tiempo/esfuerzo disponible. Usar cuando haya presion de deadline (hackathon), un pedido de cliente fuera de lo acordado, o un backlog propio mas grande de lo que se puede hacer.
---

# Cortar scope, negociar o posponer

No hay una sola regla: el criterio cambia segun quien pone el deadline (jurado, cliente, o nadie).

## Hackathon con deadline y demo/pitch al final

Cuando el alcance planeado no va a entrar, se corta **pulido/UI antes que funcionalidad**. La prioridad es que todo lo prometido funcione, aunque se vea sin pulir, antes que tener menos features pero bien presentadas.

Consecuencia practica: si a mitad de hackathon hay que elegir entre "terminar de pulir esta pantalla" o "empezar la siguiente funcionalidad del plan", se empieza la funcionalidad. El pulido visual es lo ultimo que se toca, y solo si sobra tiempo al final.

Esto es consistente con `biney-brain-stack`: el MVP prioriza que el alcance funcional completo este ahi, no que se vea perfecto.

## Cliente freelance pide algo fuera de lo acordado

No se dice que no de entrada. El patron es **proponer una alternativa mas simple que cumpla el objetivo del cliente con menos riesgo o tiempo**, antes de rechazar el pedido o de implementarlo tal cual si complica el sistema.

Pasos en la practica:
1. Entender que problema de fondo quiere resolver el cliente con ese pedido (no el pedido literal).
2. Ofrecer una version reducida/alternativa que resuelva ese problema de fondo sin el riesgo tecnico del pedido original.
3. Solo si el cliente insiste en la version completa despues de ver la alternativa, se evalua caso por caso (esto todavia no tiene patron fijo, no inventar una regla rigida aca).

## Proyecto propio sin deadline externo (features que tu mismo propones)

El criterio para descartar algo de forma definitiva **no es si aporta al objetivo central del proyecto**, es el **esfuerzo de implementacion relativo al beneficio**. Una idea puede encajar perfecto con el objetivo del producto y aun asi quedar descartada si el costo de implementarla es desproporcionado.

Consecuencia practica: al evaluar un item del backlog propio, la pregunta no es "esto ayuda al producto?" (casi siempre la respuesta es si, si la idea llego a la lista), es "el esfuerzo que toma se justifica frente a lo que suma?". Si no, se descarta o se pospone indefinidamente, no se prioriza solo por relevancia tematica.

## Resumen para el router

- Deadline de jurado/hackathon → corta UI/pulido, protege funcionalidad completa.
- Pedido de cliente fuera de alcance → primero alternativa simple, recien despues evaluar si se dice que no.
- Backlog propio sin presion externa → filtra por esfuerzo/beneficio, no por si "encaja con la vision".
