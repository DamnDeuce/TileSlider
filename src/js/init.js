"use strict";
$(function() {
    console.log('start');
    $(".tile-slider").each(function() {
        var ts = new TileSlider($(this));
    });

});