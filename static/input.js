var points = [];
var coordinatesX = [];
var coordinatesY = [];
var socket = io();

function getPos(e) {
    x = e.pageX;
    y = e.pageY;
    cursor = "Your Mouse Position Is : " + x + " and " + y;
    document.getElementById("displayArea").innerHTML = cursor;

}

function getclickPos(e) {
    x = e.pageX;
    y = e.pageY;
    cursor2 = "Your Mouse click Position Is : " + x + " and " + y + "and records are X = " + coordinatesX + " y = " + coordinatesY;
    document.getElementById("displayArea2").innerHTML = cursor2;
    point = {
        x: x,
        y: y,
    };
    points.push(point);
    socket.emit('mouseClick',point);

    // saveToDB(points);

}

function stopTracking() {
    document.getElementById("displayArea").innerHTML = "";
}

// function saveToDB(points) {
//     var dbRef = firebase.database().ref();
//     var pointsRef = dbRef.child('/points');
//     var data = {
//         data: JSON.stringify(points)
//     };
//     pointsRef.update(data).then(function (res) {
//         console.log('saved');
//     }).catch(function (err) {
//         console.log(err);
//     })


// }

// window.addEventListener("beforeUnload", function (event) {
//     console.log("asdas");
//    saveToDB(points);
//     console.log("done");    
// });