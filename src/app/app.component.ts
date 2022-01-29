import { Component, OnInit } from '@angular/core';
import { MarqueeState, MarqueeDirection, MarqueeAnimation } from 'ngx-marquee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  dynamicTape: string[] = [];
  areThereUpdates = false;
  duration: string;
  count = 1;

  marqueeDirection = MarqueeDirection;
  marqueeAnimation = MarqueeAnimation;

  ngOnInit(): void
  {
    this.dynamicTape = [
      "May be... but",
      "you can organically update the marquee on the fly!",
      "Why don't you try...",
      "Press 'Add message' button"
    ];

    this.duration = this.updateDuration();
  }

  updateContent = () => {
    // What should we do each time a cycle is completed AND THERE ARE UPDATES to do in the marquee?
    this.dynamicTape.unshift(`Added Item #${this.count++} on the fly`);
  }

  updateDuration = (): string => {
    // Some imaginative way to determine a pleasant time of movement when marquee's content change...
    this.duration = `${String(this.dynamicTape.length * 3)}s`;
    return this.duration;
  }

}
