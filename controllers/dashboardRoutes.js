const router = require('express').Router();
const withAuth = require('../utils/auth')
const {  Post } = require('../models');

router.get('/', withAuth, async (req, res) => {

    // res.render("dashboard")
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            
        })
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts)
        res.render("dashboard")
    }
    catch(err){
        console.log("failed to load dashboard paige")
    }
    Post.findAll({
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(postData => {
console.log(posts)
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/add', withAuth, (req, res) => {
    res.render('add-posts', {
        loggedIn: res.session.loggedIn
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({ message: 'No post found!'})
        }

        const post = postData.get({ plain: true });

        res.render('edit', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;