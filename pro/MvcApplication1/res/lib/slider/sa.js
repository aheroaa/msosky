﻿var COMSTATIC = {};
//閭姝ｅ垯鏍￠獙
COMSTATIC.mail_preg = function (mail) {
    var mail_preg = /^\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var string = $.trim(mail);
    if (mail_preg.test(string)) {
        return true;
    }
    return false;
}
$("div.item").live("mouseover", function () {
    $(this).addClass("hover");
});
$("div.item").live("mouseleave", function () {
    $(this).removeClass("hover");
});


(function ($) {
    $.fn.lazyload = function (options) {
        var settings = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window
        };
        if (options) {
            $.extend(settings, options);
        }
        var elements = this;

        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function (event) {
                var counter = 0;
                elements.each(function () {
                    if ($.abovethetop(this, settings) || $.leftofbegin(this, settings))
                    { } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                        $(this).trigger("appear");
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                var temp = $.grep(elements, function (element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        }

        this.each(function () {

            var self = this;

            if (undefined == $(self).attr("data")) {
                $(self).attr("data", $(self).attr("src"));
            } if ("scroll" != settings.event || undefined == $(self).attr("src") || "" == $(self).attr("src") || settings.placeholder == $(self).attr("src") || ($.abovethetop(self, settings) || $.leftofbegin(self, settings) || $.belowthefold(self, settings) || $.rightoffold(self, settings))) {
                if (settings.placeholder) {
                    $(self).attr("src", settings.placeholder);
                } else {//$(self).removeAttr("src");
                }
                self.loaded = false;
            } else {
                self.loaded = true;
            }

            $(self).one("appear", function () {
                if (!this.loaded || 1 == 1) {
                    $("<img />").bind("load", function () {
                        $(self).hide().attr("src", $(self).attr("data"))[settings.effect](settings.effectspeed);
                        self.loaded = true;
                    }).attr("src", $(self).attr("data"));
                };
            });

            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                }

		);
            }
        });

        $(settings.container).trigger(settings.event);
        return this;
    };

    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.extend(
		$.expr[':'],
		{
		    "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
		    "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
		    "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
		    "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
		}
	);

})(jQuery);


function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    var expiry = new Date(today.getTime() + 100000 * 24 * 60 * 60 * 1000);
    if (expires == '' || expires == null) {
        expires = expiry;
    }
    var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}

(function ($) {
    $.fn.sfHover = function (options) {
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function () { },
            outEvent: function () { }
        };
        var s = $.extend(defaults, options || {});
        var h, o, that = this;
        return $(this).each(function () {
            $(this).hover(function () {
                clearTimeout(o);
                h = setTimeout(function () { s.hoverEvent.apply(that) }, s.hoverDuring);
            }, function () {
                clearTimeout(h);
                o = setTimeout(function () { s.outEvent.apply(that) }, s.outDuring);
            });
        });
    };

    function sf_a(obj, f, c, u) {
        $(obj).addClass("curr").siblings().removeClass("curr");
        var i = $(f).index($(f + ".curr"));
        var w = u.find(".slideArror").width();
        var $left = i * w + "px";
        c.eq(i).show().siblings().hide();
        u.find(".slideArror").animate({ "left": $left }, 300);

    }
    var fp = ".panel .subTab li";
    $(fp).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".panel .mList .sfList"),
					t = $(".panel");
                sf_a(This, fp, c, t);
                i = $(this).index();
                if (i == 4 && !c.eq(i).attr('isGet')) {
                    c.eq(i).html("loading....");
                    $.post("/product/like", {}, function (str) {
                        c.eq(i).html(str);
                        c.eq(i).attr('isGet', 1)
                    });
                } else {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fc = ".countDown .subTab li";
    $(fc).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".countDown .mList .sfList"),
					t = $(".countDown");
                sf_a(This, fc, c, t);

            }
        });
    });
    var ff = ".fresh .floorTab li";
    $(ff).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".fresh .subCont > div"),
					t = $(".fresh");
                sf_a(This, ff, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fdr = ".drinks .floorTab li";
    $(fdr).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".drinks .subCont > div"),
					t = $(".drinks");
                sf_a(This, fdr, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fd = ".food .floorTab li";
    $(fd).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".food .subCont > div"),
					t = $(".food");
                sf_a(This, fd, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fo = ".oil .floorTab li";
    $(fo).each(function () {
        hoverDuring: 300,
		$(this).sfHover({
		    hoverEvent: function () {
		        var This = $(this),
					c = $(".oil .subCont > div"),
					t = $(".oil");
		        sf_a(This, fo, c, t);
		        i = $(this).index();
		        if (i > 0) {
		            c.eq(i).find("img.lazy_load").trigger("sporty");
		        }
		    }
		});
    });
    var ft = ".tea .floorTab li";
    $(ft).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".tea .subCont > div"),
					t = $(".tea");
                sf_a(This, ft, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fb = ".baby .floorTab li";
    $(fb).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".baby .subCont > div"),
					t = $(".baby");
                sf_a(This, fb, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fh = ".health .floorTab li";
    $(fh).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".health .subCont > div"),
					t = $(".health");
                sf_a(This, fh, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fts = ".tools .floorTab li";
    $(fts).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".tools .subCont > div"),
					t = $(".tools");
                sf_a(This, fts, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });

    var fq = ".comgifts .floorTab li";
    $(fq).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".comgifts .subCont > div"),
					t = $(".comgifts");
                sf_a(This, fq, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });
    var fqc = ".comcard .floorTab li";
    $(fqc).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".comcard .subCont > div"),
					t = $(".comcard");
                sf_a(This, fqc, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });

    var fqh = ".comhome .floorTab li";
    $(fqh).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".comhome .subCont > div"),
					t = $(".comhome");
                sf_a(This, fqh, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });

    var fqt = ".comticket .floorTab li";
    $(fqt).each(function () {
        $(this).sfHover({
            hoverDuring: 300,
            hoverEvent: function () {
                var This = $(this),
					c = $(".comticket .subCont > div"),
					t = $(".comticket");
                sf_a(This, fqt, c, t);
                i = $(this).index();
                if (i > 0) {
                    c.eq(i).find("img.lazy_load").trigger("sporty");
                }
            }
        });
    });

})(jQuery);
$(function () {
    $(".pList li").each(function () {
        $(this).sfHover({
            hoverEvent: function () {
                if ($(this).find(".gWindow").length > 0) {
                    $(this).find(".gBtn").hide();
                } else {
                    $(this).find(".gBtn").show();
                    $(this).find(".gBtn").animate({ top: "116px" }, 200);
                }
            },
            outEvent: function () {
                $(this).find(".gBtn").animate({ top: "141px" }, 300);
            }
        });
    });
    $(".sfList li").each(function () {
        $(this).sfHover({
            hoverEvent: function () {
                if ($(this).find(".gWindow").length > 0) {
                    $(this).find(".gBtn").hide();
                } else {
                    $(this).find(".gBtn").show();
                    $(this).find(".gBtn").animate({ top: "150px" }, 200);
                }
            },
            outEvent: function () {
                $(this).find(".gBtn").animate({ top: "184px" }, 300);
            }
        });
    });

    $(".rHot dd").live("mouseenter", function () {
        if ($(this).find(".gWindow").length > 0) {
            $(this).find(".hBtn").hide();
        } else {
            $(this).find(".hBtn").show();
        }
        $(this).find("a.pname").addClass("ddHover");
    });
    $(".rHot dd").live("mouseleave", function () {
        $(this).find(".hBtn").hide();
        $(this).find("a.pname").removeClass("ddHover");
    });

    SFbest.Slide.init();
    $(".ajaxdata_index li").live("mouseenter", function () {
        if ($(this).find(".gWindow").length > 0) {
            $(this).find(".gBtn").hide();
        } else {
            $(this).find(".gBtn").show();
            $(this).find(".gBtn").animate({ top: "150px" }, 200);
        }
    });
    $(".ajaxdata_index li").live("mouseleave", function () {
        $(this).find(".gBtn").animate({ top: "184px" }, 300);
    });
})

var SFbest = {};
(function (d) {
    SFbest.Slide = new function () {
        this.init = function () {
            Q();
            S();
            T();
        };
        function Q() {
            var f = $("#lunbo_1");
            var li = $("ul>li", "#slide_show");
            if (f.length > 0 && li.length > 1) {
                setTimeout(function () {
                    $("#lunboNum").show();
                    m("#slide_show");
                }, 1000)
            }
            e();
            function e() {
                var p = p || {};
                p.u_hover = function (r) {
                    var q = $(r);
                    q.hover(function () {
                        $(this).removeClass("hovers").siblings().addClass("hovers")
                    }, function () {
                        $(this).siblings().removeClass("hovers")
                    })
                };
                p.initFun = function () {
                    p.u_hover("#index_slide .mini_pic a")
                };
                p.initFun()
            }
            function m(q) {
                p();
                function p() {
                    var t = $("ol", "#slide_show").width(),
					B = $("#slide_show>ul>li"),
					A = $("#index_slide>ol"),
					D = $("#index_slide>ol>li"),
					x = D.length,
					z;
                    var r = D.first();
                    D.last().clone().prependTo(A);
                    A.width(t * (x + 2) + 100).css("left", "-" + t + "px");
                    $("#slide_show").hover(function () {
                        $(this).children("a").show();
                        clearInterval(z)
                    }, function () {
                        $(this).children("a").hide();
                        clearInterval(z);
                        z = setInterval(function () {
                            s(y())
                        }, 5000)
                    }).trigger("mouseout");
                    B.hover(function () {
                        var E = B.index(this);
                        $(this).addClass("cur").siblings().removeClass("cur");
                        $("ol", "#index_slide").stop(true).animate({
                            left: "-" + (E + 1) * t + "px"
                        }, 360);
                    });
                    $(".show_next,.show_pre", "#slide_show").click(function () {
                        var E = y();
                        if ($("ol", "#index_slide").is(":animated")) {
                            return
                        }
                        if ($(this).hasClass("show_pre")) {
                            $("ol", "#index_slide").animate({
                                left: "+=" + t + "px"
                            }, 360, function () {
                                if (E > 0) {
                                    B.eq(E - 1).addClass("cur").siblings().removeClass("cur");
                                } else {
                                    if (E == 0) {
                                        $("ol", "#index_slide").css("left", "-" + t * (x) + "px");
                                        B.eq(-1).addClass("cur").siblings().removeClass("cur");
                                    }
                                }
                            })
                        } else {
                            s(E)
                        }
                        return false
                    });
                    function s(E) {
                        if (E == x - 1) {
                            r.addClass("cur").css("left", t * x)
                        }
                        $("ol", "#index_slide").stop(true, true).animate({
                            left: "-=" + t + "px"
                        }, 360, function () {
                            if (E < x - 1) {
                                B.eq(E + 1).addClass("cur").siblings().removeClass("cur");
                            } else {
                                if (E == x - 1) {
                                    r.removeClass("cur").css("left", -t);
                                    $("ol", "#index_slide").css("left", "-" + t + "px");
                                    B.eq(0).addClass("cur").siblings().removeClass("cur")
                                }
                            }
                        })
                    }
                    function y() {
                        return $("ul>li", "#slide_show").index($("ul>li.cur", "#slide_show"))
                    }

                }
            }
        }
        function S() {
            $(".slide").each(function () {
                var f = $(this);
                var w = f.width();
                var l = f.find("ul li").length;
                var i = 0;
                var b = "<div class='slideControls'>";
                if (l > 1) {
                    var b = "<div class='slideControls'>";
                    for (var i = 0; i < l; i++) {
                        b += "<span>" + (i + 1) + "</span>";
                    }
                    b += "</div>";
                    f.append(b);
                    f.hover(function () { f.children("a").show(); }, function () { f.children("a").hide(); });
                }
                f.find(".slideControls span").removeClass("cur").eq(0).addClass("cur");
                f.find(".slideControls span").mouseenter(function () {
                    i = f.find(".slideControls span").index(this);
                    if (i == l) { g(); i = 0; } else { h(); }
                });
                f.find("ul").css("width", w * (l + 1));
                f.find(".btn_next").click(function () {
                    i = f.find(".slideControls span.cur").index();
                    i++;
                    if (i == l) { g(); } else { h(); }
                });
                f.find(".btn_prev").click(function () {
                    i = f.find(".slideControls span.cur").index();
                    if (i == 0) {
                        f.find("ul").prepend(f.find("ul li:last").clone());
                        f.find("ul").css("left", -w);
                        f.find("ul").stop(true, false).animate({ "left": 0 }, 360, function () {
                            f.find("ul").css("left", -(l - 1) * w);
                            f.find("ul li:first").remove();
                        });
                        f.find(".slideControls span").removeClass("cur").eq(l - 1).addClass("cur");
                    } else { i--; h(); }
                });
                function g() {
                    f.find("ul").append(f.find("ul li:first").clone());
                    var nowLeft = -l * w;
                    f.find("ul").stop(true, false).animate({ "left": nowLeft }, 360, function () {
                        f.find("ul").css("left", "0");
                        f.find("ul li:last").remove();
                    });
                    f.find(".slideControls span").removeClass("cur").eq(0).addClass("cur");
                }
                function h() {
                    n();
                    f.find(".slideControls span").removeClass("cur").eq(i).addClass("cur");
                }
                function n() {
                    var nowLeft = -i * w;
                    f.find("ul").stop(true, false).animate({ "left": nowLeft }, 360);
                }
            })
        }
        function T() {
            var i = 0;
            var li = $(".lpscroll li");
            var n = li.length - 1;
            var speed = 300;
            if (n > 0) {
                li.not(":first").css({ left: "218px" });
                li.eq(n).css({ left: "-218px" });
                $(".lpleftbtn").show();
                $(".lprightbtn").show();
            }
            $(".lpleftbtn").click(function () {
                if (!li.is(":animated")) {
                    if (i >= n) {
                        i = 0; li.eq(n).animate({ left: "-218px" }, speed);
                        li.eq(i).animate({ left: "0px" }, speed);
                    } else {
                        i++;
                        li.eq(i - 1).animate({ left: "-218px" }, speed);
                        li.eq(i).animate({ left: "0px" }, speed);
                    }
                    li.not("eq(i)").css({ left: "218px" });
                    $("i").text(i + 1);
                }
            });
            $(".lprightbtn").click(function () {
                if (!li.is(":animated")) {
                    if (i <= 0) {
                        i = n;
                        li.eq(0).animate({ left: "218px" }, speed);
                        li.eq(n).animate({ left: "0px" }, speed);
                    } else {
                        i--;
                        li.eq(i + 1).animate({ left: "218px" }, speed);
                        li.eq(i).animate({ left: "0px" }, speed);
                    }
                    li.not("eq(i)").css({ left: "-218px" });
                    $("i").text(i + 1);
                }
            });
        }
    };
})(jQuery);

