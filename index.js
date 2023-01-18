const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const auth = require('./services/auth');

const userRoutes = require('./routes/userRoutes.js');

const app = express();

//Configure Express
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cors());

//Rotas Express
app.get("/", (req, res) => {
    console.log(req);
    res.status(200).json({ message: "Bem vindo!" });
});
app.use(userRoutes);



//Connect Data Base: MondoDB
// const DB_USER = process.env.DB_USER;
// const DB_PASS = encodeURIComponent(process.env.DB_PASS);
// const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster-lojateste.ujwalmk.mongodb.net/?retryWrites=true&w=majority`;

const uri = process.env.DB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(uri)
    .then(res => {
        console.log("Conectado!");
        //Listen
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.error("Error Connect: ", err);
    });

