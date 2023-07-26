const express = require("express");
const app = express();
const port = 5000;
const router = require('./routes/index.js')

// app.js

const sequelize = require("./db.js");
const User = require("./models/user.js");
const Logs = require("./models/logs.js");

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Synchronize the model with the database (create the table if it doesn't exist)
    await sequelize.sync();
    // await User.sync();

    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

syncDatabase();

app.use(express.json({limit: "50mb"}))
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});






