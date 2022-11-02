import { GraphQLNamedType, GraphQLSchema } from "graphql";
import { MarkdownConverterOptions } from "../types";
export declare const queries: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const mutations: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const subscriptions: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(): string;
};
export declare const objects: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const interfaces: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const enums: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const unions: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const inputObjects: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
export declare const scalars: {
    id: string;
    title: string;
    matches(type: GraphQLNamedType): boolean;
    convertToMarkdown(schema: GraphQLSchema, options: MarkdownConverterOptions): string;
};
