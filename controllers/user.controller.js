

const loginSuccess = async (req, res) => {
  const token = req.cookies.jwt;
  if (req.user) {
    res
      .status(200)
      .json({ message: "User Logged in successfully", user: req.user, token });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};
const logoutSuccess = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie('jwt');
    res.redirect("http://localhost:3000");
  });
};


module.exports = {
  loginSuccess,
  logoutSuccess
};
