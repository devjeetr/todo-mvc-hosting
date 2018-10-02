/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../component-framework/src/js/Component/Component.js":
/*!************************************************************!*\
  !*** ../component-framework/src/js/Component/Component.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "../component-framework/src/js/Component/PubSub.js");

/**
 * Represents a UI Component encapsulating
 * both the view and the
 */

const Component = {
  init() {
    this.__root = null;
    this.__eventStore = Object.create(_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"]);

    this.__eventStore.init();

    this.__events = {};
  },

  /**
   * Renders this component into the given dom element or Component or dom-helper
   * component.This component is appended to the end of the given element.
   */
  render(renderTarget) {
    if (!renderTarget) {
      throw Exception('InvalidArgumentException: Render target not specified for Component.render()');
    }

    if (renderTarget instanceof Element) {
      renderTarget.appendChild(this.__root.dom());
    } else {
      renderTarget.dom().appendChild(this.__root.dom());
    }
  },

  /**
   * returns the root dom element that wraps up
   * this component
   */
  dom() {
    return this.__root;
  },

  /**
   * Registers the given event handler for the given
   * event
   */
  on(event, handler) {
    this.__eventStore.subscribe(event, handler);

    return this;
  },

  /**
   * Detaches this component from the document's dom
   * tree if this element has been rendered
   */
  detach() {
    if (this.__root && this.__root.dom().parentElement) {
      this.__root.dom().parentElement.removeChild(this.__root.dom());
    }
  }

};
/* harmony default export */ __webpack_exports__["default"] = (Component);

/***/ }),

/***/ "../component-framework/src/js/Component/PubSub.js":
/*!*********************************************************!*\
  !*** ../component-framework/src/js/Component/PubSub.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A simple Pub/Sub module
 */
const PubSub = {
  init: function init() {
    this.store = new Map();
  },
  publish: function publish(event, ...args) {
    if (this.store.has(event)) {
      const handlers = this.store.get(event);
      handlers.forEach(h => {
        h(...args);
      });
    }
  },
  unsubscribe: function unsubscribe() {},
  subscribe: function subscribe(event, handler) {
    if (!this.store.has(event)) {
      this.store.set(event, []);
    }

    if (!(handler in this.store.get(event))) {
      this.store.get(event).push(handler);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (PubSub);

/***/ }),

/***/ "../component-framework/src/js/Component/index.js":
/*!********************************************************!*\
  !*** ../component-framework/src/js/Component/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "../component-framework/src/js/Component/Component.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "../component-framework/src/js/Component/utilities.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  Component: _Component__WEBPACK_IMPORTED_MODULE_0__["default"],
  utilities: _utilities__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "../component-framework/src/js/Component/utilities.js":
/*!************************************************************!*\
  !*** ../component-framework/src/js/Component/utilities.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const makeChainable = function (fn, propName) {
  return function (...args) {
    if (args.length === 0) {
      return this[propName];
    }

    fn(...args);
    return this;
  };
};

/* harmony default export */ __webpack_exports__["default"] = ({
  makeChainable
});

/***/ }),

