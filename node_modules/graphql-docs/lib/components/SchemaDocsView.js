'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SchemaDocsView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTypeahead = require('react-typeahead');

var _model = require('../model');

var _schemaWalker = require('../schemaWalker');

var _TypeDocsViews = require('./TypeDocsViews');

var _SectionView = require('./SectionView');

var _SectionView2 = _interopRequireDefault(_SectionView);

var _SideNavSectionView = require('./SideNavSectionView');

var _SideNavSectionView2 = _interopRequireDefault(_SideNavSectionView);

var _SchemaDocsView = require('./SchemaDocsView.css');

var StyleSheet = _interopRequireWildcard(_SchemaDocsView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SchemaDocsView = exports.SchemaDocsView = function (_React$Component) {
    _inherits(SchemaDocsView, _React$Component);

    function SchemaDocsView(props) {
        _classCallCheck(this, SchemaDocsView);

        var _this = _possibleConstructorReturn(this, (SchemaDocsView.__proto__ || Object.getPrototypeOf(SchemaDocsView)).call(this, props));

        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }

    _createClass(SchemaDocsView, [{
        key: 'handleSelect',
        value: function handleSelect(name) {
            location.hash = '#' + name;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var types = (0, _schemaWalker.getReferencesInSchema)(this.props.schema).map(function (tn) {
                return _this2.props.schema.types[tn];
            });
            var sections = {
                schema: { name: 'Schema', items: [] },
                objects: { name: 'Object Types', items: [] },
                inputs: { name: 'Input Types', items: [] },
                unions: { name: 'Unions', items: [] },
                interfaces: { name: 'Interfaces', items: [] },
                enums: { name: 'Enums', items: [] },
                scalars: { name: 'Scalars', items: [] }
            };
            var options = [];

            types.forEach(function (t) {
                if (t instanceof _model.ObjectType) {
                    var component = _react2.default.createElement(_TypeDocsViews.ObjectDocsView, {
                        key: t.name,
                        type: t,
                        titleOverride: _this2.titleOverrideFor(t)
                    });
                    if (t === _this2.props.schema.getQueryType() || t === _this2.props.schema.getMutationType()) {
                        sections.schema.items.push({ name: t.name, component: component });
                        options.push(t.name);
                    } else {
                        sections.objects.items.push({ name: t.name, component: component });
                        options.push(t.name);
                    }
                }
                if (t instanceof _model.UnionType) {
                    options.push(t.name);
                    sections.unions.items.push({ name: t.name, component: _react2.default.createElement(_TypeDocsViews.UnionDocsView, {
                            key: t.name,
                            type: t
                        }) });
                }
                if (t instanceof _model.InterfaceType) {
                    options.push(t.name);
                    sections.interfaces.items.push({ name: t.name, component: _react2.default.createElement(_TypeDocsViews.InterfaceDocsView, {
                            key: t.name,
                            type: t
                        }) });
                }
                if (t instanceof _model.EnumType) {
                    options.push(t.name);
                    sections.enums.items.push({ name: t.name, component: _react2.default.createElement(_TypeDocsViews.EnumDocsView, {
                            key: t.name,
                            type: t
                        }) });
                }
                if (t instanceof _model.InputObjectType) {
                    options.push(t.name);
                    sections.inputs.items.push({ name: t.name, component: _react2.default.createElement(_TypeDocsViews.InputObjectDocsView, {
                            key: t.name,
                            type: t
                        }) });
                }
                if (t instanceof _model.ScalarType) {
                    options.push(t.name);
                    sections.scalars.items.push({ name: t.name, component: _react2.default.createElement(_TypeDocsViews.ScalarDocsView, {
                            key: t.name,
                            type: t
                        }) });
                }
            });

            Object.keys(sections).forEach(function (key) {
                var section = sections[key];
                section.items.sort(function (itemA, itemB) {
                    if (itemA.name.toUpperCase() < itemB.name.toUpperCase()) {
                        return -1;
                    }
                    if (itemA.name.toUpperCase() > itemB.name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                });
            });

            var customClasses = {
                input: StyleSheet.selectInput,
                results: StyleSheet.selectList,
                listItem: StyleSheet.selectItem,
                hover: StyleSheet.selectHover
            };

            return _react2.default.createElement(
                'div',
                { className: StyleSheet.wrapper },
                _react2.default.createElement(
                    'div',
                    { className: StyleSheet.sidenav },
                    _react2.default.createElement(_reactTypeahead.Typeahead, {
                        options: options,
                        maxVisible: 6,
                        placeholder: 'Search types',
                        customClasses: customClasses,
                        onOptionSelected: this.handleSelect
                    }),
                    _react2.default.createElement('br', null),
                    Object.keys(sections).map(function (key) {
                        var section = sections[key];
                        return section.items.length > 0 ? _react2.default.createElement(_SideNavSectionView2.default, { name: section.name, items: section.items }) : '';
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: StyleSheet.content },
                    _react2.default.createElement(
                        'div',
                        { className: StyleSheet.container },
                        Object.keys(sections).map(function (key) {
                            var section = sections[key];
                            return section.items.length > 0 ? _react2.default.createElement(_SectionView2.default, { name: section.name, items: section.items }) : '';
                        })
                    )
                )
            );
        }
    }, {
        key: 'titleOverrideFor',
        value: function titleOverrideFor(t) {
            if (t === this.props.schema.getQueryType()) {
                return 'Query';
            }
            if (t === this.props.schema.getMutationType()) {
                return 'Mutations';
            }

            return null;
        }
    }]);

    return SchemaDocsView;
}(_react2.default.Component);