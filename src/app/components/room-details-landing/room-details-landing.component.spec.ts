import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsLandingComponent } from './room-details-landing.component';

describe('RoomDetailsLandingComponent', () => {
  let component: RoomDetailsLandingComponent;
  let fixture: ComponentFixture<RoomDetailsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
