var express = require('express');
var router = express.Router();

const usermodel = require('./users');
const postmodel = require('./post');
const upload = require('./multer');
const passport = require('passport');

const localstrategy = require('passport-local');
passport.use(new localstrategy(usermodel.authenticate()));



router.get('/', function(req, res) {
  res.render('index');
});


// router.get('/alluserposts', async function(req, res) {
//   let user = await usermodel.findOne({_id: "65e8b6dd5fe5843b5ec1149b"}).populate("posts")
//   res.send(user);
// });

// router.get('/createuser', async function(req, res) {
//   let userdata = await usermodel.create({
//     username: "Mithu",
//     password: "Mithu",
//     posts: [],
//     email: "mithu@gmail.com",
//     fullName: "Kirti Mahapatra",
//   })
//   res.send(userdata);
// });

// router.get('/createpost', async function(req, res) {
//   let postdata = await postmodel.create({
//     postText: "Hii Noob -- You are noob!",
//     user: "65e8b6dd5fe5843b5ec1149b"
//   });
//   let user = await usermodel.findOne({_id: "65e8b6dd5fe5843b5ec1149b"});
//   user.posts.push(postdata._id)
//   await user.save();
//   res.send("Done");
// })


router.get('/login', function(req, res) {
  res.render('login', {error: req.flash('error')});
});

router.get('/profile', isLoggedIn ,async function(req, res) {
  const user = await usermodel.findOne({
    username: req.session.passport.user
  }).populate('posts');
  res.render('profile', {user});
});

router.get('/feed',function(req, res) {
  res.render('feed');
});

router.post('/upload', isLoggedIn, upload.single('file') , async function(req, res){
  if(!req.file){
    return res.status(404).send('No files were uploaded');
  }
  const userId = await usermodel.findOne({username: req.session.passport.user});
  const post = await postmodel.create({
    image : req.file.filename,
    posttext: req.body.caption,
    user: userId._id
  });

  userId.posts.push(post._id);
  await userId.save();
  res.redirect('profile');
});

router.post('/register', function(req, res) {
  const { username, email, fullname } = req.body;
  const userdata = new usermodel({ username, email, fullname });
  usermodel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile');
    })
  })

});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}), function(req, res){})

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/');
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}


module.exports = router;
