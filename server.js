import "dotenv/config";
import mongoose from "mongoose";

// import model from "/models/User.js";

import express from "express";
const app = express();
const PORT = 4002;
import User from "./models/User.js";

// middleware to parse the body of the rquest
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB Connected Successfully`);
    // console.log("creating user document");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });

// routes definition

// route for getting all users

app.get("/users", async (req, res) => {
  try {
    const allusers = await User.find();
    res.send(allusers);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
  // res.send("all users");
});

// ****************

// route for adding a user

app.post("/register", async (req, res) => {
  const { First_name, Last_name, Email, Password } = req.body;
  console.log(req.body);
  try {
    // create a user using the User MODEL
    const createUser = await User.create({
      First_name: First_name,
      Last_name: Last_name,
      Email: Email,
      Password: Password,
    });
    // send the user as a response to the client
    res.send(createUser);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
});

// route for updating a user by id

app.put("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { First_name } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { First_name: First_name },
      { new: true }
    );

    res.send(updatedUser);
  } catch (error) {
    res.send("error occurred");
  }
});

// ******************************

// route for deleting a user by id

app.delete("/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send(deletedUser);
  } catch (error) {
    res.send("error occurred");
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

//   try {
//     const user = new user({
//       First_name: "Mhizta Dera",
//       Last_name: "Chidex",
//       Email: "chidex4u@gmail.com",
//       Password: "iahdjhaevvekcvh",
//     });
//     await user.save();
//     console.log(user);
//     res.send("User registered successfully");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while registering the user");
//   }
// });

// app.delete("/delete", (req, res) => {
//   res.send("User details updated successfully");
// });

// // In-memory user database (for demonstration purposes)
// async function createUser() {
//   try {
//     const user = new User({
//       First_name: "Mhizta Dera",
//       Last_name: "Chidex",
//       Email: "cheta.chidera@gmail.com",
//       Password: "whatever24/7",
//     });
//     await user.save();
//     console.log(user);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // GET: RETURN ALL USERS
// app.get("/users", (req, res) => {
//   res.json(users);
// });

// // POST: ADD A NEW USER TO THE DATABASE
// app.post("/users", (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // PUT: EDIT A USER BY ID
// app.put("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((user) => user.id === userId);
//   if (user) {
//     user.name = req.body.name || user.name;
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

// // DELETE: REMOVE A USER BY ID
// app.delete("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const userIndex = users.findIndex((user) => user.id === userId);
//   if (userIndex !== -1) {
//     users.splice(userIndex, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });
