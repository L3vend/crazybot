var express = require('express')
var request = require('request');

var app = express()
app.set('port', (process.env.PORT || 5000));

var interval = setTimeout(function() {

    var url = "https://hooks.slack.com/services/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"
    var body = {
        "text" : "hello man !!"
    };

    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            "username" : "crazypushup",
            "text" : "<@slackbot> do 100 push-ups"
        }
    } , function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}, 1000);

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
})

app.post('/slack', function(req,res,next) {
    //var userName = req.body.user_name ;
    var payload = {
        text: 'Yo'
    };

    console.log('slack poke me', app.get('port'));

    return res.status(200).json(payload);
});