var testing = !1;
0 <= window.location.href.indexOf("/testing") && (testing = !0);
var forcing = !1,
  ua = navigator.userAgent.toLowerCase(),
  is_android = 0 <= ua.indexOf("android"),
  is_amazon = 0 <= ua.indexOf("kindle") || 0 <= ua.indexOf("silk/"),
  uua = navigator.userAgent,
  is_ios = 0 <= uua.indexOf("iPad") || 0 <= uua.indexOf("iPhone") || 0 <= uua.indexOf("iPod"),
  is_mobile = 0 <= ua.indexOf("mobile"),
  is_firefox = -1 < ua.indexOf("firefox"),
  is_ie8oo = window.attachEvent && !window.addEventListener,
  is_safari = is_firefox = !1;
0 <= ua.indexOf("safari") && -1 == ua.indexOf("chrome") && (is_safari = !0);
var no_raf = !1,
  raf = function(b) {};
window.requestAnimationFrame ? raf = window.requestAnimationFrame : window.mozRequestAnimationFrame ? raf = window.mozRequestAnimationFrame : window.webkitRequestAnimationFrame ? raf = window.webkitRequestAnimationFrame : no_raf = !0;
is_mobile || (no_raf = !0);
var no_raf = !0,
  a, i, j, k, l, m, n, o, r, fj, d, d2, qq, sc, agpu = "translateZ(0)",
  ang, sang, vang;

function trf(b, h) {
  b.style.webkitTransform = b.style.OTransform = b.style.msTransform = b.style.MozTransform = b.style.transform = h
}

function trfo(b, h) {
  b.style.webkitTransformOrigin = b.style.OTransformOrigin = b.style.msTransformOrigin = b.style.MozTransformOrigin = b.style.transformOrigin = h
}
var pi2 = 2 * Math.PI,
  animating = !1,
  startAnimation = function() {
    animating = !0;
    no_raf ? is_mobile ? setInterval("oef()", 33) : is_safari ? setInterval("oef()", 33) : setInterval("oef()", 20) : raf(oef)
  },
  ois = [],
  wic = 0,
  ldi = function(b) {
    wic++;
    var h = {},
      c = document.createElement("img");
    h.ii = c;
    h.sc = 1;
    c.onload = function() {
      for (var b = ois.length - 1; 0 <= b; b--)
        if (ois[b].ii == this) {
          b = ois[b];
          b.ww = this.width;
          b.hh = this.height;
          b.loaded = !0;
          if (b.onload) b.onload();
          break
        }
      wic--;
      0 == wic && startAnimation()
    };
    h.src = b;
    ois.push(h);
    return h
  };

function addCss(b) {
  var h = document.createElement("style");
  document.getElementsByTagName("head")[0].appendChild(h);
  h.type = "text/css";
  h.styleSheet ? h.styleSheet.cssText = b : h.appendChild(document.createTextNode(b))
}
var nbg = document.getElementById("nbg"),
  nzbg, sadg, sadu, sadd, p, xx, yy, grw, grh, elem, map, imgd, ctx;
elem = document.createElement("canvas");
var rw = 64,
  rh = 64;
elem.width = rw;
elem.height = rh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, rw, rh);
imgd = map.data;
l = imgd.length;
for (p = 0; p < l; p += 4) .5 > Math.random() ? imgd[p] = imgd[p + 1] = imgd[p + 2] = 0 : (imgd[p] = 44, imgd[p + 1] = 56, imgd[p + 2] = 68), imgd[p + 3] = Math.floor(32 * Math.random());
ctx.putImageData(map, 0, 0);
nzbg = elem.toDataURL();
32 < nzbg.length && (nbg.style.backgroundImage = "url(" + nzbg + ")");
grw = 2;
grh = 56;
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
for (yy = p = 0; yy < grh; yy++)
  for (j = (grh - 1 - yy) / (grh - 1), j = .5 * (1 - Math.cos(Math.PI * j)), xx = 0; xx < grw; xx++) imgd[p] = Math.min(255, Math.floor(54.4 + 32 * j)), imgd[p + 1] = Math.min(255, Math.floor(108.8 + 64 * j)), imgd[p + 2] = Math.min(255, Math.floor(81.6 + 48 * j)), imgd[p + 3] = 255, p += 4;
ctx.putImageData(map, 0, 0);
sadg = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
for (yy = p = 0; yy < grh; yy++)
  for (j = (grh - 1 - yy) / (grh - 1), j = .5 * (1 - Math.cos(Math.PI * j)), xx = 0; xx < grw; xx++) imgd[p] = Math.min(255, Math.floor(72 + .95 * 48 * j)), imgd[p + 1] = Math.min(255, Math.floor(171 + 93.1 * j)), imgd[p + 2] = Math.min(255, Math.floor(132 + .95 * 87 * j)), imgd[p + 3] = 255, p += 4;
ctx.putImageData(map, 0, 0);
sadu = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
for (yy = p = 0; yy < grh; yy++)
  for (j = yy / (grh - 1), j = .5 * (1 - Math.cos(Math.PI * j)), xx = 0; xx < grw; xx++) imgd[p] = Math.floor(.1 * 48 + 36 * j), imgd[p + 1] = Math.floor(7 + 52.5 * j), imgd[p + 2] = Math.floor(6.4 + 48 * j), imgd[p + 3] = 255, p += 4;
ctx.putImageData(map, 0, 0);
sadd = elem.toDataURL();
32 < sadg.length && 32 < sadu.length && 32 < sadd.length && addCss(".sadg1 { background-image:url(" + sadg + "); }  .sadu1 { background-image:url(" + sadu + "); }  .sadd1 { background-image:url(" + sadd + "); }");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
for (yy = p = 0; yy < grh; yy++)
  for (j = (grh - 1 - yy) / (grh - 1), j = .5 * (1 - Math.cos(Math.PI * j)), xx = 0; xx < grw; xx++) imgd[p] = Math.min(255, Math.floor(.85 * 52 + 26 * j)), imgd[p + 1] = Math.min(255, Math.floor(81.6 + 48 * j)), imgd[p + 2] = Math.min(255, Math.floor(.85 * 144 + 72 * j)), imgd[p + 3] = 255, p += 4;
ctx.putImageData(map, 0, 0);
sadg = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
for (yy = p = 0; yy < grh; yy++)
  for (j = (grh - 1 - yy) / (grh - 1), j = .5 * (1 - Math.cos(Math.PI * j)), xx = 0; xx < grw; xx++) imgd[p] = Math.min(255, Math.floor(72 + .95 * 48 * j)), imgd[p + 1] = Math.min(255, Math.floor(132 + .95 * 87 * j)), imgd[p + 2] = Math.min(255, Math.floor(171 + 93.1 * j)), imgd[p + 3] = 255, p += 4;
ctx.putImageData(map, 0, 0);
sadu = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
for (yy = p = 0; yy < grh; yy++)
  for (j = yy / (grh - 1), j = .5 * (1 - Math.cos(Math.PI * j)), xx = 0; xx < grw; xx++) imgd[p] = Math.floor(.1 * 48 + 36 * j), imgd[p + 1] = Math.floor(5.4 + 40.5 * j), imgd[p + 2] = Math.floor(7 + 52.5 * j), imgd[p + 3] = 255, p += 4;
ctx.putImageData(map, 0, 0);
sadd = elem.toDataURL();
32 < sadg.length && 32 < sadu.length && 32 < sadd.length && addCss(".sadg2 { background-image:url(" + sadg + "); }  .sadu2 { background-image:url(" + sadu + "); }  .sadd2 { background-image:url(" + sadd + "); }");
var mos = [],
  m_iv = -1,
  swmup = !1;

function mkBtn(b, h, c, f) {
  var w = document.createElement("div");
  b.tagName || (b = document.getElementById(b), b.style.width = c + "px", b.style.height = f + "px", w.style.width = c + "px", w.style.height = f + "px");
  var u = {
    lic: 0
  };
  u.elem = b;
  u.md = !1;
  u.mo = !1;
  u.mdf = 0;
  u.mof = 0;
  var e = !0;
  b.style && b.style.position && ("absolute" == (b.style.position + "").toLowerCase() && (e = !1), "fixed" == (b.style.position + "").toLowerCase() && (e = !1));
  e && (b.style.position = "relative");
  w.style.position = "absolute";
  w.style.opacity = 0;
  w.style.left = "0px";
  w.style.top = "0px";
  b.appendChild(w);
  u.ho = w;
  u.alic = function() {
    this.lic++;
    if (3 == this.lic && (this.ho.style.opacity = 1, this.onload)) this.onload()
  };
  mos.push(u);
  u.setEnabled = function(b) {
    b ? (this.disabled = !1, this.upi.style.opacity = this.mof, this.downi.style.opacity = this.mdf, this.elem.style.opacity = 1, this.elem.style.cursor = "pointer") : (this.disabled = !0, this.upi.style.opacity = 0, this.downi.style.opacity = 0, this.elem.style.opacity = .38, this.elem.style.cursor = "default")
  };
  if (h)
    for (e = 1; 3 >= e; e++) {
      var z = document.createElement("img");
      z.draggable = !1;
      z.style.position = "absolute";
      z.style.left = "0px";
      z.style.top = "0px";
      z.border = 0;
      z.width = c;
      z.height = f;
      z.className = "nsi";
      w.appendChild(z);
      1 == e ? (u.normi = z, z.onload = function() {
        for (var b = mos.length - 1; 0 <= b; b--) {
          var e = mos[b];
          if (e.normi == this) {
            e.alic();
            break
          }
        }
      }, z.src = h + ".png") : 2 == e ? (u.upi = z, z.style.opacity = 0, z.onload = function() {
        for (var b = mos.length - 1; 0 <= b; b--) {
          var e = mos[b];
          if (e.upi == this) {
            e.alic();
            break
          }
        }
      }, z.src = h + "up.png") : 3 == e && (u.downi = z, z.style.opacity = 0, z.onload = function() {
        for (var b = mos.length - 1; 0 <= b; b--) {
          var e =
            mos[b];
          if (e.downi == this) {
            e.alic();
            break
          }
        }
      }, z.src = h + "down.png")
    } else w.style.opacity = 1;
  b.onmouseenter = function() {
    for (var b = mos.length - 1; 0 <= b; b--) {
      var e = mos[b];
      if (e.elem == this) {
        if (!e.disabled && !e.mo) {
          e.mo = !0;
          if (e.onmouseenter) e.onmouseenter(); - 1 == m_iv && (m_iv = setInterval("hmos()", 25))
        }
        break
      }
    }
  };
  b.onmouseleave = function() {
    for (var b = mos.length - 1; 0 <= b; b--) {
      var e = mos[b];
      if (e.elem == this) {
        if (e.mo) {
          e.mo = !1;
          if (e.onmouseleave) e.onmouseleave(); - 1 == m_iv && (m_iv = setInterval("hmos()", 25))
        }
        break
      }
    }
  };
  b.onmousedown = function(b) {
    for (var e =
        mos.length - 1; 0 <= e; e--) {
      var c = mos[e];
      if (c.elem == this) {
        if (!c.disabled && !c.md) {
          c.md = !0;
          if (c.onmousedown) c.onmousedown(b, c); - 1 == m_iv && (m_iv = setInterval("hmos()", 25));
          return !1
        }
        break
      }
    }
  };
  b.onmouseup = b.ondragend = function(b) {
    for (var e = mos.length - 1; 0 <= e; e--) {
      var c = mos[e];
      if (c.elem == this) {
        if (c.md) {
          c.mdf = 1;
          c.md = !1;
          if (c.onmouseup && (c.onmouseup(b, c), is_mobile)) c.elem.onmouseleave(); - 1 == m_iv && (m_iv = setInterval("hmos()", 25))
        }
        break
      }
    }
  };
  swmup || (swmup = !0, window.onmouseup = window.ondragover = window.ondragend = function() {
    for (var b =
        mos.length - 1; 0 <= b; b--) {
      var e = mos[b];
      e.md && (e.md = !1, -1 == m_iv && (m_iv = setInterval("hmos()", 25)))
    }
  });
  return u
}

function hmos() {
  for (var b, h = !1, c = mos.length - 1; 0 <= c; c--) {
    var f = mos[c];
    b = !1;
    f.mo ? 1 != f.mof && (h = !0, f.mof += .33, 1 <= f.mof && (f.mof = 1), b = !0) : 0 != f.mof && (h = !0, f.mof -= .2, 0 >= f.mof && (f.mof = 0), b = !0);
    b && (f.upi.style.opacity = f.disabled ? 0 : f.mof);
    b = !1;
    f.md ? 1 != f.mdf && (h = !0, f.mdf += .33, 1 <= f.mdf && (f.mdf = 1), b = !0) : 0 != f.mdf && (h = !0, f.mdf -= .2, 0 >= f.mdf && (f.mdf = 0), b = !0);
    b && (f.downi.style.opacity = f.disabled ? 0 : f.mdf)
  }
  h || (clearInterval(m_iv), m_iv = -1)
}

function makeTextBtn(b, h, c, f, w) {
  h || (h = 56);
  56 < h && (h = 56);
  c || (c = 15);
  f || (f = 14);
  var u = document.createElement("div");
  u.className = "btnt nsi sadg" + w;
  var e = u.style;
  e.position = "absolute";
  e.width = "auto";
  e.color = "#ffffff";
  e.fontWeight = "bold";
  e.textAlign = "center";
  e.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
  e.fontSize = c + "px";
  u.textContent = b;
  e.cursor = "pointer";
  document.body.appendChild(u);
  var z = Math.ceil(35 + u.offsetWidth);
  document.body.removeChild(u);
  u.textContent = "";
  e.width = z + "px";
  e.height = h +
    "px";
  e.lineHeight = h + "px";
  is_mobile || (e.boxShadow = "0px 3px 20px rgba(0,0,0, .75)");
  e.borderRadius = f + "px";
  var E = document.createElement("div"),
    e = E.style;
  e.position = "absolute";
  e.left = e.top = "0px";
  e.width = z + "px";
  e.height = h + "px";
  e.borderRadius = f + 1 + "px";
  e.opacity = 0;
  E.className = "sadu" + w;
  var t = document.createElement("div"),
    e = t.style;
  e.position = "absolute";
  e.left = e.top = "-1px";
  e.width = z + 2 + "px";
  e.height = h + 2 + "px";
  e.borderRadius = f + "px";
  e.opacity = 0;
  t.className = "sadd" + w;
  var x = mkBtn(u);
  x.a = 1;
  x.ho.appendChild(E);
  x.upi =
    E;
  x.ho.appendChild(t);
  x.downi = t;
  x.ts = c;
  x.ww = z;
  x.bgm = w;
  x.setText = function(b) {
    var e = document.createElement("div");
    e.className = "nsi sadg" + this.bgm;
    var c = e.style;
    c.position = "absolute";
    c.width = "auto";
    c.color = "#ffffff";
    c.fontWeight = "bold";
    c.textAlign = "center";
    c.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
    c.fontSize = this.ts + "px";
    e.textContent = b;
    document.body.appendChild(e);
    c = Math.ceil(35 + e.offsetWidth);
    document.body.removeChild(e);
    this.btnf.textContent = b;
    this.ww = c;
    this.elem.style.width = c +
      "px";
    this.upi.style.width = c + "px";
    this.downi.style.width = c + 2 + "px";
    this.btnf.style.width = c + "px"
  };
  c = document.createElement("div");
  u.appendChild(c);
  x.btnf = c;
  e = c.style;
  e.position = "absolute";
  e.left = e.top = "0px";
  e.width = z + "px";
  e.height = h + "px";
  e.borderRadius = f + "px";
  c.textContent = b;
  c.className = "nsi";
  e.color = "#ffffff";
  e.opacity = .9;
  x.ho.appendChild(c);
  return x
}
var sos = [],
  clus = [],
  bso, u_m = [64, 32, 16, 8, 4, 2, 1],
  lgbsc = 1,
  lgcsc = 1,
  lb_fr = 0,
  login_fr = 0,
  llgmtm = Date.now(),
  login_iv = -1;

function loginFade() {
  var b = Date.now(),
    h = (b - llgmtm) / 25;
  llgmtm = b;
  login_fr += .05 * h;
  choosing_skin && (login_fr += .06 * h);
  1 <= login_fr ? (login_fr = 1, login.style.display = "none", cstx.style.display = "none", fbh.style.display = "none", twth.style.display = "none", cskh.style.display = "none", grqh.style.display = "none", plq.style.display = "none", clq.style.display = "none", social.style.display = "none", login.style.opacity = 1, cstx.style.opacity = 1, fbh.style.opacity = 1, twth.style.opacity = 1, cskh.style.opacity = 1, grqh.style.opacity = 1, plq.style.opacity =
    1, clq.style.opacity = 1, social.style.opacity = 1, pskh.style.opacity = 1, nskh.style.opacity = 1, skodiv.style.opacity = 1, tip_fr = -1, tips.style.display = "none", mc.style.opacity = 1, loch.style.opacity = 1, clearInterval(login_iv), login_iv = -1, -1 != showlogo_iv && (ncka = lgss = lga = 1, showLogo(!0), -1 != showlogo_iv && (clearInterval(showlogo_iv), showlogo_iv = -1))) : (lgcsc = 1 + .1 * Math.pow(login_fr, 2), b = Math.round(lgbsc * lgcsc * 1E5) / 1E5, trf(login, "scale(" + b + "," + b + ")"), login.style.opacity = 1 - login_fr, cstx.style.opacity = 1 - login_fr, fbh.style.opacity =
    1 - login_fr, twth.style.opacity = 1 - login_fr, cskh.style.opacity = 1 - login_fr, grqh.style.opacity = 1 - login_fr, plq.style.opacity = 1 - login_fr, clq.style.opacity = 1 - login_fr, social.style.opacity = 1 - login_fr, pskh.style.opacity = login_fr, nskh.style.opacity = login_fr, skodiv.style.opacity = login_fr, mc.style.opacity = login_fr, loch.style.opacity = login_fr)
}
var ss_a = 0,
  ss_sh = 0,
  spinner_shown = !1,
  ldmc = document.createElement("canvas");
ldmc.width = 128;
ldmc.height = 128;
ldmc.style.position = "fixed";
ldmc.style.left = "0px";
ldmc.style.top = "0px";
ldmc.style.zIndex = 8388607;
ldmc.style.display = "none";
document.body.appendChild(ldmc);
var lsfr = 0,
  lcldtm = Date.now(),
  sstr = "Save";
"FR" == country ? sstr = "Bien" : "BR" == country && (sstr = "OK");
var sko_btn = o = makeTextBtn(String.fromCharCode(160) + sstr + String.fromCharCode(160), 47, 20, 34, 1),
  skodiv = o.elem;
skodiv.style.zIndex = 53;
skodiv.style.position = "fixed";
skodiv.style.left = "300px";
skodiv.style.top = "300px";
skodiv.style.display = "none";
skodiv.style.opacity = 0;
document.body.appendChild(skodiv);
o.elem.onclick = function() {
  if (playing) {
    try {
      localStorage.snakercv = snake.rcv
    } catch (b) {}
    playing = connected = !1;
    dead_mtm = Date.now() - 5E3
  }
};
var nick = document.getElementById("nick"),
  victory = document.getElementById("victory"),
  victory_bg = document.getElementById("victory_bg"),
  logo = document.getElementById("logo"),
  login = document.getElementById("login"),
  lastscore = document.getElementById("lastscore"),
  nick_holder = document.getElementById("nick_holder"),
  victory_holder = document.getElementById("victory_holder"),
  pstr = "Play";
"DE" == country ? pstr = "Spielen" : "FR" == country ? (pstr = "Jouer", nick.placeholder = "Surnom") : "BR" == country && (pstr = "Joga", nick.placeholder = "Apelido");
var play_btn = o = makeTextBtn(String.fromCharCode(160) + pstr + String.fromCharCode(160), 47, 20, 34, 1),
  pbdiv = o.elem;
pbdiv.style.position = "relative";
pbdiv.style.display = "inline-block";
pbdiv.style.marginTop = "20px";
pbdiv.style.marginBottom = "50px";
var playh = document.getElementById("playh");
playh.style.opacity = 0;
playh.appendChild(pbdiv);
var tips = document.getElementById("tips"),
  tipss = ["Eat to grow longer!", "Don't run into other snakes!", "When longer, hold the mouse for a speed boost!"];
"DE" == country ? tipss = ["Esse um zu wachsen!", "Klicke f\u00fcr mehr Geschwindigkeit!", "Bewege dich nicht in andere Schlangen!"] : "FR" == country ? tipss = ["Mangez de cro\u00eetre!", "Cliquez et vous courrez!", "Ne laissez pas votre t\u00eate toucher d'autres serpents!"] : "BR" == country && (tipss = ["Coma para crescer!", "Clique para correr!", "N\u00e3o deixe que sua cabe\u00e7a para tocar outras cobras!"]);
var tip_pos = -1,
  tip_fr = 1.9;
o.elem.onclick = function() {
  play_btn.disabled || -1 != dead_mtm || (play_btn_click_mtm = Date.now(), play_btn.setEnabled(!1), spinner_shown = nick.disabled = !0, ldmc.style.display = "inline", connect())
};
var save_btn = o = makeTextBtn(String.fromCharCode(160) + "Save Message" + String.fromCharCode(160), 47, 20, 34, 2),
  sbdiv = o.elem;
sbdiv.style.position = "relative";
sbdiv.style.display = "inline-block";
sbdiv.style.marginTop = "30px";
sbdiv.style.marginBottom = "50px";
var saveh = document.getElementById("saveh");
saveh.appendChild(sbdiv);
o.elem.onclick = function() {
  if (!save_btn.disabled) {
    var b = asciize(victory.value);
    140 < b.length && (b = b.substr(0, 140));
    if (5 <= protocol_version) {
      var h = new Uint8Array(2 + b.length);
      h[0] = 255;
      h[1] = 118;
      for (var c = 0; c < b.length; c++) h[c + 2] = b.charCodeAt(c)
    } else
      for (h = new Uint8Array(1 + b.length), h[0] = 118, c = 0; c < b.length; c++) h[c + 1] = b.charCodeAt(c);
    ws.send(h);
    save_btn.setEnabled(!1);
    victory.disabled = !0
  }
};
var wide = !1,
  mww = 850,
  mhh = 700,
  mwwp50 = mww + 50,
  mhhp50 = mhh + 50,
  mwwp150 = mww + 150,
  mhhp150 = mhh + 150,
  mww2 = mww / 2,
  mhh2 = mhh / 2,
  mc = document.createElement("canvas");
