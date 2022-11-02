"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertQueryToMarkdown = void 0;
const pushArguments_1 = require("./pushArguments");
function convertQueryToMarkdown(query, options) {
    const lines = [];
    lines.push(`## ${query.name}`, `\n\n`);
    const typeUrl = options.getTypePath(query.type);
    lines.push(`**Type:** ${typeUrl ? `[${query.type.toJSON()}](${typeUrl})` : query.type.toJSON()}`, `\n\n`);
    if (query.deprecationReason) {
        lines.push(`> Deprecated: ${query.deprecationReason}`, `\n\n`);
    }
    lines.push(query.description || "", `\n\n`);
    if (query.args.length > 0) {
        pushArguments_1.pushArguments(lines, query.args, options);
    }
    return lines.join("");
}
exports.convertQueryToMarkdown = convertQueryToMarkdown;
