var Twit = require('twit');
var fs = require('fs');

var T = new Twit({
    consumer_key:         '0BuFHFHHf19GdlLYEuDqHvOL5',
    consumer_secret:      'ZL2nrYx5JAlFOwKbCTmFwLBqIg86g56agZaylueK6jlpRRlaun',
    access_token:         '789134220341882880-8C1CklOgl7Yo5R2cBkToLGpMkVpbMUd',
    access_token_secret:  'zbE6rAfkEW7qkMwQ9N4JYvhw9psMEXmKlKNSskMeDx16f',
});

//
//  get the list of user id's that follow @3guysinagarage
//
var twitJSON = {name: "@3guysinagarage", children: []};

T.get('friends/list', { screen_name: '3guysinagarage' },  function (err, data, response) {
    if (err) throw err;
    for(var i = 0;i < data['users'].length; i++){
        var obj = {name : "@" + data['users'][i]['screen_name'], children: []};
        console.log(obj);
        twitJSON.children.push(obj);
    }
    fs.writeFile ("input.json", JSON.stringify(twitJSON), function(err) {
        if (err) throw err;
        console.log('Twitter users written to file.');
    });
});

console.log(twitJSON);

