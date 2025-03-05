// connect to express
const express = require('express')
const app = express()

// for listening in different port
const cors = require('cors')

// for using the secret .env file
require('dotenv').config()
app.use(cors())

// static middleware for static files
app.use(express.static('public'))

//use middleware to access body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this!


//conncect to the database
const mongoose=require('mongoose');
const req = require('express/lib/request')
const { json } = require('express/lib/response')
mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser:true,
useUnifiedTopology:true
});

// create a user schema
const userSchema =new mongoose.Schema({
username:{type:String,required:true}
});

//connect the user schema to the database model
const User=mongoose.model("User",userSchema);

//create a exercise schema
const exerciseSchema=new mongoose.Schema({
  userId:mongoose.Schema.Types.ObjectId,
  description:String,
  duration:Number,
  date:Date
})

//connect the exercise schema with database
const Exercise=mongoose.model("Exercise",exerciseSchema);


//get api to get static files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '_id username').lean();
    // Map the users to an array of objects with only the required properties
    const userList = users.map(user => ({
     username: user.username,
      _id: user._id.toString(),
    }));
    console.log(userList);
    res.json(userList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post('/api/users', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging log
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const document = new User({ username });
    await document.save(); // Wait until the user is saved

    res.json({ username: document.username, _id: document._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post('/api/users/:_id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const { _id } = req.params;

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  let exerciseDate = date ? new Date(date) : new Date();

  if (isNaN(exerciseDate)) {
    return res.status(404).json({ error: "Invalid Date format" });
  }

  const document = new Exercise({
    userId: _id,
    description: description,
    duration: duration,
    date: exerciseDate
  });

  await document.save();

  res.json({
    username: user.username,
    _id: user._id,
    description: document.description,
    duration: document.duration,
    date: document.date.toISOString().split("T")[0] // ISO date string format (yyyy-mm-dd)
  });
});





app.get('/api/users/:_id/logs',async(req,res)=>{

  try{
  const {_id}=req.params;
  let {from,to,limit}=req.query;
  

  // search the user
  const user= await User.findById(_id);

  if(!user){
    return res.json({error:"User not found"});
  }

  // find exercise logs

let userExercises=await Exercise.find({userId:_id});
 // Filter by 'from' date
 if (from) {
  const fromDate = new Date(from);
  userExercises = userExercises.filter(exercise => new Date(exercise.date) >= fromDate);
}

// Filter by 'to' date
if (to) {
  const toDate = new Date(to);
  userExercises = userExercises.filter(exercise => new Date(exercise.date) <= toDate);
}

// Limit the number of exercises returned
if (limit) {
  limit = parseInt(limit);
  userExercises = userExercises.slice(0, limit);
}

  //format the exercises for necessary fields
  const exerciseLogs=userExercises.map(exercise=>({
    description:exercise.description,
    duration:exercise.duration,
    date:new Date(exercise.date).toDateString(),
  }));

  res.json({username:user.username
    ,id:user._id
    ,count:userExercises.length,
    log:exerciseLogs,})

  }
  catch(error){

    res.status(500).json({error:"Internal Server Error"});
  }
  

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
