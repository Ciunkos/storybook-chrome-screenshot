'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PhaseTypes = exports.PhaseTypes = {
  LAUNCH: 'LAUNCH',
  PREPARE: 'PREPARE',
  CAPTURE: 'CAPTURE',
  DONE: 'DONE'
};

var addonPrefix = 'chrome-screenshot';

var EventTypes = exports.EventTypes = {
  COMPONENT_INIT: addonPrefix + '/component-init',
  COMPONENT_READY: addonPrefix + '/component-ready',
  COMPONENT_COUNT: addonPrefix + '/component-count',
  COMPONENT_ERROR: addonPrefix + '/component-error',
  READY: addonPrefix + '/ready'
};

var SEARCH_COMPONENT_TIMEOUT = exports.SEARCH_COMPONENT_TIMEOUT = 36000;

var defaultScreenshotOptions = exports.defaultScreenshotOptions = {
  delay: 0,
  viewport: {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false
  }
};
//# sourceMappingURL=constants.js.map