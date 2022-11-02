"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scalars = exports.inputObjects = exports.unions = exports.enums = exports.interfaces = exports.objects = exports.subscriptions = exports.mutations = exports.queries = void 0;
const graphql_1 = require("graphql");
const convertEnumToMarkdown_1 = require("./convertEnumToMarkdown");
const convertInputObjectToMarkdown_1 = require("./convertInputObjectToMarkdown");
const convertInterfaceToMarkdown_1 = require("./convertInterfaceToMarkdown");
const convertMutationToMarkdown_1 = require("./convertMutationToMarkdown");
const convertObjectToMarkdown_1 = require("./convertObjectToMarkdown");
const convertQueryToMarkdown_1 = require("./convertQueryToMarkdown");
const convertScalarToMarkdown_1 = require("./convertScalarToMarkdown");
const convertUnionToMarkdown_1 = require("./convertUnionToMarkdown");
function sortTypesByName(types) {
    return types.sort((a, b) => a.name.localeCompare(b.name));
}
exports.queries = {
    id: "queries",
    title: "Queries",
    matches(type) {
        return type.name === "Query";
    },
    convertToMarkdown(schema, options) {
        const rootType = schema.getRootType(graphql_1.OperationTypeNode.QUERY);
        const queries = rootType
            ? sortTypesByName(Object.values(rootType.getFields()))
            : [];
        return queries
            .map((query) => convertQueryToMarkdown_1.convertQueryToMarkdown(query, options))
            .join("");
    },
};
exports.mutations = {
    id: "mutations",
    title: "Mutations",
    matches(type) {
        return type.name === "Mutation";
    },
    convertToMarkdown(schema, options) {
        const rootType = schema.getRootType(graphql_1.OperationTypeNode.MUTATION);
        const mutations = rootType
            ? sortTypesByName(Object.values(rootType.getFields()))
            : [];
        return mutations
            .map((mutation) => convertMutationToMarkdown_1.convertMutationToMarkdown(mutation, options))
            .join("");
    },
};
exports.subscriptions = {
    id: "subscriptions",
    title: "Subscriptions",
    matches(type) {
        return type.name === "Subscription";
    },
    convertToMarkdown() {
        console.warn(`Subscriptions are not supported yet`);
        return "";
    },
};
exports.objects = {
    id: "objects",
    title: "Objects",
    matches(type) {
        if ([exports.queries, exports.mutations, exports.subscriptions].some((converter) => converter.matches(type))) {
            return false;
        }
        if (type.name.startsWith("__")) {
            return false;
        }
        return graphql_1.isObjectType(type);
    },
    convertToMarkdown(schema, options) {
        const objects = sortTypesByName(Object.values(schema.getTypeMap()).filter((type) => this.matches(type)));
        return objects
            .map((object) => convertObjectToMarkdown_1.convertObjectToMarkdown(object, options))
            .join("");
    },
};
exports.interfaces = {
    id: "interfaces",
    title: "Interfaces",
    matches(type) {
        return graphql_1.isInterfaceType(type);
    },
    convertToMarkdown(schema, options) {
        const interfaces = sortTypesByName(Object.values(schema.getTypeMap()).filter((type) => this.matches(type)));
        return interfaces
            .map((inter) => {
            const implementedBy = Object.values(schema.getTypeMap()).filter((type) => (graphql_1.isObjectType(type) || graphql_1.isInterfaceType(type)) &&
                type
                    .getInterfaces()
                    .some((otherInter) => otherInter.name === inter.name));
            return convertInterfaceToMarkdown_1.convertInterfaceToMarkdown(inter, implementedBy, options);
        })
            .join("");
    },
};
exports.enums = {
    id: "enums",
    title: "Enums",
    matches(type) {
        return graphql_1.isEnumType(type) && !type.name.startsWith("__");
    },
    convertToMarkdown(schema, options) {
        const enums = sortTypesByName(Object.values(schema.getTypeMap()).filter((type) => this.matches(type)));
        return enums.map((enm) => convertEnumToMarkdown_1.convertEnumToMarkdown(enm, options)).join("");
    },
};
exports.unions = {
    id: "unions",
    title: "Unions",
    matches(type) {
        return graphql_1.isUnionType(type);
    },
    convertToMarkdown(schema, options) {
        const unions = sortTypesByName(Object.values(schema.getTypeMap()).filter((type) => this.matches(type)));
        return unions
            .map((union) => convertUnionToMarkdown_1.convertUnionToMarkdown(union, options))
            .join("");
    },
};
exports.inputObjects = {
    id: "inputObjects",
    title: "Input objects",
    matches(type) {
        return graphql_1.isInputObjectType(type);
    },
    convertToMarkdown(schema, options) {
        const inputObjects = sortTypesByName(Object.values(schema.getTypeMap()).filter((type) => this.matches(type)));
        return inputObjects
            .map((inputObject) => convertInputObjectToMarkdown_1.convertInputObjectToMarkdown(inputObject, options))
            .join("");
    },
};
exports.scalars = {
    id: "scalars",
    title: "Scalars",
    matches(type) {
        return graphql_1.isScalarType(type);
    },
    convertToMarkdown(schema, options) {
        const scalars = sortTypesByName(Object.values(schema.getTypeMap()).filter((type) => this.matches(type)));
        return scalars
            .map((scalar) => convertScalarToMarkdown_1.convertScalarToMarkdown(scalar, options))
            .join("");
    },
};
