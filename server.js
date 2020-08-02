const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

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

app.get("/api/notes", (req, res) => {
    return res.json(getData());
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote['id'] = uuidv4()

    let currentNotes = getData()
    currentNotes.push(newNote)
    setData(currentNotes);

    return res.status(201).end();
});

const getData = () => {
    try {
        const jsonString = fs.readFileSync("./db/db.json")
        const notes = JSON.parse(jsonString)
        return notes
    } catch(err) {
        throw (err)
    }
}

const setData = (data) => {
    try {
        fs.writeFileSync("./db/db.json", JSON.stringify(data), 'utf8')
        console.log("Successfully added the note");
    } catch(err) {
        throw (err)
    }
}

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});