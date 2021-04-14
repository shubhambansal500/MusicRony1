import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantclassComponent } from './instantclass.component';

describe('InstantclassComponent', () => {
  let component: InstantclassComponent;
  let fixture: ComponentFixture<InstantclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstantclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
