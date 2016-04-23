// ==UserScript==
// @name         Slither.io-bot-launcher
// @namespace    http://slither.io/
// @version      0.0.4
// @description  Slither.io bot launcher
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
var testing = false;
if (0 <= window.location.href.indexOf("/testing")) {
  testing = true;
}
var forcing = false;
var ua = navigator.userAgent.toLowerCase();
var is_android = 0 <= ua.indexOf("android");
var is_amazon = 0 <= ua.indexOf("kindle") || 0 <= ua.indexOf("silk/");
var uua = navigator.userAgent;
var is_ios = 0 <= uua.indexOf("iPad") || (0 <= uua.indexOf("iPhone") || 0 <= uua.indexOf("iPod"));
var is_mobile = 0 <= ua.indexOf("mobile");
var is_firefox = -1 < ua.indexOf("firefox");
var is_ie8oo = window.attachEvent && !window.addEventListener;
var is_safari = is_firefox = false;
if (0 <= ua.indexOf("safari")) {
  if (-1 == ua.indexOf("chrome")) {
    is_safari = true;
  }
}
var no_raf = false;
var raf = function(el) {
};
if (window.requestAnimationFrame) {
  raf = window.requestAnimationFrame;
} else {
  if (window.mozRequestAnimationFrame) {
    raf = window.mozRequestAnimationFrame;
  } else {
    if (window.webkitRequestAnimationFrame) {
      raf = window.webkitRequestAnimationFrame;
    } else {
      no_raf = true;
    }
  }
}
if (!is_mobile) {
  no_raf = true;
}
no_raf = true;
var a;
var i;
var j;
var k;
var l;
var m;
var n;
var o;
var r;
var fj;
var d;
var d2;
var qq;
var sc;
var agpu = "translateZ(0)";
var ang;
var sang;
var vang;
function trf(el, val) {
  el.style.webkitTransform = el.style.OTransform = el.style.msTransform = el.style.MozTransform = el.style.transform = val;
}
function trfo(div, dataAndEvents) {
  div.style.webkitTransformOrigin = div.style.OTransformOrigin = div.style.msTransformOrigin = div.style.MozTransformOrigin = div.style.transformOrigin = dataAndEvents;
}
var pi2 = 2 * Math.PI;
var animating = false;
var startAnimation = function() {
  animating = true;
  if (no_raf) {
    if (is_mobile) {
      setInterval("oef()", 33);
    } else {
      if (is_safari) {
        setInterval("oef()", 33);
      } else {
        setInterval("oef()", 20);
      }
    }
  } else {
    raf(oef);
  }
};
var ois = [];
var wic = 0;
var ldi = function(blank) {
  wic++;
  var img = {};
  var photo = document.createElement("img");
  img.ii = photo;
  img.sc = 1;
  photo.onload = function() {
    var c = ois.length - 1;
    for (;0 <= c;c--) {
      if (ois[c].ii == this) {
        c = ois[c];
        c.ww = this.width;
        c.hh = this.height;
        c.loaded = true;
        if (c.onload) {
          c.onload();
        }
        break;
      }
    }
    wic--;
    if (0 == wic) {
      startAnimation();
    }
  };
  img.src = blank;
  ois.push(img);
  return img;
};
function addCss(css) {
  var s = document.createElement("style");
  document.getElementsByTagName("head")[0].appendChild(s);
  s.type = "text/css";
  if (s.styleSheet) {
    s.styleSheet.cssText = css;
  } else {
    s.appendChild(document.createTextNode(css));
  }
}
var nbg = document.getElementById("nbg");
var nzbg;
var sadg;
var sadu;
var sadd;
var p;
var xx;
var yy;
var grw;
var grh;
var elem;
var map;
var imgd;
var ctx;
elem = document.createElement("canvas");
var rw = 64;
var rh = 64;
elem.width = rw;
elem.height = rh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, rw, rh);
imgd = map.data;
l = imgd.length;
p = 0;
for (;p < l;p += 4) {
  if (0.5 > Math.random()) {
    imgd[p] = imgd[p + 1] = imgd[p + 2] = 0;
  } else {
    imgd[p] = 44;
    imgd[p + 1] = 56;
    imgd[p + 2] = 68;
  }
  imgd[p + 3] = Math.floor(32 * Math.random());
}
ctx.putImageData(map, 0, 0);
nzbg = elem.toDataURL();
if (32 < nzbg.length) {
  nbg.style.backgroundImage = "url(" + nzbg + ")";
}
grw = 2;
grh = 56;
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
yy = p = 0;
for (;yy < grh;yy++) {
  j = (grh - 1 - yy) / (grh - 1);
  j = 0.5 * (1 - Math.cos(Math.PI * j));
  xx = 0;
  for (;xx < grw;xx++) {
    imgd[p] = Math.min(255, Math.floor(54.4 + 32 * j));
    imgd[p + 1] = Math.min(255, Math.floor(108.8 + 64 * j));
    imgd[p + 2] = Math.min(255, Math.floor(81.6 + 48 * j));
    imgd[p + 3] = 255;
    p += 4;
  }
}
ctx.putImageData(map, 0, 0);
sadg = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
yy = p = 0;
for (;yy < grh;yy++) {
  j = (grh - 1 - yy) / (grh - 1);
  j = 0.5 * (1 - Math.cos(Math.PI * j));
  xx = 0;
  for (;xx < grw;xx++) {
    imgd[p] = Math.min(255, Math.floor(72 + 0.95 * 48 * j));
    imgd[p + 1] = Math.min(255, Math.floor(171 + 93.1 * j));
    imgd[p + 2] = Math.min(255, Math.floor(132 + 0.95 * 87 * j));
    imgd[p + 3] = 255;
    p += 4;
  }
}
ctx.putImageData(map, 0, 0);
sadu = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
yy = p = 0;
for (;yy < grh;yy++) {
  j = yy / (grh - 1);
  j = 0.5 * (1 - Math.cos(Math.PI * j));
  xx = 0;
  for (;xx < grw;xx++) {
    imgd[p] = Math.floor(0.1 * 48 + 36 * j);
    imgd[p + 1] = Math.floor(7 + 52.5 * j);
    imgd[p + 2] = Math.floor(6.4 + 48 * j);
    imgd[p + 3] = 255;
    p += 4;
  }
}
ctx.putImageData(map, 0, 0);
sadd = elem.toDataURL();
if (32 < sadg.length) {
  if (32 < sadu.length) {
    if (32 < sadd.length) {
      addCss(".sadg1 { background-image:url(" + sadg + "); }  .sadu1 { background-image:url(" + sadu + "); }  .sadd1 { background-image:url(" + sadd + "); }");
    }
  }
}
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
yy = p = 0;
for (;yy < grh;yy++) {
  j = (grh - 1 - yy) / (grh - 1);
  j = 0.5 * (1 - Math.cos(Math.PI * j));
  xx = 0;
  for (;xx < grw;xx++) {
    imgd[p] = Math.min(255, Math.floor(0.85 * 52 + 26 * j));
    imgd[p + 1] = Math.min(255, Math.floor(81.6 + 48 * j));
    imgd[p + 2] = Math.min(255, Math.floor(0.85 * 144 + 72 * j));
    imgd[p + 3] = 255;
    p += 4;
  }
}
ctx.putImageData(map, 0, 0);
sadg = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
yy = p = 0;
for (;yy < grh;yy++) {
  j = (grh - 1 - yy) / (grh - 1);
  j = 0.5 * (1 - Math.cos(Math.PI * j));
  xx = 0;
  for (;xx < grw;xx++) {
    imgd[p] = Math.min(255, Math.floor(72 + 0.95 * 48 * j));
    imgd[p + 1] = Math.min(255, Math.floor(132 + 0.95 * 87 * j));
    imgd[p + 2] = Math.min(255, Math.floor(171 + 93.1 * j));
    imgd[p + 3] = 255;
    p += 4;
  }
}
ctx.putImageData(map, 0, 0);
sadu = elem.toDataURL();
elem = document.createElement("canvas");
elem.width = grw;
elem.height = grh;
ctx = elem.getContext("2d");
map = ctx.getImageData(0, 0, grw, grh);
imgd = map.data;
l = imgd.length;
yy = p = 0;
for (;yy < grh;yy++) {
  j = yy / (grh - 1);
  j = 0.5 * (1 - Math.cos(Math.PI * j));
  xx = 0;
  for (;xx < grw;xx++) {
    imgd[p] = Math.floor(0.1 * 48 + 36 * j);
    imgd[p + 1] = Math.floor(5.4 + 40.5 * j);
    imgd[p + 2] = Math.floor(7 + 52.5 * j);
    imgd[p + 3] = 255;
    p += 4;
  }
}
ctx.putImageData(map, 0, 0);
sadd = elem.toDataURL();
if (32 < sadg.length) {
  if (32 < sadu.length) {
    if (32 < sadd.length) {
      addCss(".sadg2 { background-image:url(" + sadg + "); }  .sadu2 { background-image:url(" + sadu + "); }  .sadd2 { background-image:url(" + sadd + "); }");
    }
  }
}
var mos = [];
var m_iv = -1;
var swmup = false;
function mkBtn(node, urlPrefix, w, newHeight) {
  var div = document.createElement("div");
  if (!node.tagName) {
    node = document.getElementById(node);
    node.style.width = w + "px";
    node.style.height = newHeight + "px";
    div.style.width = w + "px";
    div.style.height = newHeight + "px";
  }
  var self = {
    lic : 0
  };
  self.elem = node;
  self.md = false;
  self.mo = false;
  self.mdf = 0;
  self.mof = 0;
  var e = true;
  if (node.style) {
    if (node.style.position) {
      if ("absolute" == (node.style.position + "").toLowerCase()) {
        e = false;
      }
      if ("fixed" == (node.style.position + "").toLowerCase()) {
        e = false;
      }
    }
  }
  if (e) {
    node.style.position = "relative";
  }
  div.style.position = "absolute";
  div.style.opacity = 0;
  div.style.left = "0px";
  div.style.top = "0px";
  node.appendChild(div);
  self.ho = div;
  self.alic = function() {
    this.lic++;
    if (3 == this.lic && (this.ho.style.opacity = 1, this.onload)) {
      this.onload();
    }
  };
  mos.push(self);
  self.setEnabled = function(recurring) {
    if (recurring) {
      this.disabled = false;
      this.upi.style.opacity = this.mof;
      this.downi.style.opacity = this.mdf;
      this.elem.style.opacity = 1;
      this.elem.style.cursor = "pointer";
    } else {
      this.disabled = true;
      this.upi.style.opacity = 0;
      this.downi.style.opacity = 0;
      this.elem.style.opacity = 0.38;
      this.elem.style.cursor = "default";
    }
  };
  if (urlPrefix) {
    e = 1;
    for (;3 >= e;e++) {
      var img = document.createElement("img");
      img.draggable = false;
      img.style.position = "absolute";
      img.style.left = "0px";
      img.style.top = "0px";
      img.border = 0;
      img.width = w;
      img.height = newHeight;
      img.className = "nsi";
      div.appendChild(img);
      if (1 == e) {
        self.normi = img;
        img.onload = function() {
          var unlock = mos.length - 1;
          for (;0 <= unlock;unlock--) {
            var cache = mos[unlock];
            if (cache.normi == this) {
              cache.alic();
              break;
            }
          }
        };
        img.src = urlPrefix + ".png";
      } else {
        if (2 == e) {
          self.upi = img;
          img.style.opacity = 0;
          img.onload = function() {
            var unlock = mos.length - 1;
            for (;0 <= unlock;unlock--) {
              var cache = mos[unlock];
              if (cache.upi == this) {
                cache.alic();
                break;
              }
            }
          };
          img.src = urlPrefix + "up.png";
        } else {
          if (3 == e) {
            self.downi = img;
            img.style.opacity = 0;
            img.onload = function() {
              var unlock = mos.length - 1;
              for (;0 <= unlock;unlock--) {
                var cache = mos[unlock];
                if (cache.downi == this) {
                  cache.alic();
                  break;
                }
              }
            };
            img.src = urlPrefix + "down.png";
          }
        }
      }
    }
  } else {
    div.style.opacity = 1;
  }
  node.onmouseenter = function() {
    var unlock = mos.length - 1;
    for (;0 <= unlock;unlock--) {
      var cache = mos[unlock];
      if (cache.elem == this) {
        if (!cache.disabled && !cache.mo) {
          cache.mo = true;
          if (cache.onmouseenter) {
            cache.onmouseenter();
          }
          if (-1 == m_iv) {
            m_iv = setInterval("hmos()", 25);
          }
        }
        break;
      }
    }
  };
  node.onmouseleave = function() {
    var unlock = mos.length - 1;
    for (;0 <= unlock;unlock--) {
      var cache = mos[unlock];
      if (cache.elem == this) {
        if (cache.mo) {
          cache.mo = false;
          if (cache.onmouseleave) {
            cache.onmouseleave();
          }
          if (-1 == m_iv) {
            m_iv = setInterval("hmos()", 25);
          }
        }
        break;
      }
    }
  };
  node.onmousedown = function(_e) {
    var s = mos.length - 1;
    for (;0 <= s;s--) {
      var self = mos[s];
      if (self.elem == this) {
        if (!self.disabled && !self.md) {
          self.md = true;
          if (self.onmousedown) {
            self.onmousedown(_e, self);
          }
          if (-1 == m_iv) {
            m_iv = setInterval("hmos()", 25);
          }
          return false;
        }
        break;
      }
    }
  };
  node.onmouseup = node.ondragend = function(e) {
    var unlock = mos.length - 1;
    for (;0 <= unlock;unlock--) {
      var cache = mos[unlock];
      if (cache.elem == this) {
        if (cache.md) {
          cache.mdf = 1;
          cache.md = false;
          if (cache.onmouseup && (cache.onmouseup(e, cache), is_mobile)) {
            cache.elem.onmouseleave();
          }
          if (-1 == m_iv) {
            m_iv = setInterval("hmos()", 25);
          }
        }
        break;
      }
    }
  };
  if (!swmup) {
    swmup = true;
    window.onmouseup = window.ondragover = window.ondragend = function() {
      var unlock = mos.length - 1;
      for (;0 <= unlock;unlock--) {
        var cache = mos[unlock];
        if (cache.md) {
          cache.md = false;
          if (-1 == m_iv) {
            m_iv = setInterval("hmos()", 25);
          }
        }
      }
    };
  }
  return self;
}
function hmos() {
  var b;
  var h = false;
  var id = mos.length - 1;
  for (;0 <= id;id--) {
    var animation = mos[id];
    b = false;
    if (animation.mo) {
      if (1 != animation.mof) {
        h = true;
        animation.mof += 0.33;
        if (1 <= animation.mof) {
          animation.mof = 1;
        }
        b = true;
      }
    } else {
      if (0 != animation.mof) {
        h = true;
        animation.mof -= 0.2;
        if (0 >= animation.mof) {
          animation.mof = 0;
        }
        b = true;
      }
    }
    if (b) {
      animation.upi.style.opacity = animation.disabled ? 0 : animation.mof;
    }
    b = false;
    if (animation.md) {
      if (1 != animation.mdf) {
        h = true;
        animation.mdf += 0.33;
        if (1 <= animation.mdf) {
          animation.mdf = 1;
        }
        b = true;
      }
    } else {
      if (0 != animation.mdf) {
        h = true;
        animation.mdf -= 0.2;
        if (0 >= animation.mdf) {
          animation.mdf = 0;
        }
        b = true;
      }
    }
    if (b) {
      animation.downi.style.opacity = animation.disabled ? 0 : animation.mdf;
    }
  }
  if (!h) {
    clearInterval(m_iv);
    m_iv = -1;
  }
}
function makeTextBtn(s, height, i, opt_attributes, c) {
  if (!height) {
    height = 56;
  }
  if (56 < height) {
    height = 56;
  }
  if (!i) {
    i = 15;
  }
  if (!opt_attributes) {
    opt_attributes = 14;
  }
  var el = document.createElement("div");
  el.className = "btnt nsi sadg" + c;
  var style = el.style;
  style.position = "absolute";
  style.width = "auto";
  style.color = "#ffffff";
  style.fontWeight = "bold";
  style.textAlign = "center";
  style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
  style.fontSize = i + "px";
  el.textContent = s;
  style.cursor = "pointer";
  document.body.appendChild(el);
  var width = Math.ceil(35 + el.offsetWidth);
  document.body.removeChild(el);
  el.textContent = "";
  style.width = width + "px";
  style.height = height + "px";
  style.lineHeight = height + "px";
  if (!is_mobile) {
    style.boxShadow = "0px 3px 20px rgba(0,0,0, .75)";
  }
  style.borderRadius = opt_attributes + "px";
  var elem = document.createElement("div");
  style = elem.style;
  style.position = "absolute";
  style.left = style.top = "0px";
  style.width = width + "px";
  style.height = height + "px";
  style.borderRadius = opt_attributes + 1 + "px";
  style.opacity = 0;
  elem.className = "sadu" + c;
  var dom = document.createElement("div");
  style = dom.style;
  style.position = "absolute";
  style.left = style.top = "-1px";
  style.width = width + 2 + "px";
  style.height = height + 2 + "px";
  style.borderRadius = opt_attributes + "px";
  style.opacity = 0;
  dom.className = "sadd" + c;
  var self = mkBtn(el);
  self.a = 1;
  self.ho.appendChild(elem);
  self.upi = elem;
  self.ho.appendChild(dom);
  self.downi = dom;
  self.ts = i;
  self.ww = width;
  self.bgm = c;
  self.setText = function(text) {
    var div = document.createElement("div");
    div.className = "nsi sadg" + this.bgm;
    var s = div.style;
    s.position = "absolute";
    s.width = "auto";
    s.color = "#ffffff";
    s.fontWeight = "bold";
    s.textAlign = "center";
    s.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
    s.fontSize = this.ts + "px";
    div.textContent = text;
    document.body.appendChild(div);
    s = Math.ceil(35 + div.offsetWidth);
    document.body.removeChild(div);
    this.btnf.textContent = text;
    this.ww = s;
    this.elem.style.width = s + "px";
    this.upi.style.width = s + "px";
    this.downi.style.width = s + 2 + "px";
    this.btnf.style.width = s + "px";
  };
  i = document.createElement("div");
  el.appendChild(i);
  self.btnf = i;
  style = i.style;
  style.position = "absolute";
  style.left = style.top = "0px";
  style.width = width + "px";
  style.height = height + "px";
  style.borderRadius = opt_attributes + "px";
  i.textContent = s;
  i.className = "nsi";
  style.color = "#ffffff";
  style.opacity = 0.9;
  self.ho.appendChild(i);
  return self;
}
var sos = [];
var clus = [];
var bso;
var u_m = [64, 32, 16, 8, 4, 2, 1];
var lgbsc = 1;
var lgcsc = 1;
var lb_fr = 0;
var login_fr = 0;
var llgmtm = Date.now();
var login_iv = -1;
function loginFade() {
  var b = Date.now();
  var h = (b - llgmtm) / 25;
  llgmtm = b;
  login_fr += 0.05 * h;
  if (choosing_skin) {
    login_fr += 0.06 * h;
  }
  if (1 <= login_fr) {
    login_fr = 1;
    login.style.display = "none";
    cstx.style.display = "none";
    fbh.style.display = "none";
    twth.style.display = "none";
    cskh.style.display = "none";
    grqh.style.display = "none";
    plq.style.display = "none";
    clq.style.display = "none";
    social.style.display = "none";
    login.style.opacity = 1;
    cstx.style.opacity = 1;
    fbh.style.opacity = 1;
    twth.style.opacity = 1;
    cskh.style.opacity = 1;
    grqh.style.opacity = 1;
    plq.style.opacity = 1;
    clq.style.opacity = 1;
    social.style.opacity = 1;
    pskh.style.opacity = 1;
    nskh.style.opacity = 1;
    skodiv.style.opacity = 1;
    tip_fr = -1;
    tips.style.display = "none";
    mc.style.opacity = 1;
    loch.style.opacity = 1;
    clearInterval(login_iv);
    login_iv = -1;
    if (-1 != showlogo_iv) {
      ncka = lgss = lga = 1;
      showLogo(true);
      if (-1 != showlogo_iv) {
        clearInterval(showlogo_iv);
        showlogo_iv = -1;
      }
    }
  } else {
    lgcsc = 1 + 0.1 * Math.pow(login_fr, 2);
    b = Math.round(lgbsc * lgcsc * 1E5) / 1E5;
    trf(login, "scale(" + b + "," + b + ")");
    login.style.opacity = 1 - login_fr;
    cstx.style.opacity = 1 - login_fr;
    fbh.style.opacity = 1 - login_fr;
    twth.style.opacity = 1 - login_fr;
    cskh.style.opacity = 1 - login_fr;
    grqh.style.opacity = 1 - login_fr;
    plq.style.opacity = 1 - login_fr;
    clq.style.opacity = 1 - login_fr;
    social.style.opacity = 1 - login_fr;
    pskh.style.opacity = login_fr;
    nskh.style.opacity = login_fr;
    skodiv.style.opacity = login_fr;
    mc.style.opacity = login_fr;
    loch.style.opacity = login_fr;
  }
}
var ss_a = 0;
var ss_sh = 0;
var spinner_shown = false;
var ldmc = document.createElement("canvas");
ldmc.width = 128;
ldmc.height = 128;
ldmc.style.position = "fixed";
ldmc.style.left = "0px";
ldmc.style.top = "0px";
ldmc.style.zIndex = 8388607;
ldmc.style.display = "none";
document.body.appendChild(ldmc);
var lsfr = 0;
var lcldtm = Date.now();
var sstr = "Save";
if ("FR" == country) {
  sstr = "Bien";
} else {
  if ("BR" == country) {
    sstr = "OK";
  }
}
var sko_btn = o = makeTextBtn(String.fromCharCode(160) + sstr + String.fromCharCode(160), 47, 20, 34, 1);
var skodiv = o.elem;
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
      localStorage.snakercv = snake.rcv;
    } catch (b) {
    }
    playing = connected = false;
    dead_mtm = Date.now() - 5E3;
  }
};
var nick = document.getElementById("nick");
var victory = document.getElementById("victory");
var victory_bg = document.getElementById("victory_bg");
var logo = document.getElementById("logo");
var login = document.getElementById("login");
var lastscore = document.getElementById("lastscore");
var nick_holder = document.getElementById("nick_holder");
var victory_holder = document.getElementById("victory_holder");
var pstr = "Play";
if ("DE" == country) {
  pstr = "Spielen";
} else {
  if ("FR" == country) {
    pstr = "Jouer";
    nick.placeholder = "Surnom";
  } else {
    if ("BR" == country) {
      pstr = "Joga";
      nick.placeholder = "Apelido";
    }
  }
}
var play_btn = o = makeTextBtn(String.fromCharCode(160) + pstr + String.fromCharCode(160), 47, 20, 34, 1);
var pbdiv = o.elem;
pbdiv.style.position = "relative";
pbdiv.style.display = "inline-block";
pbdiv.style.marginTop = "20px";
pbdiv.style.marginBottom = "50px";
var playh = document.getElementById("playh");
playh.style.opacity = 0;
playh.appendChild(pbdiv);
var tips = document.getElementById("tips");
var tipss = ["Eat to grow longer!", "Don't run into other snakes!", "When longer, hold the mouse for a speed boost!"];
if ("DE" == country) {
  tipss = ["Esse um zu wachsen!", "Klicke f\u00fcr mehr Geschwindigkeit!", "Bewege dich nicht in andere Schlangen!"];
} else {
  if ("FR" == country) {
    tipss = ["Mangez de cro\u00eetre!", "Cliquez et vous courrez!", "Ne laissez pas votre t\u00eate toucher d'autres serpents!"];
  } else {
    if ("BR" == country) {
      tipss = ["Coma para crescer!", "Clique para correr!", "N\u00e3o deixe que sua cabe\u00e7a para tocar outras cobras!"];
    }
  }
}
var tip_pos = -1;
var tip_fr = 1.9;
o.elem.onclick = function() {
  if (!play_btn.disabled) {
    if (!(-1 != dead_mtm)) {
      play_btn_click_mtm = Date.now();
      play_btn.setEnabled(false);
      spinner_shown = nick.disabled = true;
      ldmc.style.display = "inline";
      connect();
    }
  }
};
var save_btn = o = makeTextBtn(String.fromCharCode(160) + "Save Message" + String.fromCharCode(160), 47, 20, 34, 2);
var sbdiv = o.elem;
sbdiv.style.position = "relative";
sbdiv.style.display = "inline-block";
sbdiv.style.marginTop = "30px";
sbdiv.style.marginBottom = "50px";
var saveh = document.getElementById("saveh");
saveh.appendChild(sbdiv);
o.elem.onclick = function() {
  if (!save_btn.disabled) {
    var a = asciize(victory.value);
    if (140 < a.length) {
      a = a.substr(0, 140);
    }
    if (5 <= protocol_version) {
      var buf = new Uint8Array(2 + a.length);
      buf[0] = 255;
      buf[1] = 118;
      var i = 0;
      for (;i < a.length;i++) {
        buf[i + 2] = a.charCodeAt(i);
      }
    } else {
      buf = new Uint8Array(1 + a.length);
      buf[0] = 118;
      i = 0;
      for (;i < a.length;i++) {
        buf[i + 1] = a.charCodeAt(i);
      }
    }
    ws.send(buf);
    save_btn.setEnabled(false);
    victory.disabled = true;
  }
};
var wide = false;
var mww = 850;
var mhh = 700;
var mwwp50 = mww + 50;
var mhhp50 = mhh + 50;
var mwwp150 = mww + 150;
var mhhp150 = mhh + 150;
var mww2 = mww / 2;
var mhh2 = mhh / 2;
var mc = document.createElement("canvas");
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
lbh.style.opacity = 0.5;
lbh.style.zIndex = 7;
lbh.style.display = "none";
lbh.style.cursor = "default";
var lstr = "Leaderboard";
if ("DE" == country) {
  lstr = "Bestenliste";
} else {
  if ("FR" == country) {
    lstr = "Gagnants";
  } else {
    if ("BR" == country) {
      lstr = "L\u00edderes";
    }
  }
}
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
lbs.style.opacity = 0.7;
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
lbn.style.opacity = 0.7;
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
lbp.style.opacity = 0.7;
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
lbf.style.opacity = 0.5;
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
vcm.style.opacity = 0.5;
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
var loc = document.createElement("img");
var lc = document.createElement("canvas");
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
loc.style.opacity = 0.45;
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
asmc.style.opacity = 0.25;
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
var bgi2 = document.createElement("canvas");
var bgp2 = null;
var bgw2 = 599;
var bgh2 = 519;
var ii = document.createElement("img");
ii.onload = function() {
  bgi2.width = bgw2;
  bgi2.height = bgh2;
  var bufferContext = bgi2.getContext("2d");
  try {
    bufferContext.drawImage(this, 0, 0);
    bgp2 = bufferContext.createPattern(bgi2, "repeat");
  } catch (h) {
  }
};
ii.src = "/s/bg45.jpg";
function rdgbg() {
  if (ggbg) {
    if (!gbgmc) {
      gbgmc = document.createElement("canvas");
    }
    gbgmc.width = mww;
    gbgmc.height = mhh;
    var imageContext = gbgmc.getContext("2d");
    try {
      imageContext.drawImage(gbgi, 0, 0, 512, 512, 0, 0, mww, mhh);
    } catch (h) {
    }
  }
}
var ggbg = false;
var gbgmc = null;
var gbgi = document.createElement("img");
gbgi.onload = function() {
  ggbg = true;
  rdgbg();
};
gbgi.src = "/s/gbg.jpg";
function newDeadpool() {
  return{
    os : [],
    end_pos : 0,
    add : function(node) {
      if (this.end_pos == this.os.length) {
        this.os.push(node);
      } else {
        this.os[this.end_pos] = node;
      }
      this.end_pos++;
    },
    get : function() {
      if (1 <= this.end_pos) {
        this.end_pos--;
        var entries = this.os[this.end_pos];
        this.os[this.end_pos] = null;
        return entries;
      }
      return null;
    }
  };
}
var flt_a = "ler did no;gas the;gas all;gas every;panis;panus;paynis;my ass;cut your;heil hit;flick your;fingerba;arse;naked;menstr;eat my;suck my;fuk;dong;cunn;penil;suck a;foresk;puto;puta;suck;mierd;bit.ly;slitherplus;ween;wein;peen".split(";");
var flt_g = "buttlov buttf smegm litherplu eatmy suckm sucka mydik urdik".split(" ");
var flt_w = ["ass", "kkk"];
function gdnm(a) {
  var string = "";
  var pos = "";
  var buffer = "";
  var w = 0;
  var u = false;
  var e = false;
  var i;
  var c;
  i = 0;
  for (;i < a.length;i++) {
    c = a.charCodeAt(i);
    if (32 == c) {
      if (!e) {
        e = true;
        string += " ";
      }
    } else {
      e = false;
      string += String.fromCharCode(c);
    }
  }
  e = false;
  i = 0;
  for (;i < a.length;i++) {
    if (c = a.charCodeAt(i), (u = 48 <= c && 57 >= c) || (65 <= c && 90 >= c || 97 <= c && 122 >= c)) {
      if (pos += String.fromCharCode(c), buffer += String.fromCharCode(c), e = false, u) {
        if (w++, 7 <= w) {
          return false;
        }
      } else {
        w = 0;
      }
    } else {
      if (!e) {
        e = true;
        buffer += " ";
      }
    }
  }
  a = string.toLowerCase();
  i = flt_a.length - 1;
  for (;0 <= i;i--) {
    if (0 <= a.indexOf(flt_a[i])) {
      return false;
    }
  }
  pos = pos.toLowerCase();
  i = flt_g.length - 1;
  for (;0 <= i;i--) {
    if (0 <= pos.indexOf(flt_g[i])) {
      return false;
    }
  }
  buffer = buffer.toLowerCase().split(" ");
  i = buffer.length - 1;
  for (;0 <= i;i--) {
    pos = flt_w.length - 1;
    for (;0 <= pos;pos--) {
      if (buffer[i] == flt_w[pos]) {
        return false;
      }
    }
  }
  return true;
}
var bpx1;
var bpy1;
var bpx2;
var bpy2;
var fpx1;
var fpy1;
var fpx2;
var fpy2;
var sgsc = 0.9;
var gsc = sgsc;
var nsep = 4.5;
var tasty = 0;
var shifty = false;
var rr;
var gg;
var bb;
var render_mode = 2;
if (is_mobile) {
  render_mode = 1;
}
var wumsts = false;
var rank = 0;
var best_rank = 999999999;
var snake_count = 0;
var biggest_snake_count = 0;
var cm1;
var snakes = [];
var foods = [];
var foods_c = 0;
var preys = [];
var points_dp = newDeadpool();
var os = {};
var lsang = 0;
var want_e = false;
var last_e_mtm = 0;
var sectors = [];
var sector_size = 480;
var sector_count_along_edge = 130;
var spangdv = 4.8;
var nsp1 = 4.25;
var nsp2 = 0.5;
var nsp3 = 12;
var mamu = 0.033;
var mamu2 = 0.028;
var cst = 0.43;
var lfas = [];
var lfc = 128;
i = 0;
for (;i < lfc;i++) {
  j = 0.5 * (1 - Math.cos(Math.PI * (lfc - 1 - i) / (lfc - 1)));
  lfas.push(j);
}
var rfas = [];
var rfc = 43;
i = 0;
for (;i < rfc;i++) {
  j = 0.5 * (1 - Math.cos(Math.PI * (rfc - 1 - i) / (rfc - 1)));
  rfas.push(j);
}
var fao = {};
var fc = 3;
for (;100 >= fc;fc++) {
  var fas = [];
  i = 0;
  for (;i < fc;i++) {
    j = 0.5 * (1 - Math.cos(Math.PI * (fc - 1 - i) / (fc - 1)));
    fas.push(j);
  }
  fao["a" + fc] = fas;
}
var hfc = 92;
var hfas = new Float32Array(hfc);
i = 0;
for (;i < hfc;i++) {
  j = 0.5 * (1 - Math.cos(Math.PI * (hfc - 1 - i) / (hfc - 1)));
  hfas[i] = j;
}
var afas = [];
var afc = 26;
i = 0;
for (;i < afc;i++) {
  j = 0.5 * (1 - Math.cos(Math.PI * (afc - 1 - i) / (afc - 1)));
  afas.push(j);
}
var nlc = 48;
var vfas = [];
var vfc = 62;
var fvpos = 0;
var fvtg = 0;
var ovxx;
var ovyy;
var fvxs = [];
var fvys = [];
i = 0;
for (;i < vfc;i++) {
  j = 0.5 * (1 - Math.cos(Math.PI * (vfc - 1 - i) / (vfc - 1)));
  j += 0.5 * (0.5 * (1 - Math.cos(Math.PI * j)) - j);
  vfas.push(j);
  fvxs.push(0);
  fvys.push(0);
}
function pwr(i) {
  var result = new Float32Array(125);
  var k = 0;
  for (;125 > k;k++) {
    result[k] = Math.pow(i, k);
  }
  return result;
}
function pca(opt_attributes) {
  var maxBits = new Float32Array(125);
  var bits = 0;
  for (;125 > bits;bits++) {
    maxBits[bits] = 1 - Math.pow(1 - opt_attributes, bits);
  }
  return maxBits;
}
var p1a = pca(0.1);
var p35a = pca(0.35);
var pwr4 = pwr(0.4);
var pwr35 = pwr(0.35);
var pwr93 = pwr(0.93);
function setMscps(opt_attributes) {
  if (opt_attributes != mscps) {
    mscps = opt_attributes;
    fmlts = [];
    fpsls = [];
    opt_attributes = 0;
    for (;opt_attributes <= mscps;opt_attributes++) {
      if (opt_attributes >= mscps) {
        fmlts.push(fmlts[opt_attributes - 1]);
      } else {
        fmlts.push(Math.pow(1 - opt_attributes / mscps, 2.25));
      }
      if (0 == opt_attributes) {
        fpsls.push(0);
      } else {
        fpsls.push(fpsls[opt_attributes - 1] + 1 / fmlts[opt_attributes - 1]);
      }
    }
    var copies = fmlts[fmlts.length - 1];
    var templatePromise = fpsls[fpsls.length - 1];
    opt_attributes = 0;
    for (;2048 > opt_attributes;opt_attributes++) {
      fmlts.push(copies);
      fpsls.push(templatePromise);
    }
  }
}
function startShowGame() {
  llgmtm = Date.now();
  login_iv = setInterval("loginFade()", 25);
  mc.style.opacity = 0;
  mc.style.display = "inline";
  lbh.style.opacity = lbs.style.opacity = lbn.style.opacity = lbp.style.opacity = lbf.style.opacity = vcm.style.opacity = 0;
  loch.style.opacity = 0;
  lb_fr = -1;
}
function setSkin(ctx, result) {
  ctx.rcv = result;
  ctx.er = 6;
  ctx.ec = "#ffffff";
  ctx.eca = 0.75;
  ctx.ppa = 1;
  ctx.ppc = "#000000";
  ctx.antenna = false;
  if (19 == result) {
    ctx.ec = "#ee5500";
    ctx.er = 4.5;
    ctx.ppa = 0;
    ctx.antenna = true;
    ctx.atba = 0;
    ctx.atc1 = "#505050";
    ctx.atc2 = "#FFFFFF";
    ctx.atia = 0.5;
    ctx.apbs = true;
    var m = 9;
    ctx.atx = new Float32Array(m);
    ctx.aty = new Float32Array(m);
    ctx.atvx = new Float32Array(m);
    ctx.atvy = new Float32Array(m);
    ctx.atax = new Float32Array(m);
    ctx.atay = new Float32Array(m);
    --m;
    for (;0 <= m;m--) {
      ctx.atx[m] = ctx.xx;
      ctx.aty[m] = ctx.yy;
    }
    ctx.bulb = rabulb;
    ctx.blbx = -10;
    ctx.blby = -10;
    ctx.blbw = 20;
    ctx.blbh = 20;
    ctx.bsc = 1;
    ctx.blba = 1;
  } else {
    if (24 == result) {
      ctx.antenna = true;
      ctx.atba = 0;
      ctx.atc1 = "#00688c";
      ctx.atc2 = "#64c8e7";
      ctx.atwg = true;
      ctx.atia = 0.35;
      ctx.abrot = false;
      m = 8;
      ctx.atx = new Float32Array(m);
      ctx.aty = new Float32Array(m);
      ctx.atvx = new Float32Array(m);
      ctx.atvy = new Float32Array(m);
      ctx.atax = new Float32Array(m);
      ctx.atay = new Float32Array(m);
      --m;
      for (;0 <= m;m--) {
        ctx.atx[m] = ctx.xx;
        ctx.aty[m] = ctx.yy;
      }
      ctx.bulb = acbulb;
      ctx.blbx = -10;
      ctx.blby = -10;
      ctx.blbw = 20;
      ctx.blbh = 20;
      ctx.bsc = 1;
      ctx.blba = 0.75;
    } else {
      if (25 == result) {
        ctx.ec = "#ff5609";
        ctx.eca = 1;
        ctx.antenna = true;
        ctx.atba = 0;
        ctx.atc1 = "#000000";
        ctx.atc2 = "#6625c7";
        ctx.atia = 1;
        ctx.abrot = true;
        m = 9;
        ctx.atx = new Float32Array(m);
        ctx.aty = new Float32Array(m);
        ctx.atvx = new Float32Array(m);
        ctx.atvy = new Float32Array(m);
        ctx.atax = new Float32Array(m);
        ctx.atay = new Float32Array(m);
        --m;
        for (;0 <= m;m--) {
          ctx.atx[m] = ctx.xx;
          ctx.aty[m] = ctx.yy;
        }
        ctx.bulb = cdbulb;
        ctx.blbx = -5;
        ctx.blby = -10;
        ctx.blbw = 20;
        ctx.blbh = 20;
        ctx.bsc = 1.6;
        ctx.blba = 1;
      }
    }
  }
  m = null;
  if (9 == result) {
    m = [7, 9, 7, 9, 7, 9, 7, 9, 7, 9, 7, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  } else {
    if (10 == result) {
      m = [9, 9, 9, 9, 9, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7];
    } else {
      if (11 == result) {
        m = [11, 11, 11, 11, 11, 7, 7, 7, 7, 7, 12, 12, 12, 12, 12];
      } else {
        if (12 == result) {
          m = [7, 7, 7, 7, 7, 9, 9, 9, 9, 9, 13, 13, 13, 13, 13];
        } else {
          if (13 == result) {
            m = [14, 14, 14, 14, 14, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7];
          } else {
            if (14 == result) {
              m = [9, 9, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 7, 7];
            } else {
              if (15 == result) {
                m = [0, 1, 2, 3, 4, 5, 6, 7, 8];
              } else {
                if (16 == result) {
                  m = [15, 15, 15, 15, 15, 15, 15, 4, 4, 4, 4, 4, 4, 4];
                } else {
                  if (17 == result) {
                    m = [9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16];
                  } else {
                    if (18 == result) {
                      m = [7, 7, 7, 7, 7, 7, 7, 9, 9, 9, 9, 9, 9, 9];
                    } else {
                      if (19 == result) {
                        m = [9];
                      } else {
                        if (20 == result) {
                          m = [3, 3, 3, 3, 3, 0, 0, 0, 0, 0];
                        } else {
                          if (21 == result) {
                            m = [3, 3, 3, 3, 3, 3, 3, 18, 18, 18, 18, 18, 18, 20, 19, 20, 19, 20, 19, 20, 18, 18, 18, 18, 18, 18];
                          } else {
                            if (22 == result) {
                              m = [5, 5, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 9, 9, 13, 13, 13, 13, 13, 13, 13];
                            } else {
                              if (23 == result) {
                                m = [16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 7, 7, 7, 7, 7, 7, 7];
                              } else {
                                if (24 == result) {
                                  m = [23, 23, 23, 23, 23, 23, 23, 23, 23, 18, 18, 18, 18, 18, 18, 18, 18, 18];
                                } else {
                                  if (25 == result) {
                                    m = [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22];
                                  } else {
                                    result %= 9;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (m) {
    result = m[0];
  }
  ctx.rbcs = m;
  ctx.cv = result;
}
function newSnake(id, style, attr, a, value, args) {
  var obj = {};
  obj.id = id;
  obj.xx = style;
  obj.yy = attr;
  setSkin(obj, a);
  a = obj.cv;
  obj.fnfr = 0;
  obj.na = 1;
  obj.chl = 0;
  obj.tsp = 0;
  obj.sfr = 0;
  obj.rr = Math.min(255, rrs[a] + Math.floor(20 * Math.random()));
  obj.gg = Math.min(255, ggs[a] + Math.floor(20 * Math.random()));
  obj.bb = Math.min(255, bbs[a] + Math.floor(20 * Math.random()));
  id = "00" + Math.min(255, Math.max(0, Math.round(obj.rr))).toString(16);
  style = "00" + Math.min(255, Math.max(0, Math.round(obj.gg))).toString(16);
  attr = "00" + Math.min(255, Math.max(0, Math.round(obj.bb))).toString(16);
  id = id.substr(id.length - 2);
  style = style.substr(style.length - 2);
  attr = attr.substr(attr.length - 2);
  obj.cs = "#" + id + style + attr;
  id = "00" + Math.min(255, Math.max(0, Math.round(0.4 * obj.rr))).toString(16);
  style = "00" + Math.min(255, Math.max(0, Math.round(0.4 * obj.gg))).toString(16);
  attr = "00" + Math.min(255, Math.max(0, Math.round(0.4 * obj.bb))).toString(16);
  id = id.substr(id.length - 2);
  style = style.substr(style.length - 2);
  attr = attr.substr(attr.length - 2);
  obj.cs04 = "#" + id + style + attr;
  id = "00" + Math.min(255, Math.max(0, Math.round(0.5 * (255 + obj.rr)))).toString(16);
  style = "00" + Math.min(255, Math.max(0, Math.round(0.5 * (255 + obj.gg)))).toString(16);
  attr = "00" + Math.min(255, Math.max(0, Math.round(0.5 * (255 + obj.bb)))).toString(16);
  id = id.substr(id.length - 2);
  style = style.substr(style.length - 2);
  attr = attr.substr(attr.length - 2);
  obj.csw = "#" + id + style + attr;
  obj.sc = 1;
  obj.ssp = nsp1 + nsp2 * obj.sc;
  obj.fsp = obj.ssp + 0.1;
  obj.msp = nsp3;
  obj.fxs = new Float32Array(rfc);
  obj.fys = new Float32Array(rfc);
  obj.fchls = new Float32Array(rfc);
  obj.fpos = 0;
  obj.ftg = 0;
  obj.fx = 0;
  obj.fy = 0;
  obj.fchl = 0;
  obj.fas = new Float32Array(afc);
  obj.fapos = 0;
  obj.fatg = 0;
  obj.fa = 0;
  obj.ehang = value;
  obj.wehang = value;
  obj.ehl = 1;
  obj.msl = 42;
  obj.fam = 0;
  obj.ang = value;
  obj.eang = value;
  obj.wang = value;
  obj.rex = 0;
  obj.rey = 0;
  obj.sp = 2;
  if (args) {
    obj.lnp = args[args.length - 1];
    obj.pts = args;
    obj.sct = args.length;
    if (args[0].dying) {
      obj.sct--;
    }
  } else {
    obj.pts = [];
    obj.sct = 0;
  }
  obj.flpos = 0;
  obj.fls = new Float32Array(lfc);
  obj.fl = 0;
  obj.fltg = 0;
  obj.tl = obj.sct + obj.fam;
  obj.cfl = obj.tl;
  obj.scang = 1;
  obj.dead_amt = 0;
  obj.alive_amt = 0;
  snakes.splice(0, 0, obj);
  return os["s" + obj.id] = obj;
}
function snl(input) {
  var n = input.tl;
  input.tl = input.sct + input.fam;
  n = input.tl - n;
  var i = input.flpos;
  var unlock = 0;
  for (;unlock < lfc;unlock++) {
    input.fls[i] -= n * lfas[unlock];
    i++;
    if (i >= lfc) {
      i = 0;
    }
  }
  input.fl = input.fls[input.flpos];
  input.fltg = lfc;
  if (input == snake) {
    wumsts = true;
  }
}
function newFood(id, v00, version, cnt, dataAndEvents, key) {
  var obj = {};
  obj.id = id;
  obj.xx = v00;
  obj.yy = version;
  obj.rx = v00;
  obj.ry = version;
  obj.rsp = dataAndEvents ? 2 : 1;
  obj.cv = key;
  obj.rad = 1E-5;
  obj.sz = cnt;
  id = per_color_imgs[obj.cv];
  obj.cv2 = Math.floor(id.ic * gsc * obj.sz / 16.5);
  if (0 > obj.cv2) {
    obj.cv2 = 0;
  }
  if (obj.cv2 >= id.ic) {
    obj.cv2 = id.ic - 1;
  }
  if (testing) {
    if (!window.biggestcv2) {
      window.biggestcv2 = obj.cv2;
    }
    if (obj.cv2 > window.biggestcv2) {
      window.biggestcv2 = obj.cv2;
      console.log("biggest cv2 seen: " + obj.cv2 + " out of " + (id.ic - 1) + " (fo.sz = " + obj.sz + " which means its server-side rad is " + 5 * obj.sz + ")");
    }
  }
  obj.fi = id.imgs[obj.cv2];
  obj.fw = id.fws[obj.cv2];
  obj.fh = id.fhs[obj.cv2];
  obj.fw2 = id.fw2s[obj.cv2];
  obj.fh2 = id.fh2s[obj.cv2];
  obj.ofi = id.oimgs[obj.cv2];
  obj.ofw = id.ofws[obj.cv2];
  obj.ofh = id.ofhs[obj.cv2];
  obj.ofw2 = id.ofw2s[obj.cv2];
  obj.ofh2 = id.ofh2s[obj.cv2];
  obj.gcv = Math.floor(id.ic * gsc * (0.25 + 0.75 * obj.sz / 16.5));
  if (0 > obj.gcv) {
    obj.gcv = 0;
  }
  if (obj.gcv >= id.ic) {
    obj.gcv = id.ic - 1;
  }
  obj.gfi = id.gimgs[obj.gcv];
  obj.gfw = id.gfws[obj.gcv];
  obj.gfh = id.gfhs[obj.gcv];
  obj.gfw2 = id.gfw2s[obj.gcv];
  obj.gfh2 = id.gfh2s[obj.gcv];
  obj.g2cv = Math.floor(id.ic * gsc * 2 * (0.25 + 0.75 * obj.sz / 16.5));
  if (0 > obj.g2cv) {
    obj.g2cv = 0;
  }
  if (obj.g2cv >= id.ic) {
    obj.g2cv = id.ic - 1;
  }
  obj.g2fi = id.gimgs[obj.g2cv];
  obj.g2fw = id.gfws[obj.g2cv];
  obj.g2fh = id.gfhs[obj.g2cv];
  obj.g2fw2 = id.gfw2s[obj.g2cv];
  obj.g2fh2 = id.gfh2s[obj.g2cv];
  obj.fr = 0;
  obj.gfr = 64 * Math.random();
  obj.gr = 0.65 + 0.1 * obj.sz;
  obj.wsp = 0.0225 * (2 * Math.random() - 1);
  obj.eaten_fr = 0;
  obj.eaten_fr4 = 0;
  return foods[foods_c++] = obj;
}
function newPrey(s, name, id, cnt, value, key, text, sphere, keepData) {
  var obj = {};
  obj.id = s;
  obj.xx = name;
  obj.yy = id;
  obj.rad = 1E-5;
  obj.sz = cnt;
  obj.cv = value;
  obj.dir = key;
  obj.wang = text;
  obj.ang = sphere;
  obj.sp = keepData;
  obj.fr = 0;
  obj.gfr = 64 * Math.random();
  obj.gr = 0.5 + 0.15 * Math.random() + 0.1 * obj.sz;
  obj.rr = Math.min(255, rrs[value]);
  obj.gg = Math.min(255, ggs[value]);
  obj.bb = Math.min(255, bbs[value]);
  s = "00" + Math.min(255, Math.max(0, Math.round(obj.rr))).toString(16);
  name = "00" + Math.min(255, Math.max(0, Math.round(obj.gg))).toString(16);
  id = "00" + Math.min(255, Math.max(0, Math.round(obj.bb))).toString(16);
  s = s.substr(s.length - 2);
  name = name.substr(name.length - 2);
  id = id.substr(id.length - 2);
  obj.cs = "#" + s + name + id;
  obj.cv2 = Math.floor(per_color_imgs[obj.cv].pr_imgs.length * gsc * obj.sz / 9);
  if (0 > obj.cv2) {
    obj.cv2 = 0;
  }
  if (obj.cv2 >= per_color_imgs[obj.cv].pr_imgs.length) {
    obj.cv2 = per_color_imgs[obj.cv].pr_imgs.length - 1;
  }
  obj.fi = per_color_imgs[obj.cv].pr_imgs[obj.cv2];
  obj.fw = per_color_imgs[obj.cv].pr_fws[obj.cv2];
  obj.fh = per_color_imgs[obj.cv].pr_fhs[obj.cv2];
  obj.fw2 = per_color_imgs[obj.cv].pr_fw2s[obj.cv2];
  obj.fh2 = per_color_imgs[obj.cv].pr_fh2s[obj.cv2];
  obj.gcv = per_color_imgs[obj.cv].gimgs.length - 1;
  obj.gfi = per_color_imgs[obj.cv].gimgs[obj.gcv];
  obj.gfw = per_color_imgs[obj.cv].gfws[obj.gcv];
  obj.gfh = per_color_imgs[obj.cv].gfhs[obj.gcv];
  obj.gfw2 = per_color_imgs[obj.cv].gfw2s[obj.gcv];
  obj.gfh2 = per_color_imgs[obj.cv].gfh2s[obj.gcv];
  obj.fxs = new Float32Array(rfc);
  obj.fys = new Float32Array(rfc);
  obj.fpos = 0;
  obj.ftg = 0;
  obj.fx = 0;
  obj.fy = 0;
  obj.eaten = false;
  obj.eaten_fr = 0;
  obj.eaten_fr4 = 0;
  preys.push(obj);
  return obj;
}
var kdmc = document.createElement("canvas");
kdmc.width = kdmc.height = 32;
ctx = kdmc.getContext("2d");
ctx.fillStyle = "#FF9966";
ctx.arc(16, 16, 16, 0, pi2);
ctx.fill();
var sz = 52;
var komc = document.createElement("canvas");
komc.width = komc.height = sz;
ctx = komc.getContext("2d");
map = ctx.getImageData(0, 0, sz, sz);
imgd = map.data;
l = imgd.length;
p = yy = xx = 0;
for (;p < l;p += 4) {
  var v = Math.abs(Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 - yy, 2)) - 16);
  v = 4 >= v ? 1 - v / 4 : 0;
  v = 0.8 * v;
  imgd[p] = imgd[p + 1] = imgd[p + 2] = 0;
  imgd[p + 3] = Math.floor(255 * v);
  xx++;
  if (xx >= sz) {
    xx = 0;
    yy++;
  }
}
ctx.putImageData(map, 0, 0);
sz = 62;
var ksmc = document.createElement("canvas");
ksmc.width = ksmc.height = sz;
ctx = ksmc.getContext("2d");
map = ctx.getImageData(0, 0, sz, sz);
imgd = map.data;
l = imgd.length;
p = yy = xx = 0;
for (;p < l;p += 4) {
  v = Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 + 3 - yy, 2)) - 15;
  v *= 0.1;
  if (0 > v) {
    v = -v;
  }
  if (1 < v) {
    v = 1;
  }
  v = 1 - v;
  v *= 0.25;
  imgd[p] = imgd[p + 1] = imgd[p + 2] = 0;
  imgd[p + 3] = Math.floor(255 * v);
  xx++;
  if (xx >= sz) {
    xx = 0;
    yy++;
  }
}
ctx.putImageData(map, 0, 0);
var rabulb = document.createElement("canvas");
rabulb.width = rabulb.height = 64;
ctx = rabulb.getContext("2d");
var g = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
g.addColorStop(0, "rgba(255, 255, 255, 1)");
g.addColorStop(0.83, "rgba(150,150,150, 1)");
g.addColorStop(0.84, "rgba(80,80,80, 1)");
g.addColorStop(0.99, "rgba(80,80,80, 1)");
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
g.addColorStop(0.5, "rgba(222, 3, 3, 1)");
g.addColorStop(0.96, "rgba(157, 18, 18, 1)");
g.addColorStop(1, "rgba(0,0,0, 0)");
ctx.fillStyle = g;
ctx.fillRect(0, 0, 64, 64);
var colc;
if (testing) {
  colc = document.createElement("canvas");
  colc.width = 256;
  colc.height = 66;
  colc.style.position = "fixed";
  colc.style.left = "0px";
  colc.style.top = "200px";
  colc.style.zIndex = 2147483647;
  document.body.appendChild(colc);
}
var pbx = new Float32Array(32767);
var pby = new Float32Array(32767);
var pba = new Float32Array(32767);
var pbu = new Uint8Array(32767);
var per_color_imgs = [];
var rrs = [192, 144, 128, 128, 238, 255, 255, 255, 224, 255, 144, 80, 255, 40, 100, 120, 72, 160, 255, 56, 56, 62, 255, 101];
var ggs = [128, 153, 208, 255, 238, 160, 144, 64, 48, 255, 153, 80, 192, 136, 117, 134, 84, 80, 224, 68, 68, 19, 86, 200];
var bbs = [255, 255, 208, 128, 112, 96, 144, 64, 224, 255, 255, 80, 80, 96, 255, 255, 255, 255, 64, 255, 255, 160, 9, 232];
var max_skin_cv = 25;
i = 0;
for (;i < rrs.length;i++) {
  o = {
    imgs : [],
    fws : [],
    fhs : [],
    fw2s : [],
    fh2s : [],
    gimgs : [],
    gfws : [],
    gfhs : [],
    gfw2s : [],
    gfh2s : [],
    oimgs : [],
    ofws : [],
    ofhs : [],
    ofw2s : [],
    ofh2s : []
  };
  var rs = "00" + rrs[i].toString(16);
  var gs = "00" + ggs[i].toString(16);
  var bs = "00" + bbs[i].toString(16);
  rs = rs.substr(rs.length - 2);
  gs = gs.substr(gs.length - 2);
  bs = bs.substr(bs.length - 2);
  o.cs = "#" + rs + gs + bs;
  sz = 62;
  var kfmc = document.createElement("canvas");
  kfmc.width = kfmc.height = sz;
  ctx = kfmc.getContext("2d");
  map = ctx.getImageData(0, 0, sz, sz);
  imgd = map.data;
  l = imgd.length;
  p = yy = xx = 0;
  for (;p < l;p += 4) {
    v = Math.abs(Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 - yy, 2)) - 16);
    v = 15 >= v ? 1 - v / 15 : 0;
    imgd[p] = rrs[i];
    imgd[p + 1] = ggs[i];
    imgd[p + 2] = bbs[i];
    imgd[p + 3] = Math.floor(255 * v);
    xx++;
    if (xx >= sz) {
      xx = 0;
      yy++;
    }
  }
  ctx.putImageData(map, 0, 0);
  o.kfmc = kfmc;
  var ksz = 48;
  var ksz2 = ksz / 2;
  var kmc = document.createElement("canvas");
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
  j = 0;
  for (;7 > j;j++) {
    p = xx = yy = 0;
    for (;p < l;p += 4) {
      v = Math.pow(Math.max(0, Math.min(1, 1 - Math.abs(yy - ksz2) / ksz2)), 0.35);
      var v2 = Math.max(0, Math.min(1, 1 - Math.sqrt(Math.pow(xx - ksz2, 2) + Math.pow(yy - ksz2, 2)) / 34));
      v = v + 0.375 * (v2 - v);
      v = v * (1.22 - 0.44 * j / 6);
      rr = rrs[i];
      gg = ggs[i];
      bb = bbs[i];
      imgd[p] = Math.max(0, Math.min(255, Math.floor(rr * v)));
      imgd[p + 1] = Math.max(0, Math.min(255, Math.floor(gg * v)));
      imgd[p + 2] = Math.max(0, Math.min(255, Math.floor(bb * v)));
      xx++;
      if (xx >= ksz) {
        xx = 0;
        yy++;
      }
    }
    ctx.putImageData(map, 0, 0);
    var kmc2 = document.createElement("canvas");
    kmc2.width = kmc2.height = ksz;
    var ctx2 = kmc2.getContext("2d");
    ctx2.drawImage(kmc, 0, 0);
    if (10 == i) {
      k = -1;
      for (;1 >= k;k++) {
        var tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 8) * 13;
        var ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 8) * 13;
        ctx2.fillStyle = "#FFFFFF";
        ctx2.beginPath();
        m = 0;
        for (;5 >= m;m++) {
          xx = tx + ksz / 32 * Math.cos(2 * Math.PI * m / 5) * 0.05 * 24;
          yy = ty + ksz / 32 * Math.sin(2 * Math.PI * m / 5) * 0.05 * 24;
          if (0 == m) {
            ctx2.moveTo(xx, yy);
          } else {
            ctx2.lineTo(xx, yy);
          }
          xx = tx + ksz / 32 * Math.cos(2 * Math.PI * (m + 0.5) / 5) * 3.1;
          yy = ty + ksz / 32 * Math.sin(2 * Math.PI * (m + 0.5) / 5) * 3.1;
          ctx2.lineTo(xx, yy);
        }
        ctx2.fill();
      }
    } else {
      if (19 == i) {
        k = -2;
        for (;2 >= k;k++) {
          tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 15) * 13;
          ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 15) * 13;
          ctx2.save();
          ctx2.globalAlpha = 0.7;
          ctx2.fillStyle = "#FFFFFF";
          ctx2.beginPath();
          m = 0;
          for (;5 >= m;m++) {
            xx = tx + ksz / 32 * Math.cos(2 * Math.PI * m / 5) * 0.05 * 12;
            yy = ty + ksz / 32 * Math.sin(2 * Math.PI * m / 5) * 0.05 * 12;
            if (0 == m) {
              ctx2.moveTo(xx, yy);
            } else {
              ctx2.lineTo(xx, yy);
            }
            xx = tx + ksz / 32 * Math.cos(2 * Math.PI * (m + 0.5) / 5) * 1.55;
            yy = ty + ksz / 32 * Math.sin(2 * Math.PI * (m + 0.5) / 5) * 1.55;
            ctx2.lineTo(xx, yy);
          }
          ctx2.fill();
          ctx2.restore();
        }
      } else {
        if (20 == i) {
          k = -1.5;
          for (;1.5 >= k;k++) {
            tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 15) * 13;
            ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 15) * 13;
            ctx2.save();
            ctx2.globalAlpha = 0.7;
            ctx2.fillStyle = "#FFFFFF";
            ctx2.beginPath();
            m = 0;
            for (;5 >= m;m++) {
              xx = tx + ksz2 / 16 * Math.cos(2 * Math.PI * m / 5) * 0.05 * 14;
              yy = ty + ksz2 / 16 * Math.sin(2 * Math.PI * m / 5) * 0.05 * 14;
              if (0 == m) {
                ctx2.moveTo(xx, yy);
              } else {
                ctx2.lineTo(xx, yy);
              }
              xx = tx + ksz2 / 16 * Math.cos(2 * Math.PI * (m + 0.5) / 5) * 1.8;
              yy = ty + ksz2 / 16 * Math.sin(2 * Math.PI * (m + 0.5) / 5) * 1.8;
              ctx2.lineTo(xx, yy);
            }
            ctx2.fill();
            ctx2.restore();
          }
        }
      }
    }
    kmcs.push(kmc2);
  }
  o.kmcs = kmcs;
  per_color_imgs.push(o);
  j = 2.8;
  for (;18.8 >= j;j += 1) {
    var cc = document.createElement("canvas");
    sz = Math.ceil(2.5 * j + 28);
    cc.width = cc.height = sz;
    ctx = cc.getContext("2d");
    ctx.fillStyle = o.cs;
    ctx.arc(sz / 2, sz / 2, 0.65 * j, 0, pi2);
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "#" + rs + gs + bs;
    ctx.globalAlpha = 0.8;
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
    var eam = 0.2;
    g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, j / 2);
    g.addColorStop(0, "rgba(" + rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 1)");
    g.addColorStop(0.99, "rgba(" + Math.floor(rrs[i] * eam) + ", " + Math.floor(ggs[i] * eam) + ", " + Math.floor(bbs[i] * eam) + ", 1)");
    g.addColorStop(1, "rgba(" + Math.floor(rrs[i] * eam) + ", " + Math.floor(ggs[i] * eam) + ", " + Math.floor(bbs[i] * eam) + ", 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, sz, sz);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.arc(sz / 2, sz / 2, 0.65 * j, 0, pi2);
    ctx.globalAlpha = 1;
    ctx.stroke();
    o.oimgs.push(cc);
    o.ofws.push(sz);
    o.ofhs.push(sz);
    o.ofw2s.push(sz / 2);
    o.ofh2s.push(sz / 2);
  }
  o.ic = o.imgs.length;
  o.pr_imgs = [];
  o.pr_fws = [];
  o.pr_fhs = [];
  o.pr_fw2s = [];
  o.pr_fh2s = [];
  j = 3;
  for (;24 >= j;j += 1) {
    cc = document.createElement("canvas");
    sz = Math.ceil(2 * j + 38);
    cc.width = cc.height = sz;
    ctx = cc.getContext("2d");
    ctx.fillStyle = o.cs;
    ctx.arc(sz / 2, sz / 2, j / 2, 0, pi2);
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "#" + rs + gs + bs;
    ctx.fill();
    ctx.fill();
    o.pr_imgs.push(cc);
    o.pr_fws.push(sz);
    o.pr_fhs.push(sz);
    o.pr_fw2s.push(sz / 2);
    o.pr_fh2s.push(sz / 2);
  }
}
if (testing) {
  ctx = colc.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, colc.width, colc.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "10px Arial, Helvetica Neue, Helvetica, sans-serif";
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  i = yy = xx = 0;
  for (;i < rrs.length;i++) {
    var pci = per_color_imgs[i];
    kmc = pci.kmcs[0];
    ctx.drawImage(kmc, 0, 0, kmc.width, kmc.height, xx, yy, 16, 16);
    ntx = o.xx + o.fx;
    nty = o.yy + o.fy;
    ntx = mww2 + (ntx - view_xx) * gsc;
    nty = mhh2 + (nty - view_yy) * gsc;
    ctx.fillText("" + i, xx + 8, yy + 16);
    xx += 16;
    if (xx > colc.width - 16) {
      xx = 0;
      yy += 28;
    }
  }
}
var view_xx = 0;
var view_yy = 0;
var view_ang = 0;
var view_dist = 0;
var fvx = 0;
var fvy = 0;
var xm = 0;
var ym = 0;
var lsxm = 0;
var lsym = 0;
var snake = null;
var my_nick = "";
var dhx;
var dhy;
var hsz;
var fr = 0;
var lfr = 0;
var ltm = Date.now();
var vfr = 0;
var vfrb = 0;
var avfr = 0;
var fr2 = 0;
var lfr2 = 0;
var vfrb2 = 0;
var cptm = 0;
var lptm = 0;
var lpstm = 0;
var last_ping_mtm = 0;
var lagging = false;
var lag_mult = 1;
var wfpr = false;
var high_quality = true;
var gla = 1;
var wdfg = 0;
var qsm = 1;
var mqsm = 1.7;
var playing = false;
var connected = false;
var want_close_socket = false;
var want_victory_message = false;
var want_victory_focus = false;
var want_hide_victory = 0;
var hvfr = 0;
var dead_mtm = -1;
var at2lt = new Float32Array(65536);
yy = 0;
for (;256 > yy;yy++) {
  xx = 0;
  for (;256 > xx;xx++) {
    at2lt[yy << 8 | xx] = Math.atan2(yy - 128, xx - 128);
  }
}
var kd_l_frb = 0;
var kd_r_frb = 0;
var kd_l = false;
var kd_r = false;
var kd_u = false;
var lkstm = 0;
var social = document.createElement("iframe");
try {
  social.frameBorder = 0;
} catch (b$$35) {
}
social.style.position = "fixed";
social.style.left = "6px";
social.style.top = "6px";
social.style.border = "0px";
social.style.zIndex = 9999999;
social.width = 200;
social.height = 150;
social.src = "/social-box/";
document.body.appendChild(social);
var oef = function() {
  var options = Date.now();
  avfr = vfr = (options - ltm) / 8;
  ltm = options;
  if (!choosing_skin) {
    if (!lagging) {
      if (wfpr) {
        if (420 < options - last_ping_mtm) {
          lagging = true;
        }
      }
    }
    if (lagging) {
      lag_mult *= 0.85;
      if (0.01 > lag_mult) {
        lag_mult = 0.01;
      }
    } else {
      if (1 > lag_mult) {
        lag_mult += 0.05;
        if (1 <= lag_mult) {
          lag_mult = 1;
        }
      }
    }
  }
  if (120 < vfr) {
    vfr = 120;
  }
  vfr *= lag_mult;
  etm *= lag_mult;
  lfr = fr;
  fr += vfr;
  vfrb = Math.floor(fr) - Math.floor(lfr);
  lfr2 = fr2;
  fr2 += 2 * vfr;
  vfrb2 = Math.floor(fr2) - Math.floor(lfr2);
  if (kd_l) {
    kd_l_frb += vfrb;
  }
  if (kd_r) {
    kd_r_frb += vfrb;
  }
  if (spinner_shown) {
    lsfr += avfr;
    var ctx = ldmc.getContext("2d");
    ctx.clearRect(0, 0, 512, 128);
    var c;
    var x;
    var p = 1;
    for (;2 >= p;p++) {
      ctx.beginPath();
      if (1 == p) {
        ctx.fillStyle = "#60FF70";
        x = 0;
      } else {
        ctx.fillStyle = "#9850FF";
        x = Math.PI;
      }
      var i = 0;
      for (;256 >= i;i++) {
        c = 32 + 5 * Math.cos(x + lsfr / 6 + 8 * i / 256) + 8 * i / 256;
        if (256 == i) {
          c += 10;
        }
        xx = 64 + Math.cos(x + lsfr / 44 + 0.8 * Math.PI * i / 256) * c * 1.25;
        yy = 64 + Math.sin(x + lsfr / 44 + 0.8 * Math.PI * i / 256) * c;
        if (0 == i) {
          ctx.moveTo(xx, yy);
        } else {
          ctx.lineTo(xx, yy);
        }
      }
      c = 32;
      xx = 64 + Math.cos(x + lsfr / 44 + 0.8 * Math.PI * (i + 47) / 256) * c * 1.25;
      yy = 64 + Math.sin(x + lsfr / 44 + 0.8 * Math.PI * (i + 47) / 256) * c;
      ctx.lineTo(xx, yy);
      i = 256;
      for (;0 <= i;i--) {
        c = 32 + 5 * Math.cos(x + lsfr / 6 + 8 * i / 256) - 8 * i / 256;
        if (256 == i) {
          c -= 10;
        }
        xx = 64 + Math.cos(x + lsfr / 44 + 0.8 * Math.PI * i / 256) * c * 1.25;
        yy = 64 + Math.sin(x + lsfr / 44 + 0.8 * Math.PI * i / 256) * c;
        ctx.lineTo(xx, yy);
      }
      ctx.fill();
    }
    if (connecting) {
      ss_a += avfr / 86;
      if (1 <= ss_a) {
        ss_a = 1;
      }
      ss_sh += avfr / 93;
      if (1 <= ss_sh) {
        ss_sh = 1;
      }
    } else {
      ss_a -= avfr / 86;
      if (0 >= ss_a) {
        ss_sh = ss_a = 0;
        ldmc.style.display = "none";
        trf(ldmc, "");
      }
    }
    ldmc.style.opacity = ss_a;
    i = Math.round(0.1 + 0.9 * ss_sh * (1 + 2 * Math.pow(1 - ss_a, 2)) * 1E5) / 1E5;
    trf(ldmc, "scale(" + i + "," + i + ")");
  }
  if (-1 != play_btn_click_mtm && 6666 < options - play_btn_click_mtm) {
    i = document.createElement("img");
    x = [];
    x.push("bso=" + encodeURIComponent(bso));
    if (bso) {
      var self;
      for (self in bso) {
        x.push(self + "=" + encodeURIComponent(bso[self]));
      }
    }
    x.push("waiting_for_sos=" + (waiting_for_sos ? "true" : "false"));
    x.push("soslen=" + sos.length);
    i.src = "http://slither.io/cnc.jpg?" + x.join("&");
    play_btn_click_mtm = -1;
  }
  if (waiting_for_sos) {
    if (options > sos_ready_after_mtm) {
      if (!connecting) {
        if (!connected) {
          connect();
        }
      }
    }
  }
  if (connecting) {
    if (3E3 < options - start_connect_mtm) {
      if (bso) {
        bso.tainted = true;
      }
      connect();
    }
  }
  if (choosing_skin) {
    i = snakes.length - 1;
    for (;0 <= i;i--) {
      self = snakes[i];
      p = self.pts.length - 1;
      for (;0 <= p;p--) {
        self.pts[p].yy = grd / 2 + 15 * Math.cos(p / 4 + fr / 19) * (1 - p / self.pts.length);
      }
    }
    view_xx -= vfr;
  }
  if (playing) {
    if (high_quality) {
      if (1 > gla) {
        gla += 0.0075 * vfr;
        if (1 < gla) {
          gla = 1;
        }
      }
      if (1 < qsm) {
        qsm -= 4E-5 * vfr;
        if (1 > qsm) {
          qsm = 1;
        }
      }
    } else {
      if (0 < gla) {
        gla -= 0.0075 * vfr;
        if (0 > gla) {
          gla = 0;
        }
      }
      if (qsm < mqsm) {
        qsm += 4E-5 * vfr;
        if (qsm > mqsm) {
          qsm = mqsm;
        }
      }
    }
  }
  if (0 != want_hide_victory) {
    if (1 == want_hide_victory) {
      hvfr += 0.02 * vfr;
      if (1 <= hvfr) {
        hvfr = 0;
        want_hide_victory = 2;
        victory_holder.style.opacity = 1;
        saveh.style.opacity = 1;
        victory_holder.style.display = "none";
        saveh.style.display = "none";
        nick_holder.style.opacity = 0;
        playh.style.opacity = 0;
        smh.style.opacity = 0;
        nick_holder.style.display = "inline-block";
        playh.style.display = "block";
        smh.style.display = "block";
      } else {
        victory_holder.style.opacity = 1 - hvfr;
        saveh.style.opacity = 1 - hvfr;
      }
    } else {
      if (2 == want_hide_victory) {
        hvfr += 0.02 * vfr;
        if (1 <= hvfr) {
          hvfr = 1;
          want_hide_victory = 0;
        }
        nick_holder.style.opacity = hvfr;
        playh.style.opacity = hvfr;
        smh.style.opacity = hvfr;
      }
    }
  }
  if (1 != login_fr) {
    if (-1 != tip_fr) {
      tip_fr += 0.017 * vfr;
      if (tip_fr >= pi2) {
        tip_fr -= pi2;
        tip_pos++;
        if (tip_pos >= tipss.length) {
          tip_pos = 0;
        }
        tips.textContent = tipss[tip_pos];
      }
      p = 0.5 - 0.5 * Math.cos(tip_fr);
      tips.style.opacity = Math.round(1E5 * Math.pow(p, 0.5)) / 1E5;
    }
  }
  if (-1 == dead_mtm) {
    if (-1 != lb_fr) {
      if (1 != lb_fr) {
        lb_fr += 0.01 * vfr;
        if (1 <= lb_fr) {
          lb_fr = 1;
        }
        lbh.style.opacity = 0.85 * lb_fr;
        lbs.style.opacity = lbn.style.opacity = lbp.style.opacity = lbf.style.opacity = vcm.style.opacity = lb_fr;
      }
    }
  } else {
    if (1600 < options - dead_mtm) {
      if (-1 == login_iv) {
        login_iv = -2;
        login.style.display = "inline";
        try {
          if ("1" != localStorage.edttsg) {
            cstx.style.display = "inline";
          } else {
            cskh.style.display = "inline";
          }
        } catch (z) {
        }
        fbh.style.display = "inline";
        twth.style.display = "inline";
        plq.style.display = "inline";
        clq.style.display = "inline";
        grqh.style.display = "inline";
        social.style.display = "inline";
        if (want_victory_focus) {
          want_victory_focus = false;
          victory.focus();
        }
      }
      if (-2 == login_iv) {
        login_fr -= 0.004 * vfr;
        if (choosing_skin) {
          login_fr -= 0.007 * vfr;
        }
        lb_fr = login_fr;
        if (0 >= login_fr) {
          login_fr = 0;
          dead_mtm = -1;
          nick.disabled = false;
          nick.focus();
          lb_fr = -1;
          playing = false;
          if (choosing_skin) {
            choosing_skin = false;
            resetGame();
            pskh.style.display = "none";
            nskh.style.display = "none";
            skodiv.style.display = "none";
          }
        }
        pbdiv.style.opacity = 1 - 0.5 * Math.max(0, Math.min(1, 6 * login_fr));
        lgcsc = 1 + 0.1 * Math.pow(login_fr, 2);
        i = Math.round(lgbsc * lgcsc * 1E5) / 1E5;
        if (1 == i) {
          trf(login, "");
        } else {
          trf(login, "scale(" + i + "," + i + ")");
        }
        login.style.opacity = 1 - login_fr;
        cstx.style.opacity = 1 - login_fr;
        fbh.style.opacity = 1 - login_fr;
        twth.style.opacity = 1 - login_fr;
        cskh.style.opacity = 1 - login_fr;
        grqh.style.opacity = 1 - login_fr;
        plq.style.opacity = 1 - login_fr;
        clq.style.opacity = 1 - login_fr;
        social.style.opacity = 1 - login_fr;
        pskh.style.opacity = login_fr;
        nskh.style.opacity = login_fr;
        skodiv.style.opacity = login_fr;
        mc.style.opacity = login_fr;
        loch.style.opacity = login_fr;
        lbh.style.opacity = 0.85 * lb_fr;
        lbs.style.opacity = lbn.style.opacity = lbp.style.opacity = lbf.style.opacity = vcm.style.opacity = lb_fr;
      }
    }
  }
  if (want_close_socket) {
    if (-1 == dead_mtm) {
      want_close_socket = false;
      if (ws) {
        ws.close();
        ws = null;
        playing = connected = false;
      }
      resetGame();
    }
  }
  if (want_victory_message) {
    victory_bg.style.opacity = 0.92 + 0.08 * Math.cos(fr / 10);
  }
  if (connected) {
    if (0 < kd_l_frb || 0 < kd_r_frb) {
      if (150 < options - lkstm) {
        lkstm = options;
        if (0 < kd_r_frb) {
          if (kd_l_frb > kd_r_frb) {
            kd_l_frb -= kd_r_frb;
            kd_r_frb = 0;
          }
        }
        if (0 < kd_l_frb) {
          if (kd_r_frb > kd_l_frb) {
            kd_r_frb -= kd_l_frb;
            kd_l_frb = 0;
          }
        }
        if (0 < kd_l_frb) {
          v = kd_l_frb;
          if (127 < v) {
            v = 127;
          }
          kd_l_frb -= v;
          if (5 <= protocol_version) {
            i = new Uint8Array(2);
            i[0] = 252;
          } else {
            i = new Uint8Array(2);
            i[0] = 108;
          }
          i[1] = v;
          ws.send(i);
          snake.eang -= mamu * v * snake.scang * snake.spang;
        } else {
          if (0 < kd_r_frb) {
            v = kd_r_frb;
            if (127 < v) {
              v = 127;
            }
            kd_r_frb -= v;
            if (5 <= protocol_version) {
              v += 128;
              i = new Uint8Array(2);
              i[0] = 252;
            } else {
              i = new Uint8Array(2);
              i[0] = 114;
            }
            i[1] = v;
            snake.eang += mamu * v * snake.scang * snake.spang;
            ws.send(i);
          }
        }
      }
    }
    if (!wfpr) {
      if (250 < options - last_ping_mtm) {
        last_ping_mtm = options;
        wfpr = true;
        i = new Uint8Array(1);
        i[0] = 5 <= protocol_version ? 251 : 112;
        ws.send(i);
        lpstm = options;
      }
    }
  }
  if (null != snake) {
    if (2147483647 != grd) {
      if (1E3 < options - locu_mtm) {
        locu_mtm = Date.now();
        myloc.style.left = Math.round(52 + 40 * (snake.xx - grd) / grd - 7) + "px";
        myloc.style.top = Math.round(52 + 40 * (snake.yy - grd) / grd - 7) + "px";
      }
    }
  }
  if (1E3 < options - lrd_mtm) {
    if (testing && (console && console.log)) {
      console.log("FPS: " + fps);
      x = [];
      trdps += rdps;
      if (playing) {
        tcsecs++;
      }
      x.push("FPS: " + fps);
      x.push("sectors: " + sectors.length);
      x.push("foods: " + foods_c);
      x.push("bytes/sec: " + rdps);
      x.push("bytes/sec avg: " + Math.round(trdps / tcsecs));
      x.push("");
      i = self = 0;
      for (;i < rdpspc.length;i++) {
        if (0 <= rdpspc[i]) {
          self += rdpspc[i];
        }
      }
      i = 0;
      for (;i < rdpspc.length;i++) {
        if (0 <= rdpspc[i]) {
          x.push(String.fromCharCode(i) + ": " + rdpspc[i] + " (" + Math.round(rdpspc[i] / self * 1E3) / 10 + "%)");
        }
      }
      x.push("total: " + self);
      maxp = pf_ep = pf_nap = pf_remove = pf_new_add = pf_add = 0;
      x.push("");
      i = 1;
      for (;i < pfs.length;i++) {
        if (0 != pfs[i]) {
          x.push(i + ": " + Math.round(1E3 * pfs[i]) / 1E3);
          pfs[i] = 0;
        }
      }
      pft = 0;
      pfd.innerHTML = x.join("<br>");
    }
    if (playing) {
      if (1 == want_quality) {
        if (32 >= fps) {
          if (high_quality) {
            wdfg++;
            if (1 <= wdfg) {
              high_quality = false;
            }
          }
        } else {
          if (high_quality || 48 <= fps) {
            if (0 < wdfg) {
              wdfg--;
              if (0 >= wdfg) {
                high_quality = true;
              }
            }
          }
        }
      }
    }
    wangnuc = angnuc = anguc = fps = reps = rsps = rnps = rfps = rdps = 0;
    lrd_mtm = Date.now();
  }
  etm *= Math.pow(0.993, vfrb);
  if (null != snake) {
    if (xm != lsxm || ym != lsym) {
      want_e = true;
    }
    if (want_e) {
      if (100 < options - last_e_mtm) {
        want_e = false;
        last_e_mtm = options;
        lsxm = xm;
        lsym = ym;
        d2 = xm * xm + ym * ym;
        if (256 < d2) {
          ang = Math.atan2(ym, xm);
          snake.eang = ang;
        } else {
          ang = snake.wang;
        }
        ang %= pi2;
        if (0 > ang) {
          ang += pi2;
        }
        if (5 <= protocol_version) {
          sang = Math.floor(251 * ang / pi2);
          if (sang != lsang) {
            lsang = sang;
            i = new Uint8Array(1);
            i[0] = sang & 255;
            lpstm = options;
            ws.send(i.buffer);
          }
        } else {
          sang = Math.floor(16777215 * ang / pi2);
          if (sang != lsang) {
            lsang = sang;
            i = new Uint8Array(4);
            i[0] = 101;
            i[1] = sang >> 16 & 255;
            i[2] = sang >> 8 & 255;
            i[3] = sang & 255;
            lpstm = options;
            ws.send(i.buffer);
          }
        }
      }
    }
  }
  if (!choosing_skin) {
    i = snakes.length - 1;
    for (;0 <= i;i--) {
      self = snakes[i];
      ctx = mamu * vfr * self.scang * self.spang;
      options = self.sp * vfr / 4;
      if (options > self.msl) {
        options = self.msl;
      }
      if (!self.dead) {
        if (self.tsp != self.sp) {
          if (self.tsp < self.sp) {
            self.tsp += 0.3 * vfr;
            if (self.tsp > self.sp) {
              self.tsp = self.sp;
            }
          } else {
            self.tsp -= 0.3 * vfr;
            if (self.tsp < self.sp) {
              self.tsp = self.sp;
            }
          }
        }
        if (self.tsp > self.fsp) {
          self.sfr += (self.tsp - self.fsp) * vfr * 0.021;
        }
        if (0 < self.fltg) {
          x = vfrb;
          if (x > self.fltg) {
            x = self.fltg;
          }
          self.fltg -= x;
          qq = 0;
          for (;qq < x;qq++) {
            self.fl = self.fls[self.flpos];
            self.fls[self.flpos] = 0;
            self.flpos++;
            if (self.flpos >= lfc) {
              self.flpos = 0;
            }
          }
        } else {
          if (0 == self.fltg) {
            self.fltg = -1;
            self.fl = 0;
          }
        }
        self.cfl = self.tl + self.fl;
      }
      if (1 == self.dir) {
        self.ang -= ctx;
        if (0 > self.ang || self.ang >= pi2) {
          self.ang %= pi2;
        }
        if (0 > self.ang) {
          self.ang += pi2;
        }
        x = (self.wang - self.ang) % pi2;
        if (0 > x) {
          x += pi2;
        }
        if (x > Math.PI) {
          x -= pi2;
        }
        if (0 < x) {
          self.ang = self.wang;
          self.dir = 0;
        }
      } else {
        if (2 == self.dir) {
          self.ang += ctx;
          if (0 > self.ang || self.ang >= pi2) {
            self.ang %= pi2;
          }
          if (0 > self.ang) {
            self.ang += pi2;
          }
          x = (self.wang - self.ang) % pi2;
          if (0 > x) {
            x += pi2;
          }
          if (x > Math.PI) {
            x -= pi2;
          }
          if (0 > x) {
            self.ang = self.wang;
            self.dir = 0;
          }
        } else {
          self.ang = self.wang;
        }
      }
      if (1 != self.ehl) {
        self.ehl += 0.03 * vfr;
        if (1 <= self.ehl) {
          self.ehl = 1;
        }
      }
      ctx = self.pts[self.pts.length - 1];
      self.wehang = Math.atan2(self.yy + self.fy - ctx.yy - ctx.fy + ctx.eby * (1 - self.ehl), self.xx + self.fx - ctx.xx - ctx.fx + ctx.ebx * (1 - self.ehl));
      if (!self.dead) {
        if (!(self.ehang == self.wehang)) {
          x = (self.wehang - self.ehang) % pi2;
          if (0 > x) {
            x += pi2;
          }
          if (x > Math.PI) {
            x -= pi2;
          }
          if (0 > x) {
            self.edir = 1;
          } else {
            if (0 < x) {
              self.edir = 2;
            }
          }
        }
      }
      if (1 == self.edir) {
        self.ehang -= 0.1 * vfr;
        if (0 > self.ehang || self.ehang >= pi2) {
          self.ehang %= pi2;
        }
        if (0 > self.ehang) {
          self.ehang += pi2;
        }
        x = (self.wehang - self.ehang) % pi2;
        if (0 > x) {
          x += pi2;
        }
        if (x > Math.PI) {
          x -= pi2;
        }
        if (0 < x) {
          self.ehang = self.wehang;
          self.edir = 0;
        }
      } else {
        if (2 == self.edir) {
          self.ehang += 0.1 * vfr;
          if (0 > self.ehang || self.ehang >= pi2) {
            self.ehang %= pi2;
          }
          if (0 > self.ehang) {
            self.ehang += pi2;
          }
          x = (self.wehang - self.ehang) % pi2;
          if (0 > x) {
            x += pi2;
          }
          if (x > Math.PI) {
            x -= pi2;
          }
          if (0 > x) {
            self.ehang = self.wehang;
            self.edir = 0;
          }
        }
      }
      if (!self.dead) {
        self.xx += Math.cos(self.ang) * options;
        self.yy += Math.sin(self.ang) * options;
        self.chl += options / self.msl;
      }
      if (0 < vfrb) {
        p = self.pts.length - 1;
        for (;0 <= p;p--) {
          ctx = self.pts[p];
          if (ctx.dying) {
            ctx.da += 0.0015 * vfrb;
            if (1 < ctx.da) {
              self.pts.splice(p, 1);
              ctx.dying = false;
              points_dp.add(ctx);
            }
          }
        }
        p = self.pts.length - 1;
        for (;0 <= p;p--) {
          if (ctx = self.pts[p], 0 < ctx.eiu) {
            fy = fx = 0;
            qq = cm1 = ctx.eiu - 1;
            for (;0 <= qq;qq--) {
              ctx.efs[qq] = 2 == ctx.ems[qq] ? ctx.efs[qq] + vfrb2 : ctx.efs[qq] + vfrb;
              x = ctx.efs[qq];
              if (x >= hfc) {
                if (qq != cm1) {
                  ctx.exs[qq] = ctx.exs[cm1];
                  ctx.eys[qq] = ctx.eys[cm1];
                  ctx.efs[qq] = ctx.efs[cm1];
                  ctx.ems[qq] = ctx.ems[cm1];
                }
                ctx.eiu--;
                cm1--;
              } else {
                fx += ctx.exs[qq] * hfas[x];
                fy += ctx.eys[qq] * hfas[x];
              }
            }
            ctx.fx = fx;
            ctx.fy = fy;
          }
        }
      }
      options = 2.3 * Math.cos(self.eang);
      x = 2.3 * Math.sin(self.eang);
      if (self.rex < options) {
        self.rex += vfr / 6;
        if (self.rex >= options) {
          self.rex = options;
        }
      }
      if (self.rey < x) {
        self.rey += vfr / 6;
        if (self.rey >= x) {
          self.rey = x;
        }
      }
      if (self.rex > options) {
        self.rex -= vfr / 6;
        if (self.rex <= options) {
          self.rex = options;
        }
      }
      if (self.rey > x) {
        self.rey -= vfr / 6;
        if (self.rey <= x) {
          self.rey = x;
        }
      }
      if (0 < vfrb) {
        if (0 < self.ftg) {
          x = vfrb;
          if (x > self.ftg) {
            x = self.ftg;
          }
          self.ftg -= x;
          qq = 0;
          for (;qq < x;qq++) {
            self.fx = self.fxs[self.fpos];
            self.fy = self.fys[self.fpos];
            self.fchl = self.fchls[self.fpos];
            self.fxs[self.fpos] = 0;
            self.fys[self.fpos] = 0;
            self.fchls[self.fpos] = 0;
            self.fpos++;
            if (self.fpos >= rfc) {
              self.fpos = 0;
            }
          }
        } else {
          if (0 == self.ftg) {
            self.ftg = -1;
            self.fx = 0;
            self.fy = 0;
            self.fchl = 0;
          }
        }
        if (0 < self.fatg) {
          x = vfrb;
          if (x > self.fatg) {
            x = self.fatg;
          }
          self.fatg -= x;
          qq = 0;
          for (;qq < x;qq++) {
            self.fa = self.fas[self.fapos];
            self.fas[self.fapos] = 0;
            self.fapos++;
            if (self.fapos >= afc) {
              self.fapos = 0;
            }
          }
        } else {
          if (0 == self.fatg) {
            self.fatg = -1;
            self.fa = 0;
          }
        }
      }
      if (self.dead) {
        self.dead_amt += 0.02 * vfr;
        if (1 <= self.dead_amt) {
          snakes.splice(i, 1);
        }
      } else {
        if (1 != self.alive_amt) {
          self.alive_amt += 0.015 * vfr;
          if (1 <= self.alive_amt) {
            self.alive_amt = 1;
          }
        }
      }
    }
  }
  i = preys.length - 1;
  for (;0 <= i;i--) {
    p = preys[i];
    ctx = mamu2 * vfr;
    options = p.sp * vfr / 4;
    if (0 < vfrb) {
      if (0 < p.ftg) {
        x = vfrb;
        if (x > p.ftg) {
          x = p.ftg;
        }
        p.ftg -= x;
        qq = 1;
        for (;qq <= x;qq++) {
          if (qq == x) {
            p.fx = p.fxs[p.fpos];
            p.fy = p.fys[p.fpos];
          }
          p.fxs[p.fpos] = 0;
          p.fys[p.fpos] = 0;
          p.fpos++;
          if (p.fpos >= rfc) {
            p.fpos = 0;
          }
        }
      } else {
        if (0 == p.ftg) {
          p.fx = 0;
          p.fy = 0;
          p.ftg = -1;
        }
      }
    }
    if (1 == p.dir) {
      p.ang -= ctx;
      if (0 > p.ang || p.ang >= pi2) {
        p.ang %= pi2;
      }
      if (0 > p.ang) {
        p.ang += pi2;
      }
      x = (p.wang - p.ang) % pi2;
      if (0 > x) {
        x += pi2;
      }
      if (x > Math.PI) {
        x -= pi2;
      }
      if (0 < x) {
        p.ang = p.wang;
        p.dir = 0;
      }
    } else {
      if (2 == p.dir) {
        p.ang += ctx;
        if (0 > p.ang || p.ang >= pi2) {
          p.ang %= pi2;
        }
        if (0 > p.ang) {
          p.ang += pi2;
        }
        x = (p.wang - p.ang) % pi2;
        if (0 > x) {
          x += pi2;
        }
        if (x > Math.PI) {
          x -= pi2;
        }
        if (0 > x) {
          p.ang = p.wang;
          p.dir = 0;
        }
      } else {
        p.ang = p.wang;
      }
    }
    p.xx += Math.cos(p.ang) * options;
    p.yy += Math.sin(p.ang) * options;
    p.gfr += vfr * p.gr;
    if (p.eaten) {
      if (1.5 != p.fr) {
        p.fr += vfr / 150;
        if (1.5 <= p.fr) {
          p.fr = 1.5;
        }
      }
      p.eaten_fr += vfr / 47;
      p.gfr += vfr;
      self = p.eaten_by;
      if (1 <= p.eaten_fr || !self) {
        preys.splice(i, 1);
      } else {
        p.eaten_fr4 = Math.pow(p.eaten_fr, 4);
        p.rad = 1 - Math.pow(p.eaten_fr, 3);
      }
    } else {
      if (1 != p.fr) {
        p.fr += vfr / 150;
        if (1 <= p.fr) {
          p.fr = 1;
          p.rad = 1;
        } else {
          p.rad = 0.5 * (1 - Math.cos(Math.PI * p.fr));
          p.rad += 0.66 * (0.5 * (1 - Math.cos(Math.PI * p.rad)) - p.rad);
        }
      }
    }
  }
  i = cm1 = foods_c - 1;
  for (;0 <= i;i--) {
    options = foods[i];
    options.gfr += vfr * options.gr;
    if (options.eaten) {
      if (1.5 != options.fr) {
        options.fr += vfr / 150;
        if (1.5 <= options.fr) {
          options.fr = 1.5;
        }
      }
      options.eaten_fr += vfr / 41;
      options.rad = 1 - Math.pow(options.eaten_fr, 3);
      self = options.eaten_by;
      if (1 <= options.eaten_fr || !self) {
        if (i == cm1) {
          foods[i] = null;
        } else {
          foods[i] = foods[cm1];
          foods[cm1] = null;
        }
        foods_c--;
        cm1--;
      } else {
        self = options.eaten_by;
        x = options.eaten_fr * options.eaten_fr;
        options.eaten_fr4 = x * x;
        options.rad = 1 - options.eaten_fr * x;
        options.rx = options.xx + (self.xx + self.fx + Math.cos(self.ang + self.fa) * (43 - 24 * x) * (1 - x) - options.xx) * x;
        options.ry = options.yy + (self.yy + self.fy + Math.sin(self.ang + self.fa) * (43 - 24 * x) * (1 - x) - options.yy) * x;
        options.rx += 6 * Math.cos(options.wsp * options.gfr) * (1 - options.eaten_fr);
        options.ry += 6 * Math.sin(options.wsp * options.gfr) * (1 - options.eaten_fr);
      }
    } else {
      if (1 != options.fr) {
        options.fr += options.rsp * vfr / 150;
        if (1 <= options.fr) {
          options.fr = 1;
          options.rad = 1;
        } else {
          options.rad = 0.5 * (1 - Math.cos(Math.PI * options.fr));
          options.rad += 0.66 * (0.5 * (1 - Math.cos(Math.PI * options.rad)) - options.rad);
        }
      }
      options.rx = options.xx;
      options.ry = options.yy;
      options.rx = options.xx + 6 * Math.cos(options.wsp * options.gfr);
      options.ry = options.yy + 6 * Math.sin(options.wsp * options.gfr);
    }
  }
  vfrb = vfr = 0;
  redraw();
  if (!no_raf) {
    raf(oef);
  }
};
var bgx = 0;
var bgy = 0;
var bgx2 = 0;
var bgy2 = 0;
var fgfr = 0;
var px;
var py;
var lpx;
var lpy;
var ax;
var ay;
var lax;
var lay;
var pax;
var pay;
var fx;
var fy;
var fs;
var maxp = 0;
var fps = 0;
var redraw = function() {
  fps++;
  var ctx = mc.getContext("2d");
  if (animating) {
    if (snake) {
      var i = 0.5 + 0.4 / Math.max(1, (snake.sct + 16) / 36);
      if (gsc != i) {
        if (gsc < i) {
          gsc += 2E-4;
          if (gsc >= i) {
            gsc = i;
          }
        } else {
          gsc -= 2E-4;
          if (gsc <= i) {
            gsc = i;
          }
        }
      }
    }
    i = view_xx;
    var self = view_yy;
    if (null != snake) {
      if (0 < fvtg) {
        fvtg--;
        fvx = fvxs[fvpos];
        fvy = fvys[fvpos];
        fvxs[fvpos] = 0;
        fvys[fvpos] = 0;
        fvpos++;
        if (fvpos >= vfc) {
          fvpos = 0;
        }
      }
      view_xx = snake.xx + snake.fx + fvx;
      view_yy = snake.yy + snake.fy + fvy;
      if (choosing_skin) {
        view_xx -= 104;
        gsc = 1;
      }
      view_ang = Math.atan2(view_yy - grd, view_xx - grd);
      view_dist = Math.sqrt((view_xx - grd) * (view_xx - grd) + (view_yy - grd) * (view_yy - grd));
      bpx1 = view_xx - (mww2 / gsc + 84);
      bpy1 = view_yy - (mhh2 / gsc + 84);
      bpx2 = view_xx + (mww2 / gsc + 84);
      bpy2 = view_yy + (mhh2 / gsc + 84);
      fpx1 = view_xx - (mww2 / gsc + 24);
      fpy1 = view_yy - (mhh2 / gsc + 24);
      fpx2 = view_xx + (mww2 / gsc + 24);
      fpy2 = view_yy + (mhh2 / gsc + 24);
    }
    bgx2 -= 1 * (view_xx - i) / bgw2;
    bgy2 -= 1 * (view_yy - self) / bgh2;
    bgx2 %= 1;
    if (0 > bgx2) {
      bgx2 += 1;
    }
    bgy2 %= 1;
    if (0 > bgy2) {
      bgy2 += 1;
    }
    if (ggbg && (high_quality || 0 < gla)) {
      ctx.save();
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, mww, mhh);
      ctx.globalAlpha = 0.3 * gla;
      ctx.drawImage(gbgmc, 0, 0);
      ctx.restore();
    } else {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, mww, mhh);
    }
    if (bgp2) {
      ctx.save();
      ctx.fillStyle = bgp2;
      ctx.translate(mww2, mhh2);
      ctx.scale(gsc, gsc);
      ctx.translate(bgx2 * bgw2, bgy2 * bgh2);
      ctx.globalAlpha = 0.4 + 0.6 * (1 - gla);
      ctx.fillRect(3 * -mww / gsc, 3 * -mhh / gsc, 5 * mww / gsc, 5 * mhh / gsc);
      if (high_quality || 0 < gla) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.4 * gla;
        ctx.fillRect(3 * -mww / gsc, 3 * -mhh / gsc, 5 * mww / gsc, 5 * mhh / gsc);
      }
      ctx.restore();
    }
    if (testing) {
      i = sectors.length - 1;
      for (;0 <= i;i--) {
        self = sectors[i];
        ctx.fillStyle = "rgba(0, 255, 0, .1)";
        ctx.fillRect(mww2 + (self.xx * sector_size - view_xx) * gsc, mhh2 + (self.yy * sector_size - view_yy) * gsc, sector_size * gsc - 4, sector_size * gsc - 4);
      }
    }
    if (high_quality || 0 < gla) {
      var opts = 1.75;
      if (1 != gla) {
        opts = 1.75 * gla;
      }
      ctx.save();
      i = foods_c - 1;
      for (;0 <= i;i--) {
        self = foods[i];
        if (self.rx >= fpx1) {
          if (self.ry >= fpy1) {
            if (self.rx <= fpx2) {
              if (self.ry <= fpy2) {
                if (1 == self.rad) {
                  dx = mww2 + gsc * (self.rx - view_xx) - self.ofw2;
                  top = mhh2 + gsc * (self.ry - view_yy) - self.ofh2;
                  if (-50 <= dx) {
                    if (-50 <= top) {
                      if (dx <= mwwp50) {
                        if (top <= mhhp50) {
                          ctx.globalAlpha = opts * self.fr;
                          ctx.drawImage(self.ofi, dx, top);
                        }
                      }
                    }
                  }
                } else {
                  dx = mww2 + gsc * (self.rx - view_xx) - self.ofw2 * self.rad;
                  top = mhh2 + gsc * (self.ry - view_yy) - self.ofh2 * self.rad;
                  if (-50 <= dx) {
                    if (-50 <= top) {
                      if (dx <= mwwp50) {
                        if (top <= mhhp50) {
                          ctx.globalAlpha = opts * self.fr;
                          ctx.drawImage(self.ofi, 0, 0, self.ofw, self.ofh, dx, top, self.ofw * self.rad, self.ofh * self.rad);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      ctx.restore();
    }
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    if (high_quality || 0 < gla) {
      opts = 0.75;
      if (1 != gla) {
        opts = 0.75 * gla;
      }
      var mouseY = 0.75;
      if (1 != gla) {
        mouseY = 1 - 0.25 * gla;
      }
      i = foods_c - 1;
      for (;0 <= i;i--) {
        self = foods[i];
        if (self.rx >= fpx1) {
          if (self.ry >= fpy1) {
            if (self.rx <= fpx2) {
              if (self.ry <= fpy2) {
                if (1 == self.rad) {
                  dx = mww2 + gsc * (self.rx - view_xx) - self.fw2;
                  top = mhh2 + gsc * (self.ry - view_yy) - self.fh2;
                  if (-50 <= dx) {
                    if (-50 <= top) {
                      if (dx <= mwwp50) {
                        if (top <= mhhp50) {
                          ctx.globalAlpha = mouseY * self.fr;
                          ctx.drawImage(self.fi, dx, top);
                          ctx.globalAlpha = opts * (0.5 + 0.5 * Math.cos(self.gfr / 13)) * self.fr;
                          ctx.drawImage(self.fi, dx, top);
                        }
                      }
                    }
                  }
                } else {
                  dx = mww2 + gsc * (self.rx - view_xx) - self.fw2 * self.rad;
                  top = mhh2 + gsc * (self.ry - view_yy) - self.fh2 * self.rad;
                  if (-50 <= dx) {
                    if (-50 <= top) {
                      if (dx <= mwwp50) {
                        if (top <= mhhp50) {
                          ctx.globalAlpha = mouseY * self.fr;
                          ctx.drawImage(self.fi, 0, 0, self.fw, self.fh, dx, top, self.fw * self.rad, self.fh * self.rad);
                          ctx.globalAlpha = opts * (0.5 + 0.5 * Math.cos(self.gfr / 13)) * self.fr;
                          ctx.drawImage(self.fi, 0, 0, self.fw, self.fh, dx, top, self.fw * self.rad, self.fh * self.rad);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      i = foods_c - 1;
      for (;0 <= i;i--) {
        self = foods[i];
        if (self.rx >= fpx1) {
          if (self.ry >= fpy1) {
            if (self.rx <= fpx2) {
              if (self.ry <= fpy2) {
                if (1 == self.rad) {
                  dx = mww2 + gsc * (self.rx - view_xx) - self.fw2;
                  top = mhh2 + gsc * (self.ry - view_yy) - self.fh2;
                  if (-50 <= dx) {
                    if (-50 <= top) {
                      if (dx <= mwwp50) {
                        if (top <= mhhp50) {
                          ctx.globalAlpha = self.fr;
                          ctx.drawImage(self.fi, dx, top);
                        }
                      }
                    }
                  }
                } else {
                  dx = mww2 + gsc * (self.rx - view_xx) - self.fw2 * self.rad;
                  top = mhh2 + gsc * (self.ry - view_yy) - self.fh2 * self.rad;
                  if (-50 <= dx) {
                    if (-50 <= top) {
                      if (dx <= mwwp50) {
                        if (top <= mhhp50) {
                          ctx.globalAlpha = self.fr;
                          ctx.drawImage(self.fi, 0, 0, self.fw, self.fh, dx, top, self.fw * self.rad, self.fh * self.rad);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    i = preys.length - 1;
    for (;0 <= i;i--) {
      if (opts = preys[i], d = opts.xx + opts.fx, y = opts.yy + opts.fy, px = mww2 + gsc * (d - view_xx), py = mhh2 + gsc * (y - view_yy), -50 <= px && (-50 <= py && (px <= mwwp50 && py <= mhhp50))) {
        if (opts.eaten) {
          self = opts.eaten_by;
          var c = Math.pow(opts.eaten_fr, 2);
          var d = d + (self.xx + self.fx + Math.cos(self.ang + self.fa) * (43 - 24 * c) * (1 - c) - d) * c;
          var y = y + (self.yy + self.fy + Math.sin(self.ang + self.fa) * (43 - 24 * c) * (1 - c) - y) * c;
          px = mww2 + gsc * (d - view_xx);
          py = mhh2 + gsc * (y - view_yy);
        }
        if (1 == opts.rad) {
          dx = px - opts.fw2;
          top = py - opts.fh2;
          ctx.globalAlpha = 0.75 * opts.fr;
          ctx.drawImage(opts.fi, dx, top);
          ctx.globalAlpha = 0.75 * (0.5 + 0.5 * Math.cos(opts.gfr / 13)) * opts.fr;
          ctx.drawImage(opts.fi, dx, top);
        } else {
          dx = px - opts.fw2 * opts.rad;
          top = py - opts.fh2 * opts.rad;
          ctx.globalAlpha = 0.75 * opts.fr;
          ctx.drawImage(opts.fi, 0, 0, opts.fw, opts.fh, dx, top, opts.fw * opts.rad, opts.fh * opts.rad);
          ctx.globalAlpha = 0.75 * (0.5 + 0.5 * Math.cos(opts.gfr / 13)) * opts.fr;
          ctx.drawImage(opts.fi, 0, 0, opts.fw, opts.fh, dx, top, opts.fw * opts.rad, opts.fh * opts.rad);
        }
      }
    }
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#90C098";
    var angle;
    i = snakes.length - 1;
    for (;0 <= i;i--) {
      self = snakes[i];
      d = self.xx + self.fx;
      y = self.yy + self.fy + 40;
      if (0 < self.na) {
        if (d >= bpx1 - 100) {
          if (y >= bpy1) {
            if (d <= bpx2 + 100) {
              if (y <= bpy2) {
                if (self == snake) {
                  self.fnfr++;
                  if (200 < self.fnfr) {
                    self.na -= 0.004;
                    if (0 > self.na) {
                      self.na = 0;
                    }
                  }
                }
                ctx.save();
                ctx.globalAlpha = 0.5 * self.na * self.alive_amt * (1 - self.dead_amt);
                ctx.font = "12px Arial, Helvetica Neue, Helvetica, sans-serif";
                ctx.fillStyle = self.csw;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                opts = self.xx + self.fx;
                mouseY = self.yy + self.fy;
                opts = mww2 + (opts - view_xx) * gsc;
                mouseY = mhh2 + (mouseY - view_yy) * gsc;
                ctx.fillText(self.nk, opts, mouseY + 32 + 11 * self.sc * gsc);
                ctx.restore();
              }
            }
          }
        }
      }
    }
    i = snakes.length - 1;
    for (;0 <= i;i--) {
      self = snakes[i];
      self.iiv = false;
      a = self.pts.length - 1;
      for (;0 <= a;a--) {
        if (d = self.pts[a], px = d.xx + d.fx, py = d.yy + d.fy, px >= bpx1 && (py >= bpy1 && (px <= bpx2 && py <= bpy2))) {
          self.iiv = true;
          break;
        }
      }
    }
    i = snakes.length - 1;
    for (;0 <= i;i--) {
      if (self = snakes[i], self.iiv) {
        opts = self.xx + self.fx;
        mouseY = self.yy + self.fy;
        px = opts;
        py = mouseY;
        angle = self.ehang;
        var ratio = self.sc;
        var size = 29 * ratio;
        var alpha = self.cfl;
        d = self.pts[self.pts.length - 1];
        if (1 == render_mode) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(mww2 + (px - view_xx) * gsc, mhh2 + (py - view_yy) * gsc);
          y = false;
          var a = self.pts.length - 1;
          for (;0 <= a;a--) {
            d = self.pts[a];
            lpx = px;
            lpy = py;
            px = d.xx;
            py = d.yy;
            var dx = d.fx;
            var top = d.fy;
            if (0 < alpha) {
              px += dx;
              py += top;
              lax = ax;
              lay = ay;
              ax = (px + lpx) / 2;
              ay = (py + lpy) / 2;
              if (!y) {
                lax = ax;
                lay = ay;
              }
              if (1 > alpha) {
                c = 1 - alpha;
                lpx += (lax - lpx) * c;
                lpy += (lay - lpy) * c;
                ax += (lax - ax) * c;
                ay += (lay - ay) * c;
              }
              if (y) {
                alpha--;
              } else {
                alpha -= self.chl + self.fchl;
              }
              if (y) {
                ctx.quadraticCurveTo(mww2 + (lpx - view_xx) * gsc, mhh2 + (lpy - view_yy) * gsc, mww2 + (ax - view_xx) * gsc, mhh2 + (ay - view_yy) * gsc);
              } else {
                ctx.lineTo(mww2 + (ax - view_xx) * gsc, mhh2 + (ay - view_yy) * gsc);
                y = true;
              }
            }
          }
          ctx.save();
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          if (is_firefox) {
            if (self.sp > self.fsp) {
              a = self.alive_amt * (1 - self.dead_amt) * Math.max(0, Math.min(1, (self.sp - self.ssp) / (self.msp - self.ssp)));
              ctx.save();
              ctx.strokeStyle = self.cs;
              ctx.globalAlpha = 0.3 * a;
              ctx.lineWidth = (size + 6) * gsc;
              ctx.stroke();
              ctx.lineWidth = (size + 9) * gsc;
              ctx.stroke();
              ctx.lineWidth = (size + 12) * gsc;
              ctx.stroke();
              ctx.restore();
            }
            ctx.globalAlpha = 1 * self.alive_amt * (1 - self.dead_amt);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = (size + 5) * gsc;
          } else {
            if (self.sp > self.fsp) {
              a = self.alive_amt * (1 - self.dead_amt) * Math.max(0, Math.min(1, (self.sp - self.ssp) / (self.msp - self.ssp)));
              ctx.save();
              ctx.lineWidth = (size - 2) * gsc;
              ctx.shadowBlur = 30 * gsc;
              ctx.shadowColor = "rgba(" + self.rr + "," + self.gg + "," + self.bb + ", " + Math.round(1E4 * a) / 1E4 + ")";
              ctx.stroke();
              ctx.stroke();
              ctx.restore();
            }
            ctx.globalAlpha = 0.4 * self.alive_amt * (1 - self.dead_amt);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = (size + 5) * gsc;
            ctx.stroke();
            ctx.strokeStyle = self.cs;
            ctx.lineWidth = size * gsc;
            ctx.strokeStyle = "#000000";
            ctx.globalAlpha = 1 * self.alive_amt * (1 - self.dead_amt);
          }
          ctx.stroke();
          ctx.strokeStyle = self.cs;
          ctx.globalAlpha = 0.8 * self.alive_amt * (1 - self.dead_amt);
          ctx.lineWidth = size * gsc;
          ctx.stroke();
          ctx.restore();
          ctx.strokeStyle = self.cs;
          if (self.dead) {
            top = (0.5 + 0.5 * Math.abs(Math.sin(5 * Math.PI * self.dead_amt))) * Math.sin(Math.PI * self.dead_amt);
            ctx.save();
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.globalCompositeOperation = "lighter";
            ctx.lineWidth = (size - 3) * gsc;
            ctx.globalAlpha = top;
            ctx.strokeStyle = "#FFCC99";
            ctx.stroke();
            ctx.restore();
          }
          ctx.restore();
        }
        if (2 == render_mode) {
          size = 0.5 * size;
          var b;
          var y2;
          var prevData;
          var origin;
          var oY;
          var x;
          var offset;
          var min;
          dx = 0;
          px = opts;
          py = mouseY;
          oY = px;
          x = py;
          if (oY >= bpx1 && (x >= bpy1 && (oY <= bpx2 && x <= bpy2))) {
            pbx[0] = oY;
            pby[0] = x;
            pba[0] = Math.atan2(mouseY - (d.yy + d.fy), opts - (d.xx + d.fx)) + Math.PI;
            pbu[0] = 1;
          } else {
            pbu[0] = 0;
          }
          dx = 1;
          n = (self.chl + self.fchl) % 0.25;
          if (0 > n) {
            n += 0.25;
          }
          n = 0.25 - n;
          alpha += 1 - 0.25 * Math.ceil((self.chl + self.fchl) / 0.25);
          ax = px;
          ay = py;
          if (self.sep != self.wsep) {
            if (self.sep < self.wsep) {
              self.sep += 0.01;
              if (self.sep >= self.wsep) {
                self.sep = self.wsep;
              }
            } else {
              if (self.sep > self.wsep) {
                self.sep -= 0.01;
                if (self.sep <= self.wsep) {
                  self.sep = self.wsep;
                }
              }
            }
          }
          var width = self.sep * qsm;
          var r = 0;
          top = per_color_imgs[self.cv].kmcs;
          var scale;
          var tileWidth;
          a = self.pts.length - 1;
          for (;0 <= a;a--) {
            if (d = self.pts[a], lpx = px, lpy = py, px = d.xx + d.fx, py = d.yy + d.fy, -0.25 < alpha) {
              prevData = oY;
              origin = x;
              oY = (px + lpx) / 2;
              x = (py + lpy) / 2;
              offset = lpx;
              min = lpy;
              c = 0;
              for (;1 > c;c += 0.25) {
                scale = n + c;
                d = prevData + (offset - prevData) * scale;
                y = origin + (min - origin) * scale;
                b = offset + (oY - offset) * scale;
                y2 = min + (x - min) * scale;
                lax = ax;
                lay = ay;
                ax = d + (b - d) * scale;
                ay = y + (y2 - y) * scale;
                if (0 > alpha) {
                  ax += -(lax - ax) * alpha / 0.25;
                  ay += -(lay - ay) * alpha / 0.25;
                }
                b = Math.sqrt(Math.pow(ax - lax, 2) + Math.pow(ay - lay, 2));
                if (r + b < width) {
                  r += b;
                } else {
                  r = -r;
                  scale = (b - r) / width;
                  for (;1 <= scale;scale--) {
                    r += width;
                    pax = lax + (ax - lax) * r / b;
                    pay = lay + (ay - lay) * r / b;
                    if (pax >= bpx1 && (pay >= bpy1 && (pax <= bpx2 && pay <= bpy2))) {
                      pbx[dx] = pax;
                      pby[dx] = pay;
                      pbu[dx] = 1;
                      d = ax - lax;
                      y = ay - lay;
                      pba[dx] = -15 <= d && (-15 <= y && (15 > d && 15 > y)) ? at2lt[8 * y + 128 << 8 | 8 * d + 128] : -127 <= d && (-127 <= y && (127 > d && 127 > y)) ? at2lt[y + 128 << 8 | d + 128] : Math.atan2(y, d);
                    } else {
                      pbu[dx] = 0;
                    }
                    dx++;
                  }
                  r = b - r;
                }
                if (1 > alpha && (alpha -= 0.25, -0.25 >= alpha)) {
                  break;
                }
              }
              if (1 <= alpha) {
                alpha--;
              }
            }
          }
          if (ax >= bpx1 && (ay >= bpy1 && (ax <= bpx2 && ay <= bpy2))) {
            pbu[dx] = 1;
            pbx[dx] = ax;
            pby[dx] = ay;
            pba[dx] = Math.atan2(ay - lay, ax - lax);
          } else {
            pbu[dx] = 0;
          }
          dx++;
          ctx.save();
          ctx.translate(mww2, mhh2);
          c = gsc * size * 52 / 32;
          oY = gsc * size * 62 / 32;
          alpha = self.alive_amt * (1 - self.dead_amt);
          alpha *= alpha;
          scale = 1;
          if (self.tsp > self.fsp) {
            scale = self.alive_amt * (1 - self.dead_amt) * Math.max(0, Math.min(1, (self.tsp - self.ssp) / (self.msp - self.ssp)));
            tileWidth = 0.37 * scale;
            y = Math.pow(scale, 0.5);
            r = gsc * size * (1 + 0.9375 * y);
            d = per_color_imgs[self.cv].kfmc;
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            if (self.rbcs) {
              x = self.rbcs;
              width = x.length;
              a = dx - 1;
              for (;0 <= a;a--) {
                if (1 == pbu[a]) {
                  px = pbx[a];
                  py = pby[a];
                  d = per_color_imgs[x[a % width]];
                  d = d.kfmc;
                  ctx.save();
                  ctx.globalAlpha = alpha * y * 0.38 * (0.6 + 0.4 * Math.cos(a / 4 - 1.15 * self.sfr));
                  ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                  ctx.drawImage(d, -r, -r, 2 * r, 2 * r);
                  ctx.restore();
                }
              }
            } else {
              a = dx - 1;
              for (;0 <= a;a--) {
                if (1 == pbu[a]) {
                  px = pbx[a];
                  py = pby[a];
                  ctx.save();
                  ctx.globalAlpha = alpha * y * 0.38 * (0.6 + 0.4 * Math.cos(a / 4 - 1.15 * self.sfr));
                  ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                  ctx.drawImage(d, -r, -r, 2 * r, 2 * r);
                  ctx.restore();
                }
              }
            }
            ctx.restore();
            scale = 1 - scale;
          }
          scale *= alpha;
          if (high_quality || 0 < gla) {
            d = scale;
            if (1 != gla) {
              d = scale * gla;
            }
            ctx.globalAlpha = d;
            a = dx - 1;
            for (;0 <= a;a--) {
              if (1 == pbu[a]) {
                px = pbx[a];
                py = pby[a];
                ctx.save();
                ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                ctx.drawImage(komc, -c, -c, 2 * c, 2 * c);
                if (9 > a) {
                  ctx.globalAlpha = d * (1 - a / 9);
                  ctx.drawImage(ksmc, -oY, -oY, 2 * oY, 2 * oY);
                  ctx.globalAlpha = d;
                }
                ctx.restore();
              }
            }
          }
          ctx.globalAlpha = scale;
          if (self.rbcs) {
            x = self.rbcs;
            width = x.length;
            a = dx - 1;
            for (;0 <= a;a--) {
              if (1 == pbu[a]) {
                px = pbx[a];
                py = pby[a];
                if (2 <= a) {
                  c = a - 2;
                  if (1 == pbu[c]) {
                    d = pbx[c];
                    y = pby[c];
                    ctx.save();
                    ctx.translate((d - view_xx) * gsc, (y - view_yy) * gsc);
                    ctx.globalAlpha = 9 > c ? c / 9 * scale : scale;
                    ctx.drawImage(ksmc, -oY, -oY, 2 * oY, 2 * oY);
                    ctx.restore();
                  }
                }
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                ctx.rotate(pba[a]);
                c = a % (2 * top.length);
                if (c >= top.length) {
                  c = 2 * top.length - (c + 1);
                }
                d = per_color_imgs[x[a % width]];
                ctx.drawImage(d.kmcs[c], -gsc * size, -gsc * size, 2 * gsc * size, 2 * gsc * size);
                ctx.restore();
              }
            }
            if (self.tsp > self.fsp && (high_quality || 0 < gla)) {
              ctx.save();
              ctx.globalCompositeOperation = "lighter";
              a = dx - 1;
              for (;0 <= a;a--) {
                if (1 == pbu[a]) {
                  px = pbx[a];
                  py = pby[a];
                  ctx.save();
                  ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                  ctx.rotate(pba[a]);
                  ctx.globalAlpha = alpha * tileWidth * gla * (0.5 + 0.5 * Math.cos(a / 4 - self.sfr));
                  c = a % (2 * top.length);
                  if (c >= top.length) {
                    c = 2 * top.length - (c + 1);
                  }
                  ctx.drawImage(per_color_imgs[x[a % width]].kmcs[c], -gsc * size, -gsc * size, 2 * gsc * size, 2 * gsc * size);
                  ctx.restore();
                }
              }
              ctx.restore();
            }
          } else {
            a = dx - 1;
            for (;0 <= a;a--) {
              if (1 == pbu[a]) {
                px = pbx[a];
                py = pby[a];
                if (2 <= a) {
                  c = a - 2;
                  if (1 == pbu[c]) {
                    d = pbx[c];
                    y = pby[c];
                    ctx.save();
                    ctx.translate((d - view_xx) * gsc, (y - view_yy) * gsc);
                    ctx.globalAlpha = 9 > c ? c / 9 * scale : scale;
                    ctx.drawImage(ksmc, -oY, -oY, 2 * oY, 2 * oY);
                    ctx.restore();
                  }
                }
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                ctx.rotate(pba[a]);
                c = a % (2 * top.length);
                if (c >= top.length) {
                  c = 2 * top.length - (c + 1);
                }
                ctx.drawImage(top[c], -gsc * size, -gsc * size, 2 * gsc * size, 2 * gsc * size);
                ctx.restore();
              }
            }
            if (self.tsp > self.fsp && (high_quality || 0 < gla)) {
              ctx.save();
              ctx.globalCompositeOperation = "lighter";
              a = dx - 1;
              for (;0 <= a;a--) {
                if (1 == pbu[a]) {
                  px = pbx[a];
                  py = pby[a];
                  c = a % (2 * top.length);
                  if (c >= top.length) {
                    c = 2 * top.length - (c + 1);
                  }
                  ctx.save();
                  ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                  ctx.rotate(pba[a]);
                  ctx.globalAlpha = alpha * tileWidth * gla * (0.5 + 0.5 * Math.cos(a / 4 - self.sfr));
                  ctx.drawImage(top[c], -gsc * size, -gsc * size, 2 * gsc * size, 2 * gsc * size);
                  ctx.restore();
                }
              }
              ctx.restore();
            }
          }
          if (self.antenna && (2 <= dx && 1 == pbu[1])) {
            self.atx[0] = pbx[1];
            self.aty[0] = pby[1];
            scale = self.sc * gsc;
            fj = self.atx.length - 1;
            if (choosing_skin) {
              a = 1;
              for (;a <= fj;a++) {
                self.atvx[a] -= 0.3;
                self.atvy[a] += 0.14 * Math.cos(fr / 23 - 7 * a / fj);
              }
            }
            a = 1;
            for (;a <= fj;a++) {
              xx = self.atx[a - 1];
              yy = self.aty[a - 1];
              xx += 2 * Math.random() - 1;
              yy += 2 * Math.random() - 1;
              d = self.atx[a] - xx;
              y = self.aty[a] - yy;
              ang = -4 <= d && (-4 <= y && (4 > d && 4 > y)) ? at2lt[32 * y + 128 << 8 | 32 * d + 128] : -8 <= d && (-8 <= y && (8 > d && 8 > y)) ? at2lt[16 * y + 128 << 8 | 16 * d + 128] : -16 <= d && (-16 <= y && (16 > d && 16 > y)) ? at2lt[8 * y + 128 << 8 | 8 * d + 128] : -127 <= d && (-127 <= y && (127 > d && 127 > y)) ? at2lt[y + 128 << 8 | d + 128] : Math.atan2(y, d);
              xx += 4 * Math.cos(ang) * self.sc;
              yy += 4 * Math.sin(ang) * self.sc;
              self.atvx[a] += 0.1 * (xx - self.atx[a]);
              self.atvy[a] += 0.1 * (yy - self.aty[a]);
              self.atx[a] += self.atvx[a];
              self.aty[a] += self.atvy[a];
              self.atvx[a] *= 0.88;
              self.atvy[a] *= 0.88;
              d = self.atx[a] - self.atx[a - 1];
              y = self.aty[a] - self.aty[a - 1];
              b = Math.sqrt(d * d + y * y);
              if (b > 4 * self.sc) {
                ang = -4 <= d && (-4 <= y && (4 > d && 4 > y)) ? at2lt[32 * y + 128 << 8 | 32 * d + 128] : -8 <= d && (-8 <= y && (8 > d && 8 > y)) ? at2lt[16 * y + 128 << 8 | 16 * d + 128] : -16 <= d && (-16 <= y && (16 > d && 16 > y)) ? at2lt[8 * y + 128 << 8 | 8 * d + 128] : -127 <= d && (-127 <= y && (127 > d && 127 > y)) ? at2lt[y + 128 << 8 | d + 128] : Math.atan2(y, d);
                self.atx[a] = self.atx[a - 1] + 4 * Math.cos(ang) * self.sc;
                self.aty[a] = self.aty[a - 1] + 4 * Math.sin(ang) * self.sc;
              }
            }
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = self.atc1;
            ctx.lineWidth = 5 * scale;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();
            fj = self.atx.length - 1;
            d = (self.atx[fj] - view_xx) * gsc;
            y = (self.aty[fj] - view_yy) * gsc;
            ctx.moveTo(d, y);
            a = fj - 1;
            for (;1 <= a;a--) {
              xx = (self.atx[a] - view_xx) * gsc;
              yy = (self.aty[a] - view_yy) * gsc;
              if (1 <= Math.abs(xx - d) + Math.abs(yy - y)) {
                d = xx;
                y = yy;
                ctx.lineTo(d, y);
              }
            }
            xx = (0.5 * (self.atx[1] + self.atx[0]) - view_xx) * gsc;
            yy = (0.5 * (self.aty[1] + self.aty[0]) - view_yy) * gsc;
            if (1 <= Math.abs(xx - d) + Math.abs(yy - y)) {
              d = xx;
              y = yy;
              ctx.lineTo(d, y);
            }
            ctx.stroke();
            ctx.globalAlpha = self.atia * alpha;
            ctx.strokeStyle = self.atc2;
            ctx.lineWidth = 4 * scale;
            ctx.beginPath();
            fj = self.atx.length - 1;
            d = (self.atx[fj] - view_xx) * gsc;
            y = (self.aty[fj] - view_yy) * gsc;
            ctx.moveTo(d, y);
            a = fj - 1;
            for (;0 <= a;a--) {
              xx = (self.atx[a] - view_xx) * gsc;
              yy = (self.aty[a] - view_yy) * gsc;
              if (1 <= Math.abs(xx - d) + Math.abs(yy - y)) {
                d = xx;
                y = yy;
                ctx.lineTo(d, y);
              }
            }
            ctx.stroke();
            if (self.atwg) {
              ctx.lineWidth = 3 * scale;
              ctx.stroke();
              ctx.lineWidth = 2 * scale;
              ctx.stroke();
            }
            ctx.globalAlpha = alpha * self.blba;
            if (self.abrot) {
              ctx.save();
              ctx.translate((self.atx[fj] - view_xx) * gsc, (self.aty[fj] - view_yy) * gsc);
              vang = Math.atan2(self.aty[fj] - self.aty[fj - 1], self.atx[fj] - self.atx[fj - 1]) - self.atba;
              if (0 > vang || vang >= pi2) {
                vang %= pi2;
              }
              if (vang < -Math.PI) {
                vang += pi2;
              } else {
                if (vang > Math.PI) {
                  vang -= pi2;
                }
              }
              self.atba = (self.atba + 0.15 * vang) % pi2;
              ctx.rotate(self.atba);
              ctx.drawImage(self.bulb, self.blbx * self.bsc * scale, self.blby * self.bsc * scale, self.blbw * self.bsc * scale, self.blbh * self.bsc * scale);
              ctx.restore();
            } else {
              ctx.drawImage(self.bulb, (self.atx[fj] - view_xx + self.blbx * self.bsc * self.sc) * gsc, (self.aty[fj] - view_yy + self.blby * self.bsc * self.sc) * gsc, self.blbw * self.bsc * scale, self.blbh * self.bsc * scale);
            }
            if (self.apbs) {
              ctx.globalAlpha = 0.5 * alpha;
              ctx.lineWidth = 3 * scale;
              ctx.stroke();
              ctx.lineWidth = 2 * scale;
              ctx.stroke();
            }
          }
          if (self.dead) {
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            top = (0.15 + 0.15 * Math.abs(Math.sin(5 * Math.PI * self.dead_amt))) * Math.sin(Math.PI * self.dead_amt);
            size *= gsc;
            a = dx - 1;
            for (;0 <= a;a--) {
              if (1 == pbu[a]) {
                px = pbx[a];
                py = pby[a];
                ctx.save();
                ctx.globalAlpha = top * (0.6 + 0.4 * Math.cos(a / 4 - 15 * self.dead_amt));
                ctx.translate((px - view_xx) * gsc, (py - view_yy) * gsc);
                ctx.drawImage(kdmc, -size, -size, 2 * size, 2 * size);
                ctx.restore();
              }
            }
            ctx.restore();
          }
          ctx.restore();
        }
        a = 1 == render_mode ? 4 * ratio : 6 * ratio;
        size = 6 * ratio;
        dx = Math.cos(angle) * a + Math.cos(angle - Math.PI / 2) * (size + 0.5);
        top = Math.sin(angle) * a + Math.sin(angle - Math.PI / 2) * (size + 0.5);
        ctx.fillStyle = self.ec;
        ctx.globalAlpha = self.eca * self.alive_amt;
        ctx.beginPath();
        ctx.arc(mww2 + (dx + opts - view_xx) * gsc, mhh2 + (top + mouseY - view_yy) * gsc, self.er * ratio * gsc, 0, pi2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = self.ppa;
        dx = Math.cos(angle) * (a + 0.5) + self.rex * ratio + Math.cos(angle - Math.PI / 2) * size;
        top = Math.sin(angle) * (a + 0.5) + self.rey * ratio + Math.sin(angle - Math.PI / 2) * size;
        ctx.fillStyle = self.ppc;
        ctx.beginPath();
        ctx.arc(mww2 + (dx + opts - view_xx) * gsc, mhh2 + (top + mouseY - view_yy) * gsc, 3.5 * ratio * gsc, 0, pi2);
        ctx.closePath();
        ctx.fill();
        dx = Math.cos(angle) * a + Math.cos(angle + Math.PI / 2) * (size + 0.5);
        top = Math.sin(angle) * a + Math.sin(angle + Math.PI / 2) * (size + 0.5);
        ctx.fillStyle = self.ec;
        ctx.globalAlpha = self.eca * self.alive_amt;
        ctx.beginPath();
        ctx.arc(mww2 + (dx + opts - view_xx) * gsc, mhh2 + (top + mouseY - view_yy) * gsc, self.er * ratio * gsc, 0, pi2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = self.ppa;
        dx = Math.cos(angle) * (a + 0.5) + self.rex * ratio + Math.cos(angle + Math.PI / 2) * size;
        top = Math.sin(angle) * (a + 0.5) + self.rey * ratio + Math.sin(angle + Math.PI / 2) * size;
        ctx.fillStyle = self.ppc;
        ctx.beginPath();
        ctx.arc(mww2 + (dx + opts - view_xx) * gsc, mhh2 + (top + mouseY - view_yy) * gsc, 3.5 * ratio * gsc, 0, pi2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    if (high_quality || 0 < gla) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      i = foods_c - 1;
      for (;0 <= i;i--) {
        self = foods[i];
        if (self.rx >= fpx1) {
          if (self.ry >= fpy1) {
            if (self.rx <= fpx2) {
              if (self.ry <= fpy2) {
                d = self.rx - view_xx;
                y = self.ry - view_yy;
                opts = d * d + y * y;
                fs = 1 + 0.06 * self.rad;
                dx = d * fs;
                top = y * fs;
                tileWidth = 0.005 + 0.09 * (1 - opts / (86E3 + opts));
                if (1 != self.rad) {
                  tileWidth *= Math.pow(self.rad, 0.25);
                }
                if (1 != gla) {
                  tileWidth *= gla;
                }
                dx = dx * gsc + mww2;
                top = top * gsc + mhh2;
                if (1 == self.rad) {
                  if (-150 <= dx) {
                    if (-150 <= top) {
                      if (dx <= mwwp150) {
                        if (top <= mhhp150) {
                          dx -= self.gfw2;
                          top -= self.gfh2;
                          ctx.globalAlpha = tileWidth * self.fr;
                          ctx.drawImage(self.gfi, dx, top);
                          ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(self.gfr / 13)) * self.fr;
                          ctx.drawImage(self.gfi, dx, top);
                        }
                      }
                    }
                  }
                } else {
                  if (-150 <= dx) {
                    if (-150 <= top) {
                      if (dx <= mwwp150) {
                        if (top <= mhhp150) {
                          dx -= self.gfw2 * self.rad;
                          top -= self.gfh2 * self.rad;
                          ctx.globalAlpha = tileWidth * self.fr;
                          ctx.drawImage(self.gfi, 0, 0, self.gfw, self.gfh, dx, top, self.gfw * self.rad, self.gfh * self.rad);
                          ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(self.gfr / 13)) * self.fr;
                          ctx.drawImage(self.gfi, 0, 0, self.gfw, self.gfh, dx, top, self.gfw * self.rad, self.gfh * self.rad);
                        }
                      }
                    }
                  }
                }
                fs = 1 + 0.32 * self.rad;
                dx = d * fs;
                top = y * fs;
                tileWidth = 0.085 * (1 - opts / (16500 + opts));
                if (1 != self.rad) {
                  tileWidth *= Math.pow(self.rad, 0.25);
                }
                if (1 != gla) {
                  tileWidth *= gla;
                }
                dx = dx * gsc + mww2;
                top = top * gsc + mhh2;
                if (1 == self.rad) {
                  if (-150 <= dx) {
                    if (-150 <= top) {
                      if (dx <= mwwp150) {
                        if (top <= mhhp150) {
                          dx -= self.g2fw2;
                          top -= self.g2fh2;
                          ctx.globalAlpha = tileWidth * self.fr;
                          ctx.drawImage(self.g2fi, dx, top);
                          ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(self.gfr / 13)) * self.fr;
                          ctx.drawImage(self.g2fi, dx, top);
                        }
                      }
                    }
                  }
                } else {
                  if (-150 <= dx) {
                    if (-150 <= top) {
                      if (dx <= mwwp150) {
                        if (top <= mhhp150) {
                          dx -= self.g2fw2 * self.rad;
                          top -= self.g2fh2 * self.rad;
                          ctx.globalAlpha = tileWidth * self.fr;
                          ctx.drawImage(self.g2fi, 0, 0, self.g2fw, self.g2fh, dx, top, self.g2fw * self.rad, self.g2fh * self.rad);
                          ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(self.gfr / 13)) * self.fr;
                          ctx.drawImage(self.g2fi, 0, 0, self.g2fw, self.g2fh, dx, top, self.g2fw * self.rad, self.g2fh * self.rad);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      ctx.restore();
    }
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    i = preys.length - 1;
    for (;0 <= i;i--) {
      opts = preys[i];
      d = opts.xx + opts.fx;
      y = opts.yy + opts.fy;
      if (opts.eaten) {
        self = opts.eaten_by;
        c = Math.pow(opts.eaten_fr, 2);
        d += (self.xx + self.fx + Math.cos(self.ang + self.fa) * (43 - 24 * c) * (1 - c) - d) * c;
        y += (self.yy + self.fy + Math.sin(self.ang + self.fa) * (43 - 24 * c) * (1 - c) - y) * c;
      }
      d -= view_xx;
      y -= view_yy;
      self = d * d + y * y;
      fs = 1 + 0.08 * opts.rad;
      px = d * fs;
      py = y * fs;
      tileWidth = 0.4 * (1 - self / (176E3 + self));
      if (1 != opts.rad) {
        tileWidth *= Math.pow(opts.rad, 0.25);
      }
      px = px * gsc + mww2;
      py = py * gsc + mhh2;
      if (1 == opts.rad) {
        if (-150 <= px) {
          if (-150 <= py) {
            if (px <= mwwp150) {
              if (py <= mhhp150) {
                px -= opts.gfw2;
                py -= opts.gfh2;
                ctx.globalAlpha = tileWidth * opts.fr;
                ctx.drawImage(opts.gfi, px, py);
                ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(opts.gfr / 13)) * opts.fr;
                ctx.drawImage(opts.gfi, px, py);
              }
            }
          }
        }
      } else {
        if (-150 <= px) {
          if (-150 <= py) {
            if (px <= mwwp150) {
              if (py <= mhhp150) {
                px -= opts.gfw2 * opts.rad;
                py -= opts.gfh2 * opts.rad;
                ctx.globalAlpha = tileWidth * opts.fr;
                ctx.drawImage(opts.gfi, 0, 0, opts.gfw, opts.gfh, px, py, opts.gfw * opts.rad, opts.gfh * opts.rad);
                ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(opts.gfr / 13)) * opts.fr;
                ctx.drawImage(opts.gfi, 0, 0, opts.gfw, opts.gfh, px, py, opts.gfw * opts.rad, opts.gfh * opts.rad);
              }
            }
          }
        }
      }
      fs = 1 + 0.32 * opts.rad;
      px = d * fs;
      py = y * fs;
      tileWidth = 0.35 * (1 - self / (46500 + self));
      if (1 != opts.rad) {
        tileWidth *= Math.pow(opts.rad, 0.25);
      }
      self = 2 * opts.rad;
      px = px * gsc + mww2;
      py = py * gsc + mhh2;
      if (-150 <= px) {
        if (-150 <= py) {
          if (px <= mwwp150) {
            if (py <= mhhp150) {
              px -= opts.gfw2 * self;
              py -= opts.gfh2 * self;
              ctx.globalAlpha = tileWidth * opts.fr;
              ctx.drawImage(opts.gfi, 0, 0, opts.gfw, opts.gfh, px, py, opts.gfw * self, opts.gfh * self);
              ctx.globalAlpha = tileWidth * (0.5 + 0.5 * Math.cos(opts.gfr / 13)) * opts.fr;
              ctx.drawImage(opts.gfi, 0, 0, opts.gfw, opts.gfh, px, py, opts.gfw * self, opts.gfh * self);
            }
          }
        }
      }
    }
    ctx.restore();
    if (4E3 > Math.abs(grd - view_dist)) {
      ctx.save();
      ctx.lineWidth = 23 * gsc;
      ctx.strokeStyle = "#800000";
      ctx.fillStyle = "#300000";
      ctx.beginPath();
      xx = grd + Math.cos(view_ang - 2E3 / grd) * grd * 0.98;
      yy = grd + Math.sin(view_ang - 2E3 / grd) * grd * 0.98;
      ctx.moveTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
      a = -2E3;
      for (;2E3 >= a;a += 100) {
        xx = grd + Math.cos(view_ang + a / grd) * grd * 0.98;
        yy = grd + Math.sin(view_ang + a / grd) * grd * 0.98;
        ctx.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
      }
      xx = grd + Math.cos(view_ang + 2E3 / grd) * (grd + 4E3);
      yy = grd + Math.sin(view_ang + 2E3 / grd) * (grd + 4E3);
      ctx.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
      xx = grd + Math.cos(view_ang - 2E3 / grd) * (grd + 4E3);
      yy = grd + Math.sin(view_ang - 2E3 / grd) * (grd + 4E3);
      ctx.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
    if (wumsts) {
      if (0 < rank) {
        if (0 < snake_count) {
          if (playing) {
            wumsts = false;
            self = "Your length";
            i = "of";
            tileWidth = "Your rank";
            if ("DE" == country) {
              self = "Deine L\u00e4nge";
              i = "von";
              tileWidth = "Dein rang";
            } else {
              if ("FR" == country) {
                self = "Votre longueur";
                i = "de";
                tileWidth = "Ton rang";
              } else {
                if ("BR" == country) {
                  self = "Seu comprimento";
                  i = "do";
                  tileWidth = "Seu classifica\u00e7\u00e3o";
                }
              }
            }
            self = "" + ('<span style="font-size: 14px;"><span style="opacity: .4;">' + self + ': </span><span style="opacity: .8; font-weight: bold;">' + Math.floor(150 * (fpsls[snake.sct] + snake.fam / fmlts[snake.sct] - 1) - 50) / 10 + "</span></span>");
            self += '<BR><span style="opacity: .3;">' + tileWidth + ': </span><span style="opacity: .35;">' + rank + '</span><span style="opacity: .3;"> ' + i + ' </span><span style="opacity: .35;">' + snake_count + "</span>";
            lbf.innerHTML = self;
          }
        }
      }
    }
    ctx.restore();
  }
};
var ww = window.innerWidth;
var hh = window.innerHeight;
var lww = 0;
var lhh = 0;
var csc;
var grd = 16384;
function resize() {
  ww = Math.ceil(window.innerWidth);
  hh = Math.ceil(window.innerHeight);
  if (ww != lww || hh != lhh) {
    lww = ww;
    lhh = hh;
    var w = 0;
    if (mbi) {
      var devicePixelRatio = ww / 1245;
      mbi.width = 1245 * devicePixelRatio;
      w = Math.ceil(260 * devicePixelRatio);
      mbi.height = w;
      hh -= w;
    }
    ww -= wsu;
    loch.style.bottom = 16 + w + "px";
    lbf.style.bottom = 4 + w + "px";
    lbh.style.right = 4 + wsu + "px";
    lbs.style.right = 4 + wsu + "px";
    lbn.style.right = 64 + wsu + "px";
    lbp.style.right = 230 + wsu + "px";
    loch.style.right = 16 + wsu + "px";
    plq.style.right = 10 + wsu + "px";
    clq.style.left = Math.floor(ww / 2 - 130) + "px";
    login.style.width = ww + "px";
    fbh.style.right = 30 + wsu + "px";
    twth.style.right = 130 + wsu + "px";
    cstx.style.right = 240 + wsu + "px";
    grqh.style.right = 20 + wsu + "px";
    pskh.style.left = Math.round(0.25 * ww - 44) + "px";
    nskh.style.left = Math.round(0.75 * ww - 44) + "px";
    skodiv.style.left = Math.round(ww / 2 - skodiv.offsetWidth / 2) + "px";
    skodiv.style.top = Math.round(hh / 2 + 120) + "px";
    pskh.style.top = Math.round(hh / 2 - 44) + "px";
    nskh.style.top = Math.round(hh / 2 - 44) + "px";
    ldmc.style.left = ww / 2 - 64 + "px";
    ldmc.style.top = hh / 2 - 64 + "px";
    devicePixelRatio = Math.sqrt(ww * ww + hh * hh);
    w = Math.ceil(1400 * ww / devicePixelRatio);
    var h = Math.ceil(1400 * hh / devicePixelRatio);
    if (1100 < w) {
      h = Math.ceil(1100 * h / w);
      w = 1100;
    }
    if (1100 < h) {
      w = Math.ceil(1100 * w / h);
      h = 1100;
    }
    lgbsc = 560 > hh ? Math.max(50, hh) / 560 : 1;
    devicePixelRatio = Math.round(lgbsc * lgcsc * 1E5) / 1E5;
    if (1 == devicePixelRatio) {
      trf(login, "");
      login.style.top = "0px";
    } else {
      login.style.top = -(Math.round(hh * (1 - lgbsc) * 1E5) / 1E5) + "px";
      trf(login, "scale(" + devicePixelRatio + "," + devicePixelRatio + ")");
    }
    if (mww != w || mhh != h) {
      mww = w;
      mhh = h;
      mc.width = mww;
      mc.height = mhh;
      mwwp50 = mww + 50;
      mhhp50 = mhh + 50;
      mwwp150 = mww + 150;
      mhhp150 = mhh + 150;
      mww2 = mww / 2;
      mhh2 = mhh / 2;
      rdgbg();
    }
    csc = Math.min(ww / mww, hh / mhh);
    trf(mc, "scale(" + csc + "," + csc + ")");
    mc.style.left = Math.floor(ww / 2 - mww / 2) + "px";
    mc.style.top = Math.floor(hh / 2 - mhh / 2) + "px";
  }
  nbg.style.width = ww + "px";
  nbg.style.height = hh + "px";
  redraw();
}
window.onresize = function() {
  resize();
};
i = ois.length - 1;
for (;0 <= i;i--) {
  ois[i].ii.src = ois[i].src;
}
if (0 == wic) {
  startAnimation();
}
//UPDATE - Disable the listener.
window.onmousemove = undefined /*function(e) {
  if (e = e || window.event) {
    if ("undefined" != typeof e.clientX) {
      xm = e.clientX - ww / 2;
      ym = e.clientY - hh / 2;
    }
  }
};*/
function setAcceleration(recurring) {
  if (null != snake) {
    snake.md = 1 == recurring;
    if (5 <= protocol_version) {
      var buf = new Uint8Array(1);
      buf[0] = 1 == recurring ? 253 : 254;
    } else {
      buf = new Uint8Array(2);
      buf[0] = 109;
      buf[1] = recurring;
    }
    ws.send(buf);
  }
}
window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};
window.ontouchmove = function(e) {
  dmutm = Date.now() + 1500;
  if (null != snake) {
    if (e = e || window.event) {
      e = e.touches[0];
      if ("undefined" != typeof e.clientX) {
        xm = e.clientX - ww / 2;
        ym = e.clientY - hh / 2;
      } else {
        xm = e.pageX - ww / 2;
        ym = e.pageY - hh / 2;
      }
    }
  }
};
var dmutm = 0;
var ltchx = -1;
var ltchy = -1;
var ltchmtm = -1;
window.ontouchstart = function(e) {
  dmutm = Date.now() + 1500;
  if (null != snake) {
    if (e = e || window.event) {
      var val1;
      var t1;
      t1 = e.touches[0];
      if ("undefined" != typeof t1.clientX) {
        val1 = t1.clientX - ww / 2;
        t1 = t1.clientY - hh / 2;
      } else {
        val1 = t1.pageX - ww / 2;
        t1 = t1.pageY - hh / 2;
      }
      var f = Date.now();
      if (24 > Math.abs(val1 - ltchx)) {
        if (24 > Math.abs(t1 - ltchy)) {
          if (400 > f - ltchmtm) {
            setAcceleration(1);
          }
        }
      }
      ltchx = val1;
      ltchy = t1;
      ltchmtm = f;
      xm = val1;
      ym = t1;
    }
    e.preventDefault();
  }
};
window.onmousedown = function(_e) {
  if (0 == dmutm || Date.now() > dmutm) {
    dmutm = 0;
    if (null != snake) {
      window.onmousemove(_e);
      setAcceleration(1);
      _e.preventDefault();
    }
  }
};
window.ontouchend = function() {
  setAcceleration(0);
};
function omu(dataAndEvents) {
  setAcceleration(0);
}
window.addEventListener("mouseup", omu);
var mscps = 0;
var fmlts = [];
var fpsls = [];
var etm = 0;
var ws = null;
var tcsecs = 0;
var trdps = 0;
var rdps = 0;
var rfps = 0;
var rnps = 0;
var rsps = 0;
var reps = 0;
var rdpspc = [];
var anguc = 0;
var angnuc = 0;
var wangnuc = 0;
var lrd_mtm = Date.now();
var locu_mtm = 0;
if (testing) {
  i = 0;
  for (;256 > i;i++) {
    rdpspc[i] = -1;
  }
}
var pfs = [];
var pft = 0;
var pf1 = 0;
var pf2 = 0;
var rpf1;
var rpf2;
var pf_nap = 0;
var pf_ep = 0;
var rpft = 0;
var pf;
i = 0;
for (;100 > i;i++) {
  pfs.push(0);
}
var pf_add = 0;
var pf_new_add = 0;
var pf_remove = 0;
var tpfa = new Float32Array(4E4);
i = 0;
for (;i < tpfa.length;i++) {
  tpfa[i] = 32 * Math.random();
}
var pfd;
if (testing) {
  pfd = document.createElement("div");
  pfd.style.position = "fixed";
  pfd.style.left = "4px";
  pfd.style.bottom = "69px";
  pfd.style.width = "170px";
  pfd.style.height = "364px";
  pfd.style.background = "rgba(0, 0, 0, .8)";
  pfd.style.color = "#80FF80";
  pfd.style.fontFamily = "Verdana";
  pfd.style.zIndex = 999999;
  pfd.style.fontSize = "11px";
  pfd.style.padding = "10px";
  pfd.style.borderRadius = "30px";
  pfd.textContent = "ayy lmao";
  document.body.appendChild(pfd);
}
function resetGame() {
  if (ws) {
    ws.close();
    ws = null;
  }
  snake = null;
  want_close_socket = false;
  snakes = [];
  foods = [];
  foods_c = 0;
  preys = [];
  sectors = [];
  os = {};
  rank = 0;
  best_rank = 999999999;
  biggest_snake_count = snake_count = 0;
  lagging = wfpr = playing = connected = false;
  j = vfc - 1;
  for (;0 <= j;j--) {
    fvxs[j] = 0;
    fvys[j] = 0;
  }
  fvy = fvx = fvtg = 0;
  lag_mult = 1;
  cptm = 0;
  gsc = sgsc;
}
var protocol_version = 2;
var connecting = false;
var start_connect_mtm;
var play_btn_click_mtm = -1;
var waiting_for_sos = false;
var sos_ready_after_mtm = -1;
function connect() {
  if (0 == sos.length) {
    if (!waiting_for_sos) {
      waiting_for_sos = true;
      sos_ready_after_mtm = -1;
    }
  } else {
    waiting_for_sos = false;
    sos_ready_after_mtm = -1;
    resetGame();
    connecting = true;
    start_connect_mtm = Date.now();
    if (!forcing) {
      var i = 0;
      for (;i < sos.length;i++) {
        sos[i].ptm = 9999999;
      }
      i = clus.length - 1;
      for (;0 <= i;i--) {
        var rs = clus[i];
        if (rs && 0 < rs.ptms.length) {
          var x = 0;
          var k = rs.ptms.length - 1;
          for (;0 <= k;k--) {
            x += rs.ptms[k];
          }
          x /= rs.ptms.length;
          if (testing) {
            console.log("cluster " + i + " ping time: " + x);
          }
          k = sos.length - 1;
          for (;0 <= k;k--) {
            if (sos[k].clu == i) {
              sos[k].ptm = x;
            }
          }
        }
      }
      if ("undefined" != typeof rmsos) {
        i = 0;
        for (;i < rmsos.length;i++) {
          rs = "." + rmsos[i].a[0] + "." + rmsos[i].a[1] + "." + rmsos[i].a[2];
          x = rmsos[i].a[3];
          k = sos.length - 1;
          for (;0 <= k;k--) {
            if (0 <= sos[k].ip.indexOf(rs)) {
              if (sos[k].po == x) {
                sos.splice(k, 1);
              }
            }
          }
        }
      }
      sos.sort(function(o, workout) {
        return parseFloat(o.po) - parseFloat(workout.po);
      });
      bso = sos[Math.floor(Math.random() * sos.length)];
      i = sos.length - 1;
      for (;0 <= i;i--) {
        if (!sos[i].tainted) {
          if (sos[i].ptm <= bso.ptm) {
            if (30 < sos[i].ac) {
              bso = sos[i];
            }
          }
        }
      }
    }
    ws = new WebSocket("ws://" + bso.ip + ":" + bso.po + "/slither");
    ws.binaryType = "arraybuffer";
    window.ws = ws;
    ws.onmessage = function(a) {
      if (ws == this && (a = new Uint8Array(a.data), rdps += a.length, 2 <= a.length)) {
        lptm = cptm;
        cptm = Date.now();
        var j = a[0] << 8 | a[1];
        var x = cptm - lptm;
        if (0 == lptm) {
          x = 0;
        }
        etm += x - j;
        if (testing) {
          rdpspc[a[2]] += a.length;
        }
        var v = String.fromCharCode(a[2]);
        j = 3;
        var data = a.length;
        x = a.length - 2;
        var s = a.length - 3;
        if ("a" == v) {
          connecting = false;
          playing = connected = true;
          play_btn_click_mtm = -1;
          grd = a[j] << 16 | a[j + 1] << 8 | a[j + 2];
          j += 3;
          x = a[j] << 8 | a[j + 1];
          j += 2;
          sector_size = a[j] << 8 | a[j + 1];
          j += 2;
          sector_count_along_edge = a[j] << 8 | a[j + 1];
          j += 2;
          spangdv = a[j] / 10;
          j++;
          nsp1 = (a[j] << 8 | a[j + 1]) / 100;
          j += 2;
          nsp2 = (a[j] << 8 | a[j + 1]) / 100;
          j += 2;
          nsp3 = (a[j] << 8 | a[j + 1]) / 100;
          j += 2;
          mamu = (a[j] << 8 | a[j + 1]) / 1E3;
          j += 2;
          mamu2 = (a[j] << 8 | a[j + 1]) / 1E3;
          j += 2;
          cst = (a[j] << 8 | a[j + 1]) / 1E3;
          j += 2;
          if (j < data) {
            protocol_version = a[j];
          }
          setMscps(x);
          lbh.style.display = "inline";
          lbs.style.display = "inline";
          lbn.style.display = "inline";
          lbp.style.display = "inline";
          lbf.style.display = "inline";
          vcm.style.display = "inline";
          loch.style.display = "inline";
          startShowGame();
        } else {
          if ("e" == v || ("E" == v || ("3" == v || ("4" == v || "5" == v)))) {
            var d = a[j] << 8 | a[j + 1];
            j = j + 2;
            var min = data = -1;
            var tagName = -1;
            var type = -1;
            if (6 <= protocol_version) {
              if (6 == x) {
                data = "e" == v ? 1 : 2;
                min = 2 * a[j] * Math.PI / 256;
                j++;
                tagName = 2 * a[j] * Math.PI / 256;
                j++;
                type = a[j] / 18;
              } else {
                if (5 == x) {
                  if ("e" == v) {
                    min = 2 * a[j] * Math.PI / 256;
                    j++;
                    type = a[j] / 18;
                  } else {
                    if ("E" == v) {
                      data = 1;
                      tagName = 2 * a[j] * Math.PI / 256;
                      j++;
                      type = a[j] / 18;
                    } else {
                      if ("4" == v) {
                        data = 2;
                        tagName = 2 * a[j] * Math.PI / 256;
                        j++;
                        type = a[j] / 18;
                      } else {
                        if ("3" == v) {
                          data = 1;
                          min = 2 * a[j] * Math.PI / 256;
                          j++;
                          tagName = 2 * a[j] * Math.PI / 256;
                        } else {
                          if ("5" == v) {
                            data = 2;
                            min = 2 * a[j] * Math.PI / 256;
                            j++;
                            tagName = 2 * a[j] * Math.PI / 256;
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (4 == x) {
                    if ("e" == v) {
                      min = 2 * a[j] * Math.PI / 256;
                    } else {
                      if ("E" == v) {
                        data = 1;
                        tagName = 2 * a[j] * Math.PI / 256;
                      } else {
                        if ("4" == v) {
                          data = 2;
                          tagName = 2 * a[j] * Math.PI / 256;
                        } else {
                          if ("3" == v) {
                            type = a[j] / 18;
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (3 <= protocol_version) {
                if ("3" != v) {
                  if (8 == x || (7 == x || (6 == x && "3" != v || 5 == x && "3" != v))) {
                    data = "e" == v ? 1 : 2;
                  }
                }
                if (8 == x || (7 == x || (5 == x && "3" == v || 6 == x && "3" == v))) {
                  min = 2 * (a[j] << 8 | a[j + 1]) * Math.PI / 65535;
                  j += 2;
                }
                if (8 == x || (7 == x || (5 == x && "3" != v || 6 == x && "3" != v))) {
                  tagName = 2 * (a[j] << 8 | a[j + 1]) * Math.PI / 65535;
                  j += 2;
                }
                if (8 == x || (6 == x || 4 == x)) {
                  type = a[j] / 18;
                }
              } else {
                if (11 == s || (8 == s || (9 == s || 6 == s))) {
                  data = a[j] - 48;
                  j++;
                }
                if (11 == s || (7 == s || (9 == s || 5 == s))) {
                  min = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                  j += 3;
                }
                if (11 == s || (8 == s || (9 == s || 6 == s))) {
                  tagName = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                  j += 3;
                }
                if (11 == s || (7 == s || (8 == s || 4 == s))) {
                  type = (a[j] << 8 | a[j + 1]) / 1E3;
                }
              }
            }
            var node = os["s" + d];
            if (node) {
              if (-1 != data) {
                node.dir = data;
              }
              anguc++;
              if (-1 != min) {
                if (node.ang == min) {
                  angnuc++;
                }
                a = (min - node.ang) % pi2;
                if (0 > a) {
                  a += pi2;
                }
                if (a > Math.PI) {
                  a -= pi2;
                }
                d = node.fapos;
                s = 0;
                for (;s < afc;s++) {
                  node.fas[d] -= a * afas[s];
                  d++;
                  if (d >= afc) {
                    d = 0;
                  }
                }
                node.fatg = afc;
                node.ang = min;
              }
              if (-1 != tagName) {
                if (node.wang == tagName) {
                  wangnuc++;
                }
                node.wang = tagName;
                if (node != snake) {
                  node.eang = tagName;
                }
              }
              if (-1 != type) {
                node.sp = type;
                node.spang = node.sp / spangdv;
                if (1 < node.spang) {
                  node.spang = 1;
                }
              }
            }
          } else {
            if ("h" == v) {
              d = a[j] << 8 | a[j + 1];
              j = j + 2;
              var y = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 16777215;
              if (node = os["s" + d]) {
                node.fam = y;
                snl(node);
              }
            } else {
              if ("r" == v) {
                if (d = a[j] << 8 | a[j + 1], j += 2, node = os["s" + d]) {
                  if (4 <= s) {
                    node.fam = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 16777215;
                  }
                  s = 0;
                  for (;s < node.pts.length;s++) {
                    if (!node.pts[s].dying) {
                      node.pts[s].dying = true;
                      node.sct--;
                      node.sc = Math.min(6, 1 + (node.sct - 2) / 106);
                      node.scang = 0.13 + 0.87 * Math.pow((7 - node.sc) / 6, 2);
                      node.ssp = nsp1 + nsp2 * node.sc;
                      node.fsp = node.ssp + 0.1;
                      node.wsep = 6 * node.sc;
                      a = nsep / gsc;
                      if (node.wsep < a) {
                        node.wsep = a;
                      }
                      break;
                    }
                  }
                  snl(node);
                }
              } else {
                if ("g" == v || ("n" == v || ("G" == v || "N" == v))) {
                  if (playing && (y = "n" == v || "N" == v, d = a[j] << 8 | a[j + 1], j += 2, node = os["s" + d])) {
                    if (y) {
                      node.sct++;
                    } else {
                      s = 0;
                      for (;s < node.pts.length;s++) {
                        if (!node.pts[s].dying) {
                          node.pts[s].dying = true;
                          break;
                        }
                      }
                    }
                    var i = node.pts[node.pts.length - 1];
                    s = i;
                    data = false;
                    if (3 <= protocol_version) {
                      if ("g" == v || "n" == v) {
                        x = a[j] << 8 | a[j + 1];
                        j += 2;
                        id = a[j] << 8 | a[j + 1];
                        j += 2;
                      } else {
                        x = s.xx + a[j] - 128;
                        j++;
                        id = s.yy + a[j] - 128;
                        j++;
                      }
                    } else {
                      x = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                      j += 3;
                      id = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                      j += 3;
                    }
                    if (y) {
                      node.fam = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 16777215;
                    }
                    if (!(i = points_dp.get())) {
                      i = {
                        exs : [],
                        eys : [],
                        efs : [],
                        ems : []
                      };
                    }
                    i.eiu = 0;
                    i.xx = x;
                    i.yy = id;
                    i.fx = 0;
                    i.fy = 0;
                    i.da = 0;
                    i.ebx = i.xx - s.xx;
                    i.eby = i.yy - s.yy;
                    node.pts.push(i);
                    data = true;
                    if (node.iiv) {
                      a = node.xx + node.fx - i.xx;
                      j = node.yy + node.fy - i.yy;
                      i.fx += a;
                      i.fy += j;
                      i.exs[i.eiu] = a;
                      i.eys[i.eiu] = j;
                      i.efs[i.eiu] = 0;
                      i.ems[i.eiu] = 1;
                      i.eiu++;
                    }
                    d = node.pts.length - 3;
                    if (1 <= d) {
                      min = node.pts[d];
                      v = n = 0;
                      s = d - 1;
                      for (;0 <= s;s--) {
                        d = node.pts[s];
                        n++;
                        a = d.xx;
                        j = d.yy;
                        if (4 >= n) {
                          v = cst * n / 4;
                        }
                        d.xx += (min.xx - d.xx) * v;
                        d.yy += (min.yy - d.yy) * v;
                        if (node.iiv) {
                          a -= d.xx;
                          j -= d.yy;
                          d.fx += a;
                          d.fy += j;
                          d.exs[d.eiu] = a;
                          d.eys[d.eiu] = j;
                          d.efs[d.eiu] = 0;
                          d.ems[d.eiu] = 2;
                          d.eiu++;
                        }
                        min = d;
                      }
                    }
                    node.sc = Math.min(6, 1 + (node.sct - 2) / 106);
                    node.scang = 0.13 + 0.87 * Math.pow((7 - node.sc) / 6, 2);
                    node.ssp = nsp1 + nsp2 * node.sc;
                    node.fsp = node.ssp + 0.1;
                    node.wsep = 6 * node.sc;
                    a = nsep / gsc;
                    if (node.wsep < a) {
                      node.wsep = a;
                    }
                    if (y) {
                      snl(node);
                    }
                    node.lnp = i;
                    if (node == snake) {
                      ovxx = snake.xx + snake.fx;
                      ovyy = snake.yy + snake.fy;
                    }
                    i = etm / 8 * node.sp / 4;
                    i *= lag_mult;
                    s = node.chl - 1;
                    node.chl = i / node.msl;
                    v = node.xx;
                    d = node.yy;
                    node.xx = x + Math.cos(node.ang) * i;
                    node.yy = id + Math.sin(node.ang) * i;
                    a = node.xx - v;
                    j = node.yy - d;
                    x = node.chl - s;
                    d = node.fpos;
                    s = 0;
                    for (;s < rfc;s++) {
                      node.fxs[d] -= a * rfas[s];
                      node.fys[d] -= j * rfas[s];
                      node.fchls[d] -= x * rfas[s];
                      d++;
                      if (d >= rfc) {
                        d = 0;
                      }
                    }
                    node.fx = node.fxs[node.fpos];
                    node.fy = node.fys[node.fpos];
                    node.fchl = node.fchls[node.fpos];
                    node.ftg = rfc;
                    if (data) {
                      node.ehl = 0;
                    }
                    if (node == snake) {
                      view_xx = snake.xx + snake.fx;
                      view_yy = snake.yy + snake.fy;
                      a = view_xx - ovxx;
                      j = view_yy - ovyy;
                      d = fvpos;
                      s = 0;
                      for (;s < vfc;s++) {
                        fvxs[d] -= a * vfas[s];
                        fvys[d] -= j * vfas[s];
                        d++;
                        if (d >= vfc) {
                          d = 0;
                        }
                      }
                      fvtg = vfc;
                    }
                  }
                } else {
                  if ("l" == v) {
                    if (playing) {
                      wumsts = true;
                      min = i = id = "";
                      type = tagName = 0;
                      if (-1 == lb_fr) {
                        if (-1 == dead_mtm) {
                          lb_fr = 0;
                        }
                      }
                      var number = a[j];
                      j++;
                      rank = a[j] << 8 | a[j + 1];
                      if (rank < best_rank) {
                        best_rank = rank;
                      }
                      j += 2;
                      snake_count = a[j] << 8 | a[j + 1];
                      if (snake_count > biggest_snake_count) {
                        biggest_snake_count = snake_count;
                      }
                      j += 2;
                      for (;j < data;) {
                        var tag = a[j] << 8 | a[j + 1];
                        j = j + 2;
                        y = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 16777215;
                        j = j + 3;
                        node = a[j] % 9;
                        j++;
                        x = a[j];
                        j++;
                        type++;
                        v = "";
                        s = 0;
                        for (;s < x;s++) {
                          d = a[j];
                          v += String.fromCharCode(d);
                          j++;
                        }
                        if (type != number) {
                          if (!gdnm(v)) {
                            v = "";
                          }
                        }
                        var index = "";
                        s = 0;
                        for (;s < x;s++) {
                          d = v.charCodeAt(s);
                          index = 38 == d ? index + "&amp;" : 60 == d ? index + "&lt;" : 62 == d ? index + "&gt;" : 32 == d ? index + "&nbsp;" : index + String.fromCharCode(d);
                        }
                        v = index;
                        tagName++;
                        score = Math.floor(150 * (fpsls[tag] + y / fmlts[tag] - 1) - 50) / 10;
                        d = type == number ? 1 : 0.7 * (0.3 + 0.7 * (1 - tagName / 10));
                        id += '<span style="opacity:' + d + "; color:" + per_color_imgs[node].cs + ';">' + score + "</span><BR>";
                        i += '<span style="opacity:' + d + "; color:" + per_color_imgs[node].cs + ";" + (type == number ? "font-weight:bold;" : "") + '">' + v + "</span><BR>";
                        min += '<span style="opacity:' + d + "; color:" + per_color_imgs[node].cs + ';">#' + tagName + "</span><BR>";
                      }
                      lbs.innerHTML = id;
                      lbn.innerHTML = i;
                      lbp.innerHTML = min;
                    }
                  } else {
                    if ("v" == v) {
                      if (2 == a[j]) {
                        want_close_socket = true;
                        want_victory_message = false;
                        want_hide_victory = 1;
                        hvfr = 0;
                      } else {
                        dead_mtm = Date.now();
                        play_btn.setEnabled(true);
                        x = Math.floor(150 * (fpsls[snake.sct] + snake.fam / fmlts[snake.sct] - 1) - 50) / 10;
                        twt.href = "http://twitter.com/intent/tweet?status=" + encodeURIComponent("I got a length of " + x + " in http://slither.io! Can you beat that? #slitherio");
                        id = "Your final length was";
                        if ("DE" == country) {
                          id = "Deine endg\u00fcltige L\u00e4nge war";
                        } else {
                          if ("FR" == country) {
                            id = "Votre longueur finale \u00e9tait de";
                          } else {
                            if ("BR" == country) {
                              id = "Seu comprimento final foi de";
                            }
                          }
                        }
                        data = "";
                        if (1E3 < x) {
                          data = "!";
                        }
                        lastscore.innerHTML = '<span style="opacity: .45;">' + id + " </span><b>" + x + "</b>" + data;
                        x = "Play Again";
                        if ("FR" == country) {
                          x = "Jouer";
                        } else {
                          if ("BR" == country) {
                            x = "Joga";
                          }
                        }
                        play_btn.setText(String.fromCharCode(160) + x + String.fromCharCode(160));
                        if (1 == a[j]) {
                          nick_holder.style.display = "none";
                          playh.style.display = "none";
                          smh.style.display = "none";
                          victory_holder.style.display = "inline";
                          saveh.style.display = "block";
                          want_victory_focus = want_victory_message = true;
                          victory.disabled = false;
                          save_btn.setEnabled(true);
                        } else {
                          want_close_socket = true;
                        }
                      }
                    } else {
                      if ("w" == v) {
                        if (data = a[j], j++, x = a[j] << 8 | a[j + 1], j += 2, id = a[j] << 8 | a[j + 1], 1 == data) {
                          node = {};
                          node.xx = x;
                          node.yy = id;
                          sectors.push(node);
                        } else {
                          i = cm1 = foods_c - 1;
                          for (;0 <= i;i--) {
                            s = foods[i];
                            if (s.sx == x) {
                              if (s.sy == id) {
                                if (i == cm1) {
                                  foods[i] = null;
                                } else {
                                  foods[i] = foods[cm1];
                                  foods[cm1] = null;
                                }
                                foods_c--;
                                cm1--;
                              }
                            }
                          }
                          i = sectors.length - 1;
                          for (;0 <= i;i--) {
                            node = sectors[i];
                            if (node.xx == x) {
                              if (node.yy == id) {
                                sectors.splice(i, 1);
                              }
                            }
                          }
                        }
                      } else {
                        if ("m" == v) {
                          tag = a[j] << 16 | a[j + 1] << 8 | a[j + 2];
                          j += 3;
                          y = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 16777215;
                          j += 3;
                          id = Math.floor(150 * (fpsls[tag] + y / fmlts[tag] - 1) - 50) / 10;
                          x = a[j];
                          j++;
                          s = "";
                          i = 0;
                          for (;i < x;i++) {
                            s += String.fromCharCode(a[j]);
                            j++;
                          }
                          x = "";
                          for (;j < data;) {
                            x += String.fromCharCode(a[j]);
                            j++;
                          }
                          s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
                          x = x.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
                          if (0 < id) {
                            a = "";
                            if (0 < x.length) {
                              a += "<span style='font-size:17px;'><b><i><span style='opacity: .5;'>&quot;</span>" + x + "<span style='opacity: .5;'>&quot;</span></i></b></span><BR><div style='height: 5px;'></div>";
                            }
                            if (0 < s.length) {
                              a = 0 < x.length ? a + ("<i><span style='opacity: .5;'>- </span><span style='opacity: .75;'><b>" + s + "</b></span><span style='opacity: .5;'>, today's longest</span></i>") : "<i><span style='opacity: .5;'>Today's longest was </span><span style='opacity: .75;'><b>" + s + "</b></span></i>";
                              a += "<br><i><span style='opacity: .5;'>with a length of </span><span style='opacity: .65;'><b>" + id + "</b></span></i>";
                            } else {
                              a = 0 < x.length ? a + "<i><span style='opacity: .5;'>- </span><span style='opacity: .5;'>today's longest</span></i>" + ("<br><i><span style='opacity: .5;'>with a length of </span><span style='opacity: .65;'><b>" + id + "</b></span></i>") : a + ("<i><span style='opacity: .5;'>Today's longest: </span><span style='opacity: .75;'><b>" + id + "</b></span></i>");
                            }
                            vcm.innerHTML = a;
                          }
                        } else {
                          if ("p" == v) {
                            wfpr = false;
                            if (lagging) {
                              etm *= lag_mult;
                              lagging = false;
                            }
                          } else {
                            if ("u" == v) {
                              s = asmc.getContext("2d");
                              s.clearRect(0, 0, 80, 80);
                              s.fillStyle = "#FFFFFF";
                              var id = x = 0;
                              for (;j < data && !(80 <= id);) {
                                if (d = a[j++], 128 <= d) {
                                  d -= 128;
                                  i = 0;
                                  for (;i < d && !(x++, 80 <= x && (x = 0, id++, 80 <= id));i++) {
                                  }
                                } else {
                                  i = 0;
                                  for (;7 > i && !(0 < (d & u_m[i]) && s.fillRect(x, id, 1, 1), x++, 80 <= x && (x = 0, id++, 80 <= id));i++) {
                                  }
                                }
                              }
                            } else {
                              if ("s" == v) {
                                if (playing) {
                                  if (d = a[j] << 8 | a[j + 1], j += 2, 6 < s) {
                                    min = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                    j += 3;
                                    j++;
                                    tagName = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                    j += 3;
                                    type = (a[j] << 8 | a[j + 1]) / 1E3;
                                    j += 2;
                                    y = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 16777215;
                                    j += 3;
                                    node = a[j];
                                    j++;
                                    number = [];
                                    tag = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                                    j += 3;
                                    index = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                                    j += 3;
                                    x = a[j];
                                    j++;
                                    v = "";
                                    s = 0;
                                    for (;s < x;s++) {
                                      v += String.fromCharCode(a[j]);
                                      j++;
                                    }
                                    var ret = s = id = x = 0;
                                    var O = false;
                                    for (;j < data;) {
                                      s = x;
                                      ret = id;
                                      if (O) {
                                        x += (a[j] - 127) / 2;
                                        j++;
                                        id += (a[j] - 127) / 2;
                                        j++;
                                      } else {
                                        x = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                                        j += 3;
                                        id = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                                        j += 3;
                                        s = x;
                                        ret = id;
                                        O = true;
                                      }
                                      if (!(i = points_dp.get())) {
                                        i = {
                                          exs : [],
                                          eys : [],
                                          efs : [],
                                          ems : []
                                        };
                                      }
                                      i.eiu = 0;
                                      i.xx = x;
                                      i.yy = id;
                                      i.fx = 0;
                                      i.fy = 0;
                                      i.da = 0;
                                      i.ebx = x - s;
                                      i.eby = id - ret;
                                      number.push(i);
                                    }
                                    node = newSnake(d, tag, index, node, min, number);
                                    if (null == snake) {
                                      view_xx = x;
                                      view_yy = id;
                                      snake = node;
                                      node.nk = my_nick;
                                    } else {
                                      node.nk = v;
                                      if (!gdnm(v)) {
                                        node.nk = "";
                                      }
                                    }
                                    node.eang = node.wang = tagName;
                                    node.sp = type;
                                    node.spang = node.sp / spangdv;
                                    if (1 < node.spang) {
                                      node.spang = 1;
                                    }
                                    node.fam = y;
                                    node.sc = Math.min(6, 1 + (node.sct - 2) / 106);
                                    node.scang = 0.13 + 0.87 * Math.pow((7 - node.sc) / 6, 2);
                                    node.ssp = nsp1 + nsp2 * node.sc;
                                    node.fsp = node.ssp + 0.1;
                                    node.wsep = 6 * node.sc;
                                    a = nsep / gsc;
                                    if (node.wsep < a) {
                                      node.wsep = a;
                                    }
                                    node.sep = node.wsep;
                                    snl(node);
                                  } else {
                                    a = 1 == a[j];
                                    i = snakes.length - 1;
                                    for (;0 <= i;i--) {
                                      if (snakes[i].id == d) {
                                        snakes[i].id = -1234;
                                        if (a) {
                                          snakes[i].dead = true;
                                          snakes[i].dead_amt = 0;
                                          snakes[i].edir = 0;
                                        } else {
                                          snakes.splice(i, 1);
                                        }
                                        delete os["s" + d];
                                        break;
                                      }
                                    }
                                  }
                                }
                              } else {
                                if ("F" == v) {
                                  if (4 <= protocol_version) {
                                    v = false;
                                    for (;j < data;) {
                                      node = a[j];
                                      j++;
                                      x = a[j] << 8 | a[j + 1];
                                      j += 2;
                                      id = a[j] << 8 | a[j + 1];
                                      j += 2;
                                      s = a[j] / 5;
                                      j++;
                                      d = id * grd * 3 + x;
                                      s = newFood(d, x, id, s, true, node);
                                      if (!v) {
                                        v = true;
                                        i = Math.floor(x / sector_size);
                                        y = Math.floor(id / sector_size);
                                      }
                                      s.sx = i;
                                      s.sy = y;
                                    }
                                    node = {};
                                    node.xx = i;
                                    node.yy = y;
                                    sectors.push(node);
                                  } else {
                                    i = a[j] << 8 | a[j + 1];
                                    j += 2;
                                    y = a[j] << 8 | a[j + 1];
                                    j += 2;
                                    node = {};
                                    node.xx = i;
                                    node.yy = y;
                                    sectors.push(node);
                                    for (;j < data;) {
                                      d = a[j] << 16 | a[j + 1] << 8 | a[j + 2];
                                      j += 3;
                                      node = a[j];
                                      j++;
                                      x = sector_size * (i + a[j] / 255);
                                      j++;
                                      id = sector_size * (y + a[j] / 255);
                                      j++;
                                      s = a[j] / 5;
                                      j++;
                                      s = newFood(d, x, id, s, true, node);
                                      s.sx = i;
                                      s.sy = y;
                                    }
                                  }
                                } else {
                                  if ("b" == v || "f" == v) {
                                    if (4 <= protocol_version) {
                                      node = a[j];
                                      j++;
                                      if (4 < s) {
                                        x = a[j] << 8 | a[j + 1];
                                        j += 2;
                                        id = a[j] << 8 | a[j + 1];
                                        d = id * grd * 3 + x;
                                        s = a[j + 2] / 5;
                                        s = newFood(d, x, id, s, "b" == v, node);
                                        s.sx = Math.floor(x / sector_size);
                                        s.sy = Math.floor(id / sector_size);
                                      }
                                    } else {
                                      d = a[j] << 16 | a[j + 1] << 8 | a[j + 2];
                                      j += 3;
                                      if (4 < s) {
                                        node = a[j];
                                        j++;
                                        i = a[j] << 8 | a[j + 1];
                                        j += 2;
                                        y = a[j] << 8 | a[j + 1];
                                        j += 2;
                                        x = sector_size * (i + a[j] / 255);
                                        j++;
                                        id = sector_size * (y + a[j] / 255);
                                        j++;
                                        s = a[j] / 5;
                                        s = newFood(d, x, id, s, "b" == v, node);
                                        s.sx = i;
                                        s.sy = y;
                                      }
                                    }
                                  } else {
                                    if ("c" == v) {
                                      if (4 <= protocol_version) {
                                        x = a[j] << 8 | a[j + 1];
                                        j += 2;
                                        id = a[j] << 8 | a[j + 1];
                                        j += 2;
                                        d = id * grd * 3 + x;
                                      } else {
                                        d = a[j] << 16 | a[j + 1] << 8 | a[j + 2];
                                        j += 3;
                                      }
                                      i = cm1 = foods_c - 1;
                                      for (;0 <= i;i--) {
                                        if (s = foods[i], s.id == d) {
                                          s.eaten = true;
                                          if (j + 2 <= data) {
                                            a = a[j] << 8 | a[j + 1];
                                            s.eaten_by = os["s" + a];
                                            s.eaten_fr = 0;
                                          } else {
                                            if (i == cm1) {
                                              foods[i] = null;
                                            } else {
                                              foods[i] = foods[cm1];
                                              foods[cm1] = null;
                                            }
                                            foods_c--;
                                            cm1--;
                                          }
                                          d = -1;
                                          break;
                                        }
                                      }
                                      if (-1 != d) {
                                        console.log("wtf");
                                      }
                                    } else {
                                      if ("j" == v) {
                                        d = a[j] << 8 | a[j + 1];
                                        j += 2;
                                        x = 1 + 3 * (a[j] << 8 | a[j + 1]);
                                        j += 2;
                                        id = 1 + 3 * (a[j] << 8 | a[j + 1]);
                                        j += 2;
                                        data = null;
                                        i = preys.length - 1;
                                        for (;0 <= i;i--) {
                                          if (preys[i].id == d) {
                                            data = preys[i];
                                            break;
                                          }
                                        }
                                        if (data) {
                                          i = etm / 8 * data.sp / 4;
                                          i *= lag_mult;
                                          v = data.xx;
                                          d = data.yy;
                                          if (15 == s) {
                                            data.dir = a[j] - 48;
                                            j++;
                                            data.ang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                            j += 3;
                                            data.wang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                            j += 3;
                                            data.sp = (a[j] << 8 | a[j + 1]) / 1E3;
                                          } else {
                                            if (11 == s) {
                                              data.ang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                              j += 3;
                                              data.sp = (a[j] << 8 | a[j + 1]) / 1E3;
                                            } else {
                                              if (12 == s) {
                                                data.dir = a[j] - 48;
                                                j++;
                                                data.wang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                                j += 3;
                                                data.sp = (a[j] << 8 | a[j + 1]) / 1E3;
                                              } else {
                                                if (13 == s) {
                                                  data.dir = a[j] - 48;
                                                  j++;
                                                  data.ang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                                  j += 3;
                                                  data.wang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                                } else {
                                                  if (9 == s) {
                                                    data.ang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                                  } else {
                                                    if (10 == s) {
                                                      data.dir = a[j] - 48;
                                                      j++;
                                                      data.wang = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                                    } else {
                                                      if (8 == s) {
                                                        data.sp = (a[j] << 8 | a[j + 1]) / 1E3;
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                          data.xx = x + Math.cos(data.ang) * i;
                                          data.yy = id + Math.sin(data.ang) * i;
                                          a = data.xx - v;
                                          j = data.yy - d;
                                          d = data.fpos;
                                          s = 0;
                                          for (;s < rfc;s++) {
                                            data.fxs[d] -= a * rfas[s];
                                            data.fys[d] -= j * rfas[s];
                                            d++;
                                            if (d >= rfc) {
                                              d = 0;
                                            }
                                          }
                                          data.fx = data.fxs[data.fpos];
                                          data.fy = data.fys[data.fpos];
                                          data.ftg = rfc;
                                        }
                                      } else {
                                        if ("y" == v) {
                                          if (d = a[j] << 8 | a[j + 1], j += 2, 2 == s) {
                                            i = preys.length - 1;
                                            for (;0 <= i;i--) {
                                              if (data = preys[i], data.id == d) {
                                                preys.splice(i, 1);
                                                break;
                                              }
                                            }
                                          } else {
                                            if (4 == s) {
                                              a = a[j] << 8 | a[j + 1];
                                              i = preys.length - 1;
                                              for (;0 <= i;i--) {
                                                if (data = preys[i], data.id == d) {
                                                  data.eaten = true;
                                                  data.eaten_by = os["s" + a];
                                                  if (data.eaten_by) {
                                                    data.eaten_fr = 0;
                                                  } else {
                                                    preys.splice(i, 1);
                                                  }
                                                  break;
                                                }
                                              }
                                            } else {
                                              node = a[j];
                                              j++;
                                              x = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                                              j += 3;
                                              id = (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) / 5;
                                              j += 3;
                                              s = a[j] / 5;
                                              j++;
                                              data = a[j] - 48;
                                              j++;
                                              tagName = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                              j += 3;
                                              min = 2 * (a[j] << 16 | a[j + 1] << 8 | a[j + 2]) * Math.PI / 16777215;
                                              j += 3;
                                              type = (a[j] << 8 | a[j + 1]) / 1E3;
                                              newPrey(d, x, id, s, node, data, tagName, min, type);
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    ws.onerror = function(er) {
    };
    ws.onclose = function(data) {
      if (ws == this) {
        playing = connected = false;
      }
    };
    ws.onopen = function(a) {
      if (ws == this) {
        a = asciize(nick.value);
        if (24 < a.length) {
          a = a.substr(0, 24);
        }
        my_nick = a;
        var i = Math.floor(9 * Math.random());
        try {
          var v = localStorage.snakercv;
          if (v == "" + Number(v)) {
            i = Number(v);
          }
        } catch (f) {
        }
        v = new Uint8Array(3 + a.length);
        v[0] = 115;
        v[1] = 5;
        v[2] = i;
        i = 0;
        for (;i < a.length;i++) {
          v[i + 3] = a.charCodeAt(i);
        }
        ws.send(v);
        high_quality = true;
        gla = 1;
        wdfg = 0;
        qsm = 1;
        if (0 == want_quality) {
          high_quality = false;
          gla = 0;
          qsm = 1.7;
        }
        if (1 == render_mode) {
          high_quality = false;
          gla = 0;
        }
        lpstm = Date.now();
      }
    };
  }
}
function asciize(a) {
  var i;
  var ln;
  var chr1;
  ln = a.length;
  var output = false;
  i = 0;
  for (;i < ln;i++) {
    if (chr1 = a.charCodeAt(i), 32 > chr1 || 127 < chr1) {
      output = true;
      break;
    }
  }
  if (output) {
    output = "";
    i = 0;
    for (;i < ln;i++) {
      chr1 = a.charCodeAt(i);
      output = 32 > chr1 || 127 < chr1 ? output + " " : output + String.fromCharCode(chr1);
    }
    return output;
  }
  return a;
}
var smh = document.getElementById("smh");
var cstx = document.getElementById("cstx");
cstx.src = "FR" == country ? "/s/customskins-fr.png" : "BR" == country ? "/s/customskins-br.png" : "/s/customskins2.png";
try {
  if ("1" != localStorage.edttsg) {
    cstx.style.display = "inline";
  }
} catch (b$$53) {
}
var fb = document.getElementById("fb");
fb.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://slither.io");
fb.onclick = function() {
  localStorage.edttsg = "1";
};
var fbh = document.getElementById("fbh");
var twt = document.getElementById("twt");
twt.onclick = function() {
  localStorage.edttsg = "1";
};
twt.href = "http://twitter.com/intent/tweet?status=" + encodeURIComponent("Come and play http://slither.io #slitherio");
var twth = document.getElementById("twth");
var csk = document.getElementById("csk");
var cskh = document.getElementById("cskh");
var want_quality = 1;
var grq = document.getElementById("grq");
var grqh = document.getElementById("grqh");
var phqi = document.createElement("img");
var grqi = document.getElementById("grqi");
try {
  if ("0" == localStorage.qual) {
    grqi.src = "/s/lowquality.png";
    want_quality = 0;
  } else {
    phqi.src = "/s/lowquality.png";
    want_quality = 1;
  }
} catch (b$$54) {
}
grq.onclick = function() {
  try {
    if ("0" == localStorage.qual) {
      localStorage.qual = "1";
      grqi.src = "/s/highquality.png";
      want_quality = 1;
    } else {
      localStorage.qual = "0";
      grqi.src = "/s/lowquality.png";
      want_quality = 0;
    }
  } catch (b) {
  }
  return false;
};
var plq = document.getElementById("plq");
var clq = document.getElementById("clq");
try {
  if ("1" == localStorage.edttsg) {
    cskh.style.display = "inline";
  }
} catch (b$$56) {
}
var psk = document.getElementById("psk");
var pskh = document.getElementById("pskh");
var nsk = document.getElementById("nsk");
var nskh = document.getElementById("nskh");
var choosing_skin = false;
psk.onclick = function() {
  if (playing && null != snake) {
    var expectationResult = snake.rcv;
    expectationResult--;
    if (0 > expectationResult) {
      expectationResult = max_skin_cv;
    }
    setSkin(snake, expectationResult);
  }
  return false;
};
nsk.onclick = function() {
  if (playing && null != snake) {
    var expectationResult = snake.rcv;
    expectationResult++;
    if (expectationResult > max_skin_cv) {
      expectationResult = 0;
    }
    setSkin(snake, expectationResult);
  }
  return false;
};
csk.onclick = function() {
  if (!playing && -1 == dead_mtm) {
    resetGame();
    choosing_skin = true;
    pskh.style.opacity = 0;
    nskh.style.opacity = 0;
    skodiv.style.opacity = 0;
    pskh.style.display = "inline";
    nskh.style.display = "inline";
    skodiv.style.display = "inline";
    skodiv.style.left = Math.round(ww / 2 - skodiv.offsetWidth / 2) + "px";
    nick.disabled = true;
    if (0 == mscps) {
      setMscps(300);
    }
    gsc = sgsc;
    var data = [];
    var h = 22;
    for (;1 <= h;h--) {
      data.push({
        xx : grd / 2 - 10 * h,
        yy : grd / 2,
        fx : 0,
        fy : 0,
        exs : [],
        eys : [],
        efs : [],
        ems : [],
        eiu : 0,
        fpos : 0,
        da : 0,
        ebx : 10,
        eby : 0
      });
    }
    h = 0;
    try {
      var r = localStorage.snakercv;
      if (r == "" + Number(r)) {
        h = Number(r);
      }
    } catch (f) {
    }
    data = newSnake(1, grd / 2, grd / 2, h, 0, data);
    view_xx = grd / 2 - 105;
    view_yy = grd / 2;
    snake = data;
    data.nk = "";
    data.eang = data.wang = data.ang;
    data.sp = 4.8;
    data.spang = data.sp / spangdv;
    if (1 < data.spang) {
      data.spang = 1;
    }
    data.sc = 1;
    data.scang = 1;
    data.ssp = nsp1 + nsp2 * data.sc;
    data.fsp = data.ssp + 0.1;
    data.wsep = 6 * data.sc;
    r = nsep / gsc;
    if (data.wsep < r) {
      data.wsep = r;
    }
    data.sep = data.wsep;
    snl(data);
    data.alive_amt = 1;
    data.rex = 1.66;
    ws = {
      send : function(data) {
      },
      close : function() {
      }
    };
    high_quality = playing = connected = true;
    gla = 1;
    wdfg = 0;
    qsm = 1;
    startShowGame();
    lbh.style.display = "none";
    lbs.style.display = "none";
    lbn.style.display = "none";
    lbp.style.display = "none";
    lbf.style.display = "none";
    vcm.style.display = "none";
    loch.style.display = "none";
  }
  return false;
};
nick.oninput = function() {
  var old = this.value;
  var val = asciize(old);
  if (24 < val.length) {
    val = val.substr(0, 24);
  }
  if (old != val) {
    this.value = val;
  }
};
victory.oninput = function() {
  var old = this.value;
  var val = asciize(old);
  if (140 < val.length) {
    val = val.substr(0, 140);
  }
  if (old != val) {
    this.value = val;
  }
};
nick.focus();
var lmch = document.createElement("div");
lmch.style.width = "450px";
lmch.style.height = "115px";
var lmc2 = document.createElement("canvas");
var lmc = document.createElement("canvas");
var lgsc = 1;
var lw = 900;
var lh = 270;
lmc.width = lmc2.width = lw;
lmc.height = lmc2.height = lh;
var lctx = lmc.getContext("2d");
var lctx2 = lmc2.getContext("2d");
trf(lmc2, "scale(.5, .5)");
trfo(lmc2, "0% 0%");
lmch.appendChild(lmc2);
logo.appendChild(lmch);
var lts = [];
lts.push({
  pts : [107, 107, 80, 83, 53, 98, 31, 115, 55, 131, 98, 147, 101, 162, 101, 190, 66, 188, 49, 187, 34, 173],
  kc : 22,
  ws : 4,
  wr : 0.025,
  qm : 0.025,
  sp : 0.06,
  sz : 11
}, {
  pts : [150, 30, 150, 107, 150, 184],
  kc : 66,
  ws : 4,
  wr : 0.05,
  qm : 0.025,
  sp : 0.06,
  sz : 11
}, {
  pts : [207, 96, 207, 140, 207, 184],
  kc : 46,
  ws : 4,
  wr : 0.03,
  qm : 0.035,
  sp : 0.06,
  sz : 11
}, {
  pts : [207, 47, 207, 48.5, 207, 50],
  kc : 11,
  ws : 2,
  wr : 0.06,
  qm : 0.05,
  sp : 0.06,
  sz : 15,
  r : 0.5
}, {
  pts : [267, 65, 267, 114.5, 267, 164, 267, 194, 297, 186],
  kc : 66,
  ws : 6,
  wr : -0.025,
  qm : -0.0125,
  sp : 0.06,
  sz : 11,
  r : 1.5
}, {
  pts : [243, 94, 268, 94, 293, 94],
  kc : 66,
  ws : 4,
  wr : 0.015,
  qm : 0.025,
  sp : 0.06,
  sz : 9,
  r : 1.2
}, {
  pts : [338, 30, 338, 68.5, 338, 107, 338, 145.5, 338, 184, 338, 164, 338, 144, 338, 104, 378, 104, 418, 104, 418, 144, 418, 164, 418, 184],
  kc : 46,
  ws : 4,
  wr : 0.005,
  qm : 0.02,
  sp : 0.06,
  sz : 11,
  r : 2.1
}, {
  pts : [535, 175, 500, 201, 472, 175, 442, 138, 472, 105, 502, 84, 532, 105, 546, 118, 544, 139, 504, 139, 464, 139],
  kc : 35,
  ws : 6,
  wr : -0.013,
  qm : -0.025,
  sp : 0.06,
  sz : 11,
  r : 1.3
}, {
  pts : [591, 96, 591, 140, 591, 184, 591, 155, 591, 126, 613, 82, 652, 109],
  kc : 38,
  ws : 4,
  wr : 0.01,
  qm : -0.035,
  sp : 0.06,
  sz : 11
}, {
  pts : [663, 177, 663, 178.5, 663, 180],
  kc : 11,
  ws : 2,
  wr : 0.06,
  qm : 0.05,
  sp : 0.06,
  sz : 15
}, {
  pts : [717, 96, 717, 140, 717, 184],
  kc : 33,
  ws : 4,
  wr : 0.06,
  qm : 0.05,
  sp : 0.06,
  sz : 11
}, {
  pts : [717, 47, 717, 48.5, 717, 50],
  kc : 11,
  ws : 2,
  wr : 0.06,
  qm : 0.05,
  sp : 0.06,
  sz : 15
}, {
  pts : [814, 186, 860, 188, 858, 136, 854, 96, 814, 96, 770, 96, 770, 136, 770, 186, 814, 186],
  kc : 43,
  ws : 4,
  wr : 0,
  qm : 0.0274,
  sp : 0.073,
  sz : 11,
  r : 1.5
});
i = 0;
for (;i < lts.length;i++) {
  lts[i].mwig = 5;
}
var lga = 0;
var lgss = 0;
var ncka = 0;
var mwig = 4;
var lgfr = 0;
var lgtm = Date.now();
function showLogo(dataAndEvents) {
  var i = Date.now();
  var imgWidth = (i - lgtm) / 25;
  lgtm = i;
  var w;
  var p;
  var f;
  var q;
  var x;
  var y2;
  var m2;
  var endRho;
  var a;
  var y1;
  var offset;
  var sa;
  var I;
  var width;
  var index;
  lgfr += imgWidth;
  if (0 == lts[lts.length - 1].mwig && (1 == lga && (1 == lgss && 1 == ncka))) {
    clearInterval(showlogo_iv);
    showlogo_iv = -1;
  } else {
    if (dataAndEvents || 1 != lga) {
      lga += 0.05 * imgWidth;
      if (1 <= lga) {
        lga = 1;
      }
      lmc2.style.opacity = lga;
    }
    if (1 != lgss) {
      lgss += 0.00375 * imgWidth;
      if (1 <= lgss) {
        lgss = 1;
      }
    }
    if (dataAndEvents || 1 != ncka) {
      ncka += 0.006 * imgWidth;
      if (1 <= ncka) {
        ncka = 1;
      }
      nick_holder.style.opacity = Math.min(1, 6 * ncka);
      if (!is_mobile) {
        smh.style.opacity = Math.max(0, Math.min(1, 5 * (ncka - 0.05)));
      }
      if (0.01 <= ncka) {
        playh.style.opacity = Math.min(1, 5 * (ncka - 0.01));
      }
    }
    lctx.clearRect(0, 0, lw, lh);
    i = 0;
    for (;i < lts.length;i++) {
      var stack = lts[i];
      var data = stack.pts;
      var length = stack.kc;
      var ws = stack.ws;
      var il = stack.wr;
      var indicatorStack = stack.qm;
      w = stack.sp;
      var ss = stack.sz;
      index = stack.r;
      var pos = stack.mwig;
      if (dataAndEvents) {
        stack.wch = true;
        pos = 1E-7;
      }
      if (stack.wch) {
        if (0 != pos) {
          pos *= 0.982;
          pos -= 0.001 * imgWidth;
          if (1 == render_mode) {
            pos -= 0.005 * imgWidth;
          }
          if (0 >= pos) {
            pos = 0;
          }
          stack.mwig = pos;
        }
      }
      if (!index) {
        index = 1;
      }
      lctx.beginPath();
      if (9 > i) {
        f = ctx.createLinearGradient(0, 70 * lgsc, 0, 230 * lgsc);
        f.addColorStop(0, "#80FFA0");
        f.addColorStop(1, "#008040");
      } else {
        f = ctx.createLinearGradient(0, 50 * lgsc, 0, 265 * lgsc);
        f.addColorStop(0, "#9850FF");
        f.addColorStop(1, "#281060");
      }
      lctx.fillStyle = f;
      I = false;
      width = 0;
      f = data[0];
      q = data[1];
      a = f;
      y1 = q;
      var theta2 = lgfr * w;
      offset = 2;
      for (;offset < data.length;offset += 4) {
        w = f;
        p = q;
        cx2 = data[offset];
        cy2 = data[offset + 1];
        f = data[offset + 2];
        q = data[offset + 3];
        var l = 1;
        for (;l <= length;l++) {
          width++;
          var h = l / length;
          x = w + (cx2 - w) * h;
          y2 = p + (cy2 - p) * h;
          m2 = cx2 + (f - cx2) * h;
          endRho = cy2 + (q - cy2) * h;
          x += (m2 - x) * h;
          y2 += (endRho - y2) * h;
          a = Math.atan2(y2 - y1, x - a);
          if (I) {
            if (a - sa > Math.PI) {
              a -= 2 * Math.PI;
            } else {
              if (a - sa < -Math.PI) {
                a += 2 * Math.PI;
              }
            }
            sa += 0.05 * (a - sa);
            sa %= 2 * Math.PI;
          } else {
            I = true;
            sa = a;
          }
          a = x;
          y1 = y2;
          x += Math.cos(Math.PI / 2 + sa) * Math.sin(theta2) * ws * pos;
          y2 += Math.sin(Math.PI / 2 + sa) * Math.sin(theta2) * ws * pos;
          theta2 -= 0.76 * indicatorStack * ws;
          ws += il;
          lctx.beginPath();
          endRho = 1.15 * ss * Math.min(1, lgsc * (0.2 + 0.8 * lga) * (30 * lgss * index - width / 20 - i / 2));
          if (0.5 < endRho) {
            lctx.arc(x * lgsc, y2 * lgsc, endRho, 0, pi2);
            stack.wch = true;
          }
          lctx.fill();
        }
      }
    }
    lctx2.clearRect(0, 0, lw, lh);
    lctx2.shadowColor = "#000000";
    lctx2.shadowBlur = 16;
    lctx2.shadowOffsetY = 7;
    lctx2.drawImage(lmc, 0, 0);
  }
}
var showlogo_iv = -1;
if (is_safari || is_mobile) {
  ncka = lgss = lga = 1;
  showLogo(true);
} else {
  showlogo_iv = setInterval("showLogo(false)", 25);
}
document.onkeydown = function(e) {
  e = e || window.event;
  var key = e.keyCode;
  if (37 == key) {
    kd_l = true;
  } else {
    if (39 == key) {
      kd_r = true;
    } else {
      if (38 == key || 32 == key) {
        kd_u = true;
        setAcceleration(1);
      } else {
        if (13 == key || 10 == key) {
          if (want_victory_message) {
            if (0 < victory.value.length) {
              save_btn.elem.onclick();
            }
          } else {
            if (!connecting && !connected) {
              play_btn.elem.onclick();
            }
          }
        } else {
          if (16 == key) {
            if (testing) {
              shifty = true;
            }
          }
        }
      }
    }
  }
  if (testing) {
    console.log("keydown: " + e.keyCode);
  }
};
document.onkeyup = function(e) {
  e = e || window.event;
  e = e.keyCode;
  if (37 == e) {
    kd_l = false;
  } else {
    if (39 == e) {
      kd_r = false;
    } else {
      if (38 == e || 32 == e) {
        kd_u = false;
        setAcceleration(0);
      } else {
        if (16 == e) {
          if (testing) {
            shifty = false;
          }
        }
      }
    }
  }
};
function loadSos(chars) {
  if (!forcing && 0 < chars.length) {
    sos = [];
    clus = [];
    chars.charAt(0);
    var i = 1;
    var d = {};
    var idx = 0;
    d = idx = 0;
    var c;
    var line = 0;
    var handle = 0;
    var split = [];
    var data = [];
    var lines = [];
    var ret = [];
    for (;i < chars.length;) {
      if (c = (chars.charCodeAt(i++) - 97 - handle) % 26, 0 > c && (c += 26), line *= 16, line += c, handle += 7, 1 == d) {
        if (0 == idx) {
          split.push(line);
          if (4 == split.length) {
            idx++;
          }
        } else {
          if (1 == idx) {
            data.push(line);
            if (3 == data.length) {
              idx++;
            }
          } else {
            if (2 == idx) {
              lines.push(line);
              if (3 == lines.length) {
                idx++;
              }
            } else {
              if (3 == idx && (ret.push(line), 1 == ret.length)) {
                d = {};
                idx = c = 0;
                for (;idx < data.length;idx++) {
                  c *= 256;
                  c += data[idx];
                }
                idx = data = 0;
                for (;idx < lines.length;idx++) {
                  data *= 256;
                  data += lines[idx];
                }
                d.ip = split.join(".");
                d.po = c;
                d.ac = data;
                d.clu = ret[0];
                if (clus[d.clu]) {
                  split = clus[d.clu];
                } else {
                  split = {};
                  clus[d.clu] = split;
                  split.sis = [];
                  split.ptms = [];
                }
                d.cluo = split;
                sos.push(d);
                split = [];
                data = [];
                lines = [];
                ret = [];
                idx = 0;
              }
            }
          }
        }
        d = line = 0;
      } else {
        d++;
      }
    }
    i = sos.length - 1;
    for (;0 <= i;i--) {
      if (d = 1, split = sos[i].cluo) {
        idx = split.sis.length - 1;
        for (;0 <= idx;idx--) {
          if (split.sis[idx].ip == sos[i].ip) {
            d = 0;
            break;
          }
        }
        if (1 == d) {
          split.sis.push({
            ip : sos[i].ip
          });
        }
      }
    }
    i = clus.length - 1;
    for (;0 <= i;i--) {
      if ((split = clus[i]) && 0 < split.sis.length) {
        idx = Math.floor(Math.random() * split.sis.length);
        chars = split.sis[idx].ip;
        handle = null;
        try {
          handle = new WebSocket("ws://" + chars + ":80/ptc");
        } catch (D) {
          handle = null;
        }
        if (handle) {
          handle.binaryType = "arraybuffer";
          handle.onerror = function(er) {
          };
          handle.onmessage = function(data) {
            data = new Uint8Array(data.data);
            if (1 == data.length && 112 == data[0]) {
              data = clus.length - 1;
              for (;0 <= data;data--) {
                var self = clus[data];
                if (self && self.ps == this) {
                  var passes = Date.now() - self.stm;
                  if (testing) {
                    console.log(" ping time for cluster " + data + ": " + passes);
                  }
                  self.ptms.push(passes);
                  if (4 > self.ptms.length) {
                    self.stm = Date.now();
                    data = new Uint8Array(1);
                    data[0] = 112;
                    this.send(data);
                  } else {
                    if (waiting_for_sos) {
                      if (-1 == sos_ready_after_mtm) {
                        sos_ready_after_mtm = Date.now() + 2E3;
                      }
                    }
                    this.close();
                    self.ps = null;
                  }
                  break;
                }
              }
            }
          };
          handle.onopen = function(body) {
            body = false;
            var unlock = clus.length - 1;
            for (;0 <= unlock;unlock--) {
              var cache = clus[unlock];
              if (cache && cache.ps == this) {
                cache.stm = Date.now();
                body = new Uint8Array(1);
                body[0] = 112;
                this.send(body);
                body = true;
                break;
              }
            }
            if (!body) {
              this.close();
            }
          };
          split.ps = handle;
        }
      }
    }
  }
}
var mba = null;
var mbi = null;
if (is_ios || is_android) {
  mba = document.createElement("a");
  mbi = document.createElement("img");
  mbi.border = 0;
  mbi.draggable = "false";
  mbi.className = "nsi";
  mbi.width = 1245;
  mbi.height = 260;
  mbi.style.position = "fixed";
  mbi.style.left = "0px";
  mbi.style.bottom = "0px";
  mbi.style.zIndex = 70;
  mbi.src = "/s/n2.jpg";
  mba.appendChild(mbi);
  document.body.appendChild(mba);
  if (is_ios) {
    mba.href = "https://itunes.apple.com/us/app/slither.io/id1091944550?ls=1&mt=8";
  } else {
    if (is_android) {
      mba.href = is_amazon ? "http://www.amazon.com/Lowtech-Enterprises-slither-io/dp/B01E312TYQ/" : "https://play.google.com/store/apps/details?id=air.com.hypah.io.slither";
    }
  }
}
resize();
o = {
  f : function(raw, success, n) {
    if ("success" == success) {
      loadSos(raw);
    }
  }
};
getData("/i49526.txt", o);
//Set fake mouse coordinates
window.setMouseCoordinates = function(x, y){
    xm = x;
    ym = y;
}
// Mouse to map coordinates
window.mouseToMap = function (x, y) {
  mapX = x - ww / 2;
  mapY = y - hh / 2;
  return [mapX, mapY];
}
// Map to mouse coordinates
window.mapToMouse = function(x, y){
  mouseX = (x*2)+ww;
  mouseY = (y*2)+hh;
  return [mouseX, mouseY];
}
