# Módulo de Autenticación y Gestión - Colegio San José (Equipo 23)

## Objetivo del Proyecto

Digitalizar el proceso manual de control de asistencia del Colegio San José (1.200 estudiantes). B
uscamos eliminar el uso de planillas físicas, reducir errores humanos y permitir que la coordinación académica acceda a alertas de ausentismo en tiempo real para prevenir la deserción escolar.

## Historias de Usuario (HUS)

Basadas en el estándar: _Como [rol] quiero [funcionalidad] para [beneficio]._

1. **HUS-01: Autenticación de Usuarios (Login)**
   - Ingreso seguro para docentes y administrativos con correo institucional.
2. **HUS-02: Registro de Nuevos Usuarios**
   - Creación de perfiles con validación de seguridad y asignación de grupos.
3. **HUS-03: Visualización de Dashboard Principal**
   - Tablero con horarios del día, gráficos de asistencia y alertas críticas.

## Gestión del Proyecto (GitHub Projects)

La planeación estratégica, asignación de responsables y seguimiento de tareas se encuentra en:
https://github.com/users/camilo2501roco/projects/3

## Integrantes y Roles

- **Camilo2501roco]**: Líder Técnico / Administrador del Proyecto.
- **Santimanci**: Backend Developer / Seguridad y DB.
- **Miguel Duran**: Frontend Developer / UI & Dashboard.

## Implementación de Clean Code

Este proyecto se desarrolla bajo estándares de calidad:

- **Responsabilidad Única (SRP)**: Funciones específicas para cada validación.
- **Nomenclatura Semántica**: Uso de nombres descriptivos.
- **Modularización**: Estructura de carpetas organizada por componentes.

_Caso de Estudio: Digitalización del Control de Asistencia "San José"_

El Colegio San José cuenta con 1.200 estudiantes y 60 docentes. Actualmente, la toma de asistencia se realiza de forma manual en planillas de papel que cada profesor carga durante la jornada. Al finalizar la semana, un auxiliar administrativo debe digitar cada una de estas fallas en un archivo Excel maestro.

El proceso actual presenta los siguientes puntos críticos:

Falta de tiempo real: Los padres de familia solo se enteran de las ausencias en el reporte mensual, lo que impide una reacción temprana ante la deserción o el ausentismo.

Error Humano: Las planillas suelen dañarse, perderse o presentar tachaduras que dificultan la digitalización.

Carga Administrativa: El auxiliar administrativo dedica el 30% de su jornada laboral únicamente a transcribir datos de asistencia.

Debemos diseñar un módulo que permita a los docentes registrar la asistencia en menos de 2 minutos desde cualquier dispositivo (móvil o PC), garantizando que la información esté disponible inmediatamente para la coordinación académica.

_HUS-01: Autenticación de Usuarios (Login)_
_Como:_ Usuario del sistema (Docente o Administrativo).
_Quiero:_ Ingresar mis credenciales (correo institucional y contraseña).
_Para:_ Acceder de forma segura a las funciones de registro de asistencia y gestión académica.

_Criterios de Aceptación:_

C1: El sistema debe validar que el correo electrónico tenga un formato válido y pertenezca al dominio del colegio.

C2: Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error genérico: "Usuario o contraseña incorrectos", para evitar exposición de datos.

C3: El sistema debe permitir la recuperación de contraseña mediante un enlace enviado al correo electrónico registrado.

C4: Tras tres intentos fallidos, el sistema debe bloquear la cuenta temporalmente por 15 minutos por motivos de seguridad.

_HUS-02: Registro de Nuevos Usuarios_
_Como:_ Administrador del sistema.
_Quiero:_ Registrar a los nuevos docentes y personal administrativo en la plataforma.
_Para:_ Habilitar sus permisos de acceso y asignarles los grupos de estudiantes correspondientes.

_Criterios de Aceptación:_

C1: El formulario de registro debe capturar: Nombre completo, Documento de identidad, Correo institucional, Rol (Docente/Admin) y Contraseña.

C2: La contraseña debe cumplir con políticas de seguridad: mínimo 8 caracteres, una mayúscula, un número y un carácter especial.

C3: El sistema debe verificar que el correo electrónico o el documento de identidad no existan previamente en la base de datos.

C4: Al finalizar el registro, el sistema debe enviar un correo de bienvenida automático con las instrucciones iniciales de uso.
_HUS-03: Visualización de Dashboard Principal_
_Como:_ Docente autenticado.
_Quiero:_ Visualizar un tablero de control (Dashboard) inmediatamente después de iniciar sesión.
_Para:_ Tener una vista rápida de mis clases del día y el estado general de asistencia de mis grupos.

_Criterios de Aceptación:_

C1: El Dashboard debe mostrar el horario del docente para el día actual, destacando la clase que está en curso o la próxima a iniciar.

C2: Debe incluir un gráfico o indicador visual con el porcentaje de asistencia acumulado de la semana para sus grupos asignados.

C3: Debe presentar una sección de "Alertas Críticas" para estudiantes que sumen más de 3 fallas consecutivas sin justificar.

C4: Debe incluir un botón de acceso rápido ("Acceso Directo") para iniciar la toma de asistencia de la clase actual en un solo clic.
