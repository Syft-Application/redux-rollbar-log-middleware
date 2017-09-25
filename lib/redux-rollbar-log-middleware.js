(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("reduxRollbarLogMiddleware", [], factory);
	else if(typeof exports === 'object')
		exports["reduxRollbarLogMiddleware"] = factory();
	else
		root["reduxRollbarLogMiddleware"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ROLLBAR_LOG_TYPE = exports.ROLLBAR_LOG_TYPE = '@rollbarLogMiddleware/LOG';
var ROLLBAR_CAPTURE_TYPE = exports.ROLLBAR_CAPTURE_TYPE = '@rollbarLogMiddleware/CAPTURE';

var createLogAction = exports.createLogAction = function createLogAction(payload) {
  return {
    type: ROLLBAR_LOG_TYPE,
    payload: payload
  };
};

var createCaptureAction = exports.createCaptureAction = function createCaptureAction(payload) {
  return {
    type: ROLLBAR_CAPTURE_TYPE,
    payload: payload
  };
};

exports.default = function (rollbar) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === ROLLBAR_LOG_TYPE) {
          var _ref = action.payload || {},
              _ref$type = _ref.type,
              type = _ref$type === undefined ? 'debug' : _ref$type,
              message = _ref.message,
              body = _ref.body;

          if (rollbar[type]) rollbar[type](message, body);else console.warn('Unknown rollbar log type:: ' + type);
        } else if (action.type === ROLLBAR_CAPTURE_TYPE) {
          var _ref2 = action.payload || {},
              _ref2$type = _ref2.type,
              _type = _ref2$type === undefined ? 'debug' : _ref2$type,
              _body = _ref2.body;

          rollbar.captureEvent(_body, _type);
        } else {
          return next(action);
        }
      };
    };
  };
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=redux-rollbar-log-middleware.js.map