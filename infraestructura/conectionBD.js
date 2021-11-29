const mongoose = require('mongoose');

const urlBd = 'mongodb+srv://Edwin:foriti31@mintic.veyu4.mongodb.net/db_minticProyecto?retryWrites=true&w=majority';


mongoose.connect(urlBd);
const mongoBD = mongoose.connection;

mongoBD.on("open", _ =>{
    console.log("conectado a la BD")
})