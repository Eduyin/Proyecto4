const {Schema, model} = require('mongoose');

const usuario = new Schema({
    id: Number,
    nombre: {
        type: String,
        required: true
    },
    identificacion : {
        type: Number,
        required: true
    },
    estado : {
        type: String,
        default:"inactivo"
    },
    contrasena : {
        type: String,
        required: true
    },
    correo : {
        type: String,
        required: true
    },
    tipo_usuario : {
        type: String,
        required: true
    }
    
    
})

module.exports = model('Usuarios', usuario)