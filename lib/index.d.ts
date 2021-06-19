export default function jsx(): {
    transform(code: any, id: any): {
        code: string;
        map: import("magic-string").SourceMap;
    };
};
