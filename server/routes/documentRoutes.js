const express = require("express");
const DocumentController = require("../controller/DocumentController");
const auth = require("../middleware/auth");
const app = express.Router();

app.get('/get',auth, DocumentController.getDocs)
app.delete('/delete',auth, DocumentController.deleteDoc)
app.put('/update-role',auth, DocumentController.updateRole)
app.get('/get-access-users',auth, DocumentController.getDocAccessUsers)

module.exports = app;