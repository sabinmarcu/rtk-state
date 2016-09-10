"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _service = require("./service");

var _service2 = _interopRequireDefault(_service);

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function () {
    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
        props[_key] = arguments[_key];
    }

    return function (ComposedComponent) {
        var _class, _temp2;

        return _temp2 = _class = function (_Component) {
            _inherits(_class, _Component);

            function _class() {
                var _ref;

                var _temp, _this, _ret;

                _classCallCheck(this, _class);

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = props.reduce(function (prev, prop) {
                    return true && _extends({}, prev, _defineProperty({}, prop, null));
                }, {}), _this._subscriptions = null, _temp), _possibleConstructorReturn(_this, _ret);
            }

            _createClass(_class, [{
                key: "componentWillMount",
                value: function componentWillMount() {
                    var _this2 = this;

                    this._subscriptions = props.map(function (prop) {
                        return _service2.default.subscribe.call(_service2.default, prop, _this2.setState.bind(_this2));
                    });
                }
            }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    if (this._subscriptions) {
                        this._subscriptions.forEach(function (sub) {
                            sub.unsubscribe();
                        });
                    }
                }
            }, {
                key: "render",
                value: function render() {
                    return _react2.default.createElement(ComposedComponent, _extends({}, this.props, {
                        state: Object.assign({}, this.props.state, this.state),
                        actions: _extends({}, props.reduce(function (acc, prop) {
                            return true && _extends({}, acc, _defineProperty({}, prop + "Change", function undefined(val) {
                                return _service2.default.publish.call(_service2.default, prop, _defineProperty({}, prop, val));
                            }));
                        }, {}), {
                            publish: function publish(channel, data) {
                                return _service2.default.publish.call(_service2.default, channel, _defineProperty({}, channel, data));
                            }
                        })
                    }));
                }
            }]);

            return _class;
        }(_react.Component), _class.propTypes = {
            state: _react.PropTypes.object
        }, _temp2;
    };
};

module.exports = exports["default"];