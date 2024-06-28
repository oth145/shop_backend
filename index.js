import express from "express";
import mongoose from "mongoose";
import routes from "./routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import  {uuidv4}  from 'uuid'; 

const app = express();
// app.use(cookieParser());
// app.use(session({
//   genid: (req) => {
//     return uuidv4();
//   },
//   resave:false,
//   saveUninitialized:true,
//   cookie:{ secure:false }
// }))
// app.use(
//   session({
//     secret: "my-key",
//     resave: false,
//     saveUninitialized: true,
//     cookie:{maxAge: 3600000}
//   })
//  );
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://othmane:ottmmanee145@database_oth.zhrzthc.mongodb.net/?retryWrites=true&w=majority&appName=database_oth/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  serverSelectionTimeoutMS: 30000,
}).then(() => {
  console.log("connected"); 
}).catch((err) => {
  console.log('not connected:', err);
});

app.get('/', (req, res) => {
  res.send("Hello from NODE API");
});
routes(app);


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("server is running" );
});
