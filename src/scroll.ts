import * as Easing from "./easing";

export interface ScrollOptions {
    duration?: number,
    animation?: string,
    anchors?: string[]
}

export default class Scroll {
    private duration: number;
    private anchors: string[];
    private animation: Easing.EasingFunction;

    constructor(options: ScrollOptions) {
        this.duration = options.duration || 500;
        this.anchors = options.anchors || Scroll.getAnchors();
        this.animation = Scroll.getAnimation(options.animation) || new Easing.EaseLinear();

        this.anchors.forEach(hash => this.setClickEvent(Scroll.getLinkFromHash(hash)));
    }

    private static getAnchors(): string[] {
        const elements: HTMLAnchorElement[] = Array.prototype.slice.call(document.getElementsByTagName("a"), 0);
        const anchors: HTMLAnchorElement[] = elements.filter(element => element.href.indexOf("#") !== -1);

        return anchors.map(element => element.hash);
    }

    private static getLinkFromHash(hash: string): HTMLAnchorElement {
        const elements: HTMLAnchorElement[] = Array.prototype.slice.call(document.getElementsByTagName("a"), 0);

        return elements.filter(element => element.hash === hash)[0];
    }

    private static getAnimation(animation: string): Easing.EasingFunction {
        switch (animation) {
            case "linear":
                return new Easing.EaseLinear();
            case "sineIn":
                return new Easing.EaseSineIn();
            case "sineOut":
                return new Easing.EaseSineOut();
            case "sineInOut":
                return new Easing.EaseSineInOut();
            case "quintIn":
                return new Easing.EaseQuintIn();
            case "quintOut":
                return new Easing.EaseQuintOut();
            case "quintInOut":
                return new Easing.EaseQuintInOut();
            case "quartIn":
                return new Easing.EaseQuartIn();
            case "quartOut":
                return new Easing.EaseQuartOut();
            case "quartInOut":
                return new Easing.EaseQuartInOut();
            case "quadIn":
                return new Easing.EaseQuadIn();
            case "quadOut":
                return new Easing.EaseQuadOut();
            case "quadInOut":
                return new Easing.EaseQuadInOut();
            case "cubeIn":
                return new Easing.EaseCubeIn();
            case "cubeOut":
                return new Easing.EaseCubeOut();
            case "cubeInOut":
                return new Easing.EaseCubeInOut();
            default:
                return new Easing.EaseLinear();
        }
    }

    private setClickEvent(element: HTMLAnchorElement) {
        element.onclick = event => {
            event.stopPropagation();
            event.preventDefault();

            this.scroll(element.hash);
        }
    }

    private scroll(location: string) {
        const windowPosition: number = window.pageYOffset;
        const locationPosition: number = document.querySelector(location).getBoundingClientRect().top;

        let startTime: number;
        const loop = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
            }

            const stopTime: number = startTime + this.duration;
            const options: Easing.EasingOptions = {
                min: startTime,
                max: stopTime,
                val: timestamp
            };

            const scrollPosition: number = Math.round(windowPosition + locationPosition * this.animation.getPosition(options));

            if (timestamp < stopTime) {
                window.scrollTo(0, scrollPosition);
                window.location.hash = location;
                window.requestAnimationFrame(loop);
            }
        };

        window.requestAnimationFrame(loop);
    }
}