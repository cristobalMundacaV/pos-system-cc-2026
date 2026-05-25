# Tablero Scrum / Kanban - pos-system-cc-2026

Fecha: 25 de mayo de 2026  
Líder / Product Owner: Cristóbal Mundaca  
Proyecto: Sistema POS - Evaluación Cloud Computing

---

## 1. Contexto real del proyecto

Este repositorio ya contiene un sistema POS base con:

- `backend/`: API REST en Node.js + Express.
- `frontend/`: aplicación Next.js 14.
- `database/`: schema, seed y script de creación de usuarios.
- PostgreSQL como base de datos.
- Autenticación JWT con roles `admin` y `cajero`.

El objetivo del trabajo no es crear el POS desde cero, sino analizar sus limitaciones actuales y migrarlo/mejorarlo para una arquitectura cloud moderna, segura, disponible y evaluable.

---

## 2. Objetivo de la evaluación

Transformar el monolito POS base en una solución preparada para cloud, resolviendo o documentando los problemas intencionales del sistema:

- Seguridad.
- Disponibilidad.
- Almacenamiento.
- Observabilidad.
- Configuración por entorno.
- Despliegue funcional.
- Evidencia de avance usando Scrum/Kanban.

---

## 3. Columnas del tablero Kanban

Usar estas columnas en GitHub Projects, Trello o cualquier tablero Kanban:

| Columna | Significado |
|---|---|
| Backlog | Tareas identificadas, pero aún no tomadas por el equipo. |
| To Do | Tareas comprometidas para el sprint actual. |
| In Progress | Tarea en desarrollo activo. |
| Review / Testing | Tarea terminada técnicamente, esperando revisión, prueba o evidencia. |
| Done | Tarea validada, documentada y lista para entrega. |

---

## 4. Roles sugeridos

| Rol | Responsable | Función |
|---|---|---|
| Product Owner / Líder | Cristóbal Mundaca | Prioriza tareas, valida entregables y coordina el avance. |
| Scrum Master | Por asignar | Mantiene el tablero actualizado y detecta bloqueos. |
| Backend | Por asignar | Seguridad API, validaciones, JWT, health check, logging. |
| Frontend | Por asignar | Configuración de frontend, consumo API, sesión segura y pruebas visuales. |
| Database / DevOps | Por asignar | PostgreSQL cloud, SSL, variables, despliegue y alta disponibilidad. |
| QA / Documentación | Por asignar | Evidencias, pruebas, bitácora, presentación y checklist final. |

---

## 5. Backlog priorizado basado en TODO reales

