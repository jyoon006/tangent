var helpers = require('../helpers/helpers');

module.exports = function(app, passport) {

  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/api/signin', function(req, res) {
    // var username = req.body.data.username;
    // var password = req.body.data.password;
    
    new Promise(function(resolve, reject) {
      resolve(helpers.signIn());
    })
    .then(function(data) {
      console.log('ressss', data);
      res.json(data);
    });

  });
 
}

