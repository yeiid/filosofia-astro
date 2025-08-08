// Script de prueba para verificar la conexión con Supabase
import { createClient } from '@supabase/supabase-js';

console.log('🔧 Iniciando pruebas de conexión con Supabase...\n');

// Verificar variables de entorno
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

console.log('📋 Variables de entorno:');
console.log(`  URL: ${supabaseUrl}`);
console.log(`  Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log('');

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para probar conexión
async function testConnection() {
  try {
    console.log('🔌 Probando conexión con Supabase...');
    
    // Intentar una consulta simple
    const { data: _data, error } = await supabase
      .from('_dummy_table')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Conexión exitosa (error esperado: tabla no existe)');
        console.log(`   Mensaje: ${error.message}`);
      } else {
        console.log('❌ Error de conexión:');
        console.log(`   Código: ${error.code}`);
        console.log(`   Mensaje: ${error.message}`);
      }
    } else {
      console.log('✅ Conexión exitosa');
    }
    
  } catch (error) {
    if (error instanceof Error) {
      console.log('❌ Error crítico de conexión:');
      console.log(`   ${error.message}`);
    } else {
      console.log('❌ Error crítico de conexión: Ocurrió un error desconocido.');
    }
  }
}

// Función para probar autenticación
async function testAuth() {
  try {
    console.log('\n🔐 Probando autenticación...');
    
    // Obtener sesión actual
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('❌ Error al obtener sesión:');
      console.log(`   ${sessionError.message}`);
    } else {
      if (session) {
        console.log('✅ Sesión activa encontrada');
        console.log(`   Usuario: ${session.user.email}`);
      } else {
        console.log('ℹ️ No hay sesión activa');
      }
    }
    
    // Obtener usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.log('❌ Error al obtener usuario:');
      console.log(`   ${userError.message}`);
    } else {
      if (user) {
        console.log('✅ Usuario autenticado:');
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
      } else {
        console.log('ℹ️ No hay usuario autenticado');
      }
    }
    
  } catch (error) {
    if (error instanceof Error) {
      console.log('❌ Error en pruebas de autenticación:');
      console.log(`   ${error.message}`);
    } else {
      console.log('❌ Error en pruebas de autenticación: Ocurrió un error desconocido.');
    }
  }
}

// Función para probar registro de usuario
async function testSignUp() {
  try {
    console.log('\n📝 Probando registro de usuario...');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    const { data: _data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    });
    
    if (error) {
      console.log('❌ Error en registro:');
      console.log(`   ${error.message}`);
    } else {
      console.log('✅ Registro exitoso (simulado)');
      console.log(`   Email: ${testEmail}`);
      console.log('   Nota: En desarrollo, esto puede fallar sin configuración real');
    }
    
  } catch (error) {
    if (error instanceof Error) {
      console.log('❌ Error crítico en registro:');
      console.log(`   ${error.message}`);
    } else {
      console.log('❌ Error crítico en registro: Ocurrió un error desconocido.');
    }
  }
}

// Ejecutar todas las pruebas
async function runAllTests() {
  await testConnection();
  await testAuth();
  await testSignUp();
  
  console.log('\n🎉 Pruebas completadas!');
  console.log('\n📝 Para probar la aplicación web:');
  console.log('   1. Abre http://localhost:4321 en tu navegador');
  console.log('   2. Ve a http://localhost:4321/test-supabase para más pruebas');
  console.log('   3. Revisa la consola del navegador para logs adicionales');
}

runAllTests();
