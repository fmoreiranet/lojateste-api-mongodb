const router = require('express').Router();
const User = require('../models/User');

router.post("/user", async (req, res) => {
    try {
        const {
            name,
            email,
            pass,
            foto,
            data_nasc,
        } = req.body;

        const newUser = {
            name,
            email,
            pass,
            foto,
            data_nasc,
        };

        let result = await User.create(newUser);
        res.status(200).json({ message: "Cadastrado!", _id: result.id });
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar!" });
    }
});

module.exports = router;