/***/ "../vanillajs-framework/dist/dom-helper.js":
/*!*************************************************!*\
  !*** ../vanillajs-framework/dist/dom-helper.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (n) {
  var e = {};

  function t(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return n[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
  }

  return t.m = n, t.c = e, t.d = function (n, e, r) {
    t.o(n, e) || Object.defineProperty(n, e, {
      enumerable: !0,
      get: r
    });
  }, t.r = function (n) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(n, "__esModule", {
      value: !0
    });
  }, t.t = function (n, e) {
    if (1 & e && (n = t(n)), 8 & e) return n;
    if (4 & e && "object" == typeof n && n && n.__esModule) return n;
    var r = Object.create(null);
    if (t.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: n
    }), 2 & e && "string" != typeof n) for (var o in n) t.d(r, o, function (e) {
      return n[e];
    }.bind(null, o));
    return r;
  }, t.n = function (n) {
    var e = n && n.__esModule ? function () {
      return n.default;
    } : function () {
      return n;
    };
    return t.d(e, "a", e), e;
  }, t.o = function (n, e) {
    return Object.prototype.hasOwnProperty.call(n, e);
  }, t.p = "", t(t.s = 0);
}([function (n, e, t) {
  "use strict";

  function r(n) {
    return function (n) {
      if (Array.isArray(n)) {
        for (var e = 0, t = new Array(n.length); e < n.length; e++) t[e] = n[e];

        return t;
      }
    }(n) || function (n) {
      if (Symbol.iterator in Object(n) || "[object Arguments]" === Object.prototype.toString.call(n)) return Array.from(n);
    }(n) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  t.r(e), t.d(e, "el", function () {
    return o;
  });

  var o = function (n) {
    var e = null;

    function t(n) {
      if (!n) return t;
      var o,
          u = c(n),
          l = i(n),
          f = a(n);
      (e = document.createElement(u), l.length > 0) && (o = e.classList).add.apply(o, r(l));
      return f && (e.id = f), t;
    }

    return t.on = function (n, r) {
      return e.addEventListener(n, r), t;
    }, t.attr = function (n, r) {
      return r ? (u(e, function (n, e, t) {
        return e in n ? Object.defineProperty(n, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : n[e] = t, n;
      }({}, n, r)), t) : n in e ? e[n] : (console.warn("attribute ".concat(n, " not found in element ").concat(e)), null);
    }, t.attrs = function (n) {
      return u(e, n), t;
    }, t.dom = function () {
      return e;
    }, t.render = function (n) {
      return n.append(e), t;
    }, t.delete = function () {
      e && e.parentElement ? e.parentElement.removeChild(e) : console.warn("Trying to delete an element that doesn't have a parent");
    }, t.classed = function (n, t) {
      t ? e.classList.add(n) : e.classList.remove(n);
    }, t.append = function () {
      if (!e) return t;

      for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];

      return r.forEach(function (n) {
        Array.isArray(n) ? n.forEach(function (n) {
          t.append(n);
        }) : n instanceof Element ? e.appendChild(n) : n.hasOwnProperty("dom") && e.appendChild(n.dom());
      }), t;
    }, t(n);
  },
      u = function (n, e) {
    for (var t in e) t in n ? n[t] = e[t] : console.warn("trying to set property ".concat(t, " on element ").concat(n));
  },
      a = function (n) {
    var e = /#([^\.|^#]+)/.exec(n);
    return e ? e[1] : null;
  },
      i = function (n) {
    for (var e = /\.([^\.|^#]+)/g, t = [], r = e.exec(n); r;) t.push(r[1]), r = e.exec(n);

    return t;
  },
      c = function (n) {
    var e = /^([a-zA-Z]+)/.exec(n);
    return e ? e[1] : null;
  };
}]);

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./public/fonts/woff2.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./public/fonts/woff2.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: Source Sans Pro;\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Source Sans Pro Regular\"), local(\"SourceSansPro-Regular\"), url(\"data:application/x-font-woff2;base64,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\") format(\"woff2\"); }\n\n@font-face {\n  font-family: Roboto;\n  font-style: italic;\n  font-weight: 700;\n  src: local(\"Roboto Bold Italic\"), local(\"Roboto-BoldItalic\"), url(\"data:application/x-font-woff2;base64,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\") format(\"woff2\"); }\n\n@font-face {\n  font-family: Roboto;\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"), url(\"data:application/x-font-woff2;base64,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\") format(\"woff2\"); }\n\n@font-face {\n  font-family: Charmonman;\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Charmonman Regular\"), local(\"Charmonman-Regular\"), url(\"data:application/x-font-woff2;base64,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\") format(\"woff2\"); }\n\n@font-face {\n  font-family: Rubik;\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Rubik\"), local(\"Rubik-Regular\"), url(\"data:application/x-font-woff2;base64,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\") format(\"woff2\"); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/sass/style.scss":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/sass/style.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "*, *:before, *:after {\n  box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: #e74c3c;\n  font-family: \"Charmonman\"; }\n\n.todo-list-root-div {\n  display: flex;\n  height: 100%;\n  flex-flow: column nowrap;\n  border-radius: 2px;\n  box-shadow: 0 0 1px black;\n  font-family: cursive;\n  background-color: #ecf0f1;\n  color: #34495e; }\n\n.todo-list-todos-root {\n  display: flex;\n  flex-flow: column nowrap; }\n\n.todo-list-todo-item-root {\n  display: flex;\n  flex-flow: row nowrap;\n  margin-top: 0;\n  font-size: 25px;\n  height: 3em;\n  border-top: 1px solid;\n  background-color: inherit;\n  transition: box-shadow 0.4s ease-in-out, background-color 0.5s linear; }\n  .todo-list-todo-item-root .todo-list-todo-item-checkbox-div,\n  .todo-list-todo-item-root .todo-list-todo-item-delete-button-div,\n  .todo-list-todo-item-root .todo-list-todo-item-text-div {\n    display: flex;\n    padding: 1em;\n    align-content: center;\n    align-items: center; }\n  .todo-list-todo-item-root .todo-list-todo-item-delete-button-div {\n    visibility: hidden;\n    justify-content: flex-end; }\n  .todo-list-todo-item-root .todo-list-todo-item-checkbox-div {\n    flex: 0 0 5%;\n    padding-right: 0; }\n  .todo-list-todo-item-root .todo-list-todo-item-delete-button-div {\n    flex: 20%; }\n  .todo-list-todo-item-root .todo-list-todo-item-text-div {\n    display: flex;\n    flex: 0 0 70%;\n    font-size: 20px;\n    height: 100%;\n    line-height: 1.2em; }\n    .todo-list-todo-item-root .todo-list-todo-item-text-div input {\n      flex: 0 0 100%;\n      font-size: inherit;\n      align-self: baseline;\n      align-content: flex-end;\n      font-family: inherit;\n      color: inherit;\n      text-decoration: none;\n      font-weight: inherit;\n      line-height: inherit;\n      border: none;\n      background: transparent;\n      width: auto;\n      height: 100%;\n      margin: 0;\n      padding: 0;\n      outline: none;\n      text-decoration: none !important; }\n  .todo-list-todo-item-root .todo-list-todo-item-delete-button-div:hover {\n    cursor: pointer; }\n\n.todo-item-completed {\n  text-decoration: line-through;\n  font-weight: 100; }\n\n.todo-item--editing input[type=\"text\"] {\n  text-decoration: none !important; }\n\n.todo-list-todo-item-root:hover {\n  box-shadow: 0 0 8px; }\n  .todo-list-todo-item-root:hover .todo-list-todo-item-delete-button-div {\n    visibility: visible; }\n\n.todo-list-input-root {\n  display: flex;\n  padding: 1em;\n  padding-left: none;\n  padding-right: none;\n  border-bottom: 1px solid; }\n  .todo-list-input-root input {\n    margin: 0;\n    flex: 0 0 100%;\n    outline: none;\n    border: none;\n    font-size: 30px;\n    background-color: #ecf0f1;\n    color: #34495e; }\n  .todo-list-input-root input:placeholder-shown {\n    border: none; }\n\n.todo-list-filter-root {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-around;\n  align-items: center;\n  font-size: 19px;\n  transition: all 0.4s linear; }\n  .todo-list-filter-root div {\n    margin-left: 5px;\n    margin-right: 5px;\n    display: flex;\n    flex: 0 0 10%;\n    cursor: pointer;\n    padding: 0.4em;\n    border-radius: 5%;\n    padding: 0.5em;\n    position: relative;\n    z-index: 0; }\n  .todo-list-filter-root div:hover::before {\n    width: 100%;\n    color: white; }\n  .todo-list-filter-root div:hover, .todo-list-filter-root .filter-option-item--active {\n    color: white;\n    background-color: #34495e; }\n\n.todo-list-status-bar-root {\n  display: flex;\n  border-top: 2px solid;\n  justify-content: space-between;\n  align-content: center;\n  align-items: center;\n  flex-flow: row nowrap;\n  padding: 1em;\n  visibility: hidden;\n  display: none; }\n\n.visible {\n  visibility: visible;\n  display: flex; }\n\n#app {\n  height: auto;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-template-rows: repeat(auto-fill, minmax(auto, auto));\n  grid-auto-rows: auto;\n  font-family: \"Rubik\"; }\n\nheader {\n  grid-column: 2 / 3;\n  display: flex;\n  color: #ecf0f1;\n  font-size: 50px;\n  align-items: center;\n  justify-content: center;\n  padding: 0.5em; }\n\n.todo-list-root-div {\n  grid-column: 2 / 3; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./public/fonts/woff2.css":
/*!********************************!*\
  !*** ./public/fonts/woff2.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./woff2.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./public/fonts/woff2.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/js/TodoComponents/TodoFilter.js":
/*!*********************************************!*\
  !*** ./src/js/TodoComponents/TodoFilter.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var component_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! component-framework */ "../component-framework/src/js/Component/index.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vanillajs-framework */ "../vanillajs-framework/dist/dom-helper.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__);


