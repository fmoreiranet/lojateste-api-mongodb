const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

// import express from "express";
// import mongoose from "mongoose";

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
});
app.use(userRouter);

//Connect Data Base: MondoDB
const DB_USER = 'lojatestAdmin';
const DB_PASS = encodeURIComponent('ya09S5EMVSLHxQ4s');
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster-lojateste.wdjpjoi.mongodb.net/?retryWrites=true&w=majority`;
const uriLocal = "mongodb://127.0.0.1:27017/loja-teste?directConnection=true";

mongoose.set('strictQuery', false);
mongoose.connect(uriLocal)
    .then(res => {
        console.log("Conectado!");
        //Listen
        app.listen(3000);
    })
    .catch(err => {
        console.error("Error Connect: ", err);
    });