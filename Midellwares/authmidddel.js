const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

function authmidddel(req, res, next) {
  // get Token from header
  const token = req.header("x-auth-token");

  //check for token
  if (!token)
    return res.status(401).json({ msg: "no token authorization false" });
  try {
    //verifiy token
    const decoded = jwt.verify(token, secret);
    //add user from payload
    req.user = decoded.user;
    if (decoded.isAdmin) {
      next();
    } else {
      return res.status(401).json({ msg: "not admin" });
    }
  } catch (e) {
    res.status(400).json({ msg: "token is not valid" });
  }
}

module.exports = authmidddel;
