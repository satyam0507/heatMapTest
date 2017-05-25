var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

var admin = require("firebase-admin");

const http = require('http');
const url = require('url');
const WebSocket = require('ws');


var serviceAccount = require("./static/privateKeys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://heatmap-1a704.firebaseio.com"
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//web socket

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});
//web socket ends

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));


app.set('view engine', 'hbs');

app.use('/', express.static('static'));

app.get('/', function (req, res) {
    res.render('input', { input: true });
})
app.get('/display', function (req, res) {
    res.render('display', { dispay: true });
})
app.get('/input', function (req, res) {
    res.render('input', { input: true });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


var databaseRef = admin.database().ref();

var dataRef = databaseRef.child('/points');
var newRef = databaseRef.child('/newPoints');

dataRef.on('child_changed', function (snapshot, prevChildKey) {
    var readAbleData = snapshot.val();
    var data = JSON.parse(readAbleData);
    var input = data;
    var newArray = [];
    do {
        var oldObj = {
            x: input[0].x,
            y: input[0].y
        }
        var obj = modifyArray(input);
        oldObj.count = obj.count;
        newArray.push(oldObj);
        input = obj.newData;
    } while (input.length > 0);

    saveToDB(newArray);

});

function saveToDB(data) {
    newRef.update({ data: JSON.stringify(data) }).then(function (res) {
        console.log('done');
    }).catch(function (err) {
        console.log(err);
    })
}

function modifyArray(data) {
    const xMargin = 10;
    const yMargin = 10;
    const x = data[0].x;
    const y = data[0].y;
    var count = 0;
    var newData = data.filter(function (dataObj) {
        console.log(dataObj);
        if (Math.abs(x - dataObj.x) >= xMargin && Math.abs(y - dataObj.y) >= yMargin) {
            return true;
        } else {
            count++;
        }
    });
    return {
        newData: newData,
        count: count
    }
}

