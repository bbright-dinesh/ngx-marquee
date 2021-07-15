# ngx-marquee

Powerful Marquee Component for Angular (based on observers behavior). Improved alternative to the deprecated HTML marquee tag.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/nitz333)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli).

# How to install

Run `npm i ng-marquee` to install the library.

## How to use

#### Import Module

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMarqueeModule } from 'ngx-marquee';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMarqueeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### Use Component
```html
<ngx-marquee>
  <mark class="ticker-custom">My ticker content</mark>
</ngx-marquee>

```

# Demo
* Basic example (...developing)
* Case of use (...developing)

# API

## input properties

### @Input() direction

`string` Property sets the controlling direction of _marquee_ movement.

#### possible values
* "left"
* "right"
* "alternate"

### Example
```html
<ngx-marquee direction="right">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() duration

`string` Property sets the length of time that an animation takes to complete one cycle.

### Example
```html
<ngx-marquee duration="120s">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() pauseOnHover

`boolean` Property set to pause the _marquee_ movement while hover user event.

### Example

```html
<ngx-marquee pauseOnHover="true">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() pendingUpdates

`boolean` Property indicates that `taskOnUpdateDuration` or `taskOnUpdateContent`  callbacks functions will be executed when the current movement cycle has been finished.

### Example

```html
<ngx-marquee pendingUpdates="false">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() autoDuration

`boolean` Property indicates that the _marquee_ should be dynamically adjusted in its duration when it has changes in its content. The customized `taskOnUpdateDuration` callback function will be used.  

### Example

```html
<ngx-marquee autoDuration="false">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() taskOnUpdateDuration

`function` Customized callback function to be used to determine the new length of time that an animation takes to complete the next cycle. This callback function will be executed while `autoDuration` and `pendingUpdates` properties are both sets on true and the current cycle of _marquee_ movement has been finished.
> **Note:** The **taskOnUpdateDuration( )** function must to **return a string** value (duration format).

#### possible values

```js
foo = (): string => {
  // Some imaginative logic
  // ...
  return "90ms";
};
```

### Example

```html
<ngx-marquee [taskOnUpdateDuration]="foo" autoDuration="true" pendingUpdates="true">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() taskOnUpdateContent

`function` Customized callback function to be used to set new content in the next cycle. This callback function will be executed while `pendingUpdates` property is set on true and the current cycle of _marquee_ movement has been finished.
> **Note:** The **taskOnUpdateContent( )** function **does not return value**.

#### possible values

```js
anotherFoo = (): void => {
  // Some imaginative logic
  // ...
};
```

### Example

```html
<ngx-marquee [taskOnUpdateContent]="anotherFoo" pendingUpdates="true">
  <mark>My ticker text</mark>
</ngx-marquee>
```

## output properties

### @Output() pendingUpdatesChange

This event indicates that the `taskOnUpdateDuration` or` taskOnUpdateContent` callbacks functions have been executed.

**return:** `EventEmitter<boolean>`

> **Note:** You can take advantage of two-way data binding pattern for update `pendingUpdates`  value simultaneously between your component logic and the _marquee_.

### Example
```html
<ngx-marquee [(pendingUpdates)]="isPendingUpdate" [taskOnUpdateContent]="anotherFoo">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Output() playStateChange

This event indicates the current state movement of the _marquee_.

**return:** `EventEmitter<MarqueeState>`

#### possible values
* Running
* Paused
* Stopped

> **Note:** You can map these values to respective lowercase "running", "paused", or "stopped" string's value.

### Example
```html
<ngx-marquee (playStateChange)="listenerFoo($event)">
  <mark>My ticker text</mark>
</ngx-marquee>
```

## methods

### playPause( ):  void

Toggle the movement of the _marquee_ to play or pause.

> **Note:** Sets and emit (by `playStateChange` event) the current `MarqueeState` to **Running** or **Paused**.

### stop( ):  void

Stop the movement of the _marquee_.

> **Note:** Sets and emit (by `playStateChange` event) the current `MarqueeState` to **Stopped**. Also, set the _marquee_ to the initial move point and set the value of `pendingUpdates` to false.

### restart( ):  void

Restart the movement of the _marquee_ to the initial move point.

> **Note:** Sets and emit (by `playStateChange` event) the current `MarqueeState` to **Running**.

# Any contributions are appreciated

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/nitz333)

Inspired by [https://github.com/shivarajnaidu/ng-marquee](https://github.com/shivarajnaidu/ng-marquee)