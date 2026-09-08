---
name: biney-brain-security
description: Que nivel de seguridad aplica MRS segun el contexto (examen, hackathon, tesis, produccion/freelance) y como delega la revision. Usar cuando haya que decidir cuanto esfuerzo de seguridad meter, o cuando el codigo este por desplegarse.
---

# Nivel de seguridad segun contexto

La barra de seguridad no es fija, escala con el contexto y con si hay datos reales o plata de por medio.

## Secrets y credentials

- **Freelance / produccion**: estricto siempre. Credentials son env vars obligatorias, sin defaults ni fallback embebido en el codigo. Esto no se negocia por deadline.
- **Examen / hackathon**: se relaja. Un `.env` con valores dummy commiteado o un default temporal es aceptable porque el unico que lo ve es uno mismo y el evaluador, no hay superficie de ataque real.

## Validacion, hardening, auditoria de codigo

No se salta la seguridad "porque no da el tiempo": el patron es delegarla, no omitirla. La forma de aplicarla es dejar que Claude (con ponytail + agent-skills activos) haga una pasada de auditoria completa buscando bugs de codigo y visuales, en vez de ir validando manualmente linea por linea mientras se programa.

Esto sube de intensidad segun el contexto:
- **Tesis o algo que va a produccion real**: prioridad alta. Puntos que no se pueden olvidar:
  - Rate limiting (evita abuso y evita pagar de mas por el backend desplegado si alguien lo satura).
  - Prevenir fuga de datos, esto es la prioridad numero uno al momento de desplegar, mas que "seguir el checklist OWASP completo".
- **Examen / hackathon sin datos reales**: la auditoria via IA se sigue haciendo (no se omite), pero sin el nivel de exigencia de rate-limiting/fuga de datos que aplica a tesis/produccion.

## Como se revisa el codigo generado por IA

No se revisa linea por linea a ojo. El patron es pedirle a la IA una pasada de seguridad aparte y explicita (ej. `/security-review` o el skill `security-and-hardening`) antes de dar el trabajo por cerrado, en vez de confiar por defecto o de auditar manualmente.

## Resumen para el router

- Si el caso es "voy a desplegar esto en serio" (tesis o produccion) → nivel maximo: rate limiting + prevenir fuga de datos son no-negociables, correr `/security-review` antes de cerrar.
- Si el caso es examen/hackathon sin datos reales → seguridad basica (validacion, manejo de excepciones) via auditoria de IA, pero secrets pueden ser dummy y no hace falta rate-limiting.
- Cualquier revision de seguridad se delega a un pase dedicado de la IA (`security-and-hardening` / `/security-review`), nunca a lectura manual linea por linea.