const Component = component_framework__WEBPACK_IMPORTED_MODULE_0__["default"].Component;
const utilities = component_framework__WEBPACK_IMPORTED_MODULE_0__["default"].utilities;
const TodoFilter = Object.create(Component);

TodoFilter.init = function init() {
  Component.init.call(this);
  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-filter-root');
  this.__activeElement = null;
  this.__events.FILTER_OPTION_CLICKED = 'FILTER_OPTION_CLICKED';
};
/**
 * adds a new option to the filter menu
 * @param {string} optionText
 */


TodoFilter.option = function option(optionText) {
  const $newOptionItem = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-filter-option-item');
  $newOptionItem.attr('textContent', optionText);
  $newOptionItem.on('mousedown', e => {
    this.__eventStore.publish(this.__eventStore.FILTER_OPTION_CLICKED, e.target.textContent);

    if (this.__activeElement) {
      this.__activeElement.dom().classList.remove('filter-option-item--active');
    }

    e.target.classList.add('filter-option-item--active');
    this.__activeElement = $newOptionItem;
  });

  if (!this.__activeElement) {
    this.__activeElement = $newOptionItem;
    $newOptionItem.dom().classList.add('filter-option-item--active');
  }

  $newOptionItem.render(this.__root);
  return this;
};

/* harmony default export */ __webpack_exports__["default"] = (TodoFilter);

