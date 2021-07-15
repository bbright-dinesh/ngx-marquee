import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMarqueeComponent } from './ngx-marquee.component';

describe('NgxMarqueeComponent', () => {
  let component: NgxMarqueeComponent;
  let fixture: ComponentFixture<NgxMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMarqueeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
