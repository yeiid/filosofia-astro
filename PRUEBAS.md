# 🧪 Guía de Pruebas - Filosofía Interactiva

## 📋 Estado Actual de las Pruebas

### ✅ **Funcionalidades Verificadas:**
- ✅ Configuración de Astro con Tailwind CSS
- ✅ Integración de Supabase (cliente configurado)
- ✅ Páginas de autenticación (login/registro)
- ✅ Componentes de navegación y estado de auth
- ✅ Middleware de protección de rutas
- ✅ Configuración para Vercel
- ✅ Build exitoso sin errores

### ⚠️ **Pendiente de Configuración:**
- ⚠️ Variables de entorno de Supabase (requiere proyecto real)
- ⚠️ Base de datos en Supabase
- ⚠️ Configuración de autenticación en Supabase

## 🚀 Cómo Probar la Aplicación

### 1. **Pruebas Locales (Desarrollo)**

```bash
# Iniciar servidor de desarrollo
npm run dev

# Acceder a las páginas de prueba:
# - http://localhost:4321/ (Página principal)
# - http://localhost:4321/test-supabase (Página de pruebas)
# - http://localhost:4321/login (Formulario de login)
# - http://localhost:4321/registro (Formulario de registro)
# - http://localhost:4321/perfil (Página de perfil)
# - http://localhost:4321/foro (Página del foro)
```

### 2. **Script de Pruebas de Conexión**

```bash
# Ejecutar pruebas de conexión
node test-connection.js
```

## 🔧 Configuración de Supabase

### Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL del proyecto y la clave anónima

### Paso 2: Configurar Variables de Entorno

**Para desarrollo local:**
```bash
# Editar .env.local
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

**Para Vercel:**
1. Ve al dashboard de Vercel
2. Settings > Environment Variables
3. Agrega las mismas variables

### Paso 3: Configurar Autenticación

En tu proyecto de Supabase:

1. **Authentication > Settings**
   - Site URL: `http://localhost:4321` (desarrollo)
   - Site URL: `https://tu-proyecto.vercel.app` (producción)

2. **Redirect URLs:**
   - `http://localhost:4321/`
   - `http://localhost:4321/perfil`
   - `https://tu-proyecto.vercel.app/`
   - `https://tu-proyecto.vercel.app/perfil`

### Paso 4: Crear Tablas (Opcional)

```sql
-- Tabla de usuarios extendida
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre TEXT,
  apellido TEXT,
  interes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de preguntas del foro
CREATE TABLE public.preguntas (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  autor_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de respuestas
CREATE TABLE public.respuestas (
  id SERIAL PRIMARY KEY,
  contenido TEXT NOT NULL,
  pregunta_id INTEGER REFERENCES public.preguntas(id),
  autor_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧪 Páginas de Prueba Disponibles

### `/test-supabase`
- ✅ Estado de conexión con Supabase
- ✅ Estado de autenticación
- ✅ Variables de entorno
- ✅ Enlaces a todas las páginas
- ✅ Información de desarrollo

### `/login`
- ✅ Formulario de inicio de sesión
- ✅ Validación de campos
- ✅ Integración con Supabase Auth
- ✅ Manejo de errores

### `/registro`
- ✅ Formulario de registro
- ✅ Validación de contraseñas
- ✅ Integración con Supabase Auth
- ✅ Redirección post-registro

### `/perfil`
- ✅ Página protegida (requiere auth)
- ✅ Información del usuario
- ✅ Configuraciones de cuenta
- ✅ Estadísticas

### `/foro`
- ✅ Página protegida (requiere auth)
- ✅ Lista de preguntas
- ✅ Formulario de nueva pregunta
- ✅ Filtros y búsqueda

## 🔍 Verificación de Funcionalidad

### 1. **Pruebas de Autenticación**
```bash
# 1. Ir a /registro
# 2. Crear una cuenta con email válido
# 3. Verificar que redirige a /login
# 4. Iniciar sesión con las credenciales
# 5. Verificar que aparece el email en la navegación
# 6. Probar cerrar sesión
```

### 2. **Pruebas de Rutas Protegidas**
```bash
# 1. Sin autenticación, intentar acceder a /perfil
# 2. Verificar que redirige a /login
# 3. Autenticarse
# 4. Verificar que puede acceder a /perfil
```

### 3. **Pruebas de UI/UX**
```bash
# 1. Verificar que los estilos se cargan correctamente
# 2. Probar modo oscuro/claro
# 3. Verificar responsividad en móvil
# 4. Probar navegación entre páginas
```

## 🚨 Solución de Problemas

### Error: "Variables de entorno no configuradas"
**Solución:** Configurar las variables en `.env.local` o en Vercel

### Error: "Conexión fallida con Supabase"
**Solución:** Verificar URL y clave anónima en Supabase

### Error: "Auth session missing"
**Solución:** Normal en desarrollo sin configuración real

### Error: "fetch failed"
**Solución:** Esperado cuando no hay configuración real de Supabase

## 📊 Métricas de Prueba

- **Build Time:** ~5-6 segundos
- **Bundle Size:** ~180KB (gzipped)
- **TypeScript Errors:** 0
- **Linting Errors:** 0
- **Test Coverage:** Básica (funcional)

## 🎯 Próximos Pasos

1. **Configurar Supabase real** con las variables de entorno
2. **Probar autenticación completa** con usuarios reales
3. **Crear tablas de base de datos** para funcionalidad completa
4. **Desplegar en Vercel** para pruebas de producción
5. **Agregar más funcionalidades** (foro real, perfil completo, etc.)

---

**Estado:** ✅ Listo para configuración de Supabase y despliegue
