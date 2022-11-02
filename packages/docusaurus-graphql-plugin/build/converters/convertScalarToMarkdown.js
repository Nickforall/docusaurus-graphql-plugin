"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertScalarToMarkdown = void 0;
const parseMarkdown_1 = require("./parseMarkdown");
function convertScalarToMarkdown(scalar, _) {
    const lines = [];
    lines.push(`## ${scalar.name}`, `\n\n`);
    lines.push(parseMarkdown_1.parseMarkdown(scalar.description || ""), `\n\n`);
    return lines.join("");
}
exports.convertScalarToMarkdown = convertScalarToMarkdown;
