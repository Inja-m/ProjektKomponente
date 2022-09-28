'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeRefView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('../model');

var _TypeRefView = require('./TypeRefView.css');

var StyleSheet = _interopRequireWildcard(_TypeRefView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeRefView = exports.TypeRefView = function (_React$Component) {
    _inherits(TypeRefView, _React$Component);

    function TypeRefView() {
        _classCallCheck(this, TypeRefView);

        return _possibleConstructorReturn(this, (TypeRefView.__proto__ || Object.getPrototypeOf(TypeRefView)).apply(this, arguments));
    }

    _createClass(TypeRefView, [{
        key: 'render',
        value: function render() {
            var ref = this.props.typeRef;

            if (ref instanceof _model.NamedTypeRef) {
                return _react2.default.createElement(
                    'a',
                    {
                        className: StyleSheet.typeRef,
                        href: '#' + ref.typeName
                    },
                    ref.typeName
                );
            } else if (ref instanceof _model.NonNullTypeRef) {
                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(TypeRefView, { typeRef: ref.ofType }),
                    '!'
                );
            } else if (ref instanceof _model.ListTypeRef) {
                return _react2.default.createElement(
                    'span',
                    null,
                    '[',
                    _react2.default.createElement(TypeRefView, { typeRef: ref.ofType }),
                    ']'
                );
            }

            throw new Error('Unknown type ref: ' + ref.toString());
        }
    }]);

    return TypeRefView;
}(_react2.default.Component);