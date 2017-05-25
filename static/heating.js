
function getPos(e) {
  x = e.pageX;
  y = e.pageY;
  cursor = "Your Mouse Position Is : " + x + " and " + y;
  document.getElementsByClassName("heatmap-ctn").innerHTML = cursor;
  // var _, heatmapInstance, points, max, width, height, len, val, point, data;
  // _ = require("prelude-ls");
  heatmapInstance = h337.create({
    container: document.querySelector('.heatmap-ctn')
  });

  // points = [{ x: 344, y: 550 }, { x: 757, y: 540 }, { x: 754, y: 426 }, { x: 664, y: 540 }, { x: 435, y: 581 },];
  readData().then(function (points) {
    max = 0;
    width = 1100;
    height = 300;
    len = 1000;

    data = {
      // max: max,
      data: points,

    };
    console.log(points);
    heatmapInstance.setData(data);

  }).catch(function (err) {
    console.log(err);
  })

}


function readData() {
  return new Promise(function (resolve, reject) {
    var dbRef = firebase.database().ref();
    var pointsRef = dbRef.child('/newPoints');
    pointsRef.once('value', function (dataSnap) {
      if (dataSnap) {
        var readableData = dataSnap.val();
        resolve(JSON.parse(readableData.data));
      } else {
        reject('err');
      }
    });
  })

}
function stopTracking() {
  document.getElementsByClassName("heatmap-ctn").innerHTML = "";
}




