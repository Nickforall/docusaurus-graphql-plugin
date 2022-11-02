"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushFields = void 0;
const pushArguments_1 = require("./pushArguments");
const parseMarkdown_1 = require("./parseMarkdown");
function pushFields(lines, fields, options) {
    lines.push(`<p style={{ marginBottom: "0.4em" }}><strong>Fields</strong></p>`, `\n\n`);
    lines.push(`<table>`, `\n`);
    lines.push(`<thead><tr><th>Name</th><th>Description</th></tr></thead>`, `\n`);
    lines.push(`<tbody>`, `\n`);
    fields.forEach((field) => {
        lines.push(`<tr>`, `\n`);
        const typeUrl = options.getTypePath(field.type);
        lines.push(`<td>`, `\n`, `${field.name}`, `<br />\n`, typeUrl
            ? `<a href="${typeUrl}"><code>${field.type.toJSON()}</code></a>`
            : `<code>${field.type.toJSON()}</code>`, `\n`, `</td>`, `\n`);
        lines.push(`<td>`, `\n`);
        if (field.deprecationReason) {
            lines.push(`<blockquote>Deprecated: ${field.deprecationReason}</blockquote>`, `\n\n`);
        }
        lines.push(parseMarkdown_1.parseMarkdown(field.description || ""), `\n`);
        if (field.args.length > 0) {
            lines.push(`\n`);
            pushArguments_1.pushArguments(lines, field.args, options);
        }
        lines.push(`</td>`, `\n`);
        lines.push(`</tr>`, `\n`);
    });
    lines.push(`</tbody>`, `\n`);
    lines.push(`</table>`, `\n\n`);
}
exports.pushFields = pushFields;
