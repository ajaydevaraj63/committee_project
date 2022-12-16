
 exports.ensureAuth= function (req, res, next) {
  console.log("ensureAuth")
  console.log(req)
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/');
    }
  }
  
  exports.ensureGuest=function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  
}
