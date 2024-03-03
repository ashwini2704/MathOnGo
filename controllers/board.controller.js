const { BoardModel } = require("../models/board.model");
const { UserModel } = require("../models/user.model");

const createBoard = async (req, res) => {
  try {
    const userId = req.body.userID;
    const createdBy = await BoardModel.findOne({ createdBy: userId });
    if (createdBy) {
      res
        .status(200)
        .json({ message: "Already one board created by this user." });
    } else {
      const board = new BoardModel({ name: req.body.name, createdBy: userId });
      board.members.push(userId);
      await board.save();
      res
        .status(200)
        .json({ message: "New board has been created successfully." });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const editBoardName = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.body.userID;
    const createdBy = await BoardModel.findOne({ createdBy: userId });
    if (id === userId) {
      const board = await BoardModel.findByIdAndUpdate(
        createdBy._id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, message: "Successfully updated", data: board });
    } else {
      res
        .status(200)
        .json({ message: "only the one who has created can change the board" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const addMember = async (req, res) => {
  const { id } = req.params;
  const userId =req.body.userID;
  try {
      const board = await BoardModel.findOne({ createdBy: id });
      if (board && !board.members.includes(userId)) {
        board.members.push(userId);
        await board.save();
        res.status(200).json({ message: "User access recorded successfully" });
      } else {
        res
          .status(200)
          .json({ message: "User is already a member of board" });
      }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const recentlyVisited = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.body.userID;
    const user = await UserModel.findById({ _id: userId });
    if (user) {
      if (
        user.recentlyVisitedBoards.length < 3 &&
        !user.recentlyVisitedBoards.includes(id)
      ) {
        user.recentlyVisitedBoards.push(id);
        await user.save();
        res
          .status(200)
          .json({
            message: "Recently visited board has been recorded successfully",
          });
      } else if (
        user.recentlyVisitedBoards.length >= 3 &&
        !user.recentlyVisitedBoards.includes(id)
      ) {
        user.recentlyVisitedBoards.shift();
        user.recentlyVisitedBoards.push(id);
        await user.save();
        res
          .status(200)
          .json({
            message: "Recently visited board has been recorded successfully",
          });
      } else if (
        user.recentlyVisitedBoards.length >= 3 &&
        user.recentlyVisitedBoards.includes(id)
      ) {
        const newRecent = user.recentlyVisitedBoards.filter((el) => el !== id);
        newRecent.push(id);
        user.recentlyVisitedBoards = newRecent;
        await user.save();
        res
          .status(200)
          .json({
            message: "Recently visited board has been recorded successfully",
          });
      } else if (
        user.recentlyVisitedBoards.length < 3 &&
        user.recentlyVisitedBoards.includes(id)
      ) {
        const newRecent = user.recentlyVisitedBoards.filter((el) => el !== id);
        newRecent.push(id);
        user.recentlyVisitedBoards = newRecent;
        await user.save();
        res
          .status(200)
          .json({
            message: "Recently visited board has been recorded successfully",
          });
      }
    } else {
      res.status(200).json({ message: "Not Authorised" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createBoard,
  editBoardName,
  addMember,
  recentlyVisited
};
