!function ($) {
    return $ ? ($.Unslider = function (t, n) {
        var e = this;
        return e._ = "unslider", e.defaults = {
            autoplay: !1,
            delay: 3e3,
            speed: 750,
            easing: "swing",
            keys: {prev: 37, next: 39},
            nav: !0,
            arrows: {prev: '<a class="' + e._ + '-arrow prev">❮</a>', next: '<a class="' + e._ + '-arrow next">❯</a>'},
            animation: "horizontal",
            selectors: {container: "ul:first", slides: "li"},
            animateHeight: !1,
            activeClass: e._ + "-active",
            swipe: !0,
            swipeThreshold: .2
        }, e.$context = t, e.options = {}, e.$parent = null, e.$container = null, e.$slides = null, e.$nav = null, e.$arrows = [], e.total = 0, e.current = 0, e.prefix = e._ + "-", e.eventSuffix = "." + e.prefix + ~~(2e3 * Math.random()), e.interval = null, e.init = function (t) {
            return e.options = $.extend({}, e.defaults, t), e.$container = e.$context.find(e.options.selectors.container).addClass(e.prefix + "wrap"), e.$slides = e.$container.children(e.options.selectors.slides), e.setup(), $.each(["nav", "arrows", "keys", "infinite"], function (t, n) {
                e.options[n] && e["init" + $._ucfirst(n)]()
            }), jQuery.event.special.swipe && e.options.swipe && e.initSwipe(), e.options.autoplay && e.start(), e.calculateSlides(), e.$context.trigger(e._ + ".ready"), e.animate(e.options.index || e.current, "init")
        }, e.setup = function () {
            e.$context.addClass(e.prefix + e.options.animation).wrap('<div class="' + e._ + '" />'), e.$parent = e.$context.parent("." + e._);
            var t = e.$context.css("position");
            "static" === t && e.$context.css("position", "relative"), e.$context.css("overflow", "hidden")
        }, e.calculateSlides = function () {
            if (e.total = e.$slides.length, "fade" !== e.options.animation) {
                var t = "width";
                "vertical" === e.options.animation && (t = "height"), e.$container.css(t, 100 * e.total + "%").addClass(e.prefix + "carousel"), e.$slides.css(t, 100 / e.total + "%")
            }
        }, e.start = function () {
            return e.interval = setTimeout(function () {
                e.next()
            }, e.options.delay), e
        }, e.stop = function () {
            return clearTimeout(e.interval), e
        }, e.initNav = function () {
            var t = $('<nav class="' + e.prefix + 'nav"><ol /></nav>');
            e.$slides.each(function (n) {
                var i = this.getAttribute("data-nav") || n + 1;
                $.isFunction(e.options.nav) && (i = e.options.nav.call(e.$slides.eq(n), n, i)), t.children("ol").append('<li data-slide="' + n + '">' + i + "</li>")
            }), e.$nav = t.insertAfter(e.$context), e.$nav.find("li").on("click" + e.eventSuffix, function () {
                var t = $(this).addClass(e.options.activeClass);
                t.siblings().removeClass(e.options.activeClass), e.animate(t.attr("data-slide"))
            })
        }, e.initArrows = function () {
            e.options.arrows === !0 && (e.options.arrows = e.defaults.arrows), $.each(e.options.arrows, function (t, n) {
                e.$arrows.push($(n).insertAfter(e.$context).on("click" + e.eventSuffix, e[t]))
            })
        }, e.initKeys = function () {
            e.options.keys === !0 && (e.options.keys = e.defaults.keys), $(document).on("keyup" + e.eventSuffix, function (t) {
                $.each(e.options.keys, function (n, i) {
                    t.which === i && $.isFunction(e[n]) && e[n].call(e)
                })
            })
        }, e.initSwipe = function () {
            var t = e.$slides.width();
            "fade" !== e.options.animation && e.$container.on({
                movestart: function (t) {
                    return t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY ? !!t.preventDefault() : void e.$container.css("position", "relative")
                }, move: function (n) {
                    e.$container.css("left", -(100 * e.current) + 100 * n.distX / t + "%")
                }, moveend: function (n) {
                    Math.abs(n.distX) / t > e.options.swipeThreshold ? e[n.distX < 0 ? "next" : "prev"]() : e.$container.animate({left: -(100 * e.current) + "%"}, e.options.speed / 2)
                }
            })
        }, e.initInfinite = function () {
            var t = ["first", "last"];
            $.each(t, function (n, i) {
                e.$slides.push.apply(e.$slides, e.$slides.filter(':not(".' + e._ + '-clone")')[i]().clone().addClass(e._ + "-clone")["insert" + (0 === n ? "After" : "Before")](e.$slides[t[~~!n]]()))
            })
        }, e.destroyArrows = function () {
            $.each(e.$arrows, function (t, n) {
                n.remove()
            })
        }, e.destroySwipe = function () {
            e.$container.off("movestart move moveend")
        }, e.destroyKeys = function () {
            $(document).off("keyup" + e.eventSuffix)
        }, e.setIndex = function (t) {
            return 0 > t && (t = e.total - 1), e.current = Math.min(Math.max(0, t), e.total - 1), e.options.nav && e.$nav.find('[data-slide="' + e.current + '"]')._active(e.options.activeClass), e.$slides.eq(e.current)._active(e.options.activeClass), e
        }, e.animate = function (t, n) {
            if ("first" === t && (t = 0), "last" === t && (t = e.total), isNaN(t)) return e;
            e.options.autoplay && e.stop().start(), e.setIndex(t), e.$context.trigger(e._ + ".change", [t, e.$slides.eq(t)]);
            var i = "animate" + $._ucfirst(e.options.animation);
            return $.isFunction(e[i]) && e[i](e.current, n), e
        }, e.next = function () {
            var t = e.current + 1;
            return t >= e.total && (t = 0), e.animate(t, "next")
        }, e.prev = function () {
            return e.animate(e.current - 1, "prev")
        }, e.animateHorizontal = function (t) {
            var n = "left";
            return "rtl" === e.$context.attr("dir") && (n = "right"), e.options.infinite && e.$container.css("margin-" + n, "-100%"), e.slide(n, t)
        }, e.animateVertical = function (t) {
            return e.options.animateHeight = !0, e.options.infinite && e.$container.css("margin-top", -e.$slides.outerHeight()), e.slide("top", t)
        }, e.slide = function (t, n) {
            if (e.options.animateHeight && e._move(e.$context, {height: e.$slides.eq(n).outerHeight()}, !1), e.options.infinite) {
                var i;
                n === e.total - 1 && (i = e.total - 3, n = -1), n === e.total - 2 && (i = 0, n = e.total - 2), "number" == typeof i && (e.setIndex(i), e.$context.on(e._ + ".moved", function () {
                    e.current === i && e.$container.css(t, -(100 * i) + "%").off(e._ + ".moved")
                }))
            }
            var o = {};
            return o[t] = -(100 * n) + "%", e._move(e.$container, o)
        }, e.animateFade = function (t) {
            var n = e.$slides.eq(t).addClass(e.options.activeClass);
            e._move(n.siblings().removeClass(e.options.activeClass), {opacity: 0}), e._move(n, {opacity: 1}, !1)
        }, e._move = function (t, n, i, o) {
            return i !== !1 && (i = function () {
                e.$context.trigger(e._ + ".moved")
            }), t._move(n, o || e.options.speed, e.options.easing, i)
        }, e.init(n)
    }, $.fn._active = function (t) {
        return this.addClass(t).siblings().removeClass(t)
    }, $._ucfirst = function (t) {
        return (t + "").toLowerCase().replace(/^./, function (t) {
            return t.toUpperCase()
        })
    }, $.fn._move = function () {
        return this.stop(!0, !0), $.fn[$.fn.velocity ? "velocity" : "animate"].apply(this, arguments)
    }, void($.fn.unslider = function (t) {
        return this.each(function () {
            var n = $(this);
            if ("string" == typeof t && n.data("unslider")) {
                t = t.split(":");
                var e = n.data("unslider")[t[0]];
                if ($.isFunction(e)) return e.apply(n, t[1] ? t[1].split(",") : null)
            }
            return n.data("unslider", new $.Unslider(n, t))
        })
    })) : console.warn("Unslider needs jQuery")
}(window.jQuery);


