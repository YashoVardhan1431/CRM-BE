const express= require('express');
const mongoose=require('mongoose');
const dbConfig= require('./configs/db.config')
const app=express();
const User=require('./models/user.model')
const bodyParser=require('body-parser')
const constants= require('./utils/constants')
const bcrypt=require('bcryptjs')
const cors= require('cors')
app.use(cors())
mongoose.connect(dbConfig.DB_URL);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const authRoutes=require('./routes/auth.routes');
authRoutes(app)
const userRoutes=require('./routes/user.routes');
userRoutes(app)
const ticketRoutes=require('./routes/ticket.routes')
ticketRoutes(app)
const rideRoutes= require('./routes/ride.routes');
rideRoutes(app)
async function init()
{
    let user= await User.findOne({
        userId:"admin"
    })
    if(user)
    {
        console.log("Admin user is Already Present",user);
        return;
    }
    try{
        let user= await User.create({
            name: "Karan Kaura",
            userId:"admin",
            email:"karankauraadmin@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8),
            userStatus: constants.userStatus.approved
        })
        console.log(user);
    }
    catch(err)
    {
        console.log(err.message)
    }
}
const db=mongoose.connection;
db.on("error",()=>{
    console.log("Can't connect to DB")
});
db.once("open",()=>{
    console.log("Connected to MongoDB")
    init()
});
app.get("/",(req,res)=>{
    res.send("Hi")
})
app.listen(7500,()=>{
    console.log("Listening at localhost:7500")
})
