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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_styles__ = __webpack_require__(1);

const css = __webpack_require__(2);

// This is a CSS Only component so just expose the CSS styles.
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_styles__["a" /* addStyle */])('eds-avatar', css);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addStyle;
function insertStyle(container, id, stylesheet) {
  if (!container.querySelector(`style[data-id="${id}"]`)) {
    const style = document.createElement('style');
    style.setAttribute('data-id', id);
    style.appendChild(document.createTextNode(stylesheet));
    container.appendChild(style);
  }
}

function addStyle(id, stylesheet, element) {
  let container;

  if (element && element.closest('html')) container = element.closest('html').querySelector('head');
  else container = document.head;

  insertStyle(container, id, stylesheet);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n[eds-avatar] {\n  box-sizing: content-box;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #cccccc;\n  color: #cccccc;\n  border-radius: 50%;\n  overflow: hidden;\n  width: 32px;\n  height: 32px; }\n  [eds-avatar]:not([inverse]) {\n    background-color: #ffffff; }\n  [eds-avatar][background=\"gray\"] {\n    background-color: #f6f6f6; }\n  [eds-avatar][inverse] {\n    border-color: #ffffff;\n    color: #ffffff; }\n  [eds-avatar][blue] {\n    border-color: #426da9;\n    color: #426da9; }\n  [eds-avatar][small] {\n    width: 24px;\n    height: 24px;\n    line-height: 24px;\n    font-size: 12px; }\n  [eds-avatar][large] {\n    width: 48px;\n    height: 48px;\n    line-height: 48px;\n    font-size: 22px; }\n  [eds-avatar]::before {\n    content: attr(data-initials); }\n  [eds-avatar]:not([data-initials]) {\n    background-image: url(\"data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23CCCCCC' /%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\");\n    background-repeat: no-repeat;\n    background-size: 80%;\n    background-position: center; }\n    [eds-avatar]:not([data-initials])[inverse] {\n      background-image: url(\"data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23FFFFFF' /%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\"); }\n    [eds-avatar]:not([data-initials])[blue] {\n      background-image: url(\"data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23426DA9' /%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\"); }\n  [eds-avatar] img {\n    width: 100%; }\n"

/***/ })
/******/ ]);