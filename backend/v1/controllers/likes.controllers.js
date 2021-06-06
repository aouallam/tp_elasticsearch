const db = require("../models");
const table = db.like
const jwt = require('jsonwebtoken');
const Config = require('../../config/jwt.configs');
const authKey = Config.authKey;

exports.Create = async (req, res) => {
    let XaccessToken = req.headers['x-access-token']
    let postUuid = req.params.postUuid
    jwt.verify(XaccessToken,authKey,(err, decoded) => {
        if (err) {
            res.status(400).json({ error: 'Authentification échouée, Token expiré ou invalid' });;
        }else{
            const arrayLike ={
                postUuid: postUuid,
                userUuid: decoded.uuid
            }
            table.count({
                where:{
                    userUuid: decoded.uuid,
                    postUuid: postUuid
                }
            })
            .then(count =>{
                if (!count) {
                    // la methode création 
                    table.create(arrayLike)
                    .then(like=>{
                        res.status(201).json(like)
                    })
                    .catch(()=>{
                        res.status(500).json({ error: "Erreur serveur"})
                    })
                }else{
                    res.status(409).json({error : "Vous avez déja aimé ce post"})
                }
            })
            
        }
    })
}
