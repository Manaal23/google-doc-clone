const mongoose = require("mongoose");
const Document = require("./models/Document");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
var bodyParser = require("body-parser");
const User = require("./models/User");
const AuthController = require("./controller/AuthController");
const cors = require("cors");
const DocRoutes = require("./routes/documentRoutes");
const UserRoutes = require("./routes/userRoutes");

const cron = require("node-cron");

cron.schedule('* * * * *', () => {
  // Purpose of this cron job is to keep free tier server on render.com running everytime.
  console.log('running a task every minute');
});

app.use(cors());

require("dotenv").config();



var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

const isUserValid = async (docId, uid) => {
  const res = await Document.findOne({ _id: docId });
  const allowedUsers = [];
  const roleObj = {};

  allowedUsers.push(res.userId);
  roleObj[res.userId] = "owner";
  res.shared.map((i) => {
    allowedUsers.push(i.userId);
    roleObj[i.userId] = i.role;
  });

  if (
    res &&
    res.docAccess.accessType === "private" &&
    allowedUsers.includes(uid)
  )
    return { auth: true, role: roleObj[uid] };
  else if (res && res.docAccess.accessType === "public")
    return {
      auth: true,
      role: roleObj[uid] ? roleObj[uid] : res.docAccess.role,
    };

  return { auth: false };
};

io.on("connection", (socket) => {
  socket.on("get-document", async ({ documentId, userId }) => {
    const document = await findOrCreateDocument(documentId, userId);

    const authRole = await isUserValid(documentId, userId);
    // checking if user id is authorised to view doc
    if (!authRole?.auth) return;

    socket.join(documentId);
    socket.emit("load-document", document, authRole);

    if (!(authRole.role == "owner" || authRole.role == "editor")) return;

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (...data) => {
      await Document.findByIdAndUpdate(documentId, {
        data: data[0],
        title: data[1],
      });
    });
  });
});

async function findOrCreateDocument(id, userId) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({
    _id: id,
    data: defaultValue,
    userId,
    title: "Document",
  });
}

// Routes
app.use("/", UserRoutes);
app.use("/document", DocRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
