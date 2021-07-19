import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromIntersectionObserver } from '../observables/from-intersection-observer';
import * as i0 from "@angular/core";
export class IntersectionObserverDirective {
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
IntersectionObserverDirective.ɵfac = function IntersectionObserverDirective_Factory(t) { return new (t || IntersectionObserverDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
IntersectionObserverDirective.ɵdir = i0.ɵɵdefineDirective({ type: IntersectionObserverDirective, selectors: [["", "intersectionObserver", ""]], inputs: { intersectionDebounce: "intersectionDebounce", intersectionRootMargin: "intersectionRootMargin", intersectionRoot: "intersectionRoot", intersectionThreshold: "intersectionThreshold" }, outputs: { visibilityChange: "visibilityChange" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IntersectionObserverDirective, [{
        type: Directive,
        args: [{
                selector: '[intersectionObserver]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { intersectionDebounce: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLW9ic2VydmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tYXJxdWVlL3NyYy9saWIvZGlyZWN0aXZlcy9pbnRlcnNlY3Rpb24tb2JzZXJ2ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx3QkFBd0IsRUFBc0IsTUFBTSwyQ0FBMkMsQ0FBQzs7QUFLekcsTUFBTSxPQUFPLDZCQUE2QjtJQVd4QyxZQUFxQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBVGhDLHlCQUFvQixHQUFHLENBQUMsQ0FBQztRQUN6QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFJOUIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFFNUQsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFWSxDQUFDO0lBRS9DLFFBQVE7UUFFTixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUU1QyxNQUFNLE1BQU0sR0FBRztZQUNiLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCO1lBQ3ZDLFNBQVMsRUFBRSxJQUFJLENBQUMscUJBQXFCO1NBQ3RDLENBQUM7UUFFRix3QkFBd0IsQ0FDdEIsT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLENBQUMsb0JBQW9CLENBQzFCO2FBQ0EsSUFBSSxDQUNILFNBQVMsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQzVCO2FBQ0EsU0FBUyxDQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUVULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7MEdBdkNVLDZCQUE2QjtrRUFBN0IsNkJBQTZCO3VGQUE3Qiw2QkFBNkI7Y0FIekMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7YUFDbkM7NkRBR1Usb0JBQW9CO2tCQUE1QixLQUFLO1lBQ0csc0JBQXNCO2tCQUE5QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0cscUJBQXFCO2tCQUE3QixLQUFLO1lBRUksZ0JBQWdCO2tCQUF6QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmcm9tSW50ZXJzZWN0aW9uT2JzZXJ2ZXIsIEludGVyc2VjdGlvblN0YXR1cyB9IGZyb20gJy4uL29ic2VydmFibGVzL2Zyb20taW50ZXJzZWN0aW9uLW9ic2VydmVyJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ludGVyc2VjdGlvbk9ic2VydmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgaW50ZXJzZWN0aW9uRGVib3VuY2UgPSAwO1xuICBASW5wdXQoKSBpbnRlcnNlY3Rpb25Sb290TWFyZ2luID0gJzBweCc7XG4gIEBJbnB1dCgpIGludGVyc2VjdGlvblJvb3Q6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBpbnRlcnNlY3Rpb25UaHJlc2hvbGQ6IG51bWJlciB8IG51bWJlcltdO1xuICBcbiAgQE91dHB1dCgpIHZpc2liaWxpdHlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvblN0YXR1cz4oKTtcbiAgXG4gIHByaXZhdGUgX2Rlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZiApIHsgfVxuXG4gIG5nT25Jbml0KClcbiAge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgcm9vdDogdGhpcy5pbnRlcnNlY3Rpb25Sb290LFxuICAgICAgcm9vdE1hcmdpbjogdGhpcy5pbnRlcnNlY3Rpb25Sb290TWFyZ2luLFxuICAgICAgdGhyZXNob2xkOiB0aGlzLmludGVyc2VjdGlvblRocmVzaG9sZFxuICAgIH07XG5cbiAgICBmcm9tSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICBlbGVtZW50LFxuICAgICAgY29uZmlnLFxuICAgICAgdGhpcy5pbnRlcnNlY3Rpb25EZWJvdW5jZVxuICAgIClcbiAgICAucGlwZShcbiAgICAgIHRha2VVbnRpbCggdGhpcy5fZGVzdHJveSQgKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKCBzdGF0dXMgPT4ge1xuICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlLmVtaXQoc3RhdHVzKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgbmdPbkRlc3Ryb3koKVxuICB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbn1cbiJdfQ==