/***/ }),

/***/ "./src/js/TodoComponents/TodoInput.js":
/*!********************************************!*\
  !*** ./src/js/TodoComponents/TodoInput.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var component_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! component-framework */ "../component-framework/src/js/Component/index.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vanillajs-framework */ "../vanillajs-framework/dist/dom-helper.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__);


const Component = component_framework__WEBPACK_IMPORTED_MODULE_0__["default"].Component;
let TodoInput = Object.create(Component);

TodoInput.init = function () {
  Component.init.call(this); // create elements 

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-input-root');
  this.$todoInput = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('input').attrs({
    'type': 'text',
    'placeholder': 'What needs to be done?'
  });

  this.__root.append(this.$todoInput); // create events


  this.__events.TODO_SUBMITTED = 'TODO_SUBMITTED'; // add event handlers

  this.$todoInput.on('keydown', e => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      this.__eventStore.publish(this.__events.TODO_SUBMITTED, e.target.value); // TODO
      // find out why $todoInput.attr("value", "") doesn't
      // clear the input field


      this.$todoInput.dom().value = "";
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (TodoInput);

/***/ }),

/***/ "./src/js/TodoComponents/TodoItem.js":
/*!*******************************************!*\
  !*** ./src/js/TodoComponents/TodoItem.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanillajs-framework */ "../vanillajs-framework/dist/dom-helper.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var component_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! component-framework */ "../component-framework/src/js/Component/index.js");


const Component = component_framework__WEBPACK_IMPORTED_MODULE_1__["default"].Component;
const TodoItem = Object.create(Component);

