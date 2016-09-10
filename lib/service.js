"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _rxjs = require("rxjs");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateBrokerService = (_temp = _class = function () {
    function StateBrokerService() {
        _classCallCheck(this, StateBrokerService);
    }

    _createClass(StateBrokerService, null, [{
        key: "getChannel",
        value: function getChannel(channel) {
            if (!this._subjects[channel]) {
                this._subjects[channel] = new _rxjs.BehaviorSubject(_defineProperty({}, channel, null));
            }
            return this._subjects[channel];
        }
    }, {
        key: "subscribe",
        value: function subscribe(channel, func) {
            return this.getChannel(channel).subscribe(func);
        }
    }, {
        key: "publish",
        value: function publish(channel) {
            var _getChannel;

            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            (_getChannel = this.getChannel(channel)).next.apply(_getChannel, _toConsumableArray(data));
        }
    }]);

    return StateBrokerService;
}(), _class._subjects = [], _temp);
exports.default = StateBrokerService;
module.exports = exports["default"];