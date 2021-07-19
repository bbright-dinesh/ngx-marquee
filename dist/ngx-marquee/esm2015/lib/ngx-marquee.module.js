import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMarqueeComponent } from './ngx-marquee.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import * as i0 from "@angular/core";
export class NgxMarqueeModule {
}
NgxMarqueeModule.ɵfac = function NgxMarqueeModule_Factory(t) { return new (t || NgxMarqueeModule)(); };
NgxMarqueeModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxMarqueeModule });
NgxMarqueeModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxMarqueeModule, { declarations: [NgxMarqueeComponent,
        IntersectionObserverDirective], imports: [CommonModule], exports: [NgxMarqueeComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxMarqueeModule, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcnF1ZWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1hcnF1ZWUvc3JjL2xpYi9uZ3gtbWFycXVlZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOENBQThDLENBQUM7O0FBZTdGLE1BQU0sT0FBTyxnQkFBZ0I7O2dGQUFoQixnQkFBZ0I7b0RBQWhCLGdCQUFnQjt3REFQbEI7WUFDUCxZQUFZO1NBQ2I7d0ZBS1UsZ0JBQWdCLG1CQVZ6QixtQkFBbUI7UUFDbkIsNkJBQTZCLGFBRzdCLFlBQVksYUFHWixtQkFBbUI7dUZBR1YsZ0JBQWdCO2NBWjVCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osbUJBQW1CO29CQUNuQiw2QkFBNkI7aUJBQzlCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neE1hcnF1ZWVDb21wb25lbnQgfSBmcm9tICcuL25neC1tYXJxdWVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnRlcnNlY3Rpb25PYnNlcnZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pbnRlcnNlY3Rpb24tb2JzZXJ2ZXIuZGlyZWN0aXZlJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hNYXJxdWVlQ29tcG9uZW50LFxuICAgIEludGVyc2VjdGlvbk9ic2VydmVyRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neE1hcnF1ZWVDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXJxdWVlTW9kdWxlIHsgfVxuIl19