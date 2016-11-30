function TileSlider($tileSlider) {
    var _this = this;

    this.$tileSlider = $tileSlider;
    this.params = $.extend({
        animationTime: 1000,
        navSliderDelay: 200,
        autoplay: false,
        autoplayDelay: 5000
    }, this.$tileSlider.data());

    this.slides = this.$tileSlider.find(".ts-slide");
    this.count = this.slides.length;

    this.currSlideIndex = 0;

    if (this.count > 1) {
        this.initNavSliders();
    }

    // preload images and set images sources for backgrounds
    $(this.slides).each(function(index, slide) {
        var imgSrc = $(slide).data("imgSrc");
        if (!imgSrc) {
            return;
        }
        var img = new Image();
        img.src = imgSrc;

        $(slide).find(".ts-item__bg").css({ backgroundImage: "url(" + imgSrc + ")" });
    });


    this.$mainSlider = this.$tileSlider.find(".tile-slider__slides");
    this.mouseOver = false;
    this.$mainSlider.on("mouseenter", function() {
        _this.mouseOver = true;
    }).on("mouseleave", function() {
        _this.mouseOver = false;
    });
    if (this.params.autoplay && this.slides.length !== 1) {
        setInterval(function() {
            !_this.mouseOver && _this.slide(_this.currSlideIndex + 1);
        }, this.params.autoplayDelay);
    }

    if (this.slides.length === 1) {
        this.$tileSlider.find(".arrow").hide();
    }
}

TileSlider.prototype.initNavSliders = function() {
    var _this = this;
    this.$tileSlider.find(".arrow-prev").on("click", function() {
        _this.slide(_this.currSlideIndex - 1);
    });
    this.$tileSlider.find(".arrow-next").on("click", function() {
        _this.slide(_this.currSlideIndex + 1);
    });
};
TileSlider.prototype.slide = function(index) {
    if (this.lock) {
        return;
    }
    this.lock = true;

    var _this = this;
    var isForward = index > this.currSlideIndex;
    var hideClass = isForward ? "hide-left" : "hide-right";

    if (index === -1) {
        index = this.count - 1;
    } else if (index === this.count) {
        index = 0;
    }


    /* change main slides */
    $(this.slides[this.currSlideIndex]).addClass(hideClass).removeClass("ts-slide_current");

    var $newSlide = $(this.slides[index]);
    var $newContent = $newSlide.find(".ts-item-3 .ts-item__content");
    $newContent.css({ "transform": "translateX(" + (isForward ? "" : "-") + "100%)" });
    $newSlide.addClass("ts-slide_current");
    setTimeout(function() {
        $newContent.css({ "transform": "" });
    }, 0);


    var prevIndex = this.currSlideIndex;
    setTimeout(function() {
        $(_this.slides[prevIndex]).removeClass(hideClass);
        _this.lock = false;
    }, this.params.animationTime + (this.params.navigation ? this.params.navSliderDelay : 0));
    this.currSlideIndex = index;
};