const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log("모든 요청에 실행하고 싶습니다.");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
    next("route");
  },
  (req, res) => {
    console.log("실행되나요");
  }
);

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
  res.send("404 입니다.");
});

//error middleware는 반드시 4개를 다 작성해줘야한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러가 발생하였습니다.");
});

app.listen(app.get("port"), () => {
  console.log("express server 실행");
});
