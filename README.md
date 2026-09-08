<p align="center">
  <img src="assets/logo.png" width="220" alt="biney-brain, el pata con mas experiencia que tu">
</p>

<h1 align="center">biney-brain</h1>

<p align="center">
  <em>No es que sepa mas. Es que ya la cago antes en esto exacto.</em>
</p>

---

¿Cansado de ser un fracasado que no sabe sacarle el jugo a Claude Code? ¿Instalaste cuatro skills, sigues sin saber cual usar, cuando, ni por que, y terminas pidiendole todo a la IA con criterio de examen de ultimo momento?

Tranquilo causa. Aca hay otro fracasado, pero con mas chamba encima: examenes resueltos repitiendo el patron que ya funciono, hackathons a las corridas, algun cliente real que casi me hace tirar todo por la ventana, y una tesis que me enseno a no confundir "bien hecho" con "lo que hay que mostrar". De ahi sali con un criterio que ya no me complico en pensar de cero cada vez.

biney-brain empaqueta ese criterio como router: le cuentas el caso, y te dice si esto ya lo resuelve un skill que tienes instalado (`ponytail` para no escribir de mas, `caveman` para no hablar de mas, `security-and-hardening` para no filtrar datos, `frontend-ui-engineering` para que no se vea a examen de colegio) o si es un juicio de contexto que ningun skill de codigo cubre, y ahi aplica el criterio ya masticado.

No resuelve todo. No te hace mas inteligente. Solo evita que reinventes la rueda con cada decision que ya alguien (yo, en este caso) la cago resolviendo antes que tu.

## Antes / despues

Preguntas "que stack uso para este hackathon de 30 horas" y tu IA te arma un mapa de microservicios con Kafka porque "escala mejor".

Con biney-brain:

```
/biney-brain que stack uso para un hackathon de 30 horas
```

> Caso de `biney-brain-stack`. Usa lo que ya dominas, no lo que suena mejor en el pitch.
> Si necesitas algo que no controlas, no lo improvises: pidele a otra IA un prompt
> detallado para esa pieza puntual y ejecutalo aparte del core.

Sin discusion sobre arquitectura hexagonal a las 3am. Sin Kafka en un MVP de 30 horas.

## Como funciona

Un router (`biney-brain`) mas un dominio por tipo de decision:

- `biney-brain-stack`: que tecnologia usar segun el contexto (examen, hackathon, cliente real, proyecto de investigacion propio)
- `biney-brain-scope`: que cortar, posponer o negociar cuando el tiempo no alcanza
- `biney-brain-security`: cuanto esfuerzo de seguridad meter y cuando no es negociable
- `biney-brain-tests`: cuando escribir tests, cuando probar a mano, cuando confiar en que la IA audite
- `biney-brain-git`: como commitear y ramificar, incluso trabajando solo
- `biney-brain-delegate`: cuanto le sueltas la mano a la IA y cuando intervienes tu

Cada uno es un `SKILL.md`, sin magia ni hooks corriendo en segundo plano. Si no te sirve un dominio, lo borras. Si te falta uno, se agrega igual que los demas: un archivo de texto con criterio concreto, no pura teoria.

## Instalar

```
/plugin marketplace add C:\Users\ASUS\proyectos\biney-brain
/plugin install biney-brain
```

Si ya esta en GitHub:

```
/plugin marketplace add biney-debug/biney-brain
/plugin install biney-brain
```

## Badge en la statusline (opcional, para el pata que lo instala)

Al instalar el plugin, un hook `SessionStart` prende solo el flag que indica que biney-brain esta activo, no hace falta tocar nada para eso. Lo unico manual es decirle a tu terminal que dibuje el badge:

1. Copia `hooks/biney-brain-statusline.sh` a tu carpeta `~/.claude/hooks/`.
2. Agrega esto a tu `statusLine.command` en `~/.claude/settings.json` (encadenado con `;` a lo que ya tengas, mismo patron que usan `caveman`/`ponytail`/`agent-skills` si los tienes):
   ```
   bash "~/.claude/hooks/biney-brain-statusline.sh"
   ```

Con eso, apenas abras una sesion nueva vas a ver `[BINEY-BRAIN]` en la barra de estado. Es solo cosmetico: indica que el plugin esta disponible, no cambia el comportamiento de ninguna respuesta.

## Usar

```
/biney-brain <cuentame tu situacion>
```

Te dice a que skill delegar, o el criterio concreto a aplicar si es un juicio que ningun skill de codigo resuelve por ti.

---

<p align="center"><sub>Inspirado en como esta armado <a href="https://github.com/DietrichGebert/ponytail">ponytail</a>. Mismo principio: la respuesta corta que ya sabe alguien con mas cicatrices que tu.</sub></p>
