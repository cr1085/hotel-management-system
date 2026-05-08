# Hotel Management System

**Prueba Técnica - Hoteles Decameron Colombia**

Sistema de gestión hotelera desarrollado como prueba técnica para Hoteles Decameron de Colombia. Permite el registro de hoteles y la configuración de habitaciones con validación de reglas de negocio específicas.

## Descripción General

Aplicación web para administrar hoteles y sus configuraciones de habitaciones. El sistema consta de un backend API RESTful construido con Laravel y un frontend React con TypeScript, comunicándose a través de endpoints REST. Incluye validaciones de reglas de negocio para garantizar la integridad de los datos.

## Tecnologías Utilizadas

### Frontend
- React 19.2.5
- TypeScript ~6.0.2
- Vite 8.0.10
- TailwindCSS 4.2.4
- React Router DOM 7.15.0
- Axios 1.16.0
- ESLint + TypeScript ESLint

### Backend
- Laravel (versión no especificada en este frontend)
- PHP (requisito del backend)

### Base de Datos
- PostgreSQL 12+

## Funcionalidades Principales

1. **Gestión de Hoteles**
   - Creación de nuevos hoteles
   - Visualización de hoteles registrados
   - Consulta de información básica (NIT, total de habitaciones)

2. **Configuración de Habitaciones**
   - Adición de configuraciones de habitaciones por hotel
   - Selección de tipo de habitación (ESTANDAR, JUNIOR, SUITE)
   - Selección de tipo de acomodación (SENCILLA, DOBLE, TRIPLE, CUADRUPLE)
   - Definición de cantidad por configuración

3. **Validaciones de Negocio**
   - Restricción de acomodaciones según tipo de habitación
   - Prevención de hoteles duplicados
   - Límite de habitaciones por hotel
   - Configuraciones únicas por hotel

## Requisitos del Sistema

### Para Desarrollo
- Node.js 18+
- npm o yarn
- PostgreSQL 12 o superior
- PHP 8.0+ (para backend Laravel)
- Composer (para backend Laravel)

### Para Producción
- Servidor web con soporte HTTPS
- PostgreSQL 12+
- PHP 8.0+ con extensiones requeridas por Laravel
- Node.js 18+ (para build del frontend)

## Guía Paso a Paso de Instalación

### Paso 1: Preparar el Entorno

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga desde https://nodejs.org/
   - Verifica con: `node --version`

2. **PostgreSQL** (versión 12 o superior)
   - Descarga desde https://www.postgresql.org/download/
   - Durante la instalación, define una contraseña para el usuario `postgres`
   - Verifica con: `psql --version`

3. **Git** (para clonar el repositorio)
   - Descarga desde https://git-scm.com/downloads
   - Verifica con: `git --version`

### Paso 2: Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd hotel-management
```

El proyecto tiene la siguiente estructura:
```
hotel-management/
├── backend/          # API Laravel
├── frontend/         # Aplicación React
└── README.md
```

### Paso 3: Instalar el Backend (Laravel)

1. **Navegar al directorio del backend**:
```bash
cd backend
```

2. **Instalar dependencias de PHP**:
```bash
composer install
```

3. **Configurar el archivo de entorno**:
```bash
cp .env.example .env
```

4. **Generar la clave de aplicación**:
```bash
php artisan key:generate
```

5. **Configurar la base de datos**:
   Abre el archivo `.env` y modifica las siguientes variables:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=hotel_management
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_aquí
```

6. **Crear la base de datos**:
   - Abre PostgreSQL:
   ```bash
   psql -U postgres
   ```
   - Dentro de psql, ejecuta:
   ```sql
   CREATE DATABASE hotel_management;
   \q
   ```

7. **Ejecutar migraciones y seeders**:
```bash
php artisan migrate --seed
```

8. **Iniciar el servidor de desarrollo**:
```bash
php artisan serve
```

El backend estará disponible en: `http://localhost:8000`

### Paso 4: Instalar el Frontend (React + Vite)

1. **Navegar al directorio del frontend**:
```bash
cd ../frontend
```

2. **Instalar dependencias de Node.js**:
```bash
npm install
```

3. **Configurar la URL de la API**:

   El frontend consume el backend desde una variable de entorno. Crea el archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:8000/api
```

   > **Importante**: La ruta debe terminar en `/api` ya que Laravel usa ese prefijo.

4. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173` (o otro puerto que Vite asigne)

### Paso 5: Verificar la Instalación

