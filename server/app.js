const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({ message: "success" });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "1",
      title: "First Post",
      content:
        "Aliqua mollit laborum non nulla velit aliqua irure id. Ex ullamco qui ad magna quis aute velit.",
    },
    {
      id: "2",
      title: "Second Post",
      content:
        "Veniam sit sit aute non cupidatat proident incididunt Lorem. Anim esse ut sint veniam proident culpa.",
    },
    {
      id: "3",
      title: "Third Post",
      content:
        "Sint ad deserunt exercitation et ipsum culpa. Adipisicing qui reprehenderit ullamco in excepteur voluptate.",
    },
  ];

  res.status(200).json({
    message: "success",
    posts: posts,
  });
});

module.exports = app;
