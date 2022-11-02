"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectToMarkdown = void 0;
const pushFields_1 = require("./pushFields");
const pushInterfaces_1 = require("./pushInterfaces");
function convertObjectToMarkdown(object, options) {
    const lines = [];
    lines.push(`## ${object.name}`, `\n\n`);
    lines.push(object.description || "", `\n\n`);
    const interfaces = object.getInterfaces();
    if (interfaces.length > 0) {
        pushInterfaces_1.pushInterfaces(lines, interfaces, options);
    }
    const fields = Object.values(object.getFields());
    pushFields_1.pushFields(lines, fields, options);
    return lines.join("");
}
exports.convertObjectToMarkdown = convertObjectToMarkdown;
