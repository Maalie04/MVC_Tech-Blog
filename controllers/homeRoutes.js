const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//works tested

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render('homepage', { 
          posts, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.get('/dashboard', withAuth, async (req,res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                
                include: {
                    model: User
                    
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found at this id!' })
        }

        const post = dbPostData.get({ plain: true });

        res.render('singlePost', {
            post,
            logged_in: req.session.logged_in
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/addPost', (req, res) => {
    res.render('addPost');
});
module.exports = router;