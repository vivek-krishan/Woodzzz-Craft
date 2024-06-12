var express = require("express");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
var router = express.Router();
const cors = require("cors");
const userModel = require("./users");
const cartModel = require("./Cart");
const localStrategy = require("passport-local");
const passport = require("passport");
const { Collection } = require("mongoose");
const _ = require("passport-local-mongoose");
passport.use(new localStrategy(userModel.authenticate()));

const jwt_secrate = "kjasvjffjnnvjjndfj";

router.use(bodyParser.json());
router.use(cors());

// POST Routes --------------------
// register route
router.post("/api/register", function (req, res) {
  const user = req.body;

  var userdata = new userModel({
    username: user.name,
    age: user.age,
    mobile: user.mobile,
    email: user.email,
    password: user.password,
  });

  userModel.register(userdata, user.password).then(function (registereduser) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
  console.log("Register Completed");
});

router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModel.findOne({ username: userId });

    if (!user || password !== user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = await jwt.sign({ userId }, jwt_secrate);
    req.session.savedUser = user;
    res.json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/api/cart", async (req, res) => {
  try {
    const { userId, Info } = req.body;
    // console.log(userData);
    console.log(userId);
    if (!userId || !Info) {
      return res
        .status(400)
        .json({ message: "You are not LogedIn. Please Log In" });
    }

    const cart = await cartModel.findOneAndUpdate(
      { userId },
      { $set: { Info } },
      { new: true }
    );

    if (!cart) {
      const newCart = await cartModel.create({ userId, items: Info });
      res.send({
        cartCreated: true,
        cart: newCart,
        message: "New cart created and item is added successfully",
      });
    }

    return res.send({
      message: "Item added to the cart successfully",
      cartCreated: true,
      cart: cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating cart" });
  }
});

router.post("/getcart", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.send({ message: "Please logIn" });
    }

    const cart = await cartModel.findOne({
      userId,
    });

    if (cart) {
      return res.send({
        cart,
      });
    }
  } catch (error) {
    console.log("Failed to fatch Cart", error);
  }
});

// GET routes----------------
/* GET home page. */
router.get("/error", function (req, res) {
  res.sendStatus(500);
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.sendStatus(200);
});

router.get("/keepLogedIn", async function (req, res) {
  const userId = req.headers.authentication;
  const user = isValidToken(userId);

  if (user === null) {
    return res.send({
      success: false,
      message: "You are not loged in",
    });
  } else {
    return res.send({
      success: true,
      user: user,
    });
  }
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.distroy;
    res.redirect("/");
  });
});

async function isValidToken(userId) {
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    return null;
  } else {
    return user;
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/error");
}

module.exports = router;
