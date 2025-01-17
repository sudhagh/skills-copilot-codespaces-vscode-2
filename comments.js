// Create web server
// Create an API endpoint that will return the comments of a specific post
// Create an API endpoint that will add a new comment to a specific post
// Create an API endpoint that will delete a comment from a specific post
// Create an API endpoint that will update a comment from a specific post

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const posts = require('./posts');
const comments = require('./comments');

app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(post => post.id === postId);

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  res.send(post.comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(post => post.id === postId);

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  const comment = req.body;
  const newComment = comments.addComment(postId, comment);

  res.send(newComment);
});

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const post = posts.find(post => post.id === postId);

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  const commentId = req.params.commentId;
  const comment = comments.findComment(postId, commentId);

  if (!comment) {
    res.status(404).send('Comment not found');
    return;
  }

  comments.deleteComment(postId, commentId);

  res.send('Comment deleted');
});

app.put('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const post = posts.find(post => post.id === postId);

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  const commentId = req.params.commentId;
  const comment = comments.findComment(postId, commentId);

  if (!comment) {
    res.status(404).send('Comment not found');
    return;
  }

  const updatedComment = req.body;
  comments.updateComment(postId, commentId, updatedComment);

  res.send(updatedComment);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

