require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
require('./models/sync'); // Sincronizar explicitamente los modelos
const sequelize = require('./models/db');
const { getCurrentUser } = require('./middleware/auth');

// Importar las rutas
const indexRoutes = require('./routes/index');
const usuariosRoutes = require('./routes/usuarios');
const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');

// Configuracion del motor de plantillas - PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'biblioteca-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Cambiar a true en producción con HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Middleware para obtener datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para obtener usuario actual en todas las rutas
app.use(getCurrentUser);

// Rutas
app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/libros', librosRoutes);
app.use('/prestamos', prestamosRoutes);

// Inicio del servidor
const PORT = process.env.PORT;
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados');
    app.listen(PORT, '::', () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar modelos:', err);
  });