1. Abre tu navegador y visita `http://localhost:5173`
2. Deberías ver "Hotel Management System"
3. Si hay errores, revisa:
   - Que el backend Laravel esté corriendo en `http://localhost:8000`
   - Que la base de datos PostgreSQL esté activa
   - Que las migraciones se hayan ejecutado correctamente

## Configuración de Variables de Entorno

### Backend (.env)
```env
APP_NAME=HotelManagement
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=hotel_management
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## Configuración de PostgreSQL

### Crear la Base de Datos

```bash
# Ingresar a PostgreSQL
sudo -u postgres psql

# O en Windows (si instalaste con XAMPP o similar)
psql -U postgres

# Crear base de datos
CREATE DATABASE hotel_management;

# Salir
\q
```

### Verificar Conexión

```bash
psql -U postgres -d hotel_management -h localhost
```

Si conecta correctamente, deberías ver el prompt de PostgreSQL.

## Migraciones y Seeders

### Migraciones (Backend)

El backend incluye migraciones para crear las tablas necesarias:

```bash
php artisan migrate
```

**Tablas creadas:**
- `hotels`: Almacena información de hoteles
- `rooms`: Configuraciones de habitaciones por hotel
- `room_types`: Catálogo de tipos de habitación (ESTANDAR, JUNIOR, SUITE)
- `accommodations`: Catálogo de tipos de acomodación (SENCILLA, DOBLE, TRIPLE, CUADRUPLE)
- `room_accommodation`: Relación many-to-many entre rooms y accommodations

### Seeders (Datos Iniciales)

Los seeders cargan los catálogos iniciales:

```bash
php artisan db:seed
```

Esto crea:
- 3 tipos de habitación (ESTANDAR, JUNIOR, SUITE)
- 4 tipos de acomodación (SENCILLA, DOBLE, TRIPLE, CUADRUPLE)

### Resetear la Base de Datos (Opcional)

Si necesitas empezar de cero:

```bash
php artisan migrate:fresh --seed
```

## Cómo Ejecutar el Backend

### Desarrollo (con servidor integrado)

```bash
cd backend
php artisan serve
```

El API estará disponible en:
- HTTP: `http://localhost:8000`
- API endpoints: `http://localhost:8000/api/hotels`, `http://localhost:8000/api/rooms`, etc.

### Producción (con servidor web)

1. Configurar Nginx o Apache:
   ```nginx
   location / {
       try_files $uri $uri/ /index.php?$query_string;
   }
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. Optimizar:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

4. Iniciar cola de trabajos (si se usa):
   ```bash
   php artisan queue:work
   ```

## Cómo Ejecutar el Frontend

### Desarrollo

```bash
cd frontend
npm install
npm run dev
```

Vite iniciará en `http://localhost:5173` con Hot Module Replacement (HMR).

### Comandos Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Previsualiza el build
- `npm run lint` - Ejecuta ESLint

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generan en `frontend/dist/`.

Para previsualizar el build:

```bash
npm run preview
```

## Configuración de la URL de la API

El frontend está configurado para consumir el backend a través de variables de entorno de Vite.

### Archivo de configuración

Crea `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

### Uso en el código

```typescript
import { api } from "../services/api";

// api ya está configurado con la URL base desde .env
const response = await api.get("/hotels");
```

### Cambiar a producción

Para desplegar en producción, cambia la variable:

```env
VITE_API_URL=https://tu-dominio.com/api
```

## Compatibilidad de Navegadores

El proyecto es compatible con:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Nota:** Se recomienda usar las últimas versiones estables de Chrome y Firefox para mejor experiencia.

## Diseño Responsive

El diseño utiliza TailwindCSS con breakpoints:

- **Mobile**: `< 768px` (1 columna)
- **Tablet**: `768px - 1024px` (2 columnas en grid)
- **Desktop**: `> 1024px` (2 columnas en grid de hoteles)

### Breakpoints utilizados

```css
/* Grid de formulario */
grid-cols-1 md:grid-cols-2  /* 1 columna en móvil, 2 en desktop */

/* Grid de hoteles */
grid-cols-1 lg:grid-cols-2  /* 1 columna en móvil/tablet, 2 en desktop */

