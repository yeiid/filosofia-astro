// @ts-nocheck
import { supabase } from './lib/supabase';

// Rutas que requieren autenticación
const protectedRoutes = ['/perfil', '/foro'];

export async function onRequest({ request, redirect, url, cookies }, next) {
  // Solo aplicar a rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));
  if (!isProtectedRoute) {
    return next();
  }

  try {
    // Obtener el token de la cookie
    const accessToken = cookies.get('sb-access-token');
    const refreshToken = cookies.get('sb-refresh-token');

    if (!accessToken || !refreshToken) {
      // Redirigir a login con la URL de retorno
      const redirectUrl = new URL('/login', url.origin);
      redirectUrl.searchParams.set('redirectedFrom', url.pathname);
      return redirect(redirectUrl.toString());
    }

    // Configurar el token en el cliente de Supabase
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken.value,
      refresh_token: refreshToken.value
    });

    if (error || !session) {
      // Limpiar cookies inválidas
      cookies.delete('sb-access-token');
      cookies.delete('sb-refresh-token');
      
      const redirectUrl = new URL('/login', url.origin);
      redirectUrl.searchParams.set('redirectedFrom', url.pathname);
      return redirect(redirectUrl.toString());
    }

    // Actualizar tokens en las cookies si es necesario
    if (session.access_token !== accessToken.value) {
      cookies.set('sb-access-token', session.access_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        sameSite: 'lax',
        secure: url.protocol === 'https:'
      });
    }

    if (session.refresh_token !== refreshToken.value) {
      cookies.set('sb-refresh-token', session.refresh_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        httpOnly: true,
        sameSite: 'lax',
        secure: url.protocol === 'https:'
      });
    }

    // Continuar con la solicitud
    return next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    // Limpiar cookies en caso de error
    cookies.delete('sb-access-token');
    cookies.delete('sb-refresh-token');
    
    const redirectUrl = new URL('/login', url.origin);
    redirectUrl.searchParams.set('error', 'auth_error');
    return redirect(redirectUrl.toString());
  }
}

// Tipos para el contexto de Astro
declare module 'astro' {
  interface APIContext {
    cookies: {
      get: (key: string) => { value: string } | undefined;
      set: (key: string, value: string, options?: any) => void;
      delete: (key: string) => void;
    };
  }
}
