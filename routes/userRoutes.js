// const express = require('express');
// const router = express.Router();

const router = require('express').Router();
const User = require('../models/User');

// Create
router.post("/user", async (req, res) => {
    try {
        const newUser = monteUser(req);
        validUser(newUser);
        await verifyUserEmail(newUser.email);
        let result = await User.create(newUser);
        if (result.id) {
            res.status(200).json({ message: "Cadastrado!" });
            return;
        }
        throw new Error(`Error ao cadastrar!`);
    } catch (error) {
        console.error({ error: error.message });
        res.status(500).json({ error: 'Erro ao cadastrar ou usuário já cadastrado!' });
    }
});

// Read
router.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os dados!' });
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        let idUser = req.params.id;
        const user = await User.findById(idUser);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os dados!' });
    }
});


router.patch("/user/:id", async (req, res) => {
    try {
        let idUser = req.params.id;
        const newUser = monteUser(req);
        validUser(newUser, false);
        let result = await User.updateOne({ _id: idUser }, {
            name: newUser.name,
            // email: newUser.name,
            birth_date: newUser.birth_date,
            photo: newUser.photo,
        });
        if (result.matchedCount > 0) {
            res.status(200).json({ message: "Atualizado!" });
            return;
        }
        throw new Error(`Error ao atualizar!`);
    } catch (error) {
        console.error({ error: error.message });
        res.status(500).json({ error: 'Error ao atualizar!' });
    }
});


function monteUser(req) {
    const {
        name,
        email,
        birth_date,
        photo,
    } = req.body;

    const user = {
        name,
        email,
        birth_date,
        photo,
    };

    return user;
}

function validUser(user, add = true) {
    let error = [];
    if (!user.name) {
        error.push("Nome");
        //throw new Error("Existem campo obrigatórios em branco (Nome)!");
        //res.status(422).send({ error: "Existem campo obrigatórios em branco!" });
        //return;
    }

    if (add)
        if (!user.email) {
            error.push("E-mail");
            //throw new Error("Existem campo obrigatórios em branco (Email)!");
            //res.status(422).send({ error: "Existem campo obrigatórios em branco!" });
            //return;
        }

    if (error.length > 0) {
        let messageErro = error.join(", ");
        throw new Error(`Existem campo obrigatórios em branco:  ${messageErro}!`);
    }
}

async function verifyUserEmail(emailUser) {
    let user = await User.find({ email: emailUser });
    if (user.length != 0) {
        throw new Error('Erro ao cadastrar ou usuário já cadastrado!');
    }
}

module.exports = router;