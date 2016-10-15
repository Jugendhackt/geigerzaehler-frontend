var map = L.map('map').setView([52, 13], 4);
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var heat = null;

$.ajax({
    url: "http://tmp.pajowu.de/api/data/?format=json",
    type: "GET",
    dataType: 'json',
    success: function(result) {
        var points = [];
        for (var i = 0; i < result.length; i++) {
            var point = result[i]["location"]["coordinates"];

            for (var j = 0; j < result[i]["count"]; j++)
                points.push(point);
        }

        heat = L.heatLayer(points, {radius: 20, maxZoom: 10}).addTo(map);
    }
});
