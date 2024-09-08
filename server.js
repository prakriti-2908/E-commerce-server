const express = require("express");
const clc = require("cli-color");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
const path = require('path');

require("dotenv").config();

// file imports
const authRouter = require("./routes/AuthRoute");
const productRoute = require("./routes/ProductRoute");

// constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// store for session
const store = new mongodbSession({
  uri: MONGO_URI,
  collection: "sessions",
  databaseName: "Ecommerce",
  mongooseConnection: mongoose.connection
});

const app = express();

// middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_APP,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly:false,
      sameSite:"None",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes middlewares
app.use("/api/version/auth", authRouter);
app.use("/api/version/product", productRoute);

// db connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(clc.bgGreen("MongoDB is connected Successfully"));
  })
  .catch((err) => {
    console.log(clc.redBright(err));
  });

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "server is listening",
  });
});

app.listen(PORT, () => {
  console.log(
    clc.yellowBright(`Server is listening on: http://localhost:${PORT}/`)
  );
});
