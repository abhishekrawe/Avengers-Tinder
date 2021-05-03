import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbcards.js";

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:HVAYthgQ2LNQyikd@cluster0.7usoc.mongodb.net/tinderdb?retryWrites=true&w=majority";

//MiddleWares
app.use(express.json());
app.use(Cors());

//Db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//API EndPoints
app.get("/", (req, res) => res.status(200).send("HELLO ABHISHEK RAWE !!!"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(`listening on localhost : ${port}`));
