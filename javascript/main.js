const FILE_VERSION = 1;
const ADOFAI_VERSION = 6;
const conv = { "R": 0, "p": 15, "J": 30, "E": 45, "T": 60, "o": 75, "U": 90, "q": 105, "G": 120, "Q": 135, "H": 150, "W": 165, "L": 180, "x": 195, "N": 210, "Z": 225, "F": 240, "V": 255, "D": 270, "Y": 285, "B": 300, "C": 315, "M": 330, "A": 345, "!": 999, "5": -1, "6": -1, "7": -1, "8": -1 };
var lang = '한글', name, data, copy = [], selected = [], edit = null, bars = 4, bar = 0, y = 1;

function custom_init() {
    if (localStorage.getItem('data')) {
        try {
            switchLanguage(localStorage.getItem('lang'));
            document.getElementById('drop-feedback').innerHTML = l(LANG_UI, 'drop');
            data = jsonpack.unpack(LZString.decompressFromUTF16(localStorage.getItem('data')));
            name = localStorage.getItem('name');
            load();
            updateEdit();
        }
        catch { 
            localStorage.removeItem('data');
            localStorage.removeItem('name');   
        }
    } else {
        switchLanguage(localStorage.getItem('lang'));
        document.getElementById('drop-feedback').innerHTML = l(LANG_UI, 'drop');
    }
}

function dragend(ev) {
    document.getElementById('drop').classList.remove('hovered');
}

function drag(ev) {
    ev.preventDefault();
    document.getElementById('drop').classList.add('hovered');
}

