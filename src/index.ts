import "./config/config";
import Server from "./server/server";
import MongoDB from "./database/mongodb";



const port = process.env.PORT;
const urlDB = process.env.URLDB;
const mongoDB = MongoDB.initMongoDB();
const express = Server.init(Number(port));


//SUBIMOS LA BASE DE DATOS DE MONGOBD
mongoDB.connect(urlDB);

//CARGAMOS LAS CONFIGURACIONES DE EXPRESS
express.start();


express.app.get("/", (req, res) => {
  res.json({ exito: true, msg : "Hola mundo" });
});



express.app.listen(port, () => {
  console.log("Corriendo en el puerto: " + port);
});
