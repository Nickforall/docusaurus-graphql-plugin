"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const joi_1 = __importDefault(require("joi"));
const load_1 = require("@graphql-tools/load");
const url_loader_1 = require("@graphql-tools/url-loader");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const json_file_loader_1 = require("@graphql-tools/json-file-loader");
const url_join_1 = __importDefault(require("url-join"));
const converters = __importStar(require("./converters"));
const getRelativeTypeUrl_1 = require("./getRelativeTypeUrl");
const OptionsSchema = joi_1.default.object({
    id: joi_1.default.string(),
    schema: joi_1.default.string().required(),
    routeBasePath: joi_1.default.string().default("/docs/api/"),
    sidebar: joi_1.default.object({
        label: joi_1.default.string(),
        position: joi_1.default.number(),
    }),
});
function validateOptions({ options, validate, }) {
    return validate(OptionsSchema, options);
}
exports.validateOptions = validateOptions;
function plugin(context, options) {
    return {
        name: "docusaurus-graphql-plugin",
        extendCli: (cli) => {
            cli
                .command([
                "docs",
                "generate",
                "graphql",
                options.id === "default" ? null : options.id,
            ]
                .filter(Boolean)
                .join(":"))
                .description("Generate the GraphQL documentation based on the schema")
                .action(() => __awaiter(this, void 0, void 0, function* () {
                const schema = yield load_1.loadSchema(options.schema, {
                    loaders: [
                        new url_loader_1.UrlLoader(),
                        new graphql_file_loader_1.GraphQLFileLoader(),
                        new json_file_loader_1.JsonFileLoader(),
                    ],
                });
                const baseUrl = url_join_1.default(context.baseUrl, options.routeBasePath);
                const outputPath = path_1.default.join(context.siteDir, "docs", ...options.routeBasePath
                    // the files are generated in the docs folder even if the routeBasePath doesn't contain /docs
                    // e.g /docs/api and /api both result in the files being generated in docs/api
                    .replace(/^\/docs/, "")
                    // routeBasePath is an URL path so the delimiter is known
                    // but outputPath is used to write files, with OS dependent delimiters
                    // so that's taken care of by path.join
                    .split("/"));
                const convertersList = Object.values(converters);
                for (let index = 0; index < convertersList.length; index++) {
                    const converter = convertersList[index];
                    const markdown = converter.convertToMarkdown(schema, {
                        getTypePath: (type) => {
                            const relativeTypeUrl = getRelativeTypeUrl_1.getRelativeTypeUrl(type);
                            return relativeTypeUrl
                                ? url_join_1.default(baseUrl, relativeTypeUrl)
                                : undefined;
                        },
                    });
                    if (!markdown) {
                        // do not create an empty file
                        continue;
                    }
                    yield fs_extra_1.default.outputFile(path_1.default.join(outputPath, `${converter.id}.md`), [
                        `---`,
                        `id: ${converter.id}`,
                        `title: ${converter.title}`,
                        `slug: ${converter.id}`,
                        `sidebar_position: ${index + 1}`,
                        `---`,
                        ``,
                        markdown,
                    ].join(`\n`));
                }
                if (options.sidebar) {
                    yield fs_extra_1.default.outputFile(path_1.default.join(outputPath, "_category_.json"), JSON.stringify({
                        label: options.sidebar.label,
                        position: options.sidebar.position,
                    }, null, 2));
                }
            }));
        },
    };
}
exports.default = plugin;
