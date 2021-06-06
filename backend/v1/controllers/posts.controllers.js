const db = require("../models");
const table = db.post
const jwt = require('jsonwebtoken');
const Config = require('../../config/jwt.configs');
const authKey = Config.authKey;

let { Client } = require('@elastic/elasticsearch')
let client = new Client({ node: 'http://localhost:9200' })

const INDEX_NAME = "posts";


exports.Create = async (req, res) => {
    // Récupéraion du token de connexion
    let XaccessToken = req.headers['x-access-token']

    // Décodge du token et récupération des informations
    jwt.verify(XaccessToken,authKey,(err, decoded) => {
        // Si le token est invalide ou expiré on renvoie une erreur
        if (err) {
            res.status(400).json({ error: 'Authentification échouée, Token expiré ou invalid' });;
        }else{
            //Sinon on crée une publication avec un texte et une image
            const arrayPost =req.file ?{
                image_link: JSON.stringify(req.AllMediaFile),
                text:req.body.text,
                userUuid: decoded.uuid
            }: {
                text:req.body.text,
                userUuid: decoded.uuid
            }
            // la methode création 
            table.create(arrayPost)
            // Une fois le post créé dans notre base de donnée on le créé a son tour sur elasticsearch dans l'index posts
            .then(async (post)=>{
                
                // Verification si l'index existe dejà 
                const response = await client.indices.exists({ index: INDEX_NAME });
                if (!response.body) {
                    client.indices.create({
                        index: INDEX_NAME,
                        body:{
                            settings:{
                                analysis:{
                                    analyzer:{
                                        default:{type:"french"}
                                    }
                                }
                            },
                        }
                    })
                }
                table.findOne({
                    where:{uuid:post.uuid},
                    attributes:[
                        "uuid",
                        "text",
                        "image_link"
                    ],
                    include:[
                        {
                            model:db.user,
                            attributes:[
                                "uuid",
                                "first_name",
                                "last_name",
                                "email"
                            ]
                        }
                    ]
                })
                .then(async (mypost) =>{

                    const dataWithIndex = { 
                        index: INDEX_NAME,
                        body: mypost
                    };

                    client.index(dataWithIndex);
                    
                    res.status(201).json(mypost)    
                })
                .catch(()=>{
                    res.status(500).json({ error: "Erreur serveur"})
                })
                
            })
            .catch(()=>{
                res.status(500).json({ error: "Erreur serveur"})
            })
        }
    })
}

exports.FindAll = (req, res, next) =>{
    table.findAll({
        include:[
            {
                model: db.user,
                attributes:[
                    "uuid",
                    "first_name",
                    "last_name",
                    "image_link"
                ]
            },
            {
                model : db.like,
                include:[
                    {
                        model: db.user,
                        attributes:[
                            "uuid",
                            "first_name",
                            "last_name",
                            "image_link"
                        ]
                    }
                ]
            },
           {
                model : db.comment,
                include:[
                    {
                        model: db.user,
                        attributes:[
                            "uuid",
                            "first_name",
                            "last_name",
                            "image_link"
                        ]
                    }
                ]
            }
        ]
    })
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
}
