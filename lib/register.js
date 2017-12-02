'use strict';

require('babel-polyfill');

var _react = require('@storybook/react');

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _constants = require('./constants');

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // eslint-disable-line


var query = _queryString2.default.parse(window.location.search);
var phase = query['chrome-screenshot'];
var selectKind = query.selectKind;
var selectStory = query.selectStory;

var searchTargetStories = function searchTargetStories(channel, api) {
  return new Promise(function (resolve, reject) {
    var results = [];
    var count = 0;

    var handleCount = function handleCount() {
      count += 1;
    };

    var handleInit = function handleInit(context) {
      results.push(context);

      if (results.length >= count) {
        removeListeners(); // eslint-disable-line no-use-before-define
        resolve(results);
      }
    };

    var handleError = function handleError(error) {
      reject(error);
    };

    var removeListeners = function removeListeners() {
      channel.removeListener(_constants.EventTypes.COMPONENT_COUNT, handleCount);
      channel.removeListener(_constants.EventTypes.COMPONENT_INIT, handleInit);
      channel.removeListener(_constants.EventTypes.COMPONENT_ERROR, handleError);
    };

    channel.on(_constants.EventTypes.COMPONENT_COUNT, handleCount);
    channel.on(_constants.EventTypes.COMPONENT_INIT, handleInit);
    channel.on(_constants.EventTypes.COMPONENT_ERROR, handleError);

    channel.once('setStories', function (_ref) {
      var stories = _ref.stories;

      /* eslint-disable no-restricted-syntax */
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = stories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var group = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = group.stories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var story = _step2.value;

              api.selectStory(group.kind, story);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
        /* eslint-enable */
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    setTimeout(function () {
      if (count === 0) {
        reject('The target stories was not found.');
      }
    }, _constants.SEARCH_COMPONENT_TIMEOUT);
  });
};

_addons2.default.register(_package2.default.name, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(api) {
    var channel;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (phase) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            _context.prev = 2;
            channel = _addons2.default.getChannel();
            _context.t0 = phase;
            _context.next = _context.t0 === _constants.PhaseTypes.PREPARE ? 7 : _context.t0 === _constants.PhaseTypes.CAPTURE ? 14 : 17;
            break;

          case 7:
            _context.t1 = window;
            _context.next = 10;
            return searchTargetStories(channel, api);

          case 10:
            _context.t2 = _context.sent;
            _context.next = 13;
            return _context.t1.setScreenshotStories.call(_context.t1, _context.t2);

          case 13:
            return _context.abrupt('return');

          case 14:
            channel.on(_constants.EventTypes.COMPONENT_READY, function (_ref3) {
              var kind = _ref3.kind,
                  story = _ref3.story;

              if (selectKind === kind && selectStory === story) {
                window.readyComponentScreenshot();
              }
            });
            api.selectStory(selectKind, selectStory);
            return _context.abrupt('break', 18);

          case 17:
            throw new Error('An unknown phase called "' + phase + '" is being executed.');

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t3 = _context['catch'](2);

            window.failureScreenshot(_context.t3);

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 20]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
//# sourceMappingURL=register.js.map