const express = require('express');
const { addComment, getCommentsByPost } = require('../controllers/comment.controller');
const router = express.Router();

router.post('/comments', addComment);
router.get('/comments/:postId', getCommentsByPost);

module.exports = router;