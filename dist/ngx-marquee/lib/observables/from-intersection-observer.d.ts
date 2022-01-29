import { Observable } from "rxjs";
export declare enum IntersectionStatus {
    Visible = "Visible",
    Pending = "Pending",
    NotVisible = "NotVisible"
}
export declare const fromIntersectionObserver: (element: HTMLElement, config: IntersectionObserverInit, debounce?: number) => Observable<IntersectionStatus>;
