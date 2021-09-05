const mongoose = require("mongoose");

//connect to Mongo DB
mongoose
  .connect(
    'mongodb://localhost:27017/myapp',
    {
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    }
  )
  .then(() => console.log("Connected to mongoose..."))
  .catch((err) => console.log(err));

//create schema
const courseSchema = mongoose.Schema({
  name: {
    type: String
  },
  author: {
    type: String
  },
  tags: [{
      type: String
  }],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean
  },
});

// compile our model (Course is a class)
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  //create a new Course object
  const course = new Course({
    name: "Mongo DB",
    author: "KTM",
    tags: ["mongodb", "database"],
    isPublished: true,
  });

  //save a document
  try {
    const result = await course.save();
  } catch (err) {
    console.log(err);
  }
}

createCourse();
