const express = require("express");
const DocumentController = require("../controller/DocumentController");
const auth = require("../middleware/auth");
const app = express.Router();

app.get('/get',auth, DocumentController.getDocs)

module.exports = app;