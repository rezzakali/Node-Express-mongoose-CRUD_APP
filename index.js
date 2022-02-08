const express = require("express");
const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "127.0.0.1";
const userModel = require("./Schema/userSchema");

// Connection with database
require("./database/connection");

const app = express();
app.use(express.json());

// get all the data in here
app.get("/user", async (req, res) => {
  try {
    const findUser = await userModel.find({ profession: "Students" }).exec();
    res.status(200).send(findUser);
    console.log(findUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// get a single data using id
app.get("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const findUserById = await userModel.findById(_id);
    res.status(200).send(findUserById);
    console.log(findUserById);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// post a single data to the database
app.post("/add", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).send(newUser);
    console.log(newUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// post multiple data using postman
app.post("/addmany", async (req, res) => {
  try {
    const data = req.body;
    const manyUser = userModel.insertMany(data);
    res.status(200).json({ message: "Successfully!" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//update data using id
app.put("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const findUserAndUpdate = await userModel.findByIdAndUpdate(_id, data, {
      new: true,
    });
    res.status(200).send(findUserAndUpdate);
    console.log(findUserAndUpdate);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// delete data from database

app.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const findUserAndDelete = await userModel.findByIdAndDelete(_id);
    res.status(200).json({ message: "user deleted succssfully!" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// listening the server
app.listen(port, hostname, () => {
  console.log(
    `Your server is running successfully at http://${hostname}:${port}`
  );
});
