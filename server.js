const express = require('express'),
    app = express(),
    exphbs = require('express-handlebars'),
    admin = require("firebase-admin"),
    http = require('http').Server(app),
    url = require('url'),
    io = require('socket.io')(http);



var serviceAccount = require("./static/privateKeys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://heatmap-1a704.firebaseio.com"
});

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));


app.set('view engine', 'hbs');

app.use('/', express.static('static'));

app.get('/', function (req, res) {
    res.render('input', {
        input: true
    });
})
app.get('/display', function (req, res) {
    res.render('display', {
        dispay: true
    });
})
app.get('/input', function (req, res) {
    res.render('input', {
        input: true
    });
})

http.listen(3000, function () {
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
    if (input.length) {
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
    }

});


io.on('connection', function (socket) {
    console.log('a user connected');
    var points = [];
    socket.on('mouseClick', function (msg) {
        console.log('points recieved');
        if (msg) {
            var point = {
                x: msg.x,
                y: msg.y,
            };
            points.push(point);
        }

    });
    socket.on('disconnect', function (evt) {
        saveToDBPoints(points);
        console.log('user disconnected');
    });
});

function saveToDBPoints(points) {
    var pointsRef = dataRef;
    var data = {
        data: JSON.stringify(points)
    };
    pointsRef.update(data).then(function (res) {
        console.log('saved');
    }).catch(function (err) {
        console.log(err);
    })


}

function saveToDB(data) {
    newRef.update({
        data: JSON.stringify(data)
    }).then(function (res) {
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