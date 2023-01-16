const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = {
    createNewPass: async function (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    },
    comparePass: async function (passwordUser, passwordDB) {
        const checkPass = await bcrypt.compare(passwordUser, passwordDB);
        if (!checkPass) {
            throw new Error("Senha invalida!");
        }
    },
    createToken: function (res, user) {
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    roles: user.roles
                },
                secret
            );
            return token;
        } catch (error) {
            console.error("Erro:", error.message);
            return res.status(401).send({ error: "Usuário sem acesso!" });
        }
    },
    checkToken: function (req, res, next) {
        try {
            let authHeader = req.headers["authorization"];
            let token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).send({ error: "Usuário sem acesso!" });
            }

            const secret = process.env.SECRET;
            jwt.verify(token, secret, (error, userInfo) => {
                if (error) {
                    console.error("Erro:", error);
                    return res.status(401).send({ error: "Usuário sem acesso!" });
                }
                console.log(userInfo);
                return userInfo;
            });
            next();
        } catch (error) {
            console.error("Erro:", error.message);
            return res.status(401).send({ error: "Usuário sem acesso!" });
        }
    }
}

module.exports = auth;
