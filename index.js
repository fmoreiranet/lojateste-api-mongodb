const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Configure Express
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

//Rotas Express
app.get("/", (req, res) => {
    console.log(req);
    res.status(200).json({ message: "Bem vindo!" });
})

//Listen
app.listen(3000);