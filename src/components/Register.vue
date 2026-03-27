<script setup>
import { ref } from 'vue';
import { auth } from '../store';

const name = ref('');
const documento = ref('');
const email = ref('');
const password = ref('');
const role = ref('docente');
const error = ref('');
const showPasswordHint = ref(false);

const emit = defineEmits(['register-success', 'go-to-login']);

function handleRegister() {
  try {
    // C1 (Validación): Capturar todos los campos requeridos
    auth.register(name.value, documento.value, email.value, password.value, role.value);
    error.value = '';
    // C4 (UX): Confirmación de registro (correo se envía en background)
    alert('Usuario registrado con éxito. Se ha enviado un correo de bienvenida a ' + email.value);
    emit('register-success');
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<template>
  <div class="card">
    <h2>Registro de Usuarios</h2>
    <form @submit.prevent="handleRegister">
      <!-- C1 (Validación): Nombre Completo -->
      <div class="form-group">
        <label>Nombre Completo:</label>
        <input v-model="name" type="text" required placeholder="Juan Pérez" />
      </div>
      <!-- C1 (Validación): Documento de Identidad -->
      <div class="form-group">
        <label>Documento de Identidad:</label>
        <input v-model="documento" type="text" required placeholder="123456789" />
      </div>
      <div class="form-group">
        <label>Correo Institucional:</label>
        <input v-model="email" type="email" required placeholder="docente@sanjose.edu.co" />
      </div>
      <!-- C2 (Seguridad): Contraseña con requisitos -->
      <div class="form-group">
        <label>Contraseña:</label>
        <input
          v-model="password"
          type="password"
          required
          @focus="showPasswordHint = true"
          @blur="showPasswordHint = false"
        />
        <small v-if="showPasswordHint" class="password-hint">
          Mínimo 8 caracteres, una mayúscula, un número y un carácter especial
        </small>
      </div>
      <div class="form-group">
        <label>Rol:</label>
        <select v-model="role">
          <option value="docente">Docente</option>
          <option value="administrativo">Administrativo</option>
        </select>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Registrarse</button>
    </form>
    <p>
      ¿Ya tienes cuenta?
      <a href="#" @click.prevent="$emit('go-to-login')">Inicia sesión</a>
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
input, select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.error {
  color: red;
}
.password-hint {
  color: #666;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}
</style>
