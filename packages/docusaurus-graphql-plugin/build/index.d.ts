import { LoadContext, Plugin, OptionValidationContext, ValidationResult } from "@docusaurus/types";
interface PluginOptions {
    id: string;
    schema: string;
    routeBasePath: string;
    sidebar?: {
        label: string;
        position: number;
    };
}
export declare function validateOptions({ options, validate, }: OptionValidationContext<PluginOptions>): ValidationResult<PluginOptions>;
export default function plugin(context: LoadContext, options: PluginOptions): Plugin<void>;
export {};