(function ($) {
    /*
    * jAlert浣跨敤閬僵灞�
    */
    var Shade = new function () {
        var handle = {};
        var shade;
        handle.show = function (func) {
            if (!shade) {
                shade = document.createElement('div');
                shade.style.display = 'none';
                shade.style.zIndex = 99997;
                shade.style.filter = 'alpha(opacity = 20)';
                shade.style.left = 0;
                shade.style.width = '100%';
                shade.style.position = 'absolute';
                shade.style.top = 0;
                shade.style.backgroundColor = '#000000';
                shade.style.opacity = .2;
                document.body.appendChild(shade);
            }
            with ((document.compatMode == 'CSS1Compat') ? document.documentElement : document.body) {
                var ch = clientHeight, sh = scrollHeight;
                shade.style.height = (sh > ch ? sh : ch) + 'px';

                var cw = clientWidth, sw = scrollWidth, ow = offsetWidth;
                var width = cw > sw ? cw : sw;
                width = width > ow ? width : ow;

                shade.style.width = width + 'px';
                shade.style.display = 'block';
            }

            if (func) {
                func();
            }
        };
        handle.hide = function (func) {
            shade.style.display = 'none';
            if (func) {
                func();
            }
        };

        return handle;
    }

    $.alerts = {

        // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .01,                // transparency level of overlay
        overlayColor: '#89652b',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;纭畾&nbsp;',         // text for the OK button
        cancelButton: '&nbsp;鍙栨秷&nbsp;', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods

        alert: function (message, title, callback) {
            if (title == null) title = '鎻愮ず淇℃伅';
            $.alerts._show(title, message, null, 'alert', function (result) {
                if (callback) callback(result);
            });
        },


        confirm: function (message, title, callback) {
            if (title == null) title = '纭淇℃伅';
            $.alerts._show(title, message, null, 'confirm', function (result) {
                if (callback) callback(result);
            });
        },

        prompt: function (message, value, title, callback) {
            if (title == null) title = '杈撳叆淇℃伅';
            $.alerts._show(title, message, value, 'prompt', function (result) {
                if (callback) callback(result);
            });
        },

        // Private methods

        _show: function (title, msg, value, type, callback) {
            Shade.show();
            $.alerts._hide();
            $.alerts._overlay('show');

            $("BODY").append(
			  '<div id="popup_container" class="window">' +
			    '<div class="titlehead"><h3 id="popup_title"></h3></div>' +
			    '<div id="popup_content" class="content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');

            if ($.alerts.dialogClass) $("#popup_container").addClass($.alerts.dialogClass);

            // IE6 Fix
            var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';

            $("#popup_container").css({
                position: pos,
                zIndex: 100000,
                padding: 0,
                margin: 0
            });

            if ($.browser.msie && $.browser.version < 7) {
                $ie6Fix = $('<iframe frameborder="0" src="#" id="shadow"></iframe>').css({
                    position: "absolute",
                    zIndex: 99999
                }).insertBefore("#popup_container")
            }

            $("#popup_title").text(title);
            $("#popup_content").addClass(type);
            $("#popup_message").text(msg);
            $("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));

            $("#popup_container").css({
                minWidth: $("#popup_container").outerWidth(),
                maxWidth: $("#popup_container").outerWidth()
            });

            $.alerts._reposition();
            $.alerts._maintainPosition(true);

            switch (type) {
                case 'alert':
                    $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="submit1" /></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        Shade.hide();
                        callback(true);
                    });
                    $("#popup_ok").focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $("#popup_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="submit1"/> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="submit1"/></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        Shade.hide();
                        if (callback) callback(true);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        Shade.hide();
                        if (callback) callback(false);
                    });
                    $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="submit1"/> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="submit1"/></div>');
                    $("#popup_prompt").width($("#popup_message").width());
                    $("#popup_ok").click(function () {
                        var val = $("#popup_prompt").val();
                        $.alerts._hide();
                        Shade.hide();
                        if (callback) callback(val);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        Shade.hide();
                        if (callback) callback(null);
                    });
                    $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    if (value) $("#popup_prompt").val(value);
                    $("#popup_prompt").focus().select();
                    break;
            }

            // Make draggable
            if ($.alerts.draggable) {
                try {
                    $("#popup_container").draggable({ handle: $("#popup_title") });
                    $("#popup_title").css({ cursor: 'move' });
                } catch (e) { /* requires jQuery UI draggables */ }
            }
        },

        _hide: function () {
            if ($.browser.msie && $.browser.version < 7) {
                $("#shadow").remove();
            }
            $("#popup_container").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.alerts._overlay('hide');
                    $("BODY").append('<div id="popup_overlay"></div>');
                    $("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: $.alerts.overlayColor,
                        opacity: $.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
            var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
            var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
            var height = $("#popup_container").outerHeight(true);
            var width = $("#popup_container").outerWidth(true);
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#popup_container").css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#popup_overlay").height($(document).height());
            $("#shadow").css({
                top: top + 'px',
                left: left + 'px',
                height: height + 34 + 'px',
                width: width + 'px'
            });
        },

        _maintainPosition: function (status) {
            if ($.alerts.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', $.alerts._reposition);
                        break;
                    case false:
                        $(window).unbind('resize', $.alerts._reposition);
                        break;
                }
            }
        }

    }

    // Shortuct functions
    jAlert = function (message, title, callback) {
        $.alerts.alert(message, title, callback);
    }

    jConfirm = function (message, title, callback) {
        $.alerts.confirm(message, title, callback);
    };

    jPrompt = function (message, value, title, callback) {
        $.alerts.prompt(message, value, title, callback);
    };

})(jQuery);
//autocomplete start
(function ($) {
    $.fn.extend({
        autocomplete: function (urlOrData, options) {
            var isUrl = typeof urlOrData == "string";
            options = $.extend({}, $.Autocompleter.defaults, {
                url: isUrl ? urlOrData : null,
                data: isUrl ? null : urlOrData,
                delay: isUrl ? $.Autocompleter.defaults.delay : 10,
                max: options && !options.scroll ? 10 : 150
            }, options);

            // if highlight is set to false, replace it with a do-nothing function
            options.highlight = options.highlight || function (value) { return value; };

            // if the formatMatch option is not specified, then use formatItem for backwards compatibility
            options.formatMatch = options.formatMatch || options.formatItem;

            return this.each(function () {
                new $.Autocompleter(this, options);
            });
        },
        result: function (handler) {
            return this.bind("result", handler);
        },
        search: function (handler) {
            return this.trigger("search", [handler]);
        },
        flushCache: function () {
            return this.trigger("flushCache");
        },
        setOptions: function (options) {
            return this.trigger("setOptions", [options]);
        },
        unautocomplete: function () {
            return this.trigger("unautocomplete");
        }
    });

    $.Autocompleter = function (input, options) {

        var KEY = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        };

        // Create $ object for input element
        var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

        var timeout;
        var previousValue = "";
        var cache = $.Autocompleter.Cache(options);
        var hasFocus = 0;
        var lastKeyPressCode;
        var config = {
            mouseDownOnSelect: false
        };
        var select = $.Autocompleter.Select(options, input, selectCurrent, config);

        var blockSubmit;

        // prevent form submit in opera when selecting with return key
        $.browser.opera && $(input.form).bind("submit.autocomplete", function () {
            if (blockSubmit) {
                blockSubmit = false;
                return false;
            }
        });

        // only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
        $input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function (event) {
            // a keypress means the input has focus
            // avoids issue where input had focus before the autocomplete was applied
            hasFocus = 1;
            // track last key pressed
            lastKeyPressCode = event.keyCode;
            switch (event.keyCode) {

                case KEY.UP:
                    event.preventDefault();
                    if (select.visible()) {
                        select.prev();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.DOWN:
                    event.preventDefault();
                    if (select.visible()) {
                        select.next();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.PAGEUP:
                    event.preventDefault();
                    if (select.visible()) {
                        select.pageUp();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.PAGEDOWN:
                    event.preventDefault();
                    if (select.visible()) {
                        select.pageDown();
                    } else {
                        onChange(0, true);
                    }
                    break;

                // matches also semicolon 
                case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
                case KEY.TAB:
                case KEY.RETURN:
                    if (selectCurrent()) {
                        // stop default to prevent a form submit, Opera needs special handling
                        event.preventDefault();
                        blockSubmit = true;
                        if (options.searchAction) options.searchAction();
                        return false;
                    }
                    break;

                case KEY.ESC:
                    select.hide();
                    break;

                default:
                    clearTimeout(timeout);
                    timeout = setTimeout(onChange, options.delay);
                    break;
            }
        }).focus(function () {
            // track whether the field has focus, we shouldn't process any
            // results if the field no longer has focus
            hasFocus++;
        }).blur(function () {
            hasFocus = 0;
            if (!config.mouseDownOnSelect) {
                hideResults();
            }
        }).click(function () {
            // show select when clicking in a focused field
            if (hasFocus++ > 1 && !select.visible()) {
                onChange(0, true);
            }
        }).bind("search", function () {
            // TODO why not just specifying both arguments?
            var fn = (arguments.length > 1) ? arguments[1] : null;
            function findValueCallback(q, data) {
                var result;
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].result.toLowerCase() == q.toLowerCase()) {
                            result = data[i];
                            break;
                        }
                    }
                }
                if (typeof fn == "function") fn(result);
                else $input.trigger("result", result && [result.data, result.value]);
            }
            $.each(trimWords($input.val()), function (i, value) {
                request(value, findValueCallback, findValueCallback);
            });
        }).bind("flushCache", function () {
            cache.flush();
        }).bind("setOptions", function () {
            $.extend(options, arguments[1]);
            // if we've updated the data, repopulate
            if ("data" in arguments[1])
                cache.populate();
        }).bind("unautocomplete", function () {
            select.unbind();
            $input.unbind();
            $(input.form).unbind(".autocomplete");
        }).bind("input", function () { //淇firefox涓嬩腑鏂囪緭鍏ユ硶棣栨鏀跺叆涓嶆彁绀虹殑bug
            hasFocus = 1;
            clearTimeout(timeout);
            timeout = setTimeout(onChange, options.delay);
        });


        function selectCurrent() {
            var selected = select.selected();
            if (!selected)
                return false;

            var v = selected.result;
            previousValue = v;

            if (options.multiple) {
                var words = trimWords($input.val());
                if (words.length > 1) {
                    var seperator = options.multipleSeparator.length;
                    var cursorAt = $(input).selection().start;
                    var wordAt, progress = 0;
                    $.each(words, function (i, word) {
                        progress += word.length;
                        if (cursorAt <= progress) {
                            wordAt = i;
                            return false;
                        }
                        progress += seperator;
                    });
                    words[wordAt] = v;
                    // TODO this should set the cursor to the right position, but it gets overriden somewhere
                    //$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
                    v = words.join(options.multipleSeparator);
                }
                v += options.multipleSeparator;
            }

            $input.val(v);
            hideResultsNow();
            $input.trigger("result", [selected.data, selected.value]);
            return true;
        }

        function onChange(crap, skipPrevCheck) {
            if (lastKeyPressCode == KEY.DEL) {
                select.hide();
                return;
            }

            var currentValue = $input.val();

            if (!skipPrevCheck && currentValue == previousValue)
                return;

            previousValue = currentValue;

            currentValue = lastWord(currentValue);
            if (currentValue.length >= options.minChars) {
                $input.addClass(options.loadingClass);
                if (!options.matchCase)
                    currentValue = currentValue.toLowerCase();
                request(currentValue, receiveData, hideResultsNow);
            } else {
                stopLoading();
                select.hide();
            }
        };

        function trimWords(value) {
            if (!value)
                return [""];
            if (!options.multiple)
                return [$.trim(value)];
            return $.map(value.split(options.multipleSeparator), function (word) {
                return $.trim(value).length ? $.trim(word) : null;
            });
        }

        function lastWord(value) {
            if (!options.multiple)
                return value;
            var words = trimWords(value);
            if (words.length == 1)
                return words[0];
            var cursorAt = $(input).selection().start;
            if (cursorAt == value.length) {
                words = trimWords(value);
            } else {
                words = trimWords(value.replace(value.substring(cursorAt), ""));
            }
            return words[words.length - 1];
        }

        // fills in the input box w/the first match (assumed to be the best match)
        // q: the term entered
        // sValue: the first matching result
        function autoFill(q, sValue) {
            // autofill in the complete box w/the first match as long as the user hasn't entered in more data
            // if the last user key pressed was backspace, don't autofill
            if (options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
                // fill in the value (keep the case the user has typed)
                $input.val($input.val() + sValue.substring(lastWord(previousValue).length));
                // select the portion of the value not typed by the user (so the next character will erase)
                $(input).selection(previousValue.length, previousValue.length + sValue.length);
            }
        };

        function hideResults() {
            clearTimeout(timeout);
            timeout = setTimeout(hideResultsNow, 200);
        };

        function hideResultsNow() {
            var wasVisible = select.visible();
            select.hide();
            clearTimeout(timeout);
            stopLoading();
            if (options.mustMatch) {
                // call search and run callback
                $input.search(
				function (result) {
				    // if no value found, clear the input box
				    if (!result) {
				        if (options.multiple) {
				            var words = trimWords($input.val()).slice(0, -1);
				            $input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""));
				        }
				        else {
				            $input.val("");
				            $input.trigger("result", null);
				        }
				    }
				}
			);
            }
        };

        function receiveData(q, data) {
            if (data && data.length && hasFocus) {
                stopLoading();
                select.display(data, q);
                autoFill(q, data[0].value);
                select.show();
            } else {
                hideResultsNow();
            }
        };

        function request(term, success, failure) {
            if (!options.matchCase)
                term = term.toLowerCase();
            var data = cache.load(term);
            // recieve the cached data
            if (data && data.length) {
                success(term, data);
                // if an AJAX url has been supplied, try loading the data now
            } else if ((typeof options.url == "string") && (options.url.length > 0)) {

                var extraParams = {
                    timestamp: +new Date()
                };
                $.each(options.extraParams, function (key, param) {
                    extraParams[key] = typeof param == "function" ? param() : param;
                });

                $.ajax({
                    // try to leverage ajaxQueue plugin to abort previous requests
                    mode: "abort",
                    // limit abortion to this input
                    port: "autocomplete" + input.name,
                    dataType: options.dataType,
                    url: options.url,
                    data: $.extend({
                        q: lastWord(term),
                        limit: options.max
                    }, extraParams),
                    success: function (data) {
                        var parsed = options.parse && options.parse(data) || parse(data);
                        cache.add(term, parsed);
                        success(term, parsed);
                    }
                });
            } else {
                // if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
                select.emptyList();
                failure(term);
            }
        };

        function parse(data) {
            var parsed = [];
            var rows = data.split("\n");
            for (var i = 0; i < rows.length; i++) {
                var row = $.trim(rows[i]);
                if (row) {
                    row = row.split("|");
                    parsed[parsed.length] = {
                        data: row,
                        value: row[0],
                        result: options.formatResult && options.formatResult(row, row[0]) || row[0]
                    };
                }
            }
            return parsed;
        };

        function stopLoading() {
            $input.removeClass(options.loadingClass);
        };

    };

    $.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        minChars: 1,
        delay: 400,
        matchCase: false,
        matchSubset: true,
        matchContains: false,
        cacheLength: 10,
        max: 100,
        mustMatch: false,
        extraParams: {},
        selectFirst: true,
        formatItem: function (row) { return row[0]; },
        formatMatch: null,
        autoFill: false,
        width: 0,
        multiple: false,
        multipleSeparator: ", ",
        highlight: function (value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
        },
        scroll: true,
        scrollHeight: 180
        // selectItem: function(activeItem) {},
        //, searchAction: function() {},
    };

    $.Autocompleter.Cache = function (options) {

        var data = {};
        var length = 0;

        function matchSubset(s, sub) {
            if (!options.matchCase)
                s = s.toLowerCase();
            var i = s.indexOf(sub);
            if (options.matchContains == "word") {
                i = s.toLowerCase().search("\\b" + sub.toLowerCase());
            }
            if (i == -1) return false;
            return i == 0 || options.matchContains;
        };

        function add(q, value) {
            if (length > options.cacheLength) {
                flush();
            }
            if (!data[q]) {
                length++;
            }
            data[q] = value;
        }

        function populate() {
            if (!options.data) return false;
            // track the matches
            var stMatchSets = {},
			nullData = 0;

            // no url was specified, we need to adjust the cache length to make sure it fits the local data store
            if (!options.url) options.cacheLength = 1;

            // track all options for minChars = 0
            stMatchSets[""] = [];

            // loop through the array and create a lookup structure
            for (var i = 0, ol = options.data.length; i < ol; i++) {
                var rawValue = options.data[i];
                // if rawValue is a string, make an array otherwise just reference the array
                rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;

                var value = options.formatMatch(rawValue, i + 1, options.data.length);
                if (value === false)
                    continue;

                var firstChar = value.charAt(0).toLowerCase();
                // if no lookup array for this character exists, look it up now
                if (!stMatchSets[firstChar])
                    stMatchSets[firstChar] = [];

                // if the match is a string
                var row = {
                    value: value,
                    data: rawValue,
                    result: options.formatResult && options.formatResult(rawValue) || value
                };

                // push the current match into the set list
                stMatchSets[firstChar].push(row);

                // keep track of minChars zero items
                if (nullData++ < options.max) {
                    stMatchSets[""].push(row);
                }
            };

            // add the data items to the cache
            $.each(stMatchSets, function (i, value) {
                // increase the cache size
                options.cacheLength++;
                // add to the cache
                add(i, value);
            });
        }

        // populate any existing data
        setTimeout(populate, 25);

        function flush() {
            data = {};
            length = 0;
        }

        return {
            flush: flush,
            add: add,
            populate: populate,
            load: function (q) {
                if (!options.cacheLength || !length)
                    return null;
                /* 
                * if dealing w/local data and matchContains than we must make sure
                * to loop through all the data collections looking for matches
                */
                if (!options.url && options.matchContains) {
                    // track all matches
                    var csub = [];
                    // loop through all the data grids for matches
                    for (var k in data) {
                        // don't search through the stMatchSets[""] (minChars: 0) cache
                        // this prevents duplicates
                        if (k.length > 0) {
                            var c = data[k];
                            $.each(c, function (i, x) {
                                // if we've got a match, add it to the array
                                if (matchSubset(x.value, q)) {
                                    csub.push(x);
                                }
                            });
                        }
                    }
                    return csub;
                } else
                // if the exact item exists, use it
                    if (data[q]) {
                        return data[q];
                    } else
                        if (options.matchSubset) {
                            for (var i = q.length - 1; i >= options.minChars; i--) {
                                var c = data[q.substr(0, i)];
                                if (c) {
                                    var csub = [];
                                    $.each(c, function (i, x) {
                                        if (matchSubset(x.value, q)) {
                                            csub[csub.length] = x;
                                        }
                                    });
                                    return csub;
                                }
                            }
                        }
                return null;
            }
        };
    };

    $.Autocompleter.Select = function (options, input, select, config) {
        var CLASSES = {
            ACTIVE: "ac_over"
        };

        var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;

        // Create results
        function init() {
            if (!needsInit)
                return;
            element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);

            list = $("<ul/>").appendTo(element).mouseover(function (event) {
                if (target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
                    active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
                    $(target(event)).addClass(CLASSES.ACTIVE);
                }
            }).click(function (event) {
                $(target(event)).addClass(CLASSES.ACTIVE);
                select();
                // TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
                input.focus();
                if (options.searchAction) options.searchAction();
                return false;
            }).mousedown(function () {
                config.mouseDownOnSelect = true;
            }).mouseup(function () {
                config.mouseDownOnSelect = false;
            });

            if (options.width > 0)
                element.css("width", options.width);

            needsInit = false;
        }

        function target(event) {
            var element = event.target;
            while (element && element.tagName != "LI")
                element = element.parentNode;
            // more fun with IE, sometimes event.target is empty, just ignore it then
            if (!element)
                return [];
            return element;
        }

        function moveSelect(step) {
            listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
            movePosition(step);
            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            if (options.selectItem) options.selectItem(activeItem);
            if (options.scroll) {
                var offset = 0;
                listItems.slice(0, active).each(function () {
                    offset += this.offsetHeight;
                });
                if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                    list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
                } else if (offset < list.scrollTop()) {
                    list.scrollTop(offset);
                }
            }
        };

        function movePosition(step) {
            active += step;
            if (active < 0) {
                active = listItems.size() - 1;
            } else if (active >= listItems.size()) {
                active = 0;
            }
        }

        function limitNumberOfItems(available) {
            return options.max && options.max < available
			? options.max
			: available;
        }

        function fillList() {
            list.empty();
            var max = limitNumberOfItems(data.length);
            for (var i = 0; i < max; i++) {
                if (!data[i])
                    continue;
                var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
                if (!formatted)
                    continue;
                var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
                $.data(li, "ac_data", data[i]);
            }
            listItems = list.find("li");
            if (options.addArticleCountItem) options.addArticleCountItem(element);
            if (options.selectFirst) {
                listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
                active = 0;
            }
            // apply bgiframe if available
            if ($.fn.bgiframe) {
                list.bgiframe();
            }
        }

        return {
            display: function (d, q) {
                init();
                data = d;
                term = q;
                fillList();
            },
            next: function () {
                moveSelect(1);
            },
            prev: function () {
                moveSelect(-1);
            },
            pageUp: function () {
                if (active != 0 && active - 8 < 0) {
                    moveSelect(-active);
                } else {
                    moveSelect(-8);
                }
            },
            pageDown: function () {
                if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
                    moveSelect(listItems.size() - 1 - active);
                } else {
                    moveSelect(8);
                }
            },
            hide: function () {
                element && element.hide();
                listItems && listItems.removeClass(CLASSES.ACTIVE);
                active = -1;
            },
            visible: function () {
                return element && element.is(":visible");
            },
            current: function () {
                return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
            },
            show: function () {
                var offset = $(input).offset();
                element.css({
                    width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
                    top: offset.top + input.offsetHeight,
                    left: offset.left
                }).show();
                if (options.scroll) {
                    list.scrollTop(0);
                    list.css({
                        maxHeight: options.scrollHeight,
                        overflow: 'auto'
                    });

                    if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
                        var listHeight = 0;
                        listItems.each(function () {
                            listHeight += this.offsetHeight;
                        });
                        var scrollbarsVisible = listHeight > options.scrollHeight;
                        list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight);
                        if (!scrollbarsVisible) {
                            // IE doesn't recalculate width when scrollbar disappears
                            listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")));
                        }
                    }

                }
            },
            selected: function () {
                var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
                return selected && selected.length && $.data(selected[0], "ac_data");
            },
            emptyList: function () {
                list && list.empty();
            },
            unbind: function () {
                element && element.remove();
            }
        };
    };

    $.fn.selection = function (start, end) {
        if (start !== undefined) {
            return this.each(function () {
                if (this.createTextRange) {
                    var selRange = this.createTextRange();
                    if (end === undefined || start == end) {
                        selRange.move("character", start);
                        selRange.select();
                    } else {
                        selRange.collapse(true);
                        selRange.moveStart("character", start);
                        selRange.moveEnd("character", end);
                        selRange.select();
                    }
                } else if (this.setSelectionRange) {
                    this.setSelectionRange(start, end);
                } else if (this.selectionStart) {
                    this.selectionStart = start;
                    this.selectionEnd = end;
                }
            });
        }
        var field = this[0];
        if (field.createTextRange) {
            var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
            range.text = teststring;
            var caretAt = field.value.indexOf(teststring);
            field.value = orig;
            this.selection(caretAt, caretAt + textLength);
            return {
                start: caretAt,
                end: caretAt + textLength
            };
        } else if (field.selectionStart !== undefined) {
            return {
                start: field.selectionStart,
                end: field.selectionEnd
            };
        }
    };
})(jQuery);
//autocomplete stop

