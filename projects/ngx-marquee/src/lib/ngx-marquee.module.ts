import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMarqueeComponent } from './ngx-marquee.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';


@NgModule({
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
})
export class NgxMarqueeModule { }
