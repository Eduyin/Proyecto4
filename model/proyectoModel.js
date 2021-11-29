const {Schema, model} = require('mongoose');

const project = new Schema({
    nombre: String,
    objetivos_generales : String,
    objetivos_especificos : String,
    presupuesto : Number,
    fecha_inicio : Date,
    fecha_terminacion : Date,
    documento : String,
    lider : String,
    fase : String,
    facultad : String
    
})

module.exports = model('Proyectos', project)