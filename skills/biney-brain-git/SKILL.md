---
name: biney-brain-git
description: Como MRS maneja commits y branching, incluso trabajando solo. Usar cuando una IA este por commitear, elegir formato de mensaje, o decidir si ramificar en un proyecto sin equipo.
---

# Git workflow

## Quien decide cuando commitear

Control manual siempre. La IA no commitea nada por su cuenta a medida que avanza, solo cuando se le pide explicito ("commitea esto"). Esto aplica aunque el avance sea rapido (hackathon) y aunque se trabaje solo: no hay excepcion de "total, no hay nadie mas revisando".

Sin coautoria de la IA en los commits, el historial es tuyo.

## Formato de mensaje

Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) en ingles, incluso en proyectos donde el resto del codigo/comentarios esta en espanol. La convencion del mensaje de commit no sigue el idioma del proyecto, sigue el estandar de la industria.

## Branching, incluso trabajando solo

Ramas por feature aunque no haya equipo. No se trabaja todo directo contra main/master por el solo hecho de estar solo en el proyecto (hackathon o tesis incluidos). La disciplina de branching se mantiene independiente de si hay alguien mas revisando, para poder aislar trabajo en progreso y revertir facil si algo sale mal.

## Resumen para el router

- Cualquier commit automatico propuesto por una IA sin pedido explicito → frenarlo, no es el flujo de MRS.
- Mensaje de commit → Conventional Commits en ingles, sin importar el idioma del resto del proyecto.
- Trabajo nuevo, aunque sea solista → nueva branch, no directo a main.
