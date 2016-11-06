var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 5000));

var request = require('request');

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
            "text" : "<@gfdbv> do 100 push-ups"
        }
    } , function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}, 1000);

app.get('/home', function (req, res) {
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