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


let TodoInput = Object.create(component_framework__WEBPACK_IMPORTED_MODULE_0__["Component"]);

TodoInput.init = function () {
  component_framework__WEBPACK_IMPORTED_MODULE_0__["Component"].init.call(this); // create elements 

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('div.todo-list-input-root');
  this.$todoInput = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_1__["el"])('input').attr('type', 'text');

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


const TodoItem = Object.create(component_framework__WEBPACK_IMPORTED_MODULE_1__["Component"]);

TodoItem.init = function (text) {
  component_framework__WEBPACK_IMPORTED_MODULE_1__["Component"].init.call(this); // create all dom elements

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-root');
  this.$checkboxDiv = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-checkbox-div');
  this.$todoTextDiv = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-text-div');
  this.$deleteButton = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todo-item-delete-button-div');
  this.$checkbox = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('input').attr('type', 'checkbox'); // set attributes

  this.$deleteButton.attr('textContent', 'Delete');
  this.$todoTextDiv.attr('textContent', text); // setup dom tree

  this.$checkbox.render(this.$checkboxDiv);
  this.$checkboxDiv.render(this.__root.dom());
  this.$todoTextDiv.render(this.__root.dom());
  this.$deleteButton.render(this.__root.dom()); // add events

  this.__events.TODO_CHECKBOX_TOGGLED = 'TODO_CHECKBOX_TOGGLED';
  this.__events.TODO_DELETE_BUTTON_CLICKED = 'TODO_DELETE_BUTTON_CLICKED'; // add event emitters

  this.$checkbox.on('click', e => {
    this.__eventStore.publish(this.__events.TODO_CHECKBOX_TOGGLED, e.target.checked);
  });
  this.$deleteButton.on('click', e => {
    this.__eventStore.publish(this.__events.TODO_DELETE_BUTTON_CLICKED);
  });
};

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
/* harmony import */ var _TodoInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoInput */ "./src/js/TodoComponents/TodoInput.js");
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoItem */ "./src/js/TodoComponents/TodoItem.js");



let TodoList = Object.create(Component);

TodoList.init = function () {
  Component.init.call(this); // create data stores

  this.todosDataStore = new Map();
  this.todoCounter = 0; // create dom elements and components

  this.__root = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-root-div');
  this.todosRoot = Object(vanillajs_framework__WEBPACK_IMPORTED_MODULE_0__["el"])('div.todo-list-todos-root');
  this.todoInput = Object.create(_TodoInput__WEBPACK_IMPORTED_MODULE_1__["default"]);
  this.todoInput.init(); // TODO
  // Investigate why __root.append(this.todoInput) 
  // doesn't work
  // build dom tree

  this.todoInput.render(this.__root.dom());
  this.todosRoot.render(this.__root.dom()); // add event handlers

  this.todoInput.on(this.todoInput.__events.TODO_SUBMITTED, addTodo.bind(this));
};

function addTodo(newTodoText) {
  // create new todo item
  let $newTodoItem = Object.create(_TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"]); // initialize and add it to root

  $newTodoItem.init(newTodoText);
  $newTodoItem.render(this.todosRoot); // store this information in the data store

  this.todoCounter += 1;
  this.todosDataStore.set(this.todoCounter, {
    completed: false,
    $element: $newTodoItem
  }); // add event handlers

  $newTodoItem.on($newTodoItem.__events.TODO_CHECKBOX_TOGGLED, toggleTodoCheckbox.bind(this, this.todoCounter));
  $newTodoItem.on($newTodoItem.__events.TODO_DELETE_BUTTON_CLICKED, deleteTodo.bind(this, this.todoCounter)); // TODO
  // display filter bar here
}

function toggleTodoCheckbox(id, isChecked) {
  this.todosDataStore.get(id).completed = isChecked;
}

function deleteTodo(id) {
  console.log(id);
  console.log(this.todosDataStore.get(id)); // TODO
  // make sure $element is properly deleted

  this.todosDataStore.get(id).$element.detach();
  this.todosDataStore.delete(id);
}

/* harmony default export */ __webpack_exports__["default"] = (TodoList);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TodoComponents_TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoComponents/TodoList */ "./src/js/TodoComponents/TodoList.js");
// import {el} from 'vanillajs-framework';
// import * as componentFramework from 'component-framework';


window.onload = () => {
  const todoList = Object.create(_TodoComponents_TodoList__WEBPACK_IMPORTED_MODULE_0__["default"]);
  todoList.init();
  todoList.render(document.body);
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map