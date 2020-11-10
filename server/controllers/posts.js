const Post = require("../models/post");

const HTTP_MESSAGE = {
  AUTH_FAILED: { message: "Not authorized." },
  POST_CREATE_FAILED: { message: "Post create failed." },
  POST_CREATED: { message: "Post created." },
  POST_GET_SUCCESS: { message: "Posts retreived successfully." },
  POST_GET_FAILED: { message: "Posts failed successfully." },
  POST_NOT_FOUND: { message: "Post not found." },
  POST_UPDATED: { message: "Post updated." },
  POST_UPDATE_FAILED: { message: "Post update failed." },
};

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        ...HTTP_MESSAGE.POST_CREATED,
        post: { ...result, id: result._id },
      });
    })
    .catch((error) => {
      res.status(400).json(HTTP_MESSAGE.POST_CREATE_FAILED);
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json(HTTP_MESSAGE.POST_UPDATED);
      } else {
        res.status(401).json(HTTP_MESSAGE.AUTH_FAILED);
      }
    })
    .catch((error) => {
      res.status(400).json(HTTP_MESSAGE.POST_UPDATE_FAILED);
    });
};

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        ...HTTP_MESSAGE.POST_GET_SUCCESS,
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(400).json(HTTP_MESSAGE.POST_GET_FAILED);
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json(HTTP_MESSAGE.POST_NOT_FOUND);
      }
    })
    .catch((error) => {
      res.status(400).json(HTTP_MESSAGE.POST_GET_FAILED);
    });
};

exports.deletePost = (req, res, next) => {
  console.log("Deleting: " + req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "deleted: " + req.params.id });
      } else {
        res.status(401).json(HTTP_MESSAGE.AUTH_FAILED);
      }
    }
  );
};
