const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
    })
});

router.post('/', withAuth, async (req, res) => {
  try {
      const newComment = await Comment.create({
          ...req.body,
          comment: req.body.content,
          post_id: req.post_id,
          user_id: req.session.user_id,
      });

      res.status(200).json(newComment);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.delete('/:id', withAuth,  (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({ message: 'No comment found!'});
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;