TodoItem.init = function (text) {
  Component.init.call(this);
  this.__text = text; // create all dom elements

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-root');
  this.$checkboxDiv = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-checkbox-div');
  this.$todoTextDiv = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-text-div');
  this.$deleteButton = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-delete-button-div');
  this.$todoEditInput = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('input').attr('type', 'text');
  this.$checkbox = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('input').attr('type', 'checkbox'); // set attributes

  this.$deleteButton.attr('textContent', 'Delete');
  this.$todoTextDiv.attr('textContent', text); // setup dom tree

  this.$checkbox.render(this.$checkboxDiv);
  this.$checkboxDiv.render(this.__root.dom());
  this.$todoTextDiv.render(this.__root.dom());
  this.$deleteButton.render(this.__root.dom()); // add events

  this.__events.TODO_CHECKBOX_TOGGLED = 'TODO_CHECKBOX_TOGGLED';
  this.__events.TODO_DELETE_BUTTON_CLICKED = 'TODO_DELETE_BUTTON_CLICKED';
  this.__events.TODO_ITEM_EDITED = 'TODO_ITEM_EDITED'; // add event emitters

  this.$checkbox.on('click', e => {
    this.__eventStore.publish(this.__events.TODO_CHECKBOX_TOGGLED, e.target.checked);

    if (e.target.checked) {
      this.$todoTextDiv.dom().classList.add("todo-item-completed");
    } else {
      this.$todoTextDiv.dom().classList.remove("todo-item-completed");
    }
  });
  this.$deleteButton.on('click', e => {
    this.__eventStore.publish(this.__events.TODO_DELETE_BUTTON_CLICKED);
  });
  this.$todoTextDiv.on('dblclick', e => {
    e.preventDefault();
    makeEditable.call(this, true);
  }); // TODO 
  // uncomment
  // this.$todoEditInput.on('blur', (e) => {
  //   this.__text = e.target.value;
  //   makeEditable.call(this, false);
  //   this.__eventStore.publish(this.__events.TODO_ITEM_EDITED);
  // });

  this.$todoEditInput.on('keydown', e => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      e.preventDefault();

      this.__eventStore.publish(this.__events.TODO_ITEM_EDITED);

      this.__text = e.target.value;
      makeEditable.call(this, false);
    } else if (e.keyCode === 27) {
      e.preventDefault();
      makeEditable.call(this, false);
    }
  });
};

function makeEditable(isEditable) {
  if (isEditable) {
    this.$todoTextDiv.dom().innerHTML = '';

    this.__root.dom().classList.add('todo-item--editing');

    this.$todoEditInput.render(this.$todoTextDiv);
    this.$todoEditInput.attr('value', this.__text);
    this.$todoEditInput.dom().focus();
  } else {
    this.__root.dom().classList.remove('todo-item--editing');

    this.$todoTextDiv.attr('textContent', this.__text);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TodoItem);

/***/ }),

/***/ "./src/js/TodoComponents/TodoList.js":
/*!*******************************************!*\
  !*** ./src/js/TodoComponents/TodoList.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanillajs-framework */ "../vanillajs-framework/dist/dom-helper.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var component_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! component-framework */ "../component-framework/src/js/Component/index.js");
/* harmony import */ var _TodoInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoInput */ "./src/js/TodoComponents/TodoInput.js");
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TodoItem */ "./src/js/TodoComponents/TodoItem.js");
/* harmony import */ var _TodoStatusBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TodoStatusBar */ "./src/js/TodoComponents/TodoStatusBar.js");





const Component = component_framework__WEBPACK_IMPORTED_MODULE_1__["default"].Component;
/**
 * TodoList Object
 */

const TodoList = Object.create(Component);

