<script setup>
import { computed } from 'vue';
import { store, auth } from '../store';

const user = computed(() => store.currentUser);

function handleLogout() {
  auth.logout();
}
</script>

<template>
  <div class="dashboard-container">
    <nav>
      <h2>Colegio San José</h2>
      <button @click="handleLogout">Cerrar Sesión</button>
    </nav>
    
    <main v-if="user">
      <h1>Bienvenido, {{ user.name }}</h1>
      <p>Rol: <strong>{{ user.role }}</strong></p>
      
      <div class="stats-grid">
        <div class="card stat-card">
          <h3>Asistencia Hoy</h3>
          <p class="stat-value">95%</p>
        </div>
        <div class="card stat-card">
          <h3>Ausencias Críticas</h3>
          <p class="stat-value error">3</p>
        </div>
        <div class="card stat-card">
          <h3>Estudiantes</h3>
          <p class="stat-value">1,200</p>
        </div>
      </div>

      <div class="card schedule">
        <h3>Horario del Día</h3>
        <ul>
          <li>07:00 AM - Matemáticas (Grado 11)</li>
          <li>09:00 AM - Física (Grado 10)</li>
          <li>11:00 AM - Reunión de Coordinación</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f4f4f4;
  margin-bottom: 2rem;
  border-radius: 8px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat-card {
  text-align: center;
  background: #fff;
  color: #333;
}
.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}
.error {
  color: #d32f2f;
}
.schedule {
  text-align: left;
  background: #fff;
  color: #333;
}
</style>