mc.style.position = "fixed";
mc.style.left = "0px";
mc.style.top = "0px";
mc.style.zIndex = 5;
mc.width = mww;
mc.height = mhh;
mc.className = "nsi";
document.body.appendChild(mc);
mc.style.display = "none";
mc.style.pointerEvents = "none";
var lbh = document.createElement("div");
lbh.className = "nsi";
lbh.style.position = "fixed";
lbh.style.right = "4px";
lbh.style.top = "4px";
lbh.style.textAlign = "center";
lbh.style.width = "255px";
lbh.style.height = "28px";
lbh.style.color = "#ffffff";
lbh.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
lbh.style.fontSize = "21px";
lbh.style.fontWeight = "bold";
lbh.style.overflow = "hidden";
lbh.style.opacity = .5;
lbh.style.zIndex = 7;
lbh.style.display = "none";
lbh.style.cursor = "default";
var lstr = "Leaderboard";
"DE" == country ? lstr = "Bestenliste" : "FR" == country ? lstr = "Gagnants" : "BR" == country && (lstr = "L\u00edderes");
lbh.textContent = lstr;
trf(lbh, agpu);
document.body.appendChild(lbh);
var lbs = document.createElement("div");
lbs.className = "nsi";
lbs.style.position = "fixed";
lbs.style.textAlign = "center";
lbs.style.right = "4px";
lbs.style.top = "32px";
lbs.style.width = "50px";
lbs.style.height = "800px";
lbs.style.color = "#ffffff";
lbs.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
lbs.style.fontSize = "12px";
lbs.style.overflow = "hidden";
lbs.style.opacity = .7;
lbs.style.zIndex = 7;
lbs.style.display = "none";
lbs.style.cursor = "default";
lbs.style.lineHeight = "150%";
trf(lbs, agpu);
document.body.appendChild(lbs);
var lbn = document.createElement("div");
lbn.className = "nsi";
lbn.style.position = "fixed";
lbn.style.textAlign = "left";
lbn.style.whiteSpace = "nowrap";
lbn.style.right = "64px";
lbn.style.top = "32px";
lbn.style.width = "150px";
lbn.style.height = "800px";
lbn.style.color = "#ffffff";
lbn.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
lbn.style.fontSize = "12px";
lbn.style.overflow = "hidden";
lbn.style.opacity = .7;
lbn.style.zIndex = 8;
lbn.style.display = "none";
lbn.style.cursor = "default";
lbn.style.lineHeight = "150%";
trf(lbn, agpu);
document.body.appendChild(lbn);
var lbp = document.createElement("div");
lbp.className = "nsi";
lbp.style.position = "fixed";
lbp.style.textAlign = "right";
lbp.style.right = "230px";
lbp.style.top = "32px";
lbp.style.width = "30px";
lbp.style.height = "800px";
lbp.style.color = "#ffffff";
lbp.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
lbp.style.fontSize = "12px";
lbp.style.overflow = "hidden";
lbp.style.opacity = .7;
lbp.style.zIndex = 9;
lbp.style.display = "none";
lbp.style.cursor = "default";
lbp.style.lineHeight = "150%";
trf(lbp, agpu);
document.body.appendChild(lbp);
var lbf = document.createElement("div");
lbf.className = "nsi";
lbf.style.position = "fixed";
lbf.style.left = "8px";
lbf.style.bottom = "4px";
lbf.style.width = "200px";
lbf.style.height = "37px";
lbf.style.color = "#ffffff";
lbf.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
lbf.style.fontSize = "12px";
lbf.style.overflow = "hidden";
lbf.style.opacity = .5;
lbf.style.zIndex = 7;
lbf.style.display = "none";
lbf.style.cursor = "default";
lbf.style.lineHeight = "150%";
trf(lbf, agpu);
document.body.appendChild(lbf);
var vcm = document.createElement("div");
vcm.className = "nsi";
vcm.style.position = "fixed";
vcm.style.left = "8px";
vcm.style.top = "4px";
vcm.style.width = "300px";
vcm.style.height = "228px";
vcm.style.color = "#ffffff";
vcm.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
vcm.style.fontSize = "13px";
vcm.style.overflow = "hidden";
vcm.style.wordWrap = "break-word";
vcm.style.opacity = .5;
vcm.style.zIndex = 7;
vcm.style.display = "none";
vcm.style.cursor = "default";
trf(vcm, agpu);
document.body.appendChild(vcm);
var loch = document.createElement("div");
loch.className = "nsi";
loch.style.position = "fixed";
loch.style.right = "16px";
loch.style.bottom = "16px";
loch.style.width = loch.style.height = "104px";
loch.style.zIndex = 10;
loch.style.display = "none";
document.body.appendChild(loch);
var loc = document.createElement("img"),
  lc = document.createElement("canvas");
lc.width = lc.height = 104;
ctx = lc.getContext("2d");
ctx.save();
ctx.fillStyle = "#485868";
ctx.shadowBlur = 12;
ctx.shadowOffsetY = 3;
ctx.shadowColor = "#000000";
ctx.beginPath();
ctx.arc(52, 52, 40, 0, pi2);
ctx.fill();
ctx.restore();
ctx.fillStyle = "#708090";
ctx.beginPath();
ctx.moveTo(52, 52);
ctx.arc(52, 52, 40, 0, Math.PI / 2);
ctx.lineTo(52, 52);
ctx.fill();
ctx.beginPath();
ctx.moveTo(52, 52);
ctx.arc(52, 52, 40, Math.PI, 3 * Math.PI / 2);
ctx.lineTo(52, 52);
ctx.fill();
ctx.strokeStyle = "#202630";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(52, 12);
ctx.lineTo(52, 92);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(12, 52);
ctx.lineTo(92, 52);
ctx.stroke();
loc.src = lc.toDataURL();
loc.className = "nsi";
loc.style.position = "absolute";
loc.style.left = "0px";
loc.style.top = "0px";
loc.style.opacity = .45;
loc.style.zIndex = 11;
trf(loc, agpu);
loch.appendChild(loc);
var asmc = document.createElement("canvas");
asmc.width = 80;
asmc.height = 80;
asmc.className = "nsi";
asmc.style.position = "absolute";
asmc.style.left = asmc.style.top = "12px";
asmc.style.zIndex = 12;
asmc.style.opacity = .25;
loch.appendChild(asmc);
var myloc = document.createElement("img");
lc.width = lc.height = 14;
ctx = lc.getContext("2d");
ctx.fillStyle = "#DDDDDD";
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(7, 7, 2.5, 0, pi2);
ctx.stroke();
ctx.fill();
myloc.src = lc.toDataURL();
myloc.className = "nsi";
myloc.style.position = "absolute";
myloc.style.left = "0px";
myloc.style.top = "0px";
myloc.style.opacity = 1;
myloc.style.zIndex = 13;
trf(myloc, agpu);
loch.appendChild(myloc);
ctx = mc.getContext("2d");
var bgi2 = document.createElement("canvas"),
  bgp2 = null,
  bgw2 = 599,
  bgh2 = 519,
  ii = document.createElement("img");
ii.onload = function() {
  bgi2.width = bgw2;
  bgi2.height = bgh2;
  var b = bgi2.getContext("2d");
  try {
    b.drawImage(this, 0, 0), bgp2 = b.createPattern(bgi2, "repeat")
  } catch (h) {}
};
ii.src = "/s/bg45.jpg";

function rdgbg() {
  if (ggbg) {
    gbgmc || (gbgmc = document.createElement("canvas"));
    gbgmc.width = mww;
    gbgmc.height = mhh;
    var b = gbgmc.getContext("2d");
    try {
      b.drawImage(gbgi, 0, 0, 512, 512, 0, 0, mww, mhh)
    } catch (h) {}
  }
}
var ggbg = !1,
  gbgmc = null,
  gbgi = document.createElement("img");
gbgi.onload = function() {
  ggbg = !0;
  rdgbg()
};
gbgi.src = "/s/gbg.jpg";

function newDeadpool() {
  return {
    os: [],
    end_pos: 0,
    add: function(b) {
      this.end_pos == this.os.length ? this.os.push(b) : this.os[this.end_pos] = b;
      this.end_pos++
    },
    get: function() {
      if (1 <= this.end_pos) {
        this.end_pos--;
        var b = this.os[this.end_pos];
        this.os[this.end_pos] = null;
        return b
      }
      return null
    }
  }
}
var flt_a = "ler did no;gas the;gas all;gas every;panis;panus;paynis;my ass;cut your;heil hit;flick your;fingerba;arse;naked;menstr;eat my;suck my;fuk;dong;cunn;penil;suck a;foresk;puto;puta;suck;mierd;bit.ly;slitherplus;ween;wein;wien;peen;turd;wank;crap;ur mom;tu madre;chinga;pu$$".split(";"),
  flt_g = "buttlov buttf smegm litherplu eatmy suckm sucka mydik urdik".split(" "),
  flt_w = ["ass", "kkk"];

function gdnm(b) {
  var h = "",
    c = "",
    f = "",
    w = 0,
    u = !1,
    e = !1,
    z, E;
  for (z = 0; z < b.length; z++) E = b.charCodeAt(z), 32 == E ? e || (e = !0, h += " ") : (e = !1, h += String.fromCharCode(E));
  e = !1;
  for (z = 0; z < b.length; z++)
    if (E = b.charCodeAt(z), (u = 48 <= E && 57 >= E) || 65 <= E && 90 >= E || 97 <= E && 122 >= E)
      if (c += String.fromCharCode(E), f += String.fromCharCode(E), e = !1, u) {
        if (w++, 7 <= w) return !1
      } else w = 0;
  else e || (e = !0, f += " ");
  b = h.toLowerCase();
  for (z = flt_a.length - 1; 0 <= z; z--)
    if (0 <= b.indexOf(flt_a[z])) return !1;
  c = c.toLowerCase();
  for (z = flt_g.length - 1; 0 <= z; z--)
    if (0 <= c.indexOf(flt_g[z])) return !1;
  f = f.toLowerCase().split(" ");
  for (z = f.length - 1; 0 <= z; z--)
    for (c = flt_w.length - 1; 0 <= c; c--)
      if (f[z] == flt_w[c]) return !1;
  return !0
}
var bpx1, bpy1, bpx2, bpy2, fpx1, fpy1, fpx2, fpy2, sgsc = .9,
  gsc = sgsc,
  nsep = 4.5,
  tasty = 0,
  shifty = !1,
  rr, gg, bb, render_mode = 2;
is_mobile && (render_mode = 1);
var wumsts = !1,
  rank = 0,
  best_rank = 999999999,
  snake_count = 0,
  biggest_snake_count = 0,
  cm1, snakes = [],
  foods = [],
  foods_c = 0,
  preys = [],
  points_dp = newDeadpool(),
  os = {},
  lsang = 0,
  want_e = !1,
  last_e_mtm = 0,
  sectors = [],
  sector_size = 480,
  sector_count_along_edge = 130,
  spangdv = 4.8,
  nsp1 = 4.25,
  nsp2 = .5,
  nsp3 = 12,
  mamu = .033,
  mamu2 = .028,
  cst = .43,
  lfas = [],
  lfc = 128;
for (i = 0; i < lfc; i++) j = .5 * (1 - Math.cos(Math.PI * (lfc - 1 - i) / (lfc - 1))), lfas.push(j);
var rfas = [],
  rfc = 43;
for (i = 0; i < rfc; i++) j = .5 * (1 - Math.cos(Math.PI * (rfc - 1 - i) / (rfc - 1))), rfas.push(j);
for (var fao = {}, fc = 3; 100 >= fc; fc++) {
  var fas = [];
  for (i = 0; i < fc; i++) j = .5 * (1 - Math.cos(Math.PI * (fc - 1 - i) / (fc - 1))), fas.push(j);
  fao["a" + fc] = fas
}
var hfc = 92,
  hfas = new Float32Array(hfc);
for (i = 0; i < hfc; i++) j = .5 * (1 - Math.cos(Math.PI * (hfc - 1 - i) / (hfc - 1))), hfas[i] = j;
var afas = [],
  afc = 26;
for (i = 0; i < afc; i++) j = .5 * (1 - Math.cos(Math.PI * (afc - 1 - i) / (afc - 1))), afas.push(j);
var nlc = 48,
  vfas = [],
  vfc = 62,
  fvpos = 0,
  fvtg = 0,
  ovxx, ovyy, fvxs = [],
  fvys = [];
for (i = 0; i < vfc; i++) j = .5 * (1 - Math.cos(Math.PI * (vfc - 1 - i) / (vfc - 1))), j += .5 * (.5 * (1 - Math.cos(Math.PI * j)) - j), vfas.push(j), fvxs.push(0), fvys.push(0);

function pwr(b) {
  for (var h = new Float32Array(125), c = 0; 125 > c; c++) h[c] = Math.pow(b, c);
  return h
}

function pca(b) {
  for (var h = new Float32Array(125), c = 0; 125 > c; c++) h[c] = 1 - Math.pow(1 - b, c);
  return h
}
var p1a = pca(.1),
  p35a = pca(.35),
  pwr4 = pwr(.4),
  pwr35 = pwr(.35),
  pwr93 = pwr(.93);

function setMscps(b) {
  if (b != mscps) {
    mscps = b;
    fmlts = [];
    fpsls = [];
    for (b = 0; b <= mscps; b++) b >= mscps ? fmlts.push(fmlts[b - 1]) : fmlts.push(Math.pow(1 - b / mscps, 2.25)), 0 == b ? fpsls.push(0) : fpsls.push(fpsls[b - 1] + 1 / fmlts[b - 1]);
    var h = fmlts[fmlts.length - 1],
      c = fpsls[fpsls.length - 1];
    for (b = 0; 2048 > b; b++) fmlts.push(h), fpsls.push(c)
  }
}

function startShowGame() {
  llgmtm = Date.now();
  login_iv = setInterval("loginFade()", 25);
  mc.style.opacity = 0;
  mc.style.display = "inline";
  lbh.style.opacity = lbs.style.opacity = lbn.style.opacity = lbp.style.opacity = lbf.style.opacity = vcm.style.opacity = 0;
  loch.style.opacity = 0;
  lb_fr = -1
}

function setSkin(b, h) {
  b.rcv = h;
  b.er = 6;
  b.ec = "#ffffff";
  b.eca = .75;
  b.ppa = 1;
  b.ppc = "#000000";
  b.antenna = !1;
  if (19 == h) {
    b.ec = "#ee5500";
    b.er = 4.5;
    b.ppa = 0;
    b.antenna = !0;
    b.atba = 0;
    b.atc1 = "#505050";
    b.atc2 = "#FFFFFF";
    b.atia = .5;
    b.apbs = !0;
    var c = 9;
    b.atx = new Float32Array(c);
    b.aty = new Float32Array(c);
    b.atvx = new Float32Array(c);
    b.atvy = new Float32Array(c);
    b.atax = new Float32Array(c);
    b.atay = new Float32Array(c);
    for (--c; 0 <= c; c--) b.atx[c] = b.xx, b.aty[c] = b.yy;
    b.bulb = rabulb;
    b.blbx = -10;
    b.blby = -10;
    b.blbw = 20;
    b.blbh = 20;
    b.bsc = 1;
    b.blba =
      1
  } else if (24 == h) {
    b.antenna = !0;
    b.atba = 0;
    b.atc1 = "#00688c";
    b.atc2 = "#64c8e7";
    b.atwg = !0;
    b.atia = .35;
    b.abrot = !1;
    c = 8;
    b.atx = new Float32Array(c);
    b.aty = new Float32Array(c);
    b.atvx = new Float32Array(c);
    b.atvy = new Float32Array(c);
    b.atax = new Float32Array(c);
    b.atay = new Float32Array(c);
    for (--c; 0 <= c; c--) b.atx[c] = b.xx, b.aty[c] = b.yy;
    b.bulb = acbulb;
    b.blbx = -10;
    b.blby = -10;
    b.blbw = 20;
    b.blbh = 20;
    b.bsc = 1;
    b.blba = .75
  } else if (25 == h) {
    b.ec = "#ff5609";
    b.eca = 1;
    b.antenna = !0;
    b.atba = 0;
    b.atc1 = "#000000";
    b.atc2 = "#6625c7";
    b.atia = 1;
    b.abrot = !0;
    c = 9;
    b.atx = new Float32Array(c);
    b.aty = new Float32Array(c);
    b.atvx = new Float32Array(c);
    b.atvy = new Float32Array(c);
    b.atax = new Float32Array(c);
    b.atay = new Float32Array(c);
    for (--c; 0 <= c; c--) b.atx[c] = b.xx, b.aty[c] = b.yy;
    b.bulb = cdbulb;
    b.blbx = -5;
    b.blby = -10;
    b.blbw = 20;
    b.blbh = 20;
    b.bsc = 1.6;
    b.blba = 1
  }
  c = null;
  9 == h ? c = [7, 9, 7, 9, 7, 9, 7, 9, 7, 9, 7, 10, 10, 10, 10, 10, 10, 10, 10, 10] : 10 == h ? c = [9, 9, 9, 9, 9, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7] : 11 == h ? c = [11, 11, 11, 11, 11, 7, 7, 7, 7, 7, 12, 12, 12, 12, 12] : 12 == h ? c = [7, 7, 7, 7, 7, 9, 9, 9, 9, 9, 13, 13, 13, 13, 13] : 13 == h ? c = [14, 14, 14,
    14, 14, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7
  ] : 14 == h ? c = [9, 9, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 7, 7] : 15 == h ? c = [0, 1, 2, 3, 4, 5, 6, 7, 8] : 16 == h ? c = [15, 15, 15, 15, 15, 15, 15, 4, 4, 4, 4, 4, 4, 4] : 17 == h ? c = [9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16] : 18 == h ? c = [7, 7, 7, 7, 7, 7, 7, 9, 9, 9, 9, 9, 9, 9] : 19 == h ? c = [9] : 20 == h ? c = [3, 3, 3, 3, 3, 0, 0, 0, 0, 0] : 21 == h ? c = [3, 3, 3, 3, 3, 3, 3, 18, 18, 18, 18, 18, 18, 20, 19, 20, 19, 20, 19, 20, 18, 18, 18, 18, 18, 18] : 22 == h ? c = [5, 5, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 9, 9, 13, 13, 13, 13, 13, 13, 13] : 23 == h ? c = [16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 7, 7, 7, 7, 7, 7, 7] : 24 == h ? c = [23, 23, 23, 23, 23, 23, 23, 23,
    23, 18, 18, 18, 18, 18, 18, 18, 18, 18
  ] : 25 == h ? c = [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22] : h %= 9;
  c && (h = c[0]);
  b.rbcs = c;
  b.cv = h
}

function newSnake(b, h, c, f, w, u) {
  var e = {};
  e.id = b;
  e.xx = h;
  e.yy = c;
  setSkin(e, f);
  f = e.cv;
  e.fnfr = 0;
  e.na = 1;
  e.chl = 0;
  e.tsp = 0;
  e.sfr = 0;
  e.rr = Math.min(255, rrs[f] + Math.floor(20 * Math.random()));
  e.gg = Math.min(255, ggs[f] + Math.floor(20 * Math.random()));
  e.bb = Math.min(255, bbs[f] + Math.floor(20 * Math.random()));
  b = "00" + Math.min(255, Math.max(0, Math.round(e.rr))).toString(16);
  h = "00" + Math.min(255, Math.max(0, Math.round(e.gg))).toString(16);
  c = "00" + Math.min(255, Math.max(0, Math.round(e.bb))).toString(16);
  b = b.substr(b.length - 2);
  h = h.substr(h.length -
    2);
  c = c.substr(c.length - 2);
  e.cs = "#" + b + h + c;
  b = "00" + Math.min(255, Math.max(0, Math.round(.4 * e.rr))).toString(16);
  h = "00" + Math.min(255, Math.max(0, Math.round(.4 * e.gg))).toString(16);
  c = "00" + Math.min(255, Math.max(0, Math.round(.4 * e.bb))).toString(16);
  b = b.substr(b.length - 2);
  h = h.substr(h.length - 2);
  c = c.substr(c.length - 2);
  e.cs04 = "#" + b + h + c;
  b = "00" + Math.min(255, Math.max(0, Math.round(.5 * (255 + e.rr)))).toString(16);
  h = "00" + Math.min(255, Math.max(0, Math.round(.5 * (255 + e.gg)))).toString(16);
  c = "00" + Math.min(255, Math.max(0, Math.round(.5 *
    (255 + e.bb)))).toString(16);
  b = b.substr(b.length - 2);
  h = h.substr(h.length - 2);
  c = c.substr(c.length - 2);
  e.csw = "#" + b + h + c;
  e.sc = 1;
  e.ssp = nsp1 + nsp2 * e.sc;
  e.fsp = e.ssp + .1;
  e.msp = nsp3;
  e.fxs = new Float32Array(rfc);
  e.fys = new Float32Array(rfc);
  e.fchls = new Float32Array(rfc);
  e.fpos = 0;
  e.ftg = 0;
  e.fx = 0;
  e.fy = 0;
  e.fchl = 0;
  e.fas = new Float32Array(afc);
  e.fapos = 0;
  e.fatg = 0;
  e.fa = 0;
  e.ehang = w;
  e.wehang = w;
  e.ehl = 1;
  e.msl = 42;
  e.fam = 0;
  e.ang = w;
  e.eang = w;
  e.wang = w;
  e.rex = 0;
  e.rey = 0;
  e.sp = 2;
  u ? (e.lnp = u[u.length - 1], e.pts = u, e.sct = u.length, u[0].dying && e.sct--) :
    (e.pts = [], e.sct = 0);
  e.flpos = 0;
  e.fls = new Float32Array(lfc);
  e.fl = 0;
  e.fltg = 0;
  e.tl = e.sct + e.fam;
  e.cfl = e.tl;
  e.scang = 1;
  e.dead_amt = 0;
  e.alive_amt = 0;
  snakes.splice(0, 0, e);
  return os["s" + e.id] = e
}

function snl(b) {
  var h = b.tl;
  b.tl = b.sct + b.fam;
  for (var h = b.tl - h, c = b.flpos, f = 0; f < lfc; f++) b.fls[c] -= h * lfas[f], c++, c >= lfc && (c = 0);
  b.fl = b.fls[b.flpos];
  b.fltg = lfc;
  b == snake && (wumsts = !0)
}

function newFood(b, h, c, f, w, u) {
  var e = {};
  e.id = b;
  e.xx = h;
  e.yy = c;
  e.rx = h;
  e.ry = c;
  e.rsp = w ? 2 : 1;
  e.cv = u;
  e.rad = 1E-5;
  e.sz = f;
  e.lrrad = e.rad;
  b = per_color_imgs[e.cv];
  e.cv2 = Math.floor(b.ic * gsc * e.sz / 16.5);
  0 > e.cv2 && (e.cv2 = 0);
  e.cv2 >= b.ic && (e.cv2 = b.ic - 1);
  testing && (window.biggestcv2 || (window.biggestcv2 = e.cv2), e.cv2 > window.biggestcv2 && (window.biggestcv2 = e.cv2, console.log("biggest cv2 seen: " + e.cv2 + " out of " + (b.ic - 1) + " (fo.sz = " + e.sz + " which means its server-side rad is " + 5 * e.sz + ")")));
  e.fi = b.imgs[e.cv2];
  e.fw = b.fws[e.cv2];
  e.fh = b.fhs[e.cv2];
  e.fw2 = b.fw2s[e.cv2];
  e.fh2 = b.fh2s[e.cv2];
  e.ofi = b.oimgs[e.cv2];
  e.ofw = b.ofws[e.cv2];
  e.ofh = b.ofhs[e.cv2];
  e.ofw2 = b.ofw2s[e.cv2];
  e.ofh2 = b.ofh2s[e.cv2];
  e.gcv = Math.floor(b.ic * gsc * (.25 + .75 * e.sz / 16.5));
  0 > e.gcv && (e.gcv = 0);
  e.gcv >= b.ic && (e.gcv = b.ic - 1);
  e.gfi = b.gimgs[e.gcv];
  e.gfw = b.gfws[e.gcv];
  e.gfh = b.gfhs[e.gcv];
  e.gfw2 = b.gfw2s[e.gcv];
  e.gfh2 = b.gfh2s[e.gcv];
  e.g2cv = Math.floor(b.ic * gsc * 2 * (.25 + .75 * e.sz / 16.5));
  0 > e.g2cv && (e.g2cv = 0);
  e.g2cv >= b.ic && (e.g2cv = b.ic - 1);
  e.g2fi = b.gimgs[e.g2cv];
  e.g2fw = b.gfws[e.g2cv];
  e.g2fh = b.gfhs[e.g2cv];
  e.g2fw2 = b.gfw2s[e.g2cv];
  e.g2fh2 = b.gfh2s[e.g2cv];
  e.fr = 0;
  e.gfr = 64 * Math.random();
  e.gr = .65 + .1 * e.sz;
  e.wsp = .0225 * (2 * Math.random() - 1);
  e.eaten_fr = 0;
  return foods[foods_c++] = e
}

function newPrey(b, h, c, f, w, u, e, z, E) {
  var t = {};
  t.id = b;
  t.xx = h;
  t.yy = c;
  t.rad = 1E-5;
  t.sz = f;
  t.cv = w;
  t.dir = u;
  t.wang = e;
  t.ang = z;
  t.sp = E;
  t.fr = 0;
  t.gfr = 64 * Math.random();
  t.gr = .5 + .15 * Math.random() + .1 * t.sz;
  t.rr = Math.min(255, rrs[w]);
  t.gg = Math.min(255, ggs[w]);
  t.bb = Math.min(255, bbs[w]);
  b = "00" + Math.min(255, Math.max(0, Math.round(t.rr))).toString(16);
  h = "00" + Math.min(255, Math.max(0, Math.round(t.gg))).toString(16);
  c = "00" + Math.min(255, Math.max(0, Math.round(t.bb))).toString(16);
  b = b.substr(b.length - 2);
  h = h.substr(h.length - 2);
  c =
    c.substr(c.length - 2);
  t.cs = "#" + b + h + c;
  t.cv2 = Math.floor(per_color_imgs[t.cv].pr_imgs.length * gsc * t.sz / 9);
  0 > t.cv2 && (t.cv2 = 0);
  t.cv2 >= per_color_imgs[t.cv].pr_imgs.length && (t.cv2 = per_color_imgs[t.cv].pr_imgs.length - 1);
  t.fi = per_color_imgs[t.cv].pr_imgs[t.cv2];
  t.fw = per_color_imgs[t.cv].pr_fws[t.cv2];
  t.fh = per_color_imgs[t.cv].pr_fhs[t.cv2];
  t.fw2 = per_color_imgs[t.cv].pr_fw2s[t.cv2];
  t.fh2 = per_color_imgs[t.cv].pr_fh2s[t.cv2];
  t.gcv = per_color_imgs[t.cv].gimgs.length - 1;
  t.gfi = per_color_imgs[t.cv].gimgs[t.gcv];
  t.gfw =
    per_color_imgs[t.cv].gfws[t.gcv];
  t.gfh = per_color_imgs[t.cv].gfhs[t.gcv];
  t.gfw2 = per_color_imgs[t.cv].gfw2s[t.gcv];
  t.gfh2 = per_color_imgs[t.cv].gfh2s[t.gcv];
  t.fxs = new Float32Array(rfc);
  t.fys = new Float32Array(rfc);
  t.fpos = 0;
  t.ftg = 0;
  t.fx = 0;
  t.fy = 0;
  t.eaten = !1;
  t.eaten_fr = 0;
  preys.push(t);
  return t
}
var kdmc = document.createElement("canvas");
kdmc.width = kdmc.height = 32;
ctx = kdmc.getContext("2d");
ctx.fillStyle = "#FF9966";
ctx.arc(16, 16, 16, 0, pi2);
ctx.fill();
var sz = 52,
  komc = document.createElement("canvas");
komc.width = komc.height = sz;
ctx = komc.getContext("2d");
map = ctx.getImageData(0, 0, sz, sz);
imgd = map.data;
l = imgd.length;
for (p = yy = xx = 0; p < l; p += 4) {
  var v = Math.abs(Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 - yy, 2)) - 16),
    v = 4 >= v ? 1 - v / 4 : 0,
    v = .8 * v;
  imgd[p] = imgd[p + 1] = imgd[p + 2] = 0;
  imgd[p + 3] = Math.floor(255 * v);
  xx++;
  xx >= sz && (xx = 0, yy++)
}
ctx.putImageData(map, 0, 0);
var sz = 62,
  ksmc = document.createElement("canvas");
ksmc.width = ksmc.height = sz;
ctx = ksmc.getContext("2d");
map = ctx.getImageData(0, 0, sz, sz);
imgd = map.data;
l = imgd.length;
for (p = yy = xx = 0; p < l; p += 4) v = Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 + 3 - yy, 2)) - 15, v *= .1, 0 > v && (v = -v), 1 < v && (v = 1), v = 1 - v, v *= .25, imgd[p] = imgd[p + 1] = imgd[p + 2] = 0, imgd[p + 3] = Math.floor(255 * v), xx++, xx >= sz && (xx = 0, yy++);
ctx.putImageData(map, 0, 0);
var rabulb = document.createElement("canvas");
rabulb.width = rabulb.height = 64;
ctx = rabulb.getContext("2d");
var g = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
g.addColorStop(0, "rgba(255, 255, 255, 1)");
g.addColorStop(.83, "rgba(150,150,150, 1)");
g.addColorStop(.84, "rgba(80,80,80, 1)");
g.addColorStop(.99, "rgba(80,80,80, 1)");
g.addColorStop(1, "rgba(80,80,80, 0)");
ctx.fillStyle = g;
ctx.fillRect(0, 0, 64, 64);
var cdbulb = document.createElement("canvas");
cdbulb.width = 84;
cdbulb.height = 84;
var cdbulb2 = document.createElement("canvas");
cdbulb2.width = 84;
cdbulb2.height = 84;
ctx = cdbulb2.getContext("2d");
ctx.fillStyle = "#ff5609";
ctx.fillRect(13, 10, 29, 64);
ctx.fillRect(13, 10, 58, 22);
ctx.fillRect(13, 54, 58, 22);
ctx = cdbulb.getContext("2d");
ctx.shadowColor = "#000000";
ctx.shadowBlur = 20;
ctx.drawImage(cdbulb2, 0, 0);
ctx.drawImage(cdbulb2, 0, 0);
var acbulb = document.createElement("canvas");
acbulb.width = acbulb.height = 64;
ctx = acbulb.getContext("2d");
g = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
g.addColorStop(0, "rgba(255, 128, 128, 1)");
g.addColorStop(.5, "rgba(222, 3, 3, 1)");
g.addColorStop(.96, "rgba(157, 18, 18, 1)");
g.addColorStop(1, "rgba(0,0,0, 0)");
ctx.fillStyle = g;
ctx.fillRect(0, 0, 64, 64);
var colc;
testing && (colc = document.createElement("canvas"), colc.width = 256, colc.height = 66, colc.style.position = "fixed", colc.style.left = "0px", colc.style.top = "200px", colc.style.zIndex = 2147483647, document.body.appendChild(colc));
var pbx = new Float32Array(32767),
  pby = new Float32Array(32767),
  pba = new Float32Array(32767),
  pbu = new Uint8Array(32767),
  per_color_imgs = [],
  rrs = [192, 144, 128, 128, 238, 255, 255, 255, 224, 255, 144, 80, 255, 40, 100, 120, 72, 160, 255, 56, 56, 62, 255, 101],
  ggs = [128, 153, 208, 255, 238, 160, 144, 64, 48, 255, 153, 80, 192, 136, 117, 134, 84, 80, 224, 68, 68, 19, 86, 200],
  bbs = [255, 255, 208, 128, 112, 96, 144, 64, 224, 255, 255, 80, 80, 96, 255, 255, 255, 255, 64, 255, 255, 160, 9, 232],
  max_skin_cv = 25;
for (i = 0; i < rrs.length; i++) {
  o = {
    imgs: [],
    fws: [],
    fhs: [],
    fw2s: [],
    fh2s: [],
    gimgs: [],
    gfws: [],
    gfhs: [],
    gfw2s: [],
    gfh2s: [],
    oimgs: [],
    ofws: [],
    ofhs: [],
    ofw2s: [],
    ofh2s: []
  };
  var rs = "00" + rrs[i].toString(16),
    gs = "00" + ggs[i].toString(16),
    bs = "00" + bbs[i].toString(16),
    rs = rs.substr(rs.length - 2),
    gs = gs.substr(gs.length - 2),
    bs = bs.substr(bs.length - 2);
  o.cs = "#" + rs + gs + bs;
  var sz = 62,
    kfmc = document.createElement("canvas");
  kfmc.width = kfmc.height = sz;
  ctx = kfmc.getContext("2d");
  map = ctx.getImageData(0, 0, sz, sz);
  imgd = map.data;
  l = imgd.length;
  for (p =
    yy = xx = 0; p < l; p += 4) v = Math.abs(Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 - yy, 2)) - 16), v = 15 >= v ? 1 - v / 15 : 0, imgd[p] = rrs[i], imgd[p + 1] = ggs[i], imgd[p + 2] = bbs[i], imgd[p + 3] = Math.floor(255 * v), xx++, xx >= sz && (xx = 0, yy++);
  ctx.putImageData(map, 0, 0);
  o.kfmc = kfmc;
  var ksz = 48,
    ksz2 = ksz / 2,
    kmc = document.createElement("canvas");
  kmc.width = kmc.height = ksz;
  ctx = kmc.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.arc(ksz2, ksz2, ksz2, 0, pi2);
  ctx.fill();
  map = ctx.getImageData(0, 0, ksz, ksz);
  imgd = map.data;
  l = imgd.length;
  yy = xx = 0;
  var kmcs = [];
  for (j =
    0; 7 > j; j++) {
    for (p = xx = yy = 0; p < l; p += 4) {
      var v = Math.pow(Math.max(0, Math.min(1, 1 - Math.abs(yy - ksz2) / ksz2)), .35),
        v2 = Math.max(0, Math.min(1, 1 - Math.sqrt(Math.pow(xx - ksz2, 2) + Math.pow(yy - ksz2, 2)) / 34)),
        v = v + .375 * (v2 - v),
        v = v * (1.22 - .44 * j / 6);
      rr = rrs[i];
      gg = ggs[i];
      bb = bbs[i];
      imgd[p] = Math.max(0, Math.min(255, Math.floor(rr * v)));
      imgd[p + 1] = Math.max(0, Math.min(255, Math.floor(gg * v)));
      imgd[p + 2] = Math.max(0, Math.min(255, Math.floor(bb * v)));
      xx++;
      xx >= ksz && (xx = 0, yy++)
    }
    ctx.putImageData(map, 0, 0);
    var kmc2 = document.createElement("canvas");
    kmc2.width = kmc2.height = ksz;
    var ctx2 = kmc2.getContext("2d");
    ctx2.drawImage(kmc, 0, 0);
    if (10 == i)
      for (k = -1; 1 >= k; k++) {
        var tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 8) * 13,
          ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 8) * 13;
        ctx2.fillStyle = "#FFFFFF";
        ctx2.beginPath();
        for (m = 0; 5 >= m; m++) xx = tx + ksz / 32 * Math.cos(2 * Math.PI * m / 5) * .05 * 24, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * m / 5) * .05 * 24, 0 == m ? ctx2.moveTo(xx, yy) : ctx2.lineTo(xx, yy), xx = tx + ksz / 32 * Math.cos(2 * Math.PI * (m + .5) / 5) * 3.1, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * (m + .5) / 5) * 3.1, ctx2.lineTo(xx, yy);
        ctx2.fill()
      } else if (19 == i)
        for (k = -2; 2 >= k; k++) {
          tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 15) * 13;
          ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 15) * 13;
          ctx2.save();
          ctx2.globalAlpha = .7;
          ctx2.fillStyle = "#FFFFFF";
          ctx2.beginPath();
          for (m = 0; 5 >= m; m++) xx = tx + ksz / 32 * Math.cos(2 * Math.PI * m / 5) * .05 * 12, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * m / 5) * .05 * 12, 0 == m ? ctx2.moveTo(xx, yy) : ctx2.lineTo(xx, yy), xx = tx + ksz / 32 * Math.cos(2 * Math.PI * (m + .5) / 5) * 1.55, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * (m + .5) / 5) * 1.55, ctx2.lineTo(xx, yy);
          ctx2.fill();
          ctx2.restore()
        } else if (20 ==
          i)
          for (k = -1.5; 1.5 >= k; k++) {
            tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 15) * 13;
            ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 15) * 13;
            ctx2.save();
            ctx2.globalAlpha = .7;
            ctx2.fillStyle = "#FFFFFF";
            ctx2.beginPath();
            for (m = 0; 5 >= m; m++) xx = tx + ksz2 / 16 * Math.cos(2 * Math.PI * m / 5) * .05 * 14, yy = ty + ksz2 / 16 * Math.sin(2 * Math.PI * m / 5) * .05 * 14, 0 == m ? ctx2.moveTo(xx, yy) : ctx2.lineTo(xx, yy), xx = tx + ksz2 / 16 * Math.cos(2 * Math.PI * (m + .5) / 5) * 1.8, yy = ty + ksz2 / 16 * Math.sin(2 * Math.PI * (m + .5) / 5) * 1.8, ctx2.lineTo(xx, yy);
            ctx2.fill();
            ctx2.restore()
          }
    kmcs.push(kmc2)
  }
  o.kmcs = kmcs;
  per_color_imgs.push(o);
  for (j = 2.8; 18.8 >= j; j += 1) {
    var cc = document.createElement("canvas"),
      sz = Math.ceil(2.5 * j + 28);
    cc.width = cc.height = sz;
    ctx = cc.getContext("2d");
    ctx.fillStyle = o.cs;
    ctx.arc(sz / 2, sz / 2, .65 * j, 0, pi2);
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "#" + rs + gs + bs;
    ctx.globalAlpha = .8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fill();
    o.imgs.push(cc);
    o.fws.push(sz);
    o.fhs.push(sz);
    o.fw2s.push(sz / 2);
    o.fh2s.push(sz / 2);
    sz = Math.ceil(8 * j + 6);
    cc = document.createElement("canvas");
    cc.width = cc.height = sz;
    ctx = cc.getContext("2d");
    g = ctx.createRadialGradient(sz / 2, sz / 2, 1, sz / 2, sz / 2, 4 * j);
    g.addColorStop(0, "rgba(" + rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 1)");
    g.addColorStop(1, "rgba(" + rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, sz, sz);
    o.gimgs.push(cc);
    o.gfws.push(sz);
    o.gfhs.push(sz);
    o.gfw2s.push(sz / 2);
    o.gfh2s.push(sz / 2);
    cc = document.createElement("canvas");
    sz = Math.ceil(1.3 * j + 6);
    cc.width = cc.height = sz;
    ctx = cc.getContext("2d");
    var eam = .2,
      g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, j / 2);
    g.addColorStop(0, "rgba(" +
      rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 1)");
    g.addColorStop(.99, "rgba(" + Math.floor(rrs[i] * eam) + ", " + Math.floor(ggs[i] * eam) + ", " + Math.floor(bbs[i] * eam) + ", 1)");
    g.addColorStop(1, "rgba(" + Math.floor(rrs[i] * eam) + ", " + Math.floor(ggs[i] * eam) + ", " + Math.floor(bbs[i] * eam) + ", 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, sz, sz);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.arc(sz / 2, sz / 2, .65 * j, 0, pi2);
    ctx.globalAlpha = 1;
    ctx.stroke();
    o.oimgs.push(cc);
    o.ofws.push(sz);
    o.ofhs.push(sz);
    o.ofw2s.push(sz / 2);
    o.ofh2s.push(sz / 2)
  }
  o.ic =
    o.imgs.length;
  o.pr_imgs = [];
  o.pr_fws = [];
  o.pr_fhs = [];
  o.pr_fw2s = [];
  o.pr_fh2s = [];
  for (j = 3; 24 >= j; j += 1) cc = document.createElement("canvas"), sz = Math.ceil(2 * j + 38), cc.width = cc.height = sz, ctx = cc.getContext("2d"), ctx.fillStyle = o.cs, ctx.arc(sz / 2, sz / 2, j / 2, 0, pi2), ctx.shadowBlur = 22, ctx.shadowOffsetY = 0, ctx.shadowColor = "#" + rs + gs + bs, ctx.fill(), ctx.fill(), o.pr_imgs.push(cc), o.pr_fws.push(sz), o.pr_fhs.push(sz), o.pr_fw2s.push(sz / 2), o.pr_fh2s.push(sz / 2)
}
if (testing)
  for (ctx = colc.getContext("2d"), ctx.fillStyle = "#000000", ctx.fillRect(0, 0, colc.width, colc.height), ctx.fillStyle = "#FFFFFF", ctx.font = "10px Arial, Helvetica Neue, Helvetica, sans-serif", ctx.textBaseline = "top", ctx.textAlign = "center", i = yy = xx = 0; i < rrs.length; i++) {
    var pci = per_color_imgs[i],
      kmc = pci.kmcs[0];
    ctx.drawImage(kmc, 0, 0, kmc.width, kmc.height, xx, yy, 16, 16);
    ntx = o.xx + o.fx;
    nty = o.yy + o.fy;
    ntx = mww2 + (ntx - view_xx) * gsc;
    nty = mhh2 + (nty - view_yy) * gsc;
    ctx.fillText("" + i, xx + 8, yy + 16);
    xx += 16;
    xx > colc.width - 16 && (xx =
      0, yy += 28)
  }
var view_xx = 0,
  view_yy = 0,
  view_ang = 0,
  view_dist = 0,
  fvx = 0,
  fvy = 0,
  xm = 0,
  ym = 0,
  lsxm = 0,
  lsym = 0,
  snake = null,
  my_nick = "",
  dhx, dhy, hsz, fr = 0,
  lfr = 0,
  ltm = Date.now(),
  vfr = 0,
  vfrb = 0,
  avfr = 0,
  fr2 = 0,
  lfr2 = 0,
  vfrb2 = 0,
  cptm = 0,
  lptm = 0,
  lpstm = 0,
  last_ping_mtm = 0,
  lagging = !1,
  lag_mult = 1,
  wfpr = !1,
  high_quality = !0,
  gla = 1,
  wdfg = 0,
  qsm = 1,
  mqsm = 1.7,
  playing = !1,
  connected = !1,
  want_close_socket = !1,
  want_victory_message = !1,
  want_victory_focus = !1,
  want_hide_victory = 0,
  hvfr = 0,
  dead_mtm = -1,
  at2lt = new Float32Array(65536);
for (yy = 0; 256 > yy; yy++)
  for (xx = 0; 256 > xx; xx++) at2lt[yy << 8 | xx] = Math.atan2(yy - 128, xx - 128);
var kd_l_frb = 0,
  kd_r_frb = 0,
  kd_l = !1,
  kd_r = !1,
  kd_u = !1,
  lkstm = 0,
  social = document.createElement("iframe");
