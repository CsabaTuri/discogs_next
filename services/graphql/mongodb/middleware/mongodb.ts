import  mongoose  from "mongoose";
require("dotenv").config();
mongoose.Promise = global.Promise;

const url = `${process.env.NODE_ENV === "development"?"mongodb":"mongodb+srv"}://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?authSource=admin`
console.log(url)
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.once("open", () =>
  console.log(`Connected to mongo at ${url}`)
);
