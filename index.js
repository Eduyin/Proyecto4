require('./infraestructura/conectionBD');
const Project = require('./model/proyectoModel');
const User = require('./model/usuarioModel');

const express = require('express')
const aes256 = require('aes256');



const {gql,ApolloServer} = require('apollo-server-express')

const typeDefs = gql`

scalar Date
type Usuario{
    nombre: String
    identificacion: Int
    estado: String
    correo: String
    
}

type Proyecto{
    _id: Int
    nombre: String
    objetivos_generales : String
    objetivos_especificos: String
    presupuesto:Int
    fecha_inicio: Date
    fecha_terminacion: Date
    documento: String
    lider: String
    fase: String
    facultad: String
    
    avances:[avances]
    inscripciones:[inscripciones]
    
    


}

type  avances  {
    id_avance : String
    fecha_avance : Date
    descripcion : String
    observaciones_lider : String 
}

type inscripciones{
    id_inscripcion : String
    identificacion_estudiante:String
    estado_inscripcion:String
    fecha_ingreso:Date
    fecha_egreso:Date
}

type Query{
        usuarios: [Usuario]
        usuario(identificacion: Int):Usuario
        proyectos:[Proyecto]
        getProject(nombre: String):Proyecto
        getProjectInscri(id_estudiante:String, estado_inscripcion:String):Proyecto
        
        
    }

input UserInput{
    nombre: String
    identificacion: Int
    contrasena: String
    tipo_usuario: String
    correo: String
}


type Mutation{
    createUser(user:UserInput):String
    activeUser(identificacion:Int):String
    updateUser(identificacion:Int, nombre:String, estado:String, Correo:String)
    updateInscripcionProyecto(nombre:String, id_inscripcion:String, identificacion_estudiante:String):String
    updateDescripcionAvance(nombre:String, id_avance:String, descripcion:String ):String
    updateNuevoAvance(nombre:String, id_avance:String, fecha_avance:Date, descripcion:String):String

}
`

const listUsuarios=[
    {
        nombre: 'Ramon',
        identificacion: 123456789,
        estado: 'activo',
        correo: 'abc123@gmail.com'

    },
    {
        nombre: 'Elias',
        identificacion: 4644619,
        estado: 'activo',
        correo: 'asdfsadf3@gmail.com'

    },
    
    {
        nombre: 'Ana',
        identificacion: 64313942,
        estado: 'activo',
        correo: 'rttyghd3@gmail.com'

    }

]

const key = 'clavedificil';

const resolvers ={
    Query:{
        usuarios:()=>listUsuarios,
        usuario:(parent, args, context, info)=> listUsuarios.find(user=> user.identificacion === args.identificacion),
        proyectos: async ()=>await Project.find({}),
        getProject:async(parent, args, context, info) => await Project.findOne({nombre:args.nombre}),
        

        
        
        
    },
    Mutation:{
        createUser: (parent,args,context, info)=>{
            const {contrasena} = args.user;
            // const {nombre, identificacion, contrasena, tipo_usuario, correo,avances} = args.user;
            
            
            //const buffer = Buffer.from(plaintext);
            const encryptedPlainText = aes256.encrypt(key, contrasena);
            nuevoUsuario.contrasena = encryptedPlainText
            return  nuevoUsuario.save()
                .then(u=>"usuario creado")
                .catch(err=>"fallo la creacion");

                    
                },

        activeUser: async (parent,args,context, info)=>{
            return User.updateOne({identificacion:args.identificacion},{estado:"activo"})
                .then(u=>"Usuario activado")
                .catch(err=>"Fallo activacion");
        },

        updateUser: async(parent, args, context, info) => {
            try {
                const user = await User.findOne({identificacion : args.identiicacion })
             await  User.updateOne({"identificacion": user.identificacion},{$set: {"nombre": args.user.nombre, "identificacion": args.user.identificacion, "estado": args.user.estado, "contrasena": args.user.contrasena, "correo":}})
            //     if (project.estado_proyecto == "Activo"){
            //     await Project.updateOne({ _id : project.id }, {  $set: {objetivos_generales: args.project.objetivos_generales,objetivos_especificos: args.project.objetivos_especificos,  presupuesto: args.project.presupuesto,nombre:args.project.nombre} })
            //     return "proyecto Actualizado "
            // }
            // else {
                return "descripcion avance actualizada " 
            // }
            } catch (error) {
                console.log(error)
            }
        },

        

        updateInscripcionProyecto: async(parent, args, context, info) => {
            try {
                const project = await Project.findOne({nombre : args.nombre })
             await  Project.updateOne({"nombre": project.nombre},{$push: {"inscripciones": {"id_inscripcion":args.id_inscripcion, "identificacion_estudiante":args.identificacion_estudiante, "estado_inscripcion":"Pendiente"}}})
            
                return "Inscripcion creada " 
            
            } catch (error) {
                console.log(error)
            }
        },

        updateNuevoAvance: async(parent, args, context, info) => {
            try {
                const project = await Project.findOne({nombre : args.nombre })
             await  Project.updateOne({"nombre": project.nombre},{$push: {"avances": {"id_avance":args.id_avance, "fecha_avance":args.fecha_avance, "descripcion":args.descripcion}}})
            
                return "Inscripcion creada " 
            
            } catch (error) {
                console.log(error)
            }
        },

        updateDescripcionAvance: async(parent, args, context, info) => {
            try {
                const project = await Project.findOne({nombre : args.nombre })
             await  Project.updateOne({"nombre": project.nombre},{$set: {"avances.$[avc].descripcion": args.descripcion}},{arrayFilters:[{"avc.id_avance": {$eq: (args.id_avance)}},]})
            //     if (project.estado_proyecto == "Activo"){
            //     await Project.updateOne({ _id : project.id }, {  $set: {objetivos_generales: args.project.objetivos_generales,objetivos_especificos: args.project.objetivos_especificos,  presupuesto: args.project.presupuesto,nombre:args.project.nombre} })
            //     return "proyecto Actualizado "
            // }
            // else {
                return "descripcion avance actualizada " 
            // }
            } catch (error) {
                console.log(error)
            }
        }



            }
        }

const api = express();


const iniciarServidor = async() => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs, 
            resolvers
        });
        await apollo.start()
        apollo.applyMiddleware({app:api})
        api.use((request, response)=>{
            response.send('hola')
        })

        api.listen('9091',()=>console.log('iniciabd'))
}
iniciarServidor()











// const projectInvestigacion = new ProjectModel({
    
//     nombre: 'Agua potable',
//     objetivos_generales : 'Estudio de aguas',
//     objetivos_especificos : 'diagnostico, prubas, resultados',
//     presupuesto : 70000000,
//     fecha_inicio : 25/12/2021,
//     fecha_terminacion : 25/03/2022,
//     documento : '123456',
//     lider : 'Juan',
//     fase : 'inicio',
//     facultad :'Ingenieria'

// })

// projectInvestigacion.save((err,document)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
// })

// const consultaProyectos = async () => {
//     return await ProjectModel.find({})
    
// }

// const proyectosGuardados = consultaProyectos();

// api.get('/proyectos',(request,response)=>{
//     consultaProyectos().then(function(resultado){
//         response.json({projects: resultado})
//     })
    
// })



