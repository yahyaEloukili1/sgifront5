import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEndroitComponent } from './edit-endroit.component';

describe('EditEndroitComponent', () => {
  let component: EditEndroitComponent;
  let fixture: ComponentFixture<EditEndroitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEndroitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEndroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
