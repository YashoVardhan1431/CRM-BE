const User= require("../models/user.model");
const {userTypes}= require("../utils/constants");
const constants=require("../utils/constants");
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const configs=require('../configs/auth.config');

const signup= async function(req,res)
{
    let userStatus;
    if(req.body.userType==userTypes.engineer||req.body.userType==userTypes.admin)
    {
        userStatus=constants.userStatus.pending;
    }
    else
    {
        userStatus=constants.userStatus.approved;
    }
    let userObj={
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        userType:req.body.userType,
        password:bcrypt.hashSync(req.body.password,8),
        userStatus:userStatus
    }
    try
    {
        const userCreated= await User.create(userObj);
        const postResonse={
            name:userCreated.name,
            userId:userCreated.userId,
            email:userCreated.email,
            userType:userCreated.userType,
            userStatus:userCreated.userStatus
        }
        res.status(201).send(postResonse)
    }
    catch(err)
    {
        console.log("Something went wrong while saving to DB");
        res.status(500).send({
            message:"Some internal error while inserting the element"
        })
    }   
}
const signin= async function(req,res)
{
    const user= await User.findOne({
        userId: req.body.userId
    })
    if(!user)
    {
        res.status(400).send({
            message: "Failed! Userid doesn't exist"
        })
    }
    if(user.userStatus!=constants.userStatus.approved)
    {
        res.status(403).send({
            message:`Can't allow login as user is in status :[${user.userStatus}]`
        })
        return
    }
    let passwordIsValid= bcrypt.compareSync(req.body.password,user.password);
    if(!passwordIsValid)
    {
        res.status(401).send({
            message:"Invalid Password!"
        })
        return;
    }
    let token= jwt.sign({userId:user.userId},configs.secret,{expiresIn: 86400});
    res.status(200).send({
      name:user.name,
      userId:user.userId,
      email: user.email,
      userStatus:user.userStatus,
      userType:user.userType,
      accessToken:token
    })
}
module.exports={
    signup,
    signin
}