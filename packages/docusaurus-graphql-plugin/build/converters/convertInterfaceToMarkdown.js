"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertInterfaceToMarkdown = void 0;
const pushFields_1 = require("./pushFields");
const pushInterfaces_1 = require("./pushInterfaces");
function convertInterfaceToMarkdown(inter, implementedBy, options) {
    const lines = [];
    lines.push(`## ${inter.name}`, `\n\n`);
    lines.push(inter.description || "", `\n\n`);
    const subInterfaces = inter.getInterfaces();
    if (subInterfaces.length > 0) {
        pushInterfaces_1.pushInterfaces(lines, subInterfaces, options);
    }
    if (implementedBy.length > 0) {
        lines.push(`<p style={{ marginBottom: "0.4em" }}><strong>Implemented by</strong></p>`, `\n\n`);
        implementedBy.forEach((object) => {
            const typeUrl = options.getTypePath(object);
            lines.push(typeUrl ? `- [${object.name}](${typeUrl})` : `- ${object.name}`, `\n`);
        });
        lines.push(`\n`);
    }
    const fields = Object.values(inter.getFields());
    pushFields_1.pushFields(lines, fields, options);
    return lines.join("");
}
exports.convertInterfaceToMarkdown = convertInterfaceToMarkdown;
