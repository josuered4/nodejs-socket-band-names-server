const { Console } = require("console");
const express = require("express"); //es como una importacion pero ya asignadola en una variable
const path = require("path");
require("dotenv").config(); //Configuracion del servidor 

//app de express
const app = express(); //se crea una aplicacion y se iniliza con express


//Node Server 
const server = require("http").createServer(app);//creamos un servidor para le socket
module.exports.io = require("socket.io")(server);//creamos una instancia de socket y le pasamos el serveridor 
require("./sockets/socket");


//Path publico 
const publicPath = path.resolve( __dirname, "public" ); //toma la direccion del proyecto ya sea dentro del servidor 

app.use(express.static(publicPath));//se implementa la configuracion del servidor 



//se le asgina un puerto al sercidor "app", y se llama el call back, en caso de que exista un error
server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log("servidor corriendo sobre el puerto: ", process.env.PORT);
});