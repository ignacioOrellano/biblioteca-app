const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models/db');

// Importar las rutas
const indexRoutes = require('./routes/index');
const usuariosRoutes = require('./routes/usuarios');
const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');

// Configuracion del motor de plantillas - PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para obtener datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/libros', librosRoutes);
app.use('/prestamos', prestamosRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
