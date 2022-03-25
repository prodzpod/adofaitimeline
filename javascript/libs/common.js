window.addEventListener('load', init);
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
window.addEventListener('scroll', scroll);
var isIE = false;
var professor_id;

Array.prototype.at = function(n) { return n < 0 ? this[this.length + n] : this[n]; }

function init() {
    let ua = window.navigator.userAgent;
    let old_ie = ua.indexOf('MSIE ');
    let new_ie = ua.indexOf('Trident/');
    if ((old_ie > -1) || (new_ie > -1)) {
        isIE = true;
    }
    if (!isIE) {
        const animated = document.getElementsByClassName("composite");
        for (var i = 0; i < animated.length; i++) {
            let element = animated[i].getAnimations();
            for (var j = 0; j < element.length; j++) {
                element[j].effect.composite = 'add';
            }
        }
    }
    custom_init();
    resize();
}
function resize() {
    custom_resize();
    scroll();
}
function scroll() {
    custom_scroll();
}

function encode_query(query) {
    c = [];
    for (q of Object.entries(query)) {
        if (q[1] === null || q[1] === undefined) continue
        c.push(encodeURIComponent(String(q[0])) + "=" + encodeURIComponent(String(q[1])));
    }
    return c.join("&");
}

function send(method, query, body, cb) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open(method, "api?" + encode_query(query), true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener('load', (e) => { cb(xhr.status == 204 ? '' : JSON.parse(xhr.responseText), xhr.status); });
        xhr.send(JSON.stringify(body))
    } catch (e) { console.error(e) };
}

function send_get(query, cb) {
    return send("GET", query, null, cb);
} 

function send_post(query, cb) {
    return send("POST", query, {'id': window.sessionStorage.getItem('id'), 'pw': window.sessionStorage.getItem('pw')}, cb);
}

function sNull(str, def) { 
    if (!str?.length) return null;
    switch (typeof(str) == 'string' ? str.toLowerCase() : str) {
        case 'null':
        case def:
            return null;
        case '':
        case 'undefined':
            return undefined;
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            if (!isNaN(str)) return Number(str);
            return str;
    }
}

var debug_parse_log = (res) => {
    console.log(res);
    return res;
}

function custom_init() {}
function custom_resize() {}
function custom_scroll() {}

function cleanElement(el) { if (typeof(el) == 'string') el = document.getElementById(el); while (el?.hasChildNodes()) el.removeChild(el.firstChild); }

function checkEnter(event, func, ...args) {
    if (event.keyCode === 13) func(...args);
}

function insertElement(type, parent, classList, html) {
    let e = document.createElement(type);
    if (![undefined, null, false].includes(html)) e.innerHTML = html;
    if (classList) {
        if (typeof(classList) == 'string') classList = [classList];
        if (classList.length) e.classList.add(...classList);
    } 
    if (parent) {
        if (typeof(parent) == 'string') parent = document.getElementById(parent);
        if (parent) parent.appendChild(e);
    }
    return e;
}

function insertSpacer(parent) { return insertElement('div', parent, ['spacer']); }

function toJSDate(num) {
    if (typeof(num) == 'string') {
        if (isNaN(num)) num = new Date(num);
        else num = Number(num);
    }
    if (typeof(num) == 'number') num = new Date(num);
    return `${String(num.getFullYear()).padStart(4, '0')}-${String(num.getMonth()+1).padStart(2, '0')}-${String(num.getDate()).padStart(2, '0')}`
}

function rdiv(a, b) { return a - (a % b); }

function fweek(num) {
    if (typeof(num) == 'string') {
        if (isNaN(num)) num = new Date(num);
        else num = Number(num);
    }
    if (typeof(num) == 'number') num = new Date(num);
    return num.getTime() - (((num.getDay() + 6) % 7) * 86400000) - (num.getTime() % 86400000);
}

function resizeArea(el) {
    if (typeof(el) == 'string') el = document.getElementById(el);
    if (el) el.style.height = el.scrollHeight + 'px';
}

function scrollToLeft() { window.scrollTo(0, 0); }
function scrollToRight() { window.scrollTo(Number.MAX_SAFE_INTEGER, 0); }

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return (Math.round(r * 255) * 65536) + (Math.round(g * 255) * 256) + Math.round(b * 255);
}