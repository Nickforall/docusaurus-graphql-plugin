"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertUnionToMarkdown = void 0;
const parseMarkdown_1 = require("./parseMarkdown");
function convertUnionToMarkdown(union, options) {
    const lines = [];
    lines.push(`## ${union.name}`, `\n\n`);
    lines.push(parseMarkdown_1.parseMarkdown(union.description || ""), `\n\n`);
    lines.push(`<p style={{ marginBottom: "0.4em" }}><strong>Possible types</strong></p>`, `\n\n`);
    union.getTypes().forEach((type) => {
        const typeUrl = options.getTypePath(type);
        lines.push(typeUrl ? `- [${type.name}](${typeUrl})` : `- ${type.name}`, `\n`);
    });
    lines.push(`\n`);
    return lines.join("");
}
exports.convertUnionToMarkdown = convertUnionToMarkdown;
