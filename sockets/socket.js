const {io} = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");
//esto es una importacion con nombre 


const bands = new Bands();//una instancia de bandas

bands.addBand(new Band("Los perdido de sinaloa"));
bands.addBand(new Band("Miguel y Miguel"));
bands.addBand(new Band("Virlan Garcia "));
//bands.addBand(new Band());

console.log(bands);



//Mensajes por sockets
io.on("connection", client=>{ //client representa la informacion del un cliente 
    console.log("cliente conectado");

    client.emit("active-bands", bands.getBands());//funcion que retornara todas las bandas activas 


    //es el callback a disparar cuando se desconecte un cliente 
    client.on("disconnect", ()=>{
        console.log("Cliente desconectado");
    });

    client.on("mensaje", (payload)=>{
        console.log("Nuevo mensaje: ", payload);

        //client.emit //emite un mensaje de regreso al un solo cliente
        //con io manda un mensaje a todos
        io.emit("mensaje", {
            admin: "nuevo mensaje"
        });
    });

    client.on("emitir-mensaje", (payload)=>{
        console.log(payload);
        //io.emit("nuevo-mensaje", payload); //emite a todos lo clientes conectados 
        client.broadcast.emit("nuevo-mensaje", payload); //emite a todos con excepcion a quien lo envio 
    });

    client.on("vote-band", (payload)=>{
        bands.voteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });

    client.on("add-band", (payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete-band", (payload)=>{
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });
});