try {
  social.frameBorder = 0
} catch (b) {}
social.style.position = "fixed";
social.style.left = "6px";
social.style.top = "6px";
social.style.border = "0px";
social.style.zIndex = 9999999;
social.style.overflow = "hidden";
social.width = 251;
social.height = 150;
social.src = "/social-box/";
document.body.appendChild(social);
var oef = function() {
    var b = Date.now();
    avfr = vfr = (b - ltm) / 8;
    ltm = b;
    choosing_skin || (lagging || wfpr && 420 < b - last_ping_mtm && (lagging = !0), lagging ? (lag_mult *= .85, .01 > lag_mult && (lag_mult = .01)) : 1 > lag_mult && (lag_mult += .05, 1 <= lag_mult && (lag_mult = 1)));
    120 < vfr && (vfr = 120);
    vfr *= lag_mult;
    etm *= lag_mult;
    lfr = fr;
    fr += vfr;
    vfrb = Math.floor(fr) - Math.floor(lfr);
    lfr2 = fr2;
    fr2 += 2 * vfr;
    vfrb2 = Math.floor(fr2) - Math.floor(lfr2);
    kd_l && (kd_l_frb += vfrb);
    kd_r && (kd_r_frb += vfrb);
    if (spinner_shown) {
      lsfr += avfr;
      var h = ldmc.getContext("2d");
      h.clearRect(0,
        0, 512, 128);
      for (var c, f, w = 1; 2 >= w; w++) {
        h.beginPath();
        1 == w ? (h.fillStyle = "#60FF70", f = 0) : (h.fillStyle = "#9850FF", f = Math.PI);
        for (var u = 0; 256 >= u; u++) c = 32 + 5 * Math.cos(f + lsfr / 6 + 8 * u / 256) + 8 * u / 256, 256 == u && (c += 10), xx = 64 + Math.cos(f + lsfr / 44 + .8 * Math.PI * u / 256) * c * 1.25, yy = 64 + Math.sin(f + lsfr / 44 + .8 * Math.PI * u / 256) * c, 0 == u ? h.moveTo(xx, yy) : h.lineTo(xx, yy);
        c = 32;
        xx = 64 + Math.cos(f + lsfr / 44 + .8 * Math.PI * (u + 47) / 256) * c * 1.25;
        yy = 64 + Math.sin(f + lsfr / 44 + .8 * Math.PI * (u + 47) / 256) * c;
        h.lineTo(xx, yy);
        for (u = 256; 0 <= u; u--) c = 32 + 5 * Math.cos(f + lsfr / 6 +
          8 * u / 256) - 8 * u / 256, 256 == u && (c -= 10), xx = 64 + Math.cos(f + lsfr / 44 + .8 * Math.PI * u / 256) * c * 1.25, yy = 64 + Math.sin(f + lsfr / 44 + .8 * Math.PI * u / 256) * c, h.lineTo(xx, yy);
        h.fill()
      }
      connecting ? (ss_a += avfr / 86, 1 <= ss_a && (ss_a = 1), ss_sh += avfr / 93, 1 <= ss_sh && (ss_sh = 1)) : (ss_a -= avfr / 86, 0 >= ss_a && (ss_sh = ss_a = 0, ldmc.style.display = "none", trf(ldmc, "")));
      ldmc.style.opacity = ss_a;
      u = Math.round(.1 + .9 * ss_sh * (1 + 2 * Math.pow(1 - ss_a, 2)) * 1E5) / 1E5;
      trf(ldmc, "scale(" + u + "," + u + ")")
    }
    if (-1 != play_btn_click_mtm && 6666 < b - play_btn_click_mtm) {
      u = document.createElement("img");
      f = [];
      f.push("bso=" + encodeURIComponent(bso));
      if (bso)
        for (var e in bso) f.push(e + "=" + encodeURIComponent(bso[e]));
      f.push("waiting_for_sos=" + (waiting_for_sos ? "true" : "false"));
      f.push("soslen=" + sos.length);
      u.src = "http://slither.io/cnc.jpg?" + f.join("&");
      play_btn_click_mtm = -1
    }
    waiting_for_sos && b > sos_ready_after_mtm && (connecting || connected || connect());
    connecting && 3E3 < b - start_connect_mtm && (bso && (bso.tainted = !0), connect());
    if (choosing_skin) {
      for (u = snakes.length - 1; 0 <= u; u--)
        for (e = snakes[u], w = e.pts.length - 1; 0 <= w; w--) e.pts[w].yy =
          grd / 2 + 15 * Math.cos(w / 4 + fr / 19) * (1 - w / e.pts.length);
      view_xx -= vfr
    }
    playing && (high_quality ? (1 > gla && (gla += .0075 * vfr, 1 < gla && (gla = 1)), 1 < qsm && (qsm -= 4E-5 * vfr, 1 > qsm && (qsm = 1))) : (0 < gla && (gla -= .0075 * vfr, 0 > gla && (gla = 0)), qsm < mqsm && (qsm += 4E-5 * vfr, qsm > mqsm && (qsm = mqsm))));
    0 != want_hide_victory && (1 == want_hide_victory ? (hvfr += .02 * vfr, 1 <= hvfr ? (hvfr = 0, want_hide_victory = 2, victory_holder.style.opacity = 1, saveh.style.opacity = 1, victory_holder.style.display = "none", saveh.style.display = "none", nick_holder.style.opacity = 0, playh.style.opacity =
      0, smh.style.opacity = 0, nick_holder.style.display = "inline-block", playh.style.display = "block", smh.style.display = "block") : (victory_holder.style.opacity = 1 - hvfr, saveh.style.opacity = 1 - hvfr)) : 2 == want_hide_victory && (hvfr += .02 * vfr, 1 <= hvfr && (hvfr = 1, want_hide_victory = 0), nick_holder.style.opacity = hvfr, playh.style.opacity = hvfr, smh.style.opacity = hvfr));
    1 != login_fr && -1 != tip_fr && (tip_fr += .017 * vfr, tip_fr >= pi2 && (tip_fr -= pi2, tip_pos++, tip_pos >= tipss.length && (tip_pos = 0), tips.textContent = tipss[tip_pos]), w = .5 - .5 * Math.cos(tip_fr),
      tips.style.opacity = Math.round(1E5 * Math.pow(w, .5)) / 1E5);
    if (-1 == dead_mtm) - 1 != lb_fr && 1 != lb_fr && (lb_fr += .01 * vfr, 1 <= lb_fr && (lb_fr = 1), lbh.style.opacity = .85 * lb_fr, lbs.style.opacity = lbn.style.opacity = lbp.style.opacity = lbf.style.opacity = vcm.style.opacity = lb_fr);
    else if (1600 < b - dead_mtm) {
      if (-1 == login_iv) {
        login_iv = -2;
        login.style.display = "inline";
        try {
          "1" != localStorage.edttsg ? cstx.style.display = "inline" : cskh.style.display = "inline"
        } catch (z) {}
        fbh.style.display = "inline";
        twth.style.display = "inline";
        plq.style.display =
          "inline";
        clq.style.display = "inline";
        grqh.style.display = "inline";
        social.style.display = "inline";
        want_victory_focus && (want_victory_focus = !1, victory.focus())
      } - 2 == login_iv && (login_fr -= .004 * vfr, choosing_skin && (login_fr -= .007 * vfr), lb_fr = login_fr, 0 >= login_fr && (login_fr = 0, dead_mtm = -1, nick.disabled = !1, nick.focus(), lb_fr = -1, playing = !1, choosing_skin && (choosing_skin = !1, resetGame(), pskh.style.display = "none", nskh.style.display = "none", skodiv.style.display = "none")), pbdiv.style.opacity = 1 - .5 * Math.max(0, Math.min(1, 6 *
          login_fr)), lgcsc = 1 + .1 * Math.pow(login_fr, 2), u = Math.round(lgbsc * lgcsc * 1E5) / 1E5, 1 == u ? trf(login, "") : trf(login, "scale(" + u + "," + u + ")"), login.style.opacity = 1 - login_fr, cstx.style.opacity = 1 - login_fr, fbh.style.opacity = 1 - login_fr, twth.style.opacity = 1 - login_fr, cskh.style.opacity = 1 - login_fr, grqh.style.opacity = 1 - login_fr, plq.style.opacity = 1 - login_fr, clq.style.opacity = 1 - login_fr, social.style.opacity = 1 - login_fr, pskh.style.opacity = login_fr, nskh.style.opacity = login_fr, skodiv.style.opacity = login_fr, mc.style.opacity =
        login_fr, loch.style.opacity = login_fr, lbh.style.opacity = .85 * lb_fr, lbs.style.opacity = lbn.style.opacity = lbp.style.opacity = lbf.style.opacity = vcm.style.opacity = lb_fr)
    }
    want_close_socket && -1 == dead_mtm && (want_close_socket = !1, ws && (ws.close(), ws = null, playing = connected = !1), resetGame());
    want_victory_message && (victory_bg.style.opacity = .92 + .08 * Math.cos(fr / 10));
    connected && ((0 < kd_l_frb || 0 < kd_r_frb) && 150 < b - lkstm && (lkstm = b, 0 < kd_r_frb && kd_l_frb > kd_r_frb && (kd_l_frb -= kd_r_frb, kd_r_frb = 0), 0 < kd_l_frb && kd_r_frb > kd_l_frb &&
      (kd_r_frb -= kd_l_frb, kd_l_frb = 0), 0 < kd_l_frb ? (v = kd_l_frb, 127 < v && (v = 127), kd_l_frb -= v, 5 <= protocol_version ? (u = new Uint8Array(2), u[0] = 252) : (u = new Uint8Array(2), u[0] = 108), u[1] = v, ws.send(u), snake.eang -= mamu * v * snake.scang * snake.spang) : 0 < kd_r_frb && (v = kd_r_frb, 127 < v && (v = 127), kd_r_frb -= v, 5 <= protocol_version ? (v += 128, u = new Uint8Array(2), u[0] = 252) : (u = new Uint8Array(2), u[0] = 114), u[1] = v, snake.eang += mamu * v * snake.scang * snake.spang, ws.send(u))), !wfpr && 250 < b - last_ping_mtm && (last_ping_mtm = b, wfpr = !0, u = new Uint8Array(1),
      u[0] = 5 <= protocol_version ? 251 : 112, ws.send(u), lpstm = b));
    null != snake && 2147483647 != grd && 1E3 < b - locu_mtm && (locu_mtm = Date.now(), myloc.style.left = Math.round(52 + 40 * (snake.xx - grd) / grd - 7) + "px", myloc.style.top = Math.round(52 + 40 * (snake.yy - grd) / grd - 7) + "px");
    if (1E3 < b - lrd_mtm) {
      if (testing && console && console.log) {
        console.log("FPS: " + fps);
        f = [];
        trdps += rdps;
        playing && tcsecs++;
        f.push("FPS: " + fps);
        f.push("sectors: " + sectors.length);
        f.push("foods: " + foods_c);
        f.push("bytes/sec: " + rdps);
        f.push("bytes/sec avg: " + Math.round(trdps /
          tcsecs));
        f.push("");
        for (u = e = 0; u < rdpspc.length; u++) 0 <= rdpspc[u] && (e += rdpspc[u]);
        for (u = 0; u < rdpspc.length; u++) 0 <= rdpspc[u] && f.push(String.fromCharCode(u) + ": " + rdpspc[u] + " (" + Math.round(rdpspc[u] / e * 1E3) / 10 + "%)");
        f.push("total: " + e);
        maxp = pf_ep = pf_nap = pf_remove = pf_new_add = pf_add = 0;
        f.push("");
        for (u = 1; u < pfs.length; u++) 0 != pfs[u] && (f.push(u + ": " + Math.round(1E3 * pfs[u]) / 1E3), pfs[u] = 0);
        pft = 0;
        pfd.innerHTML = f.join("<br>")
      }
      playing && 1 == want_quality && (32 >= fps ? high_quality && (wdfg++, 1 <= wdfg && (high_quality = !1)) : (high_quality ||
        48 <= fps) && 0 < wdfg && (wdfg--, 0 >= wdfg && (high_quality = !0)));
      wangnuc = angnuc = anguc = fps = reps = rsps = rnps = rfps = rdps = 0;
      lrd_mtm = Date.now()
    }
    etm *= Math.pow(.993, vfrb);
    if (null != snake) {
      if (xm != lsxm || ym != lsym) want_e = !0;
      want_e && 100 < b - last_e_mtm && (want_e = !1, last_e_mtm = b, lsxm = xm, lsym = ym, d2 = xm * xm + ym * ym, 256 < d2 ? (ang = Math.atan2(ym, xm), snake.eang = ang) : ang = snake.wang, ang %= pi2, 0 > ang && (ang += pi2), 5 <= protocol_version ? (sang = Math.floor(251 * ang / pi2), sang != lsang && (lsang = sang, u = new Uint8Array(1), u[0] = sang & 255, lpstm = b, ws.send(u.buffer))) :
        (sang = Math.floor(16777215 * ang / pi2), sang != lsang && (lsang = sang, u = new Uint8Array(4), u[0] = 101, u[1] = sang >> 16 & 255, u[2] = sang >> 8 & 255, u[3] = sang & 255, lpstm = b, ws.send(u.buffer))))
    }
    if (!choosing_skin)
      for (u = snakes.length - 1; 0 <= u; u--) {
        e = snakes[u];
        h = mamu * vfr * e.scang * e.spang;
        b = e.sp * vfr / 4;
        b > e.msl && (b = e.msl);
        if (!e.dead) {
          e.tsp != e.sp && (e.tsp < e.sp ? (e.tsp += .3 * vfr, e.tsp > e.sp && (e.tsp = e.sp)) : (e.tsp -= .3 * vfr, e.tsp < e.sp && (e.tsp = e.sp)));
          e.tsp > e.fsp && (e.sfr += (e.tsp - e.fsp) * vfr * .021);
          if (0 < e.fltg)
            for (f = vfrb, f > e.fltg && (f = e.fltg), e.fltg -=
              f, qq = 0; qq < f; qq++) e.fl = e.fls[e.flpos], e.fls[e.flpos] = 0, e.flpos++, e.flpos >= lfc && (e.flpos = 0);
          else 0 == e.fltg && (e.fltg = -1, e.fl = 0);
          e.cfl = e.tl + e.fl
        }
        if (1 == e.dir) {
          e.ang -= h;
          if (0 > e.ang || e.ang >= pi2) e.ang %= pi2;
          0 > e.ang && (e.ang += pi2);
          f = (e.wang - e.ang) % pi2;
          0 > f && (f += pi2);
          f > Math.PI && (f -= pi2);
          0 < f && (e.ang = e.wang, e.dir = 0)
        } else if (2 == e.dir) {
          e.ang += h;
          if (0 > e.ang || e.ang >= pi2) e.ang %= pi2;
          0 > e.ang && (e.ang += pi2);
          f = (e.wang - e.ang) % pi2;
          0 > f && (f += pi2);
          f > Math.PI && (f -= pi2);
          0 > f && (e.ang = e.wang, e.dir = 0)
        } else e.ang = e.wang;
        1 != e.ehl && (e.ehl +=
          .03 * vfr, 1 <= e.ehl && (e.ehl = 1));
        h = e.pts[e.pts.length - 1];
        e.wehang = Math.atan2(e.yy + e.fy - h.yy - h.fy + h.eby * (1 - e.ehl), e.xx + e.fx - h.xx - h.fx + h.ebx * (1 - e.ehl));
        e.dead || e.ehang == e.wehang || (f = (e.wehang - e.ehang) % pi2, 0 > f && (f += pi2), f > Math.PI && (f -= pi2), 0 > f ? e.edir = 1 : 0 < f && (e.edir = 2));
        if (1 == e.edir) {
          e.ehang -= .1 * vfr;
          if (0 > e.ehang || e.ehang >= pi2) e.ehang %= pi2;
          0 > e.ehang && (e.ehang += pi2);
          f = (e.wehang - e.ehang) % pi2;
          0 > f && (f += pi2);
          f > Math.PI && (f -= pi2);
          0 < f && (e.ehang = e.wehang, e.edir = 0)
        } else if (2 == e.edir) {
          e.ehang += .1 * vfr;
          if (0 > e.ehang || e.ehang >=
            pi2) e.ehang %= pi2;
          0 > e.ehang && (e.ehang += pi2);
          f = (e.wehang - e.ehang) % pi2;
          0 > f && (f += pi2);
          f > Math.PI && (f -= pi2);
          0 > f && (e.ehang = e.wehang, e.edir = 0)
        }
        e.dead || (e.xx += Math.cos(e.ang) * b, e.yy += Math.sin(e.ang) * b, e.chl += b / e.msl);
        if (0 < vfrb) {
          for (w = e.pts.length - 1; 0 <= w; w--) h = e.pts[w], h.dying && (h.da += .0015 * vfrb, 1 < h.da && (e.pts.splice(w, 1), h.dying = !1, points_dp.add(h)));
          for (w = e.pts.length - 1; 0 <= w; w--)
            if (h = e.pts[w], 0 < h.eiu) {
              fy = fx = 0;
              for (qq = cm1 = h.eiu - 1; 0 <= qq; qq--) h.efs[qq] = 2 == h.ems[qq] ? h.efs[qq] + vfrb2 : h.efs[qq] + vfrb, f = h.efs[qq],
                f >= hfc ? (qq != cm1 && (h.exs[qq] = h.exs[cm1], h.eys[qq] = h.eys[cm1], h.efs[qq] = h.efs[cm1], h.ems[qq] = h.ems[cm1]), h.eiu--, cm1--) : (fx += h.exs[qq] * hfas[f], fy += h.eys[qq] * hfas[f]);
              h.fx = fx;
              h.fy = fy
            }
        }
        b = 2.3 * Math.cos(e.eang);
        f = 2.3 * Math.sin(e.eang);
        e.rex < b && (e.rex += vfr / 6, e.rex >= b && (e.rex = b));
        e.rey < f && (e.rey += vfr / 6, e.rey >= f && (e.rey = f));
        e.rex > b && (e.rex -= vfr / 6, e.rex <= b && (e.rex = b));
        e.rey > f && (e.rey -= vfr / 6, e.rey <= f && (e.rey = f));
        if (0 < vfrb) {
          if (0 < e.ftg)
            for (f = vfrb, f > e.ftg && (f = e.ftg), e.ftg -= f, qq = 0; qq < f; qq++) e.fx = e.fxs[e.fpos], e.fy =
              e.fys[e.fpos], e.fchl = e.fchls[e.fpos], e.fxs[e.fpos] = 0, e.fys[e.fpos] = 0, e.fchls[e.fpos] = 0, e.fpos++, e.fpos >= rfc && (e.fpos = 0);
          else 0 == e.ftg && (e.ftg = -1, e.fx = 0, e.fy = 0, e.fchl = 0);
          if (0 < e.fatg)
            for (f = vfrb, f > e.fatg && (f = e.fatg), e.fatg -= f, qq = 0; qq < f; qq++) e.fa = e.fas[e.fapos], e.fas[e.fapos] = 0, e.fapos++, e.fapos >= afc && (e.fapos = 0);
          else 0 == e.fatg && (e.fatg = -1, e.fa = 0)
        }
        e.dead ? (e.dead_amt += .02 * vfr, 1 <= e.dead_amt && snakes.splice(u, 1)) : 1 != e.alive_amt && (e.alive_amt += .015 * vfr, 1 <= e.alive_amt && (e.alive_amt = 1))
      }
    for (u = preys.length - 1; 0 <=
      u; u--) {
      w = preys[u];
      h = mamu2 * vfr;
      b = w.sp * vfr / 4;
      if (0 < vfrb)
        if (0 < w.ftg)
          for (f = vfrb, f > w.ftg && (f = w.ftg), w.ftg -= f, qq = 1; qq <= f; qq++) qq == f && (w.fx = w.fxs[w.fpos], w.fy = w.fys[w.fpos]), w.fxs[w.fpos] = 0, w.fys[w.fpos] = 0, w.fpos++, w.fpos >= rfc && (w.fpos = 0);
        else 0 == w.ftg && (w.fx = 0, w.fy = 0, w.ftg = -1);
      if (1 == w.dir) {
        w.ang -= h;
        if (0 > w.ang || w.ang >= pi2) w.ang %= pi2;
        0 > w.ang && (w.ang += pi2);
        f = (w.wang - w.ang) % pi2;
        0 > f && (f += pi2);
        f > Math.PI && (f -= pi2);
        0 < f && (w.ang = w.wang, w.dir = 0)
      } else if (2 == w.dir) {
        w.ang += h;
        if (0 > w.ang || w.ang >= pi2) w.ang %= pi2;
        0 > w.ang &&
          (w.ang += pi2);
        f = (w.wang - w.ang) % pi2;
        0 > f && (f += pi2);
        f > Math.PI && (f -= pi2);
        0 > f && (w.ang = w.wang, w.dir = 0)
      } else w.ang = w.wang;
      w.xx += Math.cos(w.ang) * b;
      w.yy += Math.sin(w.ang) * b;
      w.gfr += vfr * w.gr;
      w.eaten ? (1.5 != w.fr && (w.fr += vfr / 150, 1.5 <= w.fr && (w.fr = 1.5)), w.eaten_fr += vfr / 47, w.gfr += vfr, e = w.eaten_by, 1 <= w.eaten_fr || !e ? preys.splice(u, 1) : w.rad = 1 - Math.pow(w.eaten_fr, 3)) : 1 != w.fr && (w.fr += vfr / 150, 1 <= w.fr ? (w.fr = 1, w.rad = 1) : (w.rad = .5 * (1 - Math.cos(Math.PI * w.fr)), w.rad += .66 * (.5 * (1 - Math.cos(Math.PI * w.rad)) - w.rad)))
    }
    for (u = cm1 = foods_c -
      1; 0 <= u; u--) b = foods[u], b.gfr += vfr * b.gr, b.eaten ? (b.eaten_fr += vfr / 41, e = b.eaten_by, 1 <= b.eaten_fr || !e ? (u == cm1 ? foods[u] = null : (foods[u] = foods[cm1], foods[cm1] = null), foods_c--, cm1--) : (e = b.eaten_by, f = b.eaten_fr * b.eaten_fr, b.rad = b.lrrad * (1 - b.eaten_fr * f), b.rx = b.xx + (e.xx + e.fx + Math.cos(e.ang + e.fa) * (43 - 24 * f) * (1 - f) - b.xx) * f, b.ry = b.yy + (e.yy + e.fy + Math.sin(e.ang + e.fa) * (43 - 24 * f) * (1 - f) - b.yy) * f, b.rx += 6 * Math.cos(b.wsp * b.gfr) * (1 - b.eaten_fr), b.ry += 6 * Math.sin(b.wsp * b.gfr) * (1 - b.eaten_fr))) : (1 != b.fr && (b.fr += b.rsp * vfr / 150, 1 <=
      b.fr ? (b.fr = 1, b.rad = 1) : (b.rad = .5 * (1 - Math.cos(Math.PI * b.fr)), b.rad += .66 * (.5 * (1 - Math.cos(Math.PI * b.rad)) - b.rad)), b.lrrad = b.rad), b.rx = b.xx, b.ry = b.yy, b.rx = b.xx + 6 * Math.cos(b.wsp * b.gfr), b.ry = b.yy + 6 * Math.sin(b.wsp * b.gfr));
    vfrb = vfr = 0;
    redraw();
    no_raf || raf(oef)
  },
  bgx = 0,
  bgy = 0,
  bgx2 = 0,
  bgy2 = 0,
  fgfr = 0,
  px, py, lpx, lpy, ax, ay, lax, lay, pax, pay, fx, fy, fs, maxp = 0,
  fps = 0,
  redraw = function() {
    fps++;
    var b = mc.getContext("2d");
    if (animating) {
      if (snake) {
        var h = .5 + .4 / Math.max(1, (snake.sct + 16) / 36);
        gsc != h && (gsc < h ? (gsc += 2E-4, gsc >= h && (gsc = h)) :
          (gsc -= 2E-4, gsc <= h && (gsc = h)))
      }
      var h = view_xx,
        c = view_yy;
      null != snake && (0 < fvtg && (fvtg--, fvx = fvxs[fvpos], fvy = fvys[fvpos], fvxs[fvpos] = 0, fvys[fvpos] = 0, fvpos++, fvpos >= vfc && (fvpos = 0)), view_xx = snake.xx + snake.fx + fvx, view_yy = snake.yy + snake.fy + fvy, choosing_skin && (view_xx -= 104, gsc = 1), view_ang = Math.atan2(view_yy - grd, view_xx - grd), view_dist = Math.sqrt((view_xx - grd) * (view_xx - grd) + (view_yy - grd) * (view_yy - grd)), bpx1 = view_xx - (mww2 / gsc + 84), bpy1 = view_yy - (mhh2 / gsc + 84), bpx2 = view_xx + (mww2 / gsc + 84), bpy2 = view_yy + (mhh2 / gsc + 84), fpx1 =
        view_xx - (mww2 / gsc + 24), fpy1 = view_yy - (mhh2 / gsc + 24), fpx2 = view_xx + (mww2 / gsc + 24), fpy2 = view_yy + (mhh2 / gsc + 24));
      bgx2 -= 1 * (view_xx - h) / bgw2;
      bgy2 -= 1 * (view_yy - c) / bgh2;
      bgx2 %= 1;
      0 > bgx2 && (bgx2 += 1);
      bgy2 %= 1;
      0 > bgy2 && (bgy2 += 1);
      ggbg && (high_quality || 0 < gla) ? (b.save(), b.fillStyle = "#000000", b.fillRect(0, 0, mww, mhh), b.globalAlpha = .3 * gla, b.drawImage(gbgmc, 0, 0), b.restore()) : (b.fillStyle = "#000000", b.fillRect(0, 0, mww, mhh));
      if (bgp2) {
        b.save();
        b.fillStyle = bgp2;
        b.translate(mww2, mhh2);
        b.scale(gsc, gsc);
        b.translate(bgx2 * bgw2, bgy2 * bgh2);
        b.globalAlpha = .4 + .6 * (1 - gla);
        b.fillRect(3 * -mww / gsc, 3 * -mhh / gsc, 5 * mww / gsc, 5 * mhh / gsc);
        if (high_quality || 0 < gla) b.globalCompositeOperation = "lighter", b.globalAlpha = .4 * gla, b.fillRect(3 * -mww / gsc, 3 * -mhh / gsc, 5 * mww / gsc, 5 * mhh / gsc);
        b.restore()
      }
      if (testing)
        for (h = sectors.length - 1; 0 <= h; h--) c = sectors[h], b.fillStyle = "rgba(0, 255, 0, .1)", b.fillRect(mww2 + (c.xx * sector_size - view_xx) * gsc, mhh2 + (c.yy * sector_size - view_yy) * gsc, sector_size * gsc - 4, sector_size * gsc - 4);
      if (high_quality || 0 < gla) {
        var f = 1.75;
        1 != gla && (f = 1.75 * gla);
        b.save();
        for (h = foods_c - 1; 0 <= h; h--) c = foods[h], c.rx >= fpx1 && c.ry >= fpy1 && c.rx <= fpx2 && c.ry <= fpy2 && (1 == c.rad ? (B = mww2 + gsc * (c.rx - view_xx) - c.ofw2, q = mhh2 + gsc * (c.ry - view_yy) - c.ofh2, b.globalAlpha = f * c.fr, b.drawImage(c.ofi, B, q)) : (B = mww2 + gsc * (c.rx - view_xx) - c.ofw2 * c.rad, q = mhh2 + gsc * (c.ry - view_yy) - c.ofh2 * c.rad, b.globalAlpha = f * c.fr, b.drawImage(c.ofi, 0, 0, c.ofw, c.ofh, B, q, c.ofw * c.rad, c.ofh * c.rad)));
        b.restore()
      }
      b.save();
      b.globalCompositeOperation = "lighter";
      if (high_quality || 0 < gla) {
        f = .75;
        1 != gla && (f = .75 * gla);
        var w = .75;
        1 != gla && (w = 1 -
          .25 * gla);
        for (h = foods_c - 1; 0 <= h; h--) c = foods[h], c.rx >= fpx1 && c.ry >= fpy1 && c.rx <= fpx2 && c.ry <= fpy2 && (1 == c.rad ? (B = mww2 + gsc * (c.rx - view_xx) - c.fw2, q = mhh2 + gsc * (c.ry - view_yy) - c.fh2, b.globalAlpha = w * c.fr, b.drawImage(c.fi, B, q), b.globalAlpha = f * (.5 + .5 * Math.cos(c.gfr / 13)) * c.fr, b.drawImage(c.fi, B, q)) : (B = mww2 + gsc * (c.rx - view_xx) - c.fw2 * c.rad, q = mhh2 + gsc * (c.ry - view_yy) - c.fh2 * c.rad, b.globalAlpha = w * c.fr, b.drawImage(c.fi, 0, 0, c.fw, c.fh, B, q, c.fw * c.rad, c.fh * c.rad), b.globalAlpha = f * (.5 + .5 * Math.cos(c.gfr / 13)) * c.fr, b.drawImage(c.fi,
          0, 0, c.fw, c.fh, B, q, c.fw * c.rad, c.fh * c.rad)))
      } else
        for (h = foods_c - 1; 0 <= h; h--) c = foods[h], c.rx >= fpx1 && c.ry >= fpy1 && c.rx <= fpx2 && c.ry <= fpy2 && (1 == c.rad ? (B = mww2 + gsc * (c.rx - view_xx) - c.fw2, q = mhh2 + gsc * (c.ry - view_yy) - c.fh2, b.globalAlpha = c.fr, b.drawImage(c.fi, B, q)) : (B = mww2 + gsc * (c.rx - view_xx) - c.fw2 * c.rad, q = mhh2 + gsc * (c.ry - view_yy) - c.fh2 * c.rad, b.globalAlpha = c.fr, b.drawImage(c.fi, 0, 0, c.fw, c.fh, B, q, c.fw * c.rad, c.fh * c.rad)));
      b.restore();
      b.save();
      b.globalCompositeOperation = "lighter";
      for (h = preys.length - 1; 0 <= h; h--)
        if (f = preys[h],
          e = f.xx + f.fx, z = f.yy + f.fy, px = mww2 + gsc * (e - view_xx), py = mhh2 + gsc * (z - view_yy), -50 <= px && -50 <= py && px <= mwwp50 && py <= mhhp50) {
          if (f.eaten) {
            var c = f.eaten_by,
              u = Math.pow(f.eaten_fr, 2),
              e = e + (c.xx + c.fx + Math.cos(c.ang + c.fa) * (43 - 24 * u) * (1 - u) - e) * u,
              z = z + (c.yy + c.fy + Math.sin(c.ang + c.fa) * (43 - 24 * u) * (1 - u) - z) * u;
            px = mww2 + gsc * (e - view_xx);
            py = mhh2 + gsc * (z - view_yy)
          }
          1 == f.rad ? (B = px - f.fw2, q = py - f.fh2, b.globalAlpha = .75 * f.fr, b.drawImage(f.fi, B, q), b.globalAlpha = .75 * (.5 + .5 * Math.cos(f.gfr / 13)) * f.fr, b.drawImage(f.fi, B, q)) : (B = px - f.fw2 * f.rad, q = py -
            f.fh2 * f.rad, b.globalAlpha = .75 * f.fr, b.drawImage(f.fi, 0, 0, f.fw, f.fh, B, q, f.fw * f.rad, f.fh * f.rad), b.globalAlpha = .75 * (.5 + .5 * Math.cos(f.gfr / 13)) * f.fr, b.drawImage(f.fi, 0, 0, f.fw, f.fh, B, q, f.fw * f.rad, f.fh * f.rad))
        }
      b.restore();
      b.save();
      b.strokeStyle = "#90C098";
      for (var e, z, E, h = snakes.length - 1; 0 <= h; h--) c = snakes[h], e = c.xx + c.fx, z = c.yy + c.fy + 40, 0 < c.na && e >= bpx1 - 100 && z >= bpy1 && e <= bpx2 + 100 && z <= bpy2 && (c == snake && (c.fnfr++, 200 < c.fnfr && (c.na -= .004, 0 > c.na && (c.na = 0))), b.save(), b.globalAlpha = .5 * c.na * c.alive_amt * (1 - c.dead_amt),
        b.font = "12px Arial, Helvetica Neue, Helvetica, sans-serif", b.fillStyle = c.csw, b.textBaseline = "middle", b.textAlign = "center", f = c.xx + c.fx, w = c.yy + c.fy, f = mww2 + (f - view_xx) * gsc, w = mhh2 + (w - view_yy) * gsc, b.fillText(c.nk, f, w + 32 + 11 * c.sc * gsc), b.restore());
      for (h = snakes.length - 1; 0 <= h; h--)
        for (c = snakes[h], c.iiv = !1, y = c.pts.length - 1; 0 <= y; y--)
          if (e = c.pts[y], px = e.xx + e.fx, py = e.yy + e.fy, px >= bpx1 && py >= bpy1 && px <= bpx2 && py <= bpy2) {
            c.iiv = !0;
            break
          }
      for (h = snakes.length - 1; 0 <= h; h--)
        if (c = snakes[h], c.iiv) {
          f = c.xx + c.fx;
          w = c.yy + c.fy;
          px = f;
          py =
            w;
          E = c.ehang;
          var t = c.sc,
            x = 29 * t,
            D = c.cfl;
          e = c.pts[c.pts.length - 1];
          if (1 == render_mode) {
            b.save();
            b.beginPath();
            b.moveTo(mww2 + (px - view_xx) * gsc, mhh2 + (py - view_yy) * gsc);
            z = !1;
            for (var y = c.pts.length - 1; 0 <= y; y--) {
              e = c.pts[y];
              lpx = px;
              lpy = py;
              px = e.xx;
              py = e.yy;
              var B = e.fx,
                q = e.fy;
              0 < D && (px += B, py += q, lax = ax, lay = ay, ax = (px + lpx) / 2, ay = (py + lpy) / 2, z || (lax = ax, lay = ay), 1 > D && (u = 1 - D, lpx += (lax - lpx) * u, lpy += (lay - lpy) * u, ax += (lax - ax) * u, ay += (lay - ay) * u), z ? D-- : D -= c.chl + c.fchl, z ? b.quadraticCurveTo(mww2 + (lpx - view_xx) * gsc, mhh2 + (lpy - view_yy) * gsc,
                mww2 + (ax - view_xx) * gsc, mhh2 + (ay - view_yy) * gsc) : (b.lineTo(mww2 + (ax - view_xx) * gsc, mhh2 + (ay - view_yy) * gsc), z = !0))
            }
            b.save();
            b.lineJoin = "round";
            b.lineCap = "round";
            is_firefox ? (c.sp > c.fsp && (y = c.alive_amt * (1 - c.dead_amt) * Math.max(0, Math.min(1, (c.sp - c.ssp) / (c.msp - c.ssp))), b.save(), b.strokeStyle = c.cs, b.globalAlpha = .3 * y, b.lineWidth = (x + 6) * gsc, b.stroke(), b.lineWidth = (x + 9) * gsc, b.stroke(), b.lineWidth = (x + 12) * gsc, b.stroke(), b.restore()), b.globalAlpha = 1 * c.alive_amt * (1 - c.dead_amt), b.strokeStyle = "#000000", b.lineWidth = (x + 5) *
              gsc) : (c.sp > c.fsp && (y = c.alive_amt * (1 - c.dead_amt) * Math.max(0, Math.min(1, (c.sp - c.ssp) / (c.msp - c.ssp))), b.save(), b.lineWidth = (x - 2) * gsc, b.shadowBlur = 30 * gsc, b.shadowColor = "rgba(" + c.rr + "," + c.gg + "," + c.bb + ", " + Math.round(1E4 * y) / 1E4 + ")", b.stroke(), b.stroke(), b.restore()), b.globalAlpha = .4 * c.alive_amt * (1 - c.dead_amt), b.strokeStyle = "#000000", b.lineWidth = (x + 5) * gsc, b.stroke(), b.strokeStyle = c.cs, b.lineWidth = x * gsc, b.strokeStyle = "#000000", b.globalAlpha = 1 * c.alive_amt * (1 - c.dead_amt));
            b.stroke();
            b.strokeStyle = c.cs;
            b.globalAlpha =
              .8 * c.alive_amt * (1 - c.dead_amt);
            b.lineWidth = x * gsc;
            b.stroke();
            b.restore();
            b.strokeStyle = c.cs;
            c.dead && (q = (.5 + .5 * Math.abs(Math.sin(5 * Math.PI * c.dead_amt))) * Math.sin(Math.PI * c.dead_amt), b.save(), b.lineJoin = "round", b.lineCap = "round", b.globalCompositeOperation = "lighter", b.lineWidth = (x - 3) * gsc, b.globalAlpha = q, b.strokeStyle = "#FFCC99", b.stroke(), b.restore());
            b.restore()
          }
          if (2 == render_mode) {
            var x = .5 * x,
              I, A, L, J, H, C, M, O, B = 0;
            px = f;
            py = w;
            H = px;
            C = py;
            H >= bpx1 && C >= bpy1 && H <= bpx2 && C <= bpy2 ? (pbx[0] = H, pby[0] = C, pba[0] = Math.atan2(w -
              (e.yy + e.fy), f - (e.xx + e.fx)) + Math.PI, pbu[0] = 1) : pbu[0] = 0;
            B = 1;
            n = (c.chl + c.fchl) % .25;
            0 > n && (n += .25);
            n = .25 - n;
            D += 1 - .25 * Math.ceil((c.chl + c.fchl) / .25);
            ax = px;
            ay = py;
            c.sep != c.wsep && (c.sep < c.wsep ? (c.sep += .01, c.sep >= c.wsep && (c.sep = c.wsep)) : c.sep > c.wsep && (c.sep -= .01, c.sep <= c.wsep && (c.sep = c.wsep)));
            for (var N = c.sep * qsm, K = 0, q = per_color_imgs[c.cv].kmcs, F, G, y = c.pts.length - 1; 0 <= y; y--)
              if (e = c.pts[y], lpx = px, lpy = py, px = e.xx + e.fx, py = e.yy + e.fy, -.25 < D) {
                L = H;
                J = C;
                H = (px + lpx) / 2;
                C = (py + lpy) / 2;
                M = lpx;
                O = lpy;
                for (u = 0; 1 > u; u += .25) {
                  F = n + u;
                  e = L +
                    (M - L) * F;
                  z = J + (O - J) * F;
                  I = M + (H - M) * F;
                  A = O + (C - O) * F;
                  lax = ax;
                  lay = ay;
                  ax = e + (I - e) * F;
                  ay = z + (A - z) * F;
                  0 > D && (ax += -(lax - ax) * D / .25, ay += -(lay - ay) * D / .25);
                  I = Math.sqrt(Math.pow(ax - lax, 2) + Math.pow(ay - lay, 2));
                  if (K + I < N) K += I;
                  else {
                    K = -K;
                    for (F = (I - K) / N; 1 <= F; F--) K += N, pax = lax + (ax - lax) * K / I, pay = lay + (ay - lay) * K / I, pax >= bpx1 && pay >= bpy1 && pax <= bpx2 && pay <= bpy2 ? (pbx[B] = pax, pby[B] = pay, pbu[B] = 1, e = ax - lax, z = ay - lay, pba[B] = -15 <= e && -15 <= z && 15 > e && 15 > z ? at2lt[8 * z + 128 << 8 | 8 * e + 128] : -127 <= e && -127 <= z && 127 > e && 127 > z ? at2lt[z + 128 << 8 | e + 128] : Math.atan2(z, e)) : pbu[B] =
                      0, B++;
                    K = I - K
                  }
                  if (1 > D && (D -= .25, -.25 >= D)) break
                }
                1 <= D && D--
              }
            ax >= bpx1 && ay >= bpy1 && ax <= bpx2 && ay <= bpy2 ? (pbu[B] = 1, pbx[B] = ax, pby[B] = ay, pba[B] = Math.atan2(ay - lay, ax - lax)) : pbu[B] = 0;
            B++;
            b.save();
            b.translate(mww2, mhh2);
            u = gsc * x * 52 / 32;
            H = gsc * x * 62 / 32;
            D = c.alive_amt * (1 - c.dead_amt);
            D *= D;
            F = 1;
            if (c.tsp > c.fsp) {
              F = c.alive_amt * (1 - c.dead_amt) * Math.max(0, Math.min(1, (c.tsp - c.ssp) / (c.msp - c.ssp)));
              G = .37 * F;
              z = Math.pow(F, .5);
              K = gsc * x * (1 + .9375 * z);
              e = per_color_imgs[c.cv].kfmc;
              b.save();
              b.globalCompositeOperation = "lighter";
              if (c.rbcs)
                for (C = c.rbcs,
                  N = C.length, y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], e = per_color_imgs[C[y % N]], e = e.kfmc, b.save(), b.globalAlpha = D * z * .38 * (.6 + .4 * Math.cos(y / 4 - 1.15 * c.sfr)), b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.drawImage(e, -K, -K, 2 * K, 2 * K), b.restore());
              else
                for (y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], b.save(), b.globalAlpha = D * z * .38 * (.6 + .4 * Math.cos(y / 4 - 1.15 * c.sfr)), b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.drawImage(e, -K, -K, 2 * K, 2 * K), b.restore());
              b.restore();
              F = 1 - F
            }
            F *= D;
            if (high_quality || 0 < gla)
              for (e =
                F, 1 != gla && (e = F * gla), b.globalAlpha = e, y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], b.save(), b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.drawImage(komc, -u, -u, 2 * u, 2 * u), 9 > y && (b.globalAlpha = e * (1 - y / 9), b.drawImage(ksmc, -H, -H, 2 * H, 2 * H), b.globalAlpha = e), b.restore());
            b.globalAlpha = F;
            if (c.rbcs) {
              C = c.rbcs;
              N = C.length;
              for (y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], 2 <= y && (u = y - 2, 1 == pbu[u] && (e = pbx[u], z = pby[u], b.save(), b.translate((e - view_xx) * gsc, (z - view_yy) * gsc), b.globalAlpha = 9 > u ? u / 9 * F : F, b.drawImage(ksmc, -H, -H, 2 * H, 2 * H), b.restore())), b.save(), b.globalAlpha = D, b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.rotate(pba[y]), u = y % (2 * q.length), u >= q.length && (u = 2 * q.length - (u + 1)), e = per_color_imgs[C[y % N]], b.drawImage(e.kmcs[u], -gsc * x, -gsc * x, 2 * gsc * x, 2 * gsc * x), b.restore());
              if (c.tsp > c.fsp && (high_quality || 0 < gla)) {
                b.save();
                b.globalCompositeOperation = "lighter";
                for (y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], b.save(), b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.rotate(pba[y]), b.globalAlpha = D * G * gla * (.5 + .5 * Math.cos(y /
                  4 - c.sfr)), u = y % (2 * q.length), u >= q.length && (u = 2 * q.length - (u + 1)), b.drawImage(per_color_imgs[C[y % N]].kmcs[u], -gsc * x, -gsc * x, 2 * gsc * x, 2 * gsc * x), b.restore());
                b.restore()
              }
            } else {
              for (y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], 2 <= y && (u = y - 2, 1 == pbu[u] && (e = pbx[u], z = pby[u], b.save(), b.translate((e - view_xx) * gsc, (z - view_yy) * gsc), b.globalAlpha = 9 > u ? u / 9 * F : F, b.drawImage(ksmc, -H, -H, 2 * H, 2 * H), b.restore())), b.save(), b.globalAlpha = D, b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.rotate(pba[y]), u = y % (2 * q.length), u >= q.length &&
                (u = 2 * q.length - (u + 1)), b.drawImage(q[u], -gsc * x, -gsc * x, 2 * gsc * x, 2 * gsc * x), b.restore());
              if (c.tsp > c.fsp && (high_quality || 0 < gla)) {
                b.save();
                b.globalCompositeOperation = "lighter";
                for (y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], u = y % (2 * q.length), u >= q.length && (u = 2 * q.length - (u + 1)), b.save(), b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.rotate(pba[y]), b.globalAlpha = D * G * gla * (.5 + .5 * Math.cos(y / 4 - c.sfr)), b.drawImage(q[u], -gsc * x, -gsc * x, 2 * gsc * x, 2 * gsc * x), b.restore());
                b.restore()
              }
            }
            if (c.antenna && 2 <= B && 1 == pbu[1]) {
              c.atx[0] =
                pbx[1];
              c.aty[0] = pby[1];
              F = c.sc * gsc;
              fj = c.atx.length - 1;
              if (choosing_skin)
                for (y = 1; y <= fj; y++) c.atvx[y] -= .3, c.atvy[y] += .14 * Math.cos(fr / 23 - 7 * y / fj);
              for (y = 1; y <= fj; y++) xx = c.atx[y - 1], yy = c.aty[y - 1], xx += 2 * Math.random() - 1, yy += 2 * Math.random() - 1, e = c.atx[y] - xx, z = c.aty[y] - yy, ang = -4 <= e && -4 <= z && 4 > e && 4 > z ? at2lt[32 * z + 128 << 8 | 32 * e + 128] : -8 <= e && -8 <= z && 8 > e && 8 > z ? at2lt[16 * z + 128 << 8 | 16 * e + 128] : -16 <= e && -16 <= z && 16 > e && 16 > z ? at2lt[8 * z + 128 << 8 | 8 * e + 128] : -127 <= e && -127 <= z && 127 > e && 127 > z ? at2lt[z + 128 << 8 | e + 128] : Math.atan2(z, e), xx += 4 * Math.cos(ang) *
                c.sc, yy += 4 * Math.sin(ang) * c.sc, c.atvx[y] += .1 * (xx - c.atx[y]), c.atvy[y] += .1 * (yy - c.aty[y]), c.atx[y] += c.atvx[y], c.aty[y] += c.atvy[y], c.atvx[y] *= .88, c.atvy[y] *= .88, e = c.atx[y] - c.atx[y - 1], z = c.aty[y] - c.aty[y - 1], I = Math.sqrt(e * e + z * z), I > 4 * c.sc && (ang = -4 <= e && -4 <= z && 4 > e && 4 > z ? at2lt[32 * z + 128 << 8 | 32 * e + 128] : -8 <= e && -8 <= z && 8 > e && 8 > z ? at2lt[16 * z + 128 << 8 | 16 * e + 128] : -16 <= e && -16 <= z && 16 > e && 16 > z ? at2lt[8 * z + 128 << 8 | 8 * e + 128] : -127 <= e && -127 <= z && 127 > e && 127 > z ? at2lt[z + 128 << 8 | e + 128] : Math.atan2(z, e), c.atx[y] = c.atx[y - 1] + 4 * Math.cos(ang) * c.sc,
                  c.aty[y] = c.aty[y - 1] + 4 * Math.sin(ang) * c.sc);
              b.globalAlpha = D;
              b.strokeStyle = c.atc1;
              b.lineWidth = 5 * F;
              b.lineCap = "round";
              b.lineJoin = "round";
              b.beginPath();
              fj = c.atx.length - 1;
              e = (c.atx[fj] - view_xx) * gsc;
              z = (c.aty[fj] - view_yy) * gsc;
              b.moveTo(e, z);
              for (y = fj - 1; 1 <= y; y--) xx = (c.atx[y] - view_xx) * gsc, yy = (c.aty[y] - view_yy) * gsc, 1 <= Math.abs(xx - e) + Math.abs(yy - z) && (e = xx, z = yy, b.lineTo(e, z));
              xx = (.5 * (c.atx[1] + c.atx[0]) - view_xx) * gsc;
              yy = (.5 * (c.aty[1] + c.aty[0]) - view_yy) * gsc;
              1 <= Math.abs(xx - e) + Math.abs(yy - z) && (e = xx, z = yy, b.lineTo(e, z));
              b.stroke();
              b.globalAlpha = c.atia * D;
              b.strokeStyle = c.atc2;
              b.lineWidth = 4 * F;
              b.beginPath();
              fj = c.atx.length - 1;
              e = (c.atx[fj] - view_xx) * gsc;
              z = (c.aty[fj] - view_yy) * gsc;
              b.moveTo(e, z);
              for (y = fj - 1; 0 <= y; y--) xx = (c.atx[y] - view_xx) * gsc, yy = (c.aty[y] - view_yy) * gsc, 1 <= Math.abs(xx - e) + Math.abs(yy - z) && (e = xx, z = yy, b.lineTo(e, z));
              b.stroke();
              c.atwg && (b.lineWidth = 3 * F, b.stroke(), b.lineWidth = 2 * F, b.stroke());
              b.globalAlpha = D * c.blba;
              if (c.abrot) {
                b.save();
                b.translate((c.atx[fj] - view_xx) * gsc, (c.aty[fj] - view_yy) * gsc);
                vang = Math.atan2(c.aty[fj] -
                  c.aty[fj - 1], c.atx[fj] - c.atx[fj - 1]) - c.atba;
                if (0 > vang || vang >= pi2) vang %= pi2;
                vang < -Math.PI ? vang += pi2 : vang > Math.PI && (vang -= pi2);
                c.atba = (c.atba + .15 * vang) % pi2;
                b.rotate(c.atba);
                b.drawImage(c.bulb, c.blbx * c.bsc * F, c.blby * c.bsc * F, c.blbw * c.bsc * F, c.blbh * c.bsc * F);
                b.restore()
              } else b.drawImage(c.bulb, (c.atx[fj] - view_xx + c.blbx * c.bsc * c.sc) * gsc, (c.aty[fj] - view_yy + c.blby * c.bsc * c.sc) * gsc, c.blbw * c.bsc * F, c.blbh * c.bsc * F);
              c.apbs && (b.globalAlpha = .5 * D, b.lineWidth = 3 * F, b.stroke(), b.lineWidth = 2 * F, b.stroke())
            }
            if (c.dead) {
              b.save();
              b.globalCompositeOperation = "lighter";
              q = (.15 + .15 * Math.abs(Math.sin(5 * Math.PI * c.dead_amt))) * Math.sin(Math.PI * c.dead_amt);
              x *= gsc;
              for (y = B - 1; 0 <= y; y--) 1 == pbu[y] && (px = pbx[y], py = pby[y], b.save(), b.globalAlpha = q * (.6 + .4 * Math.cos(y / 4 - 15 * c.dead_amt)), b.translate((px - view_xx) * gsc, (py - view_yy) * gsc), b.drawImage(kdmc, -x, -x, 2 * x, 2 * x), b.restore());
              b.restore()
            }
            b.restore()
          }
          y = 1 == render_mode ? 4 * t : 6 * t;
          x = 6 * t;
          B = Math.cos(E) * y + Math.cos(E - Math.PI / 2) * (x + .5);
          q = Math.sin(E) * y + Math.sin(E - Math.PI / 2) * (x + .5);
          b.fillStyle = c.ec;
          b.globalAlpha =
            c.eca * c.alive_amt;
          b.beginPath();
          b.arc(mww2 + (B + f - view_xx) * gsc, mhh2 + (q + w - view_yy) * gsc, c.er * t * gsc, 0, pi2);
          b.closePath();
          b.fill();
          b.globalAlpha = c.ppa;
          B = Math.cos(E) * (y + .5) + c.rex * t + Math.cos(E - Math.PI / 2) * x;
          q = Math.sin(E) * (y + .5) + c.rey * t + Math.sin(E - Math.PI / 2) * x;
          b.fillStyle = c.ppc;
          b.beginPath();
          b.arc(mww2 + (B + f - view_xx) * gsc, mhh2 + (q + w - view_yy) * gsc, 3.5 * t * gsc, 0, pi2);
          b.closePath();
          b.fill();
          B = Math.cos(E) * y + Math.cos(E + Math.PI / 2) * (x + .5);
          q = Math.sin(E) * y + Math.sin(E + Math.PI / 2) * (x + .5);
          b.fillStyle = c.ec;
          b.globalAlpha = c.eca *
            c.alive_amt;
          b.beginPath();
          b.arc(mww2 + (B + f - view_xx) * gsc, mhh2 + (q + w - view_yy) * gsc, c.er * t * gsc, 0, pi2);
          b.closePath();
          b.fill();
          b.globalAlpha = c.ppa;
          B = Math.cos(E) * (y + .5) + c.rex * t + Math.cos(E + Math.PI / 2) * x;
          q = Math.sin(E) * (y + .5) + c.rey * t + Math.sin(E + Math.PI / 2) * x;
          b.fillStyle = c.ppc;
          b.beginPath();
          b.arc(mww2 + (B + f - view_xx) * gsc, mhh2 + (q + w - view_yy) * gsc, 3.5 * t * gsc, 0, pi2);
          b.closePath();
          b.fill();
          b.globalAlpha = 1
        }
      if (high_quality || 0 < gla) {
        b.save();
        b.globalCompositeOperation = "lighter";
        for (h = foods_c - 1; 0 <= h; h--) c = foods[h], c.rx >= fpx1 &&
          c.ry >= fpy1 && c.rx <= fpx2 && c.ry <= fpy2 && (e = c.rx - view_xx, z = c.ry - view_yy, f = e * e + z * z, fs = 1 + .06 * c.rad, B = e * fs, q = z * fs, G = .005 + .09 * (1 - f / (86E3 + f)), 1 != c.rad && (G *= Math.pow(c.rad, .25)), 1 != gla && (G *= gla), B = B * gsc + mww2, q = q * gsc + mhh2, 1 == c.rad ? (B -= c.gfw2, q -= c.gfh2, b.globalAlpha = G * c.fr, b.drawImage(c.gfi, B, q), b.globalAlpha = G * (.5 + .5 * Math.cos(c.gfr / 13)) * c.fr, b.drawImage(c.gfi, B, q)) : (B -= c.gfw2 * c.rad, q -= c.gfh2 * c.rad, b.globalAlpha = G * c.fr, b.drawImage(c.gfi, 0, 0, c.gfw, c.gfh, B, q, c.gfw * c.rad, c.gfh * c.rad), b.globalAlpha = G * (.5 + .5 * Math.cos(c.gfr /
            13)) * c.fr, b.drawImage(c.gfi, 0, 0, c.gfw, c.gfh, B, q, c.gfw * c.rad, c.gfh * c.rad)), fs = 1 + .32 * c.rad, B = e * fs, q = z * fs, G = .085 * (1 - f / (16500 + f)), 1 != c.rad && (G *= Math.pow(c.rad, .25)), 1 != gla && (G *= gla), B = B * gsc + mww2, q = q * gsc + mhh2, 1 == c.rad ? (B -= c.g2fw2, q -= c.g2fh2, b.globalAlpha = G * c.fr, b.drawImage(c.g2fi, B, q), b.globalAlpha = G * (.5 + .5 * Math.cos(c.gfr / 13)) * c.fr, b.drawImage(c.g2fi, B, q)) : (B -= c.g2fw2 * c.rad, q -= c.g2fh2 * c.rad, b.globalAlpha = G * c.fr, b.drawImage(c.g2fi, 0, 0, c.g2fw, c.g2fh, B, q, c.g2fw * c.rad, c.g2fh * c.rad), b.globalAlpha = G * (.5 + .5 *
            Math.cos(c.gfr / 13)) * c.fr, b.drawImage(c.g2fi, 0, 0, c.g2fw, c.g2fh, B, q, c.g2fw * c.rad, c.g2fh * c.rad)));
        b.restore()
      }
      b.save();
      b.globalCompositeOperation = "lighter";
      for (h = preys.length - 1; 0 <= h; h--) f = preys[h], e = f.xx + f.fx, z = f.yy + f.fy, f.eaten && (c = f.eaten_by, u = Math.pow(f.eaten_fr, 2), e += (c.xx + c.fx + Math.cos(c.ang + c.fa) * (43 - 24 * u) * (1 - u) - e) * u, z += (c.yy + c.fy + Math.sin(c.ang + c.fa) * (43 - 24 * u) * (1 - u) - z) * u), e -= view_xx, z -= view_yy, c = e * e + z * z, fs = 1 + .08 * f.rad, px = e * fs, py = z * fs, G = .4 * (1 - c / (176E3 + c)), 1 != f.rad && (G *= Math.pow(f.rad, .25)), px =
        px * gsc + mww2, py = py * gsc + mhh2, 1 == f.rad ? -150 <= px && -150 <= py && px <= mwwp150 && py <= mhhp150 && (px -= f.gfw2, py -= f.gfh2, b.globalAlpha = G * f.fr, b.drawImage(f.gfi, px, py), b.globalAlpha = G * (.5 + .5 * Math.cos(f.gfr / 13)) * f.fr, b.drawImage(f.gfi, px, py)) : -150 <= px && -150 <= py && px <= mwwp150 && py <= mhhp150 && (px -= f.gfw2 * f.rad, py -= f.gfh2 * f.rad, b.globalAlpha = G * f.fr, b.drawImage(f.gfi, 0, 0, f.gfw, f.gfh, px, py, f.gfw * f.rad, f.gfh * f.rad), b.globalAlpha = G * (.5 + .5 * Math.cos(f.gfr / 13)) * f.fr, b.drawImage(f.gfi, 0, 0, f.gfw, f.gfh, px, py, f.gfw * f.rad, f.gfh * f.rad)),
        fs = 1 + .32 * f.rad, px = e * fs, py = z * fs, G = .35 * (1 - c / (46500 + c)), 1 != f.rad && (G *= Math.pow(f.rad, .25)), c = 2 * f.rad, px = px * gsc + mww2, py = py * gsc + mhh2, -150 <= px && -150 <= py && px <= mwwp150 && py <= mhhp150 && (px -= f.gfw2 * c, py -= f.gfh2 * c, b.globalAlpha = G * f.fr, b.drawImage(f.gfi, 0, 0, f.gfw, f.gfh, px, py, f.gfw * c, f.gfh * c), b.globalAlpha = G * (.5 + .5 * Math.cos(f.gfr / 13)) * f.fr, b.drawImage(f.gfi, 0, 0, f.gfw, f.gfh, px, py, f.gfw * c, f.gfh * c));
      b.restore();
      if (4E3 > Math.abs(grd - view_dist)) {
        b.save();
        b.lineWidth = 23 * gsc;
        b.strokeStyle = "#800000";
        b.fillStyle = "#300000";
        b.beginPath();
        xx = grd + Math.cos(view_ang - 2E3 / grd) * grd * .98;
        yy = grd + Math.sin(view_ang - 2E3 / grd) * grd * .98;
        b.moveTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
        for (y = -2E3; 2E3 >= y; y += 100) xx = grd + Math.cos(view_ang + y / grd) * grd * .98, yy = grd + Math.sin(view_ang + y / grd) * grd * .98, b.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
        xx = grd + Math.cos(view_ang + 2E3 / grd) * (grd + 4E3);
        yy = grd + Math.sin(view_ang + 2E3 / grd) * (grd + 4E3);
        b.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
        xx = grd + Math.cos(view_ang - 2E3 / grd) * (grd + 4E3);
        yy = grd +
          Math.sin(view_ang - 2E3 / grd) * (grd + 4E3);
        b.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
        b.closePath();
        b.stroke();
        b.fill();
        b.restore()
      }
      wumsts && 0 < rank && 0 < snake_count && playing && (wumsts = !1, c = "Your length", h = "of", G = "Your rank", "DE" == country ? (c = "Deine L\u00e4nge", h = "von", G = "Dein rang") : "FR" == country ? (c = "Votre longueur", h = "de", G = "Ton rang") : "BR" == country && (c = "Seu comprimento", h = "do", G = "Seu classifica\u00e7\u00e3o"), c = "" + ('<span style="font-size: 14px;"><span style="opacity: .4;">' + c + ': </span><span style="opacity: .8; font-weight: bold;">' +
        Math.floor(150 * (fpsls[snake.sct] + snake.fam / fmlts[snake.sct] - 1) - 50) / 10 + "</span></span>"), c += '<BR><span style="opacity: .3;">' + G + ': </span><span style="opacity: .35;">' + rank + '</span><span style="opacity: .3;"> ' + h + ' </span><span style="opacity: .35;">' + snake_count + "</span>", lbf.innerHTML = c);
      b.restore()
    }
  },
  ww = window.innerWidth,
  hh = window.innerHeight,
  lww = 0,
  lhh = 0,
  csc, grd = 16384;

