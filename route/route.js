const express = require('express');
const { reseller } = require("./../controller/appController")


// router scalfolding
const router = express.Router();


// http request
router.post('/reseller', reseller)


// export here
module.exports = router