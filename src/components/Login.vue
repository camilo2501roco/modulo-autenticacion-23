<script setup>
import { ref } from 'vue';
import { auth } from '../store';

const email = ref('');
const password = ref('');
const error = ref('');
const failedAttempts = ref(0);
const isBlocked = ref(false);

const emit = defineEmits(['login-success', 'go-to-register']);

function handleLogin() {
  if (isBlocked.value) {
    error.value = 'Cuenta bloqueada temporalmente por múltiples intentos fallidos.';
    return;
  }

  // C1: Validar formato y dominio
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value) || !email.value.endsWith('@sanjose.edu.co')) {
    error.value = 'El correo debe ser válido y pertenecer al dominio @sanjose.edu.co';
    return;
  }

  try {
    auth.login(email.value, password.value);
    error.value = '';
    failedAttempts.value = 0;
    emit('login-success');
  } catch (e) {
    failedAttempts.value++;
    if (failedAttempts.value >= 3) {
      isBlocked.value = true;
      error.value = 'Cuenta bloqueada temporalmente por múltiples intentos fallidos.';
      // Bloqueo temporal de 30 segundos para la simulación
      setTimeout(() => {
        isBlocked.value = false;
        failedAttempts.value = 0;
        if (error.value === 'Cuenta bloqueada temporalmente por múltiples intentos fallidos.') {
          error.value = '';
        }
      }, 30000);
    } else {
      // C2: Mensaje de error genérico
      error.value = 'Usuario o contraseña incorrectos';
    }
  }
}
</script>

<template>
  <div class="card">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email Institucional:</label>
        <input v-model="email" type="email" required placeholder="docente@sanjose.edu.co" />
      </div>
      <div class="form-group">
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="isBlocked">Ingresar</button>
    </form>
    <p>
      ¿No tienes cuenta? 
      <a href="#" @click.prevent="$emit('go-to-register')">Regístrate aquí</a>
    </p>
    <p>
      <!-- C3: Recuperar contraseña -->
      <a href="#" @click.prevent>Recuperar contraseña</a>
    </p>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.error {
  color: red;
}
</style>
