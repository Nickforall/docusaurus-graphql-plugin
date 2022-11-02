"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelativeTypeUrl = void 0;
const graphql_1 = require("graphql");
const marked_1 = require("marked");
const converters = __importStar(require("./converters"));
const slugger = new marked_1.Slugger();
const sluggify = (name) => slugger.slug(name, { dryrun: true });
function getBaseType(type) {
    if (graphql_1.isNonNullType(type)) {
        return getBaseType(type.ofType);
    }
    if (graphql_1.isListType(type)) {
        return getBaseType(type.ofType);
    }
    return type;
}
function getRelativeTypeUrl(type) {
    const baseType = getBaseType(type);
    const convertersList = Object.values(converters);
    const converter = convertersList.find((otherConverter) => otherConverter.matches(baseType));
    if (converter == null) {
        console.warn(`Failed to generate a relative URL to type "${baseType.name}"`);
        return undefined;
    }
    return `/${converter.id}#${sluggify(baseType.name)}`;
}
exports.getRelativeTypeUrl = getRelativeTypeUrl;
