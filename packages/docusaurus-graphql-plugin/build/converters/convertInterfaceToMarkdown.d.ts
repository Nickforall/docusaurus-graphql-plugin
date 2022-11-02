import { GraphQLInterfaceType, GraphQLObjectType } from "graphql";
import { MarkdownConverterOptions } from "../types";
export declare function convertInterfaceToMarkdown(inter: GraphQLInterfaceType, implementedBy: Array<GraphQLObjectType | GraphQLInterfaceType>, options: MarkdownConverterOptions): string;
