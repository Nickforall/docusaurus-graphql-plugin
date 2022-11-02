"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = void 0;
const marked_1 = __importDefault(require("marked"));
function parseMarkdown(markdown) {
    const walkTokens = (token) => {
        // make the Markdown compatible with MDX by escaping curly braces
        if (token.type === "text") {
            token.text = token.text
                .replace(/\{/g, "&lbrace;")
                .replace(/\}/g, "&rbrace;");
        }
        if (token.type === "codespan" || token.type === "code") {
            token.text = token.text.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
        }
    };
    return marked_1.default
        .parse(markdown, {
        // marked's types are buggy
        walkTokens: walkTokens,
    })
        .trim();
}
exports.parseMarkdown = parseMarkdown;
