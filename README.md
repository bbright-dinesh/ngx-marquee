# ngx-marquee

Powerful Marquee Component for Angular (based on observers behavior). Improved alternative to the deprecated HTML marquee tag.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/nitz333)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli).

# How to install

Run `npm i ngx-marquee` to install the library.

## How to use

#### Import Module

```ts
import { NgxMarqueeModule } from 'ngx-marquee';

@NgModule({
  imports: [ NgxMarqueeModule ],
  ...
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
* [Basic example](https://stackblitz.com/github/nitz333/ngx-marquee)
* [Use Cases (advanced examples)](https://stackblitz.com/github/nitz333/ngx-marquee_use-cases)

## Resume properties

| Name | Type | Description |
| :--- | :----: | :--- |
| [direction] | string  | Sets the controlling direction of _marquee_ movement. |
| [duration] | string | Sets the length of time that an animation takes to complete one cycle. |
| [pauseOnHover] | boolean | Set to pause the _marquee_ movement while hover user event. |            
| [animation] | string | Sets animation entrance when the _marquee_ cycle starts. |
| [pendingUpdates] | boolean | Indicates that `taskOnUpdateContent`  callback function will be executed when the current movement cycle has been finished. |
| [taskOnUpdateDuration] | function | Callback function to be used to determine the new `duration` value that an animation takes to complete the next cycle. This callback function will be executed if `pendingUpdates` property is set on true and the current cycle of _marquee_ movement has been finished. |
| [taskOnUpdateContent] | function | Callback function to be used to set new content in the next cycle. This callback function will be executed while `pendingUpdates` property is set on true and the current cycle of _marquee_ movement has been finished. |
| (pendingUpdatesChange) | boolean | This event indicates that the `taskOnUpdateDuration` or` taskOnUpdateContent` callbacks functions have been executed. |
| (playStateChange) | MarqueeState | This event indicates the current state movement of the _marquee_. |

### Resume methods
| Name | Description |
| :--- | :--- |
| playPause | Toggle the movement of the _marquee_ to play or pause. |
| stop | Stop the movement of the _marquee_. |
| restart | Restart the movement of the _marquee_ to the initial move point. |

# API

## input properties

### @Input() direction

`string` Property sets the controlling direction of _marquee_ movement.

**default value:** `"left"`

> **Note:** The `taskOnUpdateContent()` callback function is not fired when `direction` value is _"alternate"_.

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

**default value:** `"20s"`

> **Note:** The duration string format must be a value preceded by a letter s or ms to denote time in seconds or milliseconds respectively.

### Example
```html
<ngx-marquee duration="120s">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() pauseOnHover

`boolean` Property set to pause the _marquee_ movement while hover user event.

**default value:** `false`

### Example

```html
<ngx-marquee pauseOnHover="true">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() animation

`string` Property sets animation entrance when the _marquee_ cycle starts.

**default value:** `"default"`

> **Note:** Only _"default"_ animation is available when `direction` value is _"alternate"_.

#### possible values
* "default"
* "slideInUp"
* "slideInDown"

### Example
```html
<ngx-marquee animation="slideInUp">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() pendingUpdates

`boolean` Property indicates that `taskOnUpdateContent`  callback function will be executed when the current movement cycle has been finished.

**default value:** `false`

### Example

```html
<ngx-marquee pendingUpdates="false">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() taskOnUpdateDuration

`function` Customized callback function to be used to determine the new `duration` value that an animation takes to complete the next cycle. This callback function will be executed if `pendingUpdates` property is set on true and the current cycle of _marquee_ movement has been finished.

**return:** `string`

> **Note:** If **taskOnUpdateDuration( )** function is not supplied, the  `duration` value is considered.

#### possible values

```js
foo = (): string => {
  // Some imaginative lines about the new duration of your marquee
  // ...
  return "90ms";
};
```

### Example

```html
<ngx-marquee [taskOnUpdateDuration]="foo" pendingUpdates="true">
  <mark>My ticker text</mark>
</ngx-marquee>
```

### @Input() taskOnUpdateContent

`function` Customized callback function to be used to set new content in the next cycle. This callback function will be executed while `pendingUpdates` property is set on true and the current cycle of _marquee_ movement has been finished.

**return:** `void`

> **Note:** If **taskOnUpdateContent( )** function is not supplied, the marquee remains unchanged.

#### possible values

```js
anotherFoo = (): void => {
  // Some imaginative lines about the new content of your marquee
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