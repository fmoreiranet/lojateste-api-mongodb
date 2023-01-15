// const express = require('express');
// const router = express.Router();

const router = require('express').Router();
const User = require('../models/User');

router.post("/user", async (req, res) => {
    try {
        const {
            name,
            email,
            birth_date,
            photo,
        } = req.body;

        const newUser = {
            name,
            email,
            birth_date,
            photo,
        };
        let result = await User.create(newUser);
        res.status(200).json({ message: "Cadastrado!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar!" });
    }
});

module.exports = router;