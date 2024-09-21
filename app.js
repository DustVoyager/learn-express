const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
//const multer = require('multer')
const cookieParser = require("cookie-parser");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
//app.use("/", express.static(__dirname, "public-3030"));
app.use(cookieParser("dustvoyager"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "dustvoyager",
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  req.session;
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
  console.log("실행됩니다.");
});

app.get("/category/javascript", (req, res) => {
  res.send("hello javascript");
});

// app.get("/category/:name", (req, res) => {
//   res.send("hello wildcard");
// });

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/about", (req, res) => {
  res.send("hello about");
});

app.use((req, res, next) => {
  res.status(404).send("404 입니다.");
});

//error middleware는 반드시 4개를 다 작성해줘야한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러가 발생하였습니다.");
});

app.listen(app.get("port"), () => {
  console.log("express server 실행");
});
