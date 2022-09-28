'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputObjectDocsView = exports.ScalarDocsView = exports.EnumDocsView = exports.InterfaceDocsView = exports.UnionDocsView = exports.ObjectDocsView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('../model');

var _DescriptionView = require('./DescriptionView');

var _DeprecatedView = require('./DeprecatedView');

var _FieldView = require('./FieldView');

var _TypeRefView = require('./TypeRefView');

var _FieldArgumentsTableView = require('./FieldArgumentsTableView');

var _TypeDocsViews = require('./TypeDocsViews.css');

var StyleSheet = _interopRequireWildcard(_TypeDocsViews);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectDocsView = exports.ObjectDocsView = function (_React$Component) {
    _inherits(ObjectDocsView, _React$Component);

    function ObjectDocsView() {
        _classCallCheck(this, ObjectDocsView);

        return _possibleConstructorReturn(this, (ObjectDocsView.__proto__ || Object.getPrototypeOf(ObjectDocsView)).apply(this, arguments));
    }

    _createClass(ObjectDocsView, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;
            return _react2.default.createElement(
                'div',
                { className: StyleSheet.type },
                renderTitle(type.name, this.props.titleOverride),
                renderDescription(type.description),
                renderInterfaces(type.interfaces),
                renderFields(type.fields)
            );
        }
    }]);

    return ObjectDocsView;
}(_react2.default.Component);

ObjectDocsView.defaultProps = {
    titleOverride: null
};

var UnionDocsView = exports.UnionDocsView = function (_React$Component2) {
    _inherits(UnionDocsView, _React$Component2);

    function UnionDocsView() {
        _classCallCheck(this, UnionDocsView);

        return _possibleConstructorReturn(this, (UnionDocsView.__proto__ || Object.getPrototypeOf(UnionDocsView)).apply(this, arguments));
    }

    _createClass(UnionDocsView, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;
            return _react2.default.createElement(
                'div',
                { className: StyleSheet.type },
                renderTitle(type.name),
                renderDescription(type.description),
                renderPossibleTypes(type.possibleTypes)
            );
        }
    }]);

    return UnionDocsView;
}(_react2.default.Component);

var InterfaceDocsView = exports.InterfaceDocsView = function (_React$Component3) {
    _inherits(InterfaceDocsView, _React$Component3);

    function InterfaceDocsView() {
        _classCallCheck(this, InterfaceDocsView);

        return _possibleConstructorReturn(this, (InterfaceDocsView.__proto__ || Object.getPrototypeOf(InterfaceDocsView)).apply(this, arguments));
    }

    _createClass(InterfaceDocsView, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;
            return _react2.default.createElement(
                'div',
                { className: StyleSheet.type },
                renderTitle(type.name),
                renderDescription(type.description),
                renderImplementors(type.possibleTypes),
                renderFields(type.fields)
            );
        }
    }]);

    return InterfaceDocsView;
}(_react2.default.Component);

var EnumDocsView = exports.EnumDocsView = function (_React$Component4) {
    _inherits(EnumDocsView, _React$Component4);

    function EnumDocsView() {
        _classCallCheck(this, EnumDocsView);

        return _possibleConstructorReturn(this, (EnumDocsView.__proto__ || Object.getPrototypeOf(EnumDocsView)).apply(this, arguments));
    }

    _createClass(EnumDocsView, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;
            return _react2.default.createElement(
                'div',
                { className: StyleSheet.type },
                renderTitle(type.name),
                renderDescription(type.description),
                renderEnumValues(type.enumValues)
            );
        }
    }]);

    return EnumDocsView;
}(_react2.default.Component);

