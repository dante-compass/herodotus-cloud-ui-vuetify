type Offset = {
    x?: number | string;
    y?: number | string;
};
type AnimationType = 'rotate' | 'rotate3d' | 'hover';
export type PrismaticBurstProps = {
    intensity?: number;
    speed?: number;
    animationType?: AnimationType;
    colors?: string[];
    distort?: number;
    paused?: boolean;
    offset?: Offset;
    hoverDampness?: number;
    rayCount?: number;
    mixBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity' | 'none';
};
declare const __VLS_export: import('vue').DefineComponent<PrismaticBurstProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<PrismaticBurstProps> & Readonly<{}>, {
    speed: number;
    intensity: number;
    animationType: AnimationType;
    distort: number;
    paused: boolean;
    offset: Offset;
    hoverDampness: number;
    mixBlendMode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity" | "none";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
