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

export class EaseQuintIn extends Easing {
    getPosition(options: EasingOptions): number {
        return Math.pow(EaseQuintIn.percentage(options), 5);
    }
}

export class EaseQuintOut extends Easing {
    getPosition(options: EasingOptions): number {
        return 1 - Math.pow(1 - EaseQuintOut.percentage(options), 5);
    }
}

export class EaseQuintInOut extends Easing {
    getPosition(options: EasingOptions): number {
        const val: number = EaseQuintInOut.percentage(options);

        return val < 0.5 ? 16 * Math.pow(val, 5) : 1 - Math.pow(-2 * val + 2, 5) / 2;
    }
}

export class EaseQuartIn extends Easing {
    getPosition(options: EasingOptions): number {
        return Math.pow(EaseQuartIn.percentage(options), 4);
    }
}

export class EaseQuartOut extends Easing {
    getPosition(options: EasingOptions): number {
        return 1 - Math.pow(1 - EaseQuartOut.percentage(options), 4);
    }
}

export class EaseQuartInOut extends Easing {
    getPosition(options: EasingOptions): number {
        const val: number = EaseQuartInOut.percentage(options);

        return val < 0.5 ? 8 * Math.pow(val, 4) : 1 - Math.pow(-2 * val + 2, 4) / 2;
    }
}

export class EaseQuadIn extends Easing {
    getPosition(options: EasingOptions): number {
        return Math.pow(EaseQuadIn.percentage(options), 2);
    }
}

export class EaseQuadOut extends Easing {
    getPosition(options: EasingOptions): number {
        const val: number = EaseQuadOut.percentage(options);

        return 1 - (1 - val) * (1 - val);
    }
}

export class EaseQuadInOut extends Easing {
    getPosition(options: EasingOptions): number {
        const val: number = EaseQuadInOut.percentage(options);

        return val < 0.5 ? 2 * Math.pow(val, 2) : 1 - Math.pow(-2 * val + 2, 2) / 2;
    }
}

export class EaseCubeIn extends Easing {
    getPosition(options: EasingOptions): number {
        return Math.pow(EaseCubeIn.percentage(options), 3);
    }
}

export class EaseCubeOut extends Easing {
    getPosition(options: EasingOptions): number {
        return 1 - Math.pow(1 - EaseCubeOut.percentage(options), 3);
    }
}

export class EaseCubeInOut extends Easing {
    getPosition(options: EasingOptions): number {
        const val: number = EaseCubeInOut.percentage(options);

        return val < 0.5 ? 4 * Math.pow(val, 3) : 1 - Math.pow(-2 * val + 2, 3) / 2;
    }
}

export class EaseCircleIn extends Easing {
    getPosition(options: EasingOptions): number {
        return 1 - Math.sqrt(1 - Math.pow(EaseCircleIn.percentage(options), 2));
    }
}

export class EaseCircleOut extends Easing {
    getPosition(options: EasingOptions): number {
        return Math.sqrt(1 - Math.pow(EaseCircleOut.percentage(options) - 1, 2));
    }
}

export class EaseCircleInOut extends Easing {
    getPosition(options: EasingOptions): number {
        const val: number = EaseCircleInOut.percentage(options);

        return val < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * val, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * val + 2, 2)) + 1) / 2;
    }
}