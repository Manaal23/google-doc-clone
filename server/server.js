const mongoose = require("mongoose")
const Document = require("./models/Document")
const express = require("express")
const app = express();
const http = require("http");
const server = http.createServer(app);
var bodyParser = require('body-parser');
const User = require("./models/User");
const AuthController = require("./controller/AuthController");
const cors = require("cors");

app.use(cors());

require('dotenv').config()

var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser)
app.use(urlencodedParser)

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}



app.post('/login', AuthController.login)


const PORT = 3001;
server.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`)
})