function resize() {
  ww = Math.ceil(window.innerWidth);
  hh = Math.ceil(window.innerHeight);
  if (ww != lww || hh != lhh) {
    lww = ww;
    lhh = hh;
    var b = 0;
    if (mbi) {
      var h = ww / 1245;
      mbi.width = 1245 * h;
      b = Math.ceil(260 * h);
      mbi.height = b;
      hh -= b
    }
    ww -= wsu;
    loch.style.bottom = 16 + b + "px";
    lbf.style.bottom = 4 + b + "px";
    lbh.style.right = 4 + wsu + "px";
    lbs.style.right = 4 + wsu + "px";
    lbn.style.right = 64 + wsu + "px";
    lbp.style.right = 230 + wsu + "px";
    loch.style.right = 16 + wsu + "px";
    plq.style.right = 10 + wsu + "px";
    clq.style.left = Math.floor(ww / 2 - 130) + "px";
    login.style.width = ww + "px";
    fbh.style.right =
      30 + wsu + "px";
    twth.style.right = 130 + wsu + "px";
    cstx.style.right = 240 + wsu + "px";
    grqh.style.right = 20 + wsu + "px";
    pskh.style.left = Math.round(.25 * ww - 44) + "px";
    nskh.style.left = Math.round(.75 * ww - 44) + "px";
    skodiv.style.left = Math.round(ww / 2 - skodiv.offsetWidth / 2) + "px";
    skodiv.style.top = Math.round(hh / 2 + 120) + "px";
    pskh.style.top = Math.round(hh / 2 - 44) + "px";
    nskh.style.top = Math.round(hh / 2 - 44) + "px";
    ldmc.style.left = ww / 2 - 64 + "px";
    ldmc.style.top = hh / 2 - 64 + "px";
    var h = Math.sqrt(ww * ww + hh * hh),
      b = Math.ceil(1400 * ww / h),
      c = Math.ceil(1400 * hh / h);
    1100 < b && (c = Math.ceil(1100 * c / b), b = 1100);
    1100 < c && (b = Math.ceil(1100 * b / c), c = 1100);
    lgbsc = 560 > hh ? Math.max(50, hh) / 560 : 1;
    h = Math.round(lgbsc * lgcsc * 1E5) / 1E5;
    1 == h ? (trf(login, ""), login.style.top = "0px") : (login.style.top = -(Math.round(hh * (1 - lgbsc) * 1E5) / 1E5) + "px", trf(login, "scale(" + h + "," + h + ")"));
    if (mww != b || mhh != c) mww = b, mhh = c, mc.width = mww, mc.height = mhh, mwwp50 = mww + 50, mhhp50 = mhh + 50, mwwp150 = mww + 150, mhhp150 = mhh + 150, mww2 = mww / 2, mhh2 = mhh / 2, rdgbg();
    csc = Math.min(ww / mww, hh / mhh);
    trf(mc, "scale(" + csc + "," + csc + ")");
    mc.style.left =
      Math.floor(ww / 2 - mww / 2) + "px";
    mc.style.top = Math.floor(hh / 2 - mhh / 2) + "px"
  }
  nbg.style.width = ww + "px";
  nbg.style.height = hh + "px";
  redraw()
}
window.onresize = function() {
  resize()
};
for (i = ois.length - 1; 0 <= i; i--) ois[i].ii.src = ois[i].src;
0 == wic && startAnimation();
//UPDATE - Disable the listener.
window.onmousemove = undefined /*function(b) {
  (b = b || window.event) && "undefined" != typeof b.clientX && (xm = b.clientX - ww / 2, ym = b.clientY - hh / 2)
};*/

