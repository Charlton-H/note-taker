const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const uuid = require("uuid");
const database = require("../../db/db");

// function to write to db.json
function writeToDatabase(notes) {
  // Converts new JSON Array back to string
  notes = JSON.stringify(notes);
  console.log(notes);
  // Writes String back to db.json
  fs.writeFileSync("./db/db.json", notes, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

// GET(READ) notes from db.json
router.get("/notes", (req, res) => {
  res.json(database);
});

// POST (CREATE) notes
router.post("/notes", (req, res) => {
  // Add and set unique id to req
  req.body.id = uuid.v4();
  console.log("req.body.id: " + req.body.id);

  // Pushes Body to JSON Array
  database.push(req.body);

  // Write notes data to database
  writeToDatabase(database);
  // console.log(database);

  // returns new note in JSON format.
  res.json(req.body);
});

// DELETE note with unqiue ID
router.delete("/notes/:id", (req, res) => {
  // Obtains id and converts to a string
  let id = req.params.id.toString();
  console.log(id);

  // Goes through db array searching for matching ID
  for (i = 0; i < database.length; i++) {
    if (database[i].id == id) {
      console.log("match!");
      // responds with deleted note
      res.send(database[i]);

      // Removes the deleted note
      database.splice(i, 1);
      break;
    }
  }

  // Write notes data to database
  writeToDatabase(database);
});

module.exports = router;