/* Grid de controles de habitación */
grid md:grid-cols-3  /* 1 columna en móvil, 3 en desktop */
```

## Reglas de Negocio Implementadas

### 1. Restricción de Acomodaciones por Tipo de Habitación

El frontend valida en el UI las siguientes reglas:

| Tipo Habitación | Acomodaciones Permitidas |
|----------------|-------------------------|
| ESTANDAR       | SENCILLA, DOBLE         |
| JUNIOR         | TRIPLE, CUADRUPLE       |
| SUITE          | SENCILLA, DOBLE, TRIPLE |

**Implementación:**
- Los selects de acomodación se habilitan/deshabilitan según el tipo seleccionado
- El backend Laravel valida la regla en el server-side

### 2. Límite de Habitaciones por Hotel

No se puede superar el `total_rooms` definido en el hotel.

**Validación:**
- Frontend: Verifica antes de enviar
- Backend: Valida en el modelo o controlador

### 3. Hoteles Duplicados

No pueden existir dos hoteles con el mismo NIT.

**Validación:**
- Backend: Unique constraint en tabla `hotels`
- Frontend: Advertencia al usuario

### 4. Configuraciones Repetidas

No pueden existir dos configuraciones iguales (tipo + acomodación) para un mismo hotel.

**Validación:**
- Backend: Unique constraint compuesto
- Frontend: Deshabilita opciones ya configuradas

## Estructura del Proyecto

```
hotel-management/
│
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── HotelController.php
│   │   │   │   └── RoomController.php
│   │   │   └── Requests/
│   │   │       └── FormRequest validations
│   │   ├── Models/
│   │   │   ├── Hotel.php
│   │   │   ├── Room.php
│   │   │   ├── RoomType.php
│   │   │   └── Accommodation.php
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── .env.example
│   └── composer.json
│
├── frontend/                # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/
│   │   │   └── HotelsPage.tsx
│   │   ├── services/
│   │   │   └── api.ts       # Configuración de Axios
│   │   ├── types/
│   │   │   └── hotel.ts     # Tipos TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example
│
└── README.md               # Este archivo
```

## Instrucciones para Build de Producción

### Frontend

```bash
cd frontend

# Instalar dependencias (solo primera vez)
npm install

# Build optimizado
npm run build

# Los archivos estarán en frontend/dist/
```

### Backend

```bash
cd backend

# Optimizar configuración
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Crear enlace simbólico para storage (si usa)
php artisan storage:link
```

### Despliegue en Servidor

1. Subir archivos al servidor
2. Extraer frontend/dist/ en la carpeta pública del servidor web
3. Configurar el backend Laravel con variables de producción
4. Ejecutar migraciones en producción:
   ```bash
   php artisan migrate --force
   ```

## Instrucciones para Git

### Comandos Básicos

```bash
# Clonar el repositorio
git clone <URL>
cd hotel-management

# Crear una rama para tu trabajo
git checkout -b feature/nombre-feature

# Hacer commit
git add .
git commit -m "Descripción clara del cambio"

# Subir cambios
git push origin feature/nombre-feature
```

### Convenciones de Commits

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` formato (sin cambio de código)
- `refactor:` refactorización
- `test:` añadir tests
- `chore:` tareas de mantenimiento

Ejemplo:
```bash
git commit -m "feat: agregar validación de habitaciones máximas"
```

### Flujo de Trabajo Recomendado

1. Crear rama desde `main` o `develop`
2. Desarrollar la funcionalidad
3. Ejecutar tests y lint
4. Hacer commit descriptivo
5. Push y crear Pull Request
6. Esperar revisión

## Nota sobre Dump de PostgreSQL

Para facilitar la instalación en entornos de desarrollo, se incluye un dump de la base de datos con datos iniciales.

### Restaurar el Dump

```bash
# Restaurar desde archivo SQL
psql -U postgres -d hotel_management < database/dump.sql
```

### Crear un Dump Manual

```bash
# Exportar base de datos
pg_dump -U postgres hotel_management > backup.sql
```

El dump incluye:
- Estructura completa de tablas
- Datos de catálogos (tipos de habitación, acomodaciones)
- Relaciones y constraints

## Sección del Autor

**Desarrollado por:** [Cristian Cuadrado]
**Fecha:** Mayo 2026
**Versión:** 1.0.0

**Stack tecnológico:**
- React + TypeScript + Vite
- Laravel + PHP
- PostgreSQL
- TailwindCSS

**Empresa Cliente:** Hoteles Decameron Colombia

---

## Prueba rápida del sistema

1. Crear un hotel
2. Agregar habitaciones
3. Validar reglas de acomodación
4. Ver mensajes dinámicos

---

**Nota final:** Este proyecto sigue las mejores prácticas de desarrollo de software, incluyendo separación de responsabilidades, validaciones tanto en frontend como backend, y arquitectura limpia para facilitar el mantenimiento y escalabilidad.
