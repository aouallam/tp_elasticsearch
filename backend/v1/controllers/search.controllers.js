const db = require("../models");
let { Client } = require('@elastic/elasticsearch')
let client = new Client({ node: 'http://localhost:9200' })

exports.Search = async (req, res) => {
    const index = req.params.index

    // Verification si l'index existe dejà 
    const response = await client.indices.exists({ index: index });
    const {tosearch} =req.query
    
    if (response.body) {
        if (tosearch) {
            const {body} = await client.search({
                index:index,
                body:{
                    query:{
                        multi_match:{
                            query:tosearch,
                            fields:['text', 'user.first_name', 'user.last_name', 'user.email'],
                            analyzer:"french"
                        }
                    }
                }
            })
            res.status(200).json(body.hits.hits)
        }else{
            const {body} = await client.search({
                index:index,
                body:{
                    query:{
                        match_all:{}
                    }
                }
            })
            res.status(200).json(body.hits.hits)
        }
        
        
    }else{
        res.status(404).json({message: "L'indice est introuvable"})
    }
}
