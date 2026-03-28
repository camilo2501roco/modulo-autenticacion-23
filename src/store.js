import { reactive } from 'vue';

const STORE_KEY = 'colegio_auth_store';

// Estado inicial recuperado de localStorage o valores por defecto
const savedState = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');

export const store = reactive(savedState || {
  users: [],
  currentUser: null
});

// Función auxiliar para persistir
function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

// SRP: Función independiente para validación de contraseña
// C2 (Seguridad): Mín. 8 caracteres, mayúscula, número, carácter especial
function validarContrasena(password) {
  if (password.length < 8) {
    return 'La contraseña debe tener mínimo 8 caracteres';
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe tener al menos una letra mayúscula';
  }
  if (!/\d/.test(password)) {
    return 'La contraseña debe tener al menos un número';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'La contraseña debe tener al menos un carácter especial';
  }
  return null; // Válida
}

// SRP: Simular envío de correo de bienvenida
// C4 (UX): Enviar correo de bienvenida automático
function enviarCorreoBienvenida(email, nombre, rol) {
  // Simulación de envío de correo
  console.log('=== CORREO DE BIENVENIDA ===');
  console.log(`Para: ${email}`);
  console.log(`Asunto: Bienvenido al Sistema de Gestión - Colegio San José`);
  console.log(`Hola ${nombre},\nTu cuenta como ${rol} ha sido creada exitosamente.`);
  console.log('=============================');
  return true;
}

export const auth = {
  register(name, documento, email, password, role) {
    // C3 (Integridad): Verificar que el correo no exista
    if (store.users.find(u => u.email === email)) {
      throw new Error('El correo ya está registrado en el sistema');
    }
    // C3 (Integridad): Verificar que el documento no exista
    if (store.users.find(u => u.documento === documento)) {
      throw new Error('El documento de identidad ya está registrado en el sistema');
    }
    // C2 (Seguridad): Validar contraseña
    const errorContrasena = validarContrasena(password);
    if (errorContrasena) {
      throw new Error(errorContrasena);
    }

    const newUser = { name, documento, email, password, role, id: Date.now() };
    store.users.push(newUser);
    save();

    // C4 (UX): Enviar correo de bienvenida
    enviarCorreoBienvenida(email, name, role);

    return newUser;
  },

  login(email, password) {
    const user = store.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    store.currentUser = user;
    save();
    return user;
  },

  logout() {
    store.currentUser = null;
    save();
  },

  isAuthenticated() {
    return !!store.currentUser;
  }
};
