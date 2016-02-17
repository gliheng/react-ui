(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactUI"] = factory(require("React"));
	else
		root["ReactUI"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _HGroup = __webpack_require__(3);

	var _HGroup2 = _interopRequireDefault(_HGroup);

	var _VGroup = __webpack_require__(12);

	var _VGroup2 = _interopRequireDefault(_VGroup);

	var _View = __webpack_require__(13);

	var _View2 = _interopRequireDefault(_View);

	var _Grid = __webpack_require__(14);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _Tabs = __webpack_require__(15);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	var _Toast = __webpack_require__(17);

	var _Toast2 = _interopRequireDefault(_Toast);

	var _Popup = __webpack_require__(18);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _Menu = __webpack_require__(16);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Utils = __webpack_require__(2);

	var Utils = _interopRequireWildcard(_Utils);

	var _mixinsPersistentState = __webpack_require__(8);

	__webpack_require__(19);

	function config(_config) {
	    Utils.extend(_Constants2['default'].config, _config);

	    if (_Constants2['default'].config.persistState) {
	        var _Constants$config$persistFunc = _Constants2['default'].config.persistFunc();

	        var _Constants$config$persistFunc2 = _slicedToArray(_Constants$config$persistFunc, 2);

	        var reader = _Constants$config$persistFunc2[0];
	        var writer = _Constants$config$persistFunc2[1];

	        (0, _mixinsPersistentState.setReader)(reader);
	        (0, _mixinsPersistentState.setWriter)(writer);
	    } else {
	        (0, _mixinsPersistentState.setReader)(null);
	        (0, _mixinsPersistentState.setWriter)(null);
	    }
	}

	config();

	function bootstrap(app) {
	    function resize() {
	        var $node = app.getDOMNode();
	        app.resize($node.clientWidth, $node.clientHeight);
	    }

	    window.addEventListener('resize', function () {
	        resize();
	        app.saveState && app.saveState();
	    });

	    resize();
	    return app;
	}

	exports.HGroup = _HGroup2['default'];
	exports.VGroup = _VGroup2['default'];
	exports.Grid = _Grid2['default'];
	exports.View = _View2['default'];
	exports.Tabs = _Tabs2['default'];
	exports.Popup = _Popup2['default'];
	exports.Toast = _Toast2['default'];
	exports.Menu = _Menu2['default'];
	exports.bootstrap = bootstrap;
	exports.config = config;
	exports.Utils = Utils;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Utils = __webpack_require__(2);

	exports['default'] = {
	    Types: (0, _Utils.enums)(['HGROUP', 'VGROUP', 'GRID']),

	    config: {
	        transitionDuration: 500,
	        gutterWidth: 4,
	        persistState: true,
	        menuItemWidth: 87,
	        menuItemHeight: 30,
	        menuSepItemHeight: 1,
	        persistFunc: function persistFunc() {
	            return [function (id) {
	                return JSON.parse(localStorage['ui-persist:' + id] || '{}');
	            }, function (id, data) {
	                return localStorage['ui-persist:' + id] = JSON.stringify(data);
	            }];
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.enums = enums;
	exports.empty = empty;
	exports.clone = clone;
	exports.exclude = exclude;
	exports.Set = Set;
	exports.noop = noop;
	exports.getRootComponent = getRootComponent;
	exports.extend = extend;
	exports.getTMPDOMRoot = getTMPDOMRoot;

	function enums(ids) {
	    var obj = {};
	    ids.forEach(function (name, i) {
	        obj[name] = i;
	    });
	    return obj;
	}

	/** check whether an object is empty
	 *  null, {}, {child-0: null} are all empty
	 */

	function empty(obj) {
	    if (!obj) {
	        return true;
	    }
	    if (Array.isArray(obj)) {
	        return !obj.length;
	    } else if (typeof obj == 'object') {
	        var empty = true;
	        for (var key in obj) {
	            if (obj[key]) {
	                empty = false;
	                break;
	            }
	        }
	        return empty;
	    }
	    return true;
	}

	function clone(obj, keys) {
	    var ret = {};
	    if (Array.isArray(keys)) {
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (key in obj) {
	                ret[key] = obj[key];
	            }
	        }
	    } else {
	        for (var key in obj) {
	            ret[key] = obj[key];
	        }
	    }
	    return ret;
	}

	function exclude(obj, targets) {
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

	function Set(arr) {
	    var _this = this;

	    arr.forEach(function (key) {
	        return _this[key] = null;
	    });
	}

	function noop() {}

	function getRootComponent(c) {
	    while (c) {
	        if ('id' in c.props) {
	            return c;
	        }
	        c = c.props.parent;
	    }
	}

	function extend(target) {
	    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        objs[_key - 1] = arguments[_key];
	    }

	    objs.forEach(function (obj) {
	        if (!obj) return;
	        for (var key in obj) {
	            target[key] = obj[key];
	        }
	    });
	    return target;
	}

	function getTMPDOMRoot(modal) {
	    var $root = document.createElement('div'),
	        className = 'TMPDOMRoot';

	    if (modal) className += ' Mask';
	    $root.className = className;

	    document.body.appendChild($root);
	    return $root;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _GroupBase = __webpack_require__(4);

	var HGroup = (0, _GroupBase.layoutFactory)(_Constants2['default'].Types.HGROUP, 'HGroup');
	exports['default'] = HGroup;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Gutter = __webpack_require__(6);

	var _Gutter2 = _interopRequireDefault(_Gutter);

	var _mixinsResponsive = __webpack_require__(7);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var _mixinsPersistentState = __webpack_require__(8);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _mixinsLayoutMaster = __webpack_require__(9);

	var _Utils = __webpack_require__(2);

	var layoutFactory = function layoutFactory(type, elementName) {
	    return _react2['default'].createClass({
	        displayName: elementName,

	        mixins: [_mixinsLayoutMaster.LayoutMaster, _mixinsResponsive2['default'], _mixinsPersistentState2['default']],

	        getDefaultProps: function getDefaultProps() {
	            return {
	                type: type,
	                resizable: true
	            };
	        },

	        componentWillMount: function componentWillMount() {
	            var size = [],
	                precise = [];
	            _react2['default'].Children.forEach(this.props.children, function (c, i) {
	                if (type == _Constants2['default'].Types.HGROUP && 'width' in c.props || type == _Constants2['default'].Types.VGROUP && 'height' in c.props) {
	                    size[i] = type == _Constants2['default'].Types.HGROUP ? c.props.width : c.props.height;
	                    precise[i] = true;
	                } else {
	                    size[i] = c.props.flex || 1;
	                    precise[i] = false;
	                }
	            });

	            this.state.size = size;
	            this.state.precise = precise;
	        },

	        render: function render() {
	            var _this = this;

	            var className = elementName,
	                props = this.props,
	                state = this.state,
	                width = props.width || state.width,
	                height = props.height || state.height,
	                children = [];

	            if (props.className) {
	                className += ' ' + props.className;
	            }

	            var dimension = this.getLayoutManager().layout(state.size, state.precise, type == _Constants2['default'].Types.HGROUP ? width : height);

	            if (dimension) {
	                var _dimension = _slicedToArray(dimension, 2);

	                var size = _dimension[0];
	                var pos = _dimension[1];

	                // create gutters
	                if (props.resizable) {
	                    children = children.concat(this.renderGutters(type != _Constants2['default'].Types.HGROUP, pos));
	                }

	                // create panels
	                _react2['default'].Children.forEach(props.children, function (c, i) {
	                    var key = 'child-' + i,
	                        style = undefined;

	                    if (type == _Constants2['default'].Types.HGROUP) {
	                        style = {
	                            position: 'absolute',
	                            left: pos[i],
	                            top: 0,
	                            width: size[i],
	                            height: height
	                        };
	                    } else if (type == _Constants2['default'].Types.VGROUP) {
	                        style = {
	                            position: 'absolute',
	                            left: 0,
	                            top: pos[i],
	                            width: width,
	                            height: size[i]
	                        };
	                    }

	                    children.push(_react2['default'].addons.cloneWithProps(c, (0, _Utils.extend)({
	                        key: c.key || key,
	                        ref: key,
	                        parent: _this
	                    }, style)));
	                });
	            }

	            if ('width' in props && 'height' in props) {
	                var style = {
	                    position: 'absolute',
	                    left: props.left,
	                    top: props.top,
	                    width: props.width,
	                    height: props.height
	                };
	            }

	            return _react2['default'].createElement(
	                'div',
	                { id: props.id,
	                    className: className,
	                    style: style },
	                children
	            );
	        }
	    });
	};

	exports.layoutFactory = layoutFactory;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var Gutter = _react2['default'].createClass({
	    displayName: 'Gutter',

	    onMouseDown: function onMouseDown(evt) {
	        evt.preventDefault();

	        this.startPos = {
	            x: evt.clientX,
	            y: evt.clientY
	        };
	        this.props.getLayoutManager().startResize(this.props.idx, this.props.h);

	        window.addEventListener('mousemove', this.onMouseMove);
	        window.addEventListener('mouseup', this.onMouseUp);
	    },

	    onMouseMove: function onMouseMove(evt) {
	        evt.preventDefault();
	        this.props.getLayoutManager().moveResize(evt.clientX - this.startPos.x, evt.clientY - this.startPos.y);
	    },

	    onMouseUp: function onMouseUp() {
	        this.props.getLayoutManager().doneResize(this.props.idx);
	        window.removeEventListener('mousemove', this.onMouseMove);
	        window.removeEventListener('mouseup', this.onMouseUp);
	    },

	    render: function render() {
	        var className = 'Gutter';
	        if (this.props.className) {
	            className += ' ' + this.props.className;
	        }

	        var style = this.props.style;
	        if (this.state) {
	            if ('width' in this.state) style.width = this.state.width;
	            if ('height' in this.state) style.height = this.state.height;
	            if ('top' in this.state) style.top = this.state.top;
	            if ('left' in this.state) style.left = this.state.left;
	        }
	        return _react2['default'].createElement('div', { className: className, style: style,
	            onMouseDown: this.onMouseDown });
	    }
	});

	exports['default'] = Gutter;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    getInitialState: function getInitialState() {
	        // this is here to ensure state is not null
	        return {};
	    },

	    /** notify children when resized */
	    resize: function resize(width, height) {
	        // if the caller specify width and height, we just apply that size
	        // otherwise we take the size from cache(state or props) and propagate the event down
	        if (width === undefined && height === undefined) {
	            if (this.state && 'width' in this.state && 'height' in this.state) {
	                var _state = this.state;
	                width = _state.width;
	                height = _state.height;
	            } else {
	                var _props = this.props;
	                width = _props.width;
	                height = _props.height;
	            }
	        } else {
	            this.setState({
	                width: width,
	                height: height
	            });
	        }
	        if (typeof this.onResized == 'function') {
	            this.onResized(width, height);
	        }
	        // cascade resize call down the chain
	        for (var key in this.refs) {
	            var c = this.refs[key];
	            if (typeof c.resize == 'function') {
	                var $node = c.getDOMNode();
	                var w = $node.clientWidth,
	                    h = $node.clientHeight;
	                if (w != 0 && h != 0) {
	                    // use DOM size if we can get it
	                    c.resize(w, h);
	                } else {
	                    c.resize();
	                }
	            }
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        // To render child components, this one needs to know DOM size
	        var $node = this.getDOMNode();
	        if (!('width' in this.props || 'height' in this.props) && !('width' in this.state || 'height' in this.state)) {
	            this.setState({
	                width: $node.clientWidth,
	                height: $node.clientHeight
	            }, function () {
	                _this.restoreState();
	            });
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * State are automaticly saved, unless noPersist props is passed.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.setReader = setReader;
	exports.setWriter = setWriter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Utils = __webpack_require__(2);

	var reader = _Utils.noop;

	function setReader(_reader) {
	    reader = _reader || _Utils.noop;
	}

	var writer = _Utils.noop;

	function setWriter(_writer) {
	    writer = _writer || _Utils.noop;
	}

	exports['default'] = {
	    /** get the state dict recursively from the component
	     */
	    getState: function getState(full) {
	        var s = (0, _Utils.clone)(this.state || {}, ['curTab', 'size', 'colsize', 'rowsize']),
	            children = this.props.children;
	        if (full) {
	            var childrenState = {};
	            for (var key in this.refs) {
	                var c = this.refs[key];
	                if (typeof c.getState === 'function') {
	                    childrenState[key] = c.getState(full);
	                }
	            }
	            var cEmpty = (0, _Utils.empty)(childrenState);
	            if ((0, _Utils.empty)(s) && cEmpty) {
	                return null;
	            }
	            if (!cEmpty) {
	                s.children = childrenState;
	            }
	        }
	        return s;
	    },

	    /** apply state to the component
	     */
	    putState: function putState(state) {
	        var _this = this;

	        if (!state) return;
	        var children = this.props.children,
	            childrenState = state.children;

	        this.setState((0, _Utils.exclude)(state, 'children'), function () {
	            if (typeof _this.stateRestored == 'function') {
	                _this.stateRestored();
	            }

	            if (childrenState) {
	                for (var key in childrenState) {
	                    var c = _this.refs[key];
	                    if (c !== undefined && typeof c.putState == 'function') {
	                        c.putState(childrenState[key]);
	                    }
	                }
	            }
	        });
	    },

	    /** get state from component then persist the state info
	     */
	    saveState: function saveState() {
	        var id = this.props.id;
	        // only component with id attribute can save state
	        if (!id || this.props.noPersist) {
	            // console.warn('Only component with id attribute can save state');
	            return;
	        }
	        var s = this.getState(true);
	        writer(id, s);
	    },

	    /** get state from store the apply it the component
	     */
	    restoreState: function restoreState() {
	        var id = this.props.id;
	        if (!id || this.props.noPersist) {
	            // console.warn('Only component with id attribute can save state');
	            return;
	        }
	        var state = reader(id);
	        if (state) {
	            this.putState(state);
	        }
	    }

	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _GroupLayoutManager = __webpack_require__(10);

	var _GroupLayoutManager2 = _interopRequireDefault(_GroupLayoutManager);

	var _GridLayoutManager = __webpack_require__(11);

	var _GridLayoutManager2 = _interopRequireDefault(_GridLayoutManager);

	var _Gutter = __webpack_require__(6);

	var _Gutter2 = _interopRequireDefault(_Gutter);

	var LayoutMaster = {

	    getLayoutManager: function getLayoutManager() {
	        if (!this.layoutManager) {
	            var type = this.props.type,
	                gutter = this.getGutter();
	            if (type === _Constants2['default'].Types.GRID) {
	                this.layoutManager = new _GridLayoutManager2['default'](this, type, gutter);
	            } else if (type === _Constants2['default'].Types.VGROUP || type === _Constants2['default'].Types.HGROUP) {
	                this.layoutManager = new _GroupLayoutManager2['default'](this, type, gutter);
	            }
	        }
	        return this.layoutManager;
	    },

	    getGutter: function getGutter() {
	        return this.props.gutterWidth === undefined ? _Constants2['default'].config.gutterWidth : this.props.gutterWidth;
	    },

	    renderGutters: function renderGutters(h, pos) {
	        var gutters = [],
	            gutter = this.getGutter();
	        var idx = 0;
	        for (var i = 0; i < pos.length - 1; i++) {
	            var key = undefined,
	                style = undefined;
	            if (h) {
	                key = 'gutter-h-' + i;
	                style = {
	                    position: 'absolute',
	                    left: 0,
	                    top: pos[i + 1] - gutter,
	                    width: '100%',
	                    height: gutter };
	            } else {
	                key = 'gutter-v-' + i;
	                style = {
	                    position: 'absolute',
	                    left: pos[i + 1] - gutter,
	                    top: 0,
	                    width: gutter,
	                    height: '100%'
	                };
	            }
	            gutters.push(_react2['default'].createElement(_Gutter2['default'], {
	                className: h ? "ns" : "we",
	                key: key,
	                ref: key,
	                style: style,
	                getLayoutManager: this.getLayoutManager,
	                h: h,
	                idx: i }));
	        }

	        return gutters;
	    },

	    getDefaultSpec: function getDefaultSpec(count) {
	        var spec = [];
	        for (var i = 0; i < parseInt(count); i++) {
	            spec.push('1');
	        }
	        return spec.join(',');
	    },

	    /** return size configuration array on an element
	     *  size is the number corresponding to that row or col
	     *  precise is whether it's absolute px value, otherwise it's a scale
	     */
	    parseSizeSpec: function parseSizeSpec(spec) {
	        var size = [],
	            precise = [];
	        spec.split(',').forEach(function (v, i) {
	            if (v.endsWith('px')) {
	                size[i] = parseInt(v.substr(0, v.length - 2));
	                precise[i] = true;
	            } else {
	                size[i] = parseInt(v);
	                precise[i] = false;
	            }
	        });
	        return [size, precise];
	    }
	};
	exports.LayoutMaster = LayoutMaster;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var GroupLayoutManager = (function () {
	    function GroupLayoutManager(parent, type, gutter) {
	        _classCallCheck(this, GroupLayoutManager);

	        this.type = type;
	        this.gutter = gutter;
	        this.parent = parent;
	    }

	    /** Calc position of gutters */

	    _createClass(GroupLayoutManager, [{
	        key: 'calcPos',
	        value: function calcPos(size) {
	            var _this = this;

	            var d = 0;
	            var pos = size.map(function (size, i) {
	                var p = d;
	                d = p + size + _this.gutter;
	                return p;
	            });

	            return pos;
	        }

	        /** Convert all scale to absolute px unit */
	    }, {
	        key: 'calcSize',
	        value: function calcSize(total, size, precise) {
	            var pxSize = [],
	                remain = total,
	                totalRatio = 0;

	            for (var i = 0; i < size.length; i++) {
	                var v = size[i];
	                if (precise[i]) {
	                    remain -= v;
	                    pxSize[i] = v;
	                } else {
	                    totalRatio += v;
	                }
	            }

	            remain -= (size.length - 1) * this.gutter;

	            for (var i = 0; i < size.length; i++) {
	                if (pxSize[i] === undefined) {
	                    pxSize[i] = size[i] / totalRatio * remain;
	                }
	            }
	            return pxSize;
	        }
	    }, {
	        key: 'layout',
	        value: function layout(size, precise, length) {
	            if (!length) return null;

	            var pxSize = this.calcSize(length, size, precise);
	            var pos = this.calcPos(pxSize);

	            // these are size in pixels
	            this.pxSize = pxSize;

	            return [pxSize, pos];
	        }
	    }, {
	        key: 'startResize',
	        value: function startResize(idx) {
	            this.moveIdx = idx;
	            this.sizeSnapshot = this.parent.state.size.concat();
	            this.pxSnapshot = this.pxSize.concat();
	        }
	    }, {
	        key: 'moveResize',
	        value: function moveResize(x, y) {
	            var size = this.sizeSnapshot.concat(),
	                precise = this.parent.state.precise,
	                pxSnapshot = this.pxSnapshot,
	                delta = this.type == _Constants2['default'].Types.HGROUP ? x : y;

	            this.modifySize(size, precise, pxSnapshot, this.moveIdx, delta);
	            this.parent.setState({
	                'size': size
	            });
	        }
	    }, {
	        key: 'doneResize',
	        value: function doneResize(idx) {
	            delete this.sizeSnapshot;
	            delete this.pxSnapshot;

	            // root component has an id
	            var root = (0, _Utils.getRootComponent)(this.parent);
	            if (root) root.saveState();
	        }
	    }, {
	        key: 'modifySize',
	        value: function modifySize(size, precise, pxSnapshot, idx, delta) {
	            var firstPrecise = precise[idx],
	                secondPrecise = precise[idx + 1];

	            if (firstPrecise || secondPrecise) {
	                // if either side is px unit, change only that value
	                idx = firstPrecise ? idx : idx + 1;
	                delta = firstPrecise ? delta : -delta;
	                size[idx] = size[idx] + delta;
	            } else {
	                var ratio = (pxSnapshot[idx] + delta) / (pxSnapshot[idx + 1] + pxSnapshot[idx]);
	                var a = (size[idx] + size[idx + 1]) * ratio,
	                    b = (size[idx] + size[idx + 1]) * (1 - ratio);
	                size[idx] = a;
	                size[idx + 1] = b;
	            }
	        }
	    }]);

	    return GroupLayoutManager;
	})();

	exports['default'] = GroupLayoutManager;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var _GroupLayoutManager2 = __webpack_require__(10);

	var _GroupLayoutManager3 = _interopRequireDefault(_GroupLayoutManager2);

	var GridLayoutManager = (function (_GroupLayoutManager) {
	    _inherits(GridLayoutManager, _GroupLayoutManager);

	    function GridLayoutManager() {
	        _classCallCheck(this, GridLayoutManager);

	        _get(Object.getPrototypeOf(GridLayoutManager.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(GridLayoutManager, [{
	        key: 'layout',
	        value: function layout(colsize, rowsize, colprecise, rowprecise, width, height) {
	            if (!width || !height) {
	                return null;
	            }

	            var pxColsize = this.calcSize(width, colsize, colprecise);
	            var pxRowsize = this.calcSize(height, rowsize, rowprecise);
	            var colpos = this.calcPos(pxColsize);
	            var rowpos = this.calcPos(pxRowsize);

	            // these are col and row size in pixels
	            this.pxColsize = pxColsize;
	            this.pxRowsize = pxRowsize;

	            return [pxColsize, pxRowsize, colpos, rowpos];
	        }
	    }, {
	        key: 'startResize',
	        value: function startResize(idx, h) {
	            this.moveIdx = idx;
	            this.horizontal = h;

	            this.colsizeSnapshot = this.parent.state.colsize.concat();
	            this.rowsizeSnapshot = this.parent.state.rowsize.concat();
	            this.pxColsizeSnapshot = this.pxColsize.concat();
	            this.pxRowsizeSnapshot = this.pxRowsize.concat();
	        }
	    }, {
	        key: 'moveResize',
	        value: function moveResize(x, y) {
	            var key, size, precise, pxSnapshot, delta;

	            if (this.horizontal) {
	                key = 'rowsize';
	                size = this.rowsizeSnapshot.concat();
	                precise = this.parent.state.rowprecise;
	                pxSnapshot = this.pxRowsizeSnapshot;
	                delta = y;
	            } else {
	                key = 'colsize';
	                size = this.colsizeSnapshot.concat();
	                precise = this.parent.state.colprecise;
	                pxSnapshot = this.pxColsizeSnapshot;
	                delta = x;
	            }

	            this.modifySize(size, precise, pxSnapshot, this.moveIdx, delta);

	            this.parent.setState(_defineProperty({}, key, size));
	        }
	    }, {
	        key: 'doneResize',
	        value: function doneResize(idx) {
	            delete this.colsizeSnapshot;
	            delete this.rowsizeSnapshot;
	            delete this.pxColsizeSnapshot;
	            delete this.pxRowsizeSnapshot;

	            // root component has an id
	            var root = (0, _Utils.getRootComponent)(this.parent);
	            if (root) root.saveState();
	        }
	    }]);

	    return GridLayoutManager;
	})(_GroupLayoutManager3['default']);

	exports['default'] = GridLayoutManager;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _GroupBase = __webpack_require__(4);

	var VGroup = (0, _GroupBase.layoutFactory)(_Constants2['default'].Types.VGROUP, 'VGroup');
	exports['default'] = VGroup;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _mixinsPersistentState = __webpack_require__(8);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _mixinsResponsive = __webpack_require__(7);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var View = _react2['default'].createClass({
	    displayName: 'View',

	    mixins: [_mixinsPersistentState2['default'], _mixinsResponsive2['default']],

	    componentDidUpdate: function componentDidUpdate() {
	        this.resize();
	    },

	    render: function render() {
	        var _this = this;

	        var className = "View";
	        if (this.props.className) className += ' ' + this.props.className;

	        var _props = this.props;
	        var position = _props.position;
	        var left = _props.left;
	        var top = _props.top;
	        var width = _props.width;
	        var height = _props.height;

	        var style = { position: position, left: left, top: top, width: width, height: height };

	        var children = [];
	        _react2['default'].Children.forEach(this.props.children, function (c, i) {
	            if (c && typeof c == 'object') {
	                var key = 'child-' + i;
	                c = _react2['default'].addons.cloneWithProps(c, {
	                    key: c.key || key,
	                    ref: key,
	                    parent: _this
	                });
	            }
	            children.push(c);
	        });
	        return _react2['default'].createElement(
	            'div',
	            { id: this.props.id, className: className, style: style },
	            children
	        );
	    }
	});

	exports['default'] = View;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Gutter = __webpack_require__(6);

	var _Gutter2 = _interopRequireDefault(_Gutter);

	var _mixinsResponsive = __webpack_require__(7);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var _mixinsPersistentState = __webpack_require__(8);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _mixinsLayoutMaster = __webpack_require__(9);

	var Grid = _react2['default'].createClass({
	    displayName: 'Grid',

	    mixins: [_mixinsLayoutMaster.LayoutMaster, _mixinsResponsive2['default'], _mixinsPersistentState2['default']],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: _Constants2['default'].Types.GRID,
	            resizable: true
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        // parse colsize property
	        this.props.colsize;

	        var _parseSizeSpec = this.parseSizeSpec(this.props.colsize || this.getDefaultSpec(this.props.cols));

	        var _parseSizeSpec2 = _slicedToArray(_parseSizeSpec, 2);

	        var colsize = _parseSizeSpec2[0];
	        var colprecise = _parseSizeSpec2[1];

	        var _parseSizeSpec3 = this.parseSizeSpec(this.props.rowsize || this.getDefaultSpec(this.props.rows));

	        var _parseSizeSpec32 = _slicedToArray(_parseSizeSpec3, 2);

	        var rowsize = _parseSizeSpec32[0];
	        var rowprecise = _parseSizeSpec32[1];

	        this.state.colsize = colsize;
	        this.state.colprecise = colprecise;
	        this.state.rowsize = rowsize;
	        this.state.rowprecise = rowprecise;
	    },

	    render: function render() {
	        var _this = this;

	        var className = 'Grid',
	            props = this.props,
	            state = this.state,
	            width = props.width || state.width,
	            height = props.height || state.height,
	            children = [];

	        if (props.className) {
	            className += ' ' + props.className;
	        }

	        var dimension = this.getLayoutManager().layout(state.colsize, state.rowsize, state.colprecise, state.rowprecise, width, height);

	        if (dimension) {
	            var _dimension = _slicedToArray(dimension, 4);

	            var colsize = _dimension[0];
	            var rowsize = _dimension[1];
	            var colpos = _dimension[2];
	            var rowpos = _dimension[3];

	            // create gutters
	            if (props.resizable) {
	                children = children.concat(this.renderGutters(false, colpos));
	                children = children.concat(this.renderGutters(true, rowpos));
	            }

	            // create panels
	            _react2['default'].Children.forEach(props.children, function (c, i) {
	                var x = parseInt(c.props.col),
	                    y = parseInt(c.props.row),
	                    key = 'child-' + i;

	                var g = {
	                    key: c.key || key,
	                    ref: key,
	                    parent: _this,
	                    position: 'absolute',
	                    left: colpos[x],
	                    top: rowpos[y],
	                    width: colsize[x],
	                    height: rowsize[y]
	                };
	                children.push(_react2['default'].addons.cloneWithProps(c, g));
	            });
	        }

	        if ('width' in props && 'height' in props) {
	            var style = {
	                position: 'absolute',
	                left: props.left,
	                top: props.top,
	                width: props.width,
	                height: props.height
	            };
	        }

	        return _react2['default'].createElement(
	            'div',
	            { id: props.id,
	                className: className,
	                style: style },
	            children
	        );
	    }
	});

	exports['default'] = Grid;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Gutter = __webpack_require__(6);

	var _Gutter2 = _interopRequireDefault(_Gutter);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _mixinsResponsive = __webpack_require__(7);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var _mixinsPersistentState = __webpack_require__(8);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _Menu = __webpack_require__(16);

	var _Menu2 = _interopRequireDefault(_Menu);

	var Tabs = _react2['default'].createClass({
	    displayName: 'Tabs',

	    mixins: [_mixinsResponsive2['default'], _mixinsPersistentState2['default']],

	    getInitialState: function getInitialState() {
	        return {
	            curTab: this.props.curTab,
	            showMore: false
	        };
	    },

	    closeTab: function closeTab(idx, id, tab, evt) {
	        evt && evt.stopPropagation();

	        if (id == this.state.curTab) {
	            // the current tab is closed
	            var tabs = this._items;
	            // jump to nearest tab
	            var nextC = tabs[idx - 1] || tabs[idx + 1];
	            if (nextC) {
	                this.setState({
	                    curTab: nextC.id
	                });
	            }
	        }
	        this.props.closeTab.apply(null, arguments);
	    },

	    // when tab is resized check if tabs can fix into screen
	    // otherwise show more button
	    onResized: function onResized() {
	        this.checkShowMore();
	    },

	    checkShowMore: function checkShowMore() {
	        var _this = this;

	        var $tabContainer = this.refs.tabContainer.getDOMNode(),

	        // showMore = $tabContainer.clientWidth < $tabContainer.scrollWidth;
	        showMore = this.outofViewTabs().length > 0;
	        if (showMore != this.state.showMore) {
	            this.setState({
	                showMore: showMore
	            }, function () {
	                _this.fitTabBarScroll(_this.state.curTab);
	            });
	        } else {
	            this.fitTabBarScroll(this.state.curTab);
	        }
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var curTab = nextProps.curTab;
	        if (typeof curTab !== 'undefined') {
	            // curTab changed from outside
	            this.setState({
	                curTab: curTab
	            });
	        }
	    },

	    onTabClick: function onTabClick(evt) {
	        var idx = parseInt(evt.currentTarget.dataset.idx);
	        var id = evt.currentTarget.dataset.id;
	        var _props = this.props;
	        var createTab = _props.createTab;
	        var tabClicked = _props.tabClicked;

	        if (id == '__add__') {
	            createTab();
	        } else if (id == '__more__') {
	            this.showMoreMenu(evt);
	        } else {
	            if (typeof tabClicked == 'function') {
	                id = tabClicked(id, this._items[idx]) || id;
	            }
	            if (typeof id == 'string') {
	                this.setTab(id);
	            }
	        }
	    },

	    showMoreMenu: function showMoreMenu(evt) {
	        var _this2 = this;

	        evt.nativeEvent.stopImmediatePropagation();

	        var options = this.outofViewTabs();
	        _Menu2['default'].show(evt.nativeEvent, {
	            options: options
	        }, function (item, path, data) {
	            _this2.setTab(item.id);
	        });
	    },

	    getTabContainerRange: function getTabContainerRange() {
	        var rect = this.refs.tabContainer.getDOMNode().getBoundingClientRect(),
	            left = rect.left,
	            right = left + rect.width;
	        return [left, right];
	    },

	    getTabItemNode: function getTabItemNode(id) {
	        var ref = this.refs['tabItem-' + id];
	        if (!ref) return null;
	        return ref.getDOMNode();
	    },

	    outofViewTabs: function outofViewTabs() {
	        var _this3 = this;

	        // tabItems's parent node's rect

	        var _getTabContainerRange = this.getTabContainerRange();

	        var _getTabContainerRange2 = _slicedToArray(_getTabContainerRange, 2);

	        var left = _getTabContainerRange2[0];
	        var right = _getTabContainerRange2[1];

	        return this._items.map(function (item) {
	            return {
	                id: item.id,
	                title: item.label
	            };
	        }).filter(function (item, i) {
	            return _this3.tabOutofView(item.id, left, right);
	        });
	    },

	    tabOutofView: function tabOutofView(id, left, right) {
	        if (left === undefined || right === undefined) {
	            var _getTabContainerRange3 = this.getTabContainerRange();

	            var _getTabContainerRange32 = _slicedToArray(_getTabContainerRange3, 2);

	            left = _getTabContainerRange32[0];
	            right = _getTabContainerRange32[1];
	        }

	        var $node = this.getTabItemNode(id),
	            rect = $node.getBoundingClientRect(),
	            l = rect.left,
	            r = l + rect.width;
	        return r <= left || l > right;
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        this.checkShowMore();
	    },

	    /* move scrollleft of tabs parent, so that items are visible */
	    fitTabBarScroll: function fitTabBarScroll(id) {
	        if (!this.getTabItemNode(id) || !this.tabOutofView(id)) {
	            return;
	        }

	        var $tabContainer = this.refs.tabContainer.getDOMNode(),
	            rect = $tabContainer.getBoundingClientRect(),
	            left = rect.left;

	        var $node = this.getTabItemNode(id);
	        if (!$node) return;
	        var rect = $node.getBoundingClientRect(),
	            l = rect.left - parseInt(window.getComputedStyle($node).getPropertyValue('margin-left'));

	        $tabContainer.scrollLeft += l - left;
	    },

	    /* set current active tab */
	    setTab: function setTab(id, cbk) {
	        var _this4 = this;

	        this.fitTabBarScroll(id);

	        this.setState({
	            curTab: id
	        }, function () {
	            if (typeof _this4.props.tabChanged == 'function') {
	                _this4.props.tabChanged(id);
	            }
	            cbk && cbk();
	            _this4.saveState();
	        });
	    },

	    /* get current tab */
	    getTab: function getTab() {
	        return this.state.curTab;
	    },

	    extractChildren: function extractChildren(curTab) {
	        var element,
	            firstElement,
	            items = [];
	        _react2['default'].Children.forEach(this.props.children, function (c, i) {
	            // key always exist, id my not
	            var id = c.props.id || '' + i;
	            if (id == curTab) {
	                element = c;
	            }
	            items[i] = {
	                id: id,
	                label: c.props.label,
	                icon: c.props.icon,
	                closable: c.props.closable
	            };
	            if (i == 0) {
	                firstElement = c;
	            }
	        });
	        this._items = items;

	        // If curTab is not set or the tab does not exist, default to the first tab
	        if (!element && items.length > 0) {
	            var id = items[0].id;
	            this.state.curTab = curTab = id;
	            element = firstElement;
	        }

	        return [element, items];
	    },

	    renderTabbar: function renderTabbar() {
	        var _this5 = this;

	        // if too many tabs are shown, this group them into menu
	        var moreTab;
	        if (this.state.showMore) {
	            moreTab = this.renderTabbarItem({ label: '⋮', id: '__more__' });
	        }

	        // optional add button to create more tabs
	        var addTab;
	        if (this.props.createTab) {
	            addTab = this.renderTabbarItem({ label: '╋', id: '__add__' });
	        }

	        var barItems = _react2['default'].createElement(
	            'div',
	            { ref: 'tabContainer', className: 'Tabs-Bar-Item-Container' },
	            this._items.map(function (tab, i) {
	                return _this5.renderTabbarItem(tab, i);
	            })
	        );
	        var toolBtns = _react2['default'].createElement(
	            'div',
	            { className: 'Tabs-Bar-ToolBtns' },
	            this.props.toolBtns
	        );

	        return _react2['default'].createElement(
	            'div',
	            { ref: 'tabBar', className: 'Tabs-Bar' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'Tabs-Bar-Outer' + (this.state.showMore ? ' showMore' : '') },
	                barItems,
	                addTab,
	                moreTab
	            ),
	            toolBtns
	        );
	    },

	    renderTabbarItem: function renderTabbarItem(tab, i) {
	        var isActive = tab.id == this.state.curTab;
	        var className = 'Tabs-Bar-Item';
	        if (isActive) {
	            className += ' active';
	        }

	        var itemConfig = this._items[i];
	        if (itemConfig) {
	            var id = itemConfig.id;

	            if (id) {
	                className += ' Tab-' + id;
	            }

	            var closeBtn;
	            if (tab.closable) {
	                closeBtn = _react2['default'].createElement(
	                    'a',
	                    { className: 'Close',
	                        href: 'javascript:;',
	                        onClick: this.closeTab.bind(null, i, tab.id, this._items[i]) },
	                    '×'
	                );
	            }
	        }

	        return _react2['default'].createElement(
	            'div',
	            { className: className, ref: 'tabItem-' + tab.id, 'data-id': tab.id, 'data-idx': i, key: i, onClick: this.onTabClick },
	            _react2['default'].createElement(
	                'span',
	                null,
	                tab.label
	            ),
	            closeBtn
	        );
	    },

	    render: function render() {
	        var className = 'Tabs';
	        var props = this.props;
	        var state = this.state;

	        if (props.className) {
	            className += ' ' + props.className;
	        }

	        // extract item from tabs
	        var curTab = state.curTab;

	        var _extractChildren = this.extractChildren(curTab);

	        var _extractChildren2 = _slicedToArray(_extractChildren, 2);

	        var contentElement = _extractChildren2[0];
	        var items = _extractChildren2[1];

	        var tabbar = this.renderTabbar();
	        // cloneWithProps does not transfer key or ref to the cloned element.
	        var content;
	        if (contentElement) {
	            content = _react2['default'].addons.cloneWithProps(contentElement, {
	                ref: 'activeContent',
	                key: curTab,
	                parent: this
	            });
	        }

	        return _react2['default'].createElement(
	            'div',
	            { id: this.props.id, className: className },
	            tabbar,
	            _react2['default'].createElement(
	                'div',
	                { ref: 'tabContent', className: 'Tabs-Content' },
	                content
	            )
	        );
	    }
	});

	exports['default'] = Tabs;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var SEP = '__seperator__';
	var Menu = _react2['default'].createClass({
	    displayName: 'Menu',

	    getInitialState: function getInitialState() {
	        return {
	            show: false
	        };
	    },

	    showAt: function showAt(pos, config) {
	        var left = pos.left,
	            top = pos.top,
	            docLeft = 0,
	            docTop = 0;
	        if (!config) {
	            // relative position of the menu's parent menu item
	            var rect = this.getDOMNode().parentNode.getBoundingClientRect();
	            var docLeft = rect.left;
	            var docTop = rect.top;
	        }

	        if (docLeft + left + _Constants2['default'].config.menuItemWidth > document.documentElement.clientWidth) {
	            // can't fit right, invert direction
	            left -= _Constants2['default'].config.menuItemWidth;
	        } else {
	            left += 2;
	        }

	        var options = config ? config.options : this.props.options,
	            menuHeight = options.length * _Constants2['default'].config.menuItemHeight;
	        if (docTop + top + menuHeight > document.documentElement.clientHeight) {
	            // can't fit bottom, invert direction
	            var itemSize = options.filter(function (opt) {
	                return opt != SEP;
	            }).length;
	            var menuHeight = itemSize * _Constants2['default'].config.menuItemHeight + (options.length - itemSize) * _Constants2['default'].config.menuSepItemHeight;
	            top -= menuHeight;
	        }

	        this.setState((0, _Utils.extend)({
	            show: true,
	            position: {
	                top: top,
	                left: left
	            }
	        }, config));
	    },

	    show: function show() {
	        this.setState({
	            show: true
	        });
	    },

	    hide: function hide(all) {
	        this.setState({
	            show: false
	        });

	        if (all) {
	            var parent = this.props.parent;
	            while (parent) {
	                parent.hide(all);
	                parent = parent.props.parent;
	            }
	        }
	    },

	    onClick: function onClick(evt) {
	        evt.stopPropagation();

	        // iteratively get click path
	        var idx = parseInt(evt.currentTarget.dataset['idx']),
	            curr = this,
	            parent = this.props.parent,
	            path = [idx];
	        while (parent) {
	            path.push(curr.props.idx);
	            curr = parent;
	            parent = parent.props.parent;
	        }
	        path.reverse();

	        // call callback
	        // after iteration, curr is the root menu
	        var cbk = curr.state.cbk;
	        cbk(this.getItem(idx), path, curr.state.data);

	        this.hide(true);
	    },

	    getItem: function getItem(idx) {
	        var options = this.state.options || this.props.options;
	        return options[idx];
	        // return typeof label == 'object'? label.title : label;
	    },

	    onMaskClick: function onMaskClick() {
	        this.hide();
	    },

	    onHoverMenuItem: function onHoverMenuItem(evt) {
	        var idx = evt.currentTarget.dataset['idx'],
	            com = this.refs['child-' + idx],
	            $node = this.getDOMNode();

	        if (com) com.showAt({
	            left: $node.clientWidth - 4,
	            top: 0
	        });
	    },

	    onLeaveMenuItem: function onLeaveMenuItem(evt) {
	        var idx = evt.currentTarget.dataset['idx'],
	            com = this.refs['child-' + idx];
	        if (com) com.hide();
	    },

	    renderMenuItem: function renderMenuItem(option, idx) {
	        var label = option,
	            style,
	            subMenu;

	        if (label == SEP) {
	            return [_react2['default'].createElement('li', { className: 'sep' }), idx];
	        }

	        if (typeof option == 'object') {
	            // generate children
	            label = [option.title];
	            if (Array.isArray(option.children)) {
	                label.push(_react2['default'].createElement('i', { className: 'ico gt' }));
	                subMenu = _react2['default'].createElement(Menu, { ref: 'child-' + idx, idx: idx, options: option.children, parent: this });
	            }
	            style = option.style;
	        }

	        var item = _react2['default'].createElement(
	            'li',
	            {
	                key: idx,
	                style: style,
	                'data-idx': idx,
	                onMouseEnter: this.onHoverMenuItem,
	                onMouseLeave: this.onLeaveMenuItem,
	                onClick: this.onClick },
	            label,
	            subMenu
	        );

	        return [item, ++idx];
	    },

	    render: function render() {
	        var _this = this;

	        var className = 'Menu ' + (this.state.show ? 'Show' : 'Hide'),
	            options = this.state.options || this.props.options,
	            position = this.state.position || this.props.position,
	            contents;
	        if (this.state.show) {
	            var idx = 0,
	                item;
	            var items = options.map(function (item) {
	                var _renderMenuItem = _this.renderMenuItem(item, idx);

	                // For seperators, index should not increase

	                var _renderMenuItem2 = _slicedToArray(_renderMenuItem, 2);

	                item = _renderMenuItem2[0];
	                idx = _renderMenuItem2[1];

	                return item;
	            });

	            contents = _react2['default'].createElement(
	                'div',
	                { className: 'list' },
	                _react2['default'].createElement(
	                    'ul',
	                    null,
	                    items
	                )
	            );
	        }
	        return _react2['default'].createElement(
	            'div',
	            { className: className, style: position },
	            contents
	        );
	    }
	});

	exports['default'] = {
	    init: function init() {
	        var $root = (0, _Utils.getTMPDOMRoot)();
	        var menu = _react2['default'].createElement(Menu, null);
	        this.menu = _react2['default'].render(menu, $root);
	        this.hide = this.hide.bind(this);
	    },

	    show: function show(evt, config, _cbk) {
	        var _this2 = this;

	        if (!this.menu) {
	            // singleton, lazy initialization
	            this.init();
	        }

	        var position;
	        if (config.position) {
	            position = config.position;
	        } else {
	            var x = evt.clientX,
	                y = evt.clientY;

	            position = {
	                top: y,
	                left: x
	            };
	        }

	        this.menu.showAt(position, {
	            options: config.options,
	            data: config.data,
	            cbk: function cbk() {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                // this is triggered when menu item is clicked
	                _cbk.apply(null, args);
	                document.removeEventListener('click', _this2.hide);
	            }
	        });
	        document.addEventListener('click', this.hide);
	    },

	    hide: function hide() {
	        if (!this.menu) return;
	        this.menu.hide();

	        var $root = this.menu.getDOMNode().parentNode;
	        _react2['default'].unmountComponentAtNode($root);
	        $root.parentNode.removeChild($root);
	        this.menu = null;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var Toast = _react2['default'].createClass({
	    displayName: 'Toast',

	    statics: {
	        show: function show(args) {
	            var $root = (0, _Utils.getTMPDOMRoot)();
	            var toast = _react2['default'].createElement(
	                Toast,
	                {
	                    id: args.id,
	                    className: args.className,
	                    duration: args.duration,
	                    animated: args.animated },
	                args.content
	            );
	            return _react2['default'].render(toast, $root);
	        }
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            duration: null,
	            animated: true
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            hide: false
	        };
	    },

	    close: function close() {
	        var _this = this;

	        if (this.state.hide) return;

	        if (this.props.animated) {
	            this.setState({
	                hide: true
	            });
	            setTimeout(function () {
	                _this.destroy();
	            }, _Constants2['default'].config.transitionDuration);
	        } else {
	            this.destroy();
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        var _this2 = this;

	        var t = this.props.duration;
	        if (t) {
	            setTimeout(function () {
	                _this2.close();
	            }, t);
	        }
	    },

	    destroy: function destroy() {
	        var $root = this.getDOMNode().parentNode;
	        _react2['default'].unmountComponentAtNode($root);
	        $root.parentNode.removeChild($root);
	    },

	    render: function render() {
	        var className = 'Toast',
	            props = this.props,
	            state = this.state;
	        if (props.className) {
	            className += ' ' + props.className;
	        }
	        if (props.animated) {
	            className += state.hide ? ' Hide' : ' Show';
	        }

	        var content = _react2['default'].addons.cloneWithProps(props.children, {
	            ref: 'content'
	        });
	        return _react2['default'].createElement(
	            'div',
	            { id: props.id, className: className, onClick: this.close },
	            _react2['default'].createElement(
	                'div',
	                { className: 'Content' },
	                content
	            )
	        );
	    }
	});

	exports['default'] = Toast;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var Popup = _react2['default'].createClass({
	    displayName: 'Popup',

	    statics: {
	        show: function show(args) {
	            var $root = (0, _Utils.getTMPDOMRoot)(args.modal);
	            var popup = _react2['default'].createElement(
	                Popup,
	                args,
	                args.content
	            );
	            return _react2['default'].render(popup, $root);
	        }
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            closable: true,
	            animated: true,
	            buttons: ['OK', 'Cancel']
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            hide: false
	        };
	    },

	    renderButtons: function renderButtons() {
	        var _this = this;

	        var footer = null;

	        if (this.props.buttons && this.props.buttons.length) {
	            var buttons = this.props.buttons.map(function (label, i) {
	                return _react2['default'].createElement(
	                    'button',
	                    { key: i, 'data-idx': i, onClick: _this.onBtnClick },
	                    label
	                );
	            });
	            footer = _react2['default'].createElement(
	                'div',
	                { className: 'Footer' },
	                buttons
	            );
	        }

	        return footer;
	    },

	    onBtnClick: function onBtnClick(evt) {
	        var idx = parseInt(evt.target.dataset.idx);
	        if (typeof this.props.onBtnClick == 'function') {
	            var ret = this.props.onBtnClick(idx, this.refs.content);
	            if (ret) {
	                this.close();
	            }
	        }
	    },

	    close: function close() {
	        var _this2 = this;

	        if (this.props.animated) {
	            this.setState({
	                hide: true
	            });
	            setTimeout(function () {
	                _this2.destroy();
	            }, _Constants2['default'].config.transitionDuration);
	        } else {
	            this.destroy();
	        }
	    },

	    destroy: function destroy() {
	        if (typeof this.props.popupWillClose == 'function') {
	            this.props.popupWillClose();
	        }
	        var $root = this.getDOMNode().parentNode;
	        _react2['default'].unmountComponentAtNode($root);
	        $root.parentNode.removeChild($root);
	    },

	    render: function render() {
	        var className = 'Popup',
	            props = this.props,
	            state = this.state;
	        if (props.className) {
	            className += ' ' + props.className;
	        }
	        if (props.animated) {
	            className += state.hide ? ' Hide' : ' Show';
	        }

	        var footer = this.renderButtons();
	        var content = _react2['default'].addons.cloneWithProps(props.children, {
	            ref: 'content',
	            parent: this
	        });

	        if (this.props.closable) {
	            var closeBtn = _react2['default'].createElement(
	                'a',
	                { className: 'Close', onClick: this.close, href: 'javascript:;' },
	                '×'
	            );
	        }

	        return _react2['default'].createElement(
	            'div',
	            { id: props.id, className: className },
	            _react2['default'].createElement(
	                'div',
	                { className: 'Title' },
	                _react2['default'].createElement(
	                    'h1',
	                    null,
	                    props.title
	                ),
	                closeBtn
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'Content' },
	                content
	            ),
	            footer
	        );
	    }
	});

	exports['default'] = Popup;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n@keyframes Show {\n  from {\n    transform: scale(0, 0); }\n  to {\n    transform: scale(1, 1); } }\n\n@keyframes Hide {\n  from {\n    transform: scale(1, 1); }\n  to {\n    transform: scale(0, 0); } }\n\n.Tabs-Bar {\n  display: flex;\n  height: 36px; }\n  .Tabs-Bar a {\n    color: silver; }\n  .Tabs-Bar .Tabs-Bar-Outer {\n    overflow: hidden;\n    display: inline-flex;\n    flex: 1; }\n  .Tabs-Bar .Tabs-Bar-Item-Container {\n    display: inline-block;\n    white-space: nowrap;\n    overflow: hidden; }\n  .Tabs-Bar .Tabs-Bar-Item.edit {\n    float: right; }\n  .Tabs-Bar .Tabs-Bar-Item.add a,\n  .Tabs-Bar .Tabs-Bar-Item.edit a {\n    color: #333; }\n  .Tabs-Bar .Tabs-Bar-Item {\n    cursor: default;\n    display: inline-block;\n    padding: 0 20px;\n    position: relative;\n    height: 36px;\n    line-height: 36px;\n    transition: background-color 0.4s; }\n    .Tabs-Bar .Tabs-Bar-Item .Close {\n      position: absolute;\n      top: 0;\n      right: 5px;\n      text-decoration: none;\n      opacity: 0.4;\n      transition: opacity 0.4s; }\n  .Tabs-Bar .Tabs-Bar-Item:hover {\n    background: #eee; }\n  .Tabs-Bar .Tabs-Bar-Item.active {\n    background: #eee; }\n  .Tabs-Bar .Tabs-Bar-Item.active:after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    content: '';\n    display: block;\n    height: 3px;\n    background-color: #1675bd; }\n  .Tabs-Bar .Tabs-Bar-Item:hover .Close {\n    opacity: 1; }\n  .Tabs-Bar .Tabs-Bar-Item:hover .closeBtn:hover {\n    color: #333; }\n  .Tabs-Bar .Tabs-Bar-ToolBtns {\n    float: right;\n    height: 36px;\n    line-height: 36px;\n    margin: 0 5px; }\n  .Tabs-Bar .Tabs-Bar-ToolBtns:empty {\n    display: none; }\n\n.Tabs-Content {\n  height: calc(100% - 36px); }\n  .Tabs-Content .TabContentItem {\n    position: relative;\n    height: 100%;\n    display: none;\n    overflow: hidden; }\n  .Tabs-Content .TabContentItem.active {\n    display: block;\n    background-color: #eee; }\n\n.Toast {\n  position: fixed;\n  left: 30%;\n  right: 30%;\n  top: 30%;\n  bottom: 30%;\n  border: 1px solid #1675bd;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);\n  z-index: 1001;\n  background-color: white; }\n  .Toast .Content {\n    height: 100%;\n    align-items: center;\n    justify-content: center; }\n\n.Popup {\n  position: fixed;\n  left: 30%;\n  right: 30%;\n  top: 30%;\n  bottom: 30%;\n  border: 1px solid #1675bd;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);\n  z-index: 1001;\n  background-color: white;\n  display: flex;\n  flex-direction: column; }\n  .Popup .Title, .Popup .Content, .Popup .Footer {\n    box-sizing: border-box;\n    padding: 0 10px; }\n  .Popup .Title {\n    position: relative;\n    border-bottom: 1px solid #eee; }\n    .Popup .Title h1 {\n      font-size: 1rem;\n      color: #333;\n      padding: 0;\n      margin: 0;\n      height: 36px;\n      line-height: 36px; }\n    .Popup .Title a.Close {\n      position: absolute;\n      top: 10px;\n      right: 10px;\n      text-decoration: none;\n      color: #888; }\n  .Popup .Title::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n    background-color: #1675bd; }\n  .Popup .Content {\n    flex: 1;\n    padding: 10px; }\n  .Popup .Footer {\n    text-align: right;\n    margin: 10px 0; }\n    .Popup .Footer button {\n      color: #eee;\n      background-color: #1675bd;\n      border: none;\n      margin: 0 4px;\n      padding: 8px; }\n\n.Toast.Show, .Popup.Show {\n  animation: Show 0.4s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease-out; }\n\n.Toast.Hide, .Popup.Hide {\n  animation: Hide 0.4s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease-in; }\n\n.Menu {\n  position: absolute;\n  z-index: 1001; }\n  .Menu .list {\n    list-style: none;\n    background-color: white;\n    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);\n    border-radius: 4px;\n    cursor: default;\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); }\n    .Menu .list ul {\n      margin: 0;\n      padding: 0; }\n    .Menu .list li {\n      position: relative;\n      padding: 0 3em 0 1.6em;\n      white-space: nowrap;\n      list-style: none;\n      height: 30px;\n      line-height: 30px;\n      min-width: 5em;\n      max-width: 10em;\n      box-sizing: border-box;\n      color: #333; }\n      .Menu .list li i {\n        position: absolute;\n        right: 1em;\n        line-height: 30px;\n        color: #333; }\n    .Menu .list li.on::before {\n      content: '\\2713';\n      position: absolute;\n      left: 0.4em; }\n    .Menu .list li:hover {\n      color: white;\n      background-color: #298afb; }\n    .Menu .list li:first-child:hover {\n      border-radius: 4px 4px 0 0; }\n    .Menu .list li:last-child:hover {\n      border-radius: 0 0 4px 4px; }\n    .Menu .list li.sep {\n      height: 1px;\n      background-color: #ddd;\n      margin-left: 1.6em; }\n  .Menu .ico.gt {\n    display: block;\n    top: 50%;\n    margin-top: -5px;\n    width: 10px;\n    height: 10px; }\n  .Menu .ico.gt::after {\n    content: \"\";\n    display: block;\n    width: 8px;\n    height: 8px;\n    border: 2px solid black;\n    border-width: 1px 1px 0 0;\n    top: 0;\n    left: 0;\n    transform: rotate(45deg); }\n\n.HGroup, .VGroup, .View {\n  position: relative; }\n\n.Gutter {\n  background-color: #eee; }\n\n.HGroup > .Gutter {\n  width: 4px; }\n\n.VGroup > .Gutter {\n  height: 4px; }\n\n.Gutter.ns {\n  cursor: row-resize; }\n\n.Gutter.we {\n  cursor: col-resize; }\n\n.Grid {\n  overflow: hidden;\n  position: relative; }\n\n.View {\n  overflow: hidden; }\n  .View > .Grid {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n\n.Mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  z-index: 1000; }\n", ""]);

	// exports


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;