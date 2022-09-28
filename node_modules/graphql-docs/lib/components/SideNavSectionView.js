'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SideNavSectionView = require('./SideNavSectionView.css');

var StyleSheet = _interopRequireWildcard(_SideNavSectionView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNavSectionView = function (_React$Component) {
    _inherits(SideNavSectionView, _React$Component);

    function SideNavSectionView() {
        _classCallCheck(this, SideNavSectionView);

        return _possibleConstructorReturn(this, (SideNavSectionView.__proto__ || Object.getPrototypeOf(SideNavSectionView)).apply(this, arguments));
    }

    _createClass(SideNavSectionView, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: StyleSheet.sidenavSection },
                _react2.default.createElement(
                    'div',
                    { className: StyleSheet.sectionLink },
                    _react2.default.createElement(
                        'a',
                        { href: '#' + this.props.name },
                        this.props.name
                    )
                ),
                this.props.items.map(function (item) {
                    return _react2.default.createElement(
                        'div',
                        { className: StyleSheet.typeLink },
                        _react2.default.createElement(
                            'a',
                            { href: '#' + item.name },
                            '\xA0\xA0',
                            item.name
                        )
                    );
                })
            );
        }
    }]);

    return SideNavSectionView;
}(_react2.default.Component);

exports.default = SideNavSectionView;