const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connection } = require("./db");
const { limiter } = require("./middlewares/rateLimiter.middleware");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const { UserModel } = require("./models/user.model");
const { dashboardRoute } = require("./routes/dashboard.route");
const boardRoute = require("./routes/board.route");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST,PUT,PATCH, DELETE",
    credentials: true,
  })
);
app.use(limiter); //500 requests/minute.

//setup session
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${profile.displayName}`,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

//initial google auth login

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    const token = jwt.sign({ userID: req.user._id,email:req.user.email }, process.env.SECRET_KEY);
    console.log("my jwt token : ",token)
    res.cookie("jwt", token, { httpOnly: true , secure: true, sameSite: 'None'});
    res.redirect("http://localhost:3000/dashboard")
  }
);


app.use("/dashboard", dashboardRoute);
app.use("/boards", boardRoute);
app.use("/", userRouter);
app.use("/task", taskRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
