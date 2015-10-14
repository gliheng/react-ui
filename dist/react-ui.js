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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _HGroupJsx = __webpack_require__(3);

	var _HGroupJsx2 = _interopRequireDefault(_HGroupJsx);

	var _VGroupJsx = __webpack_require__(13);

	var _VGroupJsx2 = _interopRequireDefault(_VGroupJsx);

	var _ViewJsx = __webpack_require__(14);

	var _ViewJsx2 = _interopRequireDefault(_ViewJsx);

	var _GridJsx = __webpack_require__(15);

	var _GridJsx2 = _interopRequireDefault(_GridJsx);

	var _TabsJsx = __webpack_require__(16);

	var _TabsJsx2 = _interopRequireDefault(_TabsJsx);

	var _Utils = __webpack_require__(2);

	var _mixinsPersistentState = __webpack_require__(9);

	__webpack_require__(17);

	function config(_config) {
	    (0, _Utils.extend)(_Constants2['default'].config, _config);

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
	        app.saveState();
	    });

	    app.restoreState();
	    resize();
	    return app;
	}

	exports.HGroup = _HGroupJsx2['default'];
	exports.VGroup = _VGroupJsx2['default'];
	exports.Grid = _GridJsx2['default'];
	exports.View = _ViewJsx2['default'];
	exports.Tabs = _TabsJsx2['default'];
	exports.bootstrap = bootstrap;
	exports.config = config;

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
	        gutterWidth: 4,
	        persistState: true,
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
	exports.clone = clone;
	exports.exclude = exclude;
	exports.Set = Set;
	exports.noop = noop;
	exports.getRootComponent = getRootComponent;
	exports.extend = extend;

	function enums(ids) {
	    var obj = {};
	    ids.forEach(function (name, i) {
	        obj[name] = i;
	    });
	    return obj;
	}

	function clone(obj) {
	    var ret = {};
	    for (var key in obj) {
	        ret[key] = obj[key];
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

	var _GroupBaseJsx = __webpack_require__(4);

	var HGroup = (0, _GroupBaseJsx.groupFactory)(_Constants2['default'].Types.HGROUP, 'HGroup');
	exports['default'] = HGroup;
	module.exports = exports['default'];

/***/ },
/* 4 */
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

	var _GutterJsx = __webpack_require__(6);

	var _GutterJsx2 = _interopRequireDefault(_GutterJsx);

	var _mixinsDimension = __webpack_require__(7);

	var _mixinsDimension2 = _interopRequireDefault(_mixinsDimension);

	var _mixinsResponsive = __webpack_require__(8);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var _mixinsPersistentState = __webpack_require__(9);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _mixinsLayoutManager = __webpack_require__(10);

	var groupFactory = function groupFactory(type, elementName) {
	    return _react2['default'].createClass({
	        mixins: [(0, _mixinsLayoutManager.LayoutManagerMixinFactory)(type), _mixinsDimension2['default'], _mixinsResponsive2['default'], _mixinsPersistentState2['default']],

	        render: function render() {
	            var _this = this;

	            var className = elementName,
	                children = this.props.children,
	                mutant = [];

	            if (this.props.className) {
	                className += ' ' + this.props.className;
	            }

	            _react2['default'].Children.forEach(children, function (c, i) {
	                var key = 'child-' + i;
	                mutant.push(_react2['default'].addons.cloneWithProps(c, {
	                    key: key,
	                    ref: key,
	                    parent: _this
	                }));
	                if (_this.props.resizable) {
	                    if (i != children.length - 1) {
	                        var className;
	                        if (type == _Constants2['default'].Types.HGROUP) {
	                            className = 'we';
	                        } else if (type == _Constants2['default'].Types.VGROUP) {
	                            className = 'ns';
	                        }
	                        mutant.push(_react2['default'].createElement(_GutterJsx2['default'], { className: className, key: 'gutter-' + i, getLayoutManager: _this.getLayoutManager, idx: i }));
	                    }
	                }
	            });

	            // undefined value is skipped by react
	            // just set them all
	            var style = {
	                flexGrow: this.state.flex,
	                width: this.state.width,
	                height: this.state.height,
	                minWidth: this.state.width,
	                minHeight: this.state.height,
	                maxWidth: this.state.width,
	                maxHeight: this.state.height
	            };

	            return _react2['default'].createElement(
	                'div',
	                { id: this.props.id, className: className, style: style },
	                mutant
	            );
	        }
	    });
	};

	exports.groupFactory = groupFactory;

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
	        this.props.getLayoutManager().startResize(this.props.idx);

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
	    getDefaultProps: function getDefaultProps() {
	        return {
	            flex: 1
	        };
	    },

	    getInitialState: function getInitialState() {
	        // convert type in case value is taken from jsx declaratioin
	        var state = {};
	        if ('width' in this.props) state.width = this.props.width;
	        if ('height' in this.props) state.height = this.props.height;
	        if ('flex' in this.props) state.flex = this.props.flex;
	        return state;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    resize: function resize(width, height) {
	        if (typeof this.onResized == 'function') {
	            this.onResized();
	        }
	        for (var key in this.refs) {
	            var c = this.refs[key];
	            if (typeof c.resize == 'function') c.resize(width, height);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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
	    /* get the state dict recursively from the component
	     **/
	    getState: function getState(full) {
	        var _this = this;

	        var s = (0, _Utils.clone)(this.state),
	            children = this.props.children;
	        // console.log(this.getDOMNode());
	        if (full && Array.isArray(children)) {
	            s.children = children.map(function (c, i) {
	                var child = _this.refs['child-' + i];
	                if (child === undefined) return null;
	                return child.getState(full);
	            });
	        }
	        return s;
	    },

	    /* apply state to the component
	     **/
	    putState: function putState(state) {
	        var _this2 = this;

	        var children = this.props.children,
	            childrenState = state.children;

	        if (childrenState) {
	            _react2['default'].Children.forEach(children, function (c, i) {
	                var child = _this2.refs['child-' + i];
	                if (child === undefined) {
	                    // this case may happen, if the component's children is not rendered

	                    // console.error('Can\' find component to apply state');
	                    return;
	                }
	                return child.putState(childrenState[i]);
	            });
	        }
	        // console.log(this.getDOMNode(), exclude(state, 'children'));
	        this.setState((0, _Utils.exclude)(state, 'children'), function () {
	            if (typeof _this2.stateRestored == 'function') {
	                _this2.stateRestored();
	            }
	        });
	    },

	    /* get state from component then persist the state info
	     **/
	    saveState: function saveState() {
	        var id = this.props.id;
	        // only component with id attribute can save state
	        if (!id) {
	            console.warn('Only component with id attribute can save state');
	            return;
	        }
	        var s = this.getState(true);
	        writer(id, s);
	    },

	    /* get state from store the apply it the component
	     **/
	    restoreState: function restoreState() {
	        var id = this.props.id;
	        if (!id) {
	            console.warn('Only component with id attribute can save state');
	            return;
	        }
	        var state = reader(id);
	        if (state) {
	            this.putState(state);
	        }
	    }

	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _GroupLayoutManager = __webpack_require__(11);

	var _GroupLayoutManager2 = _interopRequireDefault(_GroupLayoutManager);

	var _GridLayoutManager = __webpack_require__(12);

	var _GridLayoutManager2 = _interopRequireDefault(_GridLayoutManager);

	function LayoutManagerMixinFactory(type) {
	    return {
	        getDefaultProps: function getDefaultProps() {
	            return {
	                resizable: true
	            };
	        },

	        getLayoutManager: function getLayoutManager() {
	            if (!this.layoutManager) {
	                if (type == _Constants2['default'].Types.GRID) {
	                    this.layoutManager = new _GridLayoutManager2['default'](this);
	                } else if (type == _Constants2['default'].Types.HGROUP || type == _Constants2['default'].Types.VGROUP) {
	                    this.layoutManager = new _GroupLayoutManager2['default'](this, type);
	                }
	            }
	            return this.layoutManager;
	        }

	    };
	}

	exports.LayoutManagerMixinFactory = LayoutManagerMixinFactory;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var GroupLayoutManager = (function () {
	    function GroupLayoutManager(parent, type) {
	        _classCallCheck(this, GroupLayoutManager);

	        this.parent = parent;
	        this.type = type;
	    }

	    _createClass(GroupLayoutManager, [{
	        key: 'startResize',
	        value: function startResize(idx) {
	            var first = this.parent.refs['child-' + idx],
	                second = this.parent.refs['child-' + (idx + 1)],
	                $first = first.getDOMNode(),
	                $second = second.getDOMNode();
	            this.firstComp = first;
	            this.secondComp = second;
	            this.firstDimension = { width: $first.clientWidth, height: $first.clientHeight };
	            this.secondDimension = { width: $second.clientWidth, height: $second.clientHeight };
	        }
	    }, {
	        key: 'moveResize',
	        value: function moveResize(x, y) {
	            if (this.type == _Constants2['default'].Types.HGROUP) {
	                var p = 'width';
	                var v = x;
	            } else if (this.type == _Constants2['default'].Types.VGROUP) {
	                var p = 'height';
	                var v = y;
	            } else {
	                throw "Not implemented";
	            }

	            var firstPrecise = 'width' in this.firstComp.props || 'height' in this.firstComp.props,
	                secondPrecise = 'width' in this.secondComp.props || 'height' in this.secondComp.props;
	            if (firstPrecise && secondPrecise) {
	                throw new Error('Both intermediate elements have dimensions set. Can\'t resize');
	            } else if (firstPrecise || secondPrecise) {
	                // one side have dimension set
	                var preciseComp = firstPrecise ? this.firstComp : this.secondComp,
	                    dimension = firstPrecise ? this.firstDimension : this.secondDimension;
	                preciseComp.setState(_defineProperty({}, p, dimension[p] + (firstPrecise ? v : -v)));
	            } else {
	                // both use flex
	                var flexTotal = this.firstComp.state.flex + this.secondComp.state.flex,
	                    ratio = (this.firstDimension[p] + v) / (this.firstDimension[p] + this.secondDimension[p]);
	                ratio = Math.max(ratio, 0);
	                ratio = Math.min(ratio, 1);
	                this.firstComp.setState({
	                    flex: flexTotal * ratio
	                });
	                this.secondComp.setState({
	                    flex: flexTotal * (1 - ratio)
	                });
	            }
	        }
	    }, {
	        key: 'doneResize',
	        value: function doneResize(idx) {
	            delete this.firstComp;
	            delete this.secondComp;
	            delete this.firstDimension;
	            delete this.secondDimension;

	            // root component has an id
	            var root = (0, _Utils.getRootComponent)(this.parent);
	            if (root) root.saveState();
	        }
	    }]);

	    return GroupLayoutManager;
	})();

	exports['default'] = GroupLayoutManager;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Utils = __webpack_require__(2);

	var GridLayoutManager = (function () {
	    function GridLayoutManager(parent) {
	        _classCallCheck(this, GridLayoutManager);

	        this.parent = parent;
	    }

	    _createClass(GridLayoutManager, [{
	        key: 'layout',
	        value: function layout(colsize, rowsize, colprecise, rowprecise, config, width, height) {
	            if (!width || !height) {
	                return null;
	            }

	            this.config = config;

	            var pxColsize = this.calcSize(width, config.gutterWidth, config.cols, colsize, colprecise);
	            var pxRowsize = this.calcSize(height, config.gutterWidth, config.rows, rowsize, rowprecise);

	            var _calcPos = this.calcPos(pxColsize, pxRowsize);

	            var _calcPos2 = _slicedToArray(_calcPos, 2);

	            var colpos = _calcPos2[0];
	            var rowpos = _calcPos2[1];

	            // these are col and row size in pixels
	            this.pxColsize = pxColsize;
	            this.pxRowsize = pxRowsize;

	            return [pxColsize, pxRowsize, colpos, rowpos];
	        }
	    }, {
	        key: 'calcPos',
	        value: function calcPos(colsize, rowsize) {
	            var _this = this;

	            var d;
	            d = 0;
	            var colpos = colsize.map(function (size, i) {
	                var p = d;
	                d = p + size + _this.config.gutterWidth;
	                return p;
	            });

	            d = 0;
	            var rowpos = rowsize.map(function (size, i) {
	                var p = d;
	                d = p + size + _this.config.gutterWidth;
	                return p;
	            });
	            return [colpos, rowpos];
	        }
	    }, {
	        key: 'calcSize',
	        value: function calcSize(total, gutter, n, size, precise) {
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

	            remain -= (n - 1) * gutter;

	            for (var i = 0; i < size.length; i++) {
	                if (pxSize[i] === undefined) {
	                    pxSize[i] = size[i] / totalRatio * remain;
	                }
	            }
	            return pxSize;
	        }
	    }, {
	        key: 'startResize',
	        value: function startResize(idx) {
	            this.moveIdx = idx; // am I resizing a vertical one or horizontal one?
	            this.horizontalMove = true;
	            if (idx > this.config.cols - 2) {
	                // vertical move
	                this.moveIdx -= this.config.cols - 1;
	                this.horizontalMove = false;
	            }

	            this.colsizeSnapshot = this.parent.state.colsize.concat();
	            this.rowsizeSnapshot = this.parent.state.rowsize.concat();
	            this.pxColsizeSnapshot = this.pxColsize.concat();
	            this.pxRowsizeSnapshot = this.pxRowsize.concat();
	        }
	    }, {
	        key: 'moveResize',
	        value: function moveResize(x, y) {
	            var key, size, firstPrecise, secondPrecise, pxSnapshot, v;
	            if (this.horizontalMove) {
	                key = 'colsize';
	                size = this.colsizeSnapshot.concat();
	                firstPrecise = this.parent.state.colprecise[this.moveIdx];
	                secondPrecise = this.parent.state.colprecise[this.moveIdx + 1];
	                pxSnapshot = this.pxColsizeSnapshot;
	                v = x;
	            } else {
	                key = 'rowsize';
	                size = this.rowsizeSnapshot.concat();
	                firstPrecise = this.parent.state.rowprecise[this.moveIdx];
	                secondPrecise = this.parent.state.rowprecise[this.moveIdx + 1];
	                pxSnapshot = this.pxRowsizeSnapshot;
	                v = y;
	            }
	            // move left and right
	            // this.parent.colsize,
	            if (firstPrecise || secondPrecise) {
	                var idx = firstPrecise ? this.moveIdx : this.moveIdx + 1;
	                size[idx] = size[idx] + v;
	            } else {
	                var ratio = (pxSnapshot[this.moveIdx] + v) / (pxSnapshot[this.moveIdx + 1] + pxSnapshot[this.moveIdx]);

	                var a = (size[this.moveIdx] + size[this.moveIdx + 1]) * ratio,
	                    b = (size[this.moveIdx] + size[this.moveIdx + 1]) * (1 - ratio);
	                size[this.moveIdx] = a;
	                size[this.moveIdx + 1] = b;
	            }
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
	})();

	exports['default'] = GridLayoutManager;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _GroupBaseJsx = __webpack_require__(4);

	var VGroup = (0, _GroupBaseJsx.groupFactory)(_Constants2['default'].Types.VGROUP, 'VGroup');
	exports['default'] = VGroup;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _mixinsDimension = __webpack_require__(7);

	var _mixinsDimension2 = _interopRequireDefault(_mixinsDimension);

	var _mixinsPersistentState = __webpack_require__(9);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var View = _react2['default'].createClass({
	    displayName: 'View',

	    mixins: [_mixinsDimension2['default'], _mixinsPersistentState2['default']],

	    render: function render() {
	        var className = "View";
	        if (this.props.className) className += ' ' + this.props.className;

	        var style = this.props.style;
	        if (!style) {
	            style = {
	                flexGrow: this.state.flex,
	                minWidth: this.state.width,
	                minHeight: this.state.height,
	                maxWidth: this.state.width,
	                maxHeight: this.state.height
	            };
	        }
	        return _react2['default'].createElement(
	            'div',
	            { id: this.props.id, className: className, style: style },
	            this.props.children
	        );
	    }
	});

	exports['default'] = View;
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

	var _GutterJsx = __webpack_require__(6);

	var _GutterJsx2 = _interopRequireDefault(_GutterJsx);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _mixinsDimension = __webpack_require__(7);

	var _mixinsDimension2 = _interopRequireDefault(_mixinsDimension);

	var _mixinsResponsive = __webpack_require__(8);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var _mixinsPersistentState = __webpack_require__(9);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _mixinsLayoutManager = __webpack_require__(10);

	var Grid = _react2['default'].createClass({
	    displayName: 'Grid',

	    mixins: [(0, _mixinsLayoutManager.LayoutManagerMixinFactory)(_Constants2['default'].Types.GRID), _mixinsResponsive2['default'], _mixinsDimension2['default'], _mixinsPersistentState2['default']],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            gutterWidth: _Constants2['default'].config.gutterWidth
	        };
	    },

	    renderGutters: function renderGutters(colpos, rowpos) {
	        var gutters = [];
	        // NOTE: somewhere has to calc col and row size
	        var rows = parseInt(this.props.rows),
	            cols = parseInt(this.props.cols),
	            idx = 0;

	        // vertical gutters
	        for (var i = 0; i < cols - 1; i++) {
	            var key = 'gutter-' + idx;
	            var style = {
	                position: 'absolute',
	                left: colpos[i + 1] - this.props.gutterWidth,
	                top: 0,
	                width: this.props.gutterWidth,
	                height: '100%'
	            };
	            gutters.push(_react2['default'].createElement(_GutterJsx2['default'], { className: 'we', key: key, ref: key, style: style, getLayoutManager: this.getLayoutManager, idx: idx++ }));
	        }

	        // horizontal gutters
	        for (var i = 0; i < rows - 1; i++) {
	            var key = 'gutter-' + idx;
	            var style = {
	                position: 'absolute',
	                left: 0,
	                top: rowpos[i + 1] - this.props.gutterWidth,
	                width: '100%',
	                height: this.props.gutterWidth
	            };
	            gutters.push(_react2['default'].createElement(_GutterJsx2['default'], { className: 'ns', key: key, ref: key, style: style, getLayoutManager: this.getLayoutManager, idx: idx++ }));
	        }

	        // corner gutters?
	        return gutters;
	    },

	    componentWillMount: function componentWillMount() {
	        // parse colsize property

	        var _parseSizeSpec = this.parseSizeSpec(this.props.colsize);

	        var _parseSizeSpec2 = _slicedToArray(_parseSizeSpec, 2);

	        var colsize = _parseSizeSpec2[0];
	        var colprecise = _parseSizeSpec2[1];

	        var _parseSizeSpec3 = this.parseSizeSpec(this.props.rowsize);

	        var _parseSizeSpec32 = _slicedToArray(_parseSizeSpec3, 2);

	        var rowsize = _parseSizeSpec32[0];
	        var rowprecise = _parseSizeSpec32[1];

	        this.state.colsize = colsize;
	        this.state.colprecise = colprecise;
	        this.state.rowsize = rowsize;
	        this.state.rowprecise = rowprecise;
	    },

	    componentDidMount: function componentDidMount() {
	        // To render child components, this one needs to know DOM size
	        var $node = this.getDOMNode();
	        if (!('width' in this.state || 'height' in this.state)) {
	            this.setState({
	                width: $node.clientWidth,
	                height: $node.clientHeight
	            });
	        }
	    },

	    onResized: function onResized() {
	        var $node = this.getDOMNode();
	        this.setState({
	            width: $node.clientWidth,
	            height: $node.clientHeight
	        });
	    },

	    stateRestored: function stateRestored() {
	        this.resize();
	    },

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
	    },

	    render: function render() {
	        var _this = this;

	        var className = 'Grid',
	            mutant = [],
	            props = this.props,
	            state = this.state;

	        if (this.props.className) {
	            className += ' ' + this.props.className;
	        }

	        var size = this.getLayoutManager().layout(this.state.colsize, this.state.rowsize, this.state.colprecise, this.state.rowprecise, {
	            gutterWidth: props.gutterWidth,
	            gutterWidth: props.gutterWidth,
	            cols: parseInt(props.cols),
	            rows: parseInt(props.rows)
	        }, state.width, state.height);

	        if (size) {
	            var _size = _slicedToArray(size, 4);

	            var colsize = _size[0];
	            var rowsize = _size[1];
	            var colpos = _size[2];
	            var rowpos = _size[3];

	            // create gutters
	            if (props.resizable) {
	                mutant = mutant.concat(this.renderGutters(colpos, rowpos));
	            }

	            // create panels
	            _react2['default'].Children.forEach(props.children, function (c, i) {
	                var x = parseInt(c.props.col),
	                    y = parseInt(c.props.row),
	                    key = 'child-' + i;
	                // key = `child-${x}-${y}`;

	                mutant.push(_react2['default'].addons.cloneWithProps(c, {
	                    key: key,
	                    ref: key,
	                    parent: _this,
	                    style: {
	                        position: 'absolute',
	                        left: colpos[x],
	                        top: rowpos[y],
	                        width: colsize[x],
	                        height: rowsize[y]
	                    }
	                }));
	            });
	        }

	        // var style = {
	        //     width: state.width,
	        //     height: state.height
	        // };
	        return _react2['default'].createElement(
	            'div',
	            { id: props.id, className: className },
	            mutant
	        );
	    }
	});

	exports['default'] = Grid;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _GutterJsx = __webpack_require__(6);

	var _GutterJsx2 = _interopRequireDefault(_GutterJsx);

	var _Constants = __webpack_require__(1);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _mixinsDimension = __webpack_require__(7);

	var _mixinsDimension2 = _interopRequireDefault(_mixinsDimension);

	var _mixinsResponsive = __webpack_require__(8);

	var _mixinsResponsive2 = _interopRequireDefault(_mixinsResponsive);

	var _mixinsPersistentState = __webpack_require__(9);

	var _mixinsPersistentState2 = _interopRequireDefault(_mixinsPersistentState);

	var _mixinsLayoutManager = __webpack_require__(10);

	var Tabs = _react2['default'].createClass({
	    displayName: 'Tabs',

	    mixins: [_mixinsPersistentState2['default'], _mixinsResponsive2['default']],

	    getInitialState: function getInitialState() {
	        return {
	            curTab: 0
	        };
	    },

	    renderTabbar: function renderTabbar(items) {
	        var _this = this;

	        return items.map(function (tab, i) {
	            var isActive = i == _this.state.curTab;
	            var className = 'Tabs-Bar-Item';
	            if (isActive) {
	                className += ' active';
	            }
	            return _react2['default'].createElement(
	                'div',
	                { className: className, 'data-idx': i, key: i, onClick: _this.onTabClick },
	                _react2['default'].createElement(
	                    'span',
	                    null,
	                    tab.label
	                )
	            );
	        });
	    },

	    onTabClick: function onTabClick(evt) {
	        var _this2 = this;

	        var idx = evt.currentTarget.dataset.idx;
	        this.setState({
	            curTab: idx
	        }, function () {
	            _this2.saveState();
	            if (typeof _this2.props.indexChanged == 'function') {
	                _this2.props.indexChanged(idx);
	            }

	            _this2.restoreContentState();
	        });
	    },

	    restoreContentState: function restoreContentState() {
	        // restore grid or group state
	        var content = this.refs.activeContent;
	        if (typeof content.restoreState == 'function') {
	            content.restoreState(function () {
	                if (typeof content.resize == 'function') {
	                    content.resize();
	                }
	            });
	        }
	    },

	    // PersistentState mixin hook
	    stateRestored: function stateRestored() {
	        this.restoreContentState();
	    },

	    componentDidMount: function componentDidMount() {
	        this.restoreContentState();
	    },

	    render: function render() {
	        var className = 'Tabs',
	            props = this.props,
	            state = this.state;

	        if (this.props.className) {
	            className += ' ' + props.className;
	        }

	        var items = [];
	        _react2['default'].Children.forEach(props.children, function (c, i) {
	            items[i] = { label: c.props.label, icon: c.props.icon };
	        });

	        var barItems = this.renderTabbar(items),
	            content = _react2['default'].addons.cloneWithProps(props.children[state.curTab], {
	            ref: 'activeContent'
	        });
	        return _react2['default'].createElement(
	            'div',
	            { id: this.props.id, className: className },
	            _react2['default'].createElement(
	                'div',
	                { className: 'Tabs-Bar' },
	                barItems
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'Tabs-Content' },
	                content
	            )
	        );
	    }
	});

	exports['default'] = Tabs;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".Tabs > .Tabs-Bar {\n  height: 36px; }\n  .Tabs > .Tabs-Bar a {\n    color: silver; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item.edit {\n    float: right; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item.add a,\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item.edit a {\n    color: #333; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item {\n    cursor: default;\n    display: inline-block;\n    padding: 0 20px;\n    position: relative;\n    height: 36px;\n    line-height: 36px;\n    transition: background-color 0.5s; }\n    .Tabs > .Tabs-Bar .Tabs-Bar-Item .closeBtn {\n      position: absolute;\n      top: 0;\n      right: 4px;\n      opacity: 0;\n      visibility: hidden;\n      transition: opacity 0.5s, visibility 0s linear 0.5s; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item:hover {\n    background: #eee; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item.active {\n    background: #eee; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item.active:after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    content: '';\n    display: block;\n    height: 3px;\n    background-color: #1675bd; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item:hover .closeBtn {\n    opacity: 1;\n    visibility: visible;\n    transition: opacity 0.5s, visibility 0s linear 0s; }\n  .Tabs > .Tabs-Bar .Tabs-Bar-Item:hover .closeBtn:hover {\n    color: #333; }\n\n.Tabs > .Tabs-Content {\n  height: calc(100% - 36px); }\n  .Tabs > .Tabs-Content .TabContentItem {\n    position: relative;\n    height: 100%;\n    display: none;\n    overflow: hidden; }\n  .Tabs > .Tabs-Content .TabContentItem.active {\n    display: block;\n    background-color: #eee; }\n\n.HGroup {\n  display: flex;\n  flex-direction: row; }\n\n.VGroup {\n  display: flex;\n  flex-direction: column; }\n\n.HGroup, .VGroup, .View {\n  flex-basis: 0;\n  flex: 1; }\n\n.Gutter {\n  background-color: #eee; }\n\n.HGroup > .Gutter {\n  width: 4px;\n  min-width: 4px;\n  max-width: 4px; }\n\n.VGroup > .Gutter {\n  height: 4px;\n  min-height: 4px;\n  max-height: 4px; }\n\n.Gutter.ns {\n  cursor: row-resize; }\n\n.Gutter.we {\n  cursor: col-resize; }\n\n.Grid {\n  overflow: hidden;\n  position: relative; }\n", ""]);

	// exports


/***/ },
/* 19 */
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
/* 20 */
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