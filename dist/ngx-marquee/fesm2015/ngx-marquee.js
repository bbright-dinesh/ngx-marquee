import { EventEmitter, ɵɵdirectiveInject, ElementRef, ɵɵdefineDirective, ɵsetClassMetadata, Directive, Input, Output, Renderer2, ɵɵdefineComponent, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵprojectionDef, ɵɵelementStart, ɵɵlistener, ɵɵtext, ɵɵelementEnd, ɵɵprojection, ɵɵproperty, ɵɵpureFunction1, ɵɵadvance, Component, ChangeDetectionStrategy, ViewChild, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { NgClass, CommonModule } from '@angular/common';

var IntersectionStatus;
(function (IntersectionStatus) {
    IntersectionStatus["Visible"] = "Visible";
    IntersectionStatus["Pending"] = "Pending";
    IntersectionStatus["NotVisible"] = "NotVisible";
})(IntersectionStatus || (IntersectionStatus = {}));
const fromIntersectionObserver = (element, config, debounce = 0) => new Observable(subscriber => {
    const subject$ = new Subject();
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            subject$.next({ entry, observer });
        });
    }, config);
    subject$.subscribe(() => {
        subscriber.next(IntersectionStatus.Pending);
    });
    subject$.pipe(debounceTime(debounce), filter(Boolean))
        .subscribe(({ entry, observer }) => __awaiter(void 0, void 0, void 0, function* () {
        const isEntryVisible = yield isVisible(entry.target);
        if (isEntryVisible) {
            subscriber.next(IntersectionStatus.Visible);
        }
        else {
            subscriber.next(IntersectionStatus.NotVisible);
        }
    }));
    intersectionObserver.observe(element);
    return {
        unsubscribe() {
            intersectionObserver.disconnect();
            subject$.unsubscribe();
        }
    };
});
function isVisible(element) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            const observer = new IntersectionObserver(([entry]) => {
                resolve(entry.isIntersecting);
                observer.disconnect();
            });
            observer.observe(element);
        });
    });
}

class IntersectionObserverDirective {
    constructor(_element) {
        this._element = _element;
        this.intersectionDebounce = 0;
        this.intersectionRootMargin = '0px';
        this.visibilityChange = new EventEmitter();
        this._destroy$ = new Subject();
    }
    ngOnInit() {
        const element = this._element.nativeElement;
        const config = {
            root: this.intersectionRoot,
            rootMargin: this.intersectionRootMargin,
            threshold: this.intersectionThreshold
        };
        fromIntersectionObserver(element, config, this.intersectionDebounce)
            .pipe(takeUntil(this._destroy$))
            .subscribe(status => {
            this.visibilityChange.emit(status);
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
    }
}
IntersectionObserverDirective.ɵfac = function IntersectionObserverDirective_Factory(t) { return new (t || IntersectionObserverDirective)(ɵɵdirectiveInject(ElementRef)); };
IntersectionObserverDirective.ɵdir = ɵɵdefineDirective({ type: IntersectionObserverDirective, selectors: [["", "intersectionObserver", ""]], inputs: { intersectionDebounce: "intersectionDebounce", intersectionRootMargin: "intersectionRootMargin", intersectionRoot: "intersectionRoot", intersectionThreshold: "intersectionThreshold" }, outputs: { visibilityChange: "visibilityChange" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(IntersectionObserverDirective, [{
        type: Directive,
        args: [{
                selector: '[intersectionObserver]'
            }]
    }], function () { return [{ type: ElementRef }]; }, { intersectionDebounce: [{
            type: Input
        }], intersectionRootMargin: [{
            type: Input
        }], intersectionRoot: [{
            type: Input
        }], intersectionThreshold: [{
            type: Input
        }], visibilityChange: [{
            type: Output
        }] }); })();

const _c0 = ["tape"];
const _c1 = function (a0) { return { "ngx-marquee-pause-on-hover": a0 }; };
const _c2 = ["*"];
var MarqueeState;
(function (MarqueeState) {
    MarqueeState["Running"] = "running";
    MarqueeState["Paused"] = "paused";
    MarqueeState["Stopped"] = "stopped";
})(MarqueeState || (MarqueeState = {}));
var MarqueeDirection;
(function (MarqueeDirection) {
    MarqueeDirection["Left"] = "left";
    MarqueeDirection["Right"] = "right";
    MarqueeDirection["Alternate"] = "alternate";
})(MarqueeDirection || (MarqueeDirection = {}));
var MarqueeAnimation;
(function (MarqueeAnimation) {
    MarqueeAnimation["Default"] = "default";
    MarqueeAnimation["SlideInUp"] = "slideInUp";
    MarqueeAnimation["SlideInDown"] = "slideInDown";
})(MarqueeAnimation || (MarqueeAnimation = {}));
class NgxMarqueeComponent {
    constructor(_renderer) {
        this._renderer = _renderer;
        this._outerFlags = [false, false];
        this.debounce = 0;
        this.root = undefined;
        this.rootMargin = '0px';
        this.threshold = 0;
        this.duration = '20s';
        this.animation = MarqueeAnimation.Default;
        this.pauseOnHover = false;
        this.pendingUpdates = false;
        this.pendingUpdatesChange = new EventEmitter();
        this.playStateChange = new EventEmitter();
        if (typeof this.taskOnUpdateContent !== 'function') {
            this.taskOnUpdateContent = () => { };
        }
        if (typeof this.taskOnUpdateDuration !== 'function') {
            this.taskOnUpdateDuration = () => {
                return this.duration;
            };
        }
    }
    ngAfterViewInit() {
        this._elementMarquee = this._renderer.selectRootElement(this.tape, true).nativeElement;
        this._resetMarquee();
    }
    playPause() {
        if (this._dataPlayState === null || this._dataPlayState === MarqueeState.Running) {
            this._pauseElement();
        }
        else {
            this._playElement();
        }
    }
    stop() {
        this._resetAnimation();
        this._stopElement();
    }
    restart() {
        this._resetAnimation();
        this._playElement();
    }
    onVisibilityChanged(status, control) {
        if (status !== IntersectionStatus.Pending) {
            if (status === IntersectionStatus.Visible) {
                this._outerFlags[control] = true;
            }
            else if (status === IntersectionStatus.NotVisible) {
                this._outerFlags[control] = false;
            }
            if (this.pendingUpdates) {
                if ((this.direction === undefined || this.direction === MarqueeDirection.Left) && (this._outerFlags[0] === true && this._outerFlags[1] === false)) {
                    this._execProcedure();
                }
                else if (this.direction === MarqueeDirection.Right && (this._outerFlags[0] === false && this._outerFlags[1] === true)) {
                    this._execProcedure();
                }
            }
        }
    }
    _execProcedure() {
        this.taskOnUpdateContent();
        this._resetMarquee();
        this._setPendingUpdates(false);
    }
    _setDataPlayState(state) {
        this._dataPlayState = state;
        this.playStateChange.emit(this._dataPlayState);
    }
    _setPendingUpdates(state) {
        this.pendingUpdates = state;
        this.pendingUpdatesChange.emit(this.pendingUpdates);
    }
    _resetMarquee() {
        this.stop();
        this._calculateDuration();
        this._playElement();
    }
    _calculateDuration() {
        this.duration = this.taskOnUpdateDuration();
    }
    _playElement() {
        this._setAnimationState('running', true);
        this._setDataAttrState('running');
        this._setDataPlayState(MarqueeState.Running);
    }
    _pauseElement() {
        this._setAnimationState('paused');
        this._setDataAttrState('paused');
        this._setDataPlayState(MarqueeState.Paused);
    }
    _stopElement() {
        this._setAnimationState('paused');
        this._setDataAttrState('stopped');
        this._setDataPlayState(MarqueeState.Stopped);
        this._setPendingUpdates(false);
    }
    _setAnimationState(state = '', fix = false) {
        this._renderer.setStyle(this._elementMarquee, 'animation-play-state', state);
        if (fix) {
            this._fixAnimationState();
        }
    }
    _resetAnimation() {
        this._renderer.setStyle(this._elementMarquee, 'animation', 'none');
        let fix = this._elementMarquee.offsetWidth;
        fix = fix;
        this._renderer.setStyle(this._elementMarquee, 'animation', `${this.duration} linear infinite`);
        this._renderer.setStyle(this._elementMarquee, '-webkit-animation', `${this.duration} linear infinite`);
        switch (this.direction) {
            case 'alternate':
                this._renderer.setStyle(this._elementMarquee, 'animation-direction', 'alternate');
                break;
            default:
                this._renderer.setStyle(this._elementMarquee, 'animation-direction', 'normal');
                break;
        }
        if (this.direction !== MarqueeDirection.Alternate) {
            if (this.direction === undefined || this.direction === MarqueeDirection.Left) {
                if (this.animation === MarqueeAnimation.SlideInUp) {
                    this._renderer.setStyle(this._elementMarquee, 'animation-name', 'slide-in-up');
                }
                else if (this.animation === MarqueeAnimation.SlideInDown) {
                    this._renderer.setStyle(this._elementMarquee, 'animation-name', 'slide-in-down');
                }
                else {
                    this._renderer.setStyle(this._elementMarquee, 'animation-name', 'movement-smooth');
                }
            }
            else if (this.direction === MarqueeDirection.Right) {
                if (this.animation === MarqueeAnimation.SlideInUp) {
                    this._renderer.setStyle(this._elementMarquee, 'animation-name', 'slide-in-up-right');
                }
                else if (this.animation === MarqueeAnimation.SlideInDown) {
                    this._renderer.setStyle(this._elementMarquee, 'animation-name', 'slide-in-down-right');
                }
                else {
                    this._renderer.setStyle(this._elementMarquee, 'animation-direction', 'reverse');
                    this._renderer.setStyle(this._elementMarquee, 'animation-name', 'movement-smooth');
                }
            }
        }
        else {
            this._renderer.setStyle(this._elementMarquee, 'animation-name', 'movement-smooth');
        }
    }
    _setDataAttrState(state = '') {
        this._renderer.setAttribute(this._elementMarquee, 'data-play-state', state);
    }
    _fixAnimationState() {
        this._renderer.removeStyle(this._elementMarquee, 'animation-play-state');
    }
}
NgxMarqueeComponent.ɵfac = function NgxMarqueeComponent_Factory(t) { return new (t || NgxMarqueeComponent)(ɵɵdirectiveInject(Renderer2)); };
NgxMarqueeComponent.ɵcmp = ɵɵdefineComponent({ type: NgxMarqueeComponent, selectors: [["ngx-marquee"]], viewQuery: function NgxMarqueeComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, 1);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tape = _t.first);
    } }, inputs: { direction: "direction", duration: "duration", pauseOnHover: "pauseOnHover", animation: "animation", taskOnUpdateContent: "taskOnUpdateContent", taskOnUpdateDuration: "taskOnUpdateDuration", pendingUpdates: "pendingUpdates" }, outputs: { pendingUpdatesChange: "pendingUpdatesChange", playStateChange: "playStateChange" }, ngContentSelectors: _c2, decls: 9, vars: 11, consts: [[1, "ngx-marquee", 3, "ngClass"], ["tape", ""], ["intersectionObserver", "", 1, "ticker-control", "ticker-start", 3, "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "intersectionDebounce", "visibilityChange"], [1, "tickers"], ["intersectionObserver", "", 1, "ticker-control", "ticker-end", 3, "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "intersectionDebounce", "visibilityChange"]], template: function NgxMarqueeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "span", null, 1);
        ɵɵelementStart(3, "span", 2);
        ɵɵlistener("visibilityChange", function NgxMarqueeComponent_Template_span_visibilityChange_3_listener($event) { return ctx.onVisibilityChanged($event, 0); });
        ɵɵtext(4, "L");
        ɵɵelementEnd();
        ɵɵelementStart(5, "span", 3);
        ɵɵprojection(6);
        ɵɵelementEnd();
        ɵɵelementStart(7, "span", 4);
        ɵɵlistener("visibilityChange", function NgxMarqueeComponent_Template_span_visibilityChange_7_listener($event) { return ctx.onVisibilityChanged($event, 1); });
        ɵɵtext(8, "R");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("ngClass", ɵɵpureFunction1(9, _c1, ctx.pauseOnHover));
        ɵɵadvance(3);
        ɵɵproperty("intersectionRoot", ctx.root)("intersectionRootMargin", ctx.rootMargin)("intersectionThreshold", ctx.threshold)("intersectionDebounce", ctx.debounce);
        ɵɵadvance(4);
        ɵɵproperty("intersectionRoot", ctx.root)("intersectionRootMargin", ctx.rootMargin)("intersectionThreshold", ctx.threshold)("intersectionDebounce", ctx.debounce);
    } }, directives: [NgClass, IntersectionObserverDirective], styles: [".ngx-marquee[_ngcontent-%COMP%]{overflow:hidden;text-align:left}.ngx-marquee.ngx-marquee-pause-on-hover[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]{animation-play-state:paused}.ngx-marquee[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{content:attr(data-marquee);display:inline-block;position:relative;white-space:nowrap;animation:linear infinite;animation-duration:20s;animation-direction:normal}.ngx-marquee[_ngcontent-%COMP%]   span.ticker-control[_ngcontent-%COMP%]{display:inline-block;width:20px;text-align:center;color:transparent;background-color:initial}.ngx-marquee.ngx-marquee-direction-left[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], .ngx-marquee.ngx-marquee-direction-normal[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{animation-direction:normal}@keyframes movement-smooth{0%{transform:translateX(0);left:100%}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up{0%{transform:translateY(100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-down{0%{transform:translateY(-100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up-right{0%{transform:translate(-100%,100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}@keyframes slide-in-down-right{0%{transform:translate(-100%,-100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NgxMarqueeComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-marquee',
                templateUrl: './ngx-marquee.component.html',
                styleUrls: ['./ngx-marquee.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: Renderer2 }]; }, { direction: [{
            type: Input
        }], duration: [{
            type: Input
        }], pauseOnHover: [{
            type: Input
        }], animation: [{
            type: Input
        }], taskOnUpdateContent: [{
            type: Input
        }], taskOnUpdateDuration: [{
            type: Input
        }], pendingUpdates: [{
            type: Input
        }], pendingUpdatesChange: [{
            type: Output
        }], playStateChange: [{
            type: Output
        }], tape: [{
            type: ViewChild,
            args: ["tape"]
        }] }); })();

class NgxMarqueeModule {
}
NgxMarqueeModule.ɵfac = function NgxMarqueeModule_Factory(t) { return new (t || NgxMarqueeModule)(); };
NgxMarqueeModule.ɵmod = ɵɵdefineNgModule({ type: NgxMarqueeModule });
NgxMarqueeModule.ɵinj = ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxMarqueeModule, { declarations: [NgxMarqueeComponent,
        IntersectionObserverDirective], imports: [CommonModule], exports: [NgxMarqueeComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NgxMarqueeModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgxMarqueeComponent,
                    IntersectionObserverDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    NgxMarqueeComponent
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-marquee
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MarqueeState, NgxMarqueeComponent, NgxMarqueeModule };
//# sourceMappingURL=ngx-marquee.js.map
