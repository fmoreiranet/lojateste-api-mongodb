const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = {
    createNewPass: async function (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    },
    comparePass: async function (passwordUser, passwordDB) {
        const checkPassword = await bcrypt.compare(passwordUser, passwordDB);
        if (!checkPassword) {
            throw new Error("Senha inválida");
        }
    },
    createToken: function (res, user) {
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret
            );
            return token;
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    checkToken: function (req, res, next) {
        try {
            let authHeader = req.headers['authorization'];
            let token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Acesso Negado!" });
            }
            const secret = process.env.SECRET;
            jwt.verify(token, secret, (error, userInfo) => {
                if (error) {
                    console.error("Error:", error);
                    return res.status(401).json({ error: "Acesso Negado!" });
                }
                console.log("User:", userInfo);
            });
            next();
        } catch (error) {
            console.error("Error:", error.message);
            res.status(404).json({ error: "Token invalido" });
        }
    },
};

module.exports = auth;