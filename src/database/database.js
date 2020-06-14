
var Mongoose = require('mongoose');

module.exports = {
  connect: function () {
    const uri = "mongodb://localhost:27017";
    if (database) {
      return;
    }
    Mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    database = Mongoose.connection;
    database.once("open", async () => {
      console.log("Connected to database");
    });
    database.on("error", () => {
      console.log("Error connecting to database");
    });
  },
  disconnect: function () {
    if (!database) {
      return;
    }
    Mongoose.disconnect();
  }
};

