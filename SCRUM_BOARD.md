# Tablero Scrum - pos-system-cc-2026

Fecha de creación: 25 de mayo de 2026  
Líder de grupo / Product Owner: Cristóbal Mundaca  
Repositorio: `cristobalMundacaV/pos-system-cc-2026`

---

## 1. Objetivo del proyecto

Desarrollar un sistema POS para operación comercial/restaurante, organizado como proyecto grupal bajo metodología Scrum. El sistema debe permitir gestionar productos, pedidos, ventas, caja, mesas, roles de usuario, reportes y una base preparada para despliegue en AWS.

---

## 2. Roles sugeridos del equipo

| Rol Scrum / Técnico | Responsable | Función principal |
|---|---|---|
| Product Owner / Líder | Cristóbal Mundaca | Definir alcance, priorizar tareas, revisar avances y validar entregables. |
| Scrum Master | Por asignar | Coordinar reuniones, desbloquear problemas y mantener el tablero actualizado. |
| Backend Developer | Por asignar | Modelos, API, reglas de negocio, autenticación, roles y permisos. |
| Frontend Developer | Por asignar | Pantallas, formularios, flujo POS, experiencia de usuario y validaciones visuales. |
| QA / Documentación | Por asignar | Pruebas, evidencias, manual de usuario, capturas y presentación final. |
| DevOps / AWS | Por asignar | Entorno, variables, despliegue, configuración de servicios y documentación técnica. |

---

## 3. Estados del tablero

| Estado | Criterio |
|---|---|
| Backlog | Tarea definida, pero aún no comprometida para el sprint actual. |
| To Do | Tarea seleccionada para trabajar durante el sprint. |
| In Progress | Tarea en desarrollo activo. |
| Review / Testing | Tarea terminada técnicamente, en revisión, prueba o validación. |
| Done | Tarea validada, documentada y lista para entrega. |

---

## 4. Backlog priorizado

| ID | Tarea | Prioridad | Sprint sugerido | Responsable | Estado |
|---|---|---:|---|---|---|
| CC-01 | Definir alcance, módulos y criterios de aceptación del sistema POS | Alta | Sprint 0 | Líder / QA | To Do |
| CC-02 | Diseñar arquitectura general y modelo de datos base | Alta | Sprint 0 | Backend | Backlog |
| CC-03 | Configurar estructura inicial del proyecto, entorno local y repositorio | Alta | Sprint 0 | Backend / DevOps | Backlog |
| CC-04 | Implementar autenticación, roles y permisos | Alta | Sprint 1 | Backend | Backlog |
| CC-05 | Implementar gestión de productos, categorías, precios y descuentos | Alta | Sprint 1 | Backend / Frontend | Backlog |
| CC-06 | Implementar POS mostrador para crear pedidos rápidos | Alta | Sprint 1 | Frontend / Backend | Backlog |
| CC-07 | Implementar módulo de mesas, pedidos y estados operacionales | Alta | Sprint 2 | Frontend / Backend | Backlog |
| CC-08 | Implementar flujo cocina/barra/KDS y separación de estados listo/servido | Media | Sprint 2 | Backend / Frontend | Backlog |
| CC-09 | Implementar caja, ventas, pagos y cierre de caja | Alta | Sprint 2 | Backend / Frontend | Backlog |
| CC-10 | Implementar dashboard BI, reportes, proyecciones y simulador demo | Media | Sprint 3 | Frontend / Backend | Backlog |
| CC-11 | Preparar despliegue en AWS, variables de entorno y documentación técnica | Alta | Sprint 3 | DevOps | Backlog |
| CC-12 | Ejecutar QA, evidencias, manual de usuario y presentación final | Alta | Sprint 3 | QA / Líder | Backlog |

---

## 5. Plan de sprints

### Sprint 0 - Organización y base del proyecto

Objetivo: dejar claro qué se va a construir, cómo se organizará el equipo y cuál será la estructura técnica inicial.

Tareas principales:
- CC-01 Definir alcance y criterios de aceptación.
- CC-02 Diseñar arquitectura y modelo de datos.
- CC-03 Configurar estructura inicial del proyecto.

Entregable del sprint:
- Backlog inicial aprobado.
- Repositorio organizado.
- Modelo base definido.
- Roles asignados.

### Sprint 1 - Núcleo del POS

Objetivo: construir la base funcional del sistema.

Tareas principales:
- CC-04 Autenticación, roles y permisos.
- CC-05 Productos, categorías, precios y descuentos.
- CC-06 POS mostrador.

Entregable del sprint:
- Usuario puede iniciar sesión.
- Usuario autorizado puede administrar productos.
- Usuario autorizado puede crear un pedido desde POS mostrador.

### Sprint 2 - Operación del restaurante / venta

Objetivo: cubrir el flujo operacional completo de atención, preparación y cobro.

Tareas principales:
- CC-07 Mesas, pedidos y estados.
- CC-08 Cocina/barra/KDS.
- CC-09 Caja, ventas y pagos.

Entregable del sprint:
- Pedido pasa por estados operacionales.
- Caja registra ventas y pagos.
- Flujo mesero/cocina/caja queda validado.

### Sprint 3 - Inteligencia, despliegue y cierre

Objetivo: cerrar el proyecto con reportes, despliegue, QA y presentación.

Tareas principales:
- CC-10 BI, reportes, proyecciones y simulador.
- CC-11 Despliegue AWS.
- CC-12 QA, evidencias y documentación.

Entregable del sprint:
- Sistema demostrable.
- Evidencias completas.
- Manual/documentación final.
- Presentación lista para evaluación.

---

## 6. Definition of Done

Una tarea solo pasa a `Done` cuando cumple:

- Código implementado y subido al repositorio.
- Funcionalidad probada manualmente.
- No rompe el flujo principal del sistema.
- Tiene evidencia si corresponde: captura, commit, comentario o prueba.
- Está vinculada a un issue o identificador de tarea.
- Fue revisada por el líder o por otro integrante del equipo.

---

## 7. Reglas de trabajo del equipo

- Cada integrante trabaja sobre una rama propia o rama por feature.
- Ningún cambio importante se sube directo a `main` sin revisión.
- Cada tarea debe tener responsable, estado y evidencia.
- Las dudas bloqueantes se comunican rápido, no al final del sprint.
- Las tareas grandes se dividen antes de empezar a programar.
- El tablero se actualiza al terminar cada sesión de trabajo.

---

## 8. Reuniones Scrum sugeridas

| Reunión | Duración | Objetivo |
|---|---:|---|
| Sprint Planning | 20-30 min | Elegir tareas del sprint y asignar responsables. |
| Daily breve | 5-10 min | Revisar qué hizo cada uno, qué hará y qué bloqueo tiene. |
| Sprint Review | 15-20 min | Mostrar avances funcionando. |
| Retrospective | 10-15 min | Mejorar la forma de trabajo del equipo. |

---

## 9. Comandos Git sugeridos para el equipo

```bash
git checkout -b feature/cc-01-alcance
# trabajar cambios
git add .
git commit -m "docs: definir alcance inicial del POS"
git push origin feature/cc-01-alcance
```

Formato recomendado de commits:

```text
tipo: descripción corta
```

Ejemplos:

```text
feat: agregar modulo de productos
fix: corregir estado de pedido servido
docs: actualizar tablero scrum
test: agregar pruebas de caja
```

---

## 10. Próxima acción inmediata

1. Asignar responsables reales a cada rol.
2. Mover CC-01, CC-02 y CC-03 a `To Do`.
3. Crear ramas por tarea.
4. Trabajar Sprint 0 antes de programar módulos grandes.
