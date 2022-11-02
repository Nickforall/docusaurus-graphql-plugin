"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertInputObjectToMarkdown = void 0;
const pushArguments_1 = require("./pushArguments");
const parseMarkdown_1 = require("./parseMarkdown");
function convertInputObjectToMarkdown(inputObject, options) {
    const lines = [];
    lines.push(`## ${inputObject.name}`, `\n\n`);
    lines.push(parseMarkdown_1.parseMarkdown(inputObject.description || ""), `\n\n`);
    pushArguments_1.pushArguments(lines, Object.values(inputObject.getFields()), options);
    return lines.join("");
}
exports.convertInputObjectToMarkdown = convertInputObjectToMarkdown;
