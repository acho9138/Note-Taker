const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;
app.use(express.static('public'));
const publicPath = __dirname + "/public";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(publicPath, "notes.html"));
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});