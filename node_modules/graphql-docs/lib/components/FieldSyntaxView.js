'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FieldSyntaxView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('../model');

var _TypeRefView = require('./TypeRefView');

var _FieldSyntaxView = require('./FieldSyntaxView.css');

var StyleSheet = _interopRequireWildcard(_FieldSyntaxView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldSyntaxView = exports.FieldSyntaxView = function (_React$Component) {
    _inherits(FieldSyntaxView, _React$Component);

    function FieldSyntaxView() {
        _classCallCheck(this, FieldSyntaxView);

        return _possibleConstructorReturn(this, (FieldSyntaxView.__proto__ || Object.getPrototypeOf(FieldSyntaxView)).apply(this, arguments));
    }

    _createClass(FieldSyntaxView, [{
        key: 'render',
        value: function render() {
            var field = this.props.field;

            return _react2.default.createElement(
                'div',
                { className: StyleSheet.container },
                _react2.default.createElement(
                    'span',
                    { className: StyleSheet.name },
                    field.name
                ),
                this.renderFieldArgs(field.args),
                ': ',
                _react2.default.createElement(_TypeRefView.TypeRefView, { typeRef: field.type })
            );
        }
    }, {
        key: 'renderFieldArgs',
        value: function renderFieldArgs(args) {
            var _this2 = this;

            if (!args.length) {
                return null;
            }

            return _react2.default.createElement(
                'span',
                null,
                '(',
                args.map(function (arg, idx) {
                    return _this2.renderField(arg, idx);
                }),
                ')'
            );
        }
    }, {
        key: 'renderField',
        value: function renderField(arg, index) {
            return _react2.default.createElement(
                'span',
                { key: arg.name },
                index > 0 ? _react2.default.createElement(
                    'span',
                    null,
                    ', '
                ) : null,
                _react2.default.createElement(
                    'span',
                    { className: StyleSheet.argumentName },
                    arg.name
                ),
                ': ',
                _react2.default.createElement(_TypeRefView.TypeRefView, { typeRef: arg.type }),
                this.renderDefaultValue(arg.defaultValue)
            );
        }
    }, {
        key: 'renderDefaultValue',
        value: function renderDefaultValue(defaultValue) {
            if (!defaultValue) {
                return null;
            }

            return _react2.default.createElement(
                'span',
                { className: StyleSheet.defaultValue },
                ' = ',
                defaultValue
            );
        }
    }]);

    return FieldSyntaxView;
}(_react2.default.Component);