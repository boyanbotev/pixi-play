import gsap from "gsap";

    export const clamp = (num: number, lower: number, upper: number) => {
        return Math.min(Math.max(num, lower), upper);
    }

    export const lerp = (a: number, b: number, t: number) => {
        return (1 - t) * a + t * b;
    }

    export const delay = async (duration: number) => {
        return gsap.to({}, { duration });
    }

    export const getRandomInt = (min: number, max: number) => {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    export const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

    export class Vector2 {
        x: number;
        y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public static distance(v1: Vector2, v2: Vector2) {
            var dx = v1.x - v2.x;
            var dy = v1.y - v2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }