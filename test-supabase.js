// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Verificar que las variables de entorno estén definidas
const requiredEnvVars = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Faltan variables de entorno requeridas:', missingVars.join(', '));
  console.log('\nAsegúrate de que tu archivo .env contenga:');
  console.log('PUBLIC_SUPABASE_URL=tu_url_de_supabase');
  console.log('PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima');
  process.exit(1);
}

console.log('✅ Variables de entorno configuradas correctamente');
console.log('\n🔍 Verificando conexión con Supabase...');

// Importar y configurar el cliente de Supabase
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

// Realizar una consulta de prueba
async function testConnection() {
  try {
    // Intentar obtener información de la sesión actual (debería fallar sin autenticación)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      // Si hay un error pero es de autenticación, la conexión es exitosa
      if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
        console.log('✅ Conexión exitosa con Supabase');
        console.log('🔑 Clave API válida');
        console.log('📡 URL de Supabase:', process.env.PUBLIC_SUPABASE_URL);
        console.log('\n🔒 Prueba de conexión completada exitosamente');
        process.exit(0);
      }
      throw error;
    }
    
    console.log('✅ Conexión exitosa con Supabase');
    console.log('🔑 Clave API válida');
    console.log('👤 Sesión actual:', data.session ? 'Autenticado' : 'No autenticado');
    console.log('📡 URL de Supabase:', process.env.PUBLIC_SUPABASE_URL);
    
  } catch (error) {
    console.error('❌ Error al conectar con Supabase:');
    console.error(error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('\n🔍 No se pudo resolver el host. Verifica que la URL de Supabase sea correcta.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('\n🔌 No se pudo conectar al servidor. Verifica tu conexión a Internet.');
    } else if (error.message.includes('Invalid API key')) {
      console.error('\n🔑 Clave API inválida. Verifica que la clave anónima sea correcta.');
    }
    
    process.exit(1);
  }
}

testConnection();
