# POS System CC 2026

Sistema POS recibido para la evaluacion de Cloud Computing. Este README esta enfocado en levantar, configurar y desplegar la aplicacion sin tener que reconstruir el contexto original del proyecto.

La aplicacion esta separada en:

- `frontend/`: Next.js 14.
- `backend/`: API REST con Node.js, Express y JWT.
- `database/`: scripts SQL para schema, seed y usuarios iniciales.
- `infra/terraform/`: infraestructura base en Azure.
- `docker-compose.yml`: ejecucion local con contenedores.
- `docker-compose.prod.yml`: despliegue productivo con Docker Compose.
- `Jenkinsfile`: pipeline CI/CD para construir y desplegar.

## Resultado rapido

Para levantar todo localmente con Docker:

```bash
docker compose up -d --build
```

Luego abrir:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Health check: http://localhost:3001/health
- Readiness check: http://localhost:3001/ready
- Metricas: http://localhost:3001/metrics

Credenciales iniciales:

| Rol | Email | Password |
| --- | --- | --- |
| Administrador | `admin@pos.cl` | `admin123` |
| Cajero | `cajero@pos.cl` | `cajero123` |

## Requisitos

Para despliegue local:

- Docker
- Docker Compose

Para desarrollo manual:

- Node.js 20 recomendado
- npm
- PostgreSQL 14+

Para infraestructura:

- Terraform 1.6+
- Azure CLI autenticado
- Llave SSH publica para la VM

## Despliegue local con Docker Compose

El archivo `docker-compose.yml` levanta tres servicios:

- `postgres`: PostgreSQL 14 en el puerto local `5433`.
- `backend`: API en `http://localhost:3001`.
- `frontend`: Next.js en `http://localhost:3000`.

Ejecutar:

```bash
docker compose up -d --build
```

Ver estado:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

Detener:

```bash
docker compose down
```

Detener y borrar volumenes de base de datos y uploads:

```bash
docker compose down -v
```

Importante: al borrar volumenes se pierde la informacion de PostgreSQL y las imagenes subidas.

## Base de datos

En Docker, PostgreSQL se inicializa automaticamente con:

- `database/schema.sql`
- `database/seed.sql`

Los usuarios iniciales se crean con:

```bash
docker compose exec backend node ../database/create-admin.js
```

El script crea o actualiza:

- `admin@pos.cl` / `admin123`
- `cajero@pos.cl` / `cajero123`

## Variables de entorno

### Backend

Ejemplo disponible en:

```bash
backend/.env.example
```

Variables relevantes:

| Variable | Uso |
| --- | --- |
| `PORT` | Puerto de la API. Por defecto `3001`. |
| `NODE_ENV` | `development` o `production`. |
| `DB_HOST` | Host de PostgreSQL. En Compose: `postgres`. |
| `DB_PORT` | Puerto de PostgreSQL. En Compose interno: `5432`. |
| `DB_NAME` | Nombre de la base de datos. |
| `DB_USER` | Usuario de la base de datos. |
| `DB_PASSWORD` | Password de la base de datos. |
| `DB_SSL` | Usar SSL hacia PostgreSQL. |
| `JWT_SECRET` | Secreto para firmar tokens JWT. Debe cambiarse en produccion. |
| `JWT_EXPIRES_IN` | Duracion del token. |
| `FRONTEND_URL` | Origen permitido para CORS. |
| `STORAGE_DRIVER` | `local` o `s3`. |
| `UPLOAD_MAX_SIZE_MB` | Tamano maximo de imagenes. |
| `LOG_LEVEL` | Nivel de logs. |

### Frontend

Ejemplo disponible en:

```bash
frontend/.env.local.example
```

Variable principal:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Esta URL se usa en build time. Si cambia el dominio del backend, se debe reconstruir la imagen del frontend.

## Despliegue productivo con Docker Compose

El archivo `docker-compose.prod.yml` esta pensado para ejecutarse en un servidor Linux. A diferencia del Compose local:

- No expone PostgreSQL hacia fuera.
- Expone backend y frontend solo en `127.0.0.1`.
- Espera un proxy reverso externo para publicar HTTP/HTTPS.
- Usa variables desde `.env.production`.

Crear `.env.production` en la raiz del proyecto:

```bash
POSTGRES_PASSWORD=cambiar_password_postgres
JWT_SECRET=cambiar_por_un_secreto_largo_y_seguro
```

Construir imagenes:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml build
```

Levantar servicios:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

Crear usuarios iniciales:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml exec -T backend node ../database/create-admin.js
```

Validar:

```bash
curl -fsS http://127.0.0.1:3001/health
curl -fsS http://127.0.0.1:3001/ready
curl -fsSI http://127.0.0.1:3000
```

## Proxy reverso y dominio

En produccion, `docker-compose.prod.yml` deja los servicios escuchando solo localmente:

- Frontend: `127.0.0.1:3000`
- Backend: `127.0.0.1:3001`

Por eso se necesita un proxy reverso, por ejemplo Nginx o Caddy, que reciba trafico en `80/443` y lo envie a esos puertos internos.

El compose productivo actual esta configurado para el dominio:

```bash
https://pos.mundacasolutions.com
```

Si se usa otro dominio, ajustar:

- `FRONTEND_URL` en `docker-compose.prod.yml`.
- `NEXT_PUBLIC_API_URL` en los argumentos de build del frontend.
- El health check publico del `Jenkinsfile`, si se usa Jenkins.

