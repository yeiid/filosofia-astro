import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

// Rutas que requieren autenticación
const protectedRoutes = ['/perfil', '/foro'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  
  // Solo aplicar middleware a rutas protegidas
  if (!protectedRoutes.some(route => url.pathname.startsWith(route))) {
    return next();
  }

  // Obtener token de autenticación desde cookies o headers
  const authToken = request.headers.get('authorization')?.replace('Bearer ', '') ||
                   context.cookies.get('supabase-auth-token')?.value;

  if (!authToken) {
    // Redirigir a login si no hay token
    return Response.redirect(new URL('/login', url.origin));
  }

  try {
    // Verificar el token con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(authToken);
    
    if (error || !user) {
      // Token inválido, redirigir a login
      return Response.redirect(new URL('/login', url.origin));
    }

    // Usuario autenticado, continuar
    return next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    // En caso de error, redirigir a login
    return Response.redirect(new URL('/login', url.origin));
  }
});
