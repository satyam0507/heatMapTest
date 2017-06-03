var points = [];
var coordinatesX = [];
var coordinatesY = [];
var selectorArray = [];
var startTime;
var endTime;

function getPos(e) {
    x = e.pageX;
    y = e.pageY;
    cursor = "Your Mouse Position Is : " + x + " and " + y;
    document.getElementById("displayArea").innerHTML = cursor;

}

function getclickPos(e) {
    x = e.pageX;
    y = e.pageY;
    var selector = selectorQuery(e.target);
    cursor2 = "Your Mouse click Position Is : " + x + " and " + y + "and records are X = " + coordinatesX + " y = " + coordinatesY;
    document.getElementById("displayArea2").innerHTML = cursor2;
    point = {
        x: x,
        y: y,
    };
    points.push(point);
    selectorArray.push(selector);



    // saveToDB(points);

}

function stopTracking() {
    document.getElementById("displayArea").innerHTML = "";
}

function jsonp(url, params) {
    var query;
    if (url.indexOf("?") !== -1) {
        query = "&";
    } else {
        query = "?";
    }
    params = params || {};
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
    }
    return url + query;
}



function saveData() {
    endTime = new Date();
    var dataToSend = {
        data: {
            coord: points,
            selector: selectorArray,
            domain: location.origin,
            path: location.pathname,
            activeTime: TimeMe.getTimeOnCurrentPageInSeconds(),
            timeOnPage: Math.abs((endTime - startTime) / 1000)
        }
    }
    window.navigator.sendBeacon ? sendUsingBeacon(dataToSend) : makeXMLRequest(dataToSend);
}

function makeXMLRequest(dataToSend) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (res) {
        // Process the server response here.
        console.log(res);
    };
    request.open('POST', 'https://devheat.notifyvisitors.com/s/collect', false);
    request.setRequestHeader('Content-Type', 'text/plain');
    request.send(JSON.stringify(dataToSend));
}

function sendUsingBeacon(dataToSend) {
    if (!dataToSend) {
        var dataToSend = {
            data: {
                coord: points,
                selector: selectorArray,
                domain: location.origin,
                path: location.pathname,
                activeTime: TimeMe.getTimeOnCurrentPageInSeconds(),
                timeOnPage: Math.abs((endTime - startTime) / 1000)
            }
        }
    }

    // var url = jsonp('https://devheat.notifyvisitors.com/s/collect?ha=ha',dataToSend);
    navigator.sendBeacon('https://devheat.notifyvisitors.com/s/collect', JSON.stringify(dataToSend));
}

function DOMContentListner(event) {
    startTime = new Date();
    TimeMe.initialize({
        currentPageName: location.href, // current page
        idleTimeoutInSeconds: 30 // seconds
    });
}

window.addEventListener('DOMContentLoaded', DOMContentListner);
window.addEventListener('unload', saveData, false);












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