"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushInterfaces = void 0;
function pushInterfaces(lines, interfaces, options) {
    lines.push(`<p style={{ marginBottom: "0.4em" }}><strong>Implements</strong></p>`, `\n\n`);
    interfaces.forEach((inter) => {
        const typeUrl = options.getTypePath(inter);
        lines.push(typeUrl ? `- [${inter.name}](${typeUrl})` : `- ${inter.name}`, `\n`);
    });
    lines.push(`\n`);
}
exports.pushInterfaces = pushInterfaces;
