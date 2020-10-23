(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/jyf-parser/libs/trees" ], {
    "34af": function(t, e, n) {
        var r = n("d403");
        n.n(r).a;
    },
    "6d1a": function(t, e, n) {
        e.a = function(t) {
            t.options.wxsCallMethods || (t.options.wxsCallMethods = []);
        };
    },
    "83f3": function(t, e, n) {
        n.r(e);
        var r = n("f03b"), a = n("a0e9");
        for (var o in a) "default" !== o && function(t) {
            n.d(e, t, function() {
                return a[t];
            });
        }(o);
        n("34af");
        var i = n("f0c5"), s = n("6d1a"), c = Object(i.a)(a.default, r.b, r.c, !1, null, null, null, !1, r.a, void 0);
        "function" == typeof s.a && Object(s.a)(c), e.default = c.exports;
    },
    a0e9: function(t, e, n) {
        n.r(e);
        var r = n("ad9b"), a = n.n(r);
        for (var o in r) "default" !== o && function(t) {
            n.d(e, t, function() {
                return r[t];
            });
        }(o);
        e.default = a.a;
    },
    ad9b: function(t, e, n) {
        (function(t, r) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0, t.Parser = {};
            var a = {
                components: {
                    trees: function() {
                        Promise.resolve().then(function() {
                            return resolve(n("83f3"));
                        }.bind(null, n)).catch(n.oe);
                    }
                },
                name: "trees",
                data: function() {
                    return {
                        ns: [],
                        loadVideo: !0
                    };
                },
                props: {
                    nodes: Array,
                    lazyLoad: Boolean
                },
                watch: {
                    nodes: {
                        immediate: !0,
                        handler: function(t) {
                            this.ns = t;
                        }
                    }
                },
                mounted: function() {
                    for (this.top = this.$parent; "parser" != this.top.$options.name; ) {
                        if (this.top.top) {
                            this.top = this.top.top;
                            break;
                        }
                        this.top = this.top.$parent;
                    }
                },
                methods: {
                    play: function(t) {
                        var e = this.top.videoContexts;
                        if (e.length > 1 && this.top.autopause) for (var n = e.length; n--; ) e[n].id != t.currentTarget.dataset.id && e[n].pause();
                    },
                    imgtap: function(e) {
                        var n = e.currentTarget.dataset.attrs;
                        if (!n.ignore) {
                            var a = !0, o = {
                                id: e.target.id,
                                src: n.src,
                                ignore: function() {
                                    return a = !1;
                                }
                            };
                            if (t.Parser.onImgtap && t.Parser.onImgtap(o), this.top.$emit("imgtap", o), a) {
                                var i = this.top.imgList, s = i[n.i] ? parseInt(n.i) : (i = [ n.src ], 0);
                                r.previewImage({
                                    current: s,
                                    urls: i
                                });
                            }
                        }
                    },
                    loadImg: function(t) {
                        var e = t.target.dataset;
                        e.auto && (this.ns[e.i].attrs.style += ";width:".concat(t.detail.width, "px"));
                    },
                    linkpress: function(e) {
                        var n = !0, a = e.currentTarget.dataset.attrs;
                        if (a.ignore = function() {
                            return n = !1;
                        }, t.Parser.onLinkpress && t.Parser.onLinkpress(a), this.top.$emit("linkpress", a), 
                        n) {
                            if (a["app-id"]) return r.navigateToMiniProgram({
                                appId: a["app-id"],
                                path: a.path
                            });
                            a.href && ("#" == a.href[0] ? this.top.useAnchor && this.top.navigateTo({
                                id: a.href.substring(1)
                            }) : 0 == a.href.indexOf("http") || 0 == a.href.indexOf("//") ? r.setClipboardData({
                                data: a.href,
                                success: function() {
                                    return r.showToast({
                                        title: "链接已复制"
                                    });
                                }
                            }) : r.navigateTo({
                                url: a.href
                            }));
                        }
                    },
                    error: function(t) {
                        var e, n = "", a = t.currentTarget, o = a.dataset.source, i = this.ns[a.dataset.i];
                        "video" == o || "audio" == o ? (this.$set(i, "i", (i.i || 0) + 1), "video" == o && (e = r.createVideoContext(a.id, this))) : "img" == o && (e = {
                            setSrc: function(t) {
                                return n = t;
                            }
                        }), this.top && this.top.$emit("error", {
                            source: o,
                            target: a,
                            errMsg: t.detail.errMsg,
                            errCode: t.detail.errCode,
                            context: e
                        }), "img" == o && (this.$set(i.attrs, "src", n), n || this.$set(i, "err", 1));
                    },
                    _loadVideo: function(t) {
                        var e = t.target.dataset.i;
                        this.ns[e].lazyLoad = !1, this.ns[e].attrs.autoplay = !0;
                    }
                }
            };
            e.default = a;
        }).call(this, n("c8ba"), n("543d").default);
    },
    d403: function(t, e, n) {},
    f03b: function(t, e, n) {
        var r = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, a = [];
        n.d(e, "b", function() {
            return r;
        }), n.d(e, "c", function() {
            return a;
        }), n.d(e, "a", function() {});
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/jyf-parser/libs/trees-create-component", {
    "components/jyf-parser/libs/trees-create-component": function(t, e, n) {
        n("543d").createComponent(n("83f3"));
    }
}, [ [ "components/jyf-parser/libs/trees-create-component" ] ] ]);