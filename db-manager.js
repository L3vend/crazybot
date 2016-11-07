var mongoose = require ("mongoose");

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://heroku_8r3xjmdj:pj1rkbpa4cldn0654pgjg1evds@ds145997.mlab.com:45997/heroku_8r3xjmdj';

var userModel ;
var localUserList = [] ;

module.exports =
{
    init : function() 
    {
        // Connect with database
        mongoose.connect(uristring, function (err, res) {
            if (err) 
            { 
                console.log ('ERROR wjile connecting to database: ' + err);
            } 
            else 
            {
                console.log ('Connection to database succeeded');
                sync() ;
             }
        });

        // Create Schema for a user
        var userSchema = new mongoose.Schema({
            name: String ,
            stars: { type: Number, min: 0}
        });

        userModel = mongoose.model('User', userSchema);
    } ,

    clear : function()
    {
        // Clear out old data
        userModel.remove({}, function(err) {
            if (err) {
                console.log ('Clear database failed.');
            }
        });        
    } ,

    createFakeUser : function(name)
    {
        var fakeUser = new userModel ({
            name: name,
            stars: 0
        });

            // Saving it to the database.  
        fakeUser.save(function (err) {if (err) console.log ('createFakeUser failed')});
    } ,

    getRandomUser : function()
    {
        if ( localUserList.length > 0 ) {
            return localUserList[Math.floor(Math.random() * localUserList.length)] ;
        }

        return "" ;
    }
} ;

function sync() {
    userModel.find({}).exec(function(err, results) { 
        localUserList = [] ;
        results.forEach(function(item) {
            localUserList.push(item.name);
        });
    }) ;
}