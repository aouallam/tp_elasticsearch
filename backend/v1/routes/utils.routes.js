var router = require("express").Router();
const jwt = require('jsonwebtoken');
const Config = require('../../config/jwt.configs');
const authKey = Config.authKey;




router.get("/check-token/:token", (req, res) => {
    const token = req.params.token
    jwt.verify(token,authKey,(err, decoded) => {
        // Si le token est invalide ou expiré on renvoie une erreur
        if (err) {
            res.status(400).json({ error: 'Authentification échouée, Token expiré ou invalid' });;
        }else{
            res.status(200).json({message: 'good'})
        }
    })
});




module.exports = router;
