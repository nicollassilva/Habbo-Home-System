Home = {
    ajaxInventory: function (e) {
        $("p.preview").css({ display: "none" }),
            Home.emptyPreview(),
            $.ajax({
                url: "ajaxHomeN/ListItems",
                type: "POST",
                data: { id: e },
                beforeSend: function () {
                    $(".items").html(
                        '<div class="flex" style="width: 100%;height:300px;float:left;"><img src="https://1.bp.blogspot.com/-O1sc8V60LfU/XK0oYjBssTI/AAAAAAABOsg/pHUQpJ4XOcofICaWw0djp4mdy0dMtHB4gCKgBGAs/s1600/progressbubbles.gif" alt="Carregando"></div>'
                    );
                },
                success: function (e) {
                    setTimeout(function () {
                        $(".items").html(e);
                    }, 1500);
                },
            });
    },
    setActive: function (e) {
        $(".category.active").removeClass("active"), e.classList.add("active");
    },
    previewItem: function (e, t = 1, o = 0, n = "") {
        let a;
        (a =
            2 != t
                ? `<button class="place" onclick="Home.putItem('${e}')">Colocar</button>`
                : `\n<p class="total flex">\n<i class="price-item"></i>\nCusto: <b>${o} moedas</b>\n</p>\n<p class="has flex">\n<i class="money-user"></i>\nTenho: <b>100 moedas</b>\n</p>\n<button class="place" onclick="Home.buyItem('${n}', ${o})">Comprar</button>`),
            $(".img-preview").css({ backgroundImage: 'url("/widgets/' + e + '")' }),
            "backgrounds" === e.split("/")[0] &&
                ($("p.preview").css({ display: "block" }),
                $("p.preview").one("click", function () {
                    let t = Home.replaceArray(["backgrounds", "background", "/"], "", e);
                    Home.previewBackground(t);
                }),
                (a = `<button class="place" onclick="Home.putItem('${e}', 2)">Colocar</button>`)),
            $(".price").html(a),
            $("button.place").click(function () {
                $(this).attr("disabled", !0),
                    setTimeout(() => {
                        $(this).attr("disabled", !1);
                    }, 1500);
            });
    },
    emptyPreview: function () {
        $(".img-preview").css({ backgroundImage: 'url("/img/progress_bubbles.gif")' }),
            $(".price").html(""),
            setTimeout(function () {
                $(".img-preview").css({ backgroundImage: 'url("/img/preview_background.gif")' });
            }, 1500);
    },
    previewBackground: function (e) {
        Modal.Hide(),
            setTimeout(function () {
                $(".container").css({ backgroundImage: 'url("/widgets/backgrounds/background' + e + '")', backgroundPosition: "initial", backgroundRepeat: "initial" }), Modal.Hide();
            }, 1e3);
    },
    replaceArray: function (e, t, o) {
        for (var n, a = o, i = 0; i < e.length; i++) (n = new RegExp(e[i], "g")), (a = a.replace(n, t));
        return a;
    },
    draggable: function () {
        $(".draggable").draggable({ containment: ".container" });
    },
    roundNumber: function (e) {
        return Math.round(100 * e) / 100;
    },
    setContent: function (e) {
        Home.emptyPreview(), $(".menu > .active").removeClass("active"), 1 === e ? $(".inventory").addClass("active") : $(".shop").addClass("active"), Home.changeItems(e);
    },
    changeItems: function (e) {
        $("p.preview").css({ display: "none" }),
            $.ajax({
                url: "ajaxHomeN/changeItems",
                type: "POST",
                data: { id: e },
                beforeSend: function () {
                    $(".items").html(""), $(".categories").html("");
                },
                success: function (e) {
                    setTimeout(function () {
                        $(".categories").html(e);
                    }, 1500);
                },
            });
    },
    ajaxShop: function (e) {
        Home.emptyPreview(),
            $("p.preview").css({ display: "none" }),
            $.ajax({
                url: "ajaxHomeN/ListShop",
                type: "POST",
                data: { id: e },
                beforeSend: function () {
                    $(".items").html(
                        '<div class="flex" style="width: 100%;height:300px;float:left;"><img src="https://1.bp.blogspot.com/-O1sc8V60LfU/XK0oYjBssTI/AAAAAAABOsg/pHUQpJ4XOcofICaWw0djp4mdy0dMtHB4gCKgBGAs/s1600/progressbubbles.gif" alt="Carregando"></div>'
                    );
                },
                success: function (e) {
                    setTimeout(function () {
                        $(".items").html(e);
                    }, 1500);
                },
            });
    },
    buyItem: function (e, t) {
        Modal.Confirm(`Home.purchaseItem('${e}', ${t})`, "");
    },
    purchaseItem: function (e, t) {
        $.ajax({
            url: "ajaxHomeN/buyItem",
            type: "POST",
            dataType: "JSON",
            data: { n: e, p: t },
            success: function (e) {
                setTimeout(function () {
                    Modal.Show("Habbo Home System", e.alert, !0, !0);
                }, 1e3);
            },
        });
    },
    putItem: function (e, t = 1) {
        let o = ["stickers", "backgrounds", "notes", "elements", "/"];
        if (((e = Home.replaceArray(o, "", e)), 1 === t)) {
            (o = [".gif", ".png"]), (e = Home.replaceArray(o, "", e));
            let t = document.createElement("div");
            t.classList.add("draggable", e, "stickersiNicollas"),
                setTimeout(function () {
                    $(".container").append(t).hide().fadeIn("2000"), Home.draggable(), Home.methodzIndex(), Modal.Hide();
                }, 200);
        } else (e = e.replace("background", "", e)), Home.previewBackground(e);
    },
    getRandomInt: function (e, t) {
        return (e = Math.ceil(e)), (t = Math.floor(t)), Math.floor(Math.random() * (t - e)) + e;
    },
    methodzIndex: function () {
        document.querySelectorAll(".draggable").forEach(function (e) {
            e.addEventListener("click", function () {
                let e = void 0 === $(this)[0].style.zIndex ? 1 : $(this)[0].style.zIndex;
                $(this).css("zIndex", ++e);
            });
        });
    },
    toSave: function () {
        let e = [];
        document.querySelector(".iNicollasoffset");
        $(".container > .stickersiNicollas").each(function (t, o) {
            let n = $(this).offset(),
                a = Home.roundNumber(n.left - 487),
                i = Home.roundNumber(n.top - 401),
                s = void 0 === $(this)[0].style.zIndex ? 1 : $(this)[0].style.zIndex;
            e[t] += [a, i, s, Home.replaceArray(["draggable", "stickersiNicollas", "undefined-", "undefined", "ui-", "ui--handle", "-handle"], "", $(this).attr("class"))];
        }),
            $.ajax({
                url: "ajaxHomeN/saveItems",
                type: "POST",
                dataType: "JSON",
                data: { n: e },
                beforeSend: function () {
                    Modal.Show("Habbo Home System", "Aguarde...", !0, !0);
                },
                success: function (e) {
                    console.log(e);
                },
            });
    },
};