TodoList.init = function () {
  Component.init.call(this); // create data stores

  this.todosDataStore = new Map();
  this.todoCounter = 0; // create dom elements and components

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-root-div');
  this.todosRoot = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todos-root');
  this.todoInput = Object.create(_TodoInput__WEBPACK_IMPORTED_MODULE_2__["default"]);
  this.TodoStatusBar = Object.create(_TodoStatusBar__WEBPACK_IMPORTED_MODULE_4__["default"]);
  this.todoInput.init();
  this.TodoStatusBar.init();
  this.activeFilter = 'All'; // TODO
  // Investigate why __root.append(this.todoInput)
  // doesn't work
  // build dom tree

  this.todoInput.render(this.__root.dom());
  this.todosRoot.render(this.__root.dom());
  this.TodoStatusBar.render(this.__root); // add event handlers

  this.todoInput.on(this.todoInput.__events.TODO_SUBMITTED, addTodo.bind(this));
  this.TodoStatusBar.on(this.TodoStatusBar.__events.FILTER_OPTION_CHANGED, changeFilter.bind(this));
  this.TodoStatusBar.on(this.TodoStatusBar.__events.CLEAR_COMPLETED_TODOS_CLICKED, clearCompletedTodos.bind(this));
};

function addTodo(newTodoText) {
  // create new todo item
  const $newTodoItem = Object.create(_TodoItem__WEBPACK_IMPORTED_MODULE_3__["default"]); // initialize and add it to root

  $newTodoItem.init(newTodoText);
  $newTodoItem.render(this.todosRoot); // store this information in the data store

  this.todoCounter += 1;
  this.todosDataStore.set(this.todoCounter, {
    completed: false,
    $element: $newTodoItem
  }); // add event handlers

  $newTodoItem.on($newTodoItem.__events.TODO_CHECKBOX_TOGGLED, toggleTodoCheckbox.bind(this, this.todoCounter));
  $newTodoItem.on($newTodoItem.__events.TODO_DELETE_BUTTON_CLICKED, deleteTodo.bind(this, this.todoCounter));
  $newTodoItem.on($newTodoItem.__events.TODO_ITEM_DB_CLICKED, updateTodo.bind(this, this.todoCounter)); // update remaining

  updateRemaining.call(this);
  changeFilter.call(this, this.activeFilter); // TODO
  // display filter bar here

  this.TodoStatusBar.dom().dom().classList.add('visible'); // console.log(this.TodoStatusBar;
}

function updateTodo(id) {}

function markAllComplete() {
  /* eslint-disable */
  for (const todoItem of this.todosDataStore.values()) {
    todoItem.completed = true;
  }
  /* eslint-enable */


  changeFilter.call(this.filterOption);
}

function changeFilter(filterOption) {
  const FilterMappings = {
    All: () => true,
    Completed: item => item.completed,
    Remaining: item => !item.completed
  };
  /* eslint-disable */

  for (const todoItem of this.todosDataStore.values()) {
    if (FilterMappings[filterOption](todoItem)) {
      if (!todoItem.$element.dom().parentElement || todoItem.$element.dom().parentElement !== this.todosRoot.dom()) {
        todoItem.$element.render(this.todosRoot);
      }
    } else {
      todoItem.$element.detach();
    }
  }
  /* eslint-enable */


  this.activeFilter = filterOption;
}

function clearCompletedTodos() {
  /* eslint-disable */
  let remaining = 0;

  for (const todoId of this.todosDataStore.keys()) {
    const todoItem = this.todosDataStore.get(todoId);

    if (todoItem.completed) {
      todoItem.$element.detach();
      this.todosDataStore.delete(todoId);
    } else {
      remaining += 1;
    }
  }
  /* eslint-enable */


  updateRemaining.call(this);

  if (this.todosDataStore.size === 0) {
    this.TodoStatusBar.dom().dom().classList.remove('visible');
  }
}

function toggleTodoCheckbox(id, isChecked) {
  this.todosDataStore.get(id).completed = isChecked;
  updateRemaining.call(this);
}

function updateRemaining(remaining = 0) {
  if (!remaining) {
    /* eslint-disable */
    for (const todoItem of this.todosDataStore.values()) {
      remaining += !todoItem.completed ? 1 : 0;
    }
    /* eslint-enable */

  }

  this.TodoStatusBar.remaining(remaining);
}