var bd_cpro_rtid = "n16znH6";
var oldstr = '';

try { document.execCommand("BackgroundImageCache", false, true) } catch (e) { };
function AddFavorite(url, title) {
    if (url == "") {
        url = "<!--{$www_url}-->";
    }
    if (title == "") {
        title = "椤轰赴浼橀€�";
    }
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            alert("鎮ㄧ殑娴忚鍣ㄤ笉鏀寔璇ユ搷浣�!璇锋偍浣跨敤鑿滃崟鏍忔垨Ctrl+D鏀惰棌鏈珯銆�");
        }
    }
}

function checkWord(len, fromName) {
    var str = $('.keyword', '#' + fromName).val();
    var showstr = '';
    if (str == oldstr) {
        return false;
    }
    myLen = 0;
    i = 0;
    for (; (i < str.length) && (myLen <= len); i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
            myLen++;
        }
        else {
            myLen += 2;
        }
        if (myLen - len <= 0) {
            showstr += str.substr(i, 1);
        } else { }
    }
    oldstr = showstr;
    $('.keyword', '#' + fromName).val(showstr);
}

function search_keys(formName) {
    checkWord(60, formName);
    $('#' + formName).submit();
}

function getAllPrice(id, css_id) {
    var p_ids = '';
    var e_ids = '';
    $("." + id).each(
		function () {
		    var goodsId = $(this).attr('goods');
		    var eid = $(this).attr('eid');
		    if (p_ids) {
		        p_ids = p_ids + ',' + goodsId;
		    } else {
		        p_ids = goodsId;
		    }
		    if (e_ids) {
		        e_ids = e_ids + ',' + eid;
		    } else {
		        e_ids = eid;
		    }
		}
	);
    p_ids = p_ids.replace(/,undefined/g, '');
    e_ids = e_ids.replace(/,undefined/g, '');
    if (p_ids && e_ids) {
        $.post("/product/getAllPrice/", { pids: p_ids, eids: e_ids }, function (str) {
            if (str) {
                for (var i = 0; i < str.length; i++) {
                    var e_id = str[i]['eid'];
                    if (parseFloat(str[i].sfprice) == parseFloat(str[i].price)) {
                        if (css_id == 'tariff_') {
                            $("#" + css_id + e_id).html('锟�' + str[i]['sfprice']);
                        } else {
                            $("#" + css_id + e_id).html('<b>锟�' + str[i]['sfprice'] + '</b>');
                        }
                    } else {
                        if (css_id == 'tariff_') {
                            $("#" + css_id + e_id).html('锟�' + str[i]['price']);
                        } else {
                            $("#" + css_id + e_id).html('<b>锟�' + str[i]['price'] + '</b><font>锟�' + str[i]['sfprice'] + '</font>');
                        }
                    }
                    if ($.trim(str[i].tag_img) != '' && (css_id == 'priceL_')) {
                        $("#" + css_id + e_id).parent().append('<span class="icon-cx"><img src="' + str[i].tag_img + '" /></span>');
                    }
                    if (typeof (str[i].presell) !== 'undefined') {
                        if (css_id == 'tariff_') {
                            $("#" + css_id + e_id).html('<b>锟�' + str[i].presell.price + '</b>');
                        } else {
                            $("#" + css_id + e_id).html('<b>锟�' + str[i].presell.price + '</b><font>锟�' + str[i]['sfprice'] + '</font>');
                        }
                        $("#cx_" + e_id).find(".gBtn").remove();
                    }
                }
            }
        }, "json");
    }
}

