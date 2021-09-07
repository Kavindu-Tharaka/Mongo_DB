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
  price: {
    type: Number
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
    price: 12.00,
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

async function getCourses(){

  // $eq => equal
  // $ne => not equal
  // $gt => greater than
  // $gte => greater than or equal
  // $lt => lesser than
  // $lte => lesser than or equal
  // $in => in
  // $nin => not in

  // or
  // and

  const pageNumber = 2;
  const pageSize = 10;

  // /api/v1/courses?pageNumber=2&pageSize=10

  const courses = await Course
                          //.find({price: {$gte: 10}})               // greater than or equal 10
                          //.find({price: {$gte: 10, $lt: 20}})      // greater than or equal 10 && lesser than 20
                          //.find({price: {$in: [10, 11, 14]} })     // equal to 10 or 11 or 14
                          .find()
                          .or([{name: 'author'}, {price: 15.00}])

                          .skip((pageNumber - 1) * pageSize)
                          .limit(pageSize)

                          .sort({name: 1})
                          // .select({name: 1, author: 1})            // only return these attributes of returned docs.
                          .count();                                   // count the # of documents returned

  console.log(courses);
}

