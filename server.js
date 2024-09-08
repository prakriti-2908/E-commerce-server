const express = require("express");
const clc = require("cli-color");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
const path = require("path");

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
  mongooseConnection: mongoose.connection,
});

const app = express();

// middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://main--ethnic-2931-hub.netlify.app');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
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
      secure: true, // Required to ensure cookies are sent only over HTTPS
      httpOnly: true, // Ensure cookies are not accessible via JavaScript
      sameSite: "none", // Required for cross-origin cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      // domain: "netlify.app" // REMOVE this line as it's causing the issue
    },
  })
);
app.set('trust proxy', 1); // Necessary when using HTTPS behind a proxy

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
