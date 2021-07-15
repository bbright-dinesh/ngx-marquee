import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { IntersectionStatus } from './observables/from-intersection-observer';

export enum MarqueeState {
  Running = "running",
  Paused = "paused",
  Stopped = "stopped"
}

enum MarqueeDirection {
  Left = 'left',
  Right = 'right',
  Alternate = 'alternate'
}

@Component({
  selector: 'ngx-marquee',
  templateUrl: './ngx-marquee.component.html',
  styleUrls: ['./ngx-marquee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMarqueeComponent implements OnInit, AfterViewInit {

  @Input() autoDuration: boolean;
  @Input() debounce: number;
  @Input() direction: MarqueeDirection;
  @Input() duration: string;
  @Input() root: HTMLElement;
  @Input() rootMargin: string;
  @Input() pauseOnHover: boolean;
  @Input() taskOnUpdateContent: () => void;
  @Input() taskOnUpdateDuration: () => string; // Formato esperado "number[s|ms]"
  @Input() threshold: number | number[];
  @Input() pendingUpdates: boolean;
  @Output() pendingUpdatesChange: EventEmitter<boolean>;
  @Output() playStateChange: EventEmitter<MarqueeState>;

  marqueeDirection = MarqueeDirection;
  
  private _cssRoot = '.ngx-marquee > span';
  private _elementMarquee: any;
  private _outerFlags = [false, false];
  private _dataPlayState: MarqueeState; 

  constructor( private _renderer: Renderer2 )
  {
    this.pauseOnHover = false;
    this.autoDuration = false;
    this.pendingUpdates = false;
    this.pendingUpdatesChange = new EventEmitter<boolean>();
    this.playStateChange = new EventEmitter<MarqueeState>();

    if (typeof this.taskOnUpdateContent !== 'function')
    {
      this.taskOnUpdateContent = (): void => {};
    }

    if (typeof this.taskOnUpdateDuration !== 'function')
    {
      this.taskOnUpdateDuration = (): string => {
        return this.duration;
      };
    }
  }

  ngOnInit(): void
  {
    if (this.autoDuration)
    {
      this._calculateDuration();
    }

    this._setDataPlayState(MarqueeState.Running);
  }

  ngAfterViewInit(): void
  {
    this._elementMarquee = this._renderer.selectRootElement(this._cssRoot, true);
  }

  ngOnDestroy(): void {
  }

  playPause(): void
  {
    if ( this._dataPlayState === null || this._dataPlayState === MarqueeState.Running )
    {
      this._pauseElement();
    }
    else
    {
      this._playElement();
    }
  }

  stop(): void
  {
    this._resetAnimation();
    this._stopElement();
  }

  restart(): void
  {
    this._resetAnimation();
    this._playElement();
  }
 
  onVisibilityChanged(status: IntersectionStatus, control: number): void
  {
    if (status !== IntersectionStatus.Pending)
    {
      if (status === IntersectionStatus.Visible)
      {
        this._outerFlags[control] = true;
      }
      else if (status === IntersectionStatus.NotVisible)
      {
        this._outerFlags[control] = false;
      }
      
      if (this.pendingUpdates)
      {
        if ( (this.direction === undefined || this.direction === MarqueeDirection.Left) && (this._outerFlags[0] === true && this._outerFlags[1] === false) )
        { 
          this._execProcedure();
        }
        else if ( this.direction === MarqueeDirection.Right && (this._outerFlags[0] === false && this._outerFlags[1] === true) )
        {
          this._execProcedure();
        }
      }
    }  
  }

  private _execProcedure(): void
  {
    this.taskOnUpdateContent();
    this._resetMarquee();
    this._setPendingUpdates(false);
  }

  private _setDataPlayState( state: MarqueeState ): void
  {
    this._dataPlayState = state;
    this.playStateChange.emit(this._dataPlayState);
  }

  private _setPendingUpdates( state: boolean ): void
  {
    this.pendingUpdates = state;
    this.pendingUpdatesChange.emit(this.pendingUpdates);
  }

  private _resetMarquee(): void
  {
    if (this.autoDuration)
    {
      this.stop();
      this._calculateDuration();
      this._playElement();
    }
  }

  private _calculateDuration(): void
  {
    this.duration = this.taskOnUpdateDuration();          
  }

  private _playElement(): void
  {
    this._setAnimationState('running', true);
    this._setDataAttrState('running');
    this._setDataPlayState(MarqueeState.Running);
  }

  private _pauseElement(): void
  {
    this._setAnimationState('paused');
    this._setDataAttrState('paused');
    this._setDataPlayState(MarqueeState.Paused);
  }

  private _stopElement(): void
  {
    this._setAnimationState('paused');
    this._setDataAttrState('stopped');
    this._setDataPlayState(MarqueeState.Stopped);
    this._setPendingUpdates(false);
  }

  private _setAnimationState( state: string = '', fix: boolean = false ): void
  {
    this._renderer.setStyle(this._elementMarquee, 'animation-play-state', state);
    
    if (fix)
    {
      this._fixAnimationState();
    }
  }

  private _resetAnimation(): void
  {
    this._renderer.setStyle(this._elementMarquee, 'animation', 'none');
    let fix = this._elementMarquee.offsetWidth; fix = fix;

    this._renderer.setStyle(this._elementMarquee, 'animation', `${this.duration} linear infinite movement-smooth`);
    this._renderer.setStyle(this._elementMarquee, '-webkit-animation', `${this.duration} linear infinite movement-smooth`);
    switch (this.direction)
    {
      case 'right': this._renderer.setStyle(this._elementMarquee, 'animation-direction', 'reverse'); break;
      case 'alternate': this._renderer.setStyle(this._elementMarquee, 'animation-direction', 'alternate'); break;
      default: this._renderer.setStyle(this._elementMarquee, 'animation-direction', 'normal'); break;
    }
  }

  private _setDataAttrState( state: string = '' ): void
  {
    this._renderer.setAttribute(this._elementMarquee, 'data-play-state', state);
  }

  private _fixAnimationState(): void
  {
    this._renderer.removeStyle(this._elementMarquee, 'animation-play-state');
  }

}
