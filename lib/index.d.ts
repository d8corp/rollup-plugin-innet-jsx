export default function jsx(): {
    options(opt: any): any;
    transform(code: string, id: string): {
        code: string;
        map: import("magic-string").SourceMap;
    };
};