| ID | Tarea | Área | Prioridad | Sprint | Responsable | Estado |
|---|---|---|---|---|---|---|
| CC-01 | Levantar sistema local completo y documentar instalación | Organización | Alta | Sprint 0 | QA / DevOps | To Do |
| CC-02 | Crear tablero Kanban/Scrum y registrar responsables | Gestión | Alta | Sprint 0 | Líder / Scrum Master | To Do |
| CC-03 | Analizar arquitectura actual y crear diagrama monolítico base | Arquitectura | Alta | Sprint 0 | Líder / DevOps | To Do |
| CC-04 | Diseñar arquitectura cloud objetivo | Arquitectura | Alta | Sprint 0 | DevOps / Líder | To Do |
| CC-05 | Eliminar fallback de credenciales hardcodeadas en PostgreSQL | Seguridad | Alta | Sprint 1 | Backend / DevOps | Backlog |
| CC-06 | Configurar conexión PostgreSQL mediante variables de entorno obligatorias | Configuración | Alta | Sprint 1 | Backend / DevOps | Backlog |
| CC-07 | Habilitar SSL/TLS para base de datos en producción | Seguridad / BD | Alta | Sprint 1 | Database / DevOps | Backlog |
| CC-08 | Restringir CORS usando `FRONTEND_URL` | Seguridad | Alta | Sprint 1 | Backend | Backlog |
| CC-09 | Revisar JWT_SECRET y eliminar secretos temporales en producción | Seguridad | Alta | Sprint 1 | Backend / DevOps | Backlog |
| CC-10 | Implementar validación de inputs con `express-validator` | Seguridad | Alta | Sprint 1 | Backend | Backlog |
| CC-11 | Implementar rate limiting para proteger la API | Seguridad | Media | Sprint 1 | Backend | Backlog |
| CC-12 | Evaluar almacenamiento de token y documentar mejora con cookies HttpOnly | Seguridad Frontend | Media | Sprint 1 | Frontend | Backlog |
| CC-13 | Implementar endpoint `GET /health` con validación de conexión a BD | Disponibilidad | Alta | Sprint 2 | Backend | Backlog |
| CC-14 | Agregar lógica de manejo/reintento ante caída de base de datos | Disponibilidad | Media | Sprint 2 | Backend / DevOps | Backlog |
| CC-15 | Definir estrategia de alta disponibilidad: ECS/EC2/containers/PM2 | Disponibilidad | Alta | Sprint 2 | DevOps | Backlog |
| CC-16 | Migrar imágenes locales de `backend/uploads/` a S3 o alternativa cloud | Almacenamiento | Alta | Sprint 2 | Backend / DevOps | Backlog |
| CC-17 | Configurar variables cloud para bucket, región y credenciales seguras | Almacenamiento | Alta | Sprint 2 | DevOps | Backlog |
| CC-18 | Reemplazar `console.log` por logging estructurado con Winston o Pino | Observabilidad | Media | Sprint 2 | Backend | Backlog |
| CC-19 | Definir estrategia de monitoreo: CloudWatch, métricas o logs centralizados | Observabilidad | Media | Sprint 2 | DevOps / QA | Backlog |
| CC-20 | Integrar gestión de secretos: AWS Secrets Manager o alternativa equivalente | Configuración | Alta | Sprint 3 | DevOps | Backlog |
| CC-21 | Preparar variables de entorno para producción backend/frontend | Configuración | Alta | Sprint 3 | DevOps / Frontend | Backlog |
| CC-22 | Desplegar backend, frontend y base de datos en ambiente cloud | Despliegue | Alta | Sprint 3 | DevOps / Equipo | Backlog |
| CC-23 | Verificar URL funcional del sistema desplegado | QA | Alta | Sprint 3 | QA / Líder | Backlog |
| CC-24 | Crear evidencias: capturas, commits, pruebas y decisiones técnicas | Documentación | Alta | Sprint 3 | QA / Líder | Backlog |
| CC-25 | Preparar presentación final: problema, arquitectura, decisiones y demo | Presentación | Alta | Sprint 3 | Líder / Equipo | Backlog |

---

## 6. Sprints sugeridos

### Sprint 0 - Organización, diagnóstico y arquitectura

Objetivo: entender el sistema base, levantarlo localmente y organizar el trabajo.

Tareas:
- CC-01 Levantar sistema local.
- CC-02 Crear tablero Kanban/Scrum.
- CC-03 Diagrama monolítico actual.
- CC-04 Diagrama cloud objetivo.

Entregable:
- Sistema local funcionando.
- Tablero visible para evaluación.
- Roles definidos.
- Diagrama inicial y diagrama objetivo.

### Sprint 1 - Seguridad y configuración base

Objetivo: eliminar riesgos evidentes de seguridad y dejar configuración preparada para producción.

Tareas:
- CC-05 Credenciales sin fallback hardcodeado.
- CC-06 Variables obligatorias para PostgreSQL.
- CC-07 SSL/TLS para BD.
- CC-08 CORS restringido.
- CC-09 JWT_SECRET seguro.
- CC-10 Validaciones de inputs.
- CC-11 Rate limiting.
- CC-12 Evaluación token/cookies HttpOnly.

Entregable:
- Backend más seguro.
- Variables documentadas.
- Evidencia de pruebas de seguridad básica.

### Sprint 2 - Disponibilidad, almacenamiento y observabilidad

Objetivo: preparar el sistema para operar en cloud con varios servicios y monitoreo básico.

