import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEndroitComponent } from './add-endroit.component';

describe('AddEndroitComponent', () => {
  let component: AddEndroitComponent;
  let fixture: ComponentFixture<AddEndroitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEndroitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEndroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
