const rideController= require('../controllers/ride.controller')
module.exports= function(app)
{
    app.post('/ride/api/create',rideController.createRide)
    app.get('/ride/api/getRideDetails',rideController.getRideDetails)
}