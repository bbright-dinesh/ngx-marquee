import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromIntersectionObserver } from '../observables/from-intersection-observer';
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
IntersectionObserverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intersectionObserver]'
            },] }
];
IntersectionObserverDirective.ctorParameters = () => [
    { type: ElementRef }
];
IntersectionObserverDirective.propDecorators = {
    intersectionDebounce: [{ type: Input }],
    intersectionRootMargin: [{ type: Input }],
    intersectionRoot: [{ type: Input }],
    intersectionThreshold: [{ type: Input }],
    visibilityChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLW9ic2VydmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tYXJxdWVlL3NyYy9saWIvZGlyZWN0aXZlcy9pbnRlcnNlY3Rpb24tb2JzZXJ2ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsd0JBQXdCLEVBQXNCLE1BQU0sMkNBQTJDLENBQUM7QUFLekcsTUFBTSxPQUFPLDZCQUE2QjtJQVd4QyxZQUFxQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBVGhDLHlCQUFvQixHQUFHLENBQUMsQ0FBQztRQUN6QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFJOUIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFFNUQsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFWSxDQUFDO0lBRS9DLFFBQVE7UUFFTixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUU1QyxNQUFNLE1BQU0sR0FBRztZQUNiLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCO1lBQ3ZDLFNBQVMsRUFBRSxJQUFJLENBQUMscUJBQXFCO1NBQ3RDLENBQUM7UUFFRix3QkFBd0IsQ0FDdEIsT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLENBQUMsb0JBQW9CLENBQzFCO2FBQ0EsSUFBSSxDQUNILFNBQVMsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQzVCO2FBQ0EsU0FBUyxDQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUVULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7WUFQbUIsVUFBVTs7O21DQVUzQixLQUFLO3FDQUNMLEtBQUs7K0JBQ0wsS0FBSztvQ0FDTCxLQUFLOytCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZyb21JbnRlcnNlY3Rpb25PYnNlcnZlciwgSW50ZXJzZWN0aW9uU3RhdHVzIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZXMvZnJvbS1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaW50ZXJzZWN0aW9uT2JzZXJ2ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBJbnRlcnNlY3Rpb25PYnNlcnZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBpbnRlcnNlY3Rpb25EZWJvdW5jZSA9IDA7XG4gIEBJbnB1dCgpIGludGVyc2VjdGlvblJvb3RNYXJnaW4gPSAnMHB4JztcbiAgQElucHV0KCkgaW50ZXJzZWN0aW9uUm9vdDogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIGludGVyc2VjdGlvblRocmVzaG9sZDogbnVtYmVyIHwgbnVtYmVyW107XG4gIFxuICBAT3V0cHV0KCkgdmlzaWJpbGl0eUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uU3RhdHVzPigpO1xuICBcbiAgcHJpdmF0ZSBfZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmICkgeyB9XG5cbiAgbmdPbkluaXQoKVxuICB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICBcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICByb290OiB0aGlzLmludGVyc2VjdGlvblJvb3QsXG4gICAgICByb290TWFyZ2luOiB0aGlzLmludGVyc2VjdGlvblJvb3RNYXJnaW4sXG4gICAgICB0aHJlc2hvbGQ6IHRoaXMuaW50ZXJzZWN0aW9uVGhyZXNob2xkXG4gICAgfTtcblxuICAgIGZyb21JbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAgIGVsZW1lbnQsXG4gICAgICBjb25maWcsXG4gICAgICB0aGlzLmludGVyc2VjdGlvbkRlYm91bmNlXG4gICAgKVxuICAgIC5waXBlKFxuICAgICAgdGFrZVVudGlsKCB0aGlzLl9kZXN0cm95JCApXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoIHN0YXR1cyA9PiB7XG4gICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2UuZW1pdChzdGF0dXMpO1xuICAgIH0pO1xuICB9XG4gIFxuICBuZ09uRGVzdHJveSgpXG4gIHtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxufVxuIl19