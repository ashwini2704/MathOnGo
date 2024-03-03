const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  // Extract JWT from the cookie
  const token = req.rawHeaders[1].split(" ")[1];
  console.log(token)
  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Token not found" });
    }else{
          jwt.verify(token, process.env.SECRET_KEY ,(err, decoded) => {
            if(err) {
                res.status(200).send({"msg" : "Not authorised"})
            }else{
                req.body.userID = decoded.userID;
                next()
            }
          });
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
module.exports ={
      auth
};
