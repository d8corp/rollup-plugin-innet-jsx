export default function jsx(): {
    options(opt: any): any;
    transform(code: any, id: any): {
        code: string;
        map: import("magic-string").SourceMap;
    };
};
