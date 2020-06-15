Modal = {
    Show: function (t, e, o, l) {
        var i = Math.round(1e4 * Math.random());
        (html = ""),
            (html += '<div class="Modal alert alert' + i + '">'),
            (html += void 0 !== l ? '\t<div class="ModalBox ModalBoxSmall alert">' : '\t<div class="ModalBox">'),
            (null != o && !1 === o) || (html += '\t\t\t<button class="ModalExit" onclick="Modal.Hide(' + i + ')"><i class="fas fa-times"></i></button>'),
            (html += '\t\t<div class="ModalTitle">' + t + "</div>"),
            (html += '\t\t<div class="ModalContent">' + e + "</div>"),
            (html += "\t</div>"),
            (html += "</div>"),
            $("body").append(html).css("overflow-y", "hidden");
        var a = $(".Modal.alert" + i),
            d = a.find(".ModalBox");
        if (d.innerHeight() <= a.height() && $(window).width() > 870) {
            var s = $(window).height() / 2 - d.innerHeight() / 2 - (a.innerHeight() - a.height()) / 2;
            d.css("top", s);
        } else d.css("top", "0");
        setTimeout(function () {
            a.addClass("active");
        }, 10);
    },
    Target: function (t) {
        var e = $(".Modal" + t),
            o = e.find(".ModalBox"),
            l = $(".Modal.active").length;
        if (e.length) {
            if (($(".Modal").not(e).removeClass("active"), o.innerHeight() <= e.height() && $(window).width() > 870)) {
                var i = $(window).height() / 2 - o.innerHeight() / 2 - (e.innerHeight() - e.height()) / 2;
                o.css("top", i);
            } else o.css("top", "0");
            l > 0
                ? setTimeout(function () {
                      e.addClass("active");
                  }, 200)
                : e.addClass("active"),
                $("body").css("overflow-y", "hidden"),
                setTimeout(function () {
                    $(".GHmodalRemove").removeClass("active");
                }, 500);
        }
    },
    Hide: function (t) {
        null == t
            ? ($(".Modal:not(.alert)").removeClass("active"),
              setTimeout(function () {
                  $("body").css("overflow-y", "auto");
              }, 200))
            : ($(".Modal.alert" + t).removeClass("active"),
              setTimeout(function () {
                  $("body").css("overflow-y", "auto");
              }, 200));
    },
    Confirm: function (t, e) {
        var o = Math.round(1e4 * Math.random());
        (html = ""),
            (html += '<div class="Modal alert' + o + '" id="alert">'),
            (html += '\t<div class="ModalBox ModalBoxSmall">'),
            (html += '\t\t<div class="ModalTitle">Tem certeza de que quer comprar este produto?</div>'),
            (html += '\t\t<div class="ModalContent">'),
            (html += "\t\t\t<center>"),
            (html += "\t\t\t\t<button onclick=\"Modal.AlertRemove('all', false); " + t + '">SIM</button>'),
            (html += '\t\t\t\t<button onclick="Modal.AlertRemove(' + o + ', false);">NÃO</button>'),
            (html += "\t\t\t</center>"),
            (html += "\t\t</div>"),
            (html += "\t</div>"),
            (html += "</div>"),
            $("body").append(html).css("overflow-y", "hidden");
        var l = $(".Modal.alert" + o),
            i = l.find(".ModalBox");
        if (i.innerHeight() <= l.height() && $(window).width() > 870) {
            var a = $(window).height() / 2 - i.innerHeight() / 2 - (l.innerHeight() - l.height()) / 2;
            i.css("top", a);
        } else i.css("top", "0");
        setTimeout(function () {
            l.addClass("active");
        }, 200),
            setTimeout(function () {
                $(".GHmodalRemove").removeClass("active");
            }, 500);
    },
    AlertRemove: function (t, e) {
        "all" == t ? $(".Modal").removeClass("active") : $("#alert.alert" + t).removeClass("active"), void 0 !== e && $("body").css("overflow-y", "auto");
    },
};
