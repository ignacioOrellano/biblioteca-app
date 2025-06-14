const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');

class Usuario extends Model { 
  // Método para verificar contraseña
  async validarPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Método para verificar si es administrador
  esAdmin() {
    return this.rol === 'admin';
  }

  // Método para verificar si es usuario normal
  esUsuario() {
    return this.rol === 'usuario';
  }
}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    rol: {
      type: DataTypes.ENUM('admin', 'usuario'),
      allowNull: false,
      defaultValue: 'usuario'
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.password) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    }
  }
}
);

module.exports = Usuario;
