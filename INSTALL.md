# Instalación y Configuración del Proyecto "Competencia Robot Sumo"

Este documento describe los pasos para instalar y configurar el proyecto "Competencia Robot Sumo" en un entorno local o servidor.

---

## Requisitos Previos

- **Node.js** versión 18 o superior
- **npm** o **yarn**
- **Docker** y **Docker Compose** (opcional pero recomendado)
- **PostgreSQL** (si no usas Docker)
- Acceso a terminal o consola

---

## Pasos para la Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL-del-repositorio>
cd competenciarobot
2. Configurar Variables de Entorno
Copia el archivo de ejemplo .env.example y configura las variables necesarias (bases de datos, JWT secret, puertos, etc):

bash
Copiar
Editar
cp .env.example .env
Edita .env con tus datos locales.

3. Instalación de Dependencias
Para backend:

bash
Copiar
Editar
cd competenciarobot
npm install
Para frontend:

bash
Copiar
Editar
cd ../competenciarobot-frontend
npm install
4. Configurar y Levantar Base de Datos
Opción A: Usar Docker Compose

Si tienes Docker instalado, puedes iniciar la base de datos y servicios con:

bash
Copiar
Editar
docker-compose up -d
Esto levantará los contenedores configurados en docker-compose.yml (PostgreSQL, backend y frontend).

Opción B: Base de Datos Manual

Instala PostgreSQL localmente.

Crea la base de datos.

Aplica las migraciones manualmente (si aplica).

5. Ejecutar Migraciones y Seeders (si aplica)
bash
Copiar
Editar
npm run typeorm:migration:run
npm run seed
6. Levantar Aplicaciones
Para el backend:

bash
Copiar
Editar
npm run start:dev
Para el frontend:

bash
Copiar
Editar
npm run dev
Verificación
Backend escuchando en http://localhost:3000

Frontend en http://localhost:4200 (o puerto configurado)

Acceder a la documentación Swagger (si implementada) en http://localhost:3000/api