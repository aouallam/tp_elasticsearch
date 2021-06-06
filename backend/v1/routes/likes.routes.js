var router = require("express").Router();
const Ctrl = require('../controllers/likes.controllers')

const middlware = require('../../middleware/auth.middlware')

router.post("/api/instafee/v1/like/create/:postUuid", middlware.isAuth , Ctrl.Create );




module.exports = router;
