var router = require("express").Router();
const Ctrl = require('../controllers/comments.controllers')

const middlware = require('../../middleware/auth.middlware')

router.post("/api/instafee/v1/comment/create/:postUuid", middlware.isAuth , Ctrl.Create );




module.exports = router;
