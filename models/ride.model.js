const mongoose=require('mongoose');
const rideSchema= mongoose.Schema({
    source:{
        type:String,
        required:true
    },
    destination: {
        type: String,
        required: true,
    },
    drivername: {
        type: String,
        required: true,
    },
    ridingdate_time: {
        type: Date,
        immutable: true,
        default: ()=> Date.now()
    },
    fare:{
        type:Number,
        required: true,
    },
    ratings:{
        type:Number,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: ()=> Date.now()
    },
})
module.exports= mongoose.model("Ride",rideSchema);