/*! jQuery & Zepto Lazy v1.7.5 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2017 Daniel 'Eisbehr' Kern */
!function (t, e) {
    "use strict";

    function r(r, a, i, l, u) {
        function f() {
            L = t.devicePixelRatio > 1, c(i), a.delay >= 0 && setTimeout(function () {
                s(!0)
            }, a.delay), (a.delay < 0 || a.combined) && (l.e = v(a.throttle, function (t) {
                "resize" === t.type && (w = B = -1), s(t.all)
            }), l.a = function (t) {
                c(t), i.push.apply(i, t)
            }, l.g = function () {
                return i = n(i).filter(function () {
                    return !n(this).data(a.loadedName)
                })
            }, l.f = function (t) {
                for (var e = 0; e < t.length; e++) {
                    var r = i.filter(function () {
                        return this === t[e]
                    });
                    r.length && s(!1, r)
                }
            }, s(), n(a.appendScroll).on("scroll." + u + " resize." + u, l.e))
        }

        function c(t) {
            var i = a.defaultImage, o = a.placeholder, l = a.imageBase, u = a.srcsetAttribute, f = a.loaderAttribute,
                c = a._f || {};
            t = n(t).filter(function () {
                var t = n(this), r = m(this);
                return !t.data(a.handledName) && (t.attr(a.attribute) || t.attr(u) || t.attr(f) || c[r] !== e)
            }).data("plugin_" + a.name, r);
            for (var s = 0, d = t.length; s < d; s++) {
                var A = n(t[s]), g = m(t[s]), h = A.attr(a.imageBaseAttribute) || l;
                g === N && h && A.attr(u) && A.attr(u, b(A.attr(u), h)), c[g] === e || A.attr(f) || A.attr(f, c[g]), g === N && i && !A.attr(E) ? A.attr(E, i) : g === N || !o || A.css(O) && "none" !== A.css(O) || A.css(O, "url('" + o + "')")
            }
        }

        function s(t, e) {
            if (!i.length) return void(a.autoDestroy && r.destroy());
            for (var o = e || i, l = !1, u = a.imageBase || "", f = a.srcsetAttribute, c = a.handledName, s = 0; s < o.length; s++) if (t || e || A(o[s])) {
                var g = n(o[s]), h = m(o[s]), b = g.attr(a.attribute), v = g.attr(a.imageBaseAttribute) || u,
                    p = g.attr(a.loaderAttribute);
                g.data(c) || a.visibleOnly && !g.is(":visible") || !((b || g.attr(f)) && (h === N && (v + b !== g.attr(E) || g.attr(f) !== g.attr(F)) || h !== N && v + b !== g.css(O)) || p) || (l = !0, g.data(c, !0), d(g, h, v, p))
            }
            l && (i = n(i).filter(function () {
                return !n(this).data(c)
            }))
        }

        function d(t, e, r, i) {
            ++z;
            var o = function () {
                y("onError", t), p(), o = n.noop
            };
            y("beforeLoad", t);
            var l = a.attribute, u = a.srcsetAttribute, f = a.sizesAttribute, c = a.retinaAttribute,
                s = a.removeAttribute, d = a.loadedName, A = t.attr(c);
            if (i) {
                var g = function () {
                    s && t.removeAttr(a.loaderAttribute), t.data(d, !0), y(T, t), setTimeout(p, 1), g = n.noop
                };
                t.off(I).one(I, o).one(D, g), y(i, t, function (e) {
                    e ? (t.off(D), g()) : (t.off(I), o())
                }) || t.trigger(I)
            } else {
                var h = n(new Image);
                h.one(I, o).one(D, function () {
                    t.hide(), e === N ? t.attr(C, h.attr(C)).attr(F, h.attr(F)).attr(E, h.attr(E)) : t.css(O, "url('" + h.attr(E) + "')"), t[a.effect](a.effectTime), s && (t.removeAttr(l + " " + u + " " + c + " " + a.imageBaseAttribute), f !== C && t.removeAttr(f)), t.data(d, !0), y(T, t), h.remove(), p()
                });
                var m = (L && A ? A : t.attr(l)) || "";
                h.attr(C, t.attr(f)).attr(F, t.attr(u)).attr(E, m ? r + m : null), h.complete && h.trigger(D)
            }
        }

        function A(t) {
            var e = t.getBoundingClientRect(), r = a.scrollDirection, n = a.threshold,
                i = h() + n > e.top && -n < e.bottom, o = g() + n > e.left && -n < e.right;
            return "vertical" === r ? i : "horizontal" === r ? o : i && o
        }

        function g() {
            return w >= 0 ? w : w = n(t).width()
        }

        function h() {
            return B >= 0 ? B : B = n(t).height()
        }

        function m(t) {
            return t.tagName.toLowerCase()
        }

        function b(t, e) {
            if (e) {
                var r = t.split(",");
                t = "";
                for (var a = 0, n = r.length; a < n; a++) t += e + r[a].trim() + (a !== n - 1 ? "," : "")
            }
            return t
        }

        function v(t, e) {
            var n, i = 0;
            return function (o, l) {
                function u() {
                    i = +new Date, e.call(r, o)
                }

                var f = +new Date - i;
                n && clearTimeout(n), f > t || !a.enableThrottle || l ? u() : n = setTimeout(u, t - f)
            }
        }

        function p() {
            --z, i.length || z || y("onFinishedAll")
        }

        function y(t, e, n) {
            return !!(t = a[t]) && (t.apply(r, [].slice.call(arguments, 1)), !0)
        }

        var z = 0, w = -1, B = -1, L = !1, T = "afterLoad", D = "load", I = "error", N = "img", E = "src", F = "srcset",
            C = "sizes", O = "background-image";
        "event" === a.bind || o ? f() : n(t).on(D + "." + u, f)
    }

    function a(a, o) {
        var l = this, u = n.extend({}, l.config, o), f = {}, c = u.name + "-" + ++i;
        return l.config = function (t, r) {
            return r === e ? u[t] : (u[t] = r, l)
        }, l.addItems = function (t) {
            return f.a && f.a("string" === n.type(t) ? n(t) : t), l
        }, l.getItems = function () {
            return f.g ? f.g() : {}
        }, l.update = function (t) {
            return f.e && f.e({}, !t), l
        }, l.force = function (t) {
            return f.f && f.f("string" === n.type(t) ? n(t) : t), l
        }, l.loadAll = function () {
            return f.e && f.e({all: !0}, !0), l
        }, l.destroy = function () {
            return n(u.appendScroll).off("." + c, f.e), n(t).off("." + c), f = {}, e
        }, r(l, u, a, f, c), u.chainable ? a : l
    }

    var n = t.jQuery || t.Zepto, i = 0, o = !1;
    n.fn.Lazy = n.fn.lazy = function (t) {
        return new a(this, t)
    }, n.Lazy = n.lazy = function (t, r, i) {
        if (n.isFunction(r) && (i = r, r = []), n.isFunction(i)) {
            t = n.isArray(t) ? t : [t], r = n.isArray(r) ? r : [r];
            for (var o = a.prototype.config, l = o._f || (o._f = {}), u = 0, f = t.length; u < f; u++) (o[t[u]] === e || n.isFunction(o[t[u]])) && (o[t[u]] = i);
            for (var c = 0, s = r.length; c < s; c++) l[r[c]] = t[0]
        }
    }, a.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        visibleOnly: !1,
        appendScroll: t,
        scrollDirection: "both",
        imageBase: null,
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        placeholder: null,
        delay: -1,
        combined: !1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250,
        beforeLoad: e,
        afterLoad: e,
        onError: e,
        onFinishedAll: e
    }, n(t).on("load", function () {
        o = !0
    })
}(window);

