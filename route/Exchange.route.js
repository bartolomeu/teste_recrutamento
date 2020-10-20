const express = require("express");
const router = express.Router();

const exchangeController = require("../controller/Exchange.controller");

router.post("/", exchangeController.makeConversion);

module.exports = router;
