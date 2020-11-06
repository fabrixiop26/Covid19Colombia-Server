//Dependecies
const express = require("express");
//para parsear json y otros formatos en la reques
const bodyParser = require("body-parser");
//MongoDB
const mongoose = require("mongoose");
//para sobrescribir metodos
const methodOverride = require("method-override");
const cors = require("cors");
const PORT = 5000;
//File with DB URL
//const dbConfig = require("./database.config");
//Function to route all request made
const router = require("./routes/allRoutes");
//Express app
const app = express();
//not parse requests of content-type - application/x-www-form-urlencoded with qs library
app.use(bodyParser.urlencoded({extended: false}))
// parse requests of content-type - application/json
app.use(bodyParser.json());
//allows overrides http methods
app.use(methodOverride());

app.use(cors());

//Configure all routes with the express app
router(app);



//database and api conecctions
if(process.env.NODE_ENV == "production"){
    console.log("Estamos en heroku"); 
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Success when connecting to the database");
    })
    .catch(() => {
        console.error("Couldnt connect to the database. Exiting...");
        process.exit();
    })
    
    app.listen(process.env.PORT, () => {
    console.log("Listening in port: " + process.env.PORT);
});
}else{
    mongoose.connect("mongodb://localhost/covid", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Success when connecting to the database");
    })
    .catch(() => {
        console.error("Couldnt connect to the database. Exiting...");
        process.exit();
    })
    app.listen(PORT, () => {
        console.log("Listening in port: " + PORT);
    });
}
