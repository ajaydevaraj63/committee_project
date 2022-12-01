const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
  require('./Passport')
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:"948869378175-2j4gta2nuea49a3slpap3fnnj4jqcfqm.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://localhost:4000/auth/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));