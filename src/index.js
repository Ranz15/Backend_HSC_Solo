//  Inisialisasi Dotenv
require("dotenv").config();

// Inisialisasi Express
const express = require("express");

// Inisialisasi Body Parser
const bodyParser = require("body-parser");

// Inisialisasi PORT
const port = process.env.PORT || 3000;

// Insialisasi CORS
const cors = require("cors");

// Inisialisasi Sequelize
const sequelize = require("sequelize");

// Inisialisasi Cookie Parser
const cookieParser = require("cookie-parser");

// Call Express
const app = express();

// Middleware Section
app.use(cors());

// Fungsi agar backend dapat menerima cookie
app.use(cookieParser());

// Fungsi agar backend dapat menerima data json
app.use(bodyParser.json());

// Fungsi agar backend dapat menerima data url
app.use(bodyParser.urlencoded({ extended: true }));

// Check Connection with Database (Sequelize)
try {
  sequelize.authenticate;
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Inisialisasi Routes
const buyer = require("./routes/buyerRoute");
const seller = require("./routes/sellerRoute");
const category = require("./routes/categoryRoute");
const product = require("./routes/productRoute");
const transaction = require("./routes/transactionRoute");
const login = require("./routes/loginRoute");

// Routes Section
app.use("/login", login);
app.use("/buyer", buyer);
app.use("/seller", seller);
app.use("/category", category);
app.use("/product", product);
app.use("/transaction", transaction);

// Listen App Port Section
app.listen(port, () => {
  console.log(`server berhasil dijalankan pada port http://localhost:${port}`);
});
