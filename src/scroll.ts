import Easing, { EasingType, EasingPosition } from "./easing";

export interface ScrollOptions {
    duration?: number,
    animation?: string,
    anchors?: Array<string>
}

export default class Scroll implements ScrollOptions {
    public duration: number;
    public animation: string;
    public anchors: Array<string>;

    private scrolling: boolean;

    constructor(options: ScrollOptions) {
        this.duration = options.duration || 500;
        this.animation = options.animation || EasingType[EasingType.linear];
        this.anchors = options.anchors || this.getAnchors();

        this.scrolling = false;

        this.anchors.forEach(hash => this.setClickEvent(this.getLinkFromHash(hash)));
    }

    private getAnchors(): Array<string> {
        const elements: Array<HTMLAnchorElement> = Array.prototype.slice.call(document.getElementsByTagName("a"), 0);
        const anchors: Array<HTMLAnchorElement> = elements.filter(element => element.href.indexOf("#") !== -1);

        return elements.map(element => element.hash);
    }

    private getLinkFromHash(hash: string): HTMLAnchorElement {
        const elements: Array<HTMLAnchorElement> = Array.prototype.slice.call(document.getElementsByTagName("a"), 0);

        return elements.filter(element => element.hash === hash)[0]; 
    }

    private setClickEvent(element: HTMLAnchorElement) {
        element.onclick = event => {
            event.stopPropagation();
            event.preventDefault();

            if (!this.scrolling) {
                this.scroll(element.hash);
            }
        }
    }

    private scroll(location: string) {
        const windowPosition: number = window.pageYOffset;
        const locationPosition: number = document.querySelector(location).getBoundingClientRect().top;

        this.scrolling = true;

        const easing: Easing = new Easing({
            type: EasingType[this.animation]
        });

        let startTime: number;
        const loop = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
            }

            const stopTime: number = startTime + this.duration;
            const position: EasingPosition = {
                min: startTime,
                max: stopTime,
                val: timestamp
            }

            const scrollPosition: number = Math.round(windowPosition + locationPosition * easing.getPosition(position));

            if (timestamp < stopTime) {
                window.scrollTo(0, scrollPosition);
                window.location.hash = location;
                window.requestAnimationFrame(loop);
            } else {
                this.scrolling = false;
            }
        }

        window.requestAnimationFrame(loop);
    }
}