const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// express.static() method that provides a file path to folder that houses other necessary files
// without need of creating seperate server endpoint
// Every time we create a server that will serve a front end as well as JSON data, we'll always want to use this middleware.
app.use(express.static("public"));
app.use("/", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
