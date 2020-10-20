import express from "express";

import exchangeController from "../controller/Exchange.controller.js";

const router = express.Router();

router.post("/", exchangeController.makeConversion);
router.get("/findByUser/:id", exchangeController.findByUser);

export default router;
