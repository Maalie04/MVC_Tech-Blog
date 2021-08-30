// const router = require('express').Router();
// const { Comment, User, Post } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.get('/', (req, res) => {
//     Comment.findAll({})
//     .then(commentData => res.json(commentData))
//     .catch(err => {
//         console.log(err);
//     })
// });

// router.post('/', withAuth, (req, res) => {
//     Comment.create({
//         comment: req.body.comment,
//         user_id: req.session.user_id,
//         post_id: req.body.post_id
//     })
//     .then(commentData => res.json(commentData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

// router.delete('/:id', withAuth,  (req, res) => {
//     Comment.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(commentData => {
//         if(!commentData) {
//             res.status(404).json({ message: 'No comment found!'});
//             return;
//         }
//         res.json(commentData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// })

// module.exports = router;