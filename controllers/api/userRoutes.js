const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', (req, res) => {
  User.findAll({})
  .then(userData => res.json(userData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
      model: Post,
      attributes: ['id', 'title', 'text', 'created_at']
    },
    {
      model: Comment,
      attributes: ['id', 'title', 'text', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    }
  ]
  })
  .then(userData => {
    if(!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(userData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.post('/', async (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
})
.then(userData => {
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.logged_in = true;

    res.status(200).json(userData);
})
})
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

// successfully redirects to dashboard
router.post('/login', async (req, res) => {
 try {
   const userData = await User.findOne({ where: {
     username: req.body.username
   }});

   if(!userData){
     res.status(400)
     res.json({ message: 'Incorrect username or password, please try again' });
     return;
   }

   const validPassword = await userData.checkPassword(req.body.password);

   if(!validPassword){
     res.status(400)
     res.json({ message: 'Incorrect username or password, please try again' });
     return;
   }

   req.session.save(() => {
     req.session.user_id = userData.id;
     req.session.logged_in = true;
     res.json({ user: userData, message: 'You are now logged in!' })
   });

 }catch(err){
   res.status(400).json(err);
 }
});
 
router.post('/logout', (req, res) => {
  console.log(req)
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).json({ message: "Log Out Successful"}).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(userData => {
    if(!userData){
      res.status(404).json({ message: 'No user found!'});
      return;
    }
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found at this id' });
              return;
          }

          res.json(dbUserData)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
})

module.exports = router;
