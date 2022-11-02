"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMutationToMarkdown = void 0;
const pushArguments_1 = require("./pushArguments");
function convertMutationToMarkdown(mutation, options) {
    const lines = [];
    lines.push(`## ${mutation.name}`, `\n\n`);
    const typeUrl = options.getTypePath(mutation.type);
    lines.push(`**Type:** ${typeUrl
        ? `[${mutation.type.toJSON()}](${typeUrl})`
        : mutation.type.toJSON()}`, `\n\n`);
    if (mutation.deprecationReason) {
        lines.push(`> Deprecated: ${mutation.deprecationReason}`, `\n\n`);
    }
    lines.push(mutation.description || "", `\n\n`);
    if (mutation.args.length > 0) {
        pushArguments_1.pushArguments(lines, mutation.args, options);
    }
    return lines.join("");
}
exports.convertMutationToMarkdown = convertMutationToMarkdown;
