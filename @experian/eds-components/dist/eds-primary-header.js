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
/***/ (function(module, exports, __webpack_require__) {

const tag = 'eds-primary-header';
const html = __webpack_require__(1);
const css = __webpack_require__(2);

const DEFAULT_MOTIF = 'light';
const DEFAULT_TITLE = 'Application';
const DEFAULT_LOGO_HREF = '#';
const DEFAULT_LOGO_TEXT = 'Home';

class EDSPrimaryHeaderElement extends EDSElement {
  static get observedAttributes() {
    return ['motif', 'title', 'logoHref', 'logoText'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      logoAnchor: this.$('.eds-logo a'),
      logoText: this.$('.eds-logo a .sr-only'),
      title: this.$('.eds-application-name'),
      navigation: this.$('.eds-primary-header-nav'),
      icons: this.$('.eds-primary-header-icons')
    };

    this.defineDefaultProperties(['motif']);
    this.motif = this.motif || DEFAULT_MOTIF;
    this.title = this.title || DEFAULT_TITLE;
    this.logoHref = this.logoHref || DEFAULT_LOGO_HREF;
    this.logoText = this.logoText || DEFAULT_LOGO_TEXT;
    this._refs.navigation.addEventListener('click', this._onNavigationClick.bind(this));
    this._refs.icons.addEventListener('click', this._onIconClick.bind(this));
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
    this._refs.title.innerHTML = val;
  }

  get logoHref() {
    return this.getAttribute('logoHref');
  }

  set logoHref(val) {
    this._refs.logoAnchor.setAttribute('href', val);
    this.setAttribute('logoHref', val);
  }

  get logoText() {
    return this.getAttribute('logoText');
  }

  set logoText(val) {
    this._refs.logoText.innerHTML = val;
    this.setAttribute('logoText', val);
  }

  get selectedNavigationElement() {
    return this._refs.navigation.querySelector('a[selected]');
  }

  set selectedNavigationElement(el) {
    if (!this.contains(el)) throw new Error(`You can only select children of ${tag}`);
    this._deselectNavigationElements();
    // Ensure the top level anchor tag gets selected
    if (el.tagName !== 'A') el = el.closest('a');
    el.setAttribute('selected');
  }

  _deselectNavigationElements() {
    // Need to query from the host in order to find slotted content
    Array.from(this.querySelectorAll('.eds-primary-header-nav a')).forEach(el => {
      el.removeAttribute('selected');
    });
  }

  _onNavigationClick(e) {
    this.selectedNavigationElement = e.target;
    this.dispatchEvent(new CustomEvent('navigationclick', { detail: e.target }));
  }

  _onIconClick(e) {
    this.dispatchEvent(new CustomEvent('iconclick', { detail: e.target }));
  }
}

customElements.define(tag, EDSPrimaryHeaderElement);
window.EDSPrimaryHeaderElement = EDSPrimaryHeaderElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<header class='eds-primary-header-content api-primary-header-content' role='banner'>\n  <div class='eds-primary-header-logo-container'>\n    <span class='eds-logo'><a><span class=\"sr-only\"></span></a></span>\n    <span class='eds-application-name'></span>\n  </div>\n\n  <div class='eds-primary-header-nav'>\n    <slot></slot>\n  </div>\n\n  <div class='eds-primary-header-icons'>\n    <slot name='icons'></slot>\n  </div>\n</header>"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-primary-header[motif='light'] {\n  background-color: #ffffff; }\n  eds-primary-header[motif='light']::after {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    content: '';\n    display: block;\n    height: 2px;\n    background: linear-gradient(45deg, #af1685, #1d4f91); }\n  eds-primary-header[motif='light'] .eds-primary-header-logo-container .eds-logo {\n    background-image: url(\"data:image/png;base64,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\"); }\n  eds-primary-header[motif='light'] .eds-primary-header-logo-container .eds-application-name {\n    border-color: #cccccc; }\n  eds-primary-header[motif='light'] .eds-primary-header-nav a {\n    color: #426da9; }\n    eds-primary-header[motif='light'] .eds-primary-header-nav a:hover {\n      background-color: #f3f3f3; }\n    eds-primary-header[motif='light'] .eds-primary-header-nav a[selected] {\n      background-color: #f3f3f3;\n      color: #333333; }\n  eds-primary-header[motif='light'] .eds-primary-header-icons > [slot='icons'] {\n    color: #aaaaaa; }\n    eds-primary-header[motif='light'] .eds-primary-header-icons > [slot='icons'] > span:hover {\n      background-color: #f3f3f3; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-primary-header[motif='dark'] {\n  background-color: #426da9;\n  padding-top: 1px; }\n  eds-primary-header[motif='dark']::after {\n    height: 0; }\n  eds-primary-header[motif='dark'] .eds-primary-header-logo-container .eds-logo {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAABMCAMAAABQ+guyAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMA9AORVUrp5iH8dGWDBt2g+CwJ0kMaDhLtxzA0KNjDtpCI8bCmd29qXxerlzw4y7pcvlDhjH2dHiXRr6Q6AAAHM0lEQVR42u2c6ZaaMBSALygoKoyKgPuuuIuOy+T9X6wSyCrOaI/tqdTvRw8dJiFftnuJtnAT99AxUIx1mkNa8SzEo39BSvlAIl1IJ6qCJFI6efNIpgappI1kNEglb9G08RZNG29Rv1MP6a4hHdwSXdGcsAqpwEUyTQgpIUJahtSWPIcqhAxSlylpkqgPry9aXRcpNQ9igiFilAvw+qJFBXEYB7LLeNq0ELOfw+uLDpDEDr7hiAgt+POoWT8PT6JlIBkfbrNGMbm/EF7MLkJK7YkD+shhQrZrXeiMKvDnmaELG3gO22tRBf4R8DrR4Tk00DXwj4CX1ek/EIVZrjx2/wdRABXg/xCFt+gfEK3uBx+90bIgRJQ58LhuHHwmUYB3Zv3xdpGZtiGR9jSz2H4M9lUpdB3bOCP1T6OpigPpbOKIBSc9W6/bvbgttWMLMBq+8LL9xeWpWe+3RJujMvm5NTWJexfpNdYTI2Rk46A8/ALYs0o7pAjDnHZoCr3gO2+JkJI/LxV8qwQXegjpXI9qNqI0NAAfIQO/LU7Ci3lc8nI9bj8s6o2FO59ZFsrrHp90WOGFfrmYfIlVWntp2D6F1PqD7aphh+4ULmuZhxe0uLNDAltngxBahressECdr7akPiZaseR7BzXuQhbhmgbJMpSwq4dIogQM9SoT67TJLcRTIB8XZEnymUMS9fBJH6SDJbbVRzKjtRJ3kL2zyQRe4BWKu28VNXBDbRSuEnu3wc8XY/6YNLLRJQ0fVmTRsr2YgSTaInVb3S7rfVlU6ew2cUN76v257lmPqg6qYTvay6iKA363C69svP4KeFyqguhOw39v9qMiE8DQk5hRC+9gWTtaD44g2lvjJoqiTi76Vd/Bf/M/k0THUbV+1Izj/W8vDTyabDvJ79gx2Y4I5BUyuFR0uAdaZIPriG5DLeq4FZ3IszJW40TLuPYr0R6+2afzsdq/EjUCWq6Ba8r/MKRbum3g4lk+0GA9KzT/CpuonOO5fwJOtF7hi+D7jUjFxsXPwNCw6Z6JTiFJtHZ1D6ayaB8oHh7/w50nDCpeCkUxpNr0ZxM8B6NXqZzHi9akj86pShBe6dST9aZNRetmomgXkQ2WsRRFDT6y7/E8vz4zmklnRuwIt5N0ZrZjw1Osk8ZQ0TGI7OkW1pOHhTo0iegCkkQd3AdSeu/qgmgDePCKceAuDuhCkBSODE9c3SPgRStJJ6eKCeCWw25mQ8at2wERHSSK+ixKcZQE0fH1glw/kBzqOQmF1dAn8cHhRS1IbNAqVlJyMng7IqKTRNETGXWBpiCaAZ7ggY+LcigRNlWrn/IZk8J6Vp67AU6nbtEhooVr0XjOl+GKMi/aB57K/aKqgW4S8IfcXRBEDyDTig0m6Caf34tu8K9c8fkUUSijW+gel/uhkSi6BJlVPCcLt0WP34vukkX154ha4XzJJHBoA8n9MHsmyrzlCBLE66abVGMA34uOE4/sTOMJomTfz8Mt2AjlXF60roLEMg6uKxZ8ZH4QLSXu5jX0uKhvDzGbmXTYWIJkaO4nRHIlqXozbIZSvVwMwwvvN0TXZHoLnB4VFbaJorh7D53vT4TxH2jFi27kgacLeRFeZX5DVNUTEoav8uOiQyZqSR+R2mL1nisco++iddoxOVE0ER+p0ICksa5knO8QhdL1rDcb6GFRB3GY0kekW5Pr9INhTAHoG6nRhAru1xIvasyA0cbBtsEte4N/frODbOdnUVeXs/TqAj1HlL0bbSp0OHsseR7jxUmWcrlCRfHPPfoeNiSvaSxrLB/pM7I4IP0oSpKNXp520AY9TZR9Z3cU5E11rmUijzwdbXxqZNp4yFQqiu9kanPVa07wPa75frxPl1YeuBU/mn3jO0QhE72tjrNns5oPRgjdJzo7nYKjC8H6W1Go1BEPa5aLJ+SUSxt8Iioj5hCZ67vl1j2i6gLx3Ct6zgxaqKjqme9FIW9fH47RmdRRuaS9TkR3OhIxJsIeLGeWVgt+EiWPkchYP4tCoehY21rnJ1Fwl4bQKo2bgviaTF6diJacHuKxa1KYt8XjTk/Iq3zh4eGzV6zkRjpG7ZL3OkuM+OSktBWJ7rqjUiRqcmltHSS+Puq0zUWV1GPxE7KZQ6hARQHW7Mx7M1NBQp3RBg8/2uILsD4X47shZpTZkRJP922gAqzq8cHaFCGlffVuOIZYtKBrGfEL9MkpmlqbZBYfg+KZ7+xam//bqgKcKEBVKy0Xp1LRgUScYum0yBxrJghovvz75yaIVFfZ6TSoVePnruOL1TQPEvmoaPtsap42X8cF6ErfzuE3YaL/NF4T4wGkXJTwFn2LvrToXMti9u10i05YXN16KRbdI45FikVHiMd98NvMRXgZOtJXzO9npaOFCS+DKNqCB1BdeCFk0dTyFk0bb9G00RVEz5BahFMoC9JL1Waeysv985ZHMKfjHmY0SO3/M5FafgHO1+CVHaoYWgAAAABJRU5ErkJggg==\"); }\n  eds-primary-header[motif='dark'] .eds-primary-header-logo-container .eds-application-name {\n    color: #ffffff;\n    border-color: #6488b9; }\n  eds-primary-header[motif='dark'] .eds-primary-header-nav a {\n    color: #d5e2f6; }\n    eds-primary-header[motif='dark'] .eds-primary-header-nav a:hover {\n      background-color: #185998; }\n    eds-primary-header[motif='dark'] .eds-primary-header-nav a[selected] {\n      background-color: #185998;\n      color: #ffffff; }\n  eds-primary-header[motif='dark'] .eds-primary-header-icons > [slot='icons'] {\n    color: #ffffff; }\n    eds-primary-header[motif='dark'] .eds-primary-header-icons > [slot='icons'] > span:hover {\n      background-color: #185998; }\n\neds-primary-header {\n  display: block;\n  position: relative;\n  height: 66px; }\n  eds-primary-header .eds-primary-header-content {\n    margin: 0 auto;\n    height: 100%;\n    display: flex;\n    justify-content: space-between; }\n  eds-primary-header .eds-primary-header-logo-container {\n    display: inline-flex;\n    align-items: center; }\n    eds-primary-header .eds-primary-header-logo-container .eds-logo {\n      display: inline-block;\n      width: 116px;\n      height: 38.31px;\n      background-repeat: no-repeat;\n      background-size: 120px 38.31px;\n      margin: 0 18px 0 16px; }\n      eds-primary-header .eds-primary-header-logo-container .eds-logo a {\n        width: 100%;\n        height: 100%;\n        display: block; }\n    eds-primary-header .eds-primary-header-logo-container .eds-application-name {\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n      font-size: 16px;\n      font-weight: 400;\n      color: #333333;\n      display: inline-block;\n      padding: 4px 0 3px 20px;\n      border-left: 1px solid transparent; }\n  eds-primary-header .eds-primary-header-nav {\n    display: inline-flex;\n    align-items: center; }\n    eds-primary-header .eds-primary-header-nav > a {\n      display: inline-flex;\n      height: 100%;\n      padding: 0 20px;\n      position: relative;\n      align-items: center;\n      font-weight: 500;\n      cursor: pointer;\n      text-decoration: none; }\n  eds-primary-header .eds-primary-header-icons {\n    display: inline-flex;\n    align-items: center; }\n    eds-primary-header .eds-primary-header-icons > [slot='icons'] {\n      display: inline-flex;\n      height: 100%;\n      align-items: center; }\n      eds-primary-header .eds-primary-header-icons > [slot='icons'] > span {\n        margin: auto 0;\n        padding: 0 15px;\n        height: 100%;\n        display: inline-flex;\n        align-items: center; }\n        eds-primary-header .eds-primary-header-icons > [slot='icons'] > span:hover {\n          cursor: pointer; }\n        eds-primary-header .eds-primary-header-icons > [slot='icons'] > span > eds-icon {\n          margin: 0; }\n"

/***/ })
/******/ ]);