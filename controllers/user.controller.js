const User= require('../models/user.model');
const objectConverter= require('../utils/objectConverter')
const fetchAll= async function (res)
{
    let users;
    try
    {
        users= await User.find()
    }
    catch(err)
    {
        console.log("Error while fetching the users")
        res.status(500).send({
            message:"Some Internal Error Occured"
        })
    }
    return users;
}
const fetchByName=async function (userNameReq,res)
{
    let users;
    try
    {
        users= await User.findOne(
            {
                name: userNameReq
            }
        )
    }
    catch(err)
    {
        console.log("Error while fetching the users")
        res.status(500).send({
            message:"Some Internal Error Occured"
        })
    }
    return users;
}
const fetchByTypeAndStatus= async function(userTypeReq,userStatusReq,res)
{
    let users;
    try
    {
        users= await User.findOne(
            {
                userType: userTypeReq,
                userStatus: userStatusReq
            }
        )
    }
    catch(err)
    {
        console.log(`Error while fetching the user for userType [${userTypeReq}] and userStatus [${userStatusReq}]`)
        res.status(500).send({
            message:"Some Internal Error Occured"
        })
    }
    return users;
}
const fetchByType= async function(userTypeReq)
{
    let users;
    try
    {
        users= await User.findOne(
            {
                userType: userTypeReq
            }
        )
    }
    catch(err)
    {
        console.log(`Error while fetching the user for userType [${userTypeReq}]`)
        res.status(500).send({
            message:"Some Internal Error Occured"
        })
    }
    return users;
}
const fetchByStatus= async function(req,res)
{
    let users;
    try
    {
        users= await User.findOne(
            {
                userStatus: userStatusReq
            }
        )
    }
    catch(err)
    {
        console.log(`Error while fetching the user for userStatus [${userStatusReq}]`)
        res.status(500).send({
            message:"Some Internal Error Occured"
        })
    }
    return users;

}

const findAll=async function(req,res)
{
    let users;
    let userTypeReq= req.params.userType;
    let userStatusReq=req.params.userStatus;
    let userNameReq=req.params.name;
    if(userNameReq)
    {
        users=await fetchByName(userNameReq,res);
    }
    else if(userTypeReq&&userStatusReq)
    {
        users=await fetchByTypeAndStatus(userTypeReq,userStatusReq,res)
    }
    else if(userTypeReq)
    {
        users=await fetchByType(userTypeReq,res);
    }
    else if(userStatusReq)
    {
        users=await fetchByStatus(userStatusReq,res);
    }
    else
    {
        users=await fetchAll(res)
    }
    res.status(200).send(objectConverter.userResponse(users))
}
const findById= async function(req,res)
{
    let userIdReq=req.params.userId;
    let user;
    try
    {
        user= await User.find(
            {
                userId: userIdReq
            }
        )
    
    
    }
    catch(err)
    {
        res.status(500).send(
            {
                message:"Some Internal Server Error"
            }
        )
    }
    console.log(user)
    if(user.length>0)
    {
        res.status(200).send(objectConverter.userResponse(user))
    }
    else
    {
        res.status(400).send({
            message:`User with this id [${userIdReq}] is not present`
        })
    }
}
const update= async function(req,res)
{
   const userIdReq= req.params.userId;
   try{
   const user= await User.findOneAndUpdate({
     userId: userIdReq
   },{
     userStatus: req.body.userStatus
   }).exec()
   if(user)
   {
    res.status(200).send({
        message: "User Record has been successfully updated"
    })
   }
   else
   {
    res.status(400).send({
        message: "No user with id found"
    })
   }
   }
   catch(err)
   {
     console.log('Error while updating the record',err.message)
     res.status(500).send({
        message:"Some Internal Error Occured"
     })
   }
}
module.exports={
    findAll,
    findById,
    update
}