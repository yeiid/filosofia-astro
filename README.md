# Filosofía Interactiva

## 🚀 Despliegue en Vercel

### Configuración de Variables de Entorno

Para que la autenticación funcione correctamente en Vercel, necesitas configurar las siguientes variables de entorno en el dashboard de Vercel:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Ve a Settings > Environment Variables
3. Agrega las siguientes variables:

```
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase
```

### Configuración de Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a Settings > API
3. Copia la URL del proyecto y la clave anónima
4. Configura las variables en Vercel como se indicó arriba

### Configuración de Autenticación

En tu proyecto de Supabase:

1. Ve a Authentication > Settings
2. En **Site URL**, agrega tu dominio de Vercel: `https://tu-proyecto.vercel.app`
3. En **Redirect URLs**, agrega:
   - `https://tu-proyecto.vercel.app/`
   - `https://tu-proyecto.vercel.app/perfil`

### Comando de Despliegue

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Desplegar
vercel

# O conectar tu repositorio de GitHub a Vercel para despliegue automático
```

## 🔧 Desarrollo Local

### Configuración Inicial

Plataforma educativa interactiva sobre historia de la filosofía, construida con Astro y Supabase.

## 🚀 Tecnologías

- **Astro** - Framework web para sitios estáticos y dinámicos
- **Tailwind CSS** - Framework CSS utilitario
- **Supabase** - Backend como servicio (auth + database)
- **React** - Componentes interactivos
- **TypeScript** - Tipado estático
- **Vercel** - Deploy automático

## ✨ Funcionalidades

- **Línea de tiempo interactiva** - Explora la historia de la filosofía
- **Tarjetas educativas** - Información detallada sobre filósofos
- **Foro de preguntas** - Sistema de preguntas y respuestas autenticado
- **Registro e inicio de sesión** - Autenticación con Supabase
- **Perfil de usuario** - Gestión de cuenta y actividad
- **Diseño responsive** - Optimizado para móviles y desktop
- **Modo oscuro** - Soporte para tema oscuro

## 📁 Estructura del Proyecto

```
filosofia-astro/
├── src/
│   ├── components/
│   │   ├── Navigation.astro      # Navegación principal
│   │   └── PhilosopherCard.astro # Tarjeta de filósofo
│   ├── pages/
│   │   ├── index.astro          # Página principal
│   │   ├── login.astro          # Inicio de sesión
│   │   ├── registro.astro       # Registro de usuarios
│   │   ├── foro.astro           # Foro filosófico
│   │   └── perfil.astro         # Perfil de usuario
│   ├── lib/
│   │   └── supabase.ts          # Cliente Supabase
│   ├── data/
│   │   └── filosofia.json       # Datos de filósofos
│   ├── styles/
│   │   └── global.css           # Estilos globales
│   └── layouts/
│       └── Layout.astro         # Layout principal
├── public/                      # Archivos estáticos
├── .env.example                 # Variables de entorno (ejemplo)
├── astro.config.mjs            # Configuración de Astro
├── package.json                # Dependencias
└── README.md                   # Este archivo
```

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/filosofia-astro.git
   cd filosofia-astro
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus credenciales de Supabase:
   ```env
   PUBLIC_SUPABASE_URL=tu_supabase_url
   PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   ```
   http://localhost:4321
   ```

## 🗄️ Base de Datos (Supabase)

### Tablas necesarias:

#### `users` (extensión de auth.users)
```sql
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre TEXT,
  apellido TEXT,
  interes_filosofico TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `preguntas`
```sql
CREATE TABLE public.preguntas (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  categoria TEXT NOT NULL,
  etiquetas TEXT[],
  autor_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `respuestas`
```sql
CREATE TABLE public.respuestas (
  id SERIAL PRIMARY KEY,
  contenido TEXT NOT NULL,
  pregunta_id INTEGER REFERENCES public.preguntas(id) ON DELETE CASCADE,
  autor_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `votos`
```sql
CREATE TABLE public.votos (
  id SERIAL PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('pregunta', 'respuesta')),
  item_id INTEGER NOT NULL,
  usuario_id UUID REFERENCES auth.users(id),
  valor INTEGER NOT NULL CHECK (valor IN (1, -1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tipo, item_id, usuario_id)
);
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push

### Otros proveedores

El proyecto es compatible con cualquier proveedor que soporte Astro:
- Netlify
- Cloudflare Pages
- GitHub Pages

## 🎨 Personalización

### Colores y temas
Edita `src/styles/global.css` para personalizar:
- Colores principales
- Tipografía
- Espaciado
- Componentes personalizados

### Datos de filósofos
Modifica `src/data/filosofia.json` para:
- Agregar nuevos filósofos
- Actualizar información
- Cambiar épocas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Astro](https://astro.build/) - Framework web
- [Supabase](https://supabase.com/) - Backend como servicio
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- Comunidad filosófica por la inspiración

---

**Desarrollado con ❤️ para la comunidad filosófica**
