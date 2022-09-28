'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FieldView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('../model');

var _DescriptionView = require('./DescriptionView');

var _DeprecatedView = require('./DeprecatedView');

var _FieldSyntaxView = require('./FieldSyntaxView');

var _FieldArgumentsTableView = require('./FieldArgumentsTableView');

var _FieldView = require('./FieldView.css');

var StyleSheet = _interopRequireWildcard(_FieldView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldView = exports.FieldView = function (_React$Component) {
    _inherits(FieldView, _React$Component);

    function FieldView() {
        _classCallCheck(this, FieldView);

        return _possibleConstructorReturn(this, (FieldView.__proto__ || Object.getPrototypeOf(FieldView)).apply(this, arguments));
    }

    _createClass(FieldView, [{
        key: 'render',
        value: function render() {
            var field = this.props.field;

            return _react2.default.createElement(
                'div',
                {
                    key: field.name,
                    className: StyleSheet.container
                },
                _react2.default.createElement(_FieldSyntaxView.FieldSyntaxView, { field: field }),
                this.renderDescription(field.description),
                this.renderDeprecated(field.isDeprecated, field.deprecationReason),
                _react2.default.createElement(_FieldArgumentsTableView.FieldArgumentsTableView, { args: field.args })
            );
        }
    }, {
        key: 'renderDescription',
        value: function renderDescription(description) {
            if (!description) {
                return null;
            }

            return _react2.default.createElement(_DescriptionView.DescriptionView, {
                className: StyleSheet.description,
                description: description
            });
        }
    }, {
        key: 'renderDeprecated',
        value: function renderDeprecated(isDeprecated, reason) {
            if (!isDeprecated) {
                return null;
            }

            return _react2.default.createElement(_DeprecatedView.DeprecatedView, {
                className: StyleSheet.deprecated,
                reason: reason
            });
        }
    }]);

    return FieldView;
}(_react2.default.Component);