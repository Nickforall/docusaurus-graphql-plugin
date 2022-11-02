"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertInputObjectToMarkdown = void 0;
const pushArguments_1 = require("./pushArguments");
function convertInputObjectToMarkdown(inputObject, options) {
    const lines = [];
    lines.push(`## ${inputObject.name}`, `\n\n`);
    lines.push(inputObject.description || "", `\n\n`);
    pushArguments_1.pushArguments(lines, Object.values(inputObject.getFields()), options);
    return lines.join("");
}
exports.convertInputObjectToMarkdown = convertInputObjectToMarkdown;
