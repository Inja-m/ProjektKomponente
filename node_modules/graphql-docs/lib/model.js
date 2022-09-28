'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYPE_KINDS = exports.TYPE_KINDS = ['SCALAR', 'INTERFACE', 'OBJECT', 'ENUM', 'INPUT_OBJECT', 'UNION'];

var Schema = exports.Schema = function () {
    function Schema(introspectionResult) {
        var _this = this;

        _classCallCheck(this, Schema);

        if (!introspectionResult.__schema) {
            throw new Error('Function  precondition failed: introspectionResult.__schema');
        }

        if (!Array.isArray(introspectionResult.__schema.types)) {
            throw new Error('Function  precondition failed: Array.isArray(introspectionResult.__schema.types)');
        }

        if (!introspectionResult.__schema.queryType) {
            throw new Error('Function  precondition failed: introspectionResult.__schema.queryType');
        }

        if (!(introspectionResult.__schema.mutationType === null || typeof introspectionResult.__schema.mutationType.name === 'string')) {
            throw new Error('Function  precondition failed: introspectionResult.__schema.mutationType === null || typeof introspectionResult.__schema.mutationType.name === \'string\'');
        }

        this.types = {};
        introspectionResult.__schema.types.forEach(function (t) {
            if (!(typeof t.name === 'string')) {
                throw new Error('Function  precondition failed: typeof t.name === \'string\'');
            }

            _this.types[t.name] = Type.fromIntrospectionType(t);
        });

        this.queryTypeId = introspectionResult.__schema.queryType.name;

        if (introspectionResult.__schema.mutationType) {
            this.mutationTypeId = introspectionResult.__schema.mutationType.name;
        } else {
            this.mutationTypeId = null;
        }
    }

    _createClass(Schema, [{
        key: 'getQueryType',
        value: function getQueryType() {
            var queryType = this.types[this.queryTypeId];

            if (queryType instanceof ObjectType) {
                return queryType;
            } else {
                throw new Error('Query type must be an ObjectType');
            }
        }
    }, {
        key: 'getMutationType',
        value: function getMutationType() {
            if (!this.mutationTypeId) {
                return null;
            }

            var mutationType = this.types[this.mutationTypeId];

            if (mutationType instanceof ObjectType) {
                return mutationType;
            } else {
                throw new Error('Mutation type must be an ObjectType');
            }
        }
    }]);

    return Schema;
}();

var Type = exports.Type = function () {
    _createClass(Type, null, [{
        key: 'fromIntrospectionType',
        value: function fromIntrospectionType(introspectionType) {
            if (introspectionType.kind === 'OBJECT') {
                return new ObjectType(introspectionType);
            } else if (introspectionType.kind === 'SCALAR') {
                return new ScalarType(introspectionType);
            } else if (introspectionType.kind === 'INTERFACE') {
                return new InterfaceType(introspectionType);
            } else if (introspectionType.kind === 'ENUM') {
                return new EnumType(introspectionType);
            } else if (introspectionType.kind === 'INPUT_OBJECT') {
                return new InputObjectType(introspectionType);
            } else if (introspectionType.kind === 'UNION') {
                return new UnionType(introspectionType);
            } else {
                throw new Error('Unsupported type kind: ' + introspectionType.kind);
            }
        }
    }]);

    function Type(introspectionType) {
        _classCallCheck(this, Type);

        if (!(this.constructor !== Type)) {
            throw new Error('Function  precondition failed: this.constructor !== Type');
        }

        if (!(typeof introspectionType.name === 'string')) {
            throw new Error('Function  precondition failed: typeof introspectionType.name === \'string\'');
        }

        if (!(introspectionType.description === null || typeof introspectionType.description === 'string')) {
            throw new Error('Function  precondition failed: introspectionType.description === null || typeof introspectionType.description === \'string\'');
        }

        this.name = introspectionType.name;
        this.description = introspectionType.description;
    }

    return Type;
}();

