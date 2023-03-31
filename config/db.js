const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// The config package is not specifically required to connect MongoDB Atlas to Node.js, but it can be a helpful package to manage configuration settings and environment variables in a Node.js application.

// In a Node.js application, you may need to store configuration information such as database connection strings, API keys, and other sensitive information. However, hardcoding this information directly into your code can pose a security risk, especially if your code is stored in a public repository. Instead, it's best to store configuration information separately and securely.

// The config package provides an easy way to manage configuration settings in a Node.js application. It allows you to store configuration settings in a separate file, which can then be loaded into your application using environment variables. This makes it easy to manage and change configuration settings without modifying your code

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// iSQBE2r9cSyOraU7

module.exports = connectDB;
