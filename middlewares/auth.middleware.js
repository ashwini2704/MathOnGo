const jwt = require('jsonwebtoken');
const {BlackModel} = require("../models/black.model")

const auth =async (req,res,next) => {
    let token = req.headers.authorization?.split(" ")[1]
    try {
        let blacklist = await BlackModel.find({token});
        // console.log(blacklist);
        let flag=false
        for(let i=0; i<blacklist.length; i++) {
            if(blacklist[i].token == token) {
                flag=true
            }
        }
        if(flag) {
            res.status(200).send({"msg" : "Login again"})
        }else{
            jwt.verify(token, 'masai', (err, decoded) =>{
                if(err) {
                    res.send({"error":err})
                }else{
                    next()
                }
            });
        }
    } catch (error) {
        res.status(400).send({"error" : error})
    }
}
module.exports = {
    auth
}