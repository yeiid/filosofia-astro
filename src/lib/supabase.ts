import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno de Supabase (PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY) no están configuradas. Asegúrate de crear un archivo .env y añadirlas.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funciones de autenticación
export const auth = {
  // Registrar usuario
  async signUp(email: string, password: string, userData?: { nombre?: string, apellido?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Iniciar sesión
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Obtener sesión actual
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// Tipos para TypeScript
// Representa el perfil completo de un usuario, combinando datos de auth.users y la tabla public.users
export interface User {
  id: string
  email?: string
  nombre?: string
  apellido?: string
  interes_filosofico?: string
  created_at: string
}

export interface Filosofo {
  id: number
  nombre: string
  epoca: string
  escuela: string
  biografia: string
  obras_principales: string[]
  imagen_url?: string
  fecha_nacimiento?: string
  fecha_muerte?: string
}

export interface Pregunta {
  id: number
  titulo: string
  contenido: string
  autor_id: string
  autor_nombre: string
  created_at: string
  respuestas_count: number
}

export interface Respuesta {
  id: number
  contenido: string
  autor_id: string
  autor_nombre: string
  pregunta_id: number
  created_at: string
}
