const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const database = require("../../db/db");

router.get("/api/notes", (req, res) => {
  res.json(database);
});

router.post("/api/notes", (req, res) => {
  let jsonFilePath = path.join(__dirname, "../../db/db.json");
  let newNote = req.body;
  console.log(jsonFilePath);

  database.push(newNote);

  // Write the db.json file again.
  fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your note was saved!");
  });
  // Gives back the response, which is the user's new note.
  res.json(newNote);
});

// router.delete("/api/notes", (req, res) => {});

module.exports = router;