/*! jQuery & Zepto Lazy - All Plugins v1.7.5 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2017 Daniel 'Eisbehr' Kern */
!function (t) {
    function e(e, r, a, o) {
        t.ajax({
            url: r.attr("data-src"),
            type: o || "get",
            dataType: r.attr("data-type") || "html",
            success: function (t) {
                r.html(t), a(!0), e.config("removeAttribute") && r.removeAttr("data-src data-method data-type")
            },
            error: function () {
                a(!1)
            }
        })
    }

    t.lazy("ajax", function (t, r) {
        e(this, t, r, t.attr("data-method"))
    }), t.lazy("get", function (t, r) {
        e(this, t, r, "get")
    }), t.lazy("post", function (t, r) {
        e(this, t, r, "post")
    })
}(window.jQuery || window.Zepto), function (t) {
    t.lazy(["av", "audio", "video"], ["audio", "video"], function (e, r) {
        var a = e[0].tagName.toLowerCase();
        if ("audio" === a || "video" === a) {
            var o = "data-src", i = e.find(o), n = e.find("data-track"), c = 0, s = function () {
                ++c === i.length && r(!1)
            }, u = function () {
                var e = t(this), r = e[0].tagName.toLowerCase(), a = e.prop("attributes"),
                    i = t(r === o ? "<source>" : "<track>");
                r === o && i.one("error", s), t.each(a, function (t, e) {
                    i.attr(e.name, e.value)
                }), e.replaceWith(i)
            };
            e.one("loadedmetadata", function () {
                r(!0)
            }).off("load error").attr("poster", e.attr("data-poster")), i.length ? i.each(u) : e.attr(o) ? (t.each(e.attr(o).split(","), function (r, a) {
                var o = a.split("|");
                e.append(t("<source>").one("error", s).attr({src: o[0].trim(), type: o[1].trim()}))
            }), this.config("removeAttribute") && e.removeAttr(o)) : r(!1), n.length && n.each(u)
        } else r(!1)
    })
}(window.jQuery || window.Zepto), function (t) {
    t.lazy(["frame", "iframe"], "iframe", function (e, r) {
        var a = this;
        if ("iframe" === e[0].tagName.toLowerCase()) {
            var o = "data-src", i = "data-error-detect", n = e.attr(i);
            "true" !== n && "1" !== n ? (e.attr("src", e.attr(o)), a.config("removeAttribute") && e.removeAttr(o + " " + i)) : t.ajax({
                url: e.attr(o),
                dataType: "html",
                crossDomain: !0,
                xhrFields: {withCredentials: !0},
                success: function (t) {
                    e.html(t).attr("src", e.attr(o)), a.config("removeAttribute") && e.removeAttr(o + " " + i)
                },
                error: function () {
                    r(!1)
                }
            })
        } else r(!1)
    })
}(window.jQuery || window.Zepto), function (t) {
    t.lazy("noop", function () {
    }), t.lazy("noop-success", function (t, e) {
        e(!0)
    }), t.lazy("noop-error", function (t, e) {
        e(!1)
    })
}(window.jQuery || window.Zepto), function (t) {
    function e(e, r) {
        var a = e.prop("attributes"), o = t("<" + r + ">");
        return t.each(a, function (t, e) {
            o.attr(e.name, e.value)
        }), e.replaceWith(o), o
    }

    function r(e, r, a) {
        var o = t("<img>").one("load", function () {
            a(!0)
        }).one("error", function () {
            a(!1)
        }).appendTo(e).attr("src", r);
        o.complete && o.load()
    }

    t.lazy(["pic", "picture"], ["picture"], function (a, o) {
        var i = a[0].tagName.toLowerCase();
        if ("picture" === i) {
            var n = "data-src", c = "data-srcset", s = "data-media", u = "data-sizes", d = "data-type", f = a.find(n),
                m = a.find("data-img");
            f.length ? (f.each(function () {
                e(t(this), "source")
            }), 1 === m.length ? (m = e(m, "img"), m.on("load", function () {
                o(!0)
            }).on("error", function () {
                o(!1)
            }), m.attr("src", m.attr(n)), this.config("removeAttribute") && m.removeAttr(n)) : a.attr(n) ? (r(a, a.attr(n), o), this.config("removeAttribute") && a.removeAttr(n)) : o(!1)) : a.attr(c) ? (t("<source>").attr({
                media: a.attr(s),
                sizes: a.attr(u),
                type: a.attr(d),
                srcset: a.attr(c)
            }).appendTo(a), r(a, a.attr(n), o), this.config("removeAttribute") && a.removeAttr(n + " " + c + " " + s + " " + u + " " + d)) : o(!1)
        } else o(!1)
    })
}(window.jQuery || window.Zepto), function (t) {
    t.lazy(["js", "javascript", "script"], "script", function (t, e) {
        "script" == t[0].tagName.toLowerCase() ? (t.attr("src", t.attr("data-src")), this.config("removeAttribute") && t.removeAttr("data-src")) : e(!1)
    })
}(window.jQuery || window.Zepto), function (t) {
    t.lazy("vimeo", function (t, e) {
        "iframe" === t[0].tagName.toLowerCase() ? (t.attr("src", "https://player.vimeo.com/video/" + t.attr("data-src")), this.config("removeAttribute") && t.removeAttr("data-src")) : e(!1)
    })
}(window.jQuery || window.Zepto), function (t) {
    t.lazy(["yt", "youtube"], function (t, e) {
        "iframe" === t[0].tagName.toLowerCase() ? (t.attr("src", "https://www.youtube.com/embed/" + t.attr("data-src") + "?rel=0&amp;showinfo=0"), this.config("removeAttribute") && t.removeAttr("data-src")) : e(!1)
    })
}(window.jQuery || window.Zepto);
