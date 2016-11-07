var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var dbManager = require('./db-manager')

var app = express()
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// init database
dbManager.init() ;

// For testing purpose only
// dbManager.clear() ;
// dbManager.createFakeUser('slackbot') ;
// dbManager.createFakeUser('aamurray') ;

var slack_url = "https://hooks.slack.com/services/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"

var next_push_up_interval_delay = Math.floor((Math.random() * 10) + 1) * 1000 * 60 ;

var dispatch_push_up = function() {
    
    var randomUser = dbManager.getRandomUser() ;
    var numPushUps = Math.floor((Math.random() * 10) + 10);

    request({
        url: slack_url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            "username" : "crazytrainer",
            "icon_emoji" : ":weight_lifter:" ,
            "text" : "<@" + randomUser + "> do " + numPushUps + " push-ups"
        }
    } , function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    next_push_up_interval_delay = Math.floor((Math.random() * 10) + 1) * 1000 ;
    console.log('Next push-up in :', next_push_up_interval_delay / 1000 , 'seconds');
    setTimeout( function() { dispatch_push_up() ; } , next_push_up_interval_delay ) ;
}

setTimeout( function() { dispatch_push_up() ; } , 1000 ) ;

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
})

app.post('/slack', function(req,res,next) {
    var userName = req.body.user_name ;
    var payload = {
        text: 'Yo'
    };

    console.log('slack request');
    console.log("Username is : " , userName);

    return res.status(200).json(payload);
});