function setAcceleration(b) {
  if (null != snake) {
    snake.md = 1 == b;
    if (5 <= protocol_version) {
      var h = new Uint8Array(1);
      h[0] = 1 == b ? 253 : 254
    } else h = new Uint8Array(2), h[0] = 109, h[1] = b;
    ws.send(h)
  }
}
window.oncontextmenu = function(b) {
  b.preventDefault();
  b.stopPropagation();
  return !1
};
window.ontouchmove = function(b) {
  dmutm = Date.now() + 1500;
  null != snake && (b = b || window.event) && (b = b.touches[0], "undefined" != typeof b.clientX ? (xm = b.clientX - ww / 2, ym = b.clientY - hh / 2) : (xm = b.pageX - ww / 2, ym = b.pageY - hh / 2))
};
var dmutm = 0,
  ltchx = -1,
  ltchy = -1,
  ltchmtm = -1;
window.ontouchstart = function(b) {
  dmutm = Date.now() + 1500;
  if (null != snake) {
    if (b = b || window.event) {
      var h, c;
      c = b.touches[0];
      "undefined" != typeof c.clientX ? (h = c.clientX - ww / 2, c = c.clientY - hh / 2) : (h = c.pageX - ww / 2, c = c.pageY - hh / 2);
      var f = Date.now();
      24 > Math.abs(h - ltchx) && 24 > Math.abs(c - ltchy) && 400 > f - ltchmtm && setAcceleration(1);
      ltchx = h;
      ltchy = c;
      ltchmtm = f;
      xm = h;
      ym = c
    }
    b.preventDefault()
  }
};
window.onmousedown = function(b) {
  if (0 == dmutm || Date.now() > dmutm) dmutm = 0, null != snake && (window.onmousemove(b), setAcceleration(1), b.preventDefault())
};
window.ontouchend = function() {
  setAcceleration(0)
};

function omu(b) {
  setAcceleration(0)
}
window.addEventListener("mouseup", omu);
var mscps = 0,
  fmlts = [],
  fpsls = [],
  etm = 0,
  ws = null,
  tcsecs = 0,
  trdps = 0,
  rdps = 0,
  rfps = 0,
  rnps = 0,
  rsps = 0,
  reps = 0,
  rdpspc = [],
  anguc = 0,
  angnuc = 0,
  wangnuc = 0,
  lrd_mtm = Date.now(),
  locu_mtm = 0;
if (testing)
  for (i = 0; 256 > i; i++) rdpspc[i] = -1;
var pfs = [],
  pft = 0,
  pf1 = 0,
  pf2 = 0,
  rpf1, rpf2, pf_nap = 0,
  pf_ep = 0,
  rpft = 0,
  pf;
for (i = 0; 100 > i; i++) pfs.push(0);
var pf_add = 0,
  pf_new_add = 0,
  pf_remove = 0,
  tpfa = new Float32Array(4E4);
for (i = 0; i < tpfa.length; i++) tpfa[i] = 32 * Math.random();
var pfd;
testing && (pfd = document.createElement("div"), pfd.style.position = "fixed", pfd.style.left = "4px", pfd.style.bottom = "69px", pfd.style.width = "170px", pfd.style.height = "364px", pfd.style.background = "rgba(0, 0, 0, .8)", pfd.style.color = "#80FF80", pfd.style.fontFamily = "Verdana", pfd.style.zIndex = 999999, pfd.style.fontSize = "11px", pfd.style.padding = "10px", pfd.style.borderRadius = "30px", pfd.textContent = "ayy lmao", document.body.appendChild(pfd));

function resetGame() {
  ws && (ws.close(), ws = null);
  snake = null;
  want_close_socket = !1;
  snakes = [];
  foods = [];
  foods_c = 0;
  preys = [];
  sectors = [];
  os = {};
  rank = 0;
  best_rank = 999999999;
  biggest_snake_count = snake_count = 0;
  lagging = wfpr = playing = connected = !1;
  for (j = vfc - 1; 0 <= j; j--) fvxs[j] = 0, fvys[j] = 0;
  fvy = fvx = fvtg = 0;
  lag_mult = 1;
  cptm = 0;
  gsc = sgsc
}
var protocol_version = 2,
  connecting = !1,
  start_connect_mtm, play_btn_click_mtm = -1,
  waiting_for_sos = !1,
  sos_ready_after_mtm = -1;

