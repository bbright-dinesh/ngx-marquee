import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ngx-marquee';

  tickers = ["Ticker 1", "Ticker 2", "Ticker 3", "Ticker 4", "Ticker 5"];

}
