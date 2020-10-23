// components/jyf-parser/jyf-parser.js
Component({
  /**
   * 组件的属性列表
   */
  components: {
    trees: function () {
      n.e("components/jyf-parser/libs/trees").then(function () {
        return resolve(n("83f3"));
      }.bind(null, n)).catch(n.oe);
    }
  },
  properties: {
    html: null,
    autopause: {
      type: Boolean,
      default: !0
    },
    autosetTitle: {
      type: Boolean,
      default: !0
    },
    compress: Number,
    useCache: Boolean,
    xml: Boolean,
    domain: String,
    gestureZoom: Boolean,
    lazyLoad: Boolean,
    selectable: Boolean,
    tagStyle: Object,
    showWithAnimation: Boolean,
    useAnchor: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    scaleAm: "",
    showAm: "",
    imgs: [],
    nodes: []
  },
  watch: {
    html: function (t) {
      this.setContent(t);
    }
  },
  mounted: function () {
    this.imgList = [], this.imgList.each = function (t) {
      for (var e = 0, i = this.length; e < i; e++) this.setItem(e, t(this[e], e, this));
    }, this.imgList.setItem = function (t, e) {
      var i = this;
      if (void 0 != t && e) {
        if (0 == e.indexOf("http") && this.includes(e)) {
          for (var n, s = "", o = 0; (n = e[o]) && ("/" != n || "/" == e[o - 1] || "/" == e[o + 1]); o++) s += Math.random() > .5 ? n.toUpperCase() : n;
          return s += e.substr(o), this[t] = s;
        }
        if (this[t] = e, e.includes("data:image")) {
          var r, c = e.match(/data:image\/(\S+?);(\S+?),(.+)/);
          if (!c) return;
          r = "".concat(wx.env.USER_DATA_PATH, "/").concat(Date.now(), ".").concat(c[1]),
            a && a.writeFile({
              filePath: r,
              data: c[3],
              encoding: c[2],
              success: function () {
                return i[t] = r;
              }
            });
        }
      }
    }, this.html && this.setContent(this.html);
  },
  beforeDestroy: function () {
    this.imgList.each(function (t) {
      t && t.includes(e.env.USER_DATA_PATH) && a && a.unlink({
        filePath: t
      });
    }), clearInterval(this._timer);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setContent: function (i, n) {
      var a, c, h = this;
      if (!i) return this.nodes = [];
      if ("string" == typeof i) {
        var l = new r(i, this);
        if (this.useCache) {
          var f = s(i);
          o[f] ? a = o[f] : (a = l.parse(), o[f] = a);
        } else a = l.parse();
        this.$emit("parse", a);
      } else if ("[object Array]" == Object.prototype.toString.call(i)) {
        if (i.length && "Parser" != i[0].PoweredBy) {
          var u = new r(i, this);
          !function t(e) {
            for (var i, n = 0; i = e[n]; n++) if ("text" != i.type) {
              for (var s in i.attrs = i.attrs || {}, i.attrs) "string" != typeof i.attrs[s] && (i.attrs[s] = i.attrs[s].toString());
              u.matchAttr(i, u), i.children && i.children.length ? (u.STACK.push(i), t(i.children),
                u.popNode(u.STACK.pop())) : i.children = void 0;
            }
          }(i);
        }
        a = i;
      } else {
        if ("object" != (void 0 === i ? "undefined" : t(i)) || !i.nodes) return console.warn("错误的 html 类型：" + (void 0 === i ? "undefined" : t(i)));
        a = i.nodes, console.warn("错误的 html 类型：object 类型已废弃");
      }
      this.nodes = n ? this.nodes.concat(a) : a, a.length && a[0].title && this.autosetTitle && e.setNavigationBarTitle({
        title: a[0].title
      }), this.$nextTick(function () {
        h.imgList.length = 0, h.videoContexts = [];
        (function t(i) {
          for (var n, s = 0; n = i[s++];) {
            if ("trees" == n.$options.name) for (var o, a = n.nodes.length; o = n.nodes[--a];) if (!o.c) if ("img" == o.name) h.imgList.setItem(o.attrs.i, o.attrs.src); else if ("video" == o.name) {
              var r = e.createVideoContext(o.attrs.id, n);
              r.id = o.attrs.id, h.videoContexts.push(r);
            }
            n.$children.length && t(n.$children);
          }
        })(h.$children), h.$emit("load");
      }), clearInterval(this._timer), this._timer = setInterval(function () {
        h.createSelectorQuery().select("#top").boundingClientRect().exec(function (t) {
          h.width = t[0].width, t[0].height == c && (h.$emit("ready", t[0]), clearInterval(h._timer)),
            c = t[0].height;
        });
      }, 350), this.showWithAnimation && !n && (this.showAm = "animation:show .5s");
    },
    getText: function () {
      for (var t, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.nodes, i = "", n = 0; t = e[n++];) if ("text" == t.type) i += t.text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"); else if ("br" == t.type) i += "\n"; else {
        var s = "p" == t.name || "div" == t.name || "tr" == t.name || "li" == t.name || "h" == t.name[0] && t.name[1] > "0" && t.name[1] < "7";
        s && i && "\n" != i[i.length - 1] && (i += "\n"), t.children && (i += this.getText(t.children)),
          s && "\n" != i[i.length - 1] ? i += "\n" : "td" != t.name && "th" != t.name || (i += "\t");
      }
      return i;
    },
    navigateTo: function (t) {
      var i = this;
      if (!this.useAnchor) return t.fail && t.fail({
        errMsg: "Anchor is disabled"
      });
      var n = function (n, s) {
        e.createSelectorQuery().in(s || i).select(n).boundingClientRect().selectViewport().scrollOffset().exec(function (i) {
          if (!i || !i[0]) return t.fail && t.fail({
            errMsg: "Label not found"
          });
          t.scrollTop = i[1].scrollTop + i[0].top, e.pageScrollTo(t);
        });
      };
      n(t.id ? "#top >>> #" + t.id + ", #top >>> ." + t.id : "#top");
    },
    getVideoContext: function (t) {
      if (!t) return this.videoContexts;
      for (var e = this.videoContexts.length; e--;) if (this.videoContexts[e].id == t) return this.videoContexts[e];
    },
    preLoad: function (t, e) {
      if ("string" == typeof t) {
        var i = s(t);
        t = new r(t, this).parse(), o[i] = t;
      }
      var n = [];
      (function t(e) {
        for (var i, s = 0; i = e[s++];) "img" == i.name && i.attrs.src && !n.includes(i.attrs.src) && n.push(i.attrs.src),
          t(i.children || []);
      })(t), e && (n = n.slice(0, e)), this._wait = (this._wait || []).concat(n), this.imgs ? this.imgs.length < 15 && (this.imgs = this.imgs.concat(this._wait.splice(0, 15 - this.imgs.length))) : this.imgs = this._wait.splice(0, 15);
    },
    _load: function (t) {
      this._wait.length && this.$set(this.imgs, t.target.id, this._wait.shift());
    },
    _tap: function (t) {
      if (this.gestureZoom && t.timeStamp - this._lastT < 300) {
        var i = t.touches[0].pageY - t.currentTarget.offsetTop;
        if (this._zoom) this._scaleAm.translateX(0).scale(1).step(), e.pageScrollTo({
          scrollTop: (i + this._initY) / 2 - t.touches[0].clientY,
          duration: 400
        }); else {
          var n = t.touches[0].pageX - t.currentTarget.offsetLeft;
          this._initY = i, this._scaleAm = e.createAnimation({
            transformOrigin: "".concat(n, "px ").concat(this._initY, "px 0"),
            timingFunction: "ease-in-out"
          }), this._scaleAm.scale(2).step(), this._tMax = n / 2, this._tMin = (n - this.width) / 2,
            this._tX = 0;
        }
        this._zoom = !this._zoom, this.scaleAm = this._scaleAm.export();
      }
      this._lastT = t.timeStamp;
    },
    _touchstart: function (t) {
      1 == t.touches.length && (this._initX = this._lastX = t.touches[0].pageX);
    },
    _touchmove: function (t) {
      var e = t.touches[0].pageX - this._lastX;
      if (this._zoom && 1 == t.touches.length && Math.abs(e) > 20) {
        if (this._lastX = t.touches[0].pageX, this._tX <= this._tMin && e < 0 || this._tX >= this._tMax && e > 0) return;
        this._tX += e * Math.abs(this._lastX - this._initX) * .05, this._tX < this._tMin && (this._tX = this._tMin),
          this._tX > this._tMax && (this._tX = this._tMax), this._scaleAm.translateX(this._tX).step(),
          this.scaleAm = this._scaleAm.export();
      }
    }
  }
})