function connect() {
  if (0 == sos.length) waiting_for_sos || (waiting_for_sos = !0, sos_ready_after_mtm = -1);
  else {
    waiting_for_sos = !1;
    sos_ready_after_mtm = -1;
    resetGame();
    connecting = !0;
    start_connect_mtm = Date.now();
    if (!forcing) {
      for (var b = 0; b < sos.length; b++) sos[b].ptm = 9999999;
      for (b = clus.length - 1; 0 <= b; b--) {
        var h = clus[b];
        if (h && 0 < h.ptms.length) {
          for (var c = 0, f = h.ptms.length - 1; 0 <= f; f--) c += h.ptms[f];
          c /= h.ptms.length;
          testing && console.log("cluster " + b + " ping time: " + c);
          for (f = sos.length - 1; 0 <= f; f--) sos[f].clu == b && (sos[f].ptm =
            c)
        }
      }
      if ("undefined" != typeof rmsos)
        for (b = 0; b < rmsos.length; b++)
          for (h = "." + rmsos[b].a[0] + "." + rmsos[b].a[1] + "." + rmsos[b].a[2], c = rmsos[b].a[3], f = sos.length - 1; 0 <= f; f--) 0 <= sos[f].ip.indexOf(h) && sos[f].po == c && sos.splice(f, 1);
      sos.sort(function(b, c) {
        return parseFloat(b.po) - parseFloat(c.po)
      });
      bso = sos[Math.floor(Math.random() * sos.length)];
      for (b = sos.length - 1; 0 <= b; b--) sos[b].tainted || sos[b].ptm <= bso.ptm && 30 < sos[b].ac && (bso = sos[b])
    }
    ws = new WebSocket("ws://" + bso.ip + ":" + bso.po + "/slither");
    ws.binaryType = "arraybuffer";
    window.ws = ws;
    ws.onmessage = function(b) {
      if (ws == this && (b = new Uint8Array(b.data), rdps += b.length, 2 <= b.length)) {
        lptm = cptm;
        cptm = Date.now();
        var c = b[0] << 8 | b[1],
          e = cptm - lptm;
        0 == lptm && (e = 0);
        etm += e - c;
        testing && (rdpspc[b[2]] += b.length);
        var f = String.fromCharCode(b[2]),
          c = 3,
          h = b.length,
          e = b.length - 2,
          t = b.length - 3;
        if ("a" == f) connecting = !1, playing = connected = !0, play_btn_click_mtm = -1, grd = b[c] << 16 | b[c + 1] << 8 | b[c + 2], c += 3, e = b[c] << 8 | b[c + 1], c += 2, sector_size = b[c] << 8 | b[c + 1], c += 2, sector_count_along_edge = b[c] << 8 | b[c + 1], c += 2, spangdv =
          b[c] / 10, c++, nsp1 = (b[c] << 8 | b[c + 1]) / 100, c += 2, nsp2 = (b[c] << 8 | b[c + 1]) / 100, c += 2, nsp3 = (b[c] << 8 | b[c + 1]) / 100, c += 2, mamu = (b[c] << 8 | b[c + 1]) / 1E3, c += 2, mamu2 = (b[c] << 8 | b[c + 1]) / 1E3, c += 2, cst = (b[c] << 8 | b[c + 1]) / 1E3, c += 2, c < h && (protocol_version = b[c]), setMscps(e), lbh.style.display = "inline", lbs.style.display = "inline", lbn.style.display = "inline", lbp.style.display = "inline", lbf.style.display = "inline", vcm.style.display = "inline", loch.style.display = "inline", startShowGame();
        else if ("e" == f || "E" == f || "3" == f || "4" == f || "5" == f) {
          var x = b[c] <<
            8 | b[c + 1],
            c = c + 2,
            D = h = -1,
            y = -1,
            B = -1;
          if (6 <= protocol_version) 6 == e ? (h = "e" == f ? 1 : 2, D = 2 * b[c] * Math.PI / 256, c++, y = 2 * b[c] * Math.PI / 256, c++, B = b[c] / 18) : 5 == e ? "e" == f ? (D = 2 * b[c] * Math.PI / 256, c++, B = b[c] / 18) : "E" == f ? (h = 1, y = 2 * b[c] * Math.PI / 256, c++, B = b[c] / 18) : "4" == f ? (h = 2, y = 2 * b[c] * Math.PI / 256, c++, B = b[c] / 18) : "3" == f ? (h = 1, D = 2 * b[c] * Math.PI / 256, c++, y = 2 * b[c] * Math.PI / 256) : "5" == f && (h = 2, D = 2 * b[c] * Math.PI / 256, c++, y = 2 * b[c] * Math.PI / 256) : 4 == e && ("e" == f ? D = 2 * b[c] * Math.PI / 256 : "E" == f ? (h = 1, y = 2 * b[c] * Math.PI / 256) : "4" == f ? (h = 2, y = 2 * b[c] * Math.PI / 256) :
            "3" == f && (B = b[c] / 18));
          else if (3 <= protocol_version) {
            "3" != f && (8 == e || 7 == e || 6 == e && "3" != f || 5 == e && "3" != f) && (h = "e" == f ? 1 : 2);
            if (8 == e || 7 == e || 5 == e && "3" == f || 6 == e && "3" == f) D = 2 * (b[c] << 8 | b[c + 1]) * Math.PI / 65535, c += 2;
            if (8 == e || 7 == e || 5 == e && "3" != f || 6 == e && "3" != f) y = 2 * (b[c] << 8 | b[c + 1]) * Math.PI / 65535, c += 2;
            if (8 == e || 6 == e || 4 == e) B = b[c] / 18
          } else {
            if (11 == t || 8 == t || 9 == t || 6 == t) h = b[c] - 48, c++;
            if (11 == t || 7 == t || 9 == t || 5 == t) D = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3;
            if (11 == t || 8 == t || 9 == t || 6 == t) y = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI /
              16777215, c += 3;
            if (11 == t || 7 == t || 8 == t || 4 == t) B = (b[c] << 8 | b[c + 1]) / 1E3
          }
          var q = os["s" + x];
          if (q) {
            -1 != h && (q.dir = h);
            anguc++;
            if (-1 != D) {
              q.ang == D && angnuc++;
              b = (D - q.ang) % pi2;
              0 > b && (b += pi2);
              b > Math.PI && (b -= pi2);
              x = q.fapos;
              for (t = 0; t < afc; t++) q.fas[x] -= b * afas[t], x++, x >= afc && (x = 0);
              q.fatg = afc;
              q.ang = D
            } - 1 != y && (q.wang == y && wangnuc++, q.wang = y, q != snake && (q.eang = y)); - 1 != B && (q.sp = B, q.spang = q.sp / spangdv, 1 < q.spang && (q.spang = 1))
          }
        } else if ("h" == f) {
          var x = b[c] << 8 | b[c + 1],
            c = c + 2,
            I = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 16777215;
          if (q = os["s" + x]) q.fam = I,
            snl(q)
        } else if ("r" == f) {
          if (x = b[c] << 8 | b[c + 1], c += 2, q = os["s" + x]) {
            4 <= t && (q.fam = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 16777215);
            for (t = 0; t < q.pts.length; t++)
              if (!q.pts[t].dying) {
                q.pts[t].dying = !0;
                q.sct--;
                q.sc = Math.min(6, 1 + (q.sct - 2) / 106);
                q.scang = .13 + .87 * Math.pow((7 - q.sc) / 6, 2);
                q.ssp = nsp1 + nsp2 * q.sc;
                q.fsp = q.ssp + .1;
                q.wsep = 6 * q.sc;
                b = nsep / gsc;
                q.wsep < b && (q.wsep = b);
                break
              }
            snl(q)
          }
        } else if ("g" == f || "n" == f || "G" == f || "N" == f) {
          if (playing && (I = "n" == f || "N" == f, x = b[c] << 8 | b[c + 1], c += 2, q = os["s" + x])) {
            if (I) q.sct++;
            else
              for (t = 0; t < q.pts.length; t++)
                if (!q.pts[t].dying) {
                  q.pts[t].dying = !0;
                  break
                } var A = q.pts[q.pts.length - 1],
              t = A,
              h = !1;
            3 <= protocol_version ? "g" == f || "n" == f ? (e = b[c] << 8 | b[c + 1], c += 2, C = b[c] << 8 | b[c + 1], c += 2) : (e = t.xx + b[c] - 128, c++, C = t.yy + b[c] - 128, c++) : (e = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5, c += 3, C = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5, c += 3);
            I && (q.fam = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 16777215);
            (A = points_dp.get()) || (A = {
              exs: [],
              eys: [],
              efs: [],
              ems: []
            });
            A.eiu = 0;
            A.xx = e;
            A.yy = C;
            A.fx = 0;
            A.fy = 0;
            A.da = 0;
            A.ebx = A.xx - t.xx;
            A.eby = A.yy - t.yy;
            q.pts.push(A);
            h = !0;
            q.iiv && (b = q.xx + q.fx - A.xx, c = q.yy + q.fy - A.yy, A.fx += b, A.fy += c, A.exs[A.eiu] =
              b, A.eys[A.eiu] = c, A.efs[A.eiu] = 0, A.ems[A.eiu] = 1, A.eiu++);
            x = q.pts.length - 3;
            if (1 <= x)
              for (D = q.pts[x], f = n = 0, t = x - 1; 0 <= t; t--) x = q.pts[t], n++, b = x.xx, c = x.yy, 4 >= n && (f = cst * n / 4), x.xx += (D.xx - x.xx) * f, x.yy += (D.yy - x.yy) * f, q.iiv && (b -= x.xx, c -= x.yy, x.fx += b, x.fy += c, x.exs[x.eiu] = b, x.eys[x.eiu] = c, x.efs[x.eiu] = 0, x.ems[x.eiu] = 2, x.eiu++), D = x;
            q.sc = Math.min(6, 1 + (q.sct - 2) / 106);
            q.scang = .13 + .87 * Math.pow((7 - q.sc) / 6, 2);
            q.ssp = nsp1 + nsp2 * q.sc;
            q.fsp = q.ssp + .1;
            q.wsep = 6 * q.sc;
            b = nsep / gsc;
            q.wsep < b && (q.wsep = b);
            I && snl(q);
            q.lnp = A;
            q == snake && (ovxx =
              snake.xx + snake.fx, ovyy = snake.yy + snake.fy);
            A = etm / 8 * q.sp / 4;
            A *= lag_mult;
            t = q.chl - 1;
            q.chl = A / q.msl;
            f = q.xx;
            x = q.yy;
            q.xx = e + Math.cos(q.ang) * A;
            q.yy = C + Math.sin(q.ang) * A;
            b = q.xx - f;
            c = q.yy - x;
            e = q.chl - t;
            x = q.fpos;
            for (t = 0; t < rfc; t++) q.fxs[x] -= b * rfas[t], q.fys[x] -= c * rfas[t], q.fchls[x] -= e * rfas[t], x++, x >= rfc && (x = 0);
            q.fx = q.fxs[q.fpos];
            q.fy = q.fys[q.fpos];
            q.fchl = q.fchls[q.fpos];
            q.ftg = rfc;
            h && (q.ehl = 0);
            if (q == snake) {
              view_xx = snake.xx + snake.fx;
              view_yy = snake.yy + snake.fy;
              b = view_xx - ovxx;
              c = view_yy - ovyy;
              x = fvpos;
              for (t = 0; t < vfc; t++) fvxs[x] -=
                b * vfas[t], fvys[x] -= c * vfas[t], x++, x >= vfc && (x = 0);
              fvtg = vfc
            }
          }
        } else if ("l" == f) {
          if (playing) {
            wumsts = !0;
            D = A = C = "";
            B = y = 0; - 1 == lb_fr && -1 == dead_mtm && (lb_fr = 0);
            var L = b[c];
            c++;
            rank = b[c] << 8 | b[c + 1];
            rank < best_rank && (best_rank = rank);
            c += 2;
            snake_count = b[c] << 8 | b[c + 1];
            snake_count > biggest_snake_count && (biggest_snake_count = snake_count);
            for (c += 2; c < h;) {
              var J = b[c] << 8 | b[c + 1],
                c = c + 2,
                I = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 16777215,
                c = c + 3,
                q = b[c] % 9;
              c++;
              e = b[c];
              c++;
              B++;
              f = "";
              for (t = 0; t < e; t++) x = b[c], f += String.fromCharCode(x), c++;
              B != L && (gdnm(f) ||
                (f = ""));
              for (var H = "", t = 0; t < e; t++) x = f.charCodeAt(t), H = 38 == x ? H + "&amp;" : 60 == x ? H + "&lt;" : 62 == x ? H + "&gt;" : 32 == x ? H + "&nbsp;" : H + String.fromCharCode(x);
              f = H;
              y++;
              score = Math.floor(150 * (fpsls[J] + I / fmlts[J] - 1) - 50) / 10;
              x = B == L ? 1 : .7 * (.3 + .7 * (1 - y / 10));
              C += '<span style="opacity:' + x + "; color:" + per_color_imgs[q].cs + ';">' + score + "</span><BR>";
              A += '<span style="opacity:' + x + "; color:" + per_color_imgs[q].cs + ";" + (B == L ? "font-weight:bold;" : "") + '">' + f + "</span><BR>";
              D += '<span style="opacity:' + x + "; color:" + per_color_imgs[q].cs + ';">#' +
                y + "</span><BR>"
            }
            lbs.innerHTML = C;
            lbn.innerHTML = A;
            lbp.innerHTML = D
          }
        } else if ("v" == f) 2 == b[c] ? (want_close_socket = !0, want_victory_message = !1, want_hide_victory = 1, hvfr = 0) : (dead_mtm = Date.now(), play_btn.setEnabled(!0), e = Math.floor(150 * (fpsls[snake.sct] + snake.fam / fmlts[snake.sct] - 1) - 50) / 10, twt.href = "http://twitter.com/intent/tweet?status=" + encodeURIComponent("I got a length of " + e + " in http://slither.io! Can you beat that? #slitherio"), C = "Your final length was", "DE" == country ? C = "Deine endg\u00fcltige L\u00e4nge war" :
          "FR" == country ? C = "Votre longueur finale \u00e9tait de" : "BR" == country && (C = "Seu comprimento final foi de"), h = "", 1E3 < e && (h = "!"), lastscore.innerHTML = '<span style="opacity: .45;">' + C + " </span><b>" + e + "</b>" + h, e = "Play Again", "FR" == country ? e = "Jouer" : "BR" == country && (e = "Joga"), play_btn.setText(String.fromCharCode(160) + e + String.fromCharCode(160)), 1 == b[c] ? (nick_holder.style.display = "none", playh.style.display = "none", smh.style.display = "none", victory_holder.style.display = "inline", saveh.style.display = "block", want_victory_focus =
            want_victory_message = !0, victory.disabled = !1, save_btn.setEnabled(!0)) : want_close_socket = !0);
        else if ("w" == f)
          if (h = b[c], c++, e = b[c] << 8 | b[c + 1], c += 2, C = b[c] << 8 | b[c + 1], 1 == h) q = {}, q.xx = e, q.yy = C, sectors.push(q);
          else {
            for (A = cm1 = foods_c - 1; 0 <= A; A--) t = foods[A], t.sx == e && t.sy == C && (A == cm1 ? foods[A] = null : (foods[A] = foods[cm1], foods[cm1] = null), foods_c--, cm1--);
            for (A = sectors.length - 1; 0 <= A; A--) q = sectors[A], q.xx == e && q.yy == C && sectors.splice(A, 1)
          }
        else if ("m" == f) {
          J = b[c] << 16 | b[c + 1] << 8 | b[c + 2];
          c += 3;
          I = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) /
            16777215;
          c += 3;
          C = Math.floor(150 * (fpsls[J] + I / fmlts[J] - 1) - 50) / 10;
          e = b[c];
          c++;
          t = "";
          for (A = 0; A < e; A++) t += String.fromCharCode(b[c]), c++;
          for (e = ""; c < h;) e += String.fromCharCode(b[c]), c++;
          t = t.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
          e = e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
          0 < C && (b = "", 0 < e.length && (b += "<span style='font-size:17px;'><b><i><span style='opacity: .5;'>&quot;</span>" + e + "<span style='opacity: .5;'>&quot;</span></i></b></span><BR><div style='height: 5px;'></div>"),
            0 < t.length ? (b = 0 < e.length ? b + ("<i><span style='opacity: .5;'>- </span><span style='opacity: .75;'><b>" + t + "</b></span><span style='opacity: .5;'>, today's longest</span></i>") : "<i><span style='opacity: .5;'>Today's longest was </span><span style='opacity: .75;'><b>" + t + "</b></span></i>", b += "<br><i><span style='opacity: .5;'>with a length of </span><span style='opacity: .65;'><b>" + C + "</b></span></i>") : b = 0 < e.length ? b + "<i><span style='opacity: .5;'>- </span><span style='opacity: .5;'>today's longest</span></i>" +
            ("<br><i><span style='opacity: .5;'>with a length of </span><span style='opacity: .65;'><b>" + C + "</b></span></i>") : b + ("<i><span style='opacity: .5;'>Today's longest: </span><span style='opacity: .75;'><b>" + C + "</b></span></i>"), vcm.innerHTML = b)
        } else if ("p" == f) wfpr = !1, lagging && (etm *= lag_mult, lagging = !1);
        else if ("u" == f) {
          t = asmc.getContext("2d");
          t.clearRect(0, 0, 80, 80);
          t.fillStyle = "#FFFFFF";
          for (var C = e = 0; c < h && !(80 <= C);)
            if (x = b[c++], 128 <= x)
              for (x -= 128, A = 0; A < x && !(e++, 80 <= e && (e = 0, C++, 80 <= C)); A++);
            else
              for (A =
                0; 7 > A && !(0 < (x & u_m[A]) && t.fillRect(e, C, 1, 1), e++, 80 <= e && (e = 0, C++, 80 <= C)); A++);
        } else if ("s" == f) {
          if (playing)
            if (x = b[c] << 8 | b[c + 1], c += 2, 6 < t) {
              D = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215;
              c += 3;
              c++;
              y = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215;
              c += 3;
              B = (b[c] << 8 | b[c + 1]) / 1E3;
              c += 2;
              I = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 16777215;
              c += 3;
              q = b[c];
              c++;
              L = [];
              J = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5;
              c += 3;
              H = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5;
              c += 3;
              e = b[c];
              c++;
              f = "";
              for (t = 0; t < e; t++) f += String.fromCharCode(b[c]), c++;
              for (var M = t = C = e = 0, O = !1; c < h;) t =
                e, M = C, O ? (e += (b[c] - 127) / 2, c++, C += (b[c] - 127) / 2, c++) : (e = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5, c += 3, C = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5, c += 3, t = e, M = C, O = !0), (A = points_dp.get()) || (A = {
                  exs: [],
                  eys: [],
                  efs: [],
                  ems: []
                }), A.eiu = 0, A.xx = e, A.yy = C, A.fx = 0, A.fy = 0, A.da = 0, A.ebx = e - t, A.eby = C - M, L.push(A);
              q = newSnake(x, J, H, q, D, L);
              null == snake ? (view_xx = e, view_yy = C, snake = q, q.nk = my_nick) : (q.nk = f, gdnm(f) || (q.nk = ""));
              q.eang = q.wang = y;
              q.sp = B;
              q.spang = q.sp / spangdv;
              1 < q.spang && (q.spang = 1);
              q.fam = I;
              q.sc = Math.min(6, 1 + (q.sct - 2) / 106);
              q.scang = .13 + .87 * Math.pow((7 -
                q.sc) / 6, 2);
              q.ssp = nsp1 + nsp2 * q.sc;
              q.fsp = q.ssp + .1;
              q.wsep = 6 * q.sc;
              b = nsep / gsc;
              q.wsep < b && (q.wsep = b);
              q.sep = q.wsep;
              snl(q)
            } else
              for (b = 1 == b[c], A = snakes.length - 1; 0 <= A; A--)
                if (snakes[A].id == x) {
                  snakes[A].id = -1234;
                  b ? (snakes[A].dead = !0, snakes[A].dead_amt = 0, snakes[A].edir = 0) : snakes.splice(A, 1);
                  delete os["s" + x];
                  break
                }
        } else if ("F" == f)
          if (4 <= protocol_version) {
            for (f = !1; c < h;) q = b[c], c++, e = b[c] << 8 | b[c + 1], c += 2, C = b[c] << 8 | b[c + 1], c += 2, t = b[c] / 5, c++, x = C * grd * 3 + e, t = newFood(x, e, C, t, !0, q), f || (f = !0, A = Math.floor(e / sector_size), I = Math.floor(C /
              sector_size)), t.sx = A, t.sy = I;
            q = {};
            q.xx = A;
            q.yy = I;
            sectors.push(q)
          } else
            for (A = b[c] << 8 | b[c + 1], c += 2, I = b[c] << 8 | b[c + 1], c += 2, q = {}, q.xx = A, q.yy = I, sectors.push(q); c < h;) x = b[c] << 16 | b[c + 1] << 8 | b[c + 2], c += 3, q = b[c], c++, e = sector_size * (A + b[c] / 255), c++, C = sector_size * (I + b[c] / 255), c++, t = b[c] / 5, c++, t = newFood(x, e, C, t, !0, q), t.sx = A, t.sy = I;
        else if ("b" == f || "f" == f) 4 <= protocol_version ? (q = b[c], c++, 4 < t && (e = b[c] << 8 | b[c + 1], c += 2, C = b[c] << 8 | b[c + 1], x = C * grd * 3 + e, t = b[c + 2] / 5, t = newFood(x, e, C, t, "b" == f, q), t.sx = Math.floor(e / sector_size), t.sy = Math.floor(C /
          sector_size))) : (x = b[c] << 16 | b[c + 1] << 8 | b[c + 2], c += 3, 4 < t && (q = b[c], c++, A = b[c] << 8 | b[c + 1], c += 2, I = b[c] << 8 | b[c + 1], c += 2, e = sector_size * (A + b[c] / 255), c++, C = sector_size * (I + b[c] / 255), c++, t = b[c] / 5, t = newFood(x, e, C, t, "b" == f, q), t.sx = A, t.sy = I));
        else if ("c" == f) {
          4 <= protocol_version ? (e = b[c] << 8 | b[c + 1], c += 2, C = b[c] << 8 | b[c + 1], c += 2, x = C * grd * 3 + e) : (x = b[c] << 16 | b[c + 1] << 8 | b[c + 2], c += 3);
          for (A = cm1 = foods_c - 1; 0 <= A; A--)
            if (t = foods[A], t.id == x) {
              t.eaten = !0;
              c + 2 <= h ? (b = b[c] << 8 | b[c + 1], t.eaten_by = os["s" + b], t.eaten_fr = 0) : (A == cm1 ? foods[A] = null : (foods[A] =
                foods[cm1], foods[cm1] = null), foods_c--, cm1--);
              x = -1;
              break
            } - 1 != x && console.log("wtf")
        } else if ("j" == f) {
          x = b[c] << 8 | b[c + 1];
          c += 2;
          e = 1 + 3 * (b[c] << 8 | b[c + 1]);
          c += 2;
          C = 1 + 3 * (b[c] << 8 | b[c + 1]);
          c += 2;
          h = null;
          for (A = preys.length - 1; 0 <= A; A--)
            if (preys[A].id == x) {
              h = preys[A];
              break
            }
          if (h) {
            A = etm / 8 * h.sp / 4;
            A *= lag_mult;
            f = h.xx;
            x = h.yy;
            15 == t ? (h.dir = b[c] - 48, c++, h.ang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3, h.wang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3, h.sp = (b[c] << 8 | b[c + 1]) / 1E3) : 11 == t ? (h.ang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c +
              2]) * Math.PI / 16777215, c += 3, h.sp = (b[c] << 8 | b[c + 1]) / 1E3) : 12 == t ? (h.dir = b[c] - 48, c++, h.wang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3, h.sp = (b[c] << 8 | b[c + 1]) / 1E3) : 13 == t ? (h.dir = b[c] - 48, c++, h.ang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3, h.wang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215) : 9 == t ? h.ang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215 : 10 == t ? (h.dir = b[c] - 48, c++, h.wang = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215) : 8 == t && (h.sp = (b[c] << 8 | b[c + 1]) / 1E3);
            h.xx = e + Math.cos(h.ang) * A;
            h.yy =
              C + Math.sin(h.ang) * A;
            b = h.xx - f;
            c = h.yy - x;
            x = h.fpos;
            for (t = 0; t < rfc; t++) h.fxs[x] -= b * rfas[t], h.fys[x] -= c * rfas[t], x++, x >= rfc && (x = 0);
            h.fx = h.fxs[h.fpos];
            h.fy = h.fys[h.fpos];
            h.ftg = rfc
          }
        } else if ("y" == f)
          if (x = b[c] << 8 | b[c + 1], c += 2, 2 == t)
            for (A = preys.length - 1; 0 <= A; A--) {
              if (h = preys[A], h.id == x) {
                preys.splice(A, 1);
                break
              }
            } else if (4 == t)
              for (b = b[c] << 8 | b[c + 1], A = preys.length - 1; 0 <= A; A--) {
                if (h = preys[A], h.id == x) {
                  h.eaten = !0;
                  h.eaten_by = os["s" + b];
                  h.eaten_by ? h.eaten_fr = 0 : preys.splice(A, 1);
                  break
                }
              } else q = b[c], c++, e = (b[c] << 16 | b[c + 1] << 8 | b[c +
                2]) / 5, c += 3, C = (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) / 5, c += 3, t = b[c] / 5, c++, h = b[c] - 48, c++, y = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3, D = 2 * (b[c] << 16 | b[c + 1] << 8 | b[c + 2]) * Math.PI / 16777215, c += 3, B = (b[c] << 8 | b[c + 1]) / 1E3, newPrey(x, e, C, t, q, h, y, D, B)
      }
    };
    ws.onerror = function(b) {};
    ws.onclose = function(b) {
      ws == this && (playing = connected = !1)
    };
    ws.onopen = function(b) {
      if (ws == this) {
        b = asciize(nick.value);
        24 < b.length && (b = b.substr(0, 24));
        my_nick = b;
        var c = Math.floor(9 * Math.random());
        try {
          var e = localStorage.snakercv;
          e == "" + Number(e) && (c =
            Number(e))
        } catch (f) {}
        e = new Uint8Array(3 + b.length);
        e[0] = 115;
        e[1] = 5;
        e[2] = c;
        for (c = 0; c < b.length; c++) e[c + 3] = b.charCodeAt(c);
        ws.send(e);
        high_quality = !0;
        gla = 1;
        wdfg = 0;
        qsm = 1;
        0 == want_quality && (high_quality = !1, gla = 0, qsm = 1.7);
        1 == render_mode && (high_quality = !1, gla = 0);
        lpstm = Date.now()
      }
    }
  }
}

