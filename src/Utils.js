export function enums(ids) {
    var obj = {};
    ids.forEach(function (name, i) {
        obj[name] = i;
    });
    return obj;
}

export function clone(obj, keys) {
    var ret = {};
    if (Array.isArray(keys)) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            ret[key] = obj[key];
        }
    } else {
        for (var key in obj) {
            ret[key] = obj[key];
        }
    }
    return ret;
}

export function exclude(obj, targets) {
    var keys;
    if (typeof targets == 'string') {
        keys = new Set([targets]);
    } else {
        keys = new Set(targets);
    }
    var ret = {};
    for (var key in obj) {
        if (!(key in keys)) {
            ret[key] = obj[key];
        }
    }
    return ret;
}

export function Set(arr) {
    arr.forEach((key)=> this[key] = null)
}

export function noop() {}


export function getRootComponent(c) {
    while (c) {
        if ('id' in c.props) {
            return c;
        }
        c = c.props.parent;
    }
}

export function extend(target, ...objs) {
    objs.forEach(function (obj) {
        if (!obj) return;
        for (var key in obj) {
            target[key] = obj[key];
        }
    });
    return target;
}

export function getTMPDOMRoot(modal) {
    var $root = document.createElement('div'),
        className = 'TMPDOMRoot';

    if (modal) className += ' Mask';
    $root.className = className;

    document.body.appendChild($root);
    return $root;
}