Tareas:
- CC-13 Health check.
- CC-14 Manejo ante caída de BD.
- CC-15 Estrategia de alta disponibilidad.
- CC-16 Migración uploads a S3/cloud storage.
- CC-17 Variables cloud de almacenamiento.
- CC-18 Logging estructurado.
- CC-19 Monitoreo/logs centralizados.

Entregable:
- Sistema preparado para balanceador/orquestador.
- Almacenamiento desacoplado del disco local.
- Logs útiles para diagnóstico.

### Sprint 3 - Despliegue, QA y cierre

Objetivo: dejar el proyecto desplegado, documentado y listo para defensa.

Tareas:
- CC-20 Secrets Manager o alternativa.
- CC-21 Variables producción backend/frontend.
- CC-22 Despliegue cloud.
- CC-23 URL funcional validada.
- CC-24 Evidencias completas.
- CC-25 Presentación final.

Entregable:
- URL funcional.
- Repositorio actualizado.
- Bitácora Scrum/Kanban.
- Presentación final con demo.

---

## 7. Definition of Done

Una tarea solo pasa a `Done` si cumple:

- Código o documento subido al repositorio.
- Prueba manual realizada.
- Evidencia agregada: captura, commit, nota técnica o enlace.
- Impacto explicado en lenguaje simple.
- No rompe login, POS, productos, clientes, ventas ni reportes.
- Fue revisada por el líder o por otro integrante.

---

## 8. Cómo crear el tablero Kanban en GitHub Projects

1. Abrir el repositorio en GitHub.
2. Ir a la pestaña `Projects`.
3. Presionar `New project`.
4. Elegir plantilla `Board`.
5. Nombre recomendado: `POS Cloud Scrum 2026`.
6. Crear estas columnas:
   - Backlog
   - To Do
   - In Progress
   - Review / Testing
   - Done
7. Crear tarjetas usando los IDs CC-01 a CC-25 de este documento.
8. Asignar responsable a cada tarjeta.
9. Mover tarjetas según avance real.
10. Tomar capturas del tablero para la bitácora de evaluación.

Nota: si los Issues están desactivados en el repositorio, se pueden usar `Draft items` dentro de GitHub Projects o activar Issues desde `Settings > Features > Issues`.

---

## 9. Cómo crear el tablero Kanban en Trello

1. Entrar a Trello.
2. Crear tablero nuevo llamado `POS Cloud Scrum 2026`.
3. Crear listas:
   - Backlog
   - To Do
   - In Progress
   - Review / Testing
   - Done
4. Crear una tarjeta por cada tarea CC-01 a CC-25.
5. Dentro de cada tarjeta agregar:
   - Responsable.
   - Descripción.
   - Checklist.
   - Evidencia o link a commit.
6. Compartir el tablero con el equipo.
7. Usar capturas del tablero como evidencia.

---

## 10. Formato recomendado de tarjeta

```markdown
## Objetivo
Explicar qué se debe lograr.

## Actividades
- Acción 1
- Acción 2
- Acción 3

## Criterios de aceptación
- Se cumple X condición.
- Existe evidencia.
- Fue probado local o cloud.

## Evidencia
- Commit:
- Captura:
- Comentario técnico:
```

---

## 11. Reglas de trabajo del equipo

- Nadie trabaja sin tarjeta asignada.
- Toda tarea debe tener evidencia.
- Si una tarea se bloquea, se comenta en la tarjeta.
- El líder revisa antes de pasar a `Done`.
- Los commits deben mencionar el ID de tarea cuando sea posible.

Ejemplo:

```bash
git checkout -b feature/cc-13-health-check
git add .
git commit -m "feat(CC-13): implementar endpoint de health check"
git push origin feature/cc-13-health-check
```

---

## 12. Entregables finales

- Diagrama de arquitectura cloud detallado.
- Repositorio GitHub actualizado.
- URL funcional del sistema desplegado.
- Bitácora de avances con tablero Scrum/Kanban.
- Presentación final: problemática, arquitectura propuesta, decisiones técnicas y demo.
