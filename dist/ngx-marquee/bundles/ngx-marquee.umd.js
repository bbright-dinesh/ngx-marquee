(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-marquee', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-marquee'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, i1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var IntersectionStatus;
    (function (IntersectionStatus) {
        IntersectionStatus["Visible"] = "Visible";
        IntersectionStatus["Pending"] = "Pending";
        IntersectionStatus["NotVisible"] = "NotVisible";
    })(IntersectionStatus || (IntersectionStatus = {}));
    var fromIntersectionObserver = function (element, config, debounce) {
        if (debounce === void 0) { debounce = 0; }
        return new rxjs.Observable(function (subscriber) {
            var subject$ = new rxjs.Subject();
            var intersectionObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    subject$.next({ entry: entry, observer: observer });
                });
            }, config);
            subject$.subscribe(function () {
                subscriber.next(IntersectionStatus.Pending);
            });
            subject$.pipe(operators.debounceTime(debounce), operators.filter(Boolean))
                .subscribe(function (_a) {
                var entry = _a.entry, observer = _a.observer;
                return __awaiter(void 0, void 0, void 0, function () {
                    var isEntryVisible;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, isVisible(entry.target)];
                            case 1:
                                isEntryVisible = _a.sent();
                                if (isEntryVisible) {
                                    subscriber.next(IntersectionStatus.Visible);
                                }
                                else {
                                    subscriber.next(IntersectionStatus.NotVisible);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
            intersectionObserver.observe(element);
            return {
                unsubscribe: function () {
                    intersectionObserver.disconnect();
                    subject$.unsubscribe();
                }
            };
        });
    };
    function isVisible(element) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var observer = new IntersectionObserver(function (_a) {
                            var _b = __read(_a, 1), entry = _b[0];
                            resolve(entry.isIntersecting);
                            observer.disconnect();
                        });
                        observer.observe(element);
                    })];
            });
        });
    }

    var IntersectionObserverDirective = /** @class */ (function () {
        function IntersectionObserverDirective(_element) {
            this._element = _element;
            this.intersectionDebounce = 0;
            this.intersectionRootMargin = '0px';
            this.visibilityChange = new i0.EventEmitter();
            this._destroy$ = new rxjs.Subject();
        }
        IntersectionObserverDirective.prototype.ngOnInit = function () {
            var _this = this;
            var element = this._element.nativeElement;
            var config = {
                root: this.intersectionRoot,
                rootMargin: this.intersectionRootMargin,
                threshold: this.intersectionThreshold
            };
            fromIntersectionObserver(element, config, this.intersectionDebounce)
                .pipe(operators.takeUntil(this._destroy$))
                .subscribe(function (status) {
                _this.visibilityChange.emit(status);
            });
        };
        IntersectionObserverDirective.prototype.ngOnDestroy = function () {
            this._destroy$.next();
        };
        return IntersectionObserverDirective;
    }());
    IntersectionObserverDirective.ɵfac = function IntersectionObserverDirective_Factory(t) { return new (t || IntersectionObserverDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    IntersectionObserverDirective.ɵdir = i0.ɵɵdefineDirective({ type: IntersectionObserverDirective, selectors: [["", "intersectionObserver", ""]], inputs: { intersectionDebounce: "intersectionDebounce", intersectionRootMargin: "intersectionRootMargin", intersectionRoot: "intersectionRoot", intersectionThreshold: "intersectionThreshold" }, outputs: { visibilityChange: "visibilityChange" } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IntersectionObserverDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[intersectionObserver]'
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { intersectionDebounce: [{
                    type: i0.Input
                }], intersectionRootMargin: [{
                    type: i0.Input
                }], intersectionRoot: [{
                    type: i0.Input
                }], intersectionThreshold: [{
                    type: i0.Input
                }], visibilityChange: [{
                    type: i0.Output
                }] });
    })();

    var _c0 = ["tape"];
    var _c1 = function (a0) { return { "ngx-marquee-pause-on-hover": a0 }; };
    var _c2 = ["*"];
    (function (MarqueeState) {
        MarqueeState["Running"] = "running";
        MarqueeState["Paused"] = "paused";
        MarqueeState["Stopped"] = "stopped";
    })(exports.MarqueeState || (exports.MarqueeState = {}));
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
    var NgxMarqueeComponent = /** @class */ (function () {
        function NgxMarqueeComponent(_renderer) {
            var _this = this;
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
            this.pendingUpdatesChange = new i0.EventEmitter();
            this.playStateChange = new i0.EventEmitter();
            if (typeof this.taskOnUpdateContent !== 'function') {
                this.taskOnUpdateContent = function () { };
            }
            if (typeof this.taskOnUpdateDuration !== 'function') {
                this.taskOnUpdateDuration = function () {
                    return _this.duration;
                };
            }
        }
        NgxMarqueeComponent.prototype.ngAfterViewInit = function () {
            this._elementMarquee = this._renderer.selectRootElement(this.tape, true).nativeElement;
            this._resetMarquee();
        };
        NgxMarqueeComponent.prototype.playPause = function () {
            if (this._dataPlayState === null || this._dataPlayState === exports.MarqueeState.Running) {
                this._pauseElement();
            }
            else {
                this._playElement();
            }
        };
        NgxMarqueeComponent.prototype.stop = function () {
            this._resetAnimation();
            this._stopElement();
        };
        NgxMarqueeComponent.prototype.restart = function () {
            this._resetAnimation();
            this._playElement();
        };
        NgxMarqueeComponent.prototype.onVisibilityChanged = function (status, control) {
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
        };
        NgxMarqueeComponent.prototype._execProcedure = function () {
            this.taskOnUpdateContent();
            this._resetMarquee();
            this._setPendingUpdates(false);
        };
        NgxMarqueeComponent.prototype._setDataPlayState = function (state) {
            this._dataPlayState = state;
            this.playStateChange.emit(this._dataPlayState);
        };
        NgxMarqueeComponent.prototype._setPendingUpdates = function (state) {
            this.pendingUpdates = state;
            this.pendingUpdatesChange.emit(this.pendingUpdates);
        };
        NgxMarqueeComponent.prototype._resetMarquee = function () {
            this.stop();
            this._calculateDuration();
            this._playElement();
        };
        NgxMarqueeComponent.prototype._calculateDuration = function () {
            this.duration = this.taskOnUpdateDuration();
        };
        NgxMarqueeComponent.prototype._playElement = function () {
            this._setAnimationState('running', true);
            this._setDataAttrState('running');
            this._setDataPlayState(exports.MarqueeState.Running);
        };
        NgxMarqueeComponent.prototype._pauseElement = function () {
            this._setAnimationState('paused');
            this._setDataAttrState('paused');
            this._setDataPlayState(exports.MarqueeState.Paused);
        };
        NgxMarqueeComponent.prototype._stopElement = function () {
            this._setAnimationState('paused');
            this._setDataAttrState('stopped');
            this._setDataPlayState(exports.MarqueeState.Stopped);
            this._setPendingUpdates(false);
        };
        NgxMarqueeComponent.prototype._setAnimationState = function (state, fix) {
            if (state === void 0) { state = ''; }
            if (fix === void 0) { fix = false; }
            this._renderer.setStyle(this._elementMarquee, 'animation-play-state', state);
            if (fix) {
                this._fixAnimationState();
            }
        };
        NgxMarqueeComponent.prototype._resetAnimation = function () {
            this._renderer.setStyle(this._elementMarquee, 'animation', 'none');
            var fix = this._elementMarquee.offsetWidth;
            fix = fix;
            this._renderer.setStyle(this._elementMarquee, 'animation', this.duration + " linear infinite");
            this._renderer.setStyle(this._elementMarquee, '-webkit-animation', this.duration + " linear infinite");
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
        };
        NgxMarqueeComponent.prototype._setDataAttrState = function (state) {
            if (state === void 0) { state = ''; }
            this._renderer.setAttribute(this._elementMarquee, 'data-play-state', state);
        };
        NgxMarqueeComponent.prototype._fixAnimationState = function () {
            this._renderer.removeStyle(this._elementMarquee, 'animation-play-state');
        };
        return NgxMarqueeComponent;
    }());
    NgxMarqueeComponent.ɵfac = function NgxMarqueeComponent_Factory(t) { return new (t || NgxMarqueeComponent)(i0.ɵɵdirectiveInject(i0.Renderer2)); };
    NgxMarqueeComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxMarqueeComponent, selectors: [["ngx-marquee"]], viewQuery: function NgxMarqueeComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0, 1);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tape = _t.first);
            }
        }, inputs: { direction: "direction", duration: "duration", pauseOnHover: "pauseOnHover", animation: "animation", taskOnUpdateContent: "taskOnUpdateContent", taskOnUpdateDuration: "taskOnUpdateDuration", pendingUpdates: "pendingUpdates" }, outputs: { pendingUpdatesChange: "pendingUpdatesChange", playStateChange: "playStateChange" }, ngContentSelectors: _c2, decls: 9, vars: 11, consts: [[1, "ngx-marquee", 3, "ngClass"], ["tape", ""], ["intersectionObserver", "", 1, "ticker-control", "ticker-start", 3, "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "intersectionDebounce", "visibilityChange"], [1, "tickers"], ["intersectionObserver", "", 1, "ticker-control", "ticker-end", 3, "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "intersectionDebounce", "visibilityChange"]], template: function NgxMarqueeComponent_Template(rf, ctx) {
            if (rf & 1) {
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
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c1, ctx.pauseOnHover));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("intersectionRoot", ctx.root)("intersectionRootMargin", ctx.rootMargin)("intersectionThreshold", ctx.threshold)("intersectionDebounce", ctx.debounce);
                i0.ɵɵadvance(4);
                i0.ɵɵproperty("intersectionRoot", ctx.root)("intersectionRootMargin", ctx.rootMargin)("intersectionThreshold", ctx.threshold)("intersectionDebounce", ctx.debounce);
            }
        }, directives: [i1.NgClass, IntersectionObserverDirective], styles: [".ngx-marquee[_ngcontent-%COMP%]{overflow:hidden;text-align:left}.ngx-marquee.ngx-marquee-pause-on-hover[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]{animation-play-state:paused}.ngx-marquee[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{content:attr(data-marquee);display:inline-block;position:relative;white-space:nowrap;animation:linear infinite;animation-duration:20s;animation-direction:normal}.ngx-marquee[_ngcontent-%COMP%]   span.ticker-control[_ngcontent-%COMP%]{display:inline-block;width:20px;text-align:center;color:transparent;background-color:initial}.ngx-marquee.ngx-marquee-direction-left[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], .ngx-marquee.ngx-marquee-direction-normal[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{animation-direction:normal}@keyframes movement-smooth{0%{transform:translateX(0);left:100%}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up{0%{transform:translateY(100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-down{0%{transform:translateY(-100%);left:0}10%{transform:translateY(0);left:0}16%{transform:translate(0)}to{transform:translateX(-100%);left:0}}@keyframes slide-in-up-right{0%{transform:translate(-100%,100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}@keyframes slide-in-down-right{0%{transform:translate(-100%,-100%);right:-100%}10%{transform:translate(-100%);right:-100%}16%{transform:translate(-100%)}to{transform:translate(0);right:-100%}}"], changeDetection: 0 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxMarqueeComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-marquee',
                        templateUrl: './ngx-marquee.component.html',
                        styleUrls: ['./ngx-marquee.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: i0.Renderer2 }]; }, { direction: [{
                    type: i0.Input
                }], duration: [{
                    type: i0.Input
                }], pauseOnHover: [{
                    type: i0.Input
                }], animation: [{
                    type: i0.Input
                }], taskOnUpdateContent: [{
                    type: i0.Input
                }], taskOnUpdateDuration: [{
                    type: i0.Input
                }], pendingUpdates: [{
                    type: i0.Input
                }], pendingUpdatesChange: [{
                    type: i0.Output
                }], playStateChange: [{
                    type: i0.Output
                }], tape: [{
                    type: i0.ViewChild,
                    args: ["tape"]
                }] });
    })();

    var NgxMarqueeModule = /** @class */ (function () {
        function NgxMarqueeModule() {
        }
        return NgxMarqueeModule;
    }());
    NgxMarqueeModule.ɵfac = function NgxMarqueeModule_Factory(t) { return new (t || NgxMarqueeModule)(); };
    NgxMarqueeModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxMarqueeModule });
    NgxMarqueeModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
                i1.CommonModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxMarqueeModule, { declarations: [NgxMarqueeComponent,
                IntersectionObserverDirective], imports: [i1.CommonModule], exports: [NgxMarqueeComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxMarqueeModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxMarqueeComponent,
                            IntersectionObserverDirective
                        ],
                        imports: [
                            i1.CommonModule
                        ],
                        exports: [
                            NgxMarqueeComponent
                        ]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of ngx-marquee
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxMarqueeComponent = NgxMarqueeComponent;
    exports.NgxMarqueeModule = NgxMarqueeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-marquee.umd.js.map
