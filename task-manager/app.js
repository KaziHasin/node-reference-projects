const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
port = process.env.PORT || 4000;
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandling = require("./middleware/error-handling");
const connectionString = process.env.MONGO_URI;

app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/api/v1/tasks", tasks);

// unknown routes
app.use(notFound);

// error handling
app.use(errorHandling);

const start = async () => {
  try {
    await connectDB(connectionString);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
