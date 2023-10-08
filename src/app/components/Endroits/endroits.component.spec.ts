import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndroitsComponent } from './endroits.component';

describe('EndroitsComponent', () => {
  let component: EndroitsComponent;
  let fixture: ComponentFixture<EndroitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndroitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndroitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
