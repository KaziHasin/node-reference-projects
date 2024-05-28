const mongoose = require("mongoose");
// const username = encodeURIComponent("kazihasin12");
// const password = encodeURIComponent("Usepassword@9");
// const connectionString = `mongodb+srv://kazihasin12:Usepassword@9@nodeexpressproject.z7wqjvi.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = (connectionString) => {
  mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDb cloud server is connected.."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
