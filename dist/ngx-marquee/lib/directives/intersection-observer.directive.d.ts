import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IntersectionStatus } from '../observables/from-intersection-observer';
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
}