function getIndexSale() {
    var categoryIds = '';
    $(".indexSale").each(
		function () {
		    var posId = $(this).attr('sid');
		    if (posId) {
		        categoryIds = categoryIds + ',' + posId;
		    } else {
		        categoryIds = posId;
		    }
		}
	);
    if (!categoryIds) {
        return categoryIds;
    }
    categoryIds = categoryIds.replace(/,undefined/g, '');
    if (categoryIds) {
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: "/ajax/indexSale/categoryIds/" + categoryIds + "/",
            success: function (str) {
                if (str) {
                    $(".indexSale").each(
					function () {
					    var posId = $(this).attr('sid');
					    if (str[posId].indexOf("href") > 0) {
					        $(this).html(str[posId]);
					    }
					}
				);
                }
            }
        });
    }
}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6. 
{
    var arVersion = navigator.appVersion.split("MSIE")
    var version = parseFloat(arVersion[1])
    if ((version == 6) && (document.body.filters)) {
        for (var j = 0; j < document.images.length; j++) {
            var img = document.images[j]
            var imgName = img.src.toUpperCase()
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                var imgID = (img.id) ? "id='" + img.id + "' " : ""
                var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                var imgStyle = "display:inline-block;" + img.style.cssText
                if (img.align == "left") imgStyle = "float:left;" + imgStyle
                if (img.align == "right") imgStyle = "float:right;" + imgStyle
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                var strNewHTML = "<span " + imgID + imgClass + imgTitle
             + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
             + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
             + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                img.outerHTML = strNewHTML
                j = j - 1
            }
        }
    }
}
if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', correctPNG, false);   //firefox
    window.addEventListener('load', correctPNG, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', correctPNG);  //IE
}


 
function isOnline(home_url, passport_url) {
    //login welcome
    $.getJSON("/ajax/isOnline/?callback=?", function (data) {
        if (data.welcome) {
            $('#login').html('<span class="logininfo"> ' + data.welcome + '</span> <a href="' + home_url + '/service/logout/?returnUrl=' + escape(document.location.href) + '">[閫€鍑篯</a>');
        } else {
            $('#login').html('鎮ㄥソ锛屾杩庢偍鏉ュ埌椤轰赴浼橀€�  <a href="' + passport_url + '/?returnUrl=' + escape(document.location.href) + '">鐧诲綍</a> | <a href="' + passport_url + '/reg/?returnUrl=' + escape(document.location.href) + '">娉ㄥ唽</a>');
        }
        if (data.qqcb) {
            $('#login').html('<span class="logininfo"> ' + data.welcome + '</span> <a href="' + home_url + '/service/logout/?returnUrl=' + escape(document.location.href) + '">[閫€鍑篯</a>');
            $('#qqcb').html(data.qqcb);
        }
    });
}

// JavaScript Document 棣栭〉浣跨敤
var nowtimes;
var nextUpTimes;

//鑾峰彇鏈嶅姟鍣ㄦ椂闂�
function givetime() {
    var now = "";
    nowtimess = new Date(nowtimes);
    temph = nowtimess.getHours()
    temps = nowtimess.getSeconds();
    tempi = nowtimess.getMinutes();
    if ((temps < 1 && tempi < 1) || nowtimes > nextUpTimes) {
        qiangGouIndex();
    } else {
        nowtimes = Number(nowtimes) + 1000; //褰撳墠鏃堕棿锛�
        window.setTimeout("givetime()", 1000)
    }
}




//鏃堕棿淇敼
function timechange(id, endtimes) {
    var theDays = Number(endtimes + '000');
    var seconds = (theDays - nowtimes) / 1000;
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var CDay = days;
    var CHour = hours % 24;
    var CMinute = minutes % 60;
    var CSecond = seconds % 60;
    var CHour = CHour + CDay * 24;
    if (CMinute < 10) {
        CMinute = "0" + CMinute;
    }
    if (CHour < 10) {
        CHour = "0" + CHour;
    }
    if (CSecond < 10) {
        CSecond = "0" + CSecond;
    }
    //鏄剧ず鍊掕鏃�
    $("#Hour" + id).html(CHour);
    $("#Min" + id).html(CMinute);
    $("#Sencond" + id).html(CSecond);
    if (CHour == '00' && CMinute == '00' && CSecond == '00') {
        //閲嶆柊鑾峰彇

    } else {
        window.setTimeout("timechange(" + id + "," + endtimes + ")", 1000);
    }
}


//鍙屽崄涓€娲诲姩鍊掕鏃�
function ssytimechange() {
    var theDays = Number(1384012799000);
    var seconds = (theDays - nowtimes) / 1000;
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var CDay = days;
    var CHour = hours % 24;
    var CMinute = minutes % 60;
    var CSecond = seconds % 60;
    var CHour = CHour + CDay * 24;
    if (CMinute < 10) {
        CMinute = "0" + CMinute;
    }
    if (CHour < 10) {
        CHour = "0" + CHour;
    }
    if (CSecond < 10) {
        CSecond = "0" + CSecond;
    }
    //鏄剧ず鍊掕鏃�
    //$("#ssyDay").html(CDay);
    $("#ssyHour").html(CHour);
    $("#ssyMin").html(CMinute);
    $("#ssySencond").html(CSecond);
    if (CHour == '00' && CMinute == '00' && CSecond == '00') {
        //閲嶆柊鑾峰彇
        $("#countTimeOut").hide();
    } else {
        window.setTimeout("ssytimechange()", 1000)
    }
}

