---
name: biney-brain-stack
description: Como MRS elige stack/arquitectura segun el contexto (examen, hackathon, freelance, tesis). Usar cuando haya que decidir tecnologia o estructura tecnica y el contexto de la tarea (evaluado, deadline duro, cliente externo, investigacion propia) importe mas que la tecnologia "ideal".
---

# Eleccion de stack segun contexto

La pregunta nunca es "cual es la mejor tecnologia" sino "quien va a evaluar/mantener esto y bajo que restriccion de tiempo". El contexto manda sobre la preferencia tecnica.

## Examen (nomenclatura fija, tiempo acotado, un evaluador tecnico puntual)

1. El enunciado manda siempre en lo que especifica (nomenclatura, stack explicito, estructura pedida). Cero margen propio ahi.
2. Para todo lo que el enunciado NO especifica (DTO vs entidad directa, Bean Validation, libreria de testing, capas service/repository, `@Transactional`), no se re-decide desde cero: se repite el patron que ya funciono en el examen anterior. La consistencia entre examenes vale mas que "la forma correcta" en abstracto, porque ya esta probado que corre y que no genera descuento.
3. Consecuencia practica: antes de arrancar un examen nuevo, primero preguntar si hay un patron previo reusable (revisar examenes/proyectos anteriores) en vez de proponer una estructura nueva "mas prolija".

## Hackathon (24-48h, MVP, demo/pitch al final)

Regla dura: **el stack del MVP es siempre el que ya se domina.** No se elige tecnologia nueva para el core por mas que impresione en la demo.

Como se resuelve la tension "quiero meter algo nuevo/vistoso" sin arriesgar el MVP:
1. Se arma el plan de accion con Claude Chat, siendo explicito sobre que tecnologias ya se dominan, y se pide que el plan use esas.
2. Si hace falta integrar algo que no se domina al 100% (ej: un modelo de IA, una libreria nueva, una integracion externa), **no se improvisa en vivo**: se le pide a otra IA (ej. ChatGPT) que redacte un prompt maestro detallado para esa integracion puntual.
3. Ese prompt maestro se pasa a Claude Code para que lo ejecute. La pieza desconocida queda aislada y con instrucciones precisas, en vez de mezclarse con improvisacion sobre el stack conocido.

En otras palabras: la novedad tecnica se tercioriza a un proceso de prompting dedicado, nunca se aprende "sobre la marcha" a mitad de hackathon tocando el core del MVP.

## Freelance real (hay un tecnico externo que va a revisar/mantener)

Se siguen convenciones "de libro": capas limpias, servicios simulados bien emulados (ej. AWS local), documentacion de decisiones. La razon no es "buenas practicas por las buenas practicas", es que hay alguien tecnico ajeno que tiene que poder leer y mantener el codigo sin que tu se lo expliques en persona.

## Tesis / proyecto de investigacion propio

La arquitectura se dobla ante lo que hay que mostrar o medir para la investigacion (ej: un dashboard de metricas, un componente especifico que la tesis necesita evidenciar), no ante el estandar "de libro" en abstracto. Si una decision de arquitectura no aporta a lo que el jurado va a evaluar o a lo que la tesis necesita demostrar, no es prioridad resolverla "bien", es prioridad que sirva al argumento de la tesis.

## Resumen para el router

- Contexto = examen → nomenclatura del enunciado + patron ya usado antes, no reinventar.
- Contexto = hackathon/MVP → stack conocido siempre; lo nuevo se aisla via prompt maestro de otra IA + ejecucion en Claude Code (ver tambien `biney-brain-delegate`).
- Contexto = cliente/freelance → rigor "de libro", documentar decisiones, pensar en el que va a mantenerlo.
- Contexto = tesis propia → arquitectura al servicio de lo que hay que demostrar/medir, no al servicio del estandar abstracto.
