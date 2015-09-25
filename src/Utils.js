export function enums(ids) {
    var obj = {};
    ids.forEach(function (name, i) {
        obj[name] = i;
    });
    return obj;
}

export function clone(obj) {
    var ret = {};
    for (var key in obj) {
        ret[key] = obj[key];
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
