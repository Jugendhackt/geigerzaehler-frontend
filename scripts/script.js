"use strict"
var map = L.map('map').setView([52, 13], 6);
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var heat = null;
function scale(ms) {
    var push = ms / 15;
    if (push > 1)
        push = 1;
    //push = Math.round(push);
    return push;
    //Maxvalue 15 mSv
}

$.ajax({
    url: "http://tmp.pajowu.de/api/data/?format=json",
    type: "GET",
    dataType: 'json',
    success: function(result) {
        const points = [];
        console.log(result.length)
        for (var i = 0; i < result.length; i++) {
            var point = result[i]["location"]["coordinates"];
            var sc = scale(result[i]["uSv"]);
            point.push(sc);
            points[i] = point;
        }
        console.log(points);
        L.heatLayer(points, {radius: 40, maxZoom: 1}).addTo(map);
    }
});