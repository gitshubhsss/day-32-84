//express setup
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const ExpressError = require("./errorHandler.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log("app is listening on the port 8080");
});

//mongodb setup

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

main()
  .then(() => {
    console.log("connection is success");
  })
  .catch((err) => {
    console.log(err);
  });

const Chat = require("./models/fakeWhatsSchema.js");

//all chats
app.get("/chats", async (req, res, next) => {
  try {
    let allChats = await Chat.find();
    res.render("index.ejs", { allChats });
  } catch (err) {
    next(err);
  }
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//adding the chat into the database

app.post("/chats", async (req, res, next) => {
  try {
    let chat = req.body.chat;
    let newChat = new Chat({ ...chat });
    await newChat.save();
    console.log("chat saved successfully");
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//this is basically a show route
app.get("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "page not found"));
    }
    res.render("show.ejs", { chat });
  } catch (err) {
    next(err);
  }
});

//so basically it is a custom error handler
//Erro Handeling midlleware
app.use((err, req, res, next) => {
  let { status = 500, message = "some error occured" } = err;
  res.status(status).send(message);
});
