# COMPETENCIA DE ROBOTS SUMO

Sistema completo para la gestión de competencias de robots sumo, con funcionalidades que permiten el registro, organización, control de rondas, puntos y clasificación automática de participantes.

## 📚 Descripción del Proyecto

Este sistema fue desarrollado como parte de una prueba técnica para la gestión completa de una competencia de robots sumo. Cuenta con dos componentes:

- **Frontend:** NextJS 15 + MUI
- **Backend:** NestJS 10 + TypeORM + PostgreSQL

![Vista previa](https://github.com/1Ever7/ProyectoAGETIC/blob/main/img/CRUD.png)


### Funcionalidades Principales

- Autenticación y autorización de usuarios
- CRUD de Participantes y Tutores
- Configuración de la competencia (clasificados, pistas)
- Generación automática de rondas y equipos (con restricciones)
- Inicio/Detención de competencia y rondas
- Registro de puntos por ronda y equipo
- Selección automática de clasificados por puntaje
- Consulta de resultados (público)
### Estructura de la base de datos
![Vista previa](https://github.com/1Ever7/ProyectoAGETIC/blob/main/img/base%20de%20datos1.png)

## 📊 Tecnologías Usadas

| Capa          | Tecnología        |
| ------------- | ----------------- |
| Backend       | NestJS, TypeORM   |
| Base de datos | PostgreSQL 16     |
| Frontend      | NextJS 15, MUI    |
| DevOps        | Docker, GitLab CI |

Logica de backen
![Vista previa](https://github.com/1Ever7/ProyectoAGETIC/blob/main/img/practicaAGETIC.png)

Logica de Frontend

![Vista previa](https://github.com/1Ever7/ProyectoAGETIC/blob/main/img/frontend13.png)



## Instalación Rápida

1. Clonar repositorio
2. Configurar variables de entorno `.env`
3. Ejecutar `docker-compose up -d` para levantar servicios
4. Acceder a `http://localhost:3000/api` para la API backend
5. Acceder a `http://localhost:4200` para la interfaz web

---

## Uso

- Regístrate o inicia sesión según tu rol
- Administra participantes, equipos y rondas desde el panel
- Visualiza resultados y clasificaciones en tiempo real
- Para pruebas y desarrollo, usa los comandos:

```bash
npm run start:dev  # Backend en modo desarrollo
npm run dev        # Frontend en modo desarrollo
