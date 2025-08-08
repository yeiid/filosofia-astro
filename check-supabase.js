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
console.log('URL:', process.env.PUBLIC_SUPABASE_URL);
console.log('Clave anónima:', process.env.PUBLIC_SUPABASE_ANON_KEY ? '***** (configurada)' : 'No configurada');

// Verificar si la URL parece ser una URL válida
try {
  const url = new URL(process.env.PUBLIC_SUPABASE_URL);
  console.log('\n🔗 La URL de Supabase parece ser válida');
  console.log('   - Protocolo:', url.protocol);
  console.log('   - Hostname:', url.hostname);
  
  // Intentar hacer un ping al host
  const dns = require('dns');
  dns.lookup(url.hostname, (err) => {
    if (err) {
      console.error('❌ No se pudo resolver el host:', url.hostname);
      console.error('   Verifica tu conexión a Internet o la URL proporcionada');
      process.exit(1);
    }
    
    console.log('✅ El host es accesible');
    console.log('\n🔒 Prueba de conexión básica completada');
    console.log('\n📝 Siguientes pasos:');
    console.log('1. Verifica que la URL y la clave anónima sean correctas');
    console.log('2. Asegúrate de que el proyecto Supabase esté en línea');
    console.log('3. Verifica que la política de CORS en Supabase incluya tu dominio');
  });
} catch (e) {
  console.error('❌ La URL de Supabase no es válida:', e.message);
  console.log('\nAsegúrate de que la URL tenga el formato: https://xxxxxxxxxxxxxxxxx.supabase.co');
  process.exit(1);
}
