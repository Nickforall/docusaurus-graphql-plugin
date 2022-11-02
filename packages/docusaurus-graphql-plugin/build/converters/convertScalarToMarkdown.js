"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertScalarToMarkdown = void 0;
function convertScalarToMarkdown(scalar, _) {
    const lines = [];
    lines.push(`## ${scalar.name}`, `\n\n`);
    lines.push(scalar.description || "", `\n\n`);
    return lines.join("");
}
exports.convertScalarToMarkdown = convertScalarToMarkdown;
