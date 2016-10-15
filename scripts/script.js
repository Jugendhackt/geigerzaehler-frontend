var map = L.map('map').setView([52, 13], 4);
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var heat = null;
function scale(ms) {
    var push;
    push = ms / 15;
    if (push > 1)
        push = 1;
    return push;
}

$.ajax({
    url: "http://tmp.pajowu.de/api/data/?format=json",
    type: "GET",
    dataType: 'json',
    success: function(result) {
        var points = [];
        for (var i = 0; i < result.length; i++) {
            var point = result[i]["location"]["coordinates"];
            point.push(scale(result[i]["mSv"]));

            //for (var j = 0; j < result[i]["count"]; j++)
                points.push(point);
            //Maxwert 15 Millisivert
        }

        heat = L.heatLayer(points, {radius: 20, maxZoom: 5}).addTo(map);
    }
});
