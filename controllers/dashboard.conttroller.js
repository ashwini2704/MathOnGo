const {UserModel} = require('../models/user.model')


const home = ((req, res,next) => {
      // Retrieve the user's last 3 visited boards
      try{
        console.log("req :",  req)
          res.send("Home")
      }
      catch(err) {
        next(err)
      }
});

module.exports = {
      home
}