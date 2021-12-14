const {Schema, model} = require('mongoose');

const project = new Schema({
    id: Number,
    nombre: String,
    objetivos_generales : String,
    objetivos_especificos : String,
    presupuesto : Number,
    fecha_inicio : Date,
    fecha_terminacion : Date,
    documento : String,
    lider : String,
    fase : String,
    facultad : String,
    Id_proyecto :String,
    estado_proyecto:String,
    avances: [
        {
        id_avance : String,
        fecha_avance : Date,
        descripcion : String,
        observaciones_lider : String, 
        }
    ],
    inscripciones:[
        {
            id_inscripcion : String,
            identificacion_estudiante:String,
            estado_inscripcion:String,
            fecha_ingreso:Date,
            fecha_egreso:Date,
        }
    ]

    
    

    
})



module.exports = model('Proyectos', project)