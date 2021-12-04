require('./infraestructura/conectionBD');
const Project = require('./model/proyectoModel');
const User = require('./model/usuarioModel');
const express = require('express')
const aes256 = require('aes256');



const {gql,ApolloServer} = require('apollo-server-express')

const typeDefs = gql`
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
    presupuesto: Int
    fecha_inicio: String
    Fecha_terminacion: String
    documento: String
    lider: String
    fase: String
    facultad: String


}

type Query{
        usuarios: [Usuario]
        usuario(identificacion: Int):Usuario
        proyectos:[Proyecto]
        getProject(nombre: String):Proyecto
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
            // const {nombre, identificacion, contrasena, tipo_usuario, correo} = args.user;
            const nuevoUsuario = new User(args.user);
            
            //const buffer = Buffer.from(plaintext);
            const encryptedPlainText = aes256.encrypt(key, contrasena);
            nuevoUsuario.contrasena = encryptedPlainText
            return  nuevoUsuario.save()
                .then(u=>"usuario creado")
                .catch(err=>"fallo la creacion");

                    
                },

        activeUser: async (parent,args,context, info)=>{
            const resp = await User.updateOne({identificacion:args.identificacion},{estado:"activo"})
            console.log(resp);
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



