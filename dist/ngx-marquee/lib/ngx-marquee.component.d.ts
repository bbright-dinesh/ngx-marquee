import { AfterViewInit, EventEmitter, Renderer2 } from '@angular/core';
import { IntersectionStatus } from './observables/from-intersection-observer';
import * as i0 from "@angular/core";
export declare enum MarqueeState {
    Running = "running",
    Paused = "paused",
    Stopped = "stopped"
}
declare enum MarqueeDirection {
    Left = "left",
    Right = "right",
    Alternate = "alternate"
}
declare enum MarqueeAnimation {
    Default = "default",
    SlideInUp = "slideInUp",
    SlideInDown = "slideInDown"
}
export declare class NgxMarqueeComponent implements AfterViewInit {
    private _renderer;
    direction: MarqueeDirection;
    duration: string;
    pauseOnHover: boolean;
    animation: MarqueeAnimation;
    taskOnUpdateContent: () => void;
    taskOnUpdateDuration: () => string;
    pendingUpdates: boolean;
    pendingUpdatesChange: EventEmitter<boolean>;
    playStateChange: EventEmitter<MarqueeState>;
    tape: HTMLElement;
    readonly root: HTMLElement;
    readonly rootMargin: string;
    readonly threshold: number | number[];
    readonly debounce: number;
    private _elementMarquee;
    private _outerFlags;
    private _dataPlayState;
    constructor(_renderer: Renderer2);
    ngAfterViewInit(): void;
    playPause(): void;
    stop(): void;
    restart(): void;
    onVisibilityChanged(status: IntersectionStatus, control: number): void;
    private _execProcedure;
    private _setDataPlayState;
    private _setPendingUpdates;
    private _resetMarquee;
    private _calculateDuration;
    private _playElement;
    private _pauseElement;
    private _stopElement;
    private _setAnimationState;
    private _resetAnimation;
    private _setDataAttrState;
    private _fixAnimationState;
    static ɵfac: i0.ɵɵFactoryDef<NgxMarqueeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NgxMarqueeComponent, "ngx-marquee", never, { "direction": "direction"; "duration": "duration"; "pauseOnHover": "pauseOnHover"; "animation": "animation"; "taskOnUpdateContent": "taskOnUpdateContent"; "taskOnUpdateDuration": "taskOnUpdateDuration"; "pendingUpdates": "pendingUpdates"; }, { "pendingUpdatesChange": "pendingUpdatesChange"; "playStateChange": "playStateChange"; }, never, ["*"]>;
}
export {};
//# sourceMappingURL=ngx-marquee.component.d.ts.map