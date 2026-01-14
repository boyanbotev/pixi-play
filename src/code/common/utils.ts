    export const clamp = (num: number, lower: number, upper: number) => {
        return Math.min(Math.max(num, lower), upper);
    }

    export const lerp = (a: number, b: number, t: number) => {
        return (1 - t) * a + t * b;
    }