export enum EasingType {
    linear,
    sineIn,
    sineOut,
    sineInOut
}

export interface EasingOptions {
    type?: EasingType
}

export interface EasingPosition {
    min: number,
    max: number,
    val: number
}

export interface EasingInterface {
    type: EasingType,
    getPosition(options: EasingPosition): number
}

export default class Easing implements EasingInterface {
    public type: EasingType;

    /**
     * @constructor
     * @param {EasingOptions} options Contains options name of easing function
     */
    constructor(options: EasingOptions) {
        this.type = options.type || EasingType.linear;
    }

    /**
     * Returns the input value clamped to the lower and higher limits.
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Clamped value.
     */
    private clamp(position: EasingPosition): number {
        return Math.min(Math.max(position.val, position.min), position.max);
    }

    /**
     * Returns % value from specified range.
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Computed value (% in decimal format).
     */
    private perc(position: EasingPosition): number {
        return (this.clamp(position) - position.min) / (position.max - position.min);
    }

    /**
     * Linear function. `f(t) = t` where `t` is time.
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Computed position (% in decimal format).
     */
    private linear(position: EasingPosition): number {
        return this.perc(position);
    }

    /**
     * EaseSineIn function. `f(t) = 1 - cos(t * pi / 2)` where `t` is time.
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Computed position (% in decimal format).
     */
    private sineIn(position: EasingPosition): number {
        return 1 - Math.cos(this.perc(position) * Math.PI / 2);
    }

    /**
     * EaseSineOut function. `f(t) = sin(t * pi / 2)` where `t` is time.
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Computed position (% in decimal format).
     */
    private sineOut(position: EasingPosition): number {
        return Math.sin(this.perc(position) * Math.PI / 2);
    }

    /**
     * EaseSineInOut function. `f(t) = -(cos(pi * t) - 1) / 2` where `t` is time.
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Computed position (% in decimal format).
     */
    private sineInOut(position: EasingPosition): number {
        return -(Math.cos(Math.PI * this.perc(position)) - 1) / 2;
    }

    /**
     * Returns position according to selected easing function (% in decimal format).
     * @param {EasingPosition} position Position values `min, max, val`.
     * @return {number} Computed value (% in decimal format).
     */
    public getPosition(position: EasingPosition): number {
        switch (this.type) {
            case EasingType.linear:
                return this.linear(position);
            case EasingType.sineIn:
                return this.sineIn(position);
            case EasingType.sineOut:
                return this.sineOut(position);
            case EasingType.sineInOut:
                return this.sineInOut(position);
            default:
                return this.linear(position);
        }
    }
}