function drop(ev) {
    ev.preventDefault();
    let file;
    if (ev.dataTransfer.items) file = Array.from(ev.dataTransfer.items).find(x => x.kind === 'file').getAsFile();
    else file = ev.dataTransfer.files[0];
    name = file.name;
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        try {
            data = JSON.parse(event.target.result.replace(/\,(?!\s*?[\{\[\"\'\w\-])/g, ''));
            localStorage.setItem('data', LZString.compressToUTF16(jsonpack.pack(data)));
            localStorage.setItem('name', name);
            load();
        } catch {
            document.getElementById('drop-feedback').innerHTML = l(LANG_UI, 'dropFail');
        }
    });
    reader.readAsText(file);
}

function switchLanguage(l=null) {
    console.log(l)
    if (l) lang = l;
    else lang = (lang == 'en') ? '한글' : 'en';
    localStorage.setItem('lang', lang);
    document.getElementById('lang-switch').style.left = (lang == 'en') ? '0px' : '16px';
    if (lang == 'en') {
        for (let o of document.getElementsByClassName('en')) o.style.display = '';
        for (let o of document.getElementsByClassName('한글')) o.style.display = 'none';
    } else {
        for (let o of document.getElementsByClassName('en')) o.style.display = 'none';
        for (let o of document.getElementsByClassName('한글')) o.style.display = '';
    }
    updateEdit();
}

function load() {
    document.getElementById('drop').style.display = 'none';
    document.getElementById('content').style.display = 'inline-block';
    if (data.timelineEditorVersion !== FILE_VERSION) { //* skip treating it if possible
        // convert pathdata to angledata
        if (data.pathData) {
            data.angleData = [];
            for (let i = 0; i < data.pathData.length; i++) {
                data.angleData.push(conv[data.pathData[i]]);
                if (data.angleData[data.angleData.length - 1] == -1) {
                    let offset = 0;
                    switch (data.pathData[i]) {
                        case "5":
                            offset = 108;
                            break;
                        case "6":
                            offset = 252;
                            break;
                        case "7":
                            offset = 360 / 7;
                            break;
                        case "8":
                            offset = 360 - (360 / 7);
                            break;
                    }
                    data.angleData[data.angleData.length - 1] = (data.angleData[data.angleData.length - 2] + offset) % 360;
                }
            }
            delete data.pathData;
            data.settings.version = ADOFAI_VERSION;
        }
        data.floorData = [];
        data.twirl = data.actions.filter(x => x.eventType == 'Twirl').map(x => x.floor);
        let prev = 0, twirled = 0;
        for (let i = 0; i < data.angleData.length; i++) {
            if (data.twirl.includes(i)) twirled ^= 1;
            let angle = rdiv(180 + prev - data.angleData[i], 360);
            if (angle == 0) angle = 360;
            if (data.angleData[i] == 999) { angle = 0; data.angleData[i] = rdiv(180 + prev, 360); }
            data.floorData.push((data.floorData[data.floorData.length - 1] ?? 0) + (twirled ? 360 - angle : angle) / 180);
            prev = data.angleData[i];
        }
        for (o of data.actions) {
            o.start = data.floorData[o.floor] + ((o.rotationOffset ?? 0) / 180);
            o.end = o.start + (o.duration ?? 0);
            o.y ??= 0;
            o.sortOrder = 0;
        }
        data.timelineEditorVersion = 1; 
        localStorage.setItem('data', LZString.compressToUTF16(jsonpack.pack(data)));
    }
    update();
}

function update() {
    //* Load actions within the section *//
    let floors = [];
    for (let i = 0; i < data.floorData.length; i++) {
        let f = data.floorData[i], a = data.angleData[i];
        if (bar <= f && f <= bar + bars) {        
            let ret = {
                number: i,
                floor: f,
                enter: rdiv(data.angleData[i - 1] ?? 0, 360),
                exit: rdiv(a ?? 0, 360),
                duration: f - (data.floorData[i - 1] ?? 0),
                isTwirl: data.twirl.indexOf(i) % 2,
                willBeMidspin: false,
                willBeUTurn: false
            }
            ret.isMidspin = ret.duration == 0;
            ret.isUTurn = ret.duration == 2;
            if (ret.isMidspin && floors.length) floors[floors.length - 1].willBeMidspin = true;
            if (ret.isUTurn && floors.length) floors[floors.length - 1].willBeUTurn = true;
            floors.push(ret);
        }
    }
    let bpm = data.settings.bpm;
    let actions = [];
    for (let i = 0; i < data.actions.length; i++) {
        let o = data.actions[i];
        if ((bar <= o.start && o.start < bar + bars) || (bar < o.end && o.end <= bar + bars)) {
            if (o.eventType == 'Twirl') continue;
            if (o.eventType == 'SetSpeed') {
                let ret = {
                    bpm: o.speedType == 'Bpm' ? o.beatsPerMinute : bpm * o.bpmMultiplier,
                    text: o.speedType == 'Bpm' ? o.beatsPerMinute : 'x' + o.bpmMultiplier
                };
                if (ret.bpm >= bpm * 2.1) ret.color = 2;
                else if (ret.bpm >= bpm * 1.05) ret.color = 1;
                else if (ret.bpm > bpm * 0.95) ret.color = 0;
                else if (ret.bpm * 2.1 >= bpm) ret.color = -1;
                else ret.color = -2;
                let xi = floors.findIndex(x => x.floor == o.start);
                let res = floors[xi].isMidspin ? (floors[xi - 1] ?? null) : floors[xi];
                if (res !== null) Object.assign(res, ret);
            } else {
                actions.push(JSON.parse(JSON.stringify(o)));
                actions[actions.length - 1].number = i;
            }
        }
    }
    floors.sort((a, b) => a.floor - b.floor).forEach(v => { v.perc = (v.floor - bar) / bars; });
    actions.sort((a, b) => a.start - b.start).forEach(v => { v.perc = (v.end - bar) / bars; v.percStart = (v.start - bar) / bars; });
    //* Draw Layout *//
    cleanElement('table');
    const LINECOLOR = { '-1': '#0000FF', '0': '#CCCCCC', '1': '#FF0000' };
    for (let o of floors) {
        if (!o.isMidspin) {
            let line = insertElement('div', 'table', 'line');
            line.style.setProperty('--perc', o.perc);
            line.style.backgroundColor = LINECOLOR[Math.sign(o.color ?? 0)];
        }
        let icon = insertElement('div', 'table', 'icon');
        icon.style.setProperty('--perc', o.perc);
        if (!o.isMidspin) {
            insertElement('div', icon, 'tile-center');
            let start = insertElement('div', icon, 'tile-edge');
            start.style.setProperty('--deg', rdiv(180 + o.enter, 360));
            if (o.isUTurn) {
                start.classList.add('tile-uturn');
                start.style.setProperty('--deg', o.enter);
            }
        }
        let end = insertElement('div', icon, 'tile-edge');
        if (o.willBeMidspin) end.classList.add('tile-midspin');
        if (o.willBeUTurn) end.classList.add('tile-uturn');
        end.style.setProperty('--deg', o.exit);
        if (!o.isMidspin) insertElement('div', icon, 'tile-number', o.number);
        if (!o.willBeMidspin) {
            let tri = insertElement('div', icon, 'tile-triangle');
            tri.style.setProperty('--deg', rdiv(180 + o.exit, 360));
        }
        if (o.bpm) {
            let e = insertElement('img', icon, 'speed');
            e.src = 'images/speed' + o.color + '.png';
            let speedText = insertElement('div', icon, 'speed-number', o.text);
            speedText.style.color = LINECOLOR[Math.sign(o.color ?? 0)];
        }
        if (o.isTwirl != -1) {
            let e = insertElement('img', icon, 'twirl');
            e.src = 'images/twirl-' + (o.duration >= 1 ? 'b' : 'r') + o.isTwirl + '.png'
        }
    }
    let ymax = -1;
    for (let o of actions) if (o.perc != o.percStart) {
        cellTrail = insertElement('div', 'table', 'cell-trail');
        cellTrail.style.setProperty('--x', Math.max(0, o.percStart));
        cellTrail.style.setProperty('--w', Math.min(1, o.perc) - Math.max(0, o.percStart));
        cellTrail.style.setProperty('--y', o.y);
        cellTrail.id = 'trail-' + o.number;
    }
    for (let o of actions) {
        let cell = insertElement('div', 'table', 'cell');
        cell.style.setProperty('--x', Math.min(1, o.perc));
        cell.style.setProperty('--y', o.y);
        ymax = Math.max(ymax, o.y);
        cell.id = 'cell-' + o.number;
        cell.setAttribute('onclick', `select(event, ${o.number})`);
        let e = insertElement('img', cell, 'cell-icon');
        e.src = 'images/' + o.eventType + '.png';
    }
    y = ymax + 2;
    document.querySelector(':root').style.setProperty('--ymax', y);
    for (let i = 0; i < y; i++) {
        if (i != 0) {
            let yup = insertElement('button', 'table', ['up', 'hlist']);
            insertElement('i', yup, ['xi-angle-up-min', 'middle']);
            yup.style.setProperty('--y', i);
            yup.setAttribute('onclick', `swap(${i}, ${i-1})`);
        }
        if (i != y - 1) {
            let yup = insertElement('button', 'table', ['down', 'hlist']);
            insertElement('i', yup, ['xi-angle-down-min', 'middle']);
            yup.style.setProperty('--y', i);
            yup.setAttribute('onclick', `swap(${i}, ${i+1})`);
        }
    }
    console.log(floors, actions);
}

function select(event, n) {
    if (event.shiftKey && selected.length) {
        let a = data.actions[selected[selected.length - 1]].end;
        let b = data.actions[n].end;
        for (let i = 0; i < data.actions.length; i++) 
            if (Math.min(a, b) <= data.actions[i].end && data.actions[i].end <= Math.max(a, b)) selected.push(i);
        selected = Array.from(new Set(selected));
    }
    else if (event.ctrlKey) selected.push(n);
    else selected = [n];
    for (let o of Array.from(document.getElementsByClassName('cell'))) o.classList.remove('selected');
    edit = selected.length ? JSON.parse(JSON.stringify(data.actions[selected[0]])) : null;
    if (edit) for (k in edit) if (LANG_PROCESS.get(k)[0] == 'tag') edit[k] = edit[k].trim().replace(/\s+/g, ' ').split(' ');
    for (let k of selected) {
        document.getElementById('cell-' + k).classList.add('selected');
        edit = intersect(edit, JSON.parse(JSON.stringify(data.actions[k])));
        edit.isMove = (edit.isMove !== false) && (data.actions[k].eventType === "MoveTrack" || data.actions[k].eventType === "MoveDecorations");
    }
    //* configure edit
    updateEdit();
}

function updateEdit() {
    cleanElement('table-status');
    const _order = Array.from(LANG_MAIN.keys());
    if (edit === null) insertElement('p', 'table-status', 'center', l(LANG_UI, 'noSelect'));
    else for (let o of Object.entries(edit).sort((a, b) => _order.indexOf(a[0]) - _order.indexOf(b[0]))) {
        let proc = LANG_PROCESS.get(o[0])
        if (proc[0] === 'skip') continue;
        if (edit['start'] === edit['end'] && edit['start'] !== null && o[0] === 'end') continue;
        let suffix, min, max, ct, ctx, h = [], name, input = [];
        ct = insertElement('div', 'table-status', 'vlist');
        if (proc[0] !== 'floor') insertElement('h4', ct, null, l(LANG_MAIN, o[0]));
        ctx = insertElement('div', ct, 'hlist');
        switch (proc[0]) {
            case 'int':
            case 'float':
            case 'floor':
                suffix = proc[1];
                min = proc[2];
                max = proc[3];
                if (proc[0] === 'floor') insertElement('p', ctx, null, l(LANG_MAIN, proc[0]));
                input[0] = insertElement('input', ctx);
                input[0].type = 'number';
                input[0].value = o[1];
                input[0].id = o[0];
                input[0].setAttribute('onchange', `changeData(this.id, this.value)`);
                if (proc[0] !== 'float') input[0].step = 1;
                if (proc[2] !== undefined) input[0].min = proc[2];
                if (proc[3] !== undefined) input[0].max = proc[3];
                insertElement('p', ctx, 'suffix', (lang == 'en') ? suffix[0] : suffix[1]);
                break;
            case 'coord':
                suffix = proc[1];
                min = proc[2];
                max = proc[3];
                insertElement('p', ctx, null, 'X');
                input[0] = insertElement('input', ctx);
                input[0].type = 'number';
                input[0].value = o[1][0];
                input[0].id = o[0] + '-x';
                input[0].setAttribute('onchange', `changeData(this.id, this.value)`);
                insertElement('p', ctx, null, 'Y');
                input[1] = insertElement('input', ctx);
                input[1].type = 'number';
                input[1].value = o[1][1];
                input[1].id = o[0] + '-y';
                input[1].setAttribute('onchange', `changeData(this.id, this.value)`);
                if (proc[2] !== undefined) {
                    input[0].min = proc[2];
                    input[1].min = proc[2];
                }
                if (proc[3] !== undefined) {
                    input[0].max = proc[3];
                    input[1].max = proc[3];
                }
                insertElement('p', ctx, 'suffix', (lang == 'en') ? suffix[0] : suffix[1]);
                break;
            case 'barbeat':
                insertElement('p', ctx, null, 'Bar');
                input[0] = insertElement('input', ctx);
                input[0].type = 'number';
                input[0].value = Math.floor(o[1]) - 1;
                input[0].id = o[0] + '-bar';
                input[0].setAttribute('onchange', `changeData(this.id, this.value)`);
                insertElement('p', ctx, null, 'Beat');
                input[1] = insertElement('input', ctx);
                input[1].type = 'number';
                input[1].value = (o[1] % 1) * 8;
                input[1].id = o[0] + '-beat';
                input[1].setAttribute('onchange', `changeData(this.id, this.value)`);
                if (proc[2] !== undefined) {
                    input[0].min = proc[2];
                    input[1].min = proc[2];
                }
                if (proc[3] !== undefined) {
                    input[0].max = proc[3];
                    input[1].max = proc[3];
                }
                break;
            case 'tile':
                input[0] = insertElement('input', ctx);
                input[0].type = 'number';
                input[0].step = 1;
                input[0].value = o[1][0];
                input[0].id = o[0];
                input[0].setAttribute('onchange', `changeData(this.id, this.value)`);
                insertElement('p', ctx, 'suffix', (lang == 'en') ? 'tiles' : '해당 타일');
                input[1] = insertElement('div', ctx, 'checkbox', (lang == 'en') ? 'This Tile' : '이 타일');
                if (o[1][1] === 'ThisTile') input[1].checked = true;
                else input[1].checked = false;
                input[1].id = o[0] + '-thisTile';
                input[1].setAttribute('onclick', `changeData(this.id, this.value)`);
                input[2] = insertElement('div', ctx, 'checkbox', (lang == 'en') ? 'First Tile' : '첫 타일');
                if (o[1][1] === 'Start') input[2].checked = true;
                else input[2].checked = false;
                input[2].id = o[0] + '-start';
                input[2].setAttribute('onclick', `changeData(this.id, this.value)`);
                input[3] = insertElement('div', ctx, 'checkbox', (lang == 'en') ? 'Last Tile' : '마지막 타일');
                if (o[1][1] === 'End') input[3].checked = true;
                else input[3].checked = false;
                input[3].id = o[0] + '-end';
                input[3].setAttribute('onclick', `changeData(this.id, this.value)`);
                break;
            case 'checkbox':
                input[0] = insertElement('div', ctx, 'checkbox', (lang == 'en') ? 'Enabled' : '켜짐');
                input[0].type = 'checkbox';
                input[0].id = o[0] + '-true';
                input[0].setAttribute('onclick', `changeData(this.id, this.value)`);
                input[1] = insertElement('div', ctx, 'checkbox', (lang == 'en') ? 'Disabled' : '꺼짐');
                input[1].type = 'checkbox';
                input[1].id = o[0] + '-false';
                input[1].setAttribute('onclick', `changeData(this.id, this.value)`);
                if (o[1] === 'Enabled') input[0].checked = true;
                else input[0].checked = false;
                if (o[1] === 'Disabled') input[1].checked = true;
                else input[1].checked = false;
                break;
            case 'select':
                let options = proc[1];
                if (options === null) {
                    if (edit.eventType === 'MoveCamera') options = LANG_CAMBASIS;
                    else if (edit.eventType === 'MoveDecorations') options = LANG_DECOBASIS;
                    else options = LANG_ALLBASIS;
                }
                input[0] = insertElement('select', ctx);
                for (let o of options) {
                    let option = insertElement('option', input[0], null, l(options, o[0]));
                    option.value = o[0];
                }
                input[0].value = o[1];
                input[0].id = o[0];
                input[0].setAttribute('onchange', `changeData(this.id, this.value)`);
                break;
            case 'string':
                input[0] = insertElement('input', ctx);
                input[0].type = 'string';
                input[0].id = o[0];
                input[0].setAttribute('onchange', `changeData(this.id, this.value)`);
                break;
            case 'tag':
                let tags;
                if (!o[1]) tags = [];
                else tags = o[1];
                count = 0;
                for (let t of tags) {
                    let i = insertElement('input', ctx);
                    input[count].type = 'string';
                    input[count].value = t;
                    input[count].id = o[0] + '-' + count;
                    input[count].setAttribute('onchange', `changeData(this.id, this.value)`);
                    count++;
                }
                break;
        }
    }
}

function changeData(id, value) {
    let k = id.split('-');
    console.log(k, value);
}

function intersect(a, b) {
    let res = Array.isArray(a) ? [] : {};
    if (Array.isArray(a) + Array.isArray(b) == 1) return null;
    for (let k in a) {
        if (b[k] === undefined) continue;
        if (LANG_PROCESS.get(k)?.[0] == 'tag') b[k] = b[k].trim().replace(/\s+/g, ' ').split(' ');
        if (typeof(a[k]) == 'object' && typeof(b[k]) == 'object') res[k] = intersect(a[k], b[k]);
        else res[k] = (a[k] == b[k]) ? a[k] : null;
    }
    return res;
}

function moveBar(n, relative) {
    bar = relative ? bar + Number(n) : Number(n);
    if (bar < 0) bar = 0;
    let count = 0;
    for (let o of document.getElementById('table-bg').childNodes) if (o?.firstChild) {
        o.childNodes[1].firstChild.innerHTML = bar + count - 1;
        count++;
    }
    update();
}

function reBar(n, relative) {
    bars = relative ? bars + Number(n) : Number(n);
    if (bars < 1) bars = 1;
    for (let o of Array.from(document.getElementById('table-bg').childNodes)) {
        if (o.id != 'copy-source') o.parentElement.removeChild(o);
    }
    for (let i = 1; i < bars; i++) {
        let clone = document.getElementById('copy-source').cloneNode(true); clone.id = '';
        document.getElementById('table-bg').appendChild(clone);
    }
    let count = 0;
    for (let o of document.getElementById('table-bg').childNodes) if (o?.firstChild) {
        o.childNodes[1].firstChild.innerHTML = bar + count - 1;
        count++;
    }
    update();
}

function swap(a, b) {
    let x = data.actions.filter(x => x.y == a);
    let y = data.actions.filter(x => x.y == b);
    x.map(x => x.y = b);
    y.map(y => y.y = a);
    update();
}

function reset() {
    localStorage.removeItem('data');
    localStorage.removeItem('name');
    name = undefined;
    data = undefined;
    copy = [];
    selected = [];
    bar = 0;
    y = 1;
    document.getElementById('drop').style.display = 'flex';
    document.getElementById('content').style.display = 'none';
    document.getElementById('drop-feedback').innerHTML = l(LANG_UI, 'drop');
}

function l(file, id) {
    return (lang == 'en') ? file.get(id)?.[0] : file.get(id)?.[1];
}

//! ------------------------------------------------- COMMON LIBS --------------

function rdiv(n, a) {
    return (n % a + a) % a;
}

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

function cleanElement(el) { if (typeof(el) == 'string') el = document.getElementById(el); while (el?.hasChildNodes()) el.removeChild(el.firstChild); }

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

function checkEnter(event, func, ...args) {
    if (event.keyCode === 13) func(...args);
}

function resizeArea(el) {
    if (typeof(el) == 'string') el = document.getElementById(el);
    if (el) el.style.height = el.scrollHeight + 'px';
}

function scrollToLeft() { window.scrollTo(0, 0); }
function scrollToRight() { window.scrollTo(Number.MAX_SAFE_INTEGER, 0); }

function subSort(a, b) {
    a = tokenizeByNumber(a.name ?? a);
    b = tokenizeByNumber(b.name ?? b);
    while (true) {
        if (!a.length && !b.length) return 0; if (!a.length) return -1; if (!b.length) return 1; // special handler for simpler strings
        if (typeof(a[0]) == 'number' && typeof(b[0]) == 'string') return -1; if (typeof(a[0]) == 'string' && typeof(b[0]) == 'number') return 1; // number goes first
        if (typeof(a[0]) == 'number') { let ret = a[0] - b[0]; if (ret !== 0) return ret; }
        else { let ret = a[0].localeCompare(b[0]); if (ret !== 0) return ret; }
        a.splice(0, 1); b.splice(0, 1);
    }
}

function tokenizeByNumber(c) {
    if (c === '') return [];
    let isNumber = isNaN(c[0])
    let ret = [], txt = ''
    for (let i = 0; i < c.length; i++) {
        if (isNumber === isNaN(c[i])) txt += c[i];
        else {
            if (!isNumber) txt = Number(txt);
            ret.push(txt);
            isNumber = !isNumber;
            txt = c[i];
        }
    }
    if (!isNumber) txt = Number(txt);
    ret.push(txt);
    return ret;
}

function toJSDate(num) {
    if (typeof(num) == 'string') {
        if (isNaN(num)) num = new Date(num);
        else num = Number(num);
    }
    if (typeof(num) == 'number') num = new Date(num);
    return `${String(num.getFullYear()).padStart(4, '0')}-${String(num.getMonth()+1).padStart(2, '0')}-${String(num.getDate()).padStart(2, '0')}`
}