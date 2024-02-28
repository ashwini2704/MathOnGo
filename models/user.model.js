const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  recentlyVisitedBoards: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel
};
