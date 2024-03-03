const {BoardModel} = require('../models/board.model');
const { UserModel } = require('../models/user.model');

const home = async (req, res) => {
      // Retrieve the user's last 3 visited boards
      const userID = req.body.userID;
      try {
        const user = await UserModel.findById(userID);
        if(user.recentlyVisitedBoards.length === 0) {
          return res.status(200).json({data: [], message : "No boards found, please create or join one."})
        }
        else if(user.recentlyVisitedBoards.length <= 3){
          return res.status(200).json({data: user.recentlyVisitedBoards})

        }else{
          const lastVisitedBoards = user.recentlyVisitedBoards.slice(0, 3);
            res.status(200).json({ data : lastVisitedBoards });
        }
      } catch (error) {
        res.status(400).json({ error: error});
      }       
};

const getAllBoard = async (req, res) => {
  try {  
    // Find all boards where the user is a member
    const boards = await BoardModel.find();
    if(boards.length > 0) {
      res.status(200).json({data: boards});
    }else{
      res.status(200).json({message: 'Board not found', data:[]});
    }
  } catch (error) {
    res.status(400).json({error: error,message:"Error while getting all board"});
  }
};

const profileOfUser = async (req, res) => {
  const user = await UserModel.findById(req.body.userID)
  try {
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: "error in profile backend" });
  }
};

module.exports = {
      home,getAllBoard,profileOfUser
}