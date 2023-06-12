const Ride= require("../models/ride.model");
const objectConverter= require("../utils/objectConverter")
const createRide= async function(req,res)
{
    const rideObject={
        source: req.body.source,
        destination: req.body.destination,
        drivername: req.body.drivername,
        fare: req.body.fare,
        ratings: req.body.ratings
    }
    try{
        const ride= await Ride.create(rideObject);
        res.status(200).send("Ride Successfully Created")
    }
    catch(err)
    {
        console.log("Some error happened while creating ride",err.message)
        res.status(500).send({
            message: "Some Internal Error!"
        })
    }
}
const getRideDetails= async function (req,res)
{
    let rides;
    try
    {
        rides= await Ride.find()
    }
    catch(err)
    {
        console.log("Error while fetching the rides")
        res.status(500).send({
            message:"Some Internal Error Occured"
        })
    }
    res.status(200).send(objectConverter.rideListResponse(rides))
}
module.exports={
    createRide,
    getRideDetails
}