function deleteTodo(id) {
  // TODO
  // make sure $element is properly deleted
  this.todosDataStore.get(id).$element.detach();
  this.todosDataStore.delete(id);
  updateRemaining.call(this);

  if (this.todosDataStore.size === 0) {
    // this.TodoStatusBar.detach();
    this.TodoStatusBar.dom().dom().classList.remove('visible');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TodoList);

/***/ }),

/***/ "./src/js/TodoComponents/TodoStatusBar.js":
/*!************************************************!*\
  !*** ./src/js/TodoComponents/TodoStatusBar.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var component_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! component-framework */ "../component-framework/src/js/Component/index.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vanillajs-framework */ "../vanillajs-framework/dist/dom-helper.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TodoFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoFilter */ "./src/js/TodoComponents/TodoFilter.js");



const Component = component_framework__WEBPACK_IMPORTED_MODULE_0__["default"].Component;
/**
 * Status bar component for the TodoList
 */

const TodoStatusBar = Object.create(Component);

TodoStatusBar.init = function init() {
  Component.init.call(this); // create html markup

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-status-bar-root');
  this.$todosRemainingDiv = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-status-bar-todos-remaining');
  this.$clearTodosDiv = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-status-bar-clear-todos-div');
  this.$clearTodosButton = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('button.todo-list-status-bar-clear-todos-btn');
  this.TodoFilter = Object.create(_TodoFilter__WEBPACK_IMPORTED_MODULE_2__["default"]); // initialize child components

  this.TodoFilter.init(); //

  const options = ['All', 'Completed', 'Remaining'];
  options.forEach(option => {
    this.TodoFilter.option(option);
  }); // setup event handling and associated attributes

  this.__events.FILTER_OPTION_CHANGED = 'FILTER_OPTION_CHANGED';
  this.__events.CLEAR_COMPLETED_TODOS_CLICKED = 'CLEAR_COMPLETED_TODOS_CLICKED';
  this.TodoFilter.on(this.TodoFilter.__events.FILTER_OPTION_CHANGED, (...args) => {
    this.__eventStore.publish(this.__events.FILTER_OPTION_CHANGED, ...args);
  });
  this.$clearTodosButton.attr('textContent', 'Clear Completed').on('click', () => {
    this.__eventStore.publish(this.__events.CLEAR_COMPLETED_TODOS_CLICKED);
  }); // build dom tree

  this.$clearTodosButton.render(this.$clearTodosDiv);
  this.$todosRemainingDiv.render(this.__root);
  this.TodoFilter.render(this.__root);
  this.$clearTodosDiv.render(this.__root);
};

TodoStatusBar.remaining = function (remainingCount) {
  if (remainingCount > 0) {
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-none-remaining');
    this.$todosRemainingDiv.dom().classList.add('todo-status-bar-some-remaining');
    this.$todosRemainingDiv.attr('textContent', `${remainingCount} things left to do`);
  } else if (remainingCount === 0) {
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-some-remaining');
    this.$todosRemainingDiv.dom().classList.add('todo-status-bar-none-remaining');
    this.$todosRemainingDiv.attr('textContent', 'Nothing left to do!');
  } else if (remainingCount < 0) {
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-some-remaining');
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-none-remaining');
    this.$todosRemainingDiv.attr('textContent', '');
  }

  return this;
};

/* harmony default export */ __webpack_exports__["default"] = (TodoStatusBar);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanillajs-framework */ "../vanillajs-framework/dist/dom-helper.js");
/* harmony import */ var vanillajs_framework__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TodoComponents_TodoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoComponents/TodoList */ "./src/js/TodoComponents/TodoList.js");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/style.scss */ "./src/sass/style.scss");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _public_fonts_woff2_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../public/fonts/woff2.css */ "./public/fonts/woff2.css");
/* harmony import */ var _public_fonts_woff2_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_public_fonts_woff2_css__WEBPACK_IMPORTED_MODULE_3__);





window.onload = () => {
  const todoList = Object.create(_TodoComponents_TodoList__WEBPACK_IMPORTED_MODULE_1__["default"]);
  const app = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.#app').render(document.body);
  todoList.init();
  Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('header').attr('textContent', 'TodoMVC').render(app);
  todoList.render(app);
};

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/sass/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map