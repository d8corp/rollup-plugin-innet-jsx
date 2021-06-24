export default function jsx(): {
    options(opt: any): any;
    transform(code: string, id: string): import("innet-jsx").TransformResult;
};
