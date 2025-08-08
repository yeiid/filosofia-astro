import { supabase } from '../../../lib/supabase';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request, cookies, redirect }) => {
  // Cerrar sesión en Supabase
  const { error } = await supabase.auth.signOut();
  
  // Eliminar cookies de autenticación
  cookies.delete('sb-access-token', { path: '/' });
  cookies.delete('sb-refresh-token', { path: '/' });
  
  if (error) {
    return new Response(
      JSON.stringify({ error: 'Error al cerrar sesión' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Redirigir a la página de inicio
  return redirect('/');
};