var ObjectType = exports.ObjectType = function (_Type) {
    _inherits(ObjectType, _Type);

    function ObjectType(introspectionType) {
        _classCallCheck(this, ObjectType);

        if (!(introspectionType.kind === 'OBJECT')) {
            throw new Error('Function  precondition failed: introspectionType.kind === \'OBJECT\'');
        }

        if (!Array.isArray(introspectionType.fields)) {
            throw new Error('Function  precondition failed: Array.isArray(introspectionType.fields)');
        }

        if (!(introspectionType.interfaces === null || Array.isArray(introspectionType.interfaces))) {
            throw new Error('Function  precondition failed: introspectionType.interfaces === null || Array.isArray(introspectionType.interfaces)');
        }

        var _this2 = _possibleConstructorReturn(this, (ObjectType.__proto__ || Object.getPrototypeOf(ObjectType)).call(this, introspectionType));

        _this2.fields = introspectionType.fields.map(function (f) {
            return new Field(f);
        });

        if (introspectionType.interfaces) {
            _this2.interfaces = introspectionType.interfaces.map(function (r) {
                return TypeRef.fromIntrospectionRef(r);
            });
        } else {
            _this2.interfaces = [];
        }
        return _this2;
    }

    return ObjectType;
}(Type);

var UnionType = exports.UnionType = function (_Type2) {
    _inherits(UnionType, _Type2);

    function UnionType(introspectionType) {
        _classCallCheck(this, UnionType);

        if (!(introspectionType.kind === 'UNION')) {
            throw new Error('Function  precondition failed: introspectionType.kind === \'UNION\'');
        }

        if (!(!introspectionType.possibleTypesArray || Array.isArray(introspectionType.possibleTypes))) {
            throw new Error('Function  precondition failed: !introspectionType.possibleTypesArray || Array.isArray(introspectionType.possibleTypes)');
        }

        var _this3 = _possibleConstructorReturn(this, (UnionType.__proto__ || Object.getPrototypeOf(UnionType)).call(this, introspectionType));

        _this3.possibleTypes = (introspectionType.possibleTypes || []).map(function (r) {
            return TypeRef.fromIntrospectionRef(r);
        });
        return _this3;
    }

    return UnionType;
}(Type);

var ScalarType = exports.ScalarType = function (_Type3) {
    _inherits(ScalarType, _Type3);

    function ScalarType(introspectionType) {
        _classCallCheck(this, ScalarType);

        if (!(introspectionType.kind === 'SCALAR')) {
            throw new Error('Function  precondition failed: introspectionType.kind === \'SCALAR\'');
        }

        return _possibleConstructorReturn(this, (ScalarType.__proto__ || Object.getPrototypeOf(ScalarType)).call(this, introspectionType));
    }

    return ScalarType;
}(Type);

var InterfaceType = exports.InterfaceType = function (_Type4) {
    _inherits(InterfaceType, _Type4);

    function InterfaceType(introspectionType) {
        _classCallCheck(this, InterfaceType);

        if (!(introspectionType.kind === 'INTERFACE')) {
            throw new Error('Function  precondition failed: introspectionType.kind === \'INTERFACE\'');
        }

        if (!Array.isArray(introspectionType.fields)) {
            throw new Error('Function  precondition failed: Array.isArray(introspectionType.fields)');
        }

        if (!(!introspectionType.possibleTypes || Array.isArray(introspectionType.possibleTypes))) {
            throw new Error('Function  precondition failed: !introspectionType.possibleTypes || Array.isArray(introspectionType.possibleTypes)');
        }

        var _this5 = _possibleConstructorReturn(this, (InterfaceType.__proto__ || Object.getPrototypeOf(InterfaceType)).call(this, introspectionType));

        _this5.fields = introspectionType.fields.map(function (f) {
            return new Field(f);
        });
        _this5.possibleTypes = (introspectionType.possibleTypes || []).map(function (r) {
            return TypeRef.fromIntrospectionRef(r);
        });
        return _this5;
    }

    return InterfaceType;
}(Type);