function asciize(b) {
  var h, c, f;
  c = b.length;
  var w = !1;
  for (h = 0; h < c; h++)
    if (f = b.charCodeAt(h), 32 > f || 127 < f) {
      w = !0;
      break
    }
  if (w) {
    w = "";
    for (h = 0; h < c; h++) f = b.charCodeAt(h), w = 32 > f || 127 < f ? w + " " : w + String.fromCharCode(f);
    return w
  }
  return b
}
var smh = document.getElementById("smh"),
  cstx = document.getElementById("cstx");
cstx.src = "FR" == country ? "/s/customskins-fr.png" : "BR" == country ? "/s/customskins-br.png" : "/s/customskins2.png";
try {
  "1" != localStorage.edttsg && (cstx.style.display = "inline")
} catch (b) {}
var fb = document.getElementById("fb");
fb.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://slither.io");
fb.onclick = function() {
  localStorage.edttsg = "1"
};
var fbh = document.getElementById("fbh"),
  twt = document.getElementById("twt");
twt.onclick = function() {
  localStorage.edttsg = "1"
};
twt.href = "http://twitter.com/intent/tweet?status=" + encodeURIComponent("Come and play http://slither.io #slitherio");
var twth = document.getElementById("twth"),
  csk = document.getElementById("csk"),
  cskh = document.getElementById("cskh"),
  want_quality = 1,
  grq = document.getElementById("grq"),
  grqh = document.getElementById("grqh"),
  phqi = document.createElement("img"),
  grqi = document.getElementById("grqi");
try {
  "0" == localStorage.qual ? (grqi.src = "/s/lowquality.png", want_quality = 0) : (phqi.src = "/s/lowquality.png", want_quality = 1)
} catch (b) {}
grq.onclick = function() {
  try {
    "0" == localStorage.qual ? (localStorage.qual = "1", grqi.src = "/s/highquality.png", want_quality = 1) : (localStorage.qual = "0", grqi.src = "/s/lowquality.png", want_quality = 0)
  } catch (b) {}
  return !1
};
var plq = document.getElementById("plq"),
  clq = document.getElementById("clq");
try {
  "1" == localStorage.edttsg && (cskh.style.display = "inline")
} catch (b) {}
var psk = document.getElementById("psk"),
  pskh = document.getElementById("pskh"),
  nsk = document.getElementById("nsk"),
  nskh = document.getElementById("nskh"),
  choosing_skin = !1;
psk.onclick = function() {
  if (playing && null != snake) {
    var b = snake.rcv;
    b--;
    0 > b && (b = max_skin_cv);
    setSkin(snake, b)
  }
  return !1
};
nsk.onclick = function() {
  if (playing && null != snake) {
    var b = snake.rcv;
    b++;
    b > max_skin_cv && (b = 0);
    setSkin(snake, b)
  }
  return !1
};
csk.onclick = function() {
  if (!playing && -1 == dead_mtm) {
    resetGame();
    choosing_skin = !0;
    pskh.style.opacity = 0;
    nskh.style.opacity = 0;
    skodiv.style.opacity = 0;
    pskh.style.display = "inline";
    nskh.style.display = "inline";
    skodiv.style.display = "inline";
    skodiv.style.left = Math.round(ww / 2 - skodiv.offsetWidth / 2) + "px";
    nick.disabled = !0;
    0 == mscps && setMscps(300);
    gsc = sgsc;
    for (var b = [], h = 22; 1 <= h; h--) b.push({
      xx: grd / 2 - 10 * h,
      yy: grd / 2,
      fx: 0,
      fy: 0,
      exs: [],
      eys: [],
      efs: [],
      ems: [],
      eiu: 0,
      fpos: 0,
      da: 0,
      ebx: 10,
      eby: 0
    });
    h = 0;
    try {
      var c = localStorage.snakercv;
      c == "" + Number(c) && (h = Number(c))
    } catch (f) {}
    b = newSnake(1, grd / 2, grd / 2, h, 0, b);
    view_xx = grd / 2 - 105;
    view_yy = grd / 2;
    snake = b;
    b.nk = "";
    b.eang = b.wang = b.ang;
    b.sp = 4.8;
    b.spang = b.sp / spangdv;
    1 < b.spang && (b.spang = 1);
    b.sc = 1;
    b.scang = 1;
    b.ssp = nsp1 + nsp2 * b.sc;
    b.fsp = b.ssp + .1;
    b.wsep = 6 * b.sc;
    c = nsep / gsc;
    b.wsep < c && (b.wsep = c);
    b.sep = b.wsep;
    snl(b);
    b.alive_amt = 1;
    b.rex = 1.66;
    ws = {
      send: function(b) {},
      close: function() {}
    };
    high_quality = playing = connected = !0;
    gla = 1;
    wdfg = 0;
    qsm = 1;
    startShowGame();
    lbh.style.display = "none";
    lbs.style.display = "none";
    lbn.style.display =
      "none";
    lbp.style.display = "none";
    lbf.style.display = "none";
    vcm.style.display = "none";
    loch.style.display = "none"
  }
  return !1
};
nick.oninput = function() {
  var b = this.value,
    h = asciize(b);
  24 < h.length && (h = h.substr(0, 24));
  b != h && (this.value = h)
};
victory.oninput = function() {
  var b = this.value,
    h = asciize(b);
  140 < h.length && (h = h.substr(0, 140));
  b != h && (this.value = h)
};
nick.focus();
var lmch = document.createElement("div");
lmch.style.width = "450px";
lmch.style.height = "115px";
var lmc2 = document.createElement("canvas"),
  lmc = document.createElement("canvas"),
  lgsc = 1,
  lw = 900,
  lh = 270;
lmc.width = lmc2.width = lw;
lmc.height = lmc2.height = lh;
var lctx = lmc.getContext("2d"),
  lctx2 = lmc2.getContext("2d");
trf(lmc2, "scale(.5, .5)");
trfo(lmc2, "0% 0%");
lmch.appendChild(lmc2);
logo.appendChild(lmch);
var lts = [];
lts.push({
  pts: [107, 107, 80, 83, 53, 98, 31, 115, 55, 131, 98, 147, 101, 162, 101, 190, 66, 188, 49, 187, 34, 173],
  kc: 22,
  ws: 4,
  wr: .025,
  qm: .025,
  sp: .06,
  sz: 11
}, {
  pts: [150, 30, 150, 107, 150, 184],
  kc: 66,
  ws: 4,
  wr: .05,
  qm: .025,
  sp: .06,
  sz: 11
}, {
  pts: [207, 96, 207, 140, 207, 184],
  kc: 46,
  ws: 4,
  wr: .03,
  qm: .035,
  sp: .06,
  sz: 11
}, {
  pts: [207, 47, 207, 48.5, 207, 50],
  kc: 11,
  ws: 2,
  wr: .06,
  qm: .05,
  sp: .06,
  sz: 15,
  r: .5
}, {
  pts: [267, 65, 267, 114.5, 267, 164, 267, 194, 297, 186],
  kc: 66,
  ws: 6,
  wr: -.025,
  qm: -.0125,
  sp: .06,
  sz: 11,
  r: 1.5
}, {
  pts: [243, 94, 268, 94, 293, 94],
  kc: 66,
  ws: 4,
  wr: .015,
  qm: .025,
  sp: .06,
  sz: 9,
  r: 1.2
}, {
  pts: [338, 30, 338, 68.5, 338, 107, 338, 145.5, 338, 184, 338, 164, 338, 144, 338, 104, 378, 104, 418, 104, 418, 144, 418, 164, 418, 184],
  kc: 46,
  ws: 4,
  wr: .005,
  qm: .02,
  sp: .06,
  sz: 11,
  r: 2.1
}, {
  pts: [535, 175, 500, 201, 472, 175, 442, 138, 472, 105, 502, 84, 532, 105, 546, 118, 544, 139, 504, 139, 464, 139],
  kc: 35,
  ws: 6,
  wr: -.013,
  qm: -.025,
  sp: .06,
  sz: 11,
  r: 1.3
}, {
  pts: [591, 96, 591, 140, 591, 184, 591, 155, 591, 126, 613, 82, 652, 109],
  kc: 38,
  ws: 4,
  wr: .01,
  qm: -.035,
  sp: .06,
  sz: 11
}, {
  pts: [663, 177, 663, 178.5, 663, 180],
  kc: 11,
  ws: 2,
  wr: .06,
  qm: .05,
  sp: .06,
  sz: 15
}, {
  pts: [717,
    96, 717, 140, 717, 184
  ],
  kc: 33,
  ws: 4,
  wr: .06,
  qm: .05,
  sp: .06,
  sz: 11
}, {
  pts: [717, 47, 717, 48.5, 717, 50],
  kc: 11,
  ws: 2,
  wr: .06,
  qm: .05,
  sp: .06,
  sz: 15
}, {
  pts: [814, 186, 860, 188, 858, 136, 854, 96, 814, 96, 770, 96, 770, 136, 770, 186, 814, 186],
  kc: 43,
  ws: 4,
  wr: 0,
  qm: .0274,
  sp: .073,
  sz: 11,
  r: 1.5
});
for (i = 0; i < lts.length; i++) lts[i].mwig = 5;
var lga = 0,
  lgss = 0,
  ncka = 0,
  mwig = 4,
  lgfr = 0,
  lgtm = Date.now();

function showLogo(b) {
  var h = Date.now(),
    c = (h - lgtm) / 25;
  lgtm = h;
  var f, w, u, e, z, E, t, x, D, y, B, q, I, A, L;
  lgfr += c;
  if (0 == lts[lts.length - 1].mwig && 1 == lga && 1 == lgss && 1 == ncka) clearInterval(showlogo_iv), showlogo_iv = -1;
  else {
    if (b || 1 != lga) lga += .05 * c, 1 <= lga && (lga = 1), lmc2.style.opacity = lga;
    1 != lgss && (lgss += .00375 * c, 1 <= lgss && (lgss = 1));
    if (b || 1 != ncka) ncka += .006 * c, 1 <= ncka && (ncka = 1), nick_holder.style.opacity = Math.min(1, 6 * ncka), is_mobile || (smh.style.opacity = Math.max(0, Math.min(1, 5 * (ncka - .05)))), .01 <= ncka && (playh.style.opacity = Math.min(1,
      5 * (ncka - .01)));
    lctx.clearRect(0, 0, lw, lh);
    for (h = 0; h < lts.length; h++) {
      var J = lts[h],
        H = J.pts,
        C = J.kc,
        M = J.ws,
        O = J.wr,
        N = J.qm;
      f = J.sp;
      var K = J.sz;
      L = J.r;
      var F = J.mwig;
      b && (J.wch = !0, F = 1E-7);
      J.wch && 0 != F && (F *= .982, F -= .001 * c, 1 == render_mode && (F -= .005 * c), 0 >= F && (F = 0), J.mwig = F);
      L || (L = 1);
      lctx.beginPath();
      9 > h ? (u = ctx.createLinearGradient(0, 70 * lgsc, 0, 230 * lgsc), u.addColorStop(0, "#80FFA0"), u.addColorStop(1, "#008040")) : (u = ctx.createLinearGradient(0, 50 * lgsc, 0, 265 * lgsc), u.addColorStop(0, "#9850FF"), u.addColorStop(1, "#281060"));
      lctx.fillStyle =
        u;
      I = !1;
      A = 0;
      u = H[0];
      e = H[1];
      D = u;
      y = e;
      var G = lgfr * f;
      for (B = 2; B < H.length; B += 4) {
        f = u;
        w = e;
        cx2 = H[B];
        cy2 = H[B + 1];
        u = H[B + 2];
        e = H[B + 3];
        for (var Q = 1; Q <= C; Q++) {
          A++;
          var P = Q / C;
          z = f + (cx2 - f) * P;
          E = w + (cy2 - w) * P;
          t = cx2 + (u - cx2) * P;
          x = cy2 + (e - cy2) * P;
          z += (t - z) * P;
          E += (x - E) * P;
          D = Math.atan2(E - y, z - D);
          I ? (D - q > Math.PI ? D -= 2 * Math.PI : D - q < -Math.PI && (D += 2 * Math.PI), q += .05 * (D - q), q %= 2 * Math.PI) : (I = !0, q = D);
          D = z;
          y = E;
          z += Math.cos(Math.PI / 2 + q) * Math.sin(G) * M * F;
          E += Math.sin(Math.PI / 2 + q) * Math.sin(G) * M * F;
          G -= .76 * N * M;
          M += O;
          lctx.beginPath();
          x = 1.15 * K * Math.min(1, lgsc * (.2 +
            .8 * lga) * (30 * lgss * L - A / 20 - h / 2));
          .5 < x && (lctx.arc(z * lgsc, E * lgsc, x, 0, pi2), J.wch = !0);
          lctx.fill()
        }
      }
    }
    lctx2.clearRect(0, 0, lw, lh);
    lctx2.shadowColor = "#000000";
    lctx2.shadowBlur = 16;
    lctx2.shadowOffsetY = 7;
    lctx2.drawImage(lmc, 0, 0)
  }
}
var showlogo_iv = -1;
is_safari || is_mobile ? (ncka = lgss = lga = 1, showLogo(!0)) : showlogo_iv = setInterval("showLogo(false)", 25);
document.onkeydown = function(b) {
  b = b || window.event;
  var h = b.keyCode;
  if (37 == h) kd_l = !0;
  else if (39 == h) kd_r = !0;
  else if (38 == h || 32 == h) kd_u = !0, setAcceleration(1);
  else if (13 == h || 10 == h)
    if (want_victory_message) {
      if (0 < victory.value.length) save_btn.elem.onclick()
    } else {
      if (!connecting && !connected) play_btn.elem.onclick()
    }
  else 16 == h && testing && (shifty = !0);
  testing && console.log("keydown: " + b.keyCode)
};
document.onkeyup = function(b) {
  b = b || window.event;
  b = b.keyCode;
  37 == b ? kd_l = !1 : 39 == b ? kd_r = !1 : 38 == b || 32 == b ? (kd_u = !1, setAcceleration(0)) : 16 == b && testing && (shifty = !1)
};

function loadSos(b) {
  if (!forcing && 0 < b.length) {
    sos = [];
    clus = [];
    b.charAt(0);
    for (var h = 1, c = {}, f = 0, c = f = 0, w, u = 0, e = 0, z = [], E = [], t = [], x = []; h < b.length;)
      if (w = (b.charCodeAt(h++) - 97 - e) % 26, 0 > w && (w += 26), u *= 16, u += w, e += 7, 1 == c) {
        if (0 == f) z.push(u), 4 == z.length && f++;
        else if (1 == f) E.push(u), 3 == E.length && f++;
        else if (2 == f) t.push(u), 3 == t.length && f++;
        else if (3 == f && (x.push(u), 1 == x.length)) {
          c = {};
          for (f = w = 0; f < E.length; f++) w *= 256, w += E[f];
          for (f = E = 0; f < t.length; f++) E *= 256, E += t[f];
          c.ip = z.join(".");
          c.po = w;
          c.ac = E;
          c.clu = x[0];
          clus[c.clu] ?
            z = clus[c.clu] : (z = {}, clus[c.clu] = z, z.sis = [], z.ptms = []);
          c.cluo = z;
          sos.push(c);
          z = [];
          E = [];
          t = [];
          x = [];
          f = 0
        }
        c = u = 0
      } else c++;
    for (h = sos.length - 1; 0 <= h; h--)
      if (c = 1, z = sos[h].cluo) {
        for (f = z.sis.length - 1; 0 <= f; f--)
          if (z.sis[f].ip == sos[h].ip) {
            c = 0;
            break
          }
        1 == c && z.sis.push({
          ip: sos[h].ip
        })
      }
    for (h = clus.length - 1; 0 <= h; h--)
      if ((z = clus[h]) && 0 < z.sis.length) {
        f = Math.floor(Math.random() * z.sis.length);
        b = z.sis[f].ip;
        e = null;
        try {
          e = new WebSocket("ws://" + b + ":80/ptc")
        } catch (D) {
          e = null
        }
        e && (e.binaryType = "arraybuffer", e.onerror = function(b) {}, e.onmessage =
          function(b) {
            b = new Uint8Array(b.data);
            if (1 == b.length && 112 == b[0])
              for (b = clus.length - 1; 0 <= b; b--) {
                var c = clus[b];
                if (c && c.ps == this) {
                  var e = Date.now() - c.stm;
                  testing && console.log(" ping time for cluster " + b + ": " + e);
                  c.ptms.push(e);
                  4 > c.ptms.length ? (c.stm = Date.now(), b = new Uint8Array(1), b[0] = 112, this.send(b)) : (waiting_for_sos && -1 == sos_ready_after_mtm && (sos_ready_after_mtm = Date.now() + 2E3), this.close(), c.ps = null);
                  break
                }
              }
          }, e.onopen = function(b) {
            b = !1;
            for (var c = clus.length - 1; 0 <= c; c--) {
              var e = clus[c];
              if (e && e.ps == this) {
                e.stm =
                  Date.now();
                b = new Uint8Array(1);
                b[0] = 112;
                this.send(b);
                b = !0;
                break
              }
            }
            b || this.close()
          }, z.ps = e)
      }
  }
}
var mba = null,
  mbi = null;
if (is_ios || is_android) mba = document.createElement("a"), mbi = document.createElement("img"), mbi.border = 0, mbi.draggable = "false", mbi.className = "nsi", mbi.width = 1245, mbi.height = 260, mbi.style.position = "fixed", mbi.style.left = "0px", mbi.style.bottom = "0px", mbi.style.zIndex = 70, mbi.src = "/s/n2.jpg", mba.appendChild(mbi), document.body.appendChild(mba), is_ios ? mba.href = "https://itunes.apple.com/us/app/slither.io/id1091944550?ls=1&mt=8" : is_android && (mba.href = is_amazon ? "http://www.amazon.com/Lowtech-Enterprises-slither-io/dp/B01E312TYQ/" :
  "https://play.google.com/store/apps/details?id=air.com.hypah.io.slither");
resize();
o = {
  f: function(b, h, c) {
    "success" == h && loadSos(b)
  }
};
getData("/i49526.txt", o);
