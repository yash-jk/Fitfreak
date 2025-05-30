require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const cors = require("cors");

//express app
const app = express();
const port = process.env.PORT || 4000 

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
// app.get('/',(req,res)=>{
//     res.json({mssg:"welcome to the app"})
// })

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    //listens for request
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
