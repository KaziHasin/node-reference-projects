const express = require("express");
const app = express();
const auth = require("./routes/auth");
const connectDB = require("./db/connection");
require("dotenv").config();
const connectionString = process.env.MONGO_URI;
const port = process.env.PORT || 4000;
app.use(express.json());
require("express-async-errors");
const notFound = require("./middleware/not-found");
const errorHandling = require("./middleware/error-handling");
app.use("/api/v1", auth);

app.use(notFound);

app.use(errorHandling);

const start = async () => {
  try {
    await connectDB(connectionString);
    app.listen(port, console.log(`Sever listen on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
