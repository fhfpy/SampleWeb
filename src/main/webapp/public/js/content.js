function $childNode(o) {
    return window.frames[o]
}

function animationHover(o, e) {
    o = $(o), o.hover(function() {
        o.addClass("animated " + e)
    }, function() {
        window.setTimeout(function() {
            o.removeClass("animated " + e)
        }, 2e3)
    })
}

function WinMove() {
    var o = "[class*=col]",
        e = ".ibox-title",
        i = "[class*=col]";
    $(o).sortable({
        handle: e,
        connectWith: i,
        tolerance: "pointer",
        forcePlaceholderSize: !0,
        opacity: .8
    }).disableSelection()
}
var $parentNode = window.parent.document;
if ($(".tooltip-demo").tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    }), $(".modal").appendTo("body"), $("[data-toggle=popover]").popover(), $(".collapse-link").click(function() {
        var o = $(this).closest("div.ibox"),
            e = $(this).find("i"),
            i = o.find("div.ibox-content");
        i.slideToggle(200), e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"), o.toggleClass("").toggleClass("border-bottom"), setTimeout(function() {
            o.resize(), o.find("[id^=map-]").resize()
        }, 50)
    }), $(".close-link").click(function() {
        var o = $(this).closest("div.ibox");
        o.remove()
    }), top == this) {
	/*var gohome = '<div class="gohome"><a class="animated bounceInUp" href="sampleList" title="样品列表"><i class="fa fa-home"></i></a></div>';
    var gocart = '<div class="gocart"><a class="animated bounceInUp" href="checkList" title="选样列表"><i class="fa fa-cart-plus"></i></a></div>';
    var goplate = '<div class="goplate"><a class="animated bounceInUp" href="plate" title="板块栏"><i class="fa fa-heart"></i></a></div>';
    var goclothing = '<div class="goclothing"><a class="animated bounceInUp" href="clothing" title="样衣栏"><i class="fa fa-female"></i></a></div>';
    $("body").append(gohome)
    $("body").append(gocart)
    $("body").append(goplate)
    $("body").append(goclothing)*/
}