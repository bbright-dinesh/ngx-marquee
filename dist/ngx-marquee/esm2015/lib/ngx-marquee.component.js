import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { IntersectionStatus } from './observables/from-intersection-observer';
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
NgxMarqueeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-marquee',
                template: "<div class=\"ngx-marquee\" [ngClass]=\"{'ngx-marquee-pause-on-hover': pauseOnHover}\">\n    <span #tape>\n        <span class=\"ticker-control ticker-start\" \n            intersectionObserver\n            [intersectionRoot]=\"root\"\n            [intersectionRootMargin]=\"rootMargin\"\n            [intersectionThreshold]=\"threshold\"\n            [intersectionDebounce]=\"debounce\"\n            (visibilityChange)=\"onVisibilityChanged($event, 0)\">L</span>\n        <span class=\"tickers\">\n            <ng-content></ng-content>\n        </span>\n        <span class=\"ticker-control ticker-end\"\n            intersectionObserver\n            [intersectionRoot]=\"root\"\n            [intersectionRootMargin]=\"rootMargin\"\n            [intersectionThreshold]=\"threshold\"\n            [intersectionDebounce]=\"debounce\"\n            (visibilityChange)=\"onVisibilityChanged($event, 1)\">R</span>\n    </span>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ngx-marquee{overflow:hidden;text-align:left}.ngx-marquee.ngx-marquee-pause-on-hover:hover>span{animation-play-state:paused}.ngx-marquee>span{content:attr(data-marquee);display:inline-block;position:relative;white-space:nowrap;animation:linear infinite;animation-duration:20s;animation-direction:normal}.ngx-marquee span.ticker-control{display:inline-block;width:20px;text-align:center;color:transparent;background-color:initial}.ngx-marquee.ngx-marquee-direction-left>span,.ngx-marquee.ngx-marquee-direction-normal>span{animation-direction:normal}@keyframes movement-smooth{0%{transform:translateX(0);left:100%}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up{0%{transform:translateY(100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-down{0%{transform:translateY(-100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up-right{0%{transform:translate(-100%,100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}@keyframes slide-in-down-right{0%{transform:translate(-100%,-100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}"]
            },] }
];
NgxMarqueeComponent.ctorParameters = () => [
    { type: Renderer2 }
];
NgxMarqueeComponent.propDecorators = {
    direction: [{ type: Input }],
    duration: [{ type: Input }],
    pauseOnHover: [{ type: Input }],
    animation: [{ type: Input }],
    taskOnUpdateContent: [{ type: Input }],
    taskOnUpdateDuration: [{ type: Input }],
    pendingUpdates: [{ type: Input }],
    pendingUpdatesChange: [{ type: Output }],
    playStateChange: [{ type: Output }],
    tape: [{ type: ViewChild, args: ["tape",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcnF1ZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1hcnF1ZWUvc3JjL2xpYi9uZ3gtbWFycXVlZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUU5RSxNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLGlDQUFpQixDQUFBO0lBQ2pCLG1DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxZQUFZLEtBQVosWUFBWSxRQUl2QjtBQUVELElBQUssZ0JBSUo7QUFKRCxXQUFLLGdCQUFnQjtJQUNuQixpQ0FBYSxDQUFBO0lBQ2IsbUNBQWUsQ0FBQTtJQUNmLDJDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFKSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBSXBCO0FBRUQsSUFBSyxnQkFJSjtBQUpELFdBQUssZ0JBQWdCO0lBQ25CLHVDQUFtQixDQUFBO0lBQ25CLDJDQUF1QixDQUFBO0lBQ3ZCLCtDQUEyQixDQUFBO0FBQzdCLENBQUMsRUFKSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBSXBCO0FBUUQsTUFBTSxPQUFPLG1CQUFtQjtJQXNCOUIsWUFBcUIsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUhqQyxnQkFBVyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBS25DLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLElBQUksQ0FB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Vmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEludGVyc2VjdGlvblN0YXR1cyB9IGZyb20gJy4vb2JzZXJ2YWJsZXMvZnJvbS1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXInO1xuXG5leHBvcnQgZW51bSBNYXJxdWVlU3RhdGUge1xuICBSdW5uaW5nID0gXCJydW5uaW5nXCIsXG4gIFBhdXNlZCA9IFwicGF1c2VkXCIsXG4gIFN0b3BwZWQgPSBcInN0b3BwZWRcIlxufVxuXG5lbnVtIE1hcnF1ZWVEaXJlY3Rpb24ge1xuICBMZWZ0ID0gJ2xlZnQnLFxuICBSaWdodCA9ICdyaWdodCcsXG4gIEFsdGVybmF0ZSA9ICdhbHRlcm5hdGUnXG59XG5cbmVudW0gTWFycXVlZUFuaW1hdGlvbiB7XG4gIERlZmF1bHQgPSAnZGVmYXVsdCcsXG4gIFNsaWRlSW5VcCA9ICdzbGlkZUluVXAnLFxuICBTbGlkZUluRG93biA9ICdzbGlkZUluRG93bidcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LW1hcnF1ZWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hcnF1ZWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtbWFycXVlZS5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXJxdWVlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgZGlyZWN0aW9uOiBNYXJxdWVlRGlyZWN0aW9uO1xuICBASW5wdXQoKSBkdXJhdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBwYXVzZU9uSG92ZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogTWFycXVlZUFuaW1hdGlvbjtcbiAgQElucHV0KCkgdGFza09uVXBkYXRlQ29udGVudDogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgdGFza09uVXBkYXRlRHVyYXRpb246ICgpID0+IHN0cmluZzsgLy8gRm9ybWF0byBlc3BlcmFkbyBcIm51bWJlcltzfG1zXVwiXG4gIEBJbnB1dCgpIHBlbmRpbmdVcGRhdGVzOiBib29sZWFuO1xuICBAT3V0cHV0KCkgcGVuZGluZ1VwZGF0ZXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgQE91dHB1dCgpIHBsYXlTdGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1hcnF1ZWVTdGF0ZT47XG4gIEBWaWV3Q2hpbGQoXCJ0YXBlXCIpIHRhcGU6IEhUTUxFbGVtZW50O1xuXG4gIHJlYWRvbmx5IHJvb3Q6IEhUTUxFbGVtZW50O1xuICByZWFkb25seSByb290TWFyZ2luOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRocmVzaG9sZDogbnVtYmVyIHwgbnVtYmVyW107XG4gIHJlYWRvbmx5IGRlYm91bmNlOiBudW1iZXI7XG4gIFxuICBwcml2YXRlIF9lbGVtZW50TWFycXVlZTogYW55O1xuICBwcml2YXRlIF9vdXRlckZsYWdzID0gW2ZhbHNlLCBmYWxzZV07XG4gIHByaXZhdGUgX2RhdGFQbGF5U3RhdGU6IE1hcnF1ZWVTdGF0ZTsgXG5cbiAgY29uc3RydWN0b3IoIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIgKVxuICB7XG4gICAgdGhpcy5kZWJvdW5jZSA9IDA7XG4gICAgdGhpcy5yb290ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucm9vdE1hcmdpbiA9ICcwcHgnO1xuICAgIHRoaXMudGhyZXNob2xkID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gJzIwcyc7XG4gICAgdGhpcy5hbmltYXRpb24gPSBNYXJxdWVlQW5pbWF0aW9uLkRlZmF1bHQ7XG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLnBlbmRpbmdVcGRhdGVzID0gZmFsc2U7XG4gICAgdGhpcy5wZW5kaW5nVXBkYXRlc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICB0aGlzLnBsYXlTdGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFycXVlZVN0YXRlPigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhc2tPblVwZGF0ZUNvbnRlbnQgIT09ICdmdW5jdGlvbicpXG4gICAge1xuICAgICAgdGhpcy50YXNrT25VcGRhdGVDb250ZW50ID0gKCk6IHZvaWQgPT4ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhc2tPblVwZGF0ZUR1cmF0aW9uICE9PSAnZnVuY3Rpb24nKVxuICAgIHtcbiAgICAgIHRoaXMudGFza09uVXBkYXRlRHVyYXRpb24gPSAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHVyYXRpb247XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLl9lbGVtZW50TWFycXVlZSA9IHRoaXMuX3JlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KHRoaXMudGFwZSwgdHJ1ZSkubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9yZXNldE1hcnF1ZWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5UGF1c2UoKTogdm9pZFxuICB7XG4gICAgaWYgKCB0aGlzLl9kYXRhUGxheVN0YXRlID09PSBudWxsIHx8IHRoaXMuX2RhdGFQbGF5U3RhdGUgPT09IE1hcnF1ZWVTdGF0ZS5SdW5uaW5nIClcbiAgICB7XG4gICAgICB0aGlzLl9wYXVzZUVsZW1lbnQoKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHRoaXMuX3BsYXlFbGVtZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZFxuICB7XG4gICAgdGhpcy5fcmVzZXRBbmltYXRpb24oKTtcbiAgICB0aGlzLl9zdG9wRWxlbWVudCgpO1xuICB9XG5cbiAgcHVibGljIHJlc3RhcnQoKTogdm9pZFxuICB7XG4gICAgdGhpcy5fcmVzZXRBbmltYXRpb24oKTtcbiAgICB0aGlzLl9wbGF5RWxlbWVudCgpO1xuICB9XG4gXG4gIG9uVmlzaWJpbGl0eUNoYW5nZWQoc3RhdHVzOiBJbnRlcnNlY3Rpb25TdGF0dXMsIGNvbnRyb2w6IG51bWJlcik6IHZvaWRcbiAge1xuICAgIGlmIChzdGF0dXMgIT09IEludGVyc2VjdGlvblN0YXR1cy5QZW5kaW5nKVxuICAgIHtcbiAgICAgIGlmIChzdGF0dXMgPT09IEludGVyc2VjdGlvblN0YXR1cy5WaXNpYmxlKVxuICAgICAge1xuICAgICAgICB0aGlzLl9vdXRlckZsYWdzW2NvbnRyb2xdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gSW50ZXJzZWN0aW9uU3RhdHVzLk5vdFZpc2libGUpXG4gICAgICB7XG4gICAgICAgIHRoaXMuX291dGVyRmxhZ3NbY29udHJvbF0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRoaXMucGVuZGluZ1VwZGF0ZXMpXG4gICAgICB7XG4gICAgICAgIGlmICggKHRoaXMuZGlyZWN0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5kaXJlY3Rpb24gPT09IE1hcnF1ZWVEaXJlY3Rpb24uTGVmdCkgJiYgKHRoaXMuX291dGVyRmxhZ3NbMF0gPT09IHRydWUgJiYgdGhpcy5fb3V0ZXJGbGFnc1sxXSA9PT0gZmFsc2UpIClcbiAgICAgICAgeyBcbiAgICAgICAgICB0aGlzLl9leGVjUHJvY2VkdXJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuZGlyZWN0aW9uID09PSBNYXJxdWVlRGlyZWN0aW9uLlJpZ2h0ICYmICh0aGlzLl9vdXRlckZsYWdzWzBdID09PSBmYWxzZSAmJiB0aGlzLl9vdXRlckZsYWdzWzFdID09PSB0cnVlKSApXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9leGVjUHJvY2VkdXJlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICBcbiAgfVxuXG4gIHByaXZhdGUgX2V4ZWNQcm9jZWR1cmUoKTogdm9pZFxuICB7XG4gICAgdGhpcy50YXNrT25VcGRhdGVDb250ZW50KCk7XG4gICAgdGhpcy5fcmVzZXRNYXJxdWVlKCk7XG4gICAgdGhpcy5fc2V0UGVuZGluZ1VwZGF0ZXMoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RGF0YVBsYXlTdGF0ZSggc3RhdGU6IE1hcnF1ZWVTdGF0ZSApOiB2b2lkXG4gIHtcbiAgICB0aGlzLl9kYXRhUGxheVN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5wbGF5U3RhdGVDaGFuZ2UuZW1pdCh0aGlzLl9kYXRhUGxheVN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBlbmRpbmdVcGRhdGVzKCBzdGF0ZTogYm9vbGVhbiApOiB2b2lkXG4gIHtcbiAgICB0aGlzLnBlbmRpbmdVcGRhdGVzID0gc3RhdGU7XG4gICAgdGhpcy5wZW5kaW5nVXBkYXRlc0NoYW5nZS5lbWl0KHRoaXMucGVuZGluZ1VwZGF0ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRNYXJxdWVlKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuX2NhbGN1bGF0ZUR1cmF0aW9uKCk7XG4gICAgdGhpcy5fcGxheUVsZW1lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUR1cmF0aW9uKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuZHVyYXRpb24gPSB0aGlzLnRhc2tPblVwZGF0ZUR1cmF0aW9uKCk7ICAgICAgICAgIFxuICB9XG5cbiAgcHJpdmF0ZSBfcGxheUVsZW1lbnQoKTogdm9pZFxuICB7XG4gICAgdGhpcy5fc2V0QW5pbWF0aW9uU3RhdGUoJ3J1bm5pbmcnLCB0cnVlKTtcbiAgICB0aGlzLl9zZXREYXRhQXR0clN0YXRlKCdydW5uaW5nJyk7XG4gICAgdGhpcy5fc2V0RGF0YVBsYXlTdGF0ZShNYXJxdWVlU3RhdGUuUnVubmluZyk7XG4gIH1cblxuICBwcml2YXRlIF9wYXVzZUVsZW1lbnQoKTogdm9pZFxuICB7XG4gICAgdGhpcy5fc2V0QW5pbWF0aW9uU3RhdGUoJ3BhdXNlZCcpO1xuICAgIHRoaXMuX3NldERhdGFBdHRyU3RhdGUoJ3BhdXNlZCcpO1xuICAgIHRoaXMuX3NldERhdGFQbGF5U3RhdGUoTWFycXVlZVN0YXRlLlBhdXNlZCk7XG4gIH1cblxuICBwcml2YXRlIF9zdG9wRWxlbWVudCgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLl9zZXRBbmltYXRpb25TdGF0ZSgncGF1c2VkJyk7XG4gICAgdGhpcy5fc2V0RGF0YUF0dHJTdGF0ZSgnc3RvcHBlZCcpO1xuICAgIHRoaXMuX3NldERhdGFQbGF5U3RhdGUoTWFycXVlZVN0YXRlLlN0b3BwZWQpO1xuICAgIHRoaXMuX3NldFBlbmRpbmdVcGRhdGVzKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEFuaW1hdGlvblN0YXRlKCBzdGF0ZTogc3RyaW5nID0gJycsIGZpeDogYm9vbGVhbiA9IGZhbHNlICk6IHZvaWRcbiAge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLXBsYXktc3RhdGUnLCBzdGF0ZSk7XG4gICAgXG4gICAgaWYgKGZpeClcbiAgICB7XG4gICAgICB0aGlzLl9maXhBbmltYXRpb25TdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0QW5pbWF0aW9uKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uJywgJ25vbmUnKTtcbiAgICBsZXQgZml4ID0gdGhpcy5fZWxlbWVudE1hcnF1ZWUub2Zmc2V0V2lkdGg7IGZpeCA9IGZpeDtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uJywgYCR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlYCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICctd2Via2l0LWFuaW1hdGlvbicsIGAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZWApO1xuXG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbilcbiAgICB7XG4gICAgICBjYXNlICdhbHRlcm5hdGUnOiB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1kaXJlY3Rpb24nLCAnYWx0ZXJuYXRlJyk7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tZGlyZWN0aW9uJywgJ25vcm1hbCcpOyBicmVhaztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT09IE1hcnF1ZWVEaXJlY3Rpb24uQWx0ZXJuYXRlKVxuICAgIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuZGlyZWN0aW9uID09PSBNYXJxdWVlRGlyZWN0aW9uLkxlZnQpXG4gICAgICB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gTWFycXVlZUFuaW1hdGlvbi5TbGlkZUluVXApXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1uYW1lJywgJ3NsaWRlLWluLXVwJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5hbmltYXRpb24gPT09IE1hcnF1ZWVBbmltYXRpb24uU2xpZGVJbkRvd24pXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1uYW1lJywgJ3NsaWRlLWluLWRvd24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1uYW1lJywgJ21vdmVtZW50LXNtb290aCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gTWFycXVlZURpcmVjdGlvbi5SaWdodClcbiAgICAgIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSBNYXJxdWVlQW5pbWF0aW9uLlNsaWRlSW5VcClcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLW5hbWUnLCAnc2xpZGUtaW4tdXAtcmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gTWFycXVlZUFuaW1hdGlvbi5TbGlkZUluRG93bilcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLW5hbWUnLCAnc2xpZGUtaW4tZG93bi1yaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRNYXJxdWVlLCAnYW5pbWF0aW9uLWRpcmVjdGlvbicsICdyZXZlcnNlJyk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tbmFtZScsICdtb3ZlbWVudC1zbW9vdGgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdhbmltYXRpb24tbmFtZScsICdtb3ZlbWVudC1zbW9vdGgnKTtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgX3NldERhdGFBdHRyU3RhdGUoIHN0YXRlOiBzdHJpbmcgPSAnJyApOiB2b2lkXG4gIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudE1hcnF1ZWUsICdkYXRhLXBsYXktc3RhdGUnLCBzdGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIF9maXhBbmltYXRpb25TdGF0ZSgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50TWFycXVlZSwgJ2FuaW1hdGlvbi1wbGF5LXN0YXRlJyk7XG4gIH1cblxufSJdfQ==