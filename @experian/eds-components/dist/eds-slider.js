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

const tag = 'eds-slider';
const html = '';
const css = __webpack_require__(1);
const MagSlider = __webpack_require__(2).default;

class EDSSliderElement extends EDSElement {
  static get observedAttributes() {
    return EDSSliderElement.normalizeObservedAttributes([
      'min', 'max', 'value',
      { showsteps: 'showSteps' },
      { stepsize: 'stepSize' }
    ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  connectedCallback() {
    this.component = new MagSlider({ target: this.shadowRoot });
    this.component.on('valueChange', this.onChange.bind(this));
    this.classList.add('mag-slider');

    // Prevent change event from popover input
    const input1 = this.component.refs.lowValueInput;
    const input2 = this.component.refs.highValueInput;
    if (input1) input1.addEventListener('change', e => { e.stopPropagation(); });
    if (input2) input2.addEventListener('change', e => { e.stopPropagation(); });

    super.connectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Hack to allow a cycle for the template to be connected
    setTimeout(() => {
      let attr = {};
      name = EDSSliderElement.attributePropertyMap[name] || name;
      if (name === 'showSteps' && !newValue) newValue = true;
      attr[name] = newValue;
      this.component.set(attr);
    });
  }

  get min() {
    return this.component.get('min');
  }

  set min(value) {
    this.component.set({ min: value });
  }

  get max() {
    return this.component.get('max');
  }

  set max(value) {
    this.component.set({ max: value });
  }

  get showSteps() {
    return this.component.get('showSteps');
  }

  set showSteps(value) {
    this.component.set({ showSteps: value });
  }

  get stepSize() {
    return this.component.get('stepSize');
  }

  set stepSize(value) {
    this.component.set({ stepSize: value });
  }

  get value() {
    return this.component.get('value');
  }

  set value(value) {
    this.component.set({ value });
  }

  onChange(value) {
    if (value !== undefined) this.dispatchEvent(new CustomEvent('change', { detail: value }));
  }
}

customElements.define(tag, EDSSliderElement);
window.EDSSliderElement = EDSSliderElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* eslint-disable */

module.exports =
/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
      /******/
      /******/ 		// Check if module is in cache
      /******/ 		if (installedModules[moduleId]) {
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
    /******/ 	// identity function for calling harmony imports with the correct context
    /******/ 	__webpack_require__.i = function(value) { return value; };
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
      /******/ 		if (!__webpack_require__.o(exports, name)) {
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
      /******/ 		var getter = module && module.__esModule
        /******/ 			? function getDefault() { return module['default']; }
        /******/ 			: function getModuleExports() { return module; };
      /******/ 		__webpack_require__.d(getter, 'a', getter);
      /******/ 		return getter;
      /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = '';
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 5);
    /******/ })
  /************************************************************************/
  /******/ ([
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      exports.rangeValueToWidthValue = rangeValueToWidthValue;
      exports.rangeValueToPercentage = rangeValueToPercentage;
      exports.stepSizeToSteps = stepSizeToSteps;
      exports.widthDeltaToRangeDelta = widthDeltaToRangeDelta;
      function rangeValueToWidthValue(value, range, width) {
        var numerator = value - range[0];
        var denominator = range[1] - range[0];
        return numerator / denominator * width;
      }

      function rangeValueToPercentage(value, range) {
        return rangeValueToWidthValue(value, range, 100);
      }

      function stepSizeToSteps(stepSize, width, range) {
        var factor = width / (range[1] - range[0]);
        var remainingSteps = (range[1] - range[0]) / stepSize;
        var stepData = [];
        while (remainingSteps >= 0) {
          stepData.push({
            step: remainingSteps,
            left: remainingSteps * stepSize * factor,
            value: range[0] + remainingSteps * stepSize
          });
          remainingSteps--;
        }
        return stepData.reverse();
      }

      function widthDeltaToRangeDelta(value, width, range) {
        var factor = width / (range[1] - range[0]);
        return value / factor;
      }
      /***/ },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (true) { module.exports = factory(); } else if (typeof define === 'function' && define.amd) { define([], factory); } else if (typeof exports === 'object') { exports['magnet-core'] = factory(); } else { root['magnet-core'] = factory(); }
      })(this, function() {
        return /******/ (function(modules) { // webpackBootstrap
          /******/ 	// The module cache
          /******/ 	var installedModules = {};
          /******/
          /******/ 	// The require function
          /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if (installedModules[moduleId]) {
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
          /******/ 	// identity function for calling harmony imports with the correct context
          /******/ 	__webpack_require__.i = function(value) { return value; };
          /******/
          /******/ 	// define getter function for harmony exports
          /******/ 	__webpack_require__.d = function(exports, name, getter) {
            /******/ 		if (!__webpack_require__.o(exports, name)) {
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
            /******/ 		var getter = module && module.__esModule
              /******/ 			? function getDefault() { return module['default']; }
              /******/ 			: function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/ 	};
          /******/
          /******/ 	// Object.prototype.hasOwnProperty.call
          /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
          /******/
          /******/ 	// __webpack_public_path__
          /******/ 	__webpack_require__.p = '';
          /******/
          /******/ 	// Load entry module and return exports
          /******/ 	return __webpack_require__(__webpack_require__.s = 2);
          /******/ })
        /************************************************************************/
        /******/ ([
          /* 0 */
          /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = addStyle;

            var _insertStyle = __webpack_require__(3);

            var _insertStyle2 = _interopRequireDefault(_insertStyle);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
            if (window.Element && !Element.prototype.closest) {
              Element.prototype.closest = function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                  i,
                  el = this;
                do {
                  i = matches.length;
                  while (--i >= 0 && matches[i] !== el) {};
                } while (i < 0 && (el = el.parentElement));
                return el;
              };
            }

            function addStyle(id, stylesheet, element) {
              var container = void 0;

              if (element && element.closest('html')) container = element.closest('html').querySelector('head'); else container = document.head;

              (0, _insertStyle2.default)(container, id, stylesheet);
            }
            /***/ },
          /* 1 */
          /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = addMagnetStyle;

            var _addStyle = __webpack_require__(0);

            var _addStyle2 = _interopRequireDefault(_addStyle);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var style = __webpack_require__(4);

            function addMagnetStyle(element) {
              (0, _addStyle2.default)('magnet', style, element);
            }
            /***/ },
          /* 2 */
          /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.addMagnetStyle = exports.addStyle = undefined;

            var _addStyle = __webpack_require__(0);

            var _addStyle2 = _interopRequireDefault(_addStyle);

            var _addMagnetStyle = __webpack_require__(1);

            var _addMagnetStyle2 = _interopRequireDefault(_addMagnetStyle);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            exports.addStyle = _addStyle2.default;
            exports.addMagnetStyle = _addMagnetStyle2.default;
            /***/ },
          /* 3 */
          /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = insertStyle;
            function insertStyle(container, id, stylesheet) {
              if (!container.querySelector('style[data-id="' + id + '"]')) {
                var style = document.createElement('style');
                style.setAttribute('data-id', id);
                style.appendChild(document.createTextNode(stylesheet));
                container.appendChild(style);
              }
            }
            /***/ },
          /* 4 */
          /***/ function(module, exports) {
            // Removed the core magnet styles - don't want to pollute eds with these base styles.
            module.exports = '';
            /***/ }
          /******/ ]);
      });
      /***/ },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      exports.default = captureDrag;
      function captureDrag(element, callback) {
        element.addEventListener('mousedown', function (_ref) {
          var clientX = _ref.clientX;

          function move(e) {
            // Prevent text selection
            e.stopPropagation();
            e.preventDefault();

            if (clientX != null) {
              callback(e.clientX - clientX);
            }
            clientX = e.clientX;
          }
          document.addEventListener('mousemove', move);

          document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
            element.dispatchEvent(new Event('dragend'));
          }, { once: true });
        });
      }
      /***/ },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      exports._getConstrainedValue = _getConstrainedValue;
      exports._getConstrainedRange = _getConstrainedRange;
      exports._getValueMarkerLeft = _getValueMarkerLeft;
      exports._getMergedValueMarkerLeft = _getMergedValueMarkerLeft;

      var _convert = __webpack_require__(0);

      // VALUES
      function _getConstrainedValue(newValue, isLow) {
        var vars = {
          range: this.get('_range'),
          width: this.refs.track.offsetWidth,
          value: this.get('_value'),
          valueIsArray: this.get('_valueIsArray'),
          stepData: this._getStepData(),
          stepSize: this.get('stepSize')
        };

        if (vars.valueIsArray) {
          if (isLow && newValue > vars.value[1]) newValue = vars.value[1]; else if (!isLow && newValue < vars.value[0]) newValue = vars.value[0];
        }

        if (newValue < vars.range[0]) newValue = vars.range[0];
        if (newValue > vars.range[1]) newValue = vars.range[1];

        if (vars.stepSize) return _getClosestStep(newValue, vars); else return newValue;
      }

      function _getConstrainedRange(newValue) {
        var vars = {
          range: this.get('_range'),
          width: this.refs.track.offsetWidth,
          value: this.get('_value'),
          valueIsArray: this.get('_valueIsArray'),
          stepData: this._getStepData(),
          stepSize: this.get('stepSize')
        };

        if (newValue[0] < vars.range[0]) {
          newValue[1] += vars.range[0] - newValue[0];
          newValue[0] = vars.range[0];
        }
        if (newValue[1] > vars.range[1]) {
          newValue[0] -= newValue[1] - vars.range[1];
          newValue[1] = vars.range[1];
        }

        if (vars.stepSize) return _getRangeClosestStep(newValue, vars); else return [this._getConstrainedValue(newValue[0], true), this._getConstrainedValue(newValue[1])];
      }

      function _getRangeClosestStep(newValue, vars) {
        var valueDelta = vars.value[1] - vars.value[0];
        var stepValue = [];
        stepValue[0] = _getClosestStep(newValue[0], vars);

        // Downgrade to constrain upper bounds
        if (stepValue[0] + valueDelta > vars.range[1]) stepValue[0] -= vars.stepSize;

        stepValue[1] = stepValue[0] + valueDelta;
        return stepValue;
      }

      function _getClosestStep(value, vars) {
        var x = (0, _convert.rangeValueToWidthValue)(value, vars.range, vars.width);
        var stepValue = void 0;

        vars.stepData.forEach(function (step, idx) {
          var lowerValue = idx ? vars.stepData[idx - 1].value : vars.range[0];
          var lowerX = idx ? vars.stepData[idx - 1].left : 0;

          if (x >= lowerX && x <= step.left) {
            stepValue = x - lowerX > step.left - x ? step.value : lowerValue;
          }
        });

        return stepValue;
      }

      // MAKRERS
      function _getValueMarkerLeft(handle, valueMarker) {
        var markers = this.refs.markers;
        var left = handle.offsetLeft + handle.offsetWidth / 2 - valueMarker.offsetWidth / 2;
        return Math.round(_constrainMarkerToSlider(left, valueMarker, markers));
      }

      function _getMergedValueMarkerLeft(lowHandle, highHandle) {
        var markers = this.refs.markers;
        var valueMarker = this.refs.mergedValueMarker;
        var range = highHandle.offsetLeft + highHandle.offsetWidth - lowHandle.offsetLeft;
        var left = lowHandle.offsetLeft - (valueMarker.offsetWidth - range) / 2;
        return Math.round(_constrainMarkerToSlider(left, valueMarker, markers));
      }

      function _constrainMarkerToSlider(left, valueMarker, markers) {
        // const markers = this.refs.markers;
        var right = left + valueMarker.offsetWidth;
        if (left < 0) left = 0;
        if (right > markers.offsetWidth) left = markers.offsetWidth - valueMarker.offsetWidth;
        return left;
      }
      /***/ },
    /* 4 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      Object.defineProperty(__webpack_exports__, '__esModule', { value: true });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'differs', function() { return differs; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'dispatchObservers', function() { return dispatchObservers; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'get', function() { return get; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'fire', function() { return fire; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'observe', function() { return observe; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'observeDev', function() { return observeDev; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'on', function() { return on; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'onDev', function() { return onDev; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'set', function() { return set; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, '_flush', function() { return _flush; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'proto', function() { return proto; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'protoDev', function() { return protoDev; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'appendNode', function() { return appendNode; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'insertNode', function() { return insertNode; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'detachNode', function() { return detachNode; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'detachBetween', function() { return detachBetween; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'destroyEach', function() { return destroyEach; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'createElement', function() { return createElement; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'createSvgElement', function() { return createSvgElement; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'createText', function() { return createText; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'createComment', function() { return createComment; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'addListener', function() { return addListener; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'removeListener', function() { return removeListener; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'setAttribute', function() { return setAttribute; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'setXlinkAttribute', function() { return setXlinkAttribute; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'getBindingGroupValue', function() { return getBindingGroupValue; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'toNumber', function() { return toNumber; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'linear', function() { return linear; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'generateKeyframes', function() { return generateKeyframes; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'wrapTransition', function() { return wrapTransition; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'transitionManager', function() { return transitionManager; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'noop', function() { return noop; });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'assign', function() { return assign; });
      function noop() {}

      function assign(target) {
        var k,
          source,
          i = 1,
          len = arguments.length;
        for (; i < len; i++) {
          source = arguments[i];
          for (k in source) target[k] = source[k];
        }

        return target;
      }

      function appendNode(node, target) {
        target.appendChild(node);
      }

      function insertNode(node, target, anchor) {
        target.insertBefore(node, anchor);
      }

      function detachNode(node) {
        node.parentNode.removeChild(node);
      }

      function detachBetween(before, after) {
        while (before.nextSibling && before.nextSibling !== after) {
          before.parentNode.removeChild(before.nextSibling);
        }
      }

      // TODO this is out of date
      function destroyEach(iterations, detach, start) {
        for (var i = start; i < iterations.length; i += 1) {
          if (iterations[i]) iterations[i].destroy(detach);
        }
      }

      function createElement(name) {
        return document.createElement(name);
      }

      function createSvgElement(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
      }

      function createText(data) {
        return document.createTextNode(data);
      }

      function createComment() {
        return document.createComment('');
      }

      function addListener(node, event, handler) {
        node.addEventListener(event, handler, false);
      }

      function removeListener(node, event, handler) {
        node.removeEventListener(event, handler, false);
      }

      function setAttribute(node, attribute, value) {
        node.setAttribute(attribute, value);
      }

      function setXlinkAttribute(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
      }

      function getBindingGroupValue(group) {
        var value = [];
        for (var i = 0; i < group.length; i += 1) {
          if (group[i].checked) value.push(group[i].__value);
        }
        return value;
      }

      function toNumber(value) {
        return value === '' ? undefined : +value;
      }

      function linear(t) {
        return t;
      }

      function generateKeyframes(
        a,
        b,
        delta,
        duration,
        ease,
        fn,
        node,
        style
      ) {
        var id = '__svelte' + ~~(Math.random() * 1e9); // TODO make this more robust
        var keyframes = '@keyframes ' + id + '{\n';

        for (var p = 0; p <= 1; p += 16.666 / duration) {
          var t = a + delta * ease(p);
          keyframes += p * 100 + '%{' + fn(t) + '}\n';
        }

        keyframes += '100% {' + fn(b) + '}\n}';
        style.textContent += keyframes;

        document.head.appendChild(style);

        node.style.animation = (node.style.animation || '')
          .split(',')
          .filter(function(anim) {
            // when introing, discard old animations if there are any
            return anim && (delta < 0 || !/__svelte/.test(anim));
          })
          .concat(id + ' ' + duration + 'ms linear 1 forwards')
          .join(', ');
      }

      function wrapTransition(node, fn, params, intro, outgroup) {
        var obj = fn(node, params);
        var duration = obj.duration || 300;
        var ease = obj.easing || linear;
        var cssText;

        // TODO share <style> tag between all transitions?
        if (obj.css) {
          var style = document.createElement('style');
        }

        if (intro) {
          if (obj.css && obj.delay) {
            cssText = node.style.cssText;
            node.style.cssText += obj.css(0);
          }

          if (obj.tick) obj.tick(0);
        }

        return {
          t: intro ? 0 : 1,
          running: false,
          program: null,
          pending: null,
          run: function(intro, callback) {
            var program = {
              start: window.performance.now() + (obj.delay || 0),
              intro: intro,
              callback: callback
            };

            if (obj.delay) {
              this.pending = program;
            } else {
              this.start(program);
            }

            if (!this.running) {
              this.running = true;
              transitionManager.add(this);
            }
          },
          start: function(program) {
            program.a = this.t;
            program.b = program.intro ? 1 : 0;
            program.delta = program.b - program.a;
            program.duration = duration * Math.abs(program.b - program.a);
            program.end = program.start + program.duration;

            if (obj.css) {
              if (obj.delay) node.style.cssText = cssText;
              generateKeyframes(
                program.a,
                program.b,
                program.delta,
                program.duration,
                ease,
                obj.css,
                node,
                style
              );
            }

            this.program = program;
            this.pending = null;
          },
          update: function(now) {
            var program = this.program;
            if (!program) return;

            var p = now - program.start;
            this.t = program.a + program.delta * ease(p / program.duration);
            if (obj.tick) obj.tick(this.t);
          },
          done: function() {
            this.t = this.program.b;
            if (obj.tick) obj.tick(this.t);
            if (obj.css) document.head.removeChild(style);
            this.program.callback();
            this.program = null;
            this.running = !!this.pending;
          },
          abort: function() {
            if (obj.tick) obj.tick(1);
            if (obj.css) document.head.removeChild(style);
            this.program = this.pending = null;
            this.running = false;
          }
        };
      }

      var transitionManager = {
        running: false,
        transitions: [],
        bound: null,

        add: function(transition) {
          this.transitions.push(transition);

          if (!this.running) {
            this.running = true;
            this.next();
          }
        },

        next: function() {
          this.running = false;

          var now = window.performance.now();
          var i = this.transitions.length;

          while (i--) {
            var transition = this.transitions[i];

            if (transition.program && now >= transition.program.end) {
              transition.done();
            }

            if (transition.pending && now >= transition.pending.start) {
              transition.start(transition.pending);
            }

            if (transition.running) {
              transition.update(now);
              this.running = true;
            } else if (!transition.pending) {
              this.transitions.splice(i, 1);
            }
          }

          if (this.running) {
            requestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));
          }
        }
      };

      function differs(a, b) {
        return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
      }

      function dispatchObservers(component, group, newState, oldState) {
        for (var key in group) {
          if (!(key in newState)) continue;

          var newValue = newState[key];
          var oldValue = oldState[key];

          if (differs(newValue, oldValue)) {
            var callbacks = group[key];
            if (!callbacks) continue;

            for (var i = 0; i < callbacks.length; i += 1) {
              var callback = callbacks[i];
              if (callback.__calling) continue;

              callback.__calling = true;
              callback.call(component, newValue, oldValue);
              callback.__calling = false;
            }
          }
        }
      }

      function get(key) {
        return key ? this._state[key] : this._state;
      }

      function fire(eventName, data) {
        var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
        if (!handlers) return;

        for (var i = 0; i < handlers.length; i += 1) {
          handlers[i].call(this, data);
        }
      }

      function observe(key, callback, options) {
        var group = options && options.defer
          ? this._observers.post
          : this._observers.pre;

        (group[key] || (group[key] = [])).push(callback);

        if (!options || options.init !== false) {
          callback.__calling = true;
          callback.call(this, this._state[key]);
          callback.__calling = false;
        }

        return {
          cancel: function() {
            var index = group[key].indexOf(callback);
            if (~index) group[key].splice(index, 1);
          }
        };
      }

      function observeDev(key, callback, options) {
        var c = (key = '' + key).search(/[^\w]/);
        if (c > -1) {
          var message =
			'The first argument to component.observe(...) must be the name of a top-level property';
          if (c > 0) { message += ", i.e. '" + key.slice(0, c) + "' rather than '" + key + "'"; }

          throw new Error(message);
        }

        return observe.call(this, key, callback, options);
      }

      function on(eventName, handler) {
        if (eventName === 'teardown') return this.on('destroy', handler);

        var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
        handlers.push(handler);

        return {
          cancel: function() {
            var index = handlers.indexOf(handler);
            if (~index) handlers.splice(index, 1);
          }
        };
      }

      function onDev(eventName, handler) {
        if (eventName === 'teardown') {
          console.warn(
            "Use component.on('destroy', ...) instead of component.on('teardown', ...) which has been deprecated and will be unsupported in Svelte 2"
          );
          return this.on('destroy', handler);
        }

        return on.call(this, eventName, handler);
      }

      function set(newState) {
        this._set(assign({}, newState));
        this._root._flush();
      }

      function _flush() {
        if (!this._renderHooks) return;

        while (this._renderHooks.length) {
          this._renderHooks.pop()();
        }
      }

      var proto = {
        get: get,
        fire: fire,
        observe: observe,
        on: on,
        set: set,
        _flush: _flush
      };

      var protoDev = {
        get: get,
        fire: fire,
        observe: observeDev,
        on: onDev,
        set: set,
        _flush: _flush
      };
      /***/ },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

      var _magnetCore = __webpack_require__(1);

      var _convert = __webpack_require__(0);

      var _constrainMixin = __webpack_require__(3);

      var _captureDrag = __webpack_require__(2);

      var _captureDrag2 = _interopRequireDefault(_captureDrag);

      var _shared = __webpack_require__(4);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function recompute(state, newState, oldState, isInitial) {
        if (isInitial || 'disabled' in newState && (0, _shared.differs)(state.disabled, oldState.disabled) || 'formDisabled' in newState && (0, _shared.differs)(state.formDisabled, oldState.formDisabled)) {
          state._disabled = newState._disabled = template.computed._disabled(state.disabled, state.formDisabled);
        }

        if (isInitial || 'min' in newState && (0, _shared.differs)(state.min, oldState.min)) {
          state._min = newState._min = template.computed._min(state.min);
        }

        if (isInitial || 'max' in newState && (0, _shared.differs)(state.max, oldState.max)) {
          state._max = newState._max = template.computed._max(state.max);
        }

        if (isInitial || '_min' in newState && (0, _shared.differs)(state._min, oldState._min) || '_max' in newState && (0, _shared.differs)(state._max, oldState._max)) {
          state._range = newState._range = template.computed._range(state._min, state._max);
        }

        if (isInitial || '_range' in newState && (0, _shared.differs)(state._range, oldState._range)) {
          state._rangeDelta = newState._rangeDelta = template.computed._rangeDelta(state._range);
        }

        if (isInitial || 'stepSize' in newState && (0, _shared.differs)(state.stepSize, oldState.stepSize)) {
          state._stepSize = newState._stepSize = template.computed._stepSize(state.stepSize);
        }

        if (isInitial || 'value' in newState && (0, _shared.differs)(state.value, oldState.value)) {
          state._valueIsArray = newState._valueIsArray = template.computed._valueIsArray(state.value);
        }

        if (isInitial || 'valueFormatter' in newState && (0, _shared.differs)(state.valueFormatter, oldState.valueFormatter)) {
          state._valueFormatterIsArray = newState._valueFormatterIsArray = template.computed._valueFormatterIsArray(state.valueFormatter);
        }

        if (isInitial || 'value' in newState && (0, _shared.differs)(state.value, oldState.value) || '_min' in newState && (0, _shared.differs)(state._min, oldState._min) || '_valueIsArray' in newState && (0, _shared.differs)(state._valueIsArray, oldState._valueIsArray)) {
          state._value = newState._value = template.computed._value(state.value, state._min, state._valueIsArray);
        }

        if (isInitial || '_range' in newState && (0, _shared.differs)(state._range, oldState._range) || '_value' in newState && (0, _shared.differs)(state._value, oldState._value)) {
          state._fillValue = newState._fillValue = template.computed._fillValue(state._range, state._value);
        }

        if (isInitial || '_disabled' in newState && (0, _shared.differs)(state._disabled, oldState._disabled)) {
          state._cssDisabled = newState._cssDisabled = template.computed._cssDisabled(state._disabled);
        }

        if (isInitial || 'showMarkers' in newState && (0, _shared.differs)(state.showMarkers, oldState.showMarkers)) {
          state._cssShowMarkers = newState._cssShowMarkers = template.computed._cssShowMarkers(state.showMarkers);
        }

        if (isInitial || '_mergeMarkers' in newState && (0, _shared.differs)(state._mergeMarkers, oldState._mergeMarkers)) {
          state._cssShowMergedValues = newState._cssShowMergedValues = template.computed._cssShowMergedValues(state._mergeMarkers);
        }

        if (isInitial || '_valueIsArray' in newState && (0, _shared.differs)(state._valueIsArray, oldState._valueIsArray)) {
          state._cssDraggableRange = newState._cssDraggableRange = template.computed._cssDraggableRange(state._valueIsArray);
        }

        if (isInitial || '_showPopover' in newState && (0, _shared.differs)(state._showPopover, oldState._showPopover)) {
          state._cssShowPopover = newState._cssShowPopover = template.computed._cssShowPopover(state._showPopover);
        }
      }

      var template = (function () {
        return {
          data: function data() {
            return {
              _mergeMarkers: false,
              class: '',
              max: 100,
              min: 0,
              showMarkers: true,
              style: '',
              value: 50,
              valueFormatter: function valueFormatter(value) {
                return Math.round(value);
              }
            };
          },

          computed: {
            _disabled: function _disabled(disabled, formDisabled) {
              return disabled || formDisabled;
            },
            _min: function _min(min) {
              return parseFloat(min);
            },
            _max: function _max(max) {
              return parseFloat(max);
            },
            _range: function _range(_min, _max) {
              return [_min, _max];
            },
            _rangeDelta: function _rangeDelta(_range) {
              return _range[1] - _range[0];
            },
            _stepSize: function _stepSize(stepSize) {
              return parseFloat(stepSize);
            },
            _valueIsArray: function _valueIsArray(value) {
              return Array.isArray(value);
            },
            _valueFormatterIsArray: function _valueFormatterIsArray(valueFormatter) {
              return Array.isArray(valueFormatter);
            },
            _value: function _value(value, _min, _valueIsArray) {
              if (_valueIsArray) {
                if (value.length != 2) throw 'Must provide exactly 2 values when using an array';
                value = value.map(function (val) {
                  return parseFloat(val);
                });
              } else value = [_min, parseFloat(value)];
              return value;
            },
            _fillValue: function _fillValue(_range, _value) {
              return [(0, _convert.rangeValueToPercentage)(_value[0], _range), 100 - (0, _convert.rangeValueToPercentage)(_value[1], _range)];
            },
            _cssDisabled: function _cssDisabled(_disabled) {
              return _disabled ? 'm-disabled' : '';
            },
            _cssShowMarkers: function _cssShowMarkers(showMarkers) {
              return showMarkers ? 'm-show' : '';
            },
            _cssShowMergedValues: function _cssShowMergedValues(_mergeMarkers) {
              return _mergeMarkers ? 'm-merged-values' : '';
            },
            _cssDraggableRange: function _cssDraggableRange(_valueIsArray) {
              return _valueIsArray ? 'm-draggable-range' : '';
            },
            _cssShowPopover: function _cssShowPopover(_showPopover) {
              return _showPopover ? 'm-show' : '';
            }
          },

          oncreate: function oncreate() {
            var _this = this;

            (0, _magnetCore.addMagnetStyle)(this.refs.rootEl);

            this._attachComponentToDOM();

            this._handleWindowResize = this._handleWindowResize.bind(this);
            window.addEventListener('resize', this._handleWindowResize);

            // Allow time for adapters
            setTimeout(function () {
              _this._captureHandleDrag();
              _this._captureMarkerDrag();
              if (_this.get('_valueIsArray')) {
                _this._captureHandleDrag(true);
                _this._captureMarkerDrag(true);
                _this._captureRangeDrag();
              }
            });

            this.observe('valueFormatter', function () {
              return _this._formatValue();
            });
            this.observe('_value', function (_value) {
              _this._formatValue(_value);
              _this._setPopoverValues(_value);

              // Reset _pendingValue when not dragging (value is changed directly)
              if (!_this.get('_dragging')) _this.set({ _pendingValue: _value.slice() }); // Copy, don't reference
            });

            this.observe('_visible', function (_visible) {
              if (_visible) _this._onBecomeVisible();
            });
            this._watchForVisibility();
          },
          ondestroy: function ondestroy() {
            window.removeEventListener('resize', this._handleWindowResize);
            this._stopWatchingForVisibility();
          },

          methods: {
            _attachComponentToDOM: function _attachComponentToDOM() {
              this.refs.rootEl.component = this;
            },
            _watchForVisibility: function _watchForVisibility() {
              var _this2 = this;

              this._visibilityPoll = window.setInterval(function () {
                if (_this2.refs.rootEl.offsetParent === null) _this2.set({ _visible: false }); else _this2.set({ _visible: true });
              }, 100);
            },
            _stopWatchingForVisibility: function _stopWatchingForVisibility() {
              clearInterval(this._visibilityPoll);
              this._visibilityPoll = null;
            },

            // Slider doesn't render correctly when hidden, refresh when becoming visible.
            _onBecomeVisible: function _onBecomeVisible() {
              this.set({ _handleWidth: this.refs.highHandle.offsetWidth });
              this._refresh();
            },
            _handleWindowResize: function _handleWindowResize() {
              if (this.get('_visible')) this._refresh();
            },
            _refresh: function _refresh() {
              this._refreshTicks();
              this._refreshValueMarkers();
            },
            _formatValue: function _formatValue(_value) {
              _value = _value || this.get('_value');
              var valueFormatter = this.get('valueFormatter');
              if (this.get('_valueIsArray')) {
                var formatters = !!this.get('_valueFormatterIsArray');
                var lowFormatter = formatters ? valueFormatter[0] : valueFormatter;
                var highFormatter = formatters ? valueFormatter[1] : valueFormatter;
                this.set({
                  _lowValueFormatted: lowFormatter(_value[0]),
                  _highValueFormatted: highFormatter(_value[1])
                });
              } else this.set({ _highValueFormatted: valueFormatter(_value[1]) });
              this._refreshValueMarkers();
            },

            // STEP GROUNDWORK
            _getStepData: function _getStepData() {
              var stepSize = this.get('_stepSize');
              var range = this.get('_range');
              var width = this.refs.track.offsetWidth;
              return (0, _convert.stepSizeToSteps)(stepSize, width, range);
            },
            _refreshTicks: function _refreshTicks() {
              var _this3 = this;

              if (!this.get('showSteps')) return;
              var stepData = this._getStepData();
              this._removeTicks();
              stepData.forEach(function (step) {
                return _this3._addTick(step);
              });
            },
            _removeTicks: function _removeTicks() {
              Array.from(this.refs.slider.querySelectorAll('.m-tick')).forEach(function (el) {
                return el.remove();
              });
            },
            _addTick: function _addTick(step) {
              this.refs.slider.insertAdjacentHTML('beforeend', '<div class="m-tick" style="left: ' + step.left + 'px"></div>');
            },

            // DRAG BEHAVIOR
            _captureHandleDrag: function _captureHandleDrag(isLow) {
              var handle = isLow ? this.refs.lowHandleOuter : this.refs.highHandleOuter;
              this._captureSingleItemDrag(handle, isLow);
            },
            _captureMarkerDrag: function _captureMarkerDrag(isLow) {
              var marker = isLow ? this.refs.lowValueMarker : this.refs.highValueMarker;
              this._captureSingleItemDrag(marker, isLow);
            },
            _captureSingleItemDrag: function _captureSingleItemDrag(el, isLow) {
              var _this4 = this;

              var which = isLow ? 0 : 1;
              el.addEventListener('dragend', function () {
                return _this4.set({ _dragging: false });
              });

              (0, _captureDrag2.default)(el, function (x) {
                if (_this4.get('_disabled')) return;

                _this4.set({ _dragging: true });
                var _pendingValue = _this4.get('_pendingValue') || _this4.get('_value');
                var range = _this4.get('_range');
                var deltaValue = (0, _convert.widthDeltaToRangeDelta)(x, _this4.refs.track.offsetWidth, range);
                var newValue = deltaValue + _pendingValue[which];
                _pendingValue[which] = newValue;
                _this4.set({ _pendingValue: _pendingValue.slice() }); // Copy, don't reference
                _this4._resolveAndSetValue(newValue, isLow);
              });
            },
            _captureRangeDrag: function _captureRangeDrag() {
              var _this5 = this;

              var el = this.refs.fill;
              el.addEventListener('dragend', function () {
                return _this5.set({ _dragging: false });
              });

              (0, _captureDrag2.default)(el, function (x) {
                if (_this5.get('_disabled')) return;

                _this5.set({ _dragging: true });
                var _pendingValue = _this5.get('_pendingValue') || _this5.get('_value');
                var range = _this5.get('_range');
                var deltaValue = (0, _convert.widthDeltaToRangeDelta)(x, _this5.refs.track.offsetWidth, range);
                var newValue = [deltaValue + _pendingValue[0], deltaValue + _pendingValue[1]];
                _this5.set({ _pendingValue: newValue });
                _this5._resolveAndSetRange(newValue);
              });
            },

            // GET/SET VALUES
            _getConstrainedValue: _constrainMixin._getConstrainedValue,
            _getConstrainedRange: _constrainMixin._getConstrainedRange,
            _resolveAndSetValue: function _resolveAndSetValue(newValue, isLow) {
              var which = isLow ? 0 : 1;
              var value = this.get('value');
              newValue = this._getConstrainedValue(newValue, isLow);

              if (this.get('_valueIsArray')) {
                if (value[which] == newValue) return;
                value[which] = newValue;
              } else {
                if (value == newValue) return;
                value = newValue;
              }

              this.set({ value: value });
              this.fire('valueChange', value);
            },
            _resolveAndSetRange: function _resolveAndSetRange(newValue) {
              var value = this.get('value');
              newValue = this._getConstrainedRange(newValue);

              if (value[0] == newValue[0] && value[1] == newValue[1]) return;

              this.set({ value: newValue });
              this.fire('valueChange', newValue);
            },

            // MARKERS
            _getValueMarkerLeft: _constrainMixin._getValueMarkerLeft,
            _getMergedValueMarkerLeft: _constrainMixin._getMergedValueMarkerLeft,
            _refreshValueMarkers: function _refreshValueMarkers() {
              var highHandle = this.refs.highHandleOuter;
              var highMarker = this.refs.highValueMarker;
              this.set({ _highValueMarkerLeft: this._getValueMarkerLeft(highHandle, highMarker) });

              if (!this.get('_valueIsArray')) return;

              var lowHandle = this.refs.lowHandleOuter;
              var lowMarker = this.refs.lowValueMarker;
              this.set({ _lowValueMarkerLeft: this._getValueMarkerLeft(lowHandle, lowMarker) });

              // Handle overlaps
              var lowerRight = lowMarker.offsetLeft + lowMarker.offsetWidth;
              if (lowerRight >= highMarker.offsetLeft) {
                this.set({
                  _mergeMarkers: true,
                  _mergedValueMarkerLeft: this._getMergedValueMarkerLeft(lowHandle, highHandle)
                });
              } else this.set({ _mergeMarkers: false });
            },

            // POPOVER
            showEditPopover: function showEditPopover() {
              if (this.get('_disabled')) return;

              var _refs = this.refs,
				    popover = _refs.popover,
				    lowValueInput = _refs.lowValueInput,
				    highValueInput = _refs.highValueInput,
				    track = _refs.track;

              var value = this.get('_value');
              this.set({ _showPopover: true });
              popover.style.left = (track.offsetWidth - popover.offsetWidth) / 2 + 'px';
              if (lowValueInput) lowValueInput.value = value[0];
              highValueInput.value = value[1];
              popover.querySelector('input').focus();
            },
            hideEditPopover: function hideEditPopover(cancel) {
              this.set({ _showPopover: false, _cancelPopoverEdit: cancel });
            },
            _handlePopoverKeydown: function _handlePopoverKeydown(event) {
              if (event.key == 'Escape') this.hideEditPopover(true); else if (event.key == 'Enter') this.hideEditPopover(); else this.set({ _cancelPopoverEdit: false });
            },
            _handlePopoverInputChange: function _handlePopoverInputChange(value, isLow) {
              if (!this.get('_cancelPopoverEdit')) this._resolveAndSetValue(value, isLow);
            },
            _setPopoverValues: function _setPopoverValues(value) {
              if (this.get('_valueIsArray')) this.refs.lowValueInput.value = value[0];
              this.refs.highValueInput.value = value[1];
            }
          }
        };
      }());

      function add_css() {
        var style = (0, _shared.createElement)('style');
        style.id = 'svelte-1502752747-style';
        style.textContent = '[svelte-1502752747].mag-slider, [svelte-1502752747] .mag-slider {\n  position: relative;\n  padding-bottom: 10px;\n  display: inline-block;\n  width: 100%;\n}\n[svelte-1502752747].mag-slider.m-disabled, [svelte-1502752747] .mag-slider.m-disabled {\n  opacity: 0.5;\n}\n[svelte-1502752747].mag-slider .m-show, [svelte-1502752747] .mag-slider .m-show {\n  display: block !important;\n}\n[svelte-1502752747].mag-slider .m-edit-popover, [svelte-1502752747] .mag-slider .m-edit-popover {\n  display: none;\n  position: absolute;\n  bottom: 60px;\n  width: auto;\n  z-index: 1000;\n  background-color: white;\n  border-radius: 2px;\n  border: 2px solid #305286;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);\n  background-clip: padding-box;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content {\n  padding: 12px;\n  padding-right: 18px;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content span, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content span {\n  display: inline-block;\n  width: 100px;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content span label, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content span label {\n  font-size: 0.8em;\n  color: #999999;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content span input[type="text"], [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content span input[type="text"] {\n  width: 80px;\n  outline: none;\n  padding: 8px 0;\n  line-height: 16px;\n  border: none;\n  border-bottom: 1px solid #c4c4c4;\n  font-size: 14px;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content span input[type="text"]:focus, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content span input[type="text"]:focus,\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content span input[type="text"]:active, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content span input[type="text"]:active {\n  padding-bottom: 7px;\n  border-bottom: 2px solid #305286;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content .m-close, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content .m-close {\n  position: absolute;\n  top: 10px;\n  right: 12px;\n  font-size: 21px;\n  color: #c4c4c4;\n  cursor: pointer;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-edit-popover-content .m-close:hover, [svelte-1502752747] .mag-slider .m-edit-popover .m-edit-popover-content .m-close:hover {\n  color: black;\n}\n[svelte-1502752747].mag-slider .m-edit-popover .m-pointer, [svelte-1502752747] .mag-slider .m-edit-popover .m-pointer {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  display: block;\n  content: "";\n  transform: rotate(135deg);\n  bottom: -7px;\n  left: calc(50% -  5px);\n  background-color: white;\n  border-top: 2px solid #406eb3;\n  border-right: 2px solid #406eb3;\n  background-clip: padding-box;\n}\n[svelte-1502752747].mag-slider .m-labels, [svelte-1502752747] .mag-slider .m-labels {\n  position: relative;\n  font-size: 0.8em;\n  color: #999999;\n  height: 36px;\n}\n[svelte-1502752747].mag-slider .m-labels .m-label, [svelte-1502752747] .mag-slider .m-labels .m-label,\n[svelte-1502752747].mag-slider .m-labels .m-default-label, [svelte-1502752747] .mag-slider .m-labels .m-default-label {\n  position: absolute;\n  top: 0;\n}\n[svelte-1502752747].mag-slider .m-labels .m-label, [svelte-1502752747] .mag-slider .m-labels .m-label {\n  left: 0;\n}\n[svelte-1502752747].mag-slider .m-labels .m-default-label, [svelte-1502752747] .mag-slider .m-labels .m-default-label {\n  right: 0;\n}\n[svelte-1502752747].mag-slider .m-markers, [svelte-1502752747] .mag-slider .m-markers {\n  position: relative;\n  min-height: 22px;\n}\n[svelte-1502752747].mag-slider .m-markers .m-range-min, [svelte-1502752747] .mag-slider .m-markers .m-range-min,\n[svelte-1502752747].mag-slider .m-markers .m-range-max, [svelte-1502752747] .mag-slider .m-markers .m-range-max,\n[svelte-1502752747].mag-slider .m-markers .m-current-value, [svelte-1502752747] .mag-slider .m-markers .m-current-value {\n  position: absolute;\n  bottom: 0;\n  padding: 6px;\n  line-height: 0.8em;\n  font-size: 0.8em;\n  border-radius: 2px;\n  background-color: #eeeeee;\n}\n[svelte-1502752747].mag-slider .m-markers .m-current-value, [svelte-1502752747] .mag-slider .m-markers .m-current-value {\n  opacity: 1;\n  z-index: 1;\n  background-color: #406eb3;\n  color: white;\n  font-weight: 300;\n  white-space: nowrap;\n  cursor: pointer;\n}\n[svelte-1502752747].mag-slider .m-markers .m-merged-value, [svelte-1502752747] .mag-slider .m-markers .m-merged-value {\n  opacity: 0.0001;\n  cursor: default;\n}\n[svelte-1502752747].mag-slider .m-markers.m-merged-values .m-merged-value, [svelte-1502752747] .mag-slider .m-markers.m-merged-values .m-merged-value {\n  opacity: 1;\n}\n[svelte-1502752747].mag-slider .m-markers.m-merged-values .m-low-value, [svelte-1502752747] .mag-slider .m-markers.m-merged-values .m-low-value,\n[svelte-1502752747].mag-slider .m-markers.m-merged-values .m-high-value, [svelte-1502752747] .mag-slider .m-markers.m-merged-values .m-high-value {\n  opacity: 0.0001;\n}\n[svelte-1502752747].mag-slider .m-markers .m-range-min, [svelte-1502752747] .mag-slider .m-markers .m-range-min {\n  left: 0;\n  display: none;\n}\n[svelte-1502752747].mag-slider .m-markers .m-range-max, [svelte-1502752747] .mag-slider .m-markers .m-range-max {\n  right: 0;\n  display: none;\n}\n[svelte-1502752747].mag-slider:not(.m-disabled) .m-slider .m-fill.m-draggable-range, [svelte-1502752747] .mag-slider:not(.m-disabled) .m-slider .m-fill.m-draggable-range {\n  cursor: ew-resize;\n}\n[svelte-1502752747].mag-slider .m-slider, [svelte-1502752747] .mag-slider .m-slider {\n  position: relative;\n}\n[svelte-1502752747].mag-slider .m-slider .m-track, [svelte-1502752747] .mag-slider .m-slider .m-track {\n  position: relative;\n  z-index: 50;\n  margin-top: 10px;\n  height: 6px;\n  width: 100%;\n  background-color: #eeeeee;\n  border-radius: 2px;\n  overflow: hidden;\n}\n[svelte-1502752747].mag-slider .m-slider .m-fill, [svelte-1502752747] .mag-slider .m-slider .m-fill {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #406eb3;\n}\n[svelte-1502752747].mag-slider .m-slider .m-tick, [svelte-1502752747] .mag-slider .m-slider .m-tick {\n  position: absolute;\n  top: calc(50% - 8px);\n  width: 1px;\n  height: 16px;\n  background-color: #c4c4c4;\n  z-index: 0;\n}\n[svelte-1502752747].mag-slider .m-slider .m-handle-outer, [svelte-1502752747] .mag-slider .m-slider .m-handle-outer {\n  position: absolute;\n  z-index: 100;\n  top: calc(50% - 16px);\n  padding: 6px;\n}\n[svelte-1502752747].mag-slider .m-slider .m-handle-outer .m-handle, [svelte-1502752747] .mag-slider .m-slider .m-handle-outer .m-handle {\n  height: 20px;\n  width: 8px;\n  border-radius: 2px;\n  background-color: #406eb3;\n}\n';
        (0, _shared.appendNode)(style, document.head);
      }

      function create_main_fragment(state, component) {
        var div_class_value, div_style_value, div_1_class_value, div_5_class_value, div_6_style_value, div_7_style_value, div_8_class_value, text_11_value, div_9_class_value, text_13_value, div_12_class_value, div_12_style_value, div_13_style_value;

        var div = (0, _shared.createElement)('div');
        (0, _shared.setAttribute)(div, 'svelte-1502752747', '');
        div.className = div_class_value = 'mag-slider mag-form-element ' + state.class + ' ' + state._cssDisabled;
        div.style.cssText = div_style_value = state.style;
        component.refs.rootEl = div;

        var if_block = (state.label || state.rightSideLabel) && create_if_block(state, component);

        if (if_block) if_block.mount(div, null);
        var text = (0, _shared.createText)('\n\n  ');
        (0, _shared.appendNode)(text, div);
        var div_1 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_1, div);
        div_1.className = div_1_class_value = 'm-edit-popover ' + state._cssShowPopover;
        component.refs.popover = div_1;
        var div_2 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_2, div_1);
        div_2.className = 'm-edit-popover-content';

        var if_block_3 = state._valueIsArray && create_if_block_3(state, component);

        if (if_block_3) if_block_3.mount(div_2, null);
        var text_1 = (0, _shared.createText)('\n      ');
        (0, _shared.appendNode)(text_1, div_2);
        var span = (0, _shared.createElement)('span');
        (0, _shared.appendNode)(span, div_2);
        var label = (0, _shared.createElement)('label');
        (0, _shared.appendNode)(label, span);

        function get_block(state) {
          if (state._valueIsArray) return create_if_block_4;
          return create_if_block_5;
        }

        var current_block = get_block(state);
        var if_block_4 = current_block(state, component);

        if_block_4.mount(label, null);
        (0, _shared.appendNode)((0, _shared.createText)('\n        '), span);
        var input = (0, _shared.createElement)('input');
        (0, _shared.appendNode)(input, span);
        input.type = 'text';

        function keydown_handler(event) {
          component._handlePopoverKeydown(event);
        }

        (0, _shared.addListener)(input, 'keydown', keydown_handler);

        function change_handler(event) {
          component._handlePopoverInputChange(input.value);
        }

        (0, _shared.addListener)(input, 'change', change_handler);
        component.refs.highValueInput = input;
        (0, _shared.appendNode)((0, _shared.createText)('\n      '), div_2);
        var div_3 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_3, div_2);
        div_3.className = 'm-close';

        function click_handler(event) {
          component.hideEditPopover(true);
        }

        (0, _shared.addListener)(div_3, 'click', click_handler);
        (0, _shared.appendNode)((0, _shared.createText)('×'), div_3);
        (0, _shared.appendNode)((0, _shared.createText)('\n    '), div_1);
        var div_4 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_4, div_1);
        div_4.className = 'm-pointer';
        (0, _shared.appendNode)((0, _shared.createText)('\n\n  '), div);
        var div_5 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_5, div);
        div_5.className = div_5_class_value = 'm-markers ' + state._cssShowMergedValues;
        component.refs.markers = div_5;
        var div_6 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_6, div_5);
        div_6.className = 'm-current-value m-merged-value';
        div_6.style.cssText = div_6_style_value = 'left: ' + state._mergedValueMarkerLeft + 'px;';
        div_6.title = 'Double click to edit';

        function dblclick_handler(event) {
          component.showEditPopover();
        }

        (0, _shared.addListener)(div_6, 'dblclick', dblclick_handler);
        component.refs.mergedValueMarker = div_6;
        var raw_before = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_before, div_6);
        var raw_after = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_after, div_6);
        var raw_value = state._lowValueFormatted;
        raw_before.insertAdjacentHTML('afterend', raw_value);
        (0, _shared.appendNode)((0, _shared.createText)('  -  '), div_6);
        var raw_1_before = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_1_before, div_6);
        var raw_1_after = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_1_after, div_6);
        var raw_1_value = state._highValueFormatted;
        raw_1_before.insertAdjacentHTML('afterend', raw_1_value);
        (0, _shared.appendNode)((0, _shared.createText)('\n\n    '), div_5);

        var if_block_5 = state._valueIsArray && create_if_block_6(state, component);

        if (if_block_5) if_block_5.mount(div_5, null);
        var text_9 = (0, _shared.createText)('\n    ');
        (0, _shared.appendNode)(text_9, div_5);
        var div_7 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_7, div_5);
        div_7.className = 'm-current-value m-high-value';
        div_7.style.cssText = div_7_style_value = 'left: ' + state._highValueMarkerLeft + 'px;';
        div_7.title = 'Double click to edit';

        function dblclick_handler_1(event) {
          component.showEditPopover();
        }

        (0, _shared.addListener)(div_7, 'dblclick', dblclick_handler_1);
        component.refs.highValueMarker = div_7;
        var raw_2_before = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_2_before, div_7);
        var raw_2_after = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_2_after, div_7);
        var raw_2_value = state._highValueFormatted;
        raw_2_before.insertAdjacentHTML('afterend', raw_2_value);
        (0, _shared.appendNode)((0, _shared.createText)('\n\n    '), div_5);
        var div_8 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_8, div_5);
        div_8.className = div_8_class_value = 'm-range-min ' + state._cssShowMarkers;
        var text_11 = (0, _shared.createText)(text_11_value = state.min);
        (0, _shared.appendNode)(text_11, div_8);
        (0, _shared.appendNode)((0, _shared.createText)('\n    '), div_5);
        var div_9 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_9, div_5);
        div_9.className = div_9_class_value = 'm-range-max ' + state._cssShowMarkers;
        var text_13 = (0, _shared.createText)(text_13_value = state.max);
        (0, _shared.appendNode)(text_13, div_9);
        (0, _shared.appendNode)((0, _shared.createText)('\n  '), div);
        var div_10 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_10, div);
        div_10.className = 'm-slider';
        component.refs.slider = div_10;
        var div_11 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_11, div_10);
        div_11.className = 'm-track';
        component.refs.track = div_11;
        var div_12 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_12, div_11);
        div_12.className = div_12_class_value = 'm-fill ' + state._cssDraggableRange;
        div_12.style.cssText = div_12_style_value = 'left: ' + state._fillValue[0] + '%; right: ' + state._fillValue[1] + '%;';
        component.refs.fill = div_12;
        (0, _shared.appendNode)((0, _shared.createText)('\n\n    '), div_10);

        var if_block_6 = state._valueIsArray && create_if_block_7(state, component);

        if (if_block_6) if_block_6.mount(div_10, null);
        var text_16 = (0, _shared.createText)('\n\n    ');
        (0, _shared.appendNode)(text_16, div_10);
        var div_13 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_13, div_10);
        div_13.className = 'm-handle-outer';
        div_13.style.cssText = div_13_style_value = 'right: calc(' + state._fillValue[1] + '% - ' + (state._handleWidth / 2 + 6) + 'px);';
        component.refs.highHandleOuter = div_13;
        var div_14 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_14, div_13);
        div_14.className = 'm-handle';
        component.refs.highHandle = div_14;

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(div, target, anchor);
          },

          update: function update(changed, state) {
            if (div_class_value !== (div_class_value = 'mag-slider mag-form-element ' + state.class + ' ' + state._cssDisabled)) {
              div.className = div_class_value;
            }

            if (div_style_value !== (div_style_value = state.style)) {
              div.style.cssText = div_style_value;
            }

            if (state.label || state.rightSideLabel) {
              if (if_block) {
                if_block.update(changed, state);
              } else {
                if_block = create_if_block(state, component);
                if_block.mount(div, text);
              }
            } else if (if_block) {
              if_block.unmount();
              if_block.destroy();
              if_block = null;
            }

            if (div_1_class_value !== (div_1_class_value = 'm-edit-popover ' + state._cssShowPopover)) {
              div_1.className = div_1_class_value;
            }

            if (state._valueIsArray) {
              if (!if_block_3) {
                if_block_3 = create_if_block_3(state, component);
                if_block_3.mount(div_2, text_1);
              }
            } else if (if_block_3) {
              if_block_3.unmount();
              if_block_3.destroy();
              if_block_3 = null;
            }

            if (current_block !== (current_block = get_block(state))) {
              {
                if_block_4.unmount();
                if_block_4.destroy();
              }
              if_block_4 = current_block(state, component);
              if_block_4.mount(label, null);
            }

            if (div_5_class_value !== (div_5_class_value = 'm-markers ' + state._cssShowMergedValues)) {
              div_5.className = div_5_class_value;
            }

            if (div_6_style_value !== (div_6_style_value = 'left: ' + state._mergedValueMarkerLeft + 'px;')) {
              div_6.style.cssText = div_6_style_value;
            }

            if (raw_value !== (raw_value = state._lowValueFormatted)) {
              (0, _shared.detachBetween)(raw_before, raw_after);
              raw_before.insertAdjacentHTML('afterend', raw_value);
            }

            if (raw_1_value !== (raw_1_value = state._highValueFormatted)) {
              (0, _shared.detachBetween)(raw_1_before, raw_1_after);
              raw_1_before.insertAdjacentHTML('afterend', raw_1_value);
            }

            if (state._valueIsArray) {
              if (if_block_5) {
                if_block_5.update(changed, state);
              } else {
                if_block_5 = create_if_block_6(state, component);
                if_block_5.mount(div_5, text_9);
              }
            } else if (if_block_5) {
              if_block_5.unmount();
              if_block_5.destroy();
              if_block_5 = null;
            }

            if (div_7_style_value !== (div_7_style_value = 'left: ' + state._highValueMarkerLeft + 'px;')) {
              div_7.style.cssText = div_7_style_value;
            }

            if (raw_2_value !== (raw_2_value = state._highValueFormatted)) {
              (0, _shared.detachBetween)(raw_2_before, raw_2_after);
              raw_2_before.insertAdjacentHTML('afterend', raw_2_value);
            }

            if (div_8_class_value !== (div_8_class_value = 'm-range-min ' + state._cssShowMarkers)) {
              div_8.className = div_8_class_value;
            }

            if (text_11_value !== (text_11_value = state.min)) {
              text_11.data = text_11_value;
            }

            if (div_9_class_value !== (div_9_class_value = 'm-range-max ' + state._cssShowMarkers)) {
              div_9.className = div_9_class_value;
            }

            if (text_13_value !== (text_13_value = state.max)) {
              text_13.data = text_13_value;
            }

            if (div_12_class_value !== (div_12_class_value = 'm-fill ' + state._cssDraggableRange)) {
              div_12.className = div_12_class_value;
            }

            if (div_12_style_value !== (div_12_style_value = 'left: ' + state._fillValue[0] + '%; right: ' + state._fillValue[1] + '%;')) {
              div_12.style.cssText = div_12_style_value;
            }

            if (state._valueIsArray) {
              if (if_block_6) {
                if_block_6.update(changed, state);
              } else {
                if_block_6 = create_if_block_7(state, component);
                if_block_6.mount(div_10, text_16);
              }
            } else if (if_block_6) {
              if_block_6.unmount();
              if_block_6.destroy();
              if_block_6 = null;
            }

            if (div_13_style_value !== (div_13_style_value = 'right: calc(' + state._fillValue[1] + '% - ' + (state._handleWidth / 2 + 6) + 'px);')) {
              div_13.style.cssText = div_13_style_value;
            }
          },

          unmount: function unmount() {
            (0, _shared.detachBetween)(raw_before, raw_after);

            (0, _shared.detachBetween)(raw_1_before, raw_1_after);

            (0, _shared.detachBetween)(raw_2_before, raw_2_after);

            (0, _shared.detachNode)(div);
            if (if_block) if_block.unmount();
            if (if_block_3) if_block_3.unmount();
            if (if_block_5) if_block_5.unmount();
            if (if_block_6) if_block_6.unmount();
          },

          destroy: function destroy() {
            if (component.refs.rootEl === div) component.refs.rootEl = null;
            if (if_block) if_block.destroy();
            if (component.refs.popover === div_1) component.refs.popover = null;
            if (if_block_3) if_block_3.destroy();
            {
              if_block_4.unmount();
              if_block_4.destroy();
            }
            (0, _shared.removeListener)(input, 'keydown', keydown_handler);
            (0, _shared.removeListener)(input, 'change', change_handler);
            if (component.refs.highValueInput === input) component.refs.highValueInput = null;
            (0, _shared.removeListener)(div_3, 'click', click_handler);
            if (component.refs.markers === div_5) component.refs.markers = null;
            (0, _shared.removeListener)(div_6, 'dblclick', dblclick_handler);
            if (component.refs.mergedValueMarker === div_6) component.refs.mergedValueMarker = null;
            if (if_block_5) if_block_5.destroy();
            (0, _shared.removeListener)(div_7, 'dblclick', dblclick_handler_1);
            if (component.refs.highValueMarker === div_7) component.refs.highValueMarker = null;
            if (component.refs.slider === div_10) component.refs.slider = null;
            if (component.refs.track === div_11) component.refs.track = null;
            if (component.refs.fill === div_12) component.refs.fill = null;
            if (if_block_6) if_block_6.destroy();
            if (component.refs.highHandleOuter === div_13) component.refs.highHandleOuter = null;
            if (component.refs.highHandle === div_14) component.refs.highHandle = null;
          }
        };
      }

      function create_if_block_1(state, component) {
        var text_value;

        var div = (0, _shared.createElement)('div');
        div.className = 'm-label';
        var text = (0, _shared.createText)(text_value = state.label);
        (0, _shared.appendNode)(text, div);

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(div, target, anchor);
          },

          update: function update(changed, state) {
            if (text_value !== (text_value = state.label)) {
              text.data = text_value;
            }
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(div);
          },

          destroy: _shared.noop
        };
      }

      function create_if_block_2(state, component) {
        var text_value;

        var div = (0, _shared.createElement)('div');
        div.className = 'm-default-label';
        var text = (0, _shared.createText)(text_value = state.rightSideLabel);
        (0, _shared.appendNode)(text, div);

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(div, target, anchor);
          },

          update: function update(changed, state) {
            if (text_value !== (text_value = state.rightSideLabel)) {
              text.data = text_value;
            }
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(div);
          },

          destroy: _shared.noop
        };
      }

      function create_if_block(state, component) {
        var div = (0, _shared.createElement)('div');
        div.className = 'm-labels';

        var if_block_1 = state.label && create_if_block_1(state, component);

        if (if_block_1) if_block_1.mount(div, null);
        var text = (0, _shared.createText)('\n      ');
        (0, _shared.appendNode)(text, div);

        var if_block_2 = state.rightSideLabel && create_if_block_2(state, component);

        if (if_block_2) if_block_2.mount(div, null);

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(div, target, anchor);
          },

          update: function update(changed, state) {
            if (state.label) {
              if (if_block_1) {
                if_block_1.update(changed, state);
              } else {
                if_block_1 = create_if_block_1(state, component);
                if_block_1.mount(div, text);
              }
            } else if (if_block_1) {
              if_block_1.unmount();
              if_block_1.destroy();
              if_block_1 = null;
            }

            if (state.rightSideLabel) {
              if (if_block_2) {
                if_block_2.update(changed, state);
              } else {
                if_block_2 = create_if_block_2(state, component);
                if_block_2.mount(div, null);
              }
            } else if (if_block_2) {
              if_block_2.unmount();
              if_block_2.destroy();
              if_block_2 = null;
            }
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(div);
            if (if_block_1) if_block_1.unmount();
            if (if_block_2) if_block_2.unmount();
          },

          destroy: function destroy() {
            if (if_block_1) if_block_1.destroy();
            if (if_block_2) if_block_2.destroy();
          }
        };
      }

      function create_if_block_3(state, component) {
        var span = (0, _shared.createElement)('span');
        var label = (0, _shared.createElement)('label');
        (0, _shared.appendNode)(label, span);
        (0, _shared.appendNode)((0, _shared.createText)('Low Value'), label);
        (0, _shared.appendNode)((0, _shared.createText)('\n          '), span);
        var input = (0, _shared.createElement)('input');
        (0, _shared.appendNode)(input, span);
        input.type = 'text';

        function keydown_handler(event) {
          component._handlePopoverKeydown(event);
        }

        (0, _shared.addListener)(input, 'keydown', keydown_handler);

        function change_handler(event) {
          component._handlePopoverInputChange(input.value, true);
        }

        (0, _shared.addListener)(input, 'change', change_handler);
        component.refs.lowValueInput = input;

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(span, target, anchor);
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(span);
          },

          destroy: function destroy() {
            (0, _shared.removeListener)(input, 'keydown', keydown_handler);
            (0, _shared.removeListener)(input, 'change', change_handler);
            if (component.refs.lowValueInput === input) component.refs.lowValueInput = null;
          }
        };
      }

      function create_if_block_4(state, component) {
        var text = (0, _shared.createText)('High Value');

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(text, target, anchor);
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(text);
          },

          destroy: _shared.noop
        };
      }

      function create_if_block_5(state, component) {
        var text = (0, _shared.createText)('Value');

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(text, target, anchor);
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(text);
          },

          destroy: _shared.noop
        };
      }

      function create_if_block_6(state, component) {
        var div_style_value;

        var div = (0, _shared.createElement)('div');
        div.className = 'm-current-value m-low-value';
        div.style.cssText = div_style_value = 'left: ' + state._lowValueMarkerLeft + 'px;';
        div.title = 'Double click to edit';

        function dblclick_handler(event) {
          component.showEditPopover();
        }

        (0, _shared.addListener)(div, 'dblclick', dblclick_handler);
        component.refs.lowValueMarker = div;
        var raw_before = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_before, div);
        var raw_after = (0, _shared.createElement)('noscript');
        (0, _shared.appendNode)(raw_after, div);
        var raw_value = state._lowValueFormatted;
        raw_before.insertAdjacentHTML('afterend', raw_value);

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(div, target, anchor);
          },

          update: function update(changed, state) {
            if (div_style_value !== (div_style_value = 'left: ' + state._lowValueMarkerLeft + 'px;')) {
              div.style.cssText = div_style_value;
            }

            if (raw_value !== (raw_value = state._lowValueFormatted)) {
              (0, _shared.detachBetween)(raw_before, raw_after);
              raw_before.insertAdjacentHTML('afterend', raw_value);
            }
          },

          unmount: function unmount() {
            (0, _shared.detachBetween)(raw_before, raw_after);

            (0, _shared.detachNode)(div);
          },

          destroy: function destroy() {
            (0, _shared.removeListener)(div, 'dblclick', dblclick_handler);
            if (component.refs.lowValueMarker === div) component.refs.lowValueMarker = null;
          }
        };
      }

      function create_if_block_7(state, component) {
        var div_style_value;

        var div = (0, _shared.createElement)('div');
        div.className = 'm-handle-outer';
        div.style.cssText = div_style_value = 'left: calc(' + state._fillValue[0] + '% - ' + (state._handleWidth / 2 + 6) + 'px);';
        component.refs.lowHandleOuter = div;
        var div_1 = (0, _shared.createElement)('div');
        (0, _shared.appendNode)(div_1, div);
        div_1.className = 'm-handle';
        component.refs.lowHandle = div_1;

        return {
          mount: function mount(target, anchor) {
            (0, _shared.insertNode)(div, target, anchor);
          },

          update: function update(changed, state) {
            if (div_style_value !== (div_style_value = 'left: calc(' + state._fillValue[0] + '% - ' + (state._handleWidth / 2 + 6) + 'px);')) {
              div.style.cssText = div_style_value;
            }
          },

          unmount: function unmount() {
            (0, _shared.detachNode)(div);
          },

          destroy: function destroy() {
            if (component.refs.lowHandleOuter === div) component.refs.lowHandleOuter = null;
            if (component.refs.lowHandle === div_1) component.refs.lowHandle = null;
          }
        };
      }

      function MagSlider(options) {
        options = options || {};
        this.refs = {};
        this._state = (0, _shared.assign)(template.data(), options.data);
        recompute(this._state, this._state, {}, true);

        this._observers = {
          pre: Object.create(null),
          post: Object.create(null)
        };

        this._handlers = Object.create(null);

        this._root = options._root || this;
        this._yield = options._yield;

        this._torndown = false;
        if (!document.getElementById('svelte-1502752747-style')) add_css();

        this._fragment = create_main_fragment(this._state, this);
        if (options.target) this._fragment.mount(options.target, null);

        if (options._root) {
          options._root._renderHooks.push(template.oncreate.bind(this));
        } else {
          template.oncreate.call(this);
        }
      }

      (0, _shared.assign)(MagSlider.prototype, template.methods, _shared.proto);

      MagSlider.prototype._set = function _set(newState) {
        var oldState = this._state;
        this._state = (0, _shared.assign)({}, oldState, newState);
        recompute(this._state, newState, oldState, false);
        (0, _shared.dispatchObservers)(this, this._observers.pre, newState, oldState);
        this._fragment.update(newState, this._state);
        (0, _shared.dispatchObservers)(this, this._observers.post, newState, oldState);
      };

      MagSlider.prototype.teardown = MagSlider.prototype.destroy = function destroy(detach) {
        this.fire('destroy');
        template.ondestroy.call(this);

        if (detach !== false) this._fragment.unmount();
        this._fragment.destroy();
        this._fragment = null;

        this._state = {};
        this._torndown = true;
      };

      exports.default = MagSlider;
      /***/ }
    /******/ ]);


/***/ })
/******/ ]);