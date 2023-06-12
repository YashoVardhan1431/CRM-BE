exports.userResponse=(users)=>{
    let userResult=[];
    users.forEach(user=>{
        userResult.push({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus
        })
    });
    return userResult;
}
exports.ticketResponse= (ticket)=>{
    return{
        ticket: ticket.title,
        ticketPriority: ticket.ticketPriority,
        description: ticket.description,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    }
}
exports.ticketListResponse= (tickets)=>{
    let ticketResult=[];
    tickets.forEach(ticket=>{
        return ticketResult.push(exports.ticketResponse(ticket))
    })
    return ticketResult
}
exports.rideResponse= (ride)=>{
    return{
        source: ride.source,
        destination: ride.destination,
        drivername: ride.drivername,
        fare: ride.fare,
        ratings: ride.ratings,
        ridingdate_time: ride.ridingdate_time,
        updatedAt: ride.updatedAt
    }
}
exports.rideListResponse= (rides)=>{
    let rideResult=[];
    rides.forEach(ride=>{
        return rideResult.push(exports.rideResponse(ride))
    })
    return rideResult
}