/**
* 鎶㈣喘
*/
function qiangGouIndex() {
    $.post("/ajax/GetQingIndex", null, function (str) {
        nowtimes = Number(str.nowtimes + '000');
        nextUpTimes = Number(str.nextUpTimes + '000');
        //杩涜鏃舵病鏈夐鍛婃湁鎯呭喌銆€涓嶆樉绀鸿繘琛屾椂
        if ((str.nowList.length < 1 && str.nextList.length > 0)) {
            $("#nowTitle").hide();
            $("#nowCon").hide();
            $("#nextCon").show();
        } else {
            $nowCon = "";
            for (i = 0; i < 5; i++) {
                temp = str.nowList[i];
                var trackref = '#trackref=sfbest_hp_hp_Flash_1-' + (i + 1);
                if (temp) {
                    styleId = temp.aid;
                    if (temp.isStork) {
                        $nowCon += "<li id='cx_q_" + temp.product_id + "' eid='q_" + temp.product_id + "' goods='" + temp.product_id + "'>";
                        $nowCon += ' <div class="countdowm">鍓╀綑<span id="Hour' + styleId + '">00</span>灏忔椂<span id="Min' + styleId + '">00</span>鍒嗛挓<span id="Sencond' + styleId + '">00</span>绉�</div>';
                    } else {
                        $nowCon += "<li class='runover'>";
                        $nowCon += ' <div class="countdowm"><span>璇ュ晢鍝佸凡鎶㈠畬</span></div>';
                    }
                    $nowCon += ' <div class="pImg"><a title="' + temp.title + '" target="_blank" href="' + temp.url + trackref + '"><img onerror="this.src=\'http://i.sfbest.com/html/images/150pic.jpg\'" alt="' + temp.title + '" src="' + temp.img + '"></a>';
                    if (temp.isStork) {
                        $nowCon += '<div class="gBtn p-btn" style="top: 184px;"><a href="javascript:void(0)" data_url="' + temp.img + '" pid="' + temp.product_id + '">鍔犲叆璐墿杞�</a></div>';
                    }
                    $nowCon += '</div>';
                    $nowCon += ' <div class="title-a"><a title="' + temp.title + '" target="_blank" href="' + temp.url + trackref + '">' + temp.title + '</a></div>';
                    $nowCon += ' <div class="price"><b>锟�' + temp.qgprice + '</b><font>锟�' + temp.sfprice + '</font></div>';
                    $nowCon += '<script>timechange(' + styleId + ',' + temp.stopTime + ');</script>';
                } else {
                    $nowCon += '<li class="beginning">';
                    $nowCon += '<div class="countdowm">鍓╀綑<span>00</span>灏忔椂<span>00</span>鍒嗛挓<span>00</span>绉�</div>';
                    $nowCon += '<div class="pImg"><img src="http://p.sfbest.com/article/1398320211.jpg" alt="" /></div>';
                    $nowCon += '<div class="title-d">鏁鏈熷緟</div>';
                    $nowCon += '</li>';
                }
            }
            $("#nowCon").html($nowCon);
        }

        //濡傛灉棰勫憡娌℃湁闅愯棌棰勫憡
        if (str.nextList.length < 1) {
            $("#nextTitle").hide();
            $("#nextCon").hide();
        } else {
            $nextCon = "";
            for (i = 0; i < 5; i++) {
                temp = str.nextList[i];
                var trackref = '#trackref=sfbest_hp_hp_Flash_2-' + (i + 1);
                if (temp) {
                    styleId = temp.aid;
                    $nextCon += "<li>";
                    $nextCon += ' <div class="countdowm">璺濆紑濮�<span id="Hour' + styleId + '">00</span>灏忔椂<span id="Min' + styleId + '">00</span>鍒嗛挓<span id="Sencond' + styleId + '">00</span>绉�</div>';
                    $nextCon += ' <div class="pImg"><a title="' + temp.title + '" target="_blank" href="' + temp.url + trackref + '"><img onerror="this.src=\'http://i.sfbest.com/html/images/150pic.jpg\'" alt="' + temp.title + '" src="' + temp.img + '"></a></div>';
                    $nextCon += ' <div class="title-a"><a title="' + temp.title + '" target="_blank" href="' + temp.url + trackref + '">' + temp.title + '</a></div>';
                    $nextCon += ' <div class="price"><b>锟�' + temp.qgprice + '</b><font>锟�' + temp.sfprice + '</font></div>';
                    $nextCon += '<script>timechange(' + styleId + ',' + temp.startTime + ');</script>';
                } else {
                    $nextCon += '<li class="beginning">';
                    $nextCon += '<div class="countdowm">璺濆紑濮�<span>00</span>灏忔椂<span>00</span>鍒嗛挓<span>00</span>绉�</div>';
                    $nextCon += '<div class="pImg"><img src="http://p.sfbest.com/article/1398320211.jpg" alt="" /></div>';
                    $nextCon += '<div class="title-d">鏁鏈熷緟</div>';
                    $nextCon += '</li>';
                }
            }
            $("#nextCon").html($nextCon);
        }
    }, "json");
}

function getWordAll(isproduct, wwwurl) {
    if (isproduct > 0) {
        var searchUrl = wwwurl + "/productlist/search?inputBox=1&keyword=";
        var Url = '/ajax/getWordAll/';
    } else {
        var searchUrl = wwwurl + "/article/search?keyword=";
        var Url = '/ajax/getWordAll/type/1';
    }
    $.ajax({
        url: Url,
        dataType: "jsonp",  //杩斿洖json鏍煎紡鐨勬暟鎹�   
        jsonp: "callback",
        success: function (data) {
            if (data.hotWords) { temp = data.hotWords; hot = '鐑棬鎼滅储锛�'; }
            temp = temp.split(",");
            for (var i = 0; i < temp.length; i++) {
                hot += "<a href='" + searchUrl + encodeURI(temp[i]) + "#trackref=sfbest_hp_hp_head_Keywords" + (i + 1) + "' >" + temp[i] + "</a>";
            }
            var keywordVal = data.keyWords;
            $('.keyword').val(keywordVal);
            $('.search_hot').html(hot);
            $(".keyword").click(function () {
                var txt_value = $(this).val();
                if (txt_value == keywordVal) {
                    $(this).val("");
                }
            });
            $(".keyword").blur(function () {
                var txt_value = $(this).val();
                if (txt_value == "") {
                    $(this).val(keywordVal);
                }
            })
        }
    });
}

function search() {
    $("#searchForm").submit();
}
function getkeyword(isproduct, wwwurl, formName) {
    if (isproduct > 0) {
        var url = '/productlist/keysearch';
        var str = '鐩稿叧鏂囩珷';
        var searchUrl = '/article/search';
        var typestr = '鍟嗗搧';
        var company1 = '浠�';
        var company2 = '绡�';
    } else {
        var url = '/article/keysearch';
        var str = '鐩稿叧鍟嗗搧';
        var searchUrl = '/productlist/search';
        var typestr = '鏂囩珷';
        var company1 = '绡�';
        var company2 = '浠�';
    }
    var $input = $("input:text[name='keyword']", "#" + formName);
    var $articleCount = $("<div/>").hide();
    $input.select().autocomplete(url, {
        delay: 50,
        cacheLength: 0,
        dataType: "jsonp",
        max: 100,
        selectFirst: false,
        formatItem: function (row) { // 瑙ｆ瀽鏁版嵁
            var type = row[0];
            var item = "", label = null;
            if (type == 1 && row.length > 1) { // 鎼滅储鍟嗗搧涓嶅甫缁熻鏁版嵁
                label = row[1];
                item += '<div class="jq_auto_complete_key">' + label + '</div>';
            } else if (type == 2 && row.length > 2) { // 鎼滅储鍟嗗搧甯︾粺璁℃暟鎹�
                label = row[1];
                var count = results = parseInt(row[2]);
                if (count == 0) {
                    item += '<div class="jq_auto_complete_key">' + label + '</div><div class="jq_auto_complete_results">娌℃湁鎵惧埌鐩稿叧' + typestr + '</div>';
                } else {
                    item += '<div class="jq_auto_complete_key">' + label + '</div><div class="jq_auto_complete_results">绾�' + count + '' + company1 + '</div>';
                }
            } else if (type == 3 && row.length > 2) { // 鎻愮ず鏌愮被鍒笅鎼滅储
                //alert(row[4])
                label = row[1], categoryId = row[2]; categoryName = row[3]; categoryTwoId = row[4]; categoryTwoName = row[5]; count = parseInt(row[6]);
                categoryId = categoryTwoId ? categoryTwoId : categoryId;
                item += '<input type="hidden" class="jq_auto_complete_categoryId" value="' + categoryId
					 + '"/><div class="jq_auto_complete_key" style="display:none;">' + label
					 + '</div><span class="jq_auto_complete_category_tip" style="float:left;">鍦�<b>' + categoryName + '>' + categoryTwoName + '</b>鍒嗙被涓悳绱�</span><div class="jq_auto_complete_results">绾�' + count + company1 + '</div>';
            } else if (type == 4 && row.length > 2) { // 鐩稿叧鏂囩珷鎬绘暟缁熻
                var searchkeyword = row[1]; var searchkeywordcount = row[2];
                $articleCount.html("<a class='otherType' href='" + searchUrl + "?keyword="
									+ searchkeyword + "'>鎼� <span>" + searchkeyword
									+ "</span> " + str + "绾� <span>" + searchkeywordcount + "</span> " + company2 + "</a>").show()
							 .mouseover(function (event) {
							     $("li.ac_over").removeClass("ac_over");
							 });
            }
            return item;
        },
        formatResult: function (row) {
            return row[1];
        },
        scroll: false,
        selectItem: function (activeItem) {
            var $key = $(".jq_auto_complete_key", activeItem);
            if ($key.length) { $input.val($key.text()); }

            var $categoryId = $(".jq_auto_complete_categoryId", activeItem).val();
            var $inputCategoryId = $("input[name='categoryId']");
            if ($categoryId) {
                $inputCategoryId.val($categoryId);
            } else {
                $inputCategoryId.val(0);
            }
        },
        searchAction: function () {
            $("#" + formName).submit();
        },
        addArticleCountItem: function (parentElement) {
            $articleCount.appendTo(parentElement);
        }
    }).result(function (event, data, formatted) {
        //濡傞€夋嫨鍚庣粰鍏朵粬鎺т欢璧嬪€硷紝瑙﹀彂鍒殑浜嬩欢绛夌瓑
        if (data[0] == 3) {
            $categoryId = $(".jq_auto_complete_categoryId").val();
            $inputCategoryId = $("input[name='categoryId']");
            $inputCategoryId.val($categoryId);
        }
    });
}



