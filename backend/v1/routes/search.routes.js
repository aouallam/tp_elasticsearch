var router = require("express").Router();
const Ctrl = require('../controllers/search.controllers')



router.post("/api/instafee/v1/search/:index", Ctrl.Search );




module.exports = router;
