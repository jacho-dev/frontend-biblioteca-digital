# Biblioteca Digital - Frontend

Aplicación web de biblioteca digital desarrollada con React que permite a los usuarios alquilar libros online.

## Características

### 🎯 Funcionalidades Principales
- **Catálogo de libros**: Navegación y búsqueda de libros
- **Sistema de autenticación**: Login para administradores y usuarios
- **Alquiler de libros**: Sistema completo de alquiler con fechas de devolución
- **Extensión de plazos**: Posibilidad de extender el período de alquiler
- **Búsqueda avanzada**: Búsqueda por título, autor, ISBN, categoría, idioma y descripción
- **Gestión de alquileres**: Visualización y gestión de libros alquilados

### 🛠️ Tecnologías Utilizadas
- **React 18**: Librería principal para la interfaz de usuario
- **React Router**: Navegación entre diferentes páginas
- **CSS3**: Estilos con metodología BEM
- **JavaScript ES6+**: Lógica de la aplicación

### 📋 Requisitos del Proyecto

#### ✅ Componentes Funcionales (10+)
1. **Header**: Navegación principal y autenticación
2. **BookCard**: Tarjeta individual de libro
3. **SearchBar**: Barra de búsqueda
4. **LoadingSpinner**: Indicador de carga
5. **Home**: Página principal
6. **Login**: Formulario de inicio de sesión
7. **Books**: Catálogo completo de libros
8. **MyRentals**: Gestión de alquileres del usuario
9. **AuthProvider**: Contexto de autenticación
10. **AuthContext**: Hook personalizado de autenticación

#### ✅ Hooks Implementados
- **useState**: Gestión de estado en múltiples componentes
- **useEffect**: Efectos secundarios y carga de datos
- **useContext**: Acceso al contexto de autenticación
- **useLocalStorage**: Custom hook para persistencia de datos

#### ✅ Rutas (React Router)
1. **/** - Página principal
2. **/login** - Inicio de sesión
3. **/books** - Catálogo de libros
4. **/my-rentals** - Mis alquileres

#### ✅ Metodología BEM
Todos los estilos CSS siguen la metodología BEM (Block, Element, Modifier):
- `.header` (Block)
- `.header__nav` (Element)
- `.header__link--active` (Modifier)

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.js
│   ├── BookCard.js
│   ├── SearchBar.js
│   └── LoadingSpinner.js
├── context/            # Contextos de React
│   └── AuthContext.js
├── hooks/              # Hooks personalizados
│   ├── useBooks.js
│   └── useLocalStorage.js
├── pages/              # Páginas principales
│   ├── Home.js
│   ├── Login.js
│   ├── Books.js
│   └── MyRentals.js
├── data/               # Datos de prueba
│   └── mockData.js
├── App.js              # Componente principal
├── index.js            # Punto de entrada
└── index.css           # Estilos globales
```

## 🚀 Instalación y Ejecución

1. **Instalar dependencias**:
```bash
npm install
```

2. **Iniciar aplicación**:
```bash
npm start
```

3. **Abrir en navegador**: http://localhost:3000

## 👤 Cuentas de Demostración

### Administrador
- **Usuario**: admin
- **Contraseña**: admin123

### Usuario
- **Usuario**: usuario
- **Contraseña**: usuario123

## 📚 Datos de Prueba

La aplicación incluye datos de prueba (mocks) con:
- **5 libros** con información completa (título, autor, ISBN, sinopsis, reseñas)
- **2 usuarios** (admin y usuario normal)
- **Alquileres de ejemplo**

## 🔍 Funcionalidades Detalladas

### Búsqueda de Libros
- Búsqueda en tiempo real
- Filtros por: título, autor, ISBN, categoría, idioma, descripción
- Resultados instantáneos

### Sistema de Alquiler
- Alquiler por 30 días por defecto
- Extensión de 15 días adicionales
- Control de libros ya alquilados
- Alertas de vencimiento

### Gestión de Alquileres
- Vista de todos los alquileres
- Filtros por estado (activos/devueltos)
- Devolución manual de libros
- Historial completo

## 🎨 Diseño y UX

- **Diseño responsive** para todos los dispositivos
- **Interfaz moderna** con transiciones suaves
- **Feedback visual** en todas las interacciones
- **Navegación intuitiva** con menú principal

## 📝 Notas Adicionales

- Los datos se almacenan localmente usando `localStorage`
- No se requiere backend para la funcionalidad básica
- La aplicación es totalmente funcional sin conexión a servidor
- Los estilos son modulares y siguen buenas prácticas

## 🚀 Mejoras Futuras

- Conexión con backend real
- Sistema de calificación de libros
- Recomendaciones personalizadas
- Notificaciones de vencimiento
- Categorías avanzadas
- Sistema de favoritos