## Jenkins

El `Jenkinsfile` ejecuta este flujo:

1. Checkout del repositorio.
2. Validacion de archivos requeridos.
3. Build de imagenes con `docker-compose.prod.yml`.
4. Deploy con `docker compose up -d --force-recreate`.
5. Creacion de usuarios iniciales.
6. Health checks locales y validacion del dominio publico.

Antes de usar Jenkins, asegurar que el agente tenga:

- Docker instalado.
- Docker Compose disponible.
- Acceso al repositorio.
- Archivo `.env.production` en el workspace o inyectado por Jenkins.
- Permisos para ejecutar contenedores.

Comandos equivalentes al pipeline:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml build --no-cache backend frontend
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --force-recreate
docker compose --env-file .env.production -f docker-compose.prod.yml exec -T backend node ../database/create-admin.js
```

## Terraform en Azure

La carpeta `infra/terraform/` crea una base de infraestructura en Azure:

- Resource Group.
- Virtual Network.
- Subnet.
- Public IP para VM.
- Network Security Group con `22`, `80` y `443`.
- VM Linux Ubuntu 22.04.
- Instalacion inicial de Docker en la VM.
- Load Balancer con reglas para `80` y `443`.

Ejecutar:

```bash
cd infra/terraform
terraform init
terraform plan
terraform apply
```

Variables principales:

| Variable | Default |
| --- | --- |
| `project_name` | `pos-system` |
| `resource_group_name` | `pos-system-rg` |
| `location` | `eastus2` |
| `vm_size` | `Standard_D2s_v3` |
| `admin_username` | `azureuser` |
| `ssh_public_key_path` | `C:/Users/EliteBook/.ssh/pos-system-azure.pub` |
| `ssh_source_address` | `*` |

Despues del `apply`, Terraform muestra outputs con IP publica y comando SSH.

Nota importante: el NSG abre `80` y `443`, no `3000` ni `3001`. Para acceso publico se debe publicar la app mediante proxy reverso en `80/443`.

## Despliegue manual en una VM

Flujo recomendado en una VM Ubuntu:

```bash
git clone <url-del-repositorio>
cd pos-system-cc-2026
```

Crear `.env.production`:

```bash
POSTGRES_PASSWORD=cambiar_password_postgres
JWT_SECRET=cambiar_por_un_secreto_largo_y_seguro
```

Levantar:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
docker compose --env-file .env.production -f docker-compose.prod.yml exec -T backend node ../database/create-admin.js
```

Validar localmente:

```bash
curl -fsS http://127.0.0.1:3001/ready
curl -fsSI http://127.0.0.1:3000
```

Configurar un proxy reverso para publicar la app en el dominio.

## Desarrollo sin Docker

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### PostgreSQL local

```bash
createdb pos_db
psql -d pos_db -f database/schema.sql
psql -d pos_db -f database/seed.sql
node database/create-admin.js
```

## Endpoints utiles

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| `GET` | `/health` | Liveness del backend. |
| `GET` | `/ready` | Readiness con verificacion de PostgreSQL. |
| `GET` | `/metrics` | Metricas Prometheus. |
| `POST` | `/api/auth/login` | Login. |
| `GET` | `/api/products` | Productos. |
| `GET` | `/api/categories` | Categorias. |
| `GET` | `/api/clients` | Clientes. |
| `GET` | `/api/sales` | Ventas. |
| `GET` | `/api/reports/summary` | Resumen dashboard. |
| `GET` | `/api/users` | Usuarios. |

## Persistencia

Docker usa volumenes nombrados:

- `postgres_data`: datos de PostgreSQL.
- `backend_uploads`: imagenes subidas por la API cuando `STORAGE_DRIVER=local`.

En despliegues con mas de una instancia, `STORAGE_DRIVER=local` no es recomendable. El backend soporta `STORAGE_DRIVER=s3`, usando:

```bash
STORAGE_DRIVER=s3
AWS_BUCKET_NAME=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

## Checklist de despliegue

- Cambiar `POSTGRES_PASSWORD`.
- Cambiar `JWT_SECRET`.
- Configurar dominio real en `FRONTEND_URL`.
- Configurar `NEXT_PUBLIC_API_URL` antes de construir el frontend.
- Usar HTTPS en produccion.
- Confirmar que `/health` y `/ready` respondan correctamente.
- Revisar logs de backend y frontend.
- Confirmar que los volumenes persisten entre reinicios.
- Configurar backup de PostgreSQL.
- Usar almacenamiento externo para imagenes si habra multiples instancias.

## Comandos de diagnostico

```bash
docker compose ps
docker compose logs --tail=80 backend
docker compose logs --tail=80 frontend
docker compose logs --tail=80 postgres
docker compose exec postgres psql -U postgres -d pos_db
curl -fsS http://localhost:3001/ready
```

## Observaciones del estado actual

- El proyecto ya trae health checks, readiness, logging con Pino, rate limit, Helmet y endpoint de metricas.
- El README anterior tenia secciones desactualizadas respecto al codigo actual.
- El despliegue productivo depende de un proxy reverso que no esta incluido en el repositorio.
- Terraform crea infraestructura base, pero no copia ni ejecuta automaticamente la aplicacion en la VM.
- Los archivos `terraform.tfstate` estan dentro del repo; en un entorno real deberian manejarse con backend remoto y no versionarse.
