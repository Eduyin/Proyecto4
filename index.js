require('./infraestructura/conectionBD');
const ProjectModel = require('./model/proyectoModel');
const express = require('express')

const api = express();


const projectInvestigacion = new ProjectModel({
    
    nombre: 'Agua potable',
    objetivos_generales : 'Estudio de aguas',
    objetivos_especificos : 'diagnostico, prubas, resultados',
    presupuesto : 70000000,
    fecha_inicio : 25/12/2021,
    fecha_terminacion : 25/03/2022,
    documento : '123456',
    lider : 'Juan',
    fase : 'inicio',
    facultad :'Ingenieria'

})

// projectInvestigacion.save((err,document)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
// })

const consultaProyectos = async () => {
    return await ProjectModel.find({})
    
}

const proyectosGuardados = consultaProyectos();

api.get('/proyectos',(request,response)=>{
    consultaProyectos().then(function(resultado){
        response.json({projects: resultado})
    })
    
})

api.listen('9092')