var EnumType = exports.EnumType = function (_Type5) {
    _inherits(EnumType, _Type5);

    function EnumType(introspectionType) {
        _classCallCheck(this, EnumType);

        if (!(introspectionType.kind === 'ENUM')) {
            throw new Error('Function  precondition failed: introspectionType.kind === \'ENUM\'');
        }

        if (!Array.isArray(introspectionType.enumValues)) {
            throw new Error('Function  precondition failed: Array.isArray(introspectionType.enumValues)');
        }

        var _this6 = _possibleConstructorReturn(this, (EnumType.__proto__ || Object.getPrototypeOf(EnumType)).call(this, introspectionType));

        _this6.enumValues = introspectionType.enumValues.map(function (v) {
            return new EnumValue(v);
        });
        return _this6;
    }

    return EnumType;
}(Type);

var InputObjectType = exports.InputObjectType = function (_Type6) {
    _inherits(InputObjectType, _Type6);

    function InputObjectType(introspectionType) {
        _classCallCheck(this, InputObjectType);

        if (!(introspectionType.kind === 'INPUT_OBJECT')) {
            throw new Error('Function  precondition failed: introspectionType.kind === \'INPUT_OBJECT\'');
        }

        if (!Array.isArray(introspectionType.inputFields)) {
            throw new Error('Function  precondition failed: Array.isArray(introspectionType.inputFields)');
        }

        var _this7 = _possibleConstructorReturn(this, (InputObjectType.__proto__ || Object.getPrototypeOf(InputObjectType)).call(this, introspectionType));

        _this7.inputFields = introspectionType.inputFields.map(function (f) {
            return new InputValue(f);
        });
        return _this7;
    }

    return InputObjectType;
}(Type);

var Field = exports.Field = function Field(introspectionField) {
    _classCallCheck(this, Field);

    if (!(typeof introspectionField.name === 'string')) {
        throw new Error('Function  precondition failed: typeof introspectionField.name === \'string\'');
    }

    if (!(introspectionField.description === null || typeof introspectionField.description === 'string')) {
        throw new Error('Function  precondition failed: introspectionField.description === null || typeof introspectionField.description === \'string\'');
    }

    if (!introspectionField.type) {
        throw new Error('Function  precondition failed: introspectionField.type');
    }

    if (!Array.isArray(introspectionField.args)) {
        throw new Error('Function  precondition failed: Array.isArray(introspectionField.args)');
    }

    if (!(!introspectionField.isDeprecated || typeof introspectionField.deprecationReason === 'string')) {
        throw new Error('Function  precondition failed: !introspectionField.isDeprecated || typeof introspectionField.deprecationReason === \'string\'');
    }

    if (!(introspectionField.isDeprecated || introspectionField.deprecationReason === null)) {
        throw new Error('Function  precondition failed: introspectionField.isDeprecated || introspectionField.deprecationReason === null');
    }

    this.name = introspectionField.name;
    this.description = introspectionField.description;
    this.args = introspectionField.args.map(function (a) {
        return new InputValue(a);
    });
    this.type = TypeRef.fromIntrospectionRef(introspectionField.type);
    this.isDeprecated = introspectionField.isDeprecated;
    this.deprecationReason = introspectionField.deprecationReason;
};

var InputValue = exports.InputValue = function InputValue(introspectionValue) {
    _classCallCheck(this, InputValue);

    if (!(typeof introspectionValue.name === 'string')) {
        throw new Error('Function  precondition failed: typeof introspectionValue.name === \'string\'');
    }

    if (!(introspectionValue.description === null || typeof introspectionValue.description === 'string')) {
        throw new Error('Function  precondition failed: introspectionValue.description === null || typeof introspectionValue.description === \'string\'');
    }

    if (!introspectionValue.type) {
        throw new Error('Function  precondition failed: introspectionValue.type');
    }

    if (!(introspectionValue.defaultValue !== undefined)) {
        throw new Error('Function  precondition failed: introspectionValue.defaultValue !== undefined');
    }

    this.name = introspectionValue.name;
    this.type = TypeRef.fromIntrospectionRef(introspectionValue.type);
    this.description = introspectionValue.description;
    this.defaultValue = introspectionValue.defaultValue;
};

var TypeRef = exports.TypeRef = function () {
    function TypeRef() {
        _classCallCheck(this, TypeRef);

        if (!(this.constructor !== TypeRef)) {
            throw new Error('Function  precondition failed: this.constructor !== TypeRef');
        }
    }

    _createClass(TypeRef, null, [{
        key: 'fromIntrospectionRef',
        value: function fromIntrospectionRef(introspectionRef) {
            if (introspectionRef.kind === 'NON_NULL') {
                return new NonNullTypeRef(introspectionRef);
            } else if (introspectionRef.kind === 'LIST') {
                return new ListTypeRef(introspectionRef);
            } else if (TYPE_KINDS.indexOf(introspectionRef.kind) !== -1) {
                return new NamedTypeRef(introspectionRef);
            } else {
                throw new Error('Unsupported type ref kind: ' + introspectionRef.kind);
            }
        }
    }]);

    return TypeRef;
}();

var NonNullTypeRef = exports.NonNullTypeRef = function (_TypeRef) {
    _inherits(NonNullTypeRef, _TypeRef);

    function NonNullTypeRef(introspectionRef) {
        _classCallCheck(this, NonNullTypeRef);

        if (!introspectionRef.ofType) {
            throw new Error('Function  precondition failed: introspectionRef.ofType');
        }

        var _this8 = _possibleConstructorReturn(this, (NonNullTypeRef.__proto__ || Object.getPrototypeOf(NonNullTypeRef)).call(this));

        _this8.ofType = TypeRef.fromIntrospectionRef(introspectionRef.ofType);
        return _this8;
    }

    return NonNullTypeRef;
}(TypeRef);

var NamedTypeRef = exports.NamedTypeRef = function (_TypeRef2) {
    _inherits(NamedTypeRef, _TypeRef2);

    function NamedTypeRef(introspectionRef) {
        _classCallCheck(this, NamedTypeRef);

        if (!(typeof introspectionRef.name === 'string')) {
            throw new Error('Function  precondition failed: typeof introspectionRef.name === \'string\'');
        }

        var _this9 = _possibleConstructorReturn(this, (NamedTypeRef.__proto__ || Object.getPrototypeOf(NamedTypeRef)).call(this));

        _this9.typeName = introspectionRef.name;
        return _this9;
    }

    return NamedTypeRef;
}(TypeRef);

var ListTypeRef = exports.ListTypeRef = function (_TypeRef3) {
    _inherits(ListTypeRef, _TypeRef3);

    function ListTypeRef(introspectionRef) {
        _classCallCheck(this, ListTypeRef);

        if (!introspectionRef.ofType) {
            throw new Error('Function  precondition failed: introspectionRef.ofType');
        }

        var _this10 = _possibleConstructorReturn(this, (ListTypeRef.__proto__ || Object.getPrototypeOf(ListTypeRef)).call(this));

        _this10.ofType = TypeRef.fromIntrospectionRef(introspectionRef.ofType);
        return _this10;
    }

    return ListTypeRef;
}(TypeRef);

var EnumValue = exports.EnumValue = function EnumValue(introspectionValue) {
    _classCallCheck(this, EnumValue);

    if (!(typeof introspectionValue.name === 'string')) {
        throw new Error('Function  precondition failed: typeof introspectionValue.name === \'string\'');
    }

    if (!(introspectionValue.description === null || typeof introspectionValue.description === 'string')) {
        throw new Error('Function  precondition failed: introspectionValue.description === null || typeof introspectionValue.description === \'string\'');
    }

    if (!(typeof introspectionValue.isDeprecated === 'boolean')) {
        throw new Error('Function  precondition failed: typeof introspectionValue.isDeprecated === \'boolean\'');
    }

    if (!(!introspectionValue.isDeprecated || typeof introspectionValue.deprecationReason === 'string')) {
        throw new Error('Function  precondition failed: !introspectionValue.isDeprecated || typeof introspectionValue.deprecationReason === \'string\'');
    }

    if (!(introspectionValue.isDeprecated || introspectionValue.deprecationReason === null)) {
        throw new Error('Function  precondition failed: introspectionValue.isDeprecated || introspectionValue.deprecationReason === null');
    }

    this.name = introspectionValue.name;
    this.description = introspectionValue.description;
    this.isDeprecated = introspectionValue.isDeprecated;
    this.deprecationReason = introspectionValue.deprecationReason;
};