const User = require("./models/User");
const Expense = require("./models/Expense");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const bcrypt = require("bcrypt");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)

  .then(() => console.log("MongoDB Connected"))

  .catch((err) => console.log(err));

app.get("/", (req, res) => {

  res.send("Server Running");

});



/* =========================
   ADD EXPENSE
========================= */

app.post("/add-expense", async (req, res) => {

  try {

    const newExpense = new Expense({

      userEmail: req.body.userEmail,

      title: req.body.title,

      amount: req.body.amount,

      category: req.body.category

    });

    await newExpense.save();

    res.json("Expense Added");

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   GET EXPENSES
========================= */

app.get("/get-expenses", async (req, res) => {

  try {

    const expenses = await Expense.find({

      userEmail: req.query.userEmail

    });

    res.json(expenses);

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   DELETE EXPENSE
========================= */

app.delete("/delete-expense/:id", async (req, res) => {

  try {

    await Expense.findByIdAndDelete(req.params.id);

    res.json("Expense Deleted");

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   UPDATE EXPENSE
========================= */

app.put("/update-expense/:id", async (req, res) => {

  try {

    await Expense.findByIdAndUpdate(req.params.id, {

      title: req.body.title,

      amount: req.body.amount,

      category: req.body.category

    });

    res.json("Expense Updated");

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   REGISTER USER
========================= */

app.post("/register", async (req, res) => {

  try {

    const existingUser = await User.findOne({

      email: req.body.email

    });

    if (existingUser) {

      return res.json("User Already Exists");

    }

    const hashedPassword = await bcrypt.hash(

      req.body.password,

      10

    );

    const newUser = new User({

      name: req.body.name,

      email: req.body.email,

      password: hashedPassword,

      income: 0

    });

    await newUser.save();

    res.json("User Registered Successfully");

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   LOGIN USER
========================= */

app.post("/login", async (req, res) => {

  try {

    const user = await User.findOne({

      email: req.body.email

    });

    if (!user) {

      return res.json("User Not Found");

    }

    const isMatch = await bcrypt.compare(

      req.body.password,

      user.password

    );

    if (!isMatch) {

      return res.json("Invalid Password");

    }

    res.json({

      message: "Login Success",

      userName: user.name,

      userEmail: user.email

    });

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   UPDATE INCOME
========================= */

app.put("/update-income", async (req, res) => {

  try {

    await User.findOneAndUpdate(

      { email: req.body.email },

      { income: req.body.income }

    );

    res.json("Income Updated");

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   GET INCOME
========================= */

app.get("/get-income", async (req, res) => {

  try {

    const user = await User.findOne({

      email: req.query.email

    });

    res.json(user?.income || 0);

  } catch (error) {

    console.log(error);

  }

});



/* =========================
   SERVER
========================= */

app.listen(5000, () => {

  console.log("Server Started");

});