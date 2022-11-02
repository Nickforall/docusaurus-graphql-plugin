import { GraphQLArgument, GraphQLInputField } from "graphql";
import { MarkdownConverterOptions } from "../types";
export declare function pushArguments(lines: string[], args: readonly GraphQLArgument[] | GraphQLInputField[], options: MarkdownConverterOptions): void;