/***
describe edm鐩稿叧js
Author zyf
Date 2013-09-22
***/
$(document).ready(function () {
    $("#store-selector1").mouseover(function () { $(this).addClass("hover"); });
    $("#footermail").bind("focus", function () {
        if ($(this).val() == '璇疯緭鍏ラ偖绠卞湴鍧€') {
            $(this).val('');
            return;
        }
    });
    $("#footermail").bind("blur", function () {
        if ($(this).val() == '') {
            $(this).val('璇疯緭鍏ラ偖绠卞湴鍧€');
            return;
        }
    });
    $("#emailval").bind("focus", function () {
        if ($(this).val() == '璇疯緭鍏ラ偖绠卞湴鍧€') {
            $(this).val('');
        }
    });
    var getFootRegionSf = function () {
        
    }
    getFootRegionSf();
})
var ckboxlist = function (obj) {
    var objName = document.getElementsByName(obj);
    var targetStr = ii = -1;
    for (i = 0; i < objName.length; i++) {
        if (objName[i].type == "checkbox" && objName[i].checked) {
            ++ii;
            if (ii == 0) { targetStr = i + 1; } else { targetStr = targetStr + "," + (1 + i); }
        }
    }
    if (targetStr == -1) { return -1; }
    return targetStr;
}
var getCookie = function (searchName) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookiesCrumbs = cookies[i].split("="); var cookieName = $.trim(cookiesCrumbs[0]); var cookieValue = $.trim(cookiesCrumbs[1]);
        if (cookieName == searchName) { return cookieValue; }
    }
    return false;
}
var checkMail = function (id) {
    var val = $.trim($("#" + id).val());
    if (val == '') {
        $("#" + id).val('璇疯緭鍏ラ偖绠卞湴鍧€'); return 1;
    }
    if (val == '璇疯緭鍏ラ偖绠卞湴鍧€') {
        $("#" + id).val(''); return 1;
    }
    if (!COMSTATIC.mail_preg(val)) { jAlert('璇疯緭鍏ユ纭殑閭鍦板潃锛�'); return 1; }
    return 2;
}
var subedm = function () {
    
}
var subfootedm = function () {
     
  
}

$.fn.dropdown = function (b, c) {
    if (this.length) {
        "function" == typeof b && (c = b, b = {});
        var d = $.extend({
            event: "mouseover",
            current: "hover",
            delay: 0
        }, b || {}),
			e = "mouseover" == d.event ? "mouseout" : "mouseleave";
        $.each(this, function () {
            var b = null,
				f = null,
				g = !1;
            $(this).bind(d.event, function () {
                if (g) clearTimeout(f);
                else {
                    var e = $(this);
                    b = setTimeout(function () {
                        e.addClass(d.current), g = !0, c && c(e)
                    }, d.delay)
                }
            }).bind(e, function () {
                if (g) {
                    var c = $(this);
                    f = setTimeout(function () {
                        c.removeClass(d.current), g = !1
                    }, d.delay)
                } else clearTimeout(b)
            })
        })
    }
};
function imgAnimate(t) {
    var e = $(t);
    var i = e.find(".a-img");
    i.bind("mouseenter", function () {
        $(this).find("img").stop(!0).animate({
            left: "-10px"
        }, 300)
    }).bind("mouseleave", function () {
        $(this).find("img").stop(!0).animate({
            left: "0px"
        }, 300)
    })
}

function showCatTag(id, n) {
    var cattop = $("#cat" + n).offset().top - 8,
      catleft = $("#cat" + n).offset().left + 80;
    $(id).css({ "top": cattop, "left": catleft });
}

$(function () {
    $(".topMenu .menus").dropdown({
        delay: 50
    }), $(".allCat").dropdown({
        delay: 50
    }, function () {
        var flag = $('#allCategory').attr('flag');
        if (0 == flag) {
            $.ajax({
                type: 'get',
                async: false,
                dataType: 'jsonp',
                url: "/ajax/HeadAllCategory/",
                success: function (data) {
                    $('#allCategory').html(data.data);
                    $('#floatAllCategory').html(data.data);
                    $('#allCategory').attr('flag', '1');
                    //alert(data);
                }
            });
        }

    }), $("#topCart").dropdown({
        delay: 50
    }, function () {
        $("#cat_form13").show();
        $("#cat_form13 li").length && $("#topCart").find("s").addClass("setCart");
    }), $(".topMenu .tShow").dropdown({
        delay: 50
    });
    if ($(".floatBar").length > 0) {
        var floatBar = function () {
            var floatBarTop = $(document).scrollTop(), startTop = $(".navmenu").offset().top;
            (floatBarTop > startTop) ? $(".floatBar").removeClass("hide") : $(".floatBar").addClass("hide");
        };
        $(window).bind("scroll", floatBar);
        floatBar();
    }
    0 !== $(".rTopImg").length && imgAnimate(".rTopImg");
    var index_win_w = $(window).width();
    if (index_win_w <= 1400) { $(".index_rfloat").addClass("index_side"); }
    else { $(".index_rfloat").removeClass("index_side"); }
    $(window).resize(function () {
        var index_win_width = $(window).width();
        if (index_win_width <= 1400) { $(".index_rfloat").addClass("index_side"); }
        else { $(".index_rfloat").removeClass("index_side"); }
    });
});

//index page set cookie for webapp
(function ($, window) {
    var 
        url = window.location.href,
        queryKey = function (key, url) {
            var query = url.indexOf('?') > -1 ? url.split('?')[1] : url;
            if (!query) return '';
            var queryr = query.split('&');
            while (true) {
                var k = queryr.pop();
                if (!k) {
                    break;
                }
                var q = k.split('=');
                if (q[0] && q[1] && q[0] == key) {
                    return q[1];
                }
            }
            return '';
        },
        cookieKey = 'uc',
        cookieVal = queryKey(cookieKey, url);

    if (cookieVal == '1') {
        var curCookie = cookieKey + "=" + window.encodeURIComponent(cookieVal)
                      + "; path=/";
        window.document.cookie = curCookie;
    }

})($, window);