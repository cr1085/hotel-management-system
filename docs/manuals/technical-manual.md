# Manual Técnico

## Descripción General

El sistema fue desarrollado como solución para la prueba técnica de Hoteles Decameron de Colombia.

La aplicación permite:
- Registrar hoteles
- Configurar habitaciones
- Validar reglas de negocio relacionadas con acomodaciones

La arquitectura implementada es desacoplada, utilizando:
- Backend REST API con Laravel
- Frontend SPA con React y TypeScript
- PostgreSQL como motor de base de datos

---

# Arquitectura del Sistema

El proyecto está dividido en dos partes principales:

## Backend
Tecnologías:
- Laravel
- PHP
- PostgreSQL

Responsabilidades:
- Exponer API RESTful
- Validar reglas de negocio
- Gestionar persistencia de datos

## Frontend
Tecnologías:
- React
- TypeScript
- Vite
- TailwindCSS

Responsabilidades:
- Interfaz de usuario
- Consumo de API REST
- Validaciones visuales
- Experiencia responsive

---

# Base de Datos

El sistema utiliza PostgreSQL.

Tablas principales:
- hotels
- hotel_rooms
- room_types
- accommodations

---

# Reglas de Negocio Implementadas

## Tipos de Habitación

### ESTANDAR
Permite:
- SENCILLA
- DOBLE

### JUNIOR
Permite:
- TRIPLE
- CUADRUPLE

### SUITE
Permite:
- SENCILLA
- DOBLE
- TRIPLE

---

# Validaciones Implementadas

- No permitir hoteles duplicados
- No permitir configuraciones repetidas
- Validar límite máximo de habitaciones
- Validar acomodaciones permitidas

---

# Instalación del Proyecto

Consultar README.md para instrucciones completas de instalación y despliegue.

---

# Estructura General

```txt
backend/
frontend/
docs/