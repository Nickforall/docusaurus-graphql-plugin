import { GraphQLField } from "graphql";
import { MarkdownConverterOptions } from "../types";
export declare function convertMutationToMarkdown(mutation: GraphQLField<any, any>, options: MarkdownConverterOptions): string;