var ScalarDocsView = exports.ScalarDocsView = function (_React$Component5) {
    _inherits(ScalarDocsView, _React$Component5);

    function ScalarDocsView() {
        _classCallCheck(this, ScalarDocsView);

        return _possibleConstructorReturn(this, (ScalarDocsView.__proto__ || Object.getPrototypeOf(ScalarDocsView)).apply(this, arguments));
    }

    _createClass(ScalarDocsView, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;
            return _react2.default.createElement(
                'div',
                { className: StyleSheet.type },
                renderTitle(type.name),
                renderDescription(type.description)
            );
        }
    }]);

    return ScalarDocsView;
}(_react2.default.Component);

var InputObjectDocsView = exports.InputObjectDocsView = function (_React$Component6) {
    _inherits(InputObjectDocsView, _React$Component6);

    function InputObjectDocsView() {
        _classCallCheck(this, InputObjectDocsView);

        return _possibleConstructorReturn(this, (InputObjectDocsView.__proto__ || Object.getPrototypeOf(InputObjectDocsView)).apply(this, arguments));
    }

    _createClass(InputObjectDocsView, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;

            return _react2.default.createElement(
                'div',
                { className: StyleSheet.type },
                renderTitle(type.name),
                renderDescription(type.description),
                _react2.default.createElement(_FieldArgumentsTableView.FieldArgumentsTableView, {
                    args: type.inputFields
                })
            );
        }
    }]);

    return InputObjectDocsView;
}(_react2.default.Component);

function renderTitle(typeName) {
    var titleOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return _react2.default.createElement(
        'h3',
        { className: StyleSheet.heading },
        _react2.default.createElement('a', { name: typeName }),
        titleOverride || typeName
    );
}

function renderDescription(description) {
    if (!description) {
        return null;
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_DescriptionView.DescriptionView, { description: description })
    );
}

function renderFields(fields) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: StyleSheet.subHeading },
            'Fields'
        ),
        fields.map(function (f) {
            return _react2.default.createElement(_FieldView.FieldView, { key: f.name, field: f });
        })
    );
}

function renderInterfaces(interfaces) {
    if (!interfaces.length) {
        return null;
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: StyleSheet.subHeading },
            'Implements'
        ),
        _react2.default.createElement(
            'ul',
            { className: StyleSheet.interfacesList },
            interfaces.map(function (r, i) {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(_TypeRefView.TypeRefView, { key: i, typeRef: r })
                );
            })
        )
    );
}

function renderPossibleTypes(possibleTypes) {
    if (!possibleTypes.length) {
        return null;
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: StyleSheet.subHeading },
            'Possible Types'
        ),
        _react2.default.createElement(
            'ul',
            { className: StyleSheet.interfacesList },
            possibleTypes.map(function (r, i) {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(_TypeRefView.TypeRefView, { key: i, typeRef: r })
                );
            })
        )
    );
}

function renderImplementors(possibleTypes) {
    if (!possibleTypes.length) {
        return null;
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: StyleSheet.subHeading },
            'Implemented by'
        ),
        _react2.default.createElement(
            'ul',
            { className: StyleSheet.interfacesList },
            possibleTypes.map(function (r, i) {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(_TypeRefView.TypeRefView, { key: i, typeRef: r })
                );
            })
        )
    );
}

function renderEnumValues(enumValues) {
    if (!enumValues.length) {
        return null;
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: StyleSheet.subHeading },
            'Possible Enum Values'
        ),
        _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
                'tbody',
                null,
                enumValues.map(function (v) {
                    return _react2.default.createElement(
                        'tr',
                        {
                            key: v.name,
                            className: StyleSheet.enumRow
                        },
                        _react2.default.createElement(
                            'td',
                            {
                                className: v.isDeprecated ? StyleSheet.enumNameDeprecated : StyleSheet.enumName
                            },
                            v.name
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            v.isDeprecated && _react2.default.createElement(_DeprecatedView.DeprecatedView, { reason: v.deprecationReason }) || v.description && _react2.default.createElement(_DescriptionView.DescriptionView, { description: v.description })
                        )
                    );
                })
            )
        )
    );
}