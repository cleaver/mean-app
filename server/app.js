const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("first middleware");
  next();
});

app.use("/api/posts", (req, res, next) => {
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
