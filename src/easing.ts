export interface EasingOptions {
    min: number,
    max: number,
    val: number
}

export interface EasingFunction {
    getPosition(options: EasingOptions): number
}

export abstract class Easing implements EasingFunction {
    static clamp(options: EasingOptions): number {
        return Math.min(Math.max(options.val, options.min), options.max);
    }

    static percentage(options: EasingOptions): number {
        return (Easing.clamp(options) - options.min) / (options.max - options.min);
    }

    public abstract getPosition(options: EasingOptions): number
}

export class EaseLinear extends Easing {
    public getPosition(options: EasingOptions): number {
        return EaseLinear.percentage(options);
    }
}

export class EaseSineIn extends Easing {
    public getPosition(options: EasingOptions): number {
        return 1 - Math.cos(EaseSineIn.percentage(options) * Math.PI / 2);
    }
}

export class EaseSineOut extends Easing {
    public getPosition(options: EasingOptions): number {
        return Math.sin(EaseSineOut.percentage(options) * Math.PI / 2);
    }
}

export class EaseSineInOut extends Easing {
    public getPosition(options: EasingOptions): number {
        return -(Math.cos(Math.PI * EaseSineInOut.percentage(options)) - 1) / 2;
    }
}