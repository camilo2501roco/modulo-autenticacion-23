<script setup>
import { ref, computed } from 'vue';
import { store } from './store';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';

const showRegister = ref(false);

const isLoggedIn = computed(() => !!store.currentUser);
</script>

<template>
  <div>
    <Dashboard v-if="isLoggedIn" />
    <div v-else class="auth-container">
      <div v-if="!showRegister">
        <Login 
          @login-success="() => {}" 
          @go-to-register="showRegister = true" 
        />
      </div>
      <div v-else>
        <Register 
          @register-success="showRegister = false" 
          @go-to-login="showRegister = false" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 2rem;
}
</style>
