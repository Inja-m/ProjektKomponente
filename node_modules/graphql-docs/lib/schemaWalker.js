'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getReferencesInSchema = getReferencesInSchema;

var _model = require('./model');

function getReferencesInSchema(schema) {
    var visitQueue = [];
    var visited = [];

    visitQueue.push(schema.getQueryType().name);

    var mutationType = schema.getMutationType();
    if (mutationType) {
        visitQueue.push(mutationType.name);
    }

    while (visitQueue.length) {
        var typeId = visitQueue.shift();
        if (visited.indexOf(typeId) !== -1) {
            continue;
        }

        var type = schema.types[typeId];

        if (!type) {
            throw new Error('Type ' + typeId + ' not found in schema');
        }

        var newRefs = getReferencesInType(type);

        visited.push(typeId);

        [].push.apply(visitQueue, Object.keys(newRefs));
    }

    return visited;
}

function getReferencesInType(type) {
    var refs = {};
    addTypeToBag(type, refs);

    if (type instanceof _model.ObjectType) {
        type.fields.forEach(function (f) {
            return getReferencesInField(f, refs);
        });
        type.interfaces.forEach(function (r) {
            return addTypeRefToBag(r, refs);
        });
    }

    if (type instanceof _model.InterfaceType) {
        type.fields.forEach(function (f) {
            return getReferencesInField(f, refs);
        });
        type.possibleTypes.forEach(function (r) {
            return addTypeRefToBag(r, refs);
        });
    }

    if (type instanceof _model.UnionType) {
        type.possibleTypes.forEach(function (r) {
            return addTypeRefToBag(r, refs);
        });
    }

    if (type instanceof _model.InputObjectType) {
        type.inputFields.forEach(function (iv) {
            return addTypeRefToBag(iv.type, refs);
        });
    }

    return refs;
}

function getReferencesInField(field, refs) {
    addTypeRefToBag(field.type, refs);

    field.args.forEach(function (arg) {
        return addTypeRefToBag(arg.type, refs);
    });
}

function addTypeRefToBag(typeRef, refs) {
    if (typeRef instanceof _model.NonNullTypeRef) {
        addTypeRefToBag(typeRef.ofType, refs);
    } else if (typeRef instanceof _model.ListTypeRef) {
        addTypeRefToBag(typeRef.ofType, refs);
    } else if (typeRef instanceof _model.NamedTypeRef) {
        refs[typeRef.typeName] = (refs[typeRef.typeName] || 0) + 1;
    } else {
        throw new Error('Unknown type ref: ' + typeRef.toString());
    }
}

function addTypeToBag(type, refs) {
    refs[type.name] = (refs[type.name] || 0) + 1;
}