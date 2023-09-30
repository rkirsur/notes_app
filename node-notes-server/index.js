const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
)

app.use(express.json());

const notes = JSON.parse(
    fs.readFileSync(`${__dirname}/notes.json`)
);

// app.get('/api/notes', (req, res) => {
//     res.status(200).send("hello from the server side");
// });

app.get('/api/notes', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            notes
        }
    });
});

app.post('/api/notes', (req, res) => {
    const newId = notes[notes.length - 1].id + 1;
    const newNote = Object.assign({id: newId}, req.body)
    notes.push(newNote)
    fs.writeFile(`${__dirname}/notes.json`, JSON.stringify(notes, null, 4), err => {
        res.status(201).json({
            status: 'success',
            data:{
                note: newNote
            }
        })
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});