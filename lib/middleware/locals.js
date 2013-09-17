module.exports = locals

function locals(req, res, next) {
  // res.locals.loggedIn = req.isAuthenticated()
  res.locals.req = req
  next()
}
