import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IntersectionStatus } from '../observables/from-intersection-observer';
import * as i0 from "@angular/core";
export declare class IntersectionObserverDirective implements OnInit, OnDestroy {
    private _element;
    intersectionDebounce: number;
    intersectionRootMargin: string;
    intersectionRoot: HTMLElement;
    intersectionThreshold: number | number[];
    visibilityChange: EventEmitter<IntersectionStatus>;
    private _destroy$;
    constructor(_element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntersectionObserverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IntersectionObserverDirective, "[intersectionObserver]", never, { "intersectionDebounce": "intersectionDebounce"; "intersectionRootMargin": "intersectionRootMargin"; "intersectionRoot": "intersectionRoot"; "intersectionThreshold": "intersectionThreshold"; }, { "visibilityChange": "visibilityChange"; }, never>;
}
