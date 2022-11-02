"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushArguments = void 0;
const parseMarkdown_1 = require("./parseMarkdown");
function pushArguments(lines, args, options) {
    lines.push(`<p style={{ marginBottom: "0.4em" }}><strong>Arguments</strong></p>`, `\n\n`);
    lines.push(`<table>`, `\n`);
    lines.push(`<thead><tr><th>Name</th><th>Description</th></tr></thead>`, `\n`);
    lines.push(`<tbody>`, `\n`);
    args.forEach((arg) => {
        lines.push(`<tr>`, `\n`);
        const typeUrl = options.getTypePath(arg.type);
        lines.push(`<td>`, `\n`, `${arg.name}`, `<br />\n`, typeUrl
            ? `<a href="${typeUrl}"><code>${arg.type.toJSON()}</code></a>`
            : `<code>${arg.type.toJSON()}</code>`, `\n`, `</td>`, `\n`);
        lines.push(`<td>`, `\n`);
        if (arg.deprecationReason) {
            lines.push(`<blockquote>Deprecated: ${arg.deprecationReason}</blockquote>`, `\n\n`);
        }
        lines.push(parseMarkdown_1.parseMarkdown(arg.description || ""), `\n`);
        lines.push(`</td>`, `\n`);
        lines.push(`</tr>`, `\n`);
    });
    lines.push(`</tbody>`, `\n`);
    lines.push(`</table>`, `\n\n`);
}
exports.pushArguments = pushArguments;
