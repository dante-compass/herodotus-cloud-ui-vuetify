export declare const useMdiIconStore: import('pinia').StoreDefinition<"MdiIcon", {
    icons: string[];
}, {
    getAllIcons: (state: {
        icons: string[];
    } & import('pinia').PiniaCustomStateProperties<{
        icons: string[];
    }>) => string[];
}, {
    initialize(): void;
    search(query: string): string[];
}>;
