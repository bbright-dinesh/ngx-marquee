import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromIntersectionObserver, IntersectionStatus } from '../observables/from-intersection-observer';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {

  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];
  
  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();
  
  private _destroy$ = new Subject();

  constructor( private _element: ElementRef ) { }

  ngOnInit()
  {
    const element = this._element.nativeElement;
    
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    fromIntersectionObserver(
      element,
      config,
      this.intersectionDebounce
    )
    .pipe(
      takeUntil( this._destroy$ )
    )
    .subscribe( status => {
      this.visibilityChange.emit(status);
    });
  }
  
  ngOnDestroy()
  {
    this._destroy$.next();
  }

}
