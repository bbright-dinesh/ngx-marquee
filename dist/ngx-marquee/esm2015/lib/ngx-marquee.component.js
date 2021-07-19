import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IntersectionStatus } from './observables/from-intersection-observer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./directives/intersection-observer.directive";
const _c0 = ["tape"];
const _c1 = function (a0) { return { "ngx-marquee-pause-on-hover": a0 }; };
const _c2 = ["*"];
export var MarqueeState;
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
export class NgxMarqueeComponent {
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
NgxMarqueeComponent.ɵfac = function NgxMarqueeComponent_Factory(t) { return new (t || NgxMarqueeComponent)(i0.ɵɵdirectiveInject(i0.Renderer2)); };
NgxMarqueeComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxMarqueeComponent, selectors: [["ngx-marquee"]], viewQuery: function NgxMarqueeComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 1);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tape = _t.first);
    } }, inputs: { direction: "direction", duration: "duration", pauseOnHover: "pauseOnHover", animation: "animation", taskOnUpdateContent: "taskOnUpdateContent", taskOnUpdateDuration: "taskOnUpdateDuration", pendingUpdates: "pendingUpdates" }, outputs: { pendingUpdatesChange: "pendingUpdatesChange", playStateChange: "playStateChange" }, ngContentSelectors: _c2, decls: 9, vars: 11, consts: [[1, "ngx-marquee", 3, "ngClass"], ["tape", ""], ["intersectionObserver", "", 1, "ticker-control", "ticker-start", 3, "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "intersectionDebounce", "visibilityChange"], [1, "tickers"], ["intersectionObserver", "", 1, "ticker-control", "ticker-end", 3, "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "intersectionDebounce", "visibilityChange"]], template: function NgxMarqueeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "span", null, 1);
        i0.ɵɵelementStart(3, "span", 2);
        i0.ɵɵlistener("visibilityChange", function NgxMarqueeComponent_Template_span_visibilityChange_3_listener($event) { return ctx.onVisibilityChanged($event, 0); });
        i0.ɵɵtext(4, "L");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 3);
        i0.ɵɵprojection(6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "span", 4);
        i0.ɵɵlistener("visibilityChange", function NgxMarqueeComponent_Template_span_visibilityChange_7_listener($event) { return ctx.onVisibilityChanged($event, 1); });
        i0.ɵɵtext(8, "R");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c1, ctx.pauseOnHover));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("intersectionRoot", ctx.root)("intersectionRootMargin", ctx.rootMargin)("intersectionThreshold", ctx.threshold)("intersectionDebounce", ctx.debounce);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("intersectionRoot", ctx.root)("intersectionRootMargin", ctx.rootMargin)("intersectionThreshold", ctx.threshold)("intersectionDebounce", ctx.debounce);
    } }, directives: [i1.NgClass, i2.IntersectionObserverDirective], styles: [".ngx-marquee[_ngcontent-%COMP%]{overflow:hidden;text-align:left}.ngx-marquee.ngx-marquee-pause-on-hover[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]{animation-play-state:paused}.ngx-marquee[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{content:attr(data-marquee);display:inline-block;position:relative;white-space:nowrap;animation:linear infinite;animation-duration:20s;animation-direction:normal}.ngx-marquee[_ngcontent-%COMP%]   span.ticker-control[_ngcontent-%COMP%]{display:inline-block;width:20px;text-align:center;color:transparent;background-color:initial}.ngx-marquee.ngx-marquee-direction-left[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], .ngx-marquee.ngx-marquee-direction-normal[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{animation-direction:normal}@keyframes movement-smooth{0%{transform:translateX(0);left:100%}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up{0%{transform:translateY(100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-down{0%{transform:translateY(-100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up-right{0%{transform:translate(-100%,100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}@keyframes slide-in-down-right{0%{transform:translate(-100%,-100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxMarqueeComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-marquee',
                templateUrl: './ngx-marquee.component.html',
                styleUrls: ['./ngx-marquee.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i0.Renderer2 }]; }, { direction: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcnF1ZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1hcnF1ZWUvc3JjL2xpYi9uZ3gtbWFycXVlZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbWFycXVlZS9zcmMvbGliL25neC1tYXJxdWVlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7OztBQUU5RSxNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLGlDQUFpQixDQUFBO0lBQ2pCLG1DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxZQUFZLEtBQVosWUFBWSxRQUl2QjtBQUVELElBQUssZ0JBSUo7QUFKRCxXQUFLLGdCQUFnQjtJQUNuQixpQ0FBYSxDQUFBO0lBQ2IsbUNBQWUsQ0FBQTtJQUNmLDJDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFKSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBSXBCO0FBRUQsSUFBSyxnQkFJSjtBQUpELFdBQUssZ0JBQWdCO0lBQ25CLHVDQUFtQixDQUFBO0lBQ25CLDJDQUF1QixDQUFBO0lBQ3ZCLCtDQUEyQixDQUFBO0FBQzdCLENBQUMsRUFKSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBSXBCO0FBUUQsTUFBTSxPQUFPLG1CQUFtQjtJQXNCOUIsWUFBcUIsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUhqQyxnQkFBVyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBS25DLElBQUksQ0FBQyxRQUFR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QUFDLENBQUMsSUFBQztRQUFDLGlCQUFDO1FBQUEsaUJBQU87UUFDcEUsaUJBQU87UUFDWCxpQkFBTTs7UUFwQm1CLHNFQUF3RDtRQUlyRSxlQUF5QjtRQUF6QiwyQ0FBeUIsMENBQUEsd0NBQUEsc0NBQUE7UUFVekIsZUFBeUI7UUFBekIsMkNBQXlCLDBDQUFBLHdDQUFBLHNDQUFBOzt1RkRheEIsbUJBQW1CO2NBTi9CLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsV0FBVyxFQUFFLDhCQUE4QjtnQkFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7Z0JBQzNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzREQUdVLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxtQkFBbUI7a0JBQTNCLEtBQUs7WUFDRyxvQkFBb0I7a0JBQTVCLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBQ0ksb0JBQW9CO2tCQUE3QixNQUFNO1lBQ0csZUFBZTtrQkFBeEIsTUFBTTtZQUNZLElBQUk7a0JBQXRCLFNBQVM7bUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW50ZXJzZWN0aW9uU3RhdHVzIH0gZnJvbSAnLi9vYnNlcnZhYmxlcy9mcm9tLWludGVyc2VjdGlvbi1vYnNlcnZlcic7XHJcblxyXG5leHBvcnQgZW51bSBNYXJxdWVlU3RhdGUge1xyXG4gIFJ1bm5pbmcgPSBcInJ1bm5pbmdcIixcclxuICBQYXVzZWQgPSBcInBhdXNlZFwiLFxyXG4gIFN0b3BwZWQgPSBcInN0b3BwZWRcIlxyXG59XHJcblxyXG5lbnVtIE1hcnF1ZWVEaXJlY3Rpb24ge1xyXG4gIExlZnQgPSAnbGVmdCcsXHJcbiAgUmlnaHQgPSAncmlnaHQnLFxyXG4gIEFsdGVybmF0ZSA9ICdhbHRlcm5hdGUnXHJcbn1cclxuXHJcbmVudW0gTWFycXVlZUFuaW1hdGlvbiB7XHJcbiAgRGVmYXVsdCA9ICdkZWZhdWx0JyxcclxuICBTbGlkZUluVXAgPSAnc2xpZGVJblVwJyxcclxuICBTbGlkZUluRG93biA9ICdzbGlkZUluRG93bidcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtbWFycXVlZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXJxdWVlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtbWFycXVlZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXJxdWVlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogTWFycXVlZURpcmVjdGlvbjtcclxuICBASW5wdXQoKSBkdXJhdGlvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhdXNlT25Ib3ZlcjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhbmltYXRpb246IE1hcnF1ZWVBbmltYXRpb247XHJcbiAgQElucHV0KCkgdGFza09uVXBkYXRlQ29udGVudDogKCkgPT4gdm9pZDtcclxuICBASW5wdXQoKSB0YXNrT25VcGRhdGVEdXJhdGlvbjogKCkgPT4gc3RyaW5nOyAvLyBGb3JtYXRvIGVzcGVyYWRvIFwibnVtYmVyW3N8bXNdXCJcclxuICBASW5wdXQoKSBwZW5kaW5nVXBkYXRlczogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgcGVuZGluZ1VwZGF0ZXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcclxuICBAT3V0cHV0KCkgcGxheVN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWFycXVlZVN0YXRlPjtcclxuICBAVmlld0NoaWxkKFwidGFwZVwiKSB0YXBlOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcmVhZG9ubHkgcm9vdDogSFRNTEVsZW1lbnQ7XHJcbiAgcmVhZG9ubHkgcm9vdE1hcmdpbjogc3RyaW5nO1xyXG4gIHJlYWRvbmx5IHRocmVzaG9sZDogbnVtYmVyIHwgbnVtYmVyW107XHJcbiAgcmVhZG9ubHkgZGVib3VuY2U6IG51bWJlcjtcclxuICBcclxuICBwcml2YXRlIF9lbGVtZW50TWFycXVlZTogYW55O1xyXG4gIHByaXZhdGUgX291dGVyRmxhZ3MgPSBbZmFsc2UsIGZhbHNlXTtcclxuICBwcml2YXRlIF9kYXRhUGxheVN0YXRlOiBNYXJxdWVlU3RhdGU7IFxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiApXHJcbiAge1xyXG4gICAgdGhpcy5kZWJvdW5jZSA9IDA7XHJcbiAgICB0aGlzLnJvb3QgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnJvb3RNYXJnaW4gPSAnMHB4JztcclxuICAgIHRoaXMudGhyZXNob2xkID0gMDtcclxuICAgIHRoaXMuZHVyYXRpb24gPSAnMjBzJztcclxuICAgIHRoaXMuYW5pbWF0aW9uID0gTWFycXVlZUFuaW1hdGlvbi5EZWZhdWx0O1xyXG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBmYWxzZTtcclxuICAgIHRoaXMucGVuZGluZ1VwZGF0ZXMgPSBmYWxzZTtcclxuICAgIHRoaXMucGVuZGluZ1VwZGF0ZXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICB0aGlzLnBsYXlTdGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFycXVlZVN0YXRlPigpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy50YXNrT25VcGRhdGVDb250ZW50ICE9PSAnZnVuY3Rpb24nKVxyXG4gICAge1xyXG4gICAgICB0aGlzLnRhc2tPblVwZGF0ZUNvbnRlbnQgPSAoKTogdm9pZCA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMudGFza09uVXBkYXRlRHVyYXRpb24gIT09ICdmdW5jdGlvbicpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMudGFza09uVXBkYXRlRHVyYXRpb24gPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kdXJhdGlvbjtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5fZWxlbWVudE1hcnF1ZWUgPSB0aGlzLl9yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCh0aGlzLnRhcGUsIHRydWUpLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLl9yZXNldE1hcnF1ZWUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwbGF5UGF1c2UoKTogdm9pZFxyXG4gIHtcclxuICAgIGlmICggdGhpcy5fZGF0YVBsYXlTdGF0ZSA9PT0gbnVsbCB8fCB0aGlzLl9kYXRhUGxheVN0YXRlID09PSBNYXJxdWVlU3RhdGUuUnVubmluZyApXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuX3BhdXNlRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLl9wbGF5RWxlbWVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0b3AoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuX3Jlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICB0aGlzLl9zdG9wRWxlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc3RhcnQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuX3Jlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICB0aGlzLl9wbGF5RWxlbWVudCgpO1xyXG4gIH1cclxuIFxyXG4gIG9uVmlzaWJpbGl0eUNoYW5nZWQoc3RhdHVzOiBJbnRlcnNlY3Rpb25TdGF0dXMsIGNvbnRyb2w6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICBpZiAoc3RhdHVzICE9PSBJbnRlcnNlY3Rpb25TdGF0dXMuUGVuZGluZylcclxuICAgIHtcclxuICAgICAgaWYgKHN0YXR1cyA9PT0gSW50ZXJzZWN0aW9uU3RhdHVzLlZpc2libGUpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLl9vdXRlckZsYWdzW2NvbnRyb2xdID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChzdGF0dXMgPT09IEludGVyc2VjdGlvblN0YXR1cy5Ob3RWaXNpYmxlKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5fb3V0ZXJGbGFnc1tjb250cm9sXSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiAodGhpcy5wZW5kaW5nVXBkYXRlcylcclxuICAgICAge1xyXG4gICAgICAgIGlmICggKHRoaXMuZGlyZWN0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5kaXJlY3Rpb24gPT09IE1hcnF1ZWVEaXJlY3Rpb24uTGVmdCkgJiYgKHRoaXMuX291dGVyRmxhZ3NbMF0gPT09IHRydWUgJiYgdGhpcy5fb3V0ZXJGbGFnc1sxXSA9PT0gZmFsc2UpIClcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgdGhpcy5fZXhlY1Byb2NlZHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICggdGhpcy5kaXJlY3Rpb24gPT09IE1hcnF1ZWVEaXJlY3Rpb24uUmlnaHQgJiYgKHRoaXMuX291dGVyRmxhZ3NbMF0gPT09IGZhbHNlICYmIHRoaXMuX291dGVyRmxhZ3NbMV0gPT09IHRydWUpIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aGlzLl9leGVjUHJvY2VkdXJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9ICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2V4ZWNQcm9jZWR1cmUoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMudGFza09uVXBkYXRlQ29udGVudCgpO1xyXG4gICAgdGhpcy5fcmVzZXRNYXJxdWVlKCk7XHJcbiAgICB0aGlzLl9zZXRQZW5kaW5nVXBkYXRlcyhmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXREYXRhUGxheVN0YXRlKCBzdGF0ZTogTWFycXVlZVN0YXRlICk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLl9kYXRhUGxheVN0YXRlID0gc3RhdGU7XHJcbiAgICB0aGlzLnBsYXlTdGF0ZUNoYW5nZS5lbWl0KHRoaXMuX2RhdGFQbGF5U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0UGVuZGluZ1VwZGF0ZXMoIHN0YXRlOiBib29sZWFuICk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnBlbmRpbmdVcGRhdGVzID0gc3RhdGU7XHJcbiAgICB0aGlzLnBlbmRpbmdVcGRhdGVzQ2hhbmdlLmVtaXQodGhpcy5wZW5kaW5nVXBkYXRlcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZXNldE1hcnF1ZWUoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgdGhpcy5fY2FsY3VsYXRlRHVyYXRpb24oKTtcclxuICAgIHRoaXMuX3BsYXlFbGVtZW50KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jYWxjdWxhdGVEdXJhdGlvbigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5kdXJhdGlvbiA9IHRoaXMudGFza09uVXBkYXRlRHVyYXRpb24oKTsgICAgICAgICAgXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wbGF5RWxlbWVudCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5fc2V0QW5pbWF0aW9uU3RhdGUoJ3J1bm5pbmcnLCB0cnVlKTtcclxuICAgIHRoaXMuX3NldERhdGFBdHRyU3RhdGUoJ3J1bm5pbmcnKTtcclxuICAgIHRoaXMuX3NldERhdGFQbGF5U3RhdGUoTWFycXVlZVN0YXRlLlJ1bm5pbmcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcGF1c2VFbGVtZW50KCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLl9zZXRBbmltYXRpb25TdGF0ZSgncGF1c2VkJyk7XHJcbiAgICB0aGlzLl9zZXREYXRhQXR0clN0YXRlKCdwYXVzZWQnKTtcclxuICAgIHRoaXMuX3NldERhdGFQbGF5U3RhdGUoTWFycXVlZVN0YXRlLlBhdXNlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zdG9wRWxlbWVudCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5fc2V0QW5pbWF0aW9uU3RhdGUoJ3BhdXNlZCcpO1xyXG4gICAgdGhpcy5fc2V0RGF0YUF0dHJTdGF0ZSgnc3RvcHBlZCcpO1xyXG4gICAgdGhpcy5fc2V0RGF0YVBsYXlTdGF0ZShNYXJxdWVlU3RhdGUuU3RvcHBlZCk7XHJcbiAgICB0aGlzLl9zZXRQZW5kaW5nVXBkYXRlcyhmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRBbmltYXRpb25TdGF0ZSggc3RhdGU6IHN0cmluZyA9ICcnLCBmaXg6IGJvb2xlYW4gPSBmYWxzZSApOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tcGxheS1zdGF0ZScsIHN0YXRlKTtcclxuICAgIFxyXG4gICAgaWYgKGZpeClcclxuICAgIHtcclxuICAgICAgdGhpcy5fZml4QW5pbWF0aW9uU3RhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Jlc2V0QW5pbWF0aW9uKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbicsICdub25lJyk7XHJcbiAgICBsZXQgZml4ID0gdGhpcy5fZWxlbWVudE1hcnF1ZWUub2Zmc2V0V2lkdGg7IGZpeCA9IGZpeDtcclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbicsIGAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZWApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICctd2Via2l0LWFuaW1hdGlvbicsIGAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZWApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgIGNhc2UgJ2FsdGVybmF0ZSc6IHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLWRpcmVjdGlvbicsICdhbHRlcm5hdGUnKTsgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6IHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLWRpcmVjdGlvbicsICdub3JtYWwnKTsgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9PSBNYXJxdWVlRGlyZWN0aW9uLkFsdGVybmF0ZSlcclxuICAgIHtcclxuICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5kaXJlY3Rpb24gPT09IE1hcnF1ZWVEaXJlY3Rpb24uTGVmdClcclxuICAgICAge1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gTWFycXVlZUFuaW1hdGlvbi5TbGlkZUluVXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tbmFtZScsICdzbGlkZS1pbi11cCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gTWFycXVlZUFuaW1hdGlvbi5TbGlkZUluRG93bilcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1uYW1lJywgJ3NsaWRlLWluLWRvd24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLW5hbWUnLCAnbW92ZW1lbnQtc21vb3RoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBNYXJxdWVlRGlyZWN0aW9uLlJpZ2h0KVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSBNYXJxdWVlQW5pbWF0aW9uLlNsaWRlSW5VcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1uYW1lJywgJ3NsaWRlLWluLXVwLXJpZ2h0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uID09PSBNYXJxdWVlQW5pbWF0aW9uLlNsaWRlSW5Eb3duKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLW5hbWUnLCAnc2xpZGUtaW4tZG93bi1yaWdodCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tZGlyZWN0aW9uJywgJ3JldmVyc2UnKTtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLW5hbWUnLCAnbW92ZW1lbnQtc21vb3RoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLW5hbWUnLCAnbW92ZW1lbnQtc21vb3RoJyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0RGF0YUF0dHJTdGF0ZSggc3RhdGU6IHN0cmluZyA9ICcnICk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdkYXRhLXBsYXktc3RhdGUnLCBzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9maXhBbmltYXRpb25TdGF0ZSgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tcGxheS1zdGF0ZScpO1xyXG4gIH1cclxuXHJcbn0iLCI8ZGl2IGNsYXNzPVwibmd4LW1hcnF1ZWVcIiBbbmdDbGFzc109XCJ7J25neC1tYXJxdWVlLXBhdXNlLW9uLWhvdmVyJzogcGF1c2VPbkhvdmVyfVwiPlxyXG4gICAgPHNwYW4gI3RhcGU+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aWNrZXItY29udHJvbCB0aWNrZXItc3RhcnRcIiBcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJcclxuICAgICAgICAgICAgW2ludGVyc2VjdGlvblJvb3RdPVwicm9vdFwiXHJcbiAgICAgICAgICAgIFtpbnRlcnNlY3Rpb25Sb290TWFyZ2luXT1cInJvb3RNYXJnaW5cIlxyXG4gICAgICAgICAgICBbaW50ZXJzZWN0aW9uVGhyZXNob2xkXT1cInRocmVzaG9sZFwiXHJcbiAgICAgICAgICAgIFtpbnRlcnNlY3Rpb25EZWJvdW5jZV09XCJkZWJvdW5jZVwiXHJcbiAgICAgICAgICAgICh2aXNpYmlsaXR5Q2hhbmdlKT1cIm9uVmlzaWJpbGl0eUNoYW5nZWQoJGV2ZW50LCAwKVwiPkw8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aWNrZXJzXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aWNrZXItY29udHJvbCB0aWNrZXItZW5kXCJcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJcclxuICAgICAgICAgICAgW2ludGVyc2VjdGlvblJvb3RdPVwicm9vdFwiXHJcbiAgICAgICAgICAgIFtpbnRlcnNlY3Rpb25Sb290TWFyZ2luXT1cInJvb3RNYXJnaW5cIlxyXG4gICAgICAgICAgICBbaW50ZXJzZWN0aW9uVGhyZXNob2xkXT1cInRocmVzaG9sZFwiXHJcbiAgICAgICAgICAgIFtpbnRlcnNlY3Rpb25EZWJvdW5jZV09XCJkZWJvdW5jZVwiXHJcbiAgICAgICAgICAgICh2aXNpYmlsaXR5Q2hhbmdlKT1cIm9uVmlzaWJpbGl0eUNoYW5nZWQoJGV2ZW50LCAxKVwiPlI8L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbjwvZGl2PiJdfQ==