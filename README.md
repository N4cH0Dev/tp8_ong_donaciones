TP 8 – Fullstack (Node.js + MySQL + React + Zustand + Bootstrap)

Este proyecto implementa un sistema completo para gestionar donaciones en una organización sin fines de lucro.
Permite registrar donantes, productos, comedores, donaciones y entregas, así como consultar el historial de movimientos por donante o por comedor.

El desarrollo se realizó con arquitectura fullstack utilizando Node.js + Express + MySQL para el backend y React + Zustand + React Router + Bootstrap para el frontend.

📂 Contenidos

Descripción del proyecto

Funcionalidades

Tecnologías usadas

Arquitectura General

Modelo de Base de Datos

Instalación y Ejecución

Backend

Frontend

Endpoints del Backend

Screenshots (Opcional)

Conclusiones del Trabajo Práctico

📝 Descripción del proyecto

Una ONG recibe productos donados de distintas personas y organizaciones, y luego distribuye estos productos a comedores o beneficiarios. El sistema permite registrar:

Donantes

Productos

Donaciones (entrada de stock)

Comedores

Entregas a comedores (salida de stock)

Historial de movimientos

Está diseñado para permitir trazabilidad, futuras integraciones como envío de correos y expansión a módulos adicionales.

✔️ Funcionalidades
🔹 Backend (Node.js + Express + MySQL)

Registrar donantes

Registrar comedores

Registrar productos y su stock

Registrar donaciones (entrada de productos)

Registrar entregas (salida de productos)

Consultar historial por donante

Consultar historial por comedor

Descontar stock automáticamente

Relación 1-N y N-1 entre datos

🔹 Frontend (React)

Interfaz moderna con Bootstrap

Navegación con React Router

Estado global con Zustand

Listado y formularios para cada entidad:

Donantes

Comedores

Productos

Donaciones

Entregas

Historial

Dashboard simple y responsive

Consumo de API con Axios

🛠 Tecnologías usadas
Backend

Node.js

Express.js

MySQL2

CORS

Nodemon (dev)

Frontend

React 18

Zustand

React Router DOM

Axios

Bootstrap 5

Vite

🏗 Arquitectura General
tp8_donaciones/
│
├── tp8_ong_donaciones_back/ → Backend Node.js
│ ├── index.js → Servidor Express
│ ├── db.js → Conexión MySQL
│ ├── routes/ → Rutas (si se separan)
│ └── package.json
│
└── tp8_ong_donaciones_front/ → Frontend React
├── src/
│ ├── pages/ → Vistas
│ ├── store/ → Zustand Global Store
│ ├── services/ → Axios API client
│ └── App.jsx → Router + Layout
└── package.json

🗄 Modelo de Base de Datos
Tablas incluidas:
donantes
id (PK)
nombre
email
telefono

comedores
id (PK)
nombre
direccion

productos
id (PK)
nombre
tipo
stock

donaciones
id (PK)
donante_id (FK)
producto_id (FK)
cantidad
fecha

entregas
id (PK)
comedor_id (FK)
fecha

entrega_detalle
id (PK)
entrega_id (FK)
producto_id (FK)
cantidad

▶️ Instalación y Ejecución
🚀 Backend

1. Ir a la carpeta del backend
   cd tp8_ong_donaciones_back

2. Instalar dependencias
   npm install

3. Crear base de datos

En MySQL:

CREATE DATABASE IF NOT EXISTS ong_donaciones;

Luego ejecutar todas las tablas provistas en este README.

4. Configurar conexión MySQL en db.js
   const pool = mysql.createPool({
   host: "localhost",
   user: "root",
   password: "",
   database: "ong_donaciones"
   });

5. Levantar servidor
   npm run dev

Servidor disponible en:

👉 http://localhost:3002

🎨 Frontend

1. Ir a la carpeta del frontend
   cd tp8_ong_donaciones_front

2. Instalar dependencias
   npm install

3. Iniciar app
   npm run dev

Frontend disponible en:

👉 http://localhost:5173

🔗 Endpoints del Backend
Donantes
Método Ruta Descripción
GET /donantes Listar donantes
POST /donantes Crear donante
Comedores

| GET | /comedores | Listar comedores |
| POST | /comedores | Crear comedor |

Productos

| GET | /productos | Listar productos |
| POST | /productos | Crear producto |

Donaciones

| GET | /donaciones | Historial |
| POST | /donaciones | Registrar donación |

Entregas

| GET | /entregas | Listar entregas |
| POST | /entregas | Registrar entrega |

Historial

| GET | /historial/donante/:id | Movimientos de un donante |
| GET | /historial/comedor/:id | Movimientos de un comedor |

📌 Conclusiones del Trabajo Práctico

✔ Se aplicó arquitectura fullstack real
✔ Se integró React con un backend propio
✔ Se usó estado global con Zustand
✔ Se manejaron relaciones 1-N y N-1 en MySQL
✔ Se construyó un sistema real, escalable y preparado para futuras integraciones

Este TP demuestra dominio en:

Backend REST

CRUD completos

Conexión con base de datos

Frontend React organizado

Gestión de estado global

Estilos responsive